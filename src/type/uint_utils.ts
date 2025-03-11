import { isUint8 } from "./uint.ts";
import { isUint8Array, isUint8ClampedArray } from "./buffer_source.ts";
import { type uint8 } from "../_typedef/mod.ts";

export function isArrayOfUint8(value: unknown): value is Array<uint8> {
  return Array.isArray(value) && value.every((i) => isUint8(i));
}

export function assertArrayOfUint8(test: unknown, label: string): void {
  if (isArrayOfUint8(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Array<uint8>\`).`);
  }
}

type ArrayOrTypedArrayOfUint8 =
  | Array<uint8>
  | Uint8Array<ArrayBuffer>
  | Uint8ClampedArray<ArrayBuffer>;

export function isArrayOrTypedArrayOfUint8(
  test: unknown,
): test is ArrayOrTypedArrayOfUint8 {
  return isArrayOfUint8(test) || isUint8Array(test) ||
    isUint8ClampedArray(test);
}

export function assertArrayOrTypedArrayOfUint8(
  test: unknown,
  label: string,
): void {
  if (isArrayOrTypedArrayOfUint8(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`Array<uint8>\` or \`Uint8Array<ArrayBuffer>\` or \`Uint8ClampedArray<ArrayBuffer>\`.`,
    );
  }
}
