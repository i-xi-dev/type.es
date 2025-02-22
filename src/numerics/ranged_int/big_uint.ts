import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
import { type _AFunc, _byteLengthOf, _normalizeOffset } from "./_utils.ts";
import {
  type biguint64,
  type byteorder,
  type safeint,
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
  // toNumber() → bigint.tsのtoNumberで必要十分（範囲チェックを追加するくらい。要るかそんなもの？）
  // toBigInt() → もともとbigintなので不要（範囲チェックを追加するくらい。要るかそんなもの？）
  // toString() → bigint.tsのtoStringで必要十分（範囲チェックを追加するくらい。要るかそんなもの？）
}

interface BitOperations<T extends bigint> {
  BIT_LENGTH: safeint;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  //XXX bitwiseNot()
  rotateLeft(value: T, offset: safeint): T;
  //XXX rotateRight()
}

interface ByteOperations<T extends bigint> {
  BYTE_LENGTH: safeint;
  toBytes(value: T, byteOrder?: byteorder): Uint8Array;
}

interface BigUint<T extends bigint> extends RangedBigInt<T>, BitOperations<T> {}

interface BigUint8x<T extends bigint> extends BigUint<T>, ByteOperations<T> {}

class _BigUint<T extends bigint> implements BigUint<T> {
  readonly BIT_LENGTH: safeint;
  readonly MIN_VALUE: T;
  readonly MAX_VALUE: T;
  // readonly #info: _Info<T>;
  protected readonly _assert: _AFunc;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.BIT_LENGTH = info.BIT_LENGTH;
    this.MIN_VALUE = info.MIN_VALUE;
    this.MAX_VALUE = info.MAX_VALUE;
    // this.#info = info;
    this._assert = assert;
  }

  bitwiseAnd(a: T, b: T): T {
    this._assert(a, "a");
    this._assert(b, "b");

    return (((a as bigint) & (b as bigint)) & this.MAX_VALUE) as T;
    // as bigintしているのは、何故かtypescriptにbigintでなくnumberだと言われるので
  }

  bitwiseOr(a: T, b: T): T {
    this._assert(a, "a");
    this._assert(b, "b");

    return (((a as bigint) | (b as bigint)) & this.MAX_VALUE) as T;
    // as bigintしているのは、何故かtypescriptにbigintでなくnumberだと言われるので
  }

  bitwiseXOr(a: T, b: T): T {
    this._assert(a, "a");
    this._assert(b, "b");

    return (((a as bigint) ^ (b as bigint)) & this.MAX_VALUE) as T;
    // as bigintしているのは、何故かtypescriptにbigintでなくnumberだと言われるので
  }

  rotateLeft(value: T, offset: safeint): T {
    this._assert(value, "value");
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

class _BigUint8x<T extends bigint> extends _BigUint<T> implements BigUint8x<T> {
  readonly #byteLength: safeint;

  readonly #buffer: ArrayBuffer;
  readonly #bufferView: DataView;
  readonly #bufferUint8View: Uint8Array;

  constructor(info: _Info<T>, assert: _AFunc) {
    super(info, assert);
    // if ((info.BIT_LENGTH % 8) !== 0) {
    //   throw new TypeError("");
    // }
    if (info.BIT_LENGTH !== 64) { //XXX 一旦64のみとする
      throw new TypeError("");
    }

    this.#byteLength = _byteLengthOf(info.BIT_LENGTH);

    //XXX 仮
    this.#buffer = new ArrayBuffer(8);
    this.#bufferView = new DataView(this.#buffer);
    this.#bufferUint8View = new Uint8Array(this.#buffer);
  }

  get BYTE_LENGTH(): safeint {
    return this.#byteLength;
  }

  toBytes(value: T, byteOrder: byteorder = ByteOrder.nativeOrder): Uint8Array {
    this._assert(value, "value");
    //TODO byteOrderのチェック

    // bitLengthは 56 | 64 | 72 | 80 | 88 | 96 | 104 | 112 | 120 | 128 | ...

    this.#bufferView.setBigUint64(
      ExNumber.ZERO,
      value,
      byteOrder === ByteOrder.LITTLE_ENDIAN,
    );
    return Uint8Array.from(this.#bufferUint8View);
  }
}

const BigUint64: BigUint8x<biguint64> = new _BigUint8x(
  BigUint64Info,
  Type.assertBigUint64,
);
Object.freeze(BigUint64);

export { BigUint64 };
