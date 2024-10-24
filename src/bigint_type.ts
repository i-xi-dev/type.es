import {
  assertStringified as assertStringifiedInteger,
  Radix,
} from "./numeric_type.ts";

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
  let provMin = value0;
  for (const i of values) {
    if (i < provMin) {
      provMin = i;
    }
  }
  return provMin;
}

export function maxOf<T extends bigint>(value0: T, ...values: T[]): T {
  let provMax = value0;
  for (const i of values) {
    if (i > provMax) {
      provMax = i;
    }
  }
  return provMax;
}

export function isInRange<T extends bigint>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  return isBigInt(test) && (min <= test) && (max >= test);
}

export function toClamped<T extends bigint>(
  value: bigint,
  min: T,
  max: T,
): T {
  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return minOf(maxOf(value, min), max) as T;
}

const _INTEGER_PREFIX: Record<Radix, string> = {
  [Radix.BINARY]: "0b",
  [Radix.OCTAL]: "0o",
  [Radix.DECIMAL]: "",
  [Radix.HEXADECIMAL]: "0x",
} as const;

export function fromString(value: string, radix?: Radix): bigint {
  assertStringifiedInteger(value, "value", radix);

  const negative = value.startsWith("-");
  let adjustedValue = value;
  adjustedValue = adjustedValue.replace(/^[-+]?/, "");
  adjustedValue =
    (_INTEGER_PREFIX[radix as Radix] ?? _INTEGER_PREFIX[Radix.DECIMAL]) +
    adjustedValue;
  let valueAsBigInt = BigInt(adjustedValue);
  if (negative === true) {
    valueAsBigInt *= -1n;
  }

  return valueAsBigInt;
}
