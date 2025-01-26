import { assertBigInt, isBigInt } from "./bigint.ts";

export function isBigIntInRange(
  test: unknown,
  min: bigint,
  max: bigint,
): test is bigint {
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  return isBigInt(test) && (min <= test) && (max >= test);
}
