import { number } from "./assert.ts";
import { isNumber } from "./type.ts";

export function isInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  number(min, "min");
  number(max, "max");
  if (Number.isNaN(min)) {
    throw new TypeError("`min` must not be `NaN`.");
  }
  if (Number.isNaN(max)) {
    throw new TypeError("`max` must not be `NaN`.");
  }

  return isNumber(test) && (min <= test) && (max >= test);
}

export function normalize<T extends number>(value: T): T {
  number(value, "value");
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

export function clamp<T extends number>(
  value: number,
  min: T,
  max: T,
): T {
  number(value, "value");
  number(min, "min");
  number(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}
