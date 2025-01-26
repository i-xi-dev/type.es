import { assertNumber } from "../type/assert.ts";
import { isNumber } from "../type/is.ts";

export function isInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  assertNumber(min, "min");
  assertNumber(max, "max");
  if (Number.isNaN(min)) {
    throw new TypeError("`min` must not be `NaN`.");
  }
  if (Number.isNaN(max)) {
    throw new TypeError("`max` must not be `NaN`.");
  }

  return isNumber(test) && (min <= test) && (max >= test);
}
