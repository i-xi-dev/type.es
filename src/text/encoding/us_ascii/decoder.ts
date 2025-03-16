import {
  _decode,
  _getReplacement,
  _LABEL,
  _MAX_BYTES_PER_RUNE,
} from "./_common.ts";
import { Decoder, DecoderStream } from "../main.ts";

export type UsAsciiDecoderOptions = {
  /** デフォルトfalseだがtrue推奨 */
  fatal?: boolean;

  /** @deprecated */
  replacementChar?: string;
};

export class UsAsciiDecoder extends Decoder {
  constructor(options?: UsAsciiDecoderOptions) {
    super({
      name: _LABEL,
      fatal: options?.fatal === true,
      replacementRune: _getReplacement(options?.replacementChar).rune,
      decode: _decode,
      ignoreBOM: true, // すなわちBOMがあったらエラーになるか置換される
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "UsAsciiDecoder";
  }
}

export class UsAsciiDecoderStream extends DecoderStream {
  constructor(options?: UsAsciiDecoderOptions) {
    super({
      name: _LABEL,
      fatal: options?.fatal === true,
      replacementRune: _getReplacement(options?.replacementChar).rune,
      decode: _decode,
      ignoreBOM: true, // すなわちBOMがあったらエラーになるか置換される
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "UsAsciiDecoderStream";
  }
}
