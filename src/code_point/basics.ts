import { assertCodePoint } from "../type/code_point.ts";
import { type codepoint, type plane } from "../type.ts";
import { HEXADECIMAL } from "../numerics/radix.ts";
import {
  toString as safeIntegerToString,
  type ToStringOptions,
} from "../safe_integer/basics.ts";

const _toStringOptions: ToStringOptions = {
  // lowerCase: false,
  minIntegralDigits: 4,
  radix: HEXADECIMAL,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint, "codePoint");
  return `U+${safeIntegerToString(codePoint, _toStringOptions)}`;
}

// fromRune(rune: rune): codepoint → CodePoint.toRune

// toRune(codePoint: codepoint): rune → CodePoint.fromRune

export function planeOf(codePoint: codepoint): plane {
  assertCodePoint(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as plane;
}
