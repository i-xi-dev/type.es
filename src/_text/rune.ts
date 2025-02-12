import { assertRune, isRune } from "../type/string.ts";
import { assertUnicodeGeneralCategory } from "../type/unicode.ts";
import { type GeneralCategory } from "../const/unicode.ts";
import { isBmp as isBmpCodePoint } from "./code_point.ts";
import { type plane, type rune, type script } from "../type.ts";
import { Script } from "../_i18n/script.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function planeOf(rune: rune): plane {
  assertRune(rune, "rune");
  return Math.trunc(rune.codePointAt(NUMBER_ZERO)! / 0x10000) as plane;
}

export function isBmp(test: unknown): test is rune {
  return isRune(test) && isBmpCodePoint(test.codePointAt(NUMBER_ZERO)!);
}

export function matchesGeneralCategory(
  test: unknown,
  category: GeneralCategory,
): test is rune {
  assertUnicodeGeneralCategory(category, "category");
  return isRune(test) && (new RegExp(`^\\p{gc=${category}}$`, "v")).test(test);
}

export type MatchesScriptOptions = {
  excludeScx?: boolean;
};

export function matchesScript(
  test: unknown,
  script: script,
  options?: MatchesScriptOptions,
): test is rune {
  Script.assertUnicodePropertyValue(script, script);

  const or = [];
  or.push(`\\p{sc=${script}}`);
  if (options?.excludeScx !== true) {
    or.push(`\\p{scx=${script}}`);
  }
  const pattern = or.join("|");

  return isRune(test) && (new RegExp(`^(?:${pattern})$`, "v")).test(test);
}

let _commonSc: WeakRef<RegExp> | null = null;

export function matchesCommonScript(test: unknown): test is rune {
  let commonSc = _commonSc?.deref();
  if (!commonSc) {
    commonSc = new RegExp(`^\\p{sc=Zyyy}$`, "v");
    _commonSc = new WeakRef(commonSc);
  }
  return isRune(test) && commonSc.test(test);
}

let _inheritedSc: WeakRef<RegExp> | null = null;

export function matchesInheritedScript(test: unknown): test is rune {
  let inheritedSc = _inheritedSc?.deref();
  if (!inheritedSc) {
    inheritedSc = new RegExp(`^(?:\\p{sc=Zinh})$`, "v");
    _inheritedSc = new WeakRef(inheritedSc);
  }
  return isRune(test) && inheritedSc.test(test);
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

function _planeMatches(
  test: codepoint,
  options?: {
    planes?: plane[];
    bmp?: boolean;
  },
): boolean {
  if (isNullOrUndefined(options?.planes) && (options?.bmp !== true)) {
    return true;
  }

  const planeSet = new Set(options?.planes ?? []);
  if (options?.bmp === true) {
    planeSet.add(NUMBER_ZERO);
  }

  if (planeSet.size > NUMBER_ZERO) {
    return isInPlanes(test, [...planeSet]);
  }

  return true;
}

function _codePointRangeMatches(
  test: codepoint,
  codePointRanges?: SafeIntegerRange.Tuple<codepoint>,
): boolean {
  if ((codePointRanges === null) || (codePointRanges === undefined)) {
    return true;
  }
  IntegerRange.Tuple.assert(codePointRanges, "options.codePointRanges");

  const min = codePointRanges[NUMBER_ZERO];
  const max = codePointRanges[1] ?? min;
  return (test >= min) && (test <= max);
}

function _scriptMatches(test: rune, scripts?: script[]): boolean {

}
*/
