import { assertCodePoint, isSurrogateCodePoint } from "../type/code_point.ts";
import { assertRune } from "../type/string.ts";
import { type codepoint, type plane, type rune } from "../type.ts";
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

export function fromRune(rune: rune): codepoint {
  assertRune(rune, "rune");
  return rune.codePointAt(0) as codepoint;
}

export function toRune(codePoint: codepoint): rune {
  assertCodePoint(codePoint, "codePoint");
  if (isSurrogateCodePoint(codePoint)) {
    throw new RangeError(`\`codePoint\` is a lone surrogate code point.`);
  }
  return String.fromCodePoint(codePoint);
}

export function planeOf(codePoint: codepoint): plane {
  assertCodePoint(codePoint, "codePoint");
  return Math.trunc(codePoint / 0x10000) as plane;
}
