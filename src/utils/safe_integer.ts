import * as BigInteger from "./big_integer.ts";
import {
  assertSafeInteger,
  isPositiveNumber,
  type safeint,
} from "../type/number.ts";
import { normalize } from "./number.ts";
import {
  assertSupportedRadix,
  DECIMAL as DECIMAL_RADIX,
  type radix,
} from "./radix.ts";

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

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: radix;
};

export function toString(value: safeint, options?: ToStringOptions): string {
  assertSafeInteger(value, "value");
  const radix = options?.radix ?? DECIMAL_RADIX;
  assertSupportedRadix(radix, "radix");

  let result = value.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (isPositiveNumber(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}

export function fromBigInt(value: bigint): safeint {
  return BigInteger.toNumber(value);
}

export function toBigInt(value: safeint): bigint {
  assertSafeInteger(value, "value");
  return BigInt(value);
}
