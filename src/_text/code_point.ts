import { isCodePoint } from "../type/code_point.ts";
import { type codepoint, type plane } from "../type.ts";
import { isUnicodePlane } from "../type/unicode.ts";
import { isSafeIntegerInRange } from "../type/number.ts";
import { MIN_VALUE as MIN_CODE_POINT } from "../const/code_point.ts";
import { planeOf } from "../code_point/basics.ts";

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
