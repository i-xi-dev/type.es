import * as Loading from "../../loading/mod.ts";
import * as Type from "../../type/mod.ts";
import { AbortError, InvalidStateError } from "../../basics/mod.ts";
import { Builder as BytesBuilder } from "../../bytes/mod.ts";

async function* _streamToAsyncGenerator<T>(
  stream: ReadableStream<T>,
): AsyncGenerator<T, void, void> {
  const reader = stream.getReader();
  try {
    for (
      let i = await reader.read();
      (i.done !== true);
      i = await reader.read()
    ) {
      yield i.value;
    }
  } catch (exception) {
    throw exception;
  } finally {
    await reader.cancel(); // streamもcancelされる
    reader.releaseLock();
  }
}

type _Bytes = Uint8Array<ArrayBuffer>;

/**
 * The [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) of `Uint8Array` or the async iterator of `Uint8Array`.
 */
export type ReadingSource =
  | AsyncIterable<_Bytes>
  | ReadableStream<_Bytes>
  | Iterable<_Bytes>;
//XXX ReadableStreamは、そのうちAsyncIterableになる → のこるはSafariのみ

/**
 * The byte stream reading task.
 */
export class ReadingTask extends Loading.Task<_Bytes> {
  readonly #stream: AsyncIterable<_Bytes> | Iterable<_Bytes>;

  /**
   * @param stream - The byte stream.
   * @param options - The reading options.
   */
  private constructor(stream: ReadingSource, options?: Loading.Options) {
    super(options);
    if (Type.isAsyncIterable(stream) || Type.isIterable(stream)) {
      this.#stream = stream;
    } // deno-lint-ignore no-explicit-any
    else if ((stream as any) instanceof ReadableStream) {
      // SafariではReadableStreamはAsyncIterableではないので
      this.#stream = _streamToAsyncGenerator<_Bytes>(stream);
    } else {
      throw new TypeError(
        "`stream` must be a `ReadableStream<Uint8Array>` or an `AsyncIterable<Uint8Array>`.",
      );
    }
  }

  override get [Symbol.toStringTag](): string {
    return "ReadingTask";
  }

  static create(stream: ReadingSource, options?: Loading.Options): ReadingTask {
    return new ReadingTask(stream, options);
  }

  /**
   * @returns The `Promise` that fulfills with a read byte sequence.
   */
  override async run(): Promise<_Bytes> {
    const result = await this.#readAsyncIterable(
      this.#stream as AsyncIterable<_Bytes>,
    );
    return result;
  }

  #throwIfAborted(signal?: AbortSignal): void {
    if (signal?.aborted === true) {
      const reason = signal.reason;
      if (
        (reason instanceof Error) &&
        ((reason.name === "AbortError") || (reason.name === "TimeoutError"))
      ) {
        throw reason;
      } else {
        const abortError = new AbortError("Aborted via `options.signal`.");
        abortError.cause = reason;
        throw abortError;
      }
    }
  }

  async #readAsyncIterable(
    asyncSource: AsyncIterable<_Bytes>,
  ): Promise<_Bytes> {
    if (this.status !== Loading.Status.READY) {
      throw new InvalidStateError("`status` is not READY");
    }
    this._status = Loading.Status.RUNNING;

    const builder = BytesBuilder.create(
      (this.indeterminate === true) ? undefined : { capacity: this.total },
    );

    try {
      // started
      this._notifyProgress("loadstart");

      for await (const chunk of asyncSource) {
        // this._signal?.throwIfAborted(); // reasonありでabort()した場合、 reasonをそのままスローするのでabortだったのかわからなくなる
        this.#throwIfAborted(this._signal);

        Type.assertUint8Array(chunk, "chunk");

        builder.loadFromBufferSource(chunk);
        this._loaded = builder.length;
        this._notifyProgress("progress");
      }

      // completed
      this._status = Loading.Status.COMPLETED;
      // this._notifyProgress("load"); resolveされるのでわかる

      return new Uint8Array(builder.toArrayBuffer());
    } catch (exception) {
      if ((exception instanceof Error) && (exception.name === "AbortError")) {
        // ・呼び出し側のAbortControllerでreason省略でabortした場合
        // ・呼び出し側のAbortControllerでreason:AbortErrorでabortした場合
        this._status = Loading.Status.ABORTED;
        // this._notifyProgress("abort"); rejectされるのでわかる
      } else if (
        (exception instanceof Error) && (exception.name === "TimeoutError")
      ) {
        // ・AbortSignal.timeoutでabortされた場合
        // ・呼び出し側のAbortControllerでreason:TimeoutErrorでabortした場合
        this._status = Loading.Status.ABORTED; //TODO timeout独自のstateにする？
        // this._notifyProgress("timeout"); rejectされるのでわかる
      } else {
        // ・呼び出し側のAbortControllerでreason:AbortError,TimeoutError以外でabortした場合
        // ・その他のエラー
        this._status = Loading.Status.ERROR;
        // this._notifyProgress("error"); rejectされるのでわかる
      }
      throw exception;
    } finally {
      // // signalに追加したリスナーを削除
      // this.#abortController.abort();

      this._notifyProgress("loadend"); // "progress"は間引く可能性があるので、最終的にloadedがいくつなのかは"progress"ではわからない
    }
  }
}

//TODO エラーメッセージ
