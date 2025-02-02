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
