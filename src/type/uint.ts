import { isSafeIntInRange } from "./number.ts";
import { Uint8 } from "../_const/uint.ts";
import { type uint8 } from "../_typedef/mod.ts";

export function isUint8(test: unknown): test is uint8 {
  return isSafeIntInRange(test, [Uint8.MIN_VALUE, Uint8.MAX_VALUE]);
}

export function assertUint8(test: unknown, label: string): void {
  if (isUint8(test) !== true) {
    throw new TypeError(`\`${label}\` must be an 8-bit unsigned integer.`);
  }
}
