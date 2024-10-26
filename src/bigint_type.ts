import { assertStringified as assertStringifiedInteger } from "./integer_type.ts";
import { isPositive as isPositiveSafeInteger } from "./safe_integer_type.ts";
import { assertNumber, round as roundNumber } from "./number_type.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  radixPropertiesOf,
  ToStringOptions,
} from "./numerics.ts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isPositive(test: unknown): test is bigint {
  return isBigInt(test) && (test > 0n);
}

export function isNonNegative(test: unknown): test is bigint {
  return isBigInt(test) && (test >= 0n);
}

export function isNonPositive(test: unknown): test is bigint {
  return isBigInt(test) && (test <= 0n);
}

export function isNegative(test: unknown): test is bigint {
  return isBigInt(test) && (test < 0n);
}

export function isOdd(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) !== 0n);
}

export function isEven(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) === 0n);
}

export function assertBigInt(test: unknown, label: string): void {
  if (isBigInt(test) !== true) {
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
  assertBigInt(value0, `value0`);

  let provMin = value0;
  let value: T;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    assertBigInt(value, `values[${i}]`);

    if (value < provMin) {
      provMin = value;
    }
  }
  return provMin;
}

export function maxOf<T extends bigint>(value0: T, ...values: T[]): T {
  assertBigInt(value0, `value0`);

  let provMax = value0;
  let value: T;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    assertBigInt(value, `values[${i}]`);

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
  //TODO isBigInt(min)
  //TODO isBigInt(max)
  return isBigInt(test) && (min <= test) && (max >= test);
}

export function clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  assertBigInt(value, "value");
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return minOf(maxOf(value, min), max) as T;
}

export function clampToPositive<T extends bigint>(value: T): T {
  assertBigInt(value, "value");
  return maxOf(value, 1n as T);
}

export function clampToNonNegative<T extends bigint>(value: T): T {
  assertBigInt(value, "value");
  return maxOf(value, 0n as T);
}

export function clampToNonPositive<T extends bigint>(value: T): T {
  assertBigInt(value, "value");
  return minOf(value, 0n as T);
}

export function clampToNegative<T extends bigint>(value: T): T {
  assertBigInt(value, "value");
  return minOf(value, -1n as T);
}

export function fromString(value: string, options?: FromStringOptions): bigint {
  assertStringifiedInteger(value, "value", options?.radix);

  const negative = value.startsWith("-");
  let adjustedValue = value;
  adjustedValue = adjustedValue.replace(/^[-+]?/, "");
  adjustedValue = radixPropertiesOf(options?.radix).prefix + adjustedValue;
  let valueAsBigInt = BigInt(adjustedValue);
  if (negative === true) {
    valueAsBigInt *= -1n;
  }

  return valueAsBigInt;
}

export function toString(value: bigint, options?: ToStringOptions): string {
  assertBigInt(value, "value");

  const radix = radixPropertiesOf(options?.radix).radix;
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
  assertNumber(value, "value");
  //TODO Finiteでなければエラーで良いのでは

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

  let valueAsInt: number;
  if (Number.isSafeInteger(adjustedValue)) {
    valueAsInt = adjustedValue;
  } else {
    valueAsInt = roundNumber(adjustedValue, options?.roundingMode);
  }

  return BigInt(valueAsInt);
}

export function toNumber(value: bigint): number {
  assertBigInt(value, "value");

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
