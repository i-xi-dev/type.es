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
