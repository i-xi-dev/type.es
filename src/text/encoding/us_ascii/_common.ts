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
import { Uint8 } from "../../../numerics/ranged_int/mod.ts";

export const _LABEL = "US-ASCII";

export const _MAX_BYTES_PER_RUNE = 1;

export type _UsAsciiCharBytes = Array<uint8>; // [uint8] ;

// function _isUsAsciiChar(test: string): boolean {
//   // deno-lint-ignore no-control-regex
//   return /^[\u{0}-\u{7F}]$/u.test(test);
// }

const _formatOptions = {
  minIntegralDigits: 2,
  radix: Radix.HEXADECIMAL,
} as const;

export function _decode(
  srcBuffer: ArrayBuffer,
  dstRunes: Array<rune>,
  options: {
    allowPending: boolean;
    fatal: boolean;
    replacementRune: rune;
  },
): _DecodeResult {
  void options.allowPending; // 無意味なので無視

  const srcView = new Uint8Array(srcBuffer);

  let readByteCount = 0;
  let writtenRuneCount = 0;

  for (const byte of srcView) {
    // if ((writtenRuneCount + 1) > xxx) {
    //   break;
    // }
    readByteCount = readByteCount + Uint8.BYTE_LENGTH;

    if (Type.isUint7(byte)) {
      dstRunes.push(String.fromCharCode(byte));
      writtenRuneCount = writtenRuneCount + 1;
    } else {
      if (options.fatal === true) {
        throw new TypeError(
          `decode-error: 0x${SafeInt.toString(byte, _formatOptions)}`,
        );
      } else {
        dstRunes.push(options.replacementRune);
        writtenRuneCount = writtenRuneCount + 1;
      }
    }
  }

  return {
    readByteCount,
    writtenRuneCount,
    pendingBytes: [],
  };
}

export function _encode(
  srcRunesAsString: string,
  dstBuffer: ArrayBuffer,
  options: {
    fatal: boolean;
    replacementBytes: Array<uint8>;
  },
): _EncodeResult {
  const dstView = new Uint8Array(dstBuffer);

  let readCharCount = 0;
  let writtenByteCount = 0;

  for (const rune of srcRunesAsString) {
    const codePoint = rune.codePointAt(0) as codepoint;

    if ((writtenByteCount + 1) > dstView.length) {
      break;
    }
    readCharCount = readCharCount + rune.length;

    if (Type.isUint7(codePoint)) {
      dstView[writtenByteCount] = codePoint;
      writtenByteCount = writtenByteCount + 1;
    } else {
      if (options.fatal === true) {
        throw new TypeError(
          `encode-error: ${CodePoint.toString(codePoint)}`,
        );
      } else {
        dstView[writtenByteCount] = options.replacementBytes[0];
        writtenByteCount = writtenByteCount + 1;
      }
    }
  }

  return {
    readCharCount,
    writtenByteCount,
  };
}

// U+FFFDはUS-ASCIIで表現できないのでU+003Fとする
const _DEFAULT_REPLACEMENT_CHAR = "?";
const _DEFAULT_REPLACEMENT_BYTES: _UsAsciiCharBytes = [0x3F]; // "?"

export function _getReplacement(
  replacementRune: unknown,
): { rune: rune; bytes: _UsAsciiCharBytes } {
  if (Type.isString(replacementRune) && (replacementRune.length === 1)) {
    try {
      const tmp = new ArrayBuffer(_MAX_BYTES_PER_RUNE);
      _encode(
        replacementRune,
        tmp,
        { fatal: true, replacementBytes: _DEFAULT_REPLACEMENT_BYTES },
      );
      return {
        rune: replacementRune,
        bytes: [...(new Uint8Array(tmp))] as Array<uint8>,
      };
    } catch {
      // _DEFAULT_REPLACEMENT_BYTES を返す
    }
  }
  return {
    rune: _DEFAULT_REPLACEMENT_CHAR,
    bytes: _DEFAULT_REPLACEMENT_BYTES,
  };
}
