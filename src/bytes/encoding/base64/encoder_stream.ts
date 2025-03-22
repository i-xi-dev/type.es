import { _encode, _ResolvedOptions, _resolveOptions } from "./_common.ts";
import { EncoderStream, EncoderStreamRegulator } from "../main.ts";
import { Base64Options } from "./options.ts";
import { Base64Encoder } from "./encoder.ts";

class _EncoderStreamRegulator implements EncoderStreamRegulator {
  #pending: Uint8Array<ArrayBuffer>;

  constructor() {
    this.#pending = new Uint8Array(0);
  }

  regulate(chunk: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
    const temp = new Uint8Array(this.#pending.length + chunk.length);
    temp.set(this.#pending);
    temp.set(chunk, this.#pending.length);
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return new Uint8Array(0);
    } else if (surplus === 0) {
      this.#pending = new Uint8Array(0);
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.subarray(pendingLength);
      return temp.subarray(0, pendingLength);
    }
  }

  flush(): Uint8Array<ArrayBuffer> {
    const remains = this.#pending;
    this.#pending = new Uint8Array(0);
    return remains;
  }
}

/**
 * The `TransformStream` that encodes a stream of `Uint8Array` into Base64-encoded string stream.
 *
 * @example
 * ```javascript
 * const encoderStream = new Base64.EncoderStream();
 * // readableStream: ReadableStream<Uint8Array>
 * // writableStream: WritableStream<string>
 *
 * readableStream.pipeThrough(encoderStream).pipeTo(writableStream);
 * ```
 */
export class Base64EncoderStream extends EncoderStream {
  /**
   * @param options The `Base64.Options` dictionary.
   */
  constructor(options?: Base64Options) {
    const encoder = new Base64Encoder(options);
    const regulator = new _EncoderStreamRegulator();
    super(encoder, regulator);
    Object.freeze(this);
  }

  get [Symbol.toStringTag](): string {
    return "Base64EncoderStream";
  }
}
