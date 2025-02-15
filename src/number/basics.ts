import { assertNumber } from "../type/number.ts";
import { assertNumberRange } from "../type/numeric_range.ts";
import { type NumberRange } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function normalize<T extends number>(value: T): T {
  assertNumber(value, "value");
  return ((value === NUMBER_ZERO) ? (value + NUMBER_ZERO) : value) as T; // -0を0
}

export function clampToRange<T extends number>(
  value: number,
  range: NumberRange<T>,
): T {
  assertNumber(value, "value");
  assertNumberRange(range, "range");

  const [min, max] = range;
  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}
