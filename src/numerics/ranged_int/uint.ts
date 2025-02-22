import * as Byte from "../../basics/byte/mod.ts";
import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
import {
  type byteorder,
  type safeint,
  type uint6,
  type uint8,
} from "../../_typedef/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import { Uint6 as Uint6Info, Uint8 as Uint8Info } from "../../_const/uint.ts";

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

function _normalizeOffset(offset: safeint, bitLength: safeint): safeint {
  const normalizedOffset = offset % bitLength;
  if (normalizedOffset < ExNumber.ZERO) {
    return normalizedOffset + bitLength;
  }
  return normalizedOffset;
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

function _byteLengthOf(bitLength: safeint): safeint {
  // assert (bitLength % Byte.BITS_PER_BYTE) === 0;
  return bitLength / Byte.BITS_PER_BYTE;
}

interface RangedInt<T extends safeint> {
  MIN_VALUE: T;
  MAX_VALUE: T;
}

interface BitOperations<T extends safeint> {
  BIT_LENGTH: safeint;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  rotateLeft(value: T, offset: safeint): T;
}

interface ByteOperations<T extends safeint> {
  BYTE_LENGTH: safeint;
  toBytes(value: T, byteOrder?: byteorder): Uint8Array;
}

interface Uint<T extends safeint> extends RangedInt<T>, BitOperations<T> {}

interface Uint8x<T extends safeint> extends Uint<T>, ByteOperations<T> {}

type _AFunc = (test: unknown, label: string) => void;

class _Uint<T extends safeint> implements Uint<T> {
  readonly #info: _Info<T>;
  protected readonly _assert: _AFunc;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.#info = info;
    this._assert = assert;
  }

  get BIT_LENGTH(): safeint {
    return this.#info.BIT_LENGTH;
  }

  get MIN_VALUE(): T {
    return this.#info.MIN_VALUE;
  }

  get MAX_VALUE() {
    return this.#info.MAX_VALUE;
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

export const Uint6: Uint<uint6> = new _Uint(Uint6Info, Type.assertUint6);

type _TFunc<T> = (value: T, byteOrder: byteorder) => Uint8Array;

class _Uint8x<T extends safeint> extends _Uint<T> implements Uint8x<T> {
  readonly #byteLength: safeint;
  readonly #toBytes: _TFunc<T>;

  constructor(info: _Info<T>, assert: _AFunc, toBytes: _TFunc<T>) {
    super(info, assert);

    this.#byteLength = _byteLengthOf(info.BIT_LENGTH);
    this.#toBytes = toBytes;
  }

  get BYTE_LENGTH(): safeint {
    return this.#byteLength;
  }

  toBytes(value: T, byteOrder: byteorder = ByteOrder.nativeOrder): Uint8Array {
    return this.#toBytes(value, byteOrder);
  }
}

export const Uint8: Uint8x<uint8> = new _Uint8x(
  Uint8Info,
  Type.assertUint8,
  (value: uint8, byteOrder: byteorder) => {
    void byteOrder;
    Type.assertUint8(value, "value");

    return Uint8Array.of(value);
  },
);
