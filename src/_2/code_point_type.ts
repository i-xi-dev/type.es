import { codepoint, plane } from "../_.ts";
import { IntegerRange } from "../_1/integer_range.ts";
import {
  isInRange as isSafeIntegerInRange,
  toString as safeIntegerToString,
} from "../_0/safe_integer_type.ts";
import { Radix, ToStringOptions } from "../numerics.ts";
import { SafeIntegerRange } from "../_1/safe_integer_range.ts";

export const MIN_VALUE = 0x0;

export const MAX_VALUE = 0x10FFFF;

export function isCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, MIN_VALUE, MAX_VALUE);
}

export function assertCodePoint(test: unknown, label: string): void {
  if (isCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a code point.`);
  }
}

const _toStringOptions: ToStringOptions = {
  // lowerCase: false,
  minIntegralDigits: 4,
  radix: Radix.HEXADECIMAL,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint, "codePoint");
  return `U+${safeIntegerToString(codePoint, _toStringOptions)}`;
}

export function planeOf(codePoint: codepoint): plane {
  assertCodePoint(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as plane;
}

export function isBmp(codePoint: codepoint): codePoint is codepoint {
  return isSafeIntegerInRange(codePoint, MIN_VALUE, 0xFFFF);
}

const _BMP: plane = 0;
const _SPUA_B: plane = 16;

function _isPlane(test: unknown): test is plane {
  return isSafeIntegerInRange(test, _BMP, _SPUA_B);
}

export function isInPlanes(
  codePoint: codepoint,
  planes: plane[],
): codePoint is codepoint {
  if (
    (Array.isArray(planes) &&
      planes.every((plane) => _isPlane(plane))) !== true
  ) {
    throw new TypeError("`planes` must be a array of planes.");
  }

  return planes.includes(planeOf(codePoint));
}

const _MIN_HIGH_SURROGATE: codepoint = 0xD800;
const _MAX_HIGH_SURROGATE: codepoint = 0xDBFF;

export function isHighSurrogate(codePoint: codepoint): codePoint is codepoint {
  return isSafeIntegerInRange(
    codePoint,
    _MIN_HIGH_SURROGATE,
    _MAX_HIGH_SURROGATE,
  );
}

const _MIN_LOW_SURROGATE: codepoint = 0xDC00;
const _MAX_LOW_SURROGATE: codepoint = 0xDFFF;

export function isLowSurrogate(codePoint: codepoint): codePoint is codepoint {
  return isSafeIntegerInRange(
    codePoint,
    _MIN_LOW_SURROGATE,
    _MAX_LOW_SURROGATE,
  );
}

export function isSurrogate(codePoint: codepoint): codePoint is codepoint {
  return isSafeIntegerInRange(
    codePoint,
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
  codePoint: codepoint,
): codePoint is codepoint {
  return isSafeIntegerInRange(codePoint, _MIN_VS, _MAX_VS) ||
    isSafeIntegerInRange(codePoint, _MIN_VSS, _MAX_VSS) ||
    isSafeIntegerInRange(codePoint, _MIN_MONGOLIAN_VS, _MAX_MONGOLIAN_VS);
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
  for (let i = 0; i < ranges.length; i++) {
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
