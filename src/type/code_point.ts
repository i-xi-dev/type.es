import { type codepoint, type safeintrange } from "../type.ts";
import { Radix } from "../const/radix.ts";
import { isSafeIntegerInRange } from "./number.ts";
import {
  MAX_VALUE as MAX_CODE_POINT,
  MIN_VALUE as MIN_CODE_POINT,
} from "../const/code_point.ts";

export function isCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, [MIN_CODE_POINT, MAX_CODE_POINT]);
}

export function assertCodePoint(test: unknown, label: string): void {
  if (isCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a code point.`);
  }
}

const _MIN_HIGH_SURROGATE: codepoint = 0xD800;
const _MAX_HIGH_SURROGATE: codepoint = 0xDBFF;

export function isHighSurrogateCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    [_MIN_HIGH_SURROGATE, _MAX_HIGH_SURROGATE],
  );
}

export function assertHighSurrogateCodePoint(
  test: unknown,
  label: string,
): void {
  if (isHighSurrogateCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a high-surrogate code point.`);
  }
}

const _MIN_LOW_SURROGATE: codepoint = 0xDC00;
const _MAX_LOW_SURROGATE: codepoint = 0xDFFF;

export function isLowSurrogateCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    [_MIN_LOW_SURROGATE, _MAX_LOW_SURROGATE],
  );
}

export function assertLowSurrogateCodePoint(
  test: unknown,
  label: string,
): void {
  if (isLowSurrogateCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a low-surrogate code point.`);
  }
}

export function isSurrogateCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    [_MIN_HIGH_SURROGATE, _MAX_LOW_SURROGATE],
  );
}

export function assertSurrogateCodePoint(
  test: unknown,
  label: string,
): void {
  if (isSurrogateCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a surrogate code point.`);
  }
}

const _MIN_VS: codepoint = 0xFE00;
const _MAX_VS: codepoint = 0xFE0F;
const _MIN_VSS: codepoint = 0xE0100;
const _MAX_VSS: codepoint = 0xE01EF;
const _MIN_MONGOLIAN_VS: codepoint = 0x180B;
const _MAX_MONGOLIAN_VS: codepoint = 0x180F;

export function isVariationSelectorCodePoint(
  test: unknown,
): test is codepoint {
  return isSafeIntegerInRange(test, [_MIN_VS, _MAX_VS]) ||
    isSafeIntegerInRange(test, [_MIN_VSS, _MAX_VSS]) ||
    isSafeIntegerInRange(test, [_MIN_MONGOLIAN_VS, _MAX_MONGOLIAN_VS]);
}

export function assertVariationSelectorCodePoint(
  test: unknown,
  label: string,
): void {
  if (isVariationSelectorCodePoint(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a variation selector code point.`,
    );
  }
}

export function isCodePointInRange(
  test: unknown,
  range: safeintrange<codepoint>,
): test is codepoint {
  assertCodePoint(range[0], "range.min");
  assertCodePoint(range[1], "range.max");

  return isSafeIntegerInRange(test, range);
}

export function assertCodePointInRange(
  test: unknown,
  label: string,
  range: safeintrange<codepoint>,
): void {
  if (isCodePointInRange(test, range) !== true) {
    throw new TypeError(
      `\`${label}\` must be a code point in the range 0x${
        range[0].toString(Radix.HEXADECIMAL)
      }-0x${range[1].toString(Radix.HEXADECIMAL)}.`,
    );
  }
}

const _MAX_BMP = 0xFFFF;

export function isBmpCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, [MIN_CODE_POINT, _MAX_BMP]);
}

export function assertBmpCodePoint(test: unknown, label: string): void {
  if (isBmpCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a code point in the BMP.`);
  }
}

const _MIN_PUA = 0xE000;
const _MAX_PUA = 0xF8FF;
const _MIN_SPUA = 0xF0000;
const _MAX_SPUA = 0x10FFFF;

export function isPrivateUseCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, [_MIN_PUA, _MAX_PUA]) ||
    isSafeIntegerInRange(test, [_MIN_SPUA, _MAX_SPUA]);
  //XXX isSafeIntegerInRanges(test, [[_MIN_PUA, _MAX_PUA], [_MIN_SPUA, _MAX_SPUA]]);
}

export function assertPrivateUseCodePoint(test: unknown, label: string): void {
  if (isPrivateUseCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a private use code point.`);
  }
}

//TODO CodePointInRanges？に移す（extends SafeIntegerRanges）
// export function isCodePointInRanges(
//   test: unknown,
//   ranges: safeintrange.Like<codepoint>[],
// ): test is codepoint {
//   if (isCodePoint(test) !== true) {
//     return false;
//   }
//
//   if (Array.isArray(ranges) !== true) {
//     throw new TypeError("`ranges` must be an `Array`.");
//   }
//
//   let range: safeintrange.Struct<codepoint>;
//   //for (const rangeSource of ranges) {
//   for (let i = 0; i < ranges.length; i++) {
//     try {
//       range = IntegerRange.Struct.fromRangeLike(ranges[i]);
//     } catch {
//       throw new TypeError(
//         `\`ranges[${i}]\` must be a \`safeintrange.Like\`.`,
//       );
//     }
//
//     assertCodePoint(range.min, `ranges[${i}].min`);
//     assertCodePoint(range.max, `ranges[${i}].max`);
//     if ((test >= range.min) && (test <= range.max)) {
//       return true;
//     }
//   }
//
//   return false;
// }
