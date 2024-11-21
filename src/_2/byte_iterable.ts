import { assertIterable as assertIterableObject } from "../_0/object_type.ts";
import { int, uint8 } from "../_.ts";
import { Uint8 } from "./uint_type.ts";

export type Uint8SizedIterable =
  | Array<int /* uint8 */>
  | Uint8Array
  | Uint8ClampedArray;

type _Uint8SizedIterable =
  | Array<uint8>
  | Uint8Array
  | Uint8ClampedArray;

// 要素の型を判定できないのでassertIterableObject以上のチェックは出来ない
// function _isUint8Iterable() {
// }

export function isArrayOfUint8(value: unknown): value is Array<uint8> {
  return Array.isArray(value) && value.every((i) => Uint8.is(i));
}

export function assertArrayOfUint8(test: unknown, label: string): void {
  if (isArrayOfUint8(test) !== true) {
    throw new TypeError(`\`${label}\` must be \`Array<uint8>\`).`);
  }
}

function _isUint8SizedIterable(test: unknown): test is _Uint8SizedIterable {
  return isArrayOfUint8(test) || (test instanceof Uint8Array) ||
    (test instanceof Uint8ClampedArray);
}

function _assertUint8SizedIterable(test: unknown, label: string): void {
  if (_isUint8SizedIterable(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be (\`Array<uint8> | Uint8Array | Uint8ClampedArray\`).`,
    );
  }
}

export function bytesStartsWith(
  self: Iterable<int /* uint8 */>,
  other: Uint8SizedIterable,
): boolean {
  assertIterableObject(self, "self");
  _assertUint8SizedIterable(other, "other");

  if (other.length <= 0) {
    return true;
  }

  const otherLastIndex = other.length - 1;
  let i = 0;
  for (const byte of self) {
    if (i > otherLastIndex) {
      return true;
    }

    Uint8.assert(byte, `self[${i}]`);

    // const otherByte = other[i];
    // Uint8.assert(otherByte, `other[${i}]`); _assertUint8SizedIterableでチェック済

    if (byte !== other[i]) {
      return false;
    }
    i++;
  }

  return (i > otherLastIndex);
}

export function bytesEquals(
  self: Iterable<int /* uint8 */>,
  other: Uint8SizedIterable,
): boolean {
  assertIterableObject(self, "self");
  _assertUint8SizedIterable(other, "other");

  const otherLastIndex = other.length - 1;
  let i = 0;
  for (const byte of self) {
    if (i > otherLastIndex) {
      return false;
    }

    Uint8.assert(byte, `self[${i}]`);

    // const otherByte = other[i];
    // Uint8.assert(otherByte, `other[${i}]`); _assertUint8SizedIterableでチェック済

    if (byte !== other[i]) {
      return false;
    }
    i++;
  }

  return (i === other.length);
}
