import { assertBigIntRange } from "./numeric_range.ts";
import { type intrange } from "../_typedef/mod.ts";
import { ZERO as BIGINT_ZERO } from "../_const/bigint.ts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function assertBigInt(test: unknown, label: string): void {
  if (isBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`bigint\`.`);
  }
}

export function isPositiveBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test > BIGINT_ZERO);
}

export function assertPositiveBigInt(test: unknown, label: string): void {
  if (isPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`bigint\`.`);
  }
}

export function isNonNegativeBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test >= BIGINT_ZERO);
}

export function assertNonNegativeBigInt(test: unknown, label: string): void {
  if (isNonNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`bigint\`.`);
  }
}

export function isNonPositiveBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test <= BIGINT_ZERO);
}

export function assertNonPositiveBigInt(test: unknown, label: string): void {
  if (isNonPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`bigint\`.`);
  }
}

export function isNegativeBigInt(test: unknown): test is bigint {
  return isBigInt(test) && (test < BIGINT_ZERO);
}

export function assertNegativeBigInt(test: unknown, label: string): void {
  if (isNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`bigint\`.`);
  }
}

export function isOddBigInt(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) !== BIGINT_ZERO);
}

export function assertOddBigInt(test: unknown, label: string): void {
  if (isOddBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd \`bigint\`.`);
  }
}

export function isEvenBigInt(test: unknown): test is bigint {
  return isBigInt(test) && ((test % 2n) === BIGINT_ZERO);
}

export function assertEvenBigInt(test: unknown, label: string): void {
  if (isEvenBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even \`bigint\`.`);
  }
}

export function isBigIntInRange(
  test: unknown,
  range: intrange<bigint>,
): test is bigint {
  assertBigIntRange(range, "range");

  const [min, max] = range;
  return isBigInt(test) && (min <= test) && (max >= test);
}

export function assertBigIntInRange(
  test: unknown,
  label: string,
  range: intrange<bigint>,
): void {
  if (isBigIntInRange(test, range) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`bigint\` in the range ${range[0]}-${range[1]}.`,
    );
  }
}

export function isBigIntInSafeIntRange(test: unknown): test is bigint {
  return isBigInt(test) && (Number.MIN_SAFE_INTEGER <= test) &&
    (Number.MAX_SAFE_INTEGER >= test);
}

export function assertBigIntInSafeIntRange(
  test: unknown,
  label: string,
): void {
  if (isBigIntInSafeIntRange(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`bigint\` in the safe integer range.`,
    );
  }
}
