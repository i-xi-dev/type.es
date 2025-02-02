import { type safeint } from "./number.ts";

export function isInteger(test: unknown): test is safeint | bigint {
  return Number.isSafeInteger(test) || (typeof test === "bigint");
}

export function assertInteger(test: unknown, label: string): void {
  if (isInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an integer.`);
  }
}

export function isPositiveInteger(test: unknown): test is safeint | bigint {
  return isInteger(test) && (test > 0);
}

export function assertPositiveInteger(test: unknown, label: string): void {
  if (isPositiveInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive integer.`);
  }
}

export function isNonNegativeInteger(test: unknown): test is safeint | bigint {
  return isInteger(test) && (test >= 0);
}

export function assertNonNegativeInteger(test: unknown, label: string): void {
  if (isNonNegativeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative integer.`);
  }
}

export function isNonPositiveInteger(test: unknown): test is safeint | bigint {
  return isInteger(test) && (test <= 0);
}

export function assertNonPositiveInteger(test: unknown, label: string): void {
  if (isNonPositiveInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive integer.`);
  }
}

export function isNegativeInteger(test: unknown): test is safeint | bigint {
  return isInteger(test) && (test < 0);
}

export function assertNegativeInteger(test: unknown, label: string): void {
  if (isNegativeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative integer.`);
  }
}

export function isOddInteger(test: unknown): test is safeint | bigint {
  return (Number.isSafeInteger(test) && (((test as safeint) % 2) !== 0)) ||
    ((typeof test === "bigint") && ((test % 2n) !== 0n));
}

export function assertOddInteger(test: unknown, label: string): void {
  if (isOddInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd integer.`);
  }
}

export function isEvenInteger(test: unknown): test is safeint | bigint {
  return (Number.isSafeInteger(test) && (((test as safeint) % 2) === 0)) ||
    ((typeof test === "bigint") && ((test % 2n) === 0n));
}

export function assertEvenInteger(test: unknown, label: string): void {
  if (isEvenInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even integer.`);
  }
}
