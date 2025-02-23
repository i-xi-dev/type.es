import * as Type from "../type/mod.ts";
import { type safeint, type uint8 } from "../_typedef/mod.ts";
import { ZERO as NUMBER_ZERO } from "../_const/number.ts";

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

// isUint8SizedIterable
export function isArrayLikeOfUint8(
  test: unknown,
): test is ArrayLikeOfUint8 {
  return Type.isArrayOfUint8(test) || (test instanceof Uint8Array) ||
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
  Type.assertIterable(self, "self");
  assertArrayLikeOfUint8(other, "other");

  if (other.length <= NUMBER_ZERO) {
    return true;
  }

  const otherLastIndex = other.length - 1;
  let i = NUMBER_ZERO;
  for (const byte of self) {
    if (i > otherLastIndex) {
      return true;
    }

    Type.assertUint8(byte, `self[${i}]`);

    // const otherByte = other[i];
    // Type.assertUint8(otherByte, `other[${i}]`); _assertUint8SizedIterableでチェック済

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
  Type.assertIterable(self, "self");
  assertArrayLikeOfUint8(other, "other");

  const otherLastIndex = other.length - 1;
  let i = NUMBER_ZERO;
  for (const byte of self) {
    if (i > otherLastIndex) {
      return false;
    }

    Type.assertUint8(byte, `self[${i}]`);

    // const otherByte = other[i];
    // Type.assertUint8(otherByte, `other[${i}]`); _assertUint8SizedIterableでチェック済

    if (byte !== other[i]) {
      return false;
    }
    i++;
  }

  return (i === other.length);
}
