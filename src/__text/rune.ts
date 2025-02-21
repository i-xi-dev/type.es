import * as Type from "../type/mod.ts";
import { type rune } from "../_typedef/mod.ts";

let _commonSc: WeakRef<RegExp> | null = null;

export function matchesCommonScript(test: unknown): test is rune {
  let commonSc = _commonSc?.deref();
  if (!commonSc) {
    commonSc = new RegExp(`^\\p{sc=Zyyy}$`, "v");
    _commonSc = new WeakRef(commonSc);
  }
  return Type.isRune(test) && commonSc.test(test);
}

let _inheritedSc: WeakRef<RegExp> | null = null;

export function matchesInheritedScript(test: unknown): test is rune {
  let inheritedSc = _inheritedSc?.deref();
  if (!inheritedSc) {
    inheritedSc = new RegExp(`^(?:\\p{sc=Zinh})$`, "v");
    _inheritedSc = new WeakRef(inheritedSc);
  }
  return Type.isRune(test) && inheritedSc.test(test);
}

/*
export function isPatternMatched(
  test: unknown,
  pattern: RunePattern,
): test is rune {
  if (is(test) !== true) {
    return false;
  }

  const codePoint = test.codePointAt(NUMBER_ZERO)!;

  if (_planeMatches(codePoint, pattern) !== true) {
    return false;
  }

  if (_codePointRangeMatches(codePoint, pattern?.codePointRanges) !== true) {
    return false;
  }

  return true;
}


function _codePointRangeMatches(
  test: codepoint,
  codePointRanges?: safeintrange.Tuple<codepoint>,
): boolean {
  if ((codePointRanges === null) || (codePointRanges === undefined)) {
    return true;
  }
  IntegerRange.Tuple.assert(codePointRanges, "options.codePointRanges");

  const min = codePointRanges[NUMBER_ZERO];
  const max = codePointRanges[1] ?? min;
  return (test >= min) && (test <= max);
}

*/
