import { isSafeIntInRange } from "./number.ts";
import {
  MAX_VALUE as MAX_UINT8,
  MIN_VALUE as MIN_UINT8,
} from "../_const/uint8.ts";
import { type uint8 } from "../_typedef/mod.ts";

export function isUint8(test: unknown): test is uint8 {
  return isSafeIntInRange(test, [MIN_UINT8, MAX_UINT8]);
}

export function assertUint8(test: unknown, label: string): void {
  if (isUint8(test) !== true) {
    throw new TypeError(`\`${label}\` must be an 8-bit unsigned integer.`);
  }
}
