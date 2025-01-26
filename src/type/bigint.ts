export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function assertBigInt(test: unknown, label: string): void {
  if (isBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`bigint\`.`);
  }
}

export function isPositiveBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test > 0n);
}

export function assertPositiveBigInt(test: unknown, label: string): void {
  if (isPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`bigint\`.`);
  }
}

export function isNonNegativeBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test >= 0n);
}

export function assertNonNegativeBigInt(test: unknown, label: string): void {
  if (isNonNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`bigint\`.`);
  }
}

export function isNonPositiveBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test <= 0n);
}

export function assertNonPositiveBigInt(test: unknown, label: string): void {
  if (isNonPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`bigint\`.`);
  }
}

export function isNegativeBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test < 0n);
}

export function assertNegativeBigInt(test: unknown, label: string): void {
  if (isNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`bigint\`.`);
  }
}

export function isOddBigInt(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) !== 0n);
}

export function assertOddBigInt(test: unknown, label: string): void {
  if (isOddBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd \`bigint\`.`);
  }
}

export function isEvenBigInt(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) === 0n);
}

export function assertEvenBigInt(test: unknown, label: string): void {
  if (isEvenBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even \`bigint\`.`);
  }
}

export function isBigIntInRange(
  test: unknown,
  min: bigint,
  max: bigint,
): test is bigint {
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  return isBigInt(test) && (min <= test) && (max >= test);
}

export function assertBigIntInRange(
  test: unknown,
  label: string,
  min: bigint,
  max: bigint,
): void {
  if (isBigIntInRange(test, min, max) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`bigint\` in the range ${min}-${max}.`,
    );
  }
}
