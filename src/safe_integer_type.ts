import {
  fromString as fromStringToBigInt,
  toNumber as fromBigIntToNumber,
} from "./bigint_type.ts";
import {
  clamp as clampNumber,
  isPositive as isPositiveNumber,
  normalize as normalizeNumber,
} from "./number_type.ts";
import {
  FromStringOptions,
  radixPropertiesOf,
  ToStringOptions,
} from "./numerics.ts";

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

export function clampToPositive<T extends number>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, 1) as T);
}

export function clampToNonNegative<T extends number>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, 0) as T);
}

export function clampToNonPositive<T extends number>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, 0) as T);
}

export function clampToNegative<T extends number>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, -1) as T);
}

export function fromBigInt(value: bigint): number {
  return fromBigIntToNumber(value);
}

export function toBigInt(value: number): bigint {
  assertSafeInteger(value, "value");
  return BigInt(value);
}

export function fromString(value: string, options?: FromStringOptions): number {
  const valueAsBigInt = fromStringToBigInt(value, options);
  return fromBigIntToNumber(valueAsBigInt);
}

export function toString(value: number, options?: ToStringOptions): string {
  assertSafeInteger(value, "value");

  const radix = radixPropertiesOf(options?.radix).radix;
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
