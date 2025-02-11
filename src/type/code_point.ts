import { type codepoint } from "../type.ts";
import { HEXADECIMAL as HEXADECIMAL_RADIX } from "../numerics/radix.ts";
import { isSafeIntegerInRange } from "./number.ts";
import {
  MAX_VALUE as MAX_CODE_POINT,
  MIN_VALUE as MIN_CODE_POINT,
} from "../const/code_point.ts";

export function isCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, MIN_CODE_POINT, MAX_CODE_POINT);
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
    _MIN_HIGH_SURROGATE,
    _MAX_HIGH_SURROGATE,
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
    _MIN_LOW_SURROGATE,
    _MAX_LOW_SURROGATE,
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
    _MIN_HIGH_SURROGATE,
    _MAX_LOW_SURROGATE,
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
  return isSafeIntegerInRange(test, _MIN_VS, _MAX_VS) ||
    isSafeIntegerInRange(test, _MIN_VSS, _MAX_VSS) ||
    isSafeIntegerInRange(test, _MIN_MONGOLIAN_VS, _MAX_MONGOLIAN_VS);
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
  min: codepoint,
  max: codepoint,
): test is codepoint {
  assertCodePoint(min, "min");
  assertCodePoint(max, "max");

  return isSafeIntegerInRange(test, min, max);
}

export function assertCodePointInRange(
  test: unknown,
  label: string,
  min: codepoint,
  max: codepoint,
): void {
  if (isCodePointInRange(test, min, max) !== true) {
    throw new TypeError(
      `\`${label}\` must be a code point in the range 0x${
        min.toString(HEXADECIMAL_RADIX)
      }-0x${max.toString(HEXADECIMAL_RADIX)}.`,
    );
  }
}

//XXX
// export function isCodePointInRanges(
//   test: unknown,
//   ranges: SafeIntegerRange.Like<codepoint>[],
// ): test is codepoint {
//   if (isCodePoint(test) !== true) {
//     return false;
//   }
//
//   if (Array.isArray(ranges) !== true) {
//     throw new TypeError("`ranges` must be an `Array`.");
//   }
//
//   let range: SafeIntegerRange.Struct<codepoint>;
//   //for (const rangeSource of ranges) {
//   for (let i = NUMBER_ZERO; i < ranges.length; i++) {
//     try {
//       range = IntegerRange.Struct.fromRangeLike(ranges[i]);
//     } catch {
//       throw new TypeError(
//         `\`ranges[${i}]\` must be a \`SafeIntegerRange.Like\`.`,
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
