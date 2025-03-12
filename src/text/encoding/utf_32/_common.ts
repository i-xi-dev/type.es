import * as CodePoint from "../../code_point/mod.ts";
import * as Radix from "../../../basics/radix/mod.ts";
import * as SafeInt from "../../../numerics/safeint/mod.ts";
import * as Type from "../../../type/mod.ts";
import { _DecodeResult, _EncodeResult } from "../main.ts";
import {
  type codepoint,
  type rune,
  type uint8,
} from "../../../_typedef/mod.ts";
import { Uint32, Uint8 } from "../../../numerics/ranged_int/mod.ts";

export const _BE_LABEL = "UTF-32BE";
export const _LE_LABEL = "UTF-32LE";

export const _MAX_BYTES_PER_RUNE = 4;

type _RuneBytes = Array<uint8>; // [uint8, uint8, uint8, uint8] ;

const _formatOptions = {
  minIntegralDigits: 8,
  radix: Radix.HEXADECIMAL,
} as const;

function _decodeShared(
  srcBuffer: ArrayBuffer,
  dstRunes: Array<rune>,
  options: {
    allowPending: boolean;
    fatal: boolean;
    replacementRune: rune;
  },
  littleEndian: boolean,
): _DecodeResult {
  const srcView = new DataView(srcBuffer);

  let readByteCount = 0;
  let writtenRuneCount = 0;
  const pendingBytes: Array<uint8> = [];

  const srcByteCount = srcView.byteLength;
  const loopCount = (srcByteCount % Uint32.BYTE_LENGTH)
    ? (srcByteCount + Uint32.BYTE_LENGTH)
    : srcByteCount;
  for (let i = 0; i < loopCount; i = i + Uint32.BYTE_LENGTH) {
    let s = false;
    let uint32: number;
    if ((srcByteCount - i) < Uint32.BYTE_LENGTH) {
      if (options.allowPending === true) {
        for (let j = i; j < srcByteCount; j++) {
          pendingBytes.push(srcView.getUint8(j) as uint8);
        }
        break;
      } else {
        // 4バイトで割り切れない場合TextDecode("utf-16xx")に合わせる
        if (options.fatal === true) {
          throw new TypeError(`decode-error: invalid data`);
        } else {
          // 端数バイトはU+FFFDにデコードする）
          s = true;
          uint32 = Number.NaN;
        }
      }
    } else {
      uint32 = srcView.getUint32(i, littleEndian);
    }

    // if ((writtenRuneCount + 1) > xxx) {
    //   break;
    // }
    readByteCount = readByteCount + Uint32.BYTE_LENGTH;

    if (Type.isCodePoint(uint32)) {
      dstRunes.push(String.fromCodePoint(uint32));
      writtenRuneCount = writtenRuneCount + 1;
    } else {
      if (options.fatal === true) {
        throw new TypeError(
          `decode-error: 0x${
            SafeInt.toString(uint32 as number, _formatOptions)
          }`,
        );
      } else {
        dstRunes.push(options.replacementRune);
        writtenRuneCount = writtenRuneCount + 1;
      }
    }

    if (s === true) {
      break;
    }
  }

  return {
    readByteCount,
    writtenRuneCount,
    pendingBytes,
  };
}

export function _decodeBe(
  srcBuffer: ArrayBuffer,
  dstRunes: Array<rune>,
  options: {
    allowPending: boolean;
    fatal: boolean;
    replacementRune: rune;
  },
): _DecodeResult {
  return _decodeShared(srcBuffer, dstRunes, options, false);
}

export function _decodeLe(
  srcBuffer: ArrayBuffer,
  dstRunes: Array<rune>,
  options: {
    allowPending: boolean;
    fatal: boolean;
    replacementRune: rune;
  },
): _DecodeResult {
  return _decodeShared(srcBuffer, dstRunes, options, true);
}

function _encodeShared(
  srcString: string,
  dstBuffer: ArrayBuffer,
  options: {
    fatal: boolean; // エンコードのエラーは単独のサロゲートの場合のみ
    replacementBytes: Array<uint8>;
  },
  littleEndian: boolean,
): _EncodeResult {
  const dstView = new DataView(dstBuffer);

  let readCharCount = 0;
  let writtenByteCount = 0;

  for (const rune of srcString) {
    const codePoint = rune.codePointAt(0) as codepoint;

    if (
      (writtenByteCount + (rune.length * Uint32.BYTE_LENGTH)) >
        dstView.byteLength
    ) {
      break;
    }
    readCharCount = readCharCount + rune.length;

    if (Type.isSurrogateCodePoint(codePoint) !== true) {
      dstView.setUint32(
        writtenByteCount,
        rune.codePointAt(0) as codepoint,
        littleEndian,
      );
      writtenByteCount = writtenByteCount + Uint32.BYTE_LENGTH;
    } else {
      if (options.fatal === true) {
        throw new TypeError(
          `encode-error: ${CodePoint.toString(codePoint)}`,
        );
      } else {
        for (const byte of options.replacementBytes) {
          dstView.setUint8(writtenByteCount, byte);
          writtenByteCount = writtenByteCount + Uint8.BYTE_LENGTH;
        }
      }
    }
  }

  return {
    readCharCount,
    writtenByteCount,
  };
}

export function _encodeBe(
  srcString: string,
  dstBuffer: ArrayBuffer,
  options: {
    fatal: boolean;
    replacementBytes: Array<uint8>;
  },
): _EncodeResult {
  return _encodeShared(srcString, dstBuffer, options, false);
}

export function _encodeLe(
  srcString: string,
  dstBuffer: ArrayBuffer,
  options: {
    fatal: boolean;
    replacementBytes: Array<uint8>;
  },
): _EncodeResult {
  return _encodeShared(srcString, dstBuffer, options, true);
}

export const _DEFAULT_REPLACEMENT_CHAR = "\u{FFFD}";
const _DEFAULT_REPLACEMENT_BYTES_BE: _RuneBytes = [0x00, 0x00, 0xFF, 0xFD];
const _DEFAULT_REPLACEMENT_BYTES_LE: _RuneBytes = [0xFD, 0xFF, 0x00, 0x00];

export function _getReplacement(
  replacementRune: unknown,
  littleEndian: boolean,
): { rune: rune; bytes: _RuneBytes } {
  if (Type.isString(replacementRune) && (replacementRune.length === 1)) {
    try {
      const tmp = new ArrayBuffer(_MAX_BYTES_PER_RUNE);
      const { writtenByteCount } = _encodeShared(
        replacementRune,
        tmp,
        {
          fatal: true,
          replacementBytes: littleEndian
            ? _DEFAULT_REPLACEMENT_BYTES_LE
            : _DEFAULT_REPLACEMENT_BYTES_BE,
        },
        littleEndian,
      );
      return {
        rune: replacementRune,
        bytes: [...new Uint8Array(tmp.slice(0, writtenByteCount))] as Array<
          uint8
        >,
      };
    } catch {
      // _DEFAULT_REPLACEMENT_BYTES を返す
    }
  }
  return {
    rune: _DEFAULT_REPLACEMENT_CHAR,
    bytes: littleEndian
      ? _DEFAULT_REPLACEMENT_BYTES_LE
      : _DEFAULT_REPLACEMENT_BYTES_BE,
  };
}
