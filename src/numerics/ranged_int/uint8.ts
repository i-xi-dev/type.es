import * as Type from "../../type/mod.ts";
import {
  _bitwiseAnd_under32,
  _bitwiseOr_under32,
  _bitwiseXOr_under32,
  _rotateLeft_under32,
} from "./_uint_base.ts";
import { type safeint, type uint8 } from "../../_typedef/mod.ts";
import { Uint8 } from "../../_const/uint.ts";

const _Info = {
  bitLength: Uint8.BIT_LENGTH,
  max: Uint8.MAX_VALUE,
} as const;

export function bitwiseAnd(a: uint8, b: uint8): uint8 {
  Type.assertUint8(a, "a");
  Type.assertUint8(b, "b");

  return _bitwiseAnd_under32(a, b, _Info);
}

export function bitwiseOr(a: uint8, b: uint8): uint8 {
  Type.assertUint8(a, "a");
  Type.assertUint8(b, "b");

  return _bitwiseOr_under32(a, b, _Info);
}

export function bitwiseXOr(a: uint8, b: uint8): uint8 {
  Type.assertUint8(a, "a");
  Type.assertUint8(b, "b");

  return _bitwiseXOr_under32(a, b, _Info);
}

export function rotateLeft(value: uint8, offset: safeint): uint8 {
  Type.assertUint8(value, "value");

  return _rotateLeft_under32(value, offset, _Info);
}
