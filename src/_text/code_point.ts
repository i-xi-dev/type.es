import { assertCodePoint, isCodePoint } from "../type/code_point.ts";
import { type codepoint, type plane } from "../type.ts";
import { IntegerRange } from "../_numerics/integer_range.ts";
import { is as isPlane } from "./plane.ts";
import { isSafeIntegerInRange } from "../type/number.ts";
import { MIN_VALUE as MIN_CODE_POINT } from "../const/code_point.ts";
import { SafeIntegerRange } from "../_numerics/safe_integer_range.ts";
import { toString as safeIntegerToString } from "../safe_integer/basics.ts";
import { ToStringOptions } from "../_numerics/main.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

const _toStringOptions: ToStringOptions = {
  // lowerCase: false,
  minIntegralDigits: 4,
  radix: 16,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint, "codePoint");
  return `U+${safeIntegerToString(codePoint, _toStringOptions)}`;
}

export function planeOf(codePoint: codepoint): plane {
  assertCodePoint(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as plane;
}

export function isBmp(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, MIN_CODE_POINT, 0xFFFF);
}

export function isInPlanes(test: unknown, planes: plane[]): test is codepoint {
  if (isCodePoint(test) !== true) {
    return false;
  }

  if (
    (Array.isArray(planes) &&
      planes.every((plane) => isPlane(plane))) !== true
  ) {
    throw new TypeError("`planes` must be a array of planes.");
  }

  return planes.includes(planeOf(test));
}

const _MIN_VS: codepoint = 0xFE00;
const _MAX_VS: codepoint = 0xFE0F;
const _MIN_VSS: codepoint = 0xE0100;
const _MAX_VSS: codepoint = 0xE01EF;
const _MIN_MONGOLIAN_VS: codepoint = 0x180B;
const _MAX_MONGOLIAN_VS: codepoint = 0x180F;

export function isVariationSelector(
  test: unknown,
): test is codepoint {
  return isSafeIntegerInRange(test, _MIN_VS, _MAX_VS) ||
    isSafeIntegerInRange(test, _MIN_VSS, _MAX_VSS) ||
    isSafeIntegerInRange(test, _MIN_MONGOLIAN_VS, _MAX_MONGOLIAN_VS);
}

export function isInRanges(
  test: unknown,
  ranges: SafeIntegerRange.Like<codepoint>[],
): test is codepoint {
  if (isCodePoint(test) !== true) {
    return false;
  }

  if (Array.isArray(ranges) !== true) {
    throw new TypeError("`ranges` must be an `Array`.");
  }

  let range: SafeIntegerRange.Struct<codepoint>;
  //for (const rangeSource of ranges) {
  for (let i = NUMBER_ZERO; i < ranges.length; i++) {
    try {
      range = IntegerRange.Struct.fromRangeLike(ranges[i]);
    } catch {
      throw new TypeError(
        `\`ranges[${i}]\` must be a \`SafeIntegerRange.Like\`.`,
      );
    }

    assertCodePoint(range.min, `ranges[${i}].min`);
    assertCodePoint(range.max, `ranges[${i}].max`);
    if ((test >= range.min) && (test <= range.max)) {
      return true;
    }
  }

  return false;
}
