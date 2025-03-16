import {
  _BE_LABEL,
  _decodeBe,
  _decodeLe,
  _DEFAULT_REPLACEMENT_CHAR,
  _getReplacement,
  _LE_LABEL,
  _MAX_BYTES_PER_RUNE,
} from "./_common.ts";
import { Decoder } from "../main.ts";

export type Utf32DecoderOptions = {
  fatal?: boolean;
  ignoreBOM?: boolean;
  // strict?: boolean;
};

//XXX 必要？BOMでBEかLEか判断する版

/** @deprecated */
export class Utf32BeDecoder extends Decoder {
  constructor(options: Utf32DecoderOptions = {}) {
    super({
      name: _BE_LABEL,
      fatal: options?.fatal === true,
      replacementRune: _getReplacement(_DEFAULT_REPLACEMENT_CHAR, false).rune,
      decode: _decodeBe,
      ignoreBOM: options?.ignoreBOM === true,
      // strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "Utf32BeDecoder";
  }
}

//XXX Utf32BeDecoderStream

/** @deprecated */
export class Utf32LeDecoder extends Decoder {
  constructor(options: Utf32DecoderOptions = {}) {
    super({
      name: _LE_LABEL,
      fatal: options?.fatal === true,
      replacementRune: _getReplacement(_DEFAULT_REPLACEMENT_CHAR, true).rune,
      decode: _decodeLe,
      ignoreBOM: options?.ignoreBOM === true,
      // strict: options?.strict === true,
      maxBytesPerRune: _MAX_BYTES_PER_RUNE,
    });
  }

  override get [Symbol.toStringTag](): string {
    return "Utf32LeDecoder";
  }
}

//XXX Utf32LeDecoderStream
