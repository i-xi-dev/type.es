import { assertNumberRange, assertSafeIntegerRange } from "./numeric_range.ts";
import {
  type NumberRange,
  type safeint,
  type SafeIntegerRange,
} from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function assertNumber(test: unknown, label: string): void {
  if (isNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\`.`);
  }
}

// isFiniteNumber → Number.isFinite

export function assertFiniteNumber(test: unknown, label: string): void {
  if (Number.isFinite(test) !== true) {
    throw new TypeError(`\`${label}\` must be a finite \`number\`.`);
  }
}

export function isPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test > NUMBER_ZERO);
}

export function assertPositiveNumber(test: unknown, label: string): void {
  if (isPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`number\`.`);
  }
}

export function isNonNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test >= NUMBER_ZERO);
}

export function assertNonNegativeNumber(test: unknown, label: string): void {
  if (isNonNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`number\`.`);
  }
}

export function isNonPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test <= NUMBER_ZERO);
}

export function assertNonPositiveNumber(test: unknown, label: string): void {
  if (isNonPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`number\`.`);
  }
}

export function isNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test < NUMBER_ZERO);
}

export function assertNegativeNumber(test: unknown, label: string): void {
  if (isNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`number\`.`);
  }
}

//XXX isPositiveFiniteNumber, ...

export function isNumberInRange(
  test: unknown,
  range: NumberRange,
): test is number {
  assertNumberRange(range, "range");

  const [min, max] = range;
  return isNumber(test) && (min <= test) && (max >= test);
}

export function assertNumberInRange(
  test: unknown,
  label: string,
  range: NumberRange,
): void {
  if (isNumberInRange(test, range) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`number\` in the range ${range[0]}-${range[1]}.`,
    );
  }
}

export function isSafeInteger(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
}

export function assertSafeInteger(test: unknown, label: string): void {
  if (isSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}

export function isPositiveSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test > NUMBER_ZERO);
}

export function assertPositiveSafeInteger(test: unknown, label: string): void {
  if (isPositiveSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive safe integer.`);
  }
}

export function isNonNegativeSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test >= NUMBER_ZERO);
}

export function assertNonNegativeSafeInteger(
  test: unknown,
  label: string,
): void {
  if (isNonNegativeSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative safe integer.`);
  }
}

export function isNonPositiveSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test <= NUMBER_ZERO);
}

export function assertNonPositiveSafeInteger(
  test: unknown,
  label: string,
): void {
  if (isNonPositiveSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive safe integer.`);
  }
}

export function isNegativeSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test < NUMBER_ZERO);
}

export function assertNegativeSafeInteger(test: unknown, label: string): void {
  if (isNegativeSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative safe integer.`);
  }
}

export function isOddSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && ((test % 2) !== NUMBER_ZERO);
}

export function assertOddSafeInteger(test: unknown, label: string): void {
  if (isOddSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd safe integer.`);
  }
}

export function isEvenSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && ((test % 2) === NUMBER_ZERO);
}

export function assertEvenSafeInteger(test: unknown, label: string): void {
  if (isEvenSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even safe integer.`);
  }
}

export function isSafeIntegerInRange(
  test: unknown,
  range: SafeIntegerRange,
): test is safeint {
  assertSafeIntegerRange(range, "range");

  const [min, max] = range;
  return isSafeInteger(test) && (min <= test) && (max >= test);
}

export function assertSafeIntegerInRange(
  test: unknown,
  label: string,
  range: SafeIntegerRange,
): void {
  if (isSafeIntegerInRange(test, range) !== true) {
    throw new TypeError(
      `\`${label}\` must be a safe integer in the range ${range[0]}-${
        range[1]
      }.`,
    );
  }
}

//TODO isSafeIntegerInRanges → 別ファイル
