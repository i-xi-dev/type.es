import { type int, type safeint } from "../type.ts";
import { ZERO as BIGINT_ZERO } from "../const/bigint.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function isInteger(test: unknown): test is int {
  return Number.isSafeInteger(test) || (typeof test === "bigint");
}

export function assertInteger(test: unknown, label: string): void {
  if (isInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an integer.`);
  }
}

export function isPositiveInteger(test: unknown): test is int {
  return isInteger(test) && (test > NUMBER_ZERO);
}

export function assertPositiveInteger(test: unknown, label: string): void {
  if (isPositiveInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive integer.`);
  }
}

export function isNonNegativeInteger(test: unknown): test is int {
  return isInteger(test) && (test >= NUMBER_ZERO);
}

export function assertNonNegativeInteger(test: unknown, label: string): void {
  if (isNonNegativeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative integer.`);
  }
}

export function isNonPositiveInteger(test: unknown): test is int {
  return isInteger(test) && (test <= NUMBER_ZERO);
}

export function assertNonPositiveInteger(test: unknown, label: string): void {
  if (isNonPositiveInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive integer.`);
  }
}

export function isNegativeInteger(test: unknown): test is int {
  return isInteger(test) && (test < NUMBER_ZERO);
}

export function assertNegativeInteger(test: unknown, label: string): void {
  if (isNegativeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative integer.`);
  }
}

export function isOddInteger(test: unknown): test is int {
  return (Number.isSafeInteger(test) &&
    (((test as safeint) % 2) !== NUMBER_ZERO)) ||
    ((typeof test === "bigint") && ((test % 2n) !== BIGINT_ZERO));
}

export function assertOddInteger(test: unknown, label: string): void {
  if (isOddInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd integer.`);
  }
}

export function isEvenInteger(test: unknown): test is int {
  return (Number.isSafeInteger(test) &&
    (((test as safeint) % 2) === NUMBER_ZERO)) ||
    ((typeof test === "bigint") && ((test % 2n) === BIGINT_ZERO));
}

export function assertEvenInteger(test: unknown, label: string): void {
  if (isEvenInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even integer.`);
  }
}
