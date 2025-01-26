import { assertBigInt } from "./assert.ts";
import { assertFiniteNumber, isNumber } from "./number.ts";
import { isBigInt } from "./is_0.ts";

export function isBigIntInRange(
  test: unknown,
  min: bigint,
  max: bigint,
): test is bigint {
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  return isBigInt(test) && (min <= test) && (max >= test);
}
