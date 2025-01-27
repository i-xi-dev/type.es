import { assertSafeInteger, type safeint } from "../type/number.ts";
import { normalize } from "./number.ts";

export function clamp<T extends safeint>(value: safeint, min: T, max: T): T {
  assertSafeInteger(value, "value");
  assertSafeInteger(min, "min");
  assertSafeInteger(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}
