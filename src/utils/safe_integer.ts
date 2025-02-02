import * as BigInteger from "./big_integer.ts";
import { assertSafeInteger, type safeint } from "../type/number.ts";
import { normalize } from "./number.ts";
import { type radix } from "./radix.ts";

export function clamp<T extends safeint>(value: safeint, min: T, max: T): T {
  assertSafeInteger(value, "value");
  assertSafeInteger(min, "min");
  assertSafeInteger(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}

export type FromStringOptions = {
  radix?: radix;
};

export function fromString(
  value: string,
  options?: FromStringOptions,
): safeint {
  const valueAsBigInt = BigInteger.fromString(value, options);
  return BigInteger.toNumber(valueAsBigInt);
}

export function fromBigInt(value: bigint): safeint {
  return BigInteger.toNumber(value);
}

export function toBigInt(value: safeint): bigint {
  assertSafeInteger(value, "value");
  return BigInt(value);
}
