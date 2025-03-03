import {
  type codepoint,
  type rune,
  type safeint,
  type usvstring,
} from "../../_typedef/mod.ts";

export type FindMatchedRunesOptions = {};

// indexesはcharのindexではなく、runeのindex
export type FindMatchedRunesResult = {
  rune: rune;
  runeIndex: safeint;
};

export type FindMatchedRunesResults = Iterable<FindMatchedRunesResult>;

export interface ICondition {
  isMatch(codePointOrRune: codepoint | rune): boolean;

  findMatchedRunes(
    text: usvstring,
    options?: FindMatchedRunesOptions,
  ): FindMatchedRunesResults;

  //TODO findUnmatched

  //XXX findGraphemes
}
