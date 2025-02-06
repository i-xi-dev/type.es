import * as SafeInteger from "../sp/safe_integer.ts";
import { type codepoint, type plane } from "../type.ts";
import { IntegerRange } from "../_numerics/integer_range.ts";
import { is as isPlane } from "./plane.ts";
import { isSafeIntegerInRange } from "../type/number.ts";
import { SafeIntegerRange } from "../_numerics/safe_integer_range.ts";
import { ToStringOptions } from "../_numerics/main.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export const MIN_VALUE = 0x0;

export const MAX_VALUE = 0x10FFFF;

export function is(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, MIN_VALUE, MAX_VALUE);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be a code point.`);
  }
}

const _toStringOptions: ToStringOptions = {
  // lowerCase: false,
  minIntegralDigits: 4,
  radix: 16,
} as const;

export function toString(codePoint: codepoint): string {
  assert(codePoint, "codePoint");
  return `U+${SafeInteger.toString(codePoint, _toStringOptions)}`;
}

export function planeOf(codePoint: codepoint): plane {
  assert(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as plane;
}

export function isBmp(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, MIN_VALUE, 0xFFFF);
}

export function isInPlanes(test: unknown, planes: plane[]): test is codepoint {
  if (is(test) !== true) {
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

const _MIN_HIGH_SURROGATE: codepoint = 0xD800;
const _MAX_HIGH_SURROGATE: codepoint = 0xDBFF;

export function isHighSurrogate(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    _MIN_HIGH_SURROGATE,
    _MAX_HIGH_SURROGATE,
  );
}

const _MIN_LOW_SURROGATE: codepoint = 0xDC00;
const _MAX_LOW_SURROGATE: codepoint = 0xDFFF;

export function isLowSurrogate(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    _MIN_LOW_SURROGATE,
    _MAX_LOW_SURROGATE,
  );
}

export function isSurrogate(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    _MIN_HIGH_SURROGATE,
    _MAX_LOW_SURROGATE,
  );
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
  if (is(test) !== true) {
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

    assert(range.min, `ranges[${i}].min`);
    assert(range.max, `ranges[${i}].max`);
    if ((test >= range.min) && (test <= range.max)) {
      return true;
    }
  }

  return false;
}
