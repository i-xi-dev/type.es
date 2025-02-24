import {
  type bigintrange,
  type numberrange,
  type safeintrange,
} from "../_typedef/mod.ts";
import { isBigInt } from "./bigint.ts";

// min > max については関知しない（マッチする数値は存在しなくなるだけ）
export function isNumberRange(test: unknown): test is numberrange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => Number.isFinite(i));
}

export function assertNumberRange(test: unknown, label: string): void {
  if (isNumberRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of \`number\`.`);
  }
}

// min > max については関知しない（マッチする数値は存在しなくなるだけ）
export function isSafeIntRange(test: unknown): test is safeintrange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => Number.isSafeInteger(i));
}

export function assertSafeIntRange(test: unknown, label: string): void {
  if (isSafeIntRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of safe integer.`);
  }
}

// min > max については関知しない（マッチする数値は存在しなくなるだけ）
export function isBigIntRange(test: unknown): test is bigintrange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => isBigInt(i));
}

export function assertBigIntRange(test: unknown, label: string): void {
  if (isBigIntRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of \`bigint\`.`);
  }
}
