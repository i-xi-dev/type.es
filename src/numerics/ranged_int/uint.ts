import * as Byte from "../../basics/byte/mod.ts";
import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
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
  readonly BIT_LENGTH: safeint;
  readonly MIN_VALUE: T;
  readonly MAX_VALUE: T;
  readonly #info: _Info<T>;
  protected readonly _assert: _AFunc;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.BIT_LENGTH = info.BIT_LENGTH;
    this.MIN_VALUE = info.MIN_VALUE;
    this.MAX_VALUE = info.MAX_VALUE;
    this.#info = info;
    this._assert = assert;

    // Object.defineProperties(this, {
    //   BIT_LENGTH: {
    //     value: info.BIT_LENGTH,
    //     writable: false,
    //     configurable: false,
    //   },
    //   MIN_VALUE: {
    //     value: info.MIN_VALUE,
    //     writable: false,
    //     configurable: false,
    //   },
    //   MAX_VALUE: {
    //     value: info.MAX_VALUE,
    //     writable: false,
    //     configurable: false,
    //   },
    // });
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

class _Uint8x<T extends safeint> extends _Uint<T> implements Uint8x<T> {
  readonly #byteLength: safeint;

  constructor(info: _Info<T>, assert: _AFunc) {
    super(info, assert);
    if ((info.BIT_LENGTH % 8) !== 0) {
      throw new TypeError("");
    }

    this.#byteLength = _byteLengthOf(info.BIT_LENGTH);
  }

  get BYTE_LENGTH(): safeint {
    return this.#byteLength;
  }

  toBytes(value: T, byteOrder: byteorder = ByteOrder.nativeOrder): Uint8Array {
    this._assert(value, "value");

    // bitLengthは 8 | 16 | 24 | 32 | 40 | 48 のいずれか

    if (this.BIT_LENGTH === 8) {
      return Uint8Array.of(value);
    }

    const bytes: Array<uint8> = [];
    bytes.push((value % 0x100) as uint8);
    if (this.BIT_LENGTH >= 16) {
      bytes.push(_r(value, 2));

      if (this.BIT_LENGTH >= 24) {
        bytes.push(_r(value, 3));

        if (this.BIT_LENGTH >= 32) {
          bytes.push(_r(value, 4));

          if (this.BIT_LENGTH >= 40) {
            bytes.push(_r(value, 5));

            if (this.BIT_LENGTH >= 48) {
              bytes.push(_r(value, 6));
            }
          }
        }
      }
    }

    return Uint8Array.from(
      (byteOrder === ByteOrder.LITTLE_ENDIAN) ? bytes : bytes.reverse(),
    );
  }
}

const Uint6: Uint<uint6> = new _Uint(Uint6Info, Type.assertUint6);
Object.freeze(Uint6);

const Uint7: Uint<uint7> = new _Uint(Uint7Info, Type.assertUint7);
Object.freeze(Uint7);

const Uint8: Uint8x<uint8> = new _Uint8x(Uint8Info, Type.assertUint8);
Object.freeze(Uint8);

const Uint16: Uint8x<uint16> = new _Uint8x(Uint16Info, Type.assertUint16);
Object.freeze(Uint16);

const Uint24: Uint8x<uint24> = new _Uint8x(Uint24Info, Type.assertUint24);
Object.freeze(Uint24);

export { Uint16, Uint24, Uint6, Uint7, Uint8 };
