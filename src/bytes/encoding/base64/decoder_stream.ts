import { Base64Decoder } from "./decoder.ts";
import { Base64Options } from "./options.ts";
import { DecoderStream, DecoderStreamRegulator } from "../main.ts";
import { String as ExString } from "../../../basics/mod.ts";

const { EMPTY } = ExString;

class _DecoderStreamRegulator implements DecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = EMPTY;
  }

  regulate(chunk: string): string {
    const temp = this.#pending + chunk;
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return EMPTY;
    } else if (surplus === 0) {
      this.#pending = EMPTY;
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.substring(pendingLength);
      return temp.substring(0, pendingLength);
    }
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = EMPTY;
    return remains;
  }
}

/**
 * The `TransformStream` that decodes a stream of Base64-encoded string into `Uint8Array` stream.
 *
 * @example
 * ```javascript
 * const decoderStream = new Base64.DecoderStream();
 * // readableStream: ReadableStream<string>
 * // writableStream: WritableStream<Uint8Array>
 *
 * readableStream.pipeThrough(decoderStream).pipeTo(writableStream);
 * ```
 */
export class Base64DecoderStream extends DecoderStream {
  /**
   * @param options The `Base64.Options` dictionary.
   */
  constructor(options?: Base64Options) {
    const decoder = new Base64Decoder(options);
    const regulator = new _DecoderStreamRegulator();
    super(decoder, regulator);
    Object.freeze(this);
  }

  get [Symbol.toStringTag](): string {
    return "Base64DecoderStream";
  }
}
