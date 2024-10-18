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
