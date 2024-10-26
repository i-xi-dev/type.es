import {
  assertBigInt,
  fromString as fromStringToBigInt,
  isInRange as isBigIntInRange,
} from "./bigint_type.ts";
import { FromStringOptions, ToStringOptions } from "./integer_type.ts";
import {
  clamp as clampNumber,
  isPositive as isPositiveNumber,
  normalize as normalizeNumber,
} from "./number_type.ts";
import { radixPropertiesOf } from "./numeric_type.ts";

export function isSafeInteger(test: unknown): test is number {
  return Number.isSafeInteger(test);
}

export function isPositive(test: unknown): test is number {
  return isSafeInteger(test) && (test > 0);
}

export function isNonNegative(test: unknown): test is number {
  return isSafeInteger(test) && (test >= 0);
}

export function isNonPositive(test: unknown): test is number {
  return isSafeInteger(test) && (test <= 0);
}

export function isNegative(test: unknown): test is number {
  return isSafeInteger(test) && (test < 0);
}

export function isOdd(test: unknown): test is number {
  return isSafeInteger(test) && ((test % 2) !== 0);
}

export function isEven(test: unknown): test is number {
  return isSafeInteger(test) && ((test % 2) === 0);
}

export function assertSafeInteger(test: unknown, label: string): void {
  if (Number.isSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}

export function assertPositive(test: unknown, label: string): void {
  if (isPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive safe integer.`);
  }
}

export function assertNonNegative(test: unknown, label: string): void {
  if (isNonNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative safe integer.`);
  }
}

export function assertNonPositive(test: unknown, label: string): void {
  if (isNonPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive safe integer.`);
  }
}

export function assertNegative(test: unknown, label: string): void {
  if (isNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative safe integer.`);
  }
}

export function assertOdd(test: unknown, label: string): void {
  if (isOdd(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd safe integer.`);
  }
}

export function assertEven(test: unknown, label: string): void {
  if (isEven(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even safe integer.`);
  }
}

export function isInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  return isSafeInteger(test) && (min <= test) && (max >= test);
}

export function clamp<T extends number>(value: number, min: T, max: T): T {
  assertSafeInteger(value, "value");
  assertSafeInteger(min, "min");
  assertSafeInteger(max, "max");

  return clampNumber(value, min, max);
}

export function clampToPositive<T extends number>(value: T, max?: T): T {
  assertSafeInteger(value, "value");
  const min = 1 as T;
  if (isSafeInteger(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `1`.");
    }
    return clampNumber(value, min, max);
  }
  return normalizeNumber(Math.max(value, min) as T);
}

export function clampToNonNegative<T extends number>(value: T, max?: T): T {
  assertSafeInteger(value, "value");
  const min = 0 as T;
  if (isSafeInteger(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `0`.");
    }
    return clampNumber(value, min, max);
  }
  return normalizeNumber(Math.max(value, min) as T);
}

export function fromBigInt(value: bigint): number {
  assertBigInt(value, "value");

  if (
    isBigIntInRange(
      value,
      BigInt(Number.MIN_SAFE_INTEGER),
      BigInt(Number.MAX_SAFE_INTEGER),
    ) !== true
  ) {
    throw new RangeError("`value` must be within the range of safe integer.");
  }

  return Number(value);
}

export function toBigInt(self: number): bigint {
  assertSafeInteger(self, "self");
  return BigInt(self);
}

export function fromString(value: string, options?: FromStringOptions): number {
  const valueAsBigInt = fromStringToBigInt(value, options);
  return fromBigInt(valueAsBigInt);
}

export function toString(self: number, options?: ToStringOptions): string {
  assertSafeInteger(self, "self");

  const radix = radixPropertiesOf(options?.radix).radix;
  let result = self.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (isPositiveNumber(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}
