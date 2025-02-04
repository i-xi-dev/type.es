import { assertIterable } from "../type/iterable.ts";
import { type safeint, type uint8 } from "../type.ts";
import { Uint8 } from "./uint.ts";

type ArrayLikeOfExpectUint8 =
  | Array<safeint /* uint8 */>
  | Uint8Array
  | Uint8ClampedArray; //TODO

// Uint8SizedIterable
export type ArrayLikeOfUint8 =
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

// isUint8SizedIterable
export function isArrayLikeOfUint8(
  test: unknown,
): test is ArrayLikeOfUint8 {
  return isArrayOfUint8(test) || (test instanceof Uint8Array) ||
    (test instanceof Uint8ClampedArray);
}

export function assertArrayLikeOfUint8(test: unknown, label: string): void {
  if (isArrayLikeOfUint8(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be (\`Array<uint8> | Uint8Array | Uint8ClampedArray\`).`,
    );
  }
}

export function elementsStartsWith(
  self: Iterable<safeint /* uint8 */>,
  other: ArrayLikeOfExpectUint8,
): boolean {
  assertIterable(self, "self");
  assertArrayLikeOfUint8(other, "other");

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

// bytesEquals
export function elementsEquals(
  self: Iterable<safeint /* uint8 */>,
  other: ArrayLikeOfExpectUint8,
): boolean {
  assertIterable(self, "self");
  assertArrayLikeOfUint8(other, "other");

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
