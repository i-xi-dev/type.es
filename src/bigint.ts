export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isPositiveBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test > 0n);
}

export function isNonNegativeBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test >= 0n);
}

export function isNonPositiveBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test <= 0n);
}

export function isNegativeBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test < 0n);
}

export function isOddBigInt(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) !== 0n);
}

export function isEvenBigInt(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) === 0n);
}

export function assertBigInt(test: unknown, label: string): void {
  if (isBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`bigint\`.`);
  }
}

export function assertPositiveBigInt(test: unknown, label: string): void {
  if (isPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`bigint\`.`);
  }
}

export function assertNonNegativeBigInt(test: unknown, label: string): void {
  if (isNonNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`bigint\`.`);
  }
}

export function assertNonPositiveBigInt(test: unknown, label: string): void {
  if (isNonPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`bigint\`.`);
  }
}

export function assertNegativeBigInt(test: unknown, label: string): void {
  if (isNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`bigint\`.`);
  }
}

export function assertOddBigInt(test: unknown, label: string): void {
  if (isOddBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd \`bigint\`.`);
  }
}

export function assertEvenBigInt(test: unknown, label: string): void {
  if (isEvenBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even \`bigint\`.`);
  }
}

export function minBigIntOf<T extends bigint>(value0: T, ...values: T[]): T {
  let provMin = value0;
  for (const i of values) {
    if (i < provMin) {
      provMin = i;
    }
  }
  return provMin;
}

export function maxBigIntOf<T extends bigint>(value0: T, ...values: T[]): T {
  let provMax = value0;
  for (const i of values) {
    if (i > provMax) {
      provMax = i;
    }
  }
  return provMax;
}

export function isBigIntInRange<T extends bigint>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  return isBigInt(test) && (min <= test) && (max >= test);
}

export function toClampedBigInt<T extends bigint>(
  value: bigint,
  min: T,
  max: T,
): T {
  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return minBigIntOf(maxBigIntOf(value, min), max) as T;
}
