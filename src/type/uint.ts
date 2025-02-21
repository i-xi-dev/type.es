import { isSafeIntInRange } from "./number.ts";
import { Uint6, Uint7, Uint8 } from "../_const/uint.ts";
import { type uint8 } from "../_typedef/mod.ts";

export function isUint6(test: unknown): test is uint8 {
  return isSafeIntInRange(test, [Uint6.MIN_VALUE, Uint6.MAX_VALUE]);
}

export function assertUint6(test: unknown, label: string): void {
  if (isUint6(test) !== true) {
    throw new TypeError(`\`${label}\` must be a 6-bit unsigned integer.`);
  }
}

export function isUint7(test: unknown): test is uint8 {
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
