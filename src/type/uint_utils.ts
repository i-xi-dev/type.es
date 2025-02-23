import { isUint8 } from "./uint.ts";
import { type uint8 } from "../_typedef/mod.ts";

export function isArrayOfUint8(value: unknown): value is Array<uint8> {
  return Array.isArray(value) && value.every((i) => isUint8(i));
}

export function assertArrayOfUint8(test: unknown, label: string): void {
  if (isArrayOfUint8(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Array<uint8>\`).`);
  }
}
