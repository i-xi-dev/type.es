import * as Type from "../../type/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import { type safeint, type uint8 } from "../../_typedef/mod.ts";
import { Uint8 as Uint8Info } from "../../_const/uint.ts";

type _Info<T extends safeint> = {
  BIT_LENGTH: safeint;
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

interface Uint<T extends safeint> {
  BIT_LENGTH: safeint;
  MIN_VALUE: T;
  MAX_VALUE: T;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  rotateLeft(value: T, offset: safeint): T;
}

export const Uint8: Uint<uint8> = {
  ...Uint8Info,

  bitwiseAnd(a: uint8, b: uint8): uint8 {
    Type.assertUint8(a, "a");
    Type.assertUint8(b, "b");

    return _bitwiseAnd_under32(a, b, Uint8Info);
  },

  bitwiseOr(a: uint8, b: uint8): uint8 {
    Type.assertUint8(a, "a");
    Type.assertUint8(b, "b");

    return _bitwiseOr_under32(a, b, Uint8Info);
  },

  bitwiseXOr(a: uint8, b: uint8): uint8 {
    Type.assertUint8(a, "a");
    Type.assertUint8(b, "b");

    return _bitwiseXOr_under32(a, b, Uint8Info);
  },

  rotateLeft(value: uint8, offset: safeint): uint8 {
    Type.assertUint8(value, "value");

    return _rotateLeft_under32(value, offset, Uint8Info);
  },
};
