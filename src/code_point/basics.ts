import { assertCodePoint } from "../type/code_point.ts";
import { type codepoint, type rune } from "../type.ts";
import {
  toString as safeIntegerToString,
  type ToStringOptions,
} from "../safe_integer/basics.ts";

const _toStringOptions: ToStringOptions = {
  // lowerCase: false,
  minIntegralDigits: 4,
  radix: 16,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint, "codePoint");
  return `U+${safeIntegerToString(codePoint, _toStringOptions)}`;
}

export function toRune(codePoint: codepoint): rune {
  assertCodePoint(codePoint, "codePoint");
  return String.fromCodePoint(codePoint);
}
