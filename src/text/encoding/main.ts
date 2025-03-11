import * as Type from "../../type/mod.ts";
import {
  type codepoint,
  type rune,
  type safeint,
  type uint8,
} from "../../_typedef/mod.ts";

/*XXX
- text-encoding-$03
  Encoding Standardでコピーは強く推奨しないとされてるが、どうすべきか
- text-encoding-$11
  一旦、SharedArrayBufferは弾くか
*/

export const _BOM = "\u{FEFF}";

const _ErrorMode = {
  EXCEPTION: Symbol("EXCEPTION"),
  REPLACEMENT: Symbol("REPLACEMENT"),
} as const;

type _ErrorMode = typeof _ErrorMode[keyof typeof _ErrorMode];

class _CoderCommon {
  readonly #name: string;
  readonly #errorMode: _ErrorMode;

  constructor(name: string, fatal: boolean) {
    this.#name = name;
    this.#errorMode = (fatal === true)
      ? _ErrorMode.EXCEPTION
      : _ErrorMode.REPLACEMENT;
  }

  get encoding(): string {
    return this.#name.toLowerCase();
  }

  get fatal(): boolean {
    return this.#errorMode === _ErrorMode.EXCEPTION;
  }
}

export type _DecodeResult = {
  readByteCount: safeint;
  writtenRuneCount: safeint; //XXX 要らないのでは
  pendingBytes: Array<uint8>;
};

type _DecoderDecodeResult = _DecodeResult & {
  writtenRunesAsString: string;
};

type _DecoderCommonInit = {
  name: string;
  fatal: boolean;
  replacementRune: rune;
  decode: (
    srcBuffer: ArrayBuffer,
    dstRunes: Array<rune>,
    options: {
      allowPending: boolean;
      fatal: boolean;
      replacementRune: rune; // runeにしてるが、U+10000以上には対応しない
    },
  ) => _DecodeResult;
  ignoreBOM: boolean;
  maxBytesPerRune: safeint;
};

class _DecoderCommon extends _CoderCommon {
  readonly #decode: (
    srcBuffer: ArrayBuffer,
    dstRunes: Array<rune>,
    options: {
      allowPending: boolean;
      fatal: boolean;
      replacementRune: rune; // runeにしてるが、U+10000以上には対応しない
    },
  ) => _DecodeResult;
  readonly #ignoreBOM: boolean;
  readonly #replacementRune: rune;
  readonly #maxBytesPerRune: safeint;

  constructor(init: _DecoderCommonInit) {
    super(init.name, init.fatal);
    this.#replacementRune = init.replacementRune;
    this.#decode = init.decode;
    this.#ignoreBOM = init.ignoreBOM;
    this.#maxBytesPerRune = init.maxBytesPerRune;
  }

  get ignoreBOM(): boolean {
    return this.#ignoreBOM;
  }

  get replacementRune(): rune {
    return this.#replacementRune;
  }

  get maxBytesPerRune(): safeint {
    return this.#maxBytesPerRune;
  }

  decode(
    removeBOM: boolean,
    inStreaming: boolean,
    previousPendingBytes: Array<uint8>,
    srcBufferSource?: BufferSource,
  ): _DecoderDecodeResult {
    let srcBuffer: ArrayBuffer | undefined;
    if (srcBufferSource === undefined) {
      srcBuffer = new ArrayBuffer(0); // TextDecoderにあわせた(つもり)
    } else if (Type.isArrayBufferView(srcBufferSource)) {
      srcBuffer = srcBufferSource.buffer;
    } else if (srcBufferSource instanceof ArrayBuffer) {
      srcBuffer = srcBufferSource;
    }

    // Type.assertArrayBuffer(srcBuffer, "");
    if (!srcBuffer) {
      throw new TypeError("`input` must be a `BufferSource`.");
    }

    const buffer = new ArrayBuffer(
      srcBuffer.byteLength + previousPendingBytes.length,
    );
    const bufferView = new Uint8Array(buffer);
    for (let i = 0; i < previousPendingBytes.length; i++) {
      bufferView[i] = previousPendingBytes[i];
    }

    //XXX $03
    bufferView.set(new Uint8Array(srcBuffer), previousPendingBytes.length);

    const runes: Array<rune> = [];
    const { readByteCount, writtenRuneCount, pendingBytes } = this.#decode(
      buffer,
      runes,
      {
        allowPending: inStreaming,
        fatal: this.fatal,
        replacementRune: this.replacementRune,
      },
    );

    let writtenRunesAsString: string;
    if ((removeBOM === true) && (runes[0] === _BOM)) {
      writtenRunesAsString = runes.slice(1).join("");
    } else {
      writtenRunesAsString = runes.join("");
    }

    return {
      readByteCount,
      writtenRuneCount,
      pendingBytes,
      writtenRunesAsString,
    };
  }
}

export type _EncodeResult = {
  readCharCount: safeint;
  writtenByteCount: safeint;
};

type _EncoderEncodeResult = _EncodeResult & {
  writtenBuffer: ArrayBuffer;
  pendingChar: string;
};

type _EncoderCommonInit = {
  name: string;
  fatal: boolean;
  replacementBytes: Array<uint8>;
  encode: (
    srcRunesAsString: string,
    dstBuffer: ArrayBuffer,
    options: {
      fatal: boolean;
      replacementBytes: Array<uint8>;
    },
  ) => _EncodeResult;
  prependBOM: boolean;
  strict: boolean;
  maxBytesPerRune: safeint;
};

class _EncoderCommon extends _CoderCommon {
  readonly #encode: (
    srcRunesAsString: string,
    dstBuffer: ArrayBuffer,
    options: {
      fatal: boolean;
      replacementBytes: Array<uint8>;
    },
  ) => _EncodeResult;
  readonly #prependBOM: boolean;
  readonly #replacementBytes: Array<uint8>;
  readonly #strict: boolean;
  readonly #maxBytesPerRune: safeint;

  constructor(init: _EncoderCommonInit) {
    super(init.name, init.fatal);
    this.#replacementBytes = init.replacementBytes;
    this.#encode = init.encode;
    this.#prependBOM = init.prependBOM;
    this.#strict = init.strict;
    this.#maxBytesPerRune = init.maxBytesPerRune;
  }

  get prependBOM(): boolean {
    return this.#prependBOM;
  }

  get replacementBytes(): Array<uint8> {
    return this.#replacementBytes;
  }

  get strict(): boolean {
    return this.#strict;
  }

  get maxBytesPerRune(): safeint {
    return this.#maxBytesPerRune;
  }

  encode(
    prependBOM: boolean,
    inStreaming: boolean,
    previousPendingChar: string,
    srcRunesAsString?: string,
    dstBuffer?: ArrayBuffer,
  ): _EncoderEncodeResult {
    if (this.#strict === true) {
      Type.assertString(srcRunesAsString, "input");
    }

    const dstBufferSpecified = !!dstBuffer;

    let runesAsString = (srcRunesAsString === undefined)
      ? ""
      : String(srcRunesAsString); // TextEncoder,TextEncoderStreamにあわせた(つもり)

    if (
      (prependBOM === true) &&
      (runesAsString.startsWith(_BOM) !== true)
    ) {
      runesAsString = _BOM + runesAsString;
    } else {
      runesAsString = previousPendingChar + runesAsString;
    }

    let pendingChar = "";
    if (inStreaming === true) {
      if (runesAsString.length > 0) {
        const lastChar = runesAsString.slice(-1);
        if (
          Type.isHighSurrogateCodePoint(lastChar.codePointAt(0) as codepoint)
        ) {
          pendingChar = lastChar;
          runesAsString = runesAsString.slice(0, -1);
        }
      }
    }

    let buffer: ArrayBuffer;
    if (dstBufferSpecified === true) {
      buffer = dstBuffer as ArrayBuffer;
    } else {
      buffer = new ArrayBuffer(runesAsString.length * this.#maxBytesPerRune);
    }

    const { readCharCount, writtenByteCount } = this.#encode(
      runesAsString,
      buffer,
      {
        fatal: this.fatal,
        replacementBytes: this.#replacementBytes,
      },
    );

    if (dstBufferSpecified !== true) {
      buffer = buffer.slice(0, writtenByteCount);
    }

    return {
      readCharCount,
      writtenByteCount,
      writtenBuffer: buffer,
      pendingChar,
    };
  }
}

export abstract class Decoder implements TextDecoder {
  readonly #common: _DecoderCommon;

  readonly #pending: Array<uint8>;

  protected constructor(init: _DecoderCommonInit) {
    this.#common = new _DecoderCommon(init);
    this.#pending = [];
  }

  get encoding(): string {
    return this.#common.encoding;
  }

  get fatal(): boolean {
    return this.#common.fatal;
  }

  get ignoreBOM(): boolean {
    return this.#common.ignoreBOM;
  }

  decode(input?: BufferSource, options?: TextDecodeOptions): string {
    const removeBOM = this.#common.ignoreBOM !== true;
    const inStreaming = options?.stream === true;
    const {
      // readByteCount,
      // writtenRuneCount,
      pendingBytes,
      writtenRunesAsString,
    } = this.#common.decode(removeBOM, inStreaming, [...this.#pending], input);

    this.#pending.splice(0);
    this.#pending.push(...pendingBytes);

    return writtenRunesAsString;
  }
}

export abstract class DecoderStream implements TextDecoderStream {
  readonly #common: _DecoderCommon;

  readonly #stream: TransformStream<Uint8Array<ArrayBuffer>, string>;

  readonly #pendingBytes: Array<uint8>;

  #firstChunkLoaded: boolean;

  protected constructor(init: _DecoderCommonInit) {
    this.#common = new _DecoderCommon(init);

    const self = (): DecoderStream => this;
    const transformer: Transformer<Uint8Array<ArrayBuffer>, string> = {
      transform(
        chunk: Uint8Array<ArrayBuffer>,
        controller: TransformStreamDefaultController<string>,
      ): void {
        try {
          const decoded = self()._decodeChunk(chunk, false);
          if (decoded.length > 0) {
            controller.enqueue(decoded);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(controller: TransformStreamDefaultController<string>): void {
        try {
          const decoded = self()._decodeChunk(undefined, true);
          if (decoded.length > 0) {
            controller.enqueue(decoded);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    };

    this.#stream = new TransformStream<Uint8Array<ArrayBuffer>, string>(
      transformer,
    );
    this.#pendingBytes = [];
    this.#firstChunkLoaded = false;
  }

  get encoding(): string {
    return this.#common.encoding;
  }

  get fatal(): boolean {
    return this.#common.fatal;
  }

  get ignoreBOM(): boolean {
    return this.#common.ignoreBOM;
  }

  get readable(): ReadableStream {
    return this.#stream.readable;
  }

  get writable(): WritableStream {
    return this.#stream.writable;
  }

  abstract get [Symbol.toStringTag](): string;

  protected _decodeChunk(chunk = new Uint8Array(), flush: boolean): string {
    let removeBOM = false;
    if (this.#firstChunkLoaded !== true) {
      this.#firstChunkLoaded = true;
      removeBOM = this.ignoreBOM !== true;
    }

    const { pendingBytes, writtenRunesAsString } = this.#common.decode(
      removeBOM,
      flush !== true,
      [...this.#pendingBytes],
      chunk,
    );
    // console.log([...writtenRunesAsString].map(s=> s.codePointAt(0)?.toString(16)))
    this.#pendingBytes.splice(0);
    this.#pendingBytes.push(...pendingBytes);
    return writtenRunesAsString;
  }
}

export abstract class Encoder /* implements TextEncoder (encodingが"utf-8"ではない為) */ {
  readonly #common: _EncoderCommon;

  protected constructor(init: _EncoderCommonInit) {
    this.#common = new _EncoderCommon(init);
  }

  get encoding(): string {
    return this.#common.encoding as string;
  }

  get fatal(): boolean {
    return this.#common.fatal;
  }

  get prependBOM(): boolean {
    return this.#common.prependBOM;
  }

  //XXX throws TypeError: strict:true、かつ、入力がstring型ではないとき
  //XXX throws TypeError: fatal:true、かつ、入力に符号化方式で符号化できない文字が含まれるとき
  /**
   * @see [TextEncoder.encode](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode)
   */
  encode(input?: string): Uint8Array<ArrayBuffer> {
    const { writtenBuffer } = this.#common.encode(
      this.prependBOM,
      false,
      "",
      input,
    );
    return new Uint8Array(writtenBuffer);
  }

  //XXX throws TypeError: strict:true、かつ、入力がstring型ではないとき
  //XXX throws TypeError: fatal:true、かつ、入力に符号化方式で符号化できない文字が含まれるとき
  /**
   * @see [TextEncoder.encodeInto](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encodeInto)
   */
  encodeInto(
    source: string,
    destination: Uint8Array<ArrayBuffer>,
  ): TextEncoderEncodeIntoResult {
    Type.assertUint8Array(destination, "destination");

    const { readCharCount, writtenByteCount } = this.#common.encode(
      this.prependBOM,
      false,
      "",
      source,
      destination.buffer,
    );
    return {
      read: readCharCount,
      written: writtenByteCount,
    };
  }
}

export abstract class EncoderStream
  implements
    TransformStream /* implements TextEncoderStream (encodingが"utf-8"ではない為) */ {
  readonly #common: _EncoderCommon;

  readonly #stream: TransformStream<string, Uint8Array<ArrayBuffer>>;

  // #pendingChar.lengthが1を超えることは無い
  #pendingChar: string;

  #firstChunkLoaded: boolean;

  protected constructor(init: _EncoderCommonInit) {
    this.#common = new _EncoderCommon(init);

    const self = (): EncoderStream => this;
    const transformer: Transformer<string, Uint8Array<ArrayBuffer>> = {
      transform(
        chunk: string,
        controller: TransformStreamDefaultController<Uint8Array<ArrayBuffer>>,
      ): void {
        try {
          const encoded = self()._encodeChunk(chunk);
          if (encoded.length > 0) {
            controller.enqueue(encoded);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(controller: TransformStreamDefaultController<Uint8Array>): void {
        try {
          if (self().#pendingChar.length > 0) {
            controller.enqueue(
              Uint8Array.from(self().#common.replacementBytes),
            );
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    };

    this.#stream = new TransformStream<string, Uint8Array<ArrayBuffer>>(
      transformer,
    );
    this.#pendingChar = "";
    this.#firstChunkLoaded = false;
  }

  get encoding(): string {
    return this.#common.encoding;
  }

  get fatal(): boolean {
    return this.#common.fatal;
  }

  get prependBOM(): boolean {
    return this.#common.prependBOM;
  }

  get readable(): ReadableStream {
    return this.#stream.readable;
  }

  get writable(): WritableStream {
    return this.#stream.writable;
  }

  abstract get [Symbol.toStringTag](): string;

  /**
   * チャンクを符号化
   *
   * https://encoding.spec.whatwg.org/#interface-textencoderstream のとおりの処理ではないが、結果は同じはず
   *
   * @param chunk - 文字列
   * @returns chunkを符号化したバイト列
   */
  protected _encodeChunk(chunk: string): Uint8Array<ArrayBuffer> {
    let prependBOM = false;
    if (this.#firstChunkLoaded !== true) {
      this.#firstChunkLoaded = true;
      prependBOM = this.prependBOM === true;
    }

    const { pendingChar, writtenBuffer } = this.#common.encode(
      prependBOM,
      true,
      this.#pendingChar,
      chunk,
    );
    this.#pendingChar = pendingChar;
    return new Uint8Array(writtenBuffer);
  }
}
