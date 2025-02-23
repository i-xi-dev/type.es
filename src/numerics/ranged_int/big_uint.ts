import * as Byte from "../../basics/byte/mod.ts";
import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
import { type _AFunc, _normalizeOffset } from "./_utils.ts";
import { BigInt as ExBigInt, Number as ExNumber } from "../../numerics/mod.ts";
import {
  type biguint64,
  type byteorder,
  type safeint,
  type uint8,
} from "../../_typedef/mod.ts";
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
  fromBytes(bytes: Uint8Array, byteOrder?: byteorder): T;
  toBytes(value: T, byteOrder?: byteorder): Uint8Array;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  //XXX bitwiseNot()
  rotateLeft(value: T, offset: safeint): T;
  //XXX rotateRight()
  truncate(value: bigint): T;
  saturate(value: bigint): T;
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
  readonly #size: bigint;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.MIN_VALUE = info.MIN_VALUE;
    this.MAX_VALUE = info.MAX_VALUE;
    this.BIT_LENGTH = info.BIT_LENGTH;
    this.BYTE_LENGTH = Math.ceil(info.BIT_LENGTH / Byte.BITS_PER_BYTE);
    this.#assert = assert;
    this.#size = info.MAX_VALUE + 1n; // Uintの場合、最小は0なので最大+1で固定
  }

  fromBytes(
    bytes: Uint8Array,
    byteOrder: byteorder = ByteOrder.nativeOrder,
  ): T {
    Type.assertUint8Array(bytes, "bytes");
    Type.assertByteOrder(byteOrder, "byteOrder");
    if (bytes.length !== this.BYTE_LENGTH) {
      throw new RangeError("byte length unmatched.");
    }

    if (this.BYTE_LENGTH === 1) {
      const byte = bytes[0];
      if (byte > this.MAX_VALUE) {
        throw new RangeError("parse result is overflowed.");
      }
      return BigInt(byte) as T;
    }

    //XXX 64以下はBigUint64Arrayにした方が多分速い

    const x = (byteOrder === ByteOrder.LITTLE_ENDIAN)
      ? [...bytes]
      : [...bytes].reverse();

    let result = BigInt(x[0]);
    for (let i = 1; i < x.length; i++) {
      result += BigInt(x[i] * (0x100 ** i));
    }

    if (result > this.MAX_VALUE) { // BIT_LENGTH % 8 === 0のときは発生しない
      throw new RangeError("parse result is overflowed.");
    }
    return result as T;
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

    // this.#bufferView.setBigUint64( //XXX 64以下はこれを基にした方が多分速い
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

  truncate(value: bigint): T {
    Type.assertBigInt(value, "value");

    if ((value >= ExBigInt.ZERO) && (value <= this.MAX_VALUE)) {
      return value as T;
    }

    if (value > ExBigInt.ZERO) {
      return (value % this.#size) as T;
    } else {
      return (this.#size + (value % this.#size)) as T;
    }
  }

  saturate(value: bigint): T {
    Type.assertBigInt(value, "value");
    return ExBigInt.clampToRange(value, [this.MIN_VALUE, this.MAX_VALUE]);
  }
}

const BigUint64: RangedBigInt<biguint64> = new _BigUint(
  BigUint64Info,
  Type.assertBigUint64,
);
Object.freeze(BigUint64);

export { BigUint64 };
