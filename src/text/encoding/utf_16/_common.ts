import * as CodePoint from "../../code_point/mod.ts";
import * as Type from "../../../type/mod.ts";
import { _DecodeResult, _EncodeResult } from "../main.ts";
import {
  type codepoint,
  type rune,
  type uint8,
} from "../../../_typedef/mod.ts";
import { Uint16, Uint8 } from "../../../numerics/mod.ts";

export const _BE_LABEL = "UTF-16BE";
export const _LE_LABEL = "UTF-16LE";

export const _MAX_BYTES_PER_RUNE = 4;

type _RuneBytes = Array<uint8>; // [uint8, uint8] | [uint8, uint8, uint8, uint8] ;

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
      (writtenByteCount + (rune.length * Uint16.BYTE_LENGTH)) >
        dstView.byteLength
    ) {
      break;
    }
    readCharCount += rune.length;

    if (Type.isSurrogateCodePoint(codePoint) !== true) {
      for (let i = 0; i < rune.length; i++) {
        dstView.setUint16(
          writtenByteCount,
          rune.charCodeAt(i),
          littleEndian,
        );
        writtenByteCount += Uint16.BYTE_LENGTH;
      }
    } else {
      if (options.fatal === true) {
        throw new TypeError(
          `encode-error: ${CodePoint.toString(codePoint)}`,
        );
      } else {
        for (const byte of options.replacementBytes) {
          dstView.setUint8(writtenByteCount, byte);
          writtenByteCount += Uint8.BYTE_LENGTH;
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
const _DEFAULT_REPLACEMENT_BYTES_BE: _RuneBytes = [0xFF, 0xFD];
const _DEFAULT_REPLACEMENT_BYTES_LE: _RuneBytes = [0xFD, 0xFF];

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
