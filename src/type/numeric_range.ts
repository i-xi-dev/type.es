import { isBigInt } from "../type/bigint.ts";
import {
  type BigIntRange,
  type NumberRange,
  type SafeIntegerRange,
} from "../type.ts";

// min > max については関知しない（マッチする数値は存在しなくなるだけ）
export function isNumberRange(test: unknown): test is NumberRange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => Number.isFinite(i));
}

export function assertNumberRange(test: unknown, label: string): void {
  if (isNumberRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of \`number\`.`);
  }
}

// min > max については関知しない（マッチする数値は存在しなくなるだけ）
export function isSafeIntegerRange(test: unknown): test is SafeIntegerRange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => Number.isSafeInteger(i));
}

export function assertSafeIntegerRange(test: unknown, label: string): void {
  if (isSafeIntegerRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of safe integer.`);
  }
}

// min > max については関知しない（マッチする数値は存在しなくなるだけ）
export function isBigIntRange(test: unknown): test is BigIntRange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => isBigInt(i));
}

export function assertBigIntRange(test: unknown, label: string): void {
  if (isBigIntRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of \`bigint\`.`);
  }
}
