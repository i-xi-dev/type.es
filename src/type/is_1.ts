import { assertBigInt, assertFiniteNumber } from "./assert.ts";
import { isBigInt, isNumber } from "./is_0.ts";

export function isNumberInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");

  return isNumber(test) && (min <= test) && (max >= test);
}

export function isBigIntInRange(
  test: unknown,
  min: bigint,
  max: bigint,
): test is bigint {
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  return isBigInt(test) && (min <= test) && (max >= test);
}
