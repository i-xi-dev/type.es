import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { type codepoint, type rune } from "../../_typedef/mod.ts";

export function _parse(
  codePointOrRune: codepoint | rune,
): { codePoint: codepoint; rune: rune } {
  let codePoint: codepoint;
  let rune: rune;
  if (Type.isCodePoint(codePointOrRune)) {
    codePoint = codePointOrRune;
    rune = Rune.fromCodePoint(codePointOrRune);
  } else if (Type.isRune(codePointOrRune)) {
    codePoint = Rune.toCodePoint(codePointOrRune);
    rune = codePointOrRune;
  } else {
    throw new TypeError("TODO");
  }

  return { codePoint, rune };
}
