import { number } from "../basics/assert.ts";
import { assertStringified as assertStringifiedInteger } from "./integer.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
} from "./main.ts";
import { int } from "../_.ts";
import {
  isPositive as isPositiveSafeInteger,
  round as roundNumber,
} from "./safe_integer.ts";
import { RadixProperties } from "./radix.ts";

export function is(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isPositive(test: unknown): test is bigint {
  return is(test) && (test > 0n);
}

export function isNonNegative(test: unknown): test is bigint {
  return is(test) && (test >= 0n);
}

export function isNonPositive(test: unknown): test is bigint {
  return is(test) && (test <= 0n);
}

export function isNegative(test: unknown): test is bigint {
  return is(test) && (test < 0n);
}

export function isOdd(test: unknown): test is bigint {
  return is(test) && ((test % 2n) !== 0n);
}

export function isEven(test: unknown): test is bigint {
  return is(test) && ((test % 2n) === 0n);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`bigint\`.`);
  }
}

export function assertPositive(test: unknown, label: string): void {
  if (isPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`bigint\`.`);
  }
}

export function assertNonNegative(test: unknown, label: string): void {
  if (isNonNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`bigint\`.`);
  }
}

export function assertNonPositive(test: unknown, label: string): void {
  if (isNonPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`bigint\`.`);
  }
}

export function assertNegative(test: unknown, label: string): void {
  if (isNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`bigint\`.`);
  }
}

export function assertOdd(test: unknown, label: string): void {
  if (isOdd(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd \`bigint\`.`);
  }
}

export function assertEven(test: unknown, label: string): void {
  if (isEven(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even \`bigint\`.`);
  }
}

export function minOf<T extends bigint>(value0: T, ...values: T[]): T {
  assert(value0, `value0`);

  let provMin = value0;
  let value: T;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    assert(value, `values[${i}]`);

    if (value < provMin) {
      provMin = value;
    }
  }
  return provMin;
}

export function maxOf<T extends bigint>(value0: T, ...values: T[]): T {
  assert(value0, `value0`);

  let provMax = value0;
  let value: T;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    assert(value, `values[${i}]`);

    if (value > provMax) {
      provMax = value;
    }
  }
  return provMax;
}

export function isInRange<T extends bigint>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  assert(min, "min");
  assert(max, "max");

  return is(test) && (min <= test) && (max >= test);
}

export function clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  assert(value, "value");
  assert(min, "min");
  assert(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return minOf(maxOf(value, min), max) as T;
}

export function clampToPositive<T extends bigint>(value: T): T {
  return maxOf(value, 1n as T);
}

export function clampToNonNegative<T extends bigint>(value: T): T {
  return maxOf(value, 0n as T);
}

export function clampToNonPositive<T extends bigint>(value: T): T {
  return minOf(value, 0n as T);
}

export function clampToNegative<T extends bigint>(value: T): T {
  return minOf(value, -1n as T);
}

export function fromString(value: string, options?: FromStringOptions): bigint {
  assertStringifiedInteger(value, "value", options?.radix);

  const negative = value.startsWith("-");
  let adjustedValue = value;
  adjustedValue = adjustedValue.replace(/^[-+]?/, "");
  adjustedValue = RadixProperties.of(options?.radix).prefix + adjustedValue;
  let valueAsBigInt = BigInt(adjustedValue);
  if (negative === true) {
    valueAsBigInt *= -1n;
  }

  return valueAsBigInt;
}

export function toString(value: bigint, options?: ToStringOptions): string {
  assert(value, "value");

  const radix = RadixProperties.of(options?.radix).radix;
  let result = value.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (isPositiveSafeInteger(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}

export function fromNumber(
  value: number,
  options?: FromNumberOptions,
): bigint {
  number(value, "value");
  //XXX Finiteでなければエラーで良いのでは

  if (Number.isNaN(value)) {
    throw new TypeError("`value` must not be `NaN`.");
  }

  let adjustedValue: number;
  if (value > Number.MAX_SAFE_INTEGER) {
    adjustedValue = Number.MAX_SAFE_INTEGER;
  } else if (value < Number.MIN_SAFE_INTEGER) {
    adjustedValue = Number.MIN_SAFE_INTEGER;
  } else {
    adjustedValue = value;
  }

  let valueAsInt: int;
  if (Number.isSafeInteger(adjustedValue)) {
    valueAsInt = adjustedValue;
  } else {
    valueAsInt = roundNumber(adjustedValue, options?.roundingMode);
  }

  return BigInt(valueAsInt);
}

export function toNumber(value: bigint): int {
  assert(value, "value");

  if (
    isInRange(
      value,
      BigInt(Number.MIN_SAFE_INTEGER),
      BigInt(Number.MAX_SAFE_INTEGER),
    ) !== true
  ) {
    throw new RangeError("`value` must be within the range of safe integer.");
  }

  return Number(value);
}
