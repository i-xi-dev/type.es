/**
 * The decoder that converts a string into a byte sequence.
 */
export interface Decoder {
  get [Symbol.toStringTag](): string;

  /**
   * Converts a string into a byte sequence.
   *
   * @param encoded An encoded string to decode.
   * @returns A decoded byte sequence.
   */
  decode(encoded: string): Uint8Array<ArrayBuffer>;
}

/**
 * The encoder that converts a byte sequence into a string.
 */
export interface Encoder {
  get [Symbol.toStringTag](): string;

  /**
   * Converts a byte sequence into a string.
   *
   * @param toEncode A byte sequence to encode.
   * @returns An encoded string.
   */
  encode(toEncode: Uint8Array<ArrayBuffer>): string;
}

export interface DecoderStreamRegulator {
  regulate(chunk: string): string;
  flush(): string;
}

/**
 * The `BytesEncoding.DecoderStream` converts a stream of string into byte sequence.
 */
export abstract class DecoderStream
  implements TransformStream<string, Uint8Array<ArrayBuffer>> {
  readonly #stream: TransformStream<string, Uint8Array<ArrayBuffer>>;

  constructor(decoder: Decoder, regulator: DecoderStreamRegulator) {
    this.#stream = new TransformStream<string, Uint8Array<ArrayBuffer>>(
      DecoderStream._createTransformer(decoder, regulator),
    );
  }

  protected static _createTransformer(
    decoder: Decoder,
    regulator: DecoderStreamRegulator,
  ): Transformer<string, Uint8Array<ArrayBuffer>> {
    return {
      transform(
        chunk: string,
        controller: TransformStreamDefaultController<Uint8Array<ArrayBuffer>>,
      ): void {
        try {
          const toDecode = regulator.regulate(chunk);
          const decoded = decoder.decode(toDecode);
          controller.enqueue(decoded);
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(
        controller: TransformStreamDefaultController<Uint8Array<ArrayBuffer>>,
      ): void {
        try {
          const toDecode = regulator.flush();
          if (toDecode.length > 0) {
            const decoded = decoder.decode(toDecode);
            controller.enqueue(decoded);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    };
  }

  /**
   * @see [TransformStream.writable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/writable)
   */
  get writable(): WritableStream<string> {
    return this.#stream.writable;
  }

  /**
   * @see [TransformStream.readable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/readable)
   */
  get readable(): ReadableStream<Uint8Array<ArrayBuffer>> {
    return this.#stream.readable;
  }

  abstract get [Symbol.toStringTag](): string;
}

export interface EncoderStreamRegulator {
  regulate(chunk: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer>;
  flush(): Uint8Array<ArrayBuffer>;
}

/**
 * The `BytesEncoding.EncoderStream` converts a stream of byte sequence into string.
 */
export abstract class EncoderStream
  implements TransformStream<Uint8Array<ArrayBuffer>, string> {
  readonly #stream: TransformStream<Uint8Array<ArrayBuffer>, string>;

  constructor(encoder: Encoder, regulator: EncoderStreamRegulator) {
    this.#stream = new TransformStream<Uint8Array<ArrayBuffer>, string>(
      EncoderStream._createTransformer(encoder, regulator),
    );
  }

  protected static _createTransformer(
    encoder: Encoder,
    regulator: EncoderStreamRegulator,
  ): Transformer<Uint8Array<ArrayBuffer>, string> {
    return {
      transform(
        chunk: Uint8Array<ArrayBuffer>,
        controller: TransformStreamDefaultController<string>,
      ): void {
        try {
          const toEncode = regulator.regulate(chunk);
          const encoded = encoder.encode(toEncode);
          controller.enqueue(encoded);
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(controller: TransformStreamDefaultController<string>): void {
        try {
          const toEncode = regulator.flush();
          if (toEncode.length > 0) {
            const encoded = encoder.encode(toEncode);
            controller.enqueue(encoded);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    };
  }

  /**
   * @see [TransformStream.writable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/writable)
   */
  get writable(): WritableStream<Uint8Array<ArrayBuffer>> {
    return this.#stream.writable;
  }

  /**
   * @see [TransformStream.readable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/readable)
   */
  get readable(): ReadableStream<string> {
    return this.#stream.readable;
  }

  abstract get [Symbol.toStringTag](): string;
}
