import * as Byte from "../../basics/byte/mod.ts";
import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
import { type _AFunc, _normalizeOffset } from "./_utils.ts";
import {
  type biguint64,
  type byteorder,
  type safeint,
  type uint8,
} from "../../_typedef/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import { BigUint64 as BigUint64Info } from "../../_const/uint.ts";

type _Info<T extends bigint> = {
  BIT_LENGTH: safeint;
  MIN_VALUE: T;
  MAX_VALUE: T;
};

interface RangedBigInt<T extends bigint> {
  MIN_VALUE: T;
  MAX_VALUE: T;
  BIT_LENGTH: safeint;
  BYTE_LENGTH: safeint;
  //TODO fromBytes
  toBytes(value: T, byteOrder?: byteorder): Uint8Array;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  //XXX bitwiseNot()
  rotateLeft(value: T, offset: safeint): T;
  //XXX rotateRight()
  // toNumber() → bigint.tsのtoNumber()
  // toBigInt() → もともとbigintなので不要
  // toString() → bigint.tsのtoString()
}

function _getByteByPosition(value: bigint, pos: safeint): uint8 {
  const x1 = 0x100n ** BigInt(pos);
  const x2 = (value >= x1) ? (value % x1) : value;
  return Math.trunc(Number(x2 / (0x100n ** BigInt(pos - 1)))) as uint8;
}

class _BigUint<T extends bigint> implements RangedBigInt<T> {
  readonly MIN_VALUE: T;
  readonly MAX_VALUE: T;
  readonly BIT_LENGTH: safeint;
  readonly BYTE_LENGTH: safeint;
  readonly #assert: _AFunc;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.MIN_VALUE = info.MIN_VALUE;
    this.MAX_VALUE = info.MAX_VALUE;
    this.BIT_LENGTH = info.BIT_LENGTH;
    this.BYTE_LENGTH = Math.ceil(info.BIT_LENGTH / Byte.BITS_PER_BYTE);
    this.#assert = assert;
  }

  toBytes(value: T, byteOrder: byteorder = ByteOrder.nativeOrder): Uint8Array {
    this.#assert(value, "value");
    Type.assertByteOrder(byteOrder, "byteOrder");

    if (this.BYTE_LENGTH === 1) {
      return Uint8Array.of(Number(value));
    }

    const bytes: Array<uint8> = [];
    bytes.push(Number(value % 0x100n) as uint8);
    for (let i = 2; i <= 16; i++) { // 16-128 一旦128を上限とする
      if (this.BIT_LENGTH >= (Byte.BITS_PER_BYTE * i)) {
        bytes.push(_getByteByPosition(value, i));
      }
    }

    return Uint8Array.from(
      (byteOrder === ByteOrder.LITTLE_ENDIAN) ? bytes : bytes.reverse(),
    );

    // this.#bufferView.setBigUint64( // 64以下はこれを基にした方が多分速い
    //   ExNumber.ZERO,
    //   value,
    //   byteOrder === ByteOrder.LITTLE_ENDIAN,
    // );
    // return Uint8Array.from(this.#bufferUint8View);
  }

  bitwiseAnd(a: T, b: T): T {
    this.#assert(a, "a");
    this.#assert(b, "b");

    return (((a as bigint) & (b as bigint)) & this.MAX_VALUE) as T;
    // as bigintしているのは、何故かtypescriptにbigintでなくnumberだと言われるので
  }

  bitwiseOr(a: T, b: T): T {
    this.#assert(a, "a");
    this.#assert(b, "b");

    return (((a as bigint) | (b as bigint)) & this.MAX_VALUE) as T;
    // as bigintしているのは、何故かtypescriptにbigintでなくnumberだと言われるので
  }

  bitwiseXOr(a: T, b: T): T {
    this.#assert(a, "a");
    this.#assert(b, "b");

    return (((a as bigint) ^ (b as bigint)) & this.MAX_VALUE) as T;
    // as bigintしているのは、何故かtypescriptにbigintでなくnumberだと言われるので
  }

  rotateLeft(value: T, offset: safeint): T {
    this.#assert(value, "value");
    Type.assertSafeInt(offset, "offset");

    const normalizedOffset = _normalizeOffset(offset, this.BIT_LENGTH);
    if (normalizedOffset === ExNumber.ZERO) {
      return value;
    }

    const bigIntOffset = BigInt(normalizedOffset);
    return (((value << bigIntOffset) |
      (value >> (BigInt(this.BIT_LENGTH) - bigIntOffset))) &
      this.MAX_VALUE) as T;
  }
}

const BigUint64: RangedBigInt<biguint64> = new _BigUint(
  BigUint64Info,
  Type.assertBigUint64,
);
Object.freeze(BigUint64);

export { BigUint64 };
