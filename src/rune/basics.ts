import { assertRune } from "../type/string.ts";
import { type codepoint, type rune } from "../type.ts";
import { assertCodePoint, isSurrogateCodePoint } from "../type/code_point.ts";

export function fromCodePoint(codePoint: codepoint): rune {
  assertCodePoint(codePoint, "codePoint");
  if (isSurrogateCodePoint(codePoint)) {
    throw new RangeError(`\`codePoint\` is a lone surrogate code point.`);
  }
  return String.fromCodePoint(codePoint);
}

export function toCodePoint(rune: rune): codepoint {
  assertRune(rune, "rune");
  return rune.codePointAt(0) as codepoint;
}
