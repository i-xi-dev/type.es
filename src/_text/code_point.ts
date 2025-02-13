import { assertCodePoint, isCodePoint } from "../type/code_point.ts";
import { type codepoint, type plane } from "../type.ts";
import { isUnicodePlane } from "../type/unicode.ts";
import { isSafeIntegerInRange } from "../type/number.ts";
import { MIN_VALUE as MIN_CODE_POINT } from "../const/code_point.ts";
import { toString as safeIntegerToString } from "../safe_integer/basics.ts";
import { ToStringOptions } from "../_numerics/main.ts";

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
      planes.every((plane) => isUnicodePlane(plane))) !== true
  ) {
    throw new TypeError("`planes` must be a array of planes.");
  }

  return planes.includes(planeOf(test));
}
