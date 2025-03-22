import * as Type from "../type/mod.ts";
import { type safeint } from "../_typedef/mod.ts";

type ArrayLikeOfExpectUint8 =
  | Array<safeint /* uint8 */>
  | Uint8Array<ArrayBuffer>
  | Uint8ClampedArray<ArrayBuffer>; //TODO

// Uint8SizedIterable

// 要素の型を判定できないのでassertIterableObject以上のチェックは出来ない
// function _isUint8Iterable() {
// }

// isUint8SizedIterable

export function elementsStartsWith(
  self: Iterable<safeint /* uint8 */>,
  other: ArrayLikeOfExpectUint8,
): boolean {
  Type.assertIterable(self, "self");
  Type.assertArrayOrTypedArrayOfUint8(other, "other");

  if (other.length <= 0) {
    return true;
  }

  const otherLastIndex = other.length - 1;
  let i = 0;
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
  Type.assertArrayOrTypedArrayOfUint8(other, "other");

  const otherLastIndex = other.length - 1;
  let i = 0;
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
