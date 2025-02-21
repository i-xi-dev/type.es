import { isBigIntInRange } from "./bigint.ts";
import { isSafeIntInRange } from "./number.ts";
import {
  BigUint128,
  BigUint64,
  Uint16,
  Uint24,
  Uint32,
  Uint6,
  Uint7,
  Uint8,
} from "../_const/uint.ts";
import {
  type biguint128,
  type biguint64,
  type uint16,
  type uint24,
  type uint32,
  type uint6,
  type uint7,
  type uint8,
} from "../_typedef/mod.ts";

export function isUint6(test: unknown): test is uint6 {
  return isSafeIntInRange(test, [Uint6.MIN_VALUE, Uint6.MAX_VALUE]);
}

export function assertUint6(test: unknown, label: string): void {
  if (isUint6(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 6-bit unsigned integer.`);
  }
}

export function isUint7(test: unknown): test is uint7 {
  return isSafeIntInRange(test, [Uint7.MIN_VALUE, Uint7.MAX_VALUE]);
}

export function assertUint7(test: unknown, label: string): void {
  if (isUint7(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 7-bit unsigned integer.`);
  }
}

export function isUint8(test: unknown): test is uint8 {
  return isSafeIntInRange(test, [Uint8.MIN_VALUE, Uint8.MAX_VALUE]);
}

export function assertUint8(test: unknown, label: string): void {
  if (isUint8(test) !== true) {
    throw new TypeError(`\`${label}\` must be an 8-bit unsigned integer.`);
  }
}

export function isUint16(test: unknown): test is uint16 {
  return isSafeIntInRange(test, [Uint16.MIN_VALUE, Uint16.MAX_VALUE]);
}

export function assertUint16(test: unknown, label: string): void {
  if (isUint16(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 16-bit unsigned integer.`);
  }
}

export function isUint24(test: unknown): test is uint24 {
  return isSafeIntInRange(test, [Uint24.MIN_VALUE, Uint24.MAX_VALUE]);
}

export function assertUint24(test: unknown, label: string): void {
  if (isUint24(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 24-bit unsigned integer.`);
  }
}

export function isUint32(test: unknown): test is uint32 {
  return isSafeIntInRange(test, [Uint32.MIN_VALUE, Uint32.MAX_VALUE]);
}

export function assertUint32(test: unknown, label: string): void {
  if (isUint32(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 32-bit unsigned integer.`);
  }
}

export function isBigUint64(test: unknown): test is biguint64 {
  return isBigIntInRange(test, [BigUint64.MIN_VALUE, BigUint64.MAX_VALUE]);
}

export function assertBigUint64(test: unknown, label: string): void {
  if (isBigUint64(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 64-bit unsigned integer.`);
  }
}

export function isBigUint128(test: unknown): test is biguint128 {
  return isBigIntInRange(test, [BigUint128.MIN_VALUE, BigUint128.MAX_VALUE]);
}

export function assertBigUint128(test: unknown, label: string): void {
  if (isBigUint128(test) !== true) {
    throw new TypeError(`\`${label}\` must be an 128-bit unsigned integer.`);
  }
}
