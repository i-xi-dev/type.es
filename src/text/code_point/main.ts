import * as Type from "../../type/mod.ts";
import { type codeplane, type codepoint } from "../../_typedef/mod.ts";
import { Radix } from "../../basics/mod.ts";
import { SafeInt } from "../../numerics/mod.ts";

const _toStringOptions: SafeInt.ToStringOptions = {
  // lowerCase: false,
  minIntegerDigits: 4,
  radix: Radix.HEXADECIMAL,
} as const;

export function toString(codePoint: codepoint): string {
  Type.assertCodePoint(codePoint, "codePoint");
  return `U+${SafeInt.toString(codePoint, _toStringOptions)}`;
}

// fromRune(rune: rune): codepoint → CodePoint.toRune

// toRune(codePoint: codepoint): rune → CodePoint.fromRune

export function planeOf(codePoint: codepoint): codeplane {
  Type.assertCodePoint(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as codeplane;
}
