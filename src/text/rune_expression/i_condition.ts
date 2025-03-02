import { type codepoint, type rune } from "../../_typedef/mod.ts";

export interface ICondition {
  isMatch(codePointOrRune: codepoint | rune): boolean;

  //TODO findMatches(text: usvstring, limit?: safeint): Map<rune, Array<safeint>>;
}
