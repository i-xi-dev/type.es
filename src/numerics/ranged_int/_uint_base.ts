import * as Type from "../../type/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import { type safeint } from "../../_typedef/mod.ts";

type _Info<T extends safeint> = {
  bitLength: safeint;
  max: T;
};

export function _bitwiseAnd_under32<T extends safeint>(
  a: T,
  b: T,
  info: _Info<T>,
): T {
  return ((a & b) & info.max) as T;
}

export function _bitwiseOr_under32<T extends safeint>(
  a: T,
  b: T,
  info: _Info<T>,
): T {
  return ((a | b) & info.max) as T;
}

export function _bitwiseXOr_under32<T extends safeint>(
  a: T,
  b: T,
  info: _Info<T>,
): T {
  return ((a ^ b) & info.max) as T;
}

function _normalizeOffset(offset: safeint, bitLength: safeint): safeint {
  const normalizedOffset = offset % bitLength;
  if (normalizedOffset < ExNumber.ZERO) {
    return normalizedOffset + bitLength;
  }
  return normalizedOffset;
}

export function _rotateLeft_under32<T extends safeint>(
  value: T,
  offset: safeint,
  info: _Info<T>,
): T {
  Type.assertSafeInt(offset, "offset");

  const normalizedOffset = _normalizeOffset(offset, info.bitLength);
  if (normalizedOffset === ExNumber.ZERO) {
    return value;
  }

  return (((value << normalizedOffset) |
    (value >> (info.bitLength - normalizedOffset))) & info.max) as T;
}
