import {
  _encode,
  _getReplacement,
  _LABEL,
  _MAX_BYTES_PER_RUNE,
} from "./_common.ts";
import { Encoder, EncoderStream } from "../main.ts";

export type UsAsciiEncoderOptions = {
  /** デフォルトfalseだがtrue推奨 */
  fatal?: boolean;

  /** @deprecated */
  replacementChar?: string;

  /** デフォルトfalseだがtrue推奨 */
  strict?: boolean;
};

export class UsAsciiEncoder extends Encoder {
  constructor(options: UsAsciiEncoderOptions = {}) {
    super({
      name: _LABEL,
      fatal: options?.fatal === true,
      replacementBytes: _getReplacement(options?.replacementChar).bytes,
      encode: _encode,
      prependBOM: false,
      strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "UsAsciiEncoder";
  }
}

export class UsAsciiEncoderStream extends EncoderStream {
  constructor(options: UsAsciiEncoderOptions = {}) {
    super({
      name: _LABEL,
      fatal: options?.fatal === true,
      replacementBytes: _getReplacement(options?.replacementChar).bytes,
      encode: _encode,
      prependBOM: false,
      strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "UsAsciiEncoderStream";
  }
}
