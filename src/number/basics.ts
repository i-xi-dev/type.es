import { assertNumber } from "../type/number.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function normalize<T extends number>(value: T): T {
  assertNumber(value, "value");
  return ((value === NUMBER_ZERO) ? (value + NUMBER_ZERO) : value) as T; // -0を0
}

export function clamp<T extends number>(
  value: number,
  min: T,
  max: T,
): T {
  assertNumber(value, "value");
  assertNumber(min, "min");
  assertNumber(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}
