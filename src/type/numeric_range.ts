import {
  type intrange,
  type numberrange,
  type safeint,
} from "../_typedef/mod.ts";
import { isBigInt } from "./bigint.ts";

export function isNumberRange(test: unknown): test is numberrange {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => Number.isFinite(i)) && (test[0] <= test[1]);
}

export function assertNumberRange(test: unknown, label: string): void {
  if (isNumberRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of \`number\`.`);
  }
}

export function isSafeIntRange(test: unknown): test is intrange<safeint> {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => Number.isSafeInteger(i)) && (test[0] <= test[1]);
}

export function assertSafeIntRange(test: unknown, label: string): void {
  if (isSafeIntRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of safe integer.`);
  }
}

export function isBigIntRange(test: unknown): test is intrange<bigint> {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => isBigInt(i)) && (test[0] <= test[1]);
}

export function assertBigIntRange(test: unknown, label: string): void {
  if (isBigIntRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of \`bigint\`.`);
  }
}
