import {
  _BE_LABEL,
  _DEFAULT_REPLACEMENT_CHAR,
  _encodeBe,
  _encodeLe,
  _getReplacement,
  _LE_LABEL,
  _MAX_BYTES_PER_RUNE,
} from "./_common.ts";
import { Encoder, EncoderStream } from "../main.ts";

export type Utf32EncoderOptions = {
  fatal?: boolean;
  prependBOM?: boolean;
  strict?: boolean;
};

//XXX 必要？プラットフォームのバイトオーダーでエンコード

/** @deprecated */
export class Utf32BeEncoder extends Encoder {
  constructor(options: Utf32EncoderOptions = {}) {
    super({
      name: _BE_LABEL,
      fatal: options?.fatal === true,
      replacementBytes: _getReplacement(_DEFAULT_REPLACEMENT_CHAR, false).bytes,
      encode: _encodeBe,
      prependBOM: options?.prependBOM === true,
      strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "Utf32BeEncoder";
  }
}

/** @deprecated */
export class Utf32BeEncoderStream extends EncoderStream {
  constructor(options: Utf32EncoderOptions = {}) {
    super({
      name: _BE_LABEL,
      fatal: options?.fatal === true,
      replacementBytes: _getReplacement(_DEFAULT_REPLACEMENT_CHAR, false).bytes,
      encode: _encodeBe,
      prependBOM: options?.prependBOM === true,
      strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "Utf32BeEncoderStream";
  }
}

/** @deprecated */
export class Utf32LeEncoder extends Encoder {
  constructor(options: Utf32EncoderOptions = {}) {
    super({
      name: _LE_LABEL,
      fatal: options?.fatal === true,
      replacementBytes: _getReplacement(_DEFAULT_REPLACEMENT_CHAR, true).bytes,
      encode: _encodeLe,
      prependBOM: options?.prependBOM === true,
      strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "Utf32LeEncoder";
  }
}

/** @deprecated */
export class Utf32LeEncoderStream extends EncoderStream {
  constructor(options: Utf32EncoderOptions = {}) {
    super({
      name: _LE_LABEL,
      fatal: options?.fatal === true,
      replacementBytes: _getReplacement(_DEFAULT_REPLACEMENT_CHAR, true).bytes,
      encode: _encodeLe,
      prependBOM: options?.prependBOM === true,
      strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "Utf32LeEncoderStream";
  }
}
