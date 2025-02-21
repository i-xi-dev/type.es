import * as Type from "../../type/mod.ts";
import { type codepoint, type rune } from "../../_typedef/mod.ts";

export function fromCodePoint(codePoint: codepoint): rune {
  Type.assertCodePoint(codePoint, "codePoint");
  if (Type.isSurrogateCodePoint(codePoint)) {
    throw new RangeError(`\`codePoint\` is a lone surrogate code point.`);
  }
  return String.fromCodePoint(codePoint);
}

export function toCodePoint(rune: rune): codepoint {
  Type.assertRune(rune, "rune");
  return rune.codePointAt(0) as codepoint;
}
