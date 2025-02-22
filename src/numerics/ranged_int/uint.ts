import * as Byte from "../../basics/byte/mod.ts";
import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
import { type _AFunc, _normalizeOffset } from "./_utils.ts";
import {
  type byteorder,
  type safeint,
  type uint16,
  type uint24,
  type uint6,
  type uint7,
  type uint8,
} from "../../_typedef/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import {
  Uint16 as Uint16Info,
  Uint24 as Uint24Info,
  Uint6 as Uint6Info,
  Uint7 as Uint7Info,
  Uint8 as Uint8Info,
} from "../../_const/uint.ts";

type _Info<T extends safeint> = {
  BIT_LENGTH: safeint;
  MIN_VALUE: T;
  MAX_VALUE: T;
};

function _bitwiseAnd_under32<T extends safeint>(
  a: T,
  b: T,
  info: _Info<T>,
): T {
  return ((a & b) & info.MAX_VALUE) as T;
}

function _bitwiseOr_under32<T extends safeint>(
  a: T,
  b: T,
  info: _Info<T>,
): T {
  return ((a | b) & info.MAX_VALUE) as T;
}

function _bitwiseXOr_under32<T extends safeint>(
  a: T,
  b: T,
  info: _Info<T>,
): T {
  return ((a ^ b) & info.MAX_VALUE) as T;
}

function _rotateLeft_under32<T extends safeint>(
  value: T,
  offset: safeint,
  info: _Info<T>,
): T {
  Type.assertSafeInt(offset, "offset");

  const normalizedOffset = _normalizeOffset(offset, info.BIT_LENGTH);
  if (normalizedOffset === ExNumber.ZERO) {
    return value;
  }

  return (((value << normalizedOffset) |
    (value >> (info.BIT_LENGTH - normalizedOffset))) & info.MAX_VALUE) as T;
}

interface RangedInt<T extends safeint> {
  MIN_VALUE: T;
  MAX_VALUE: T;
  BIT_LENGTH: safeint;
  BYTE_LENGTH: safeint;
  toBytes(value: T, byteOrder?: byteorder): Uint8Array;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  //XXX bitwiseNot
  rotateLeft(value: T, offset: safeint): T;
  //XXX rotateRight
  // toNumber() → もともとnumberなので不要（範囲チェックを追加するくらい。要るかそんなもの？）
  // toBigInt() → bigint.tsのfromNumberで必要十分（範囲チェックを追加するくらい。要るかそんなもの？）
}

class _Uint<T extends safeint> implements RangedInt<T> {
  readonly MIN_VALUE: T;
  readonly MAX_VALUE: T;
  readonly BIT_LENGTH: safeint;
  readonly BYTE_LENGTH: safeint;
  readonly #info: _Info<T>;
  protected readonly _assert: _AFunc;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.MIN_VALUE = info.MIN_VALUE;
    this.MAX_VALUE = info.MAX_VALUE;
    this.BIT_LENGTH = info.BIT_LENGTH;
    this.BYTE_LENGTH = Math.ceil(info.BIT_LENGTH / Byte.BITS_PER_BYTE);
    this.#info = info;
    this._assert = assert;
  }

  toBytes(value: T, byteOrder: byteorder = ByteOrder.nativeOrder): Uint8Array {
    this._assert(value, "value");
    //TODO byteOrderのチェック

    // bitLengthは 8 | 16 | 24 | 32 | 40 | 48 のいずれか

    if (this.BIT_LENGTH === 8) {
      return Uint8Array.of(value);
    }

    const bytes: Array<uint8> = [];
    bytes.push((value % 0x100) as uint8);
    for (let i = 2; i <= 6; i++) { // 16-48
      if (this.BIT_LENGTH >= (Byte.BITS_PER_BYTE * i)) {
        bytes.push(_r(value, i));
      }
    }

    return Uint8Array.from(
      (byteOrder === ByteOrder.LITTLE_ENDIAN) ? bytes : bytes.reverse(),
    );
  }

  bitwiseAnd(a: T, b: T): T {
    this._assert(a, "a");
    this._assert(b, "b");

    return _bitwiseAnd_under32(a, b, this.#info);
  }

  bitwiseOr(a: T, b: T): T {
    this._assert(a, "a");
    this._assert(b, "b");

    return _bitwiseOr_under32(a, b, this.#info);
  }

  bitwiseXOr(a: T, b: T): T {
    this._assert(a, "a");
    this._assert(b, "b");

    return _bitwiseXOr_under32(a, b, this.#info);
  }

  rotateLeft(value: T, offset: safeint): T {
    this._assert(value, "value");

    return _rotateLeft_under32(value, offset, this.#info);
  }
}

function _r(value: safeint, byteLength: safeint): uint8 {
  const x1 = 0x100 ** byteLength;
  const x2 = (value >= x1) ? (value % x1) : value;
  return Math.trunc(x2 / (0x100 ** (byteLength - 1))) as uint8;
}

const Uint6: RangedInt<uint6> = new _Uint(Uint6Info, Type.assertUint6);
Object.freeze(Uint6);
// defineProperty(s)だとIntelliSense上で反映されないので、インスタンス生成後にfreezeする
// //（コンストラクター内でfreezeするとextendsできなくなる）

const Uint7: RangedInt<uint7> = new _Uint(Uint7Info, Type.assertUint7);
Object.freeze(Uint7);

const Uint8: RangedInt<uint8> = new _Uint(Uint8Info, Type.assertUint8);
Object.freeze(Uint8);

const Uint16: RangedInt<uint16> = new _Uint(Uint16Info, Type.assertUint16);
Object.freeze(Uint16);

const Uint24: RangedInt<uint24> = new _Uint(Uint24Info, Type.assertUint24);
Object.freeze(Uint24);

export { Uint16, Uint24, Uint6, Uint7, Uint8 };
