import * as SafeInt from "../safeint/mod.ts";
import { assertCodePoint } from "../type/code_point.ts";
import { type codepoint, type plane } from "../type.ts";
import { Radix } from "../const/radix.ts";

const _toStringOptions: SafeInt.ToStringOptions = {
  // lowerCase: false,
  minIntegralDigits: 4,
  radix: Radix.HEXADECIMAL,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint, "codePoint");
  return `U+${SafeInt.toString(codePoint, _toStringOptions)}`;
}

// fromRune(rune: rune): codepoint → CodePoint.toRune

// toRune(codePoint: codepoint): rune → CodePoint.fromRune

export function planeOf(codePoint: codepoint): plane {
  assertCodePoint(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as plane;
}
