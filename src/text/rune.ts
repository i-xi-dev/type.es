import { plane, rune, script } from "../_.ts";
import { assertGeneralCategory, GeneralCategory } from "./unicode.ts";
import { is as isString } from "../basics/string_type.ts";
import { isBmp as isBmpCodePoint } from "./code_point.ts";
import { Script } from "../i18n/script.ts";

export function is(test: unknown): test is rune {
  return isString(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be an Unicode scalar value.`);
  }
}

export function planeOf(rune: rune): plane {
  assert(rune, "rune");
  return Math.trunc(rune.codePointAt(0)! / 0x10000) as plane;
}

export function isBmp(test: unknown): test is rune {
  return is(test) && isBmpCodePoint(test.codePointAt(0)!);
}

export function matchesGeneralCategory(
  test: unknown,
  category: GeneralCategory,
): test is rune {
  assertGeneralCategory(category, "category");
  return is(test) && (new RegExp(`^\\p{gc=${category}}$`, "v")).test(test);
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

  return is(test) && (new RegExp(`^(?:${pattern})$`, "v")).test(test);
}

let _commonSc: WeakRef<RegExp> | null = null;

export function matchesCommonScript(test: unknown): test is rune {
  let commonSc = _commonSc?.deref();
  if (!commonSc) {
    commonSc = new RegExp(`^\\p{sc=Zyyy}$`, "v");
    _commonSc = new WeakRef(commonSc);
  }
  return is(test) && commonSc.test(test);
}

let _inheritedSc: WeakRef<RegExp> | null = null;

export function matchesInheritedScript(test: unknown): test is rune {
  let inheritedSc = _inheritedSc?.deref();
  if (!inheritedSc) {
    inheritedSc = new RegExp(`^(?:\\p{sc=Zinh})$`, "v");
    _inheritedSc = new WeakRef(inheritedSc);
  }
  return is(test) && inheritedSc.test(test);
}

/*
export function isPatternMatched(
  test: unknown,
  pattern: RunePattern,
): test is rune {
  if (is(test) !== true) {
    return false;
  }

  const codePoint = test.codePointAt(0)!;

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
  if (isNull(options?.planes) && (options?.bmp !== true)) {
    return true;
  }

  const planeSet = new Set(options?.planes ?? []);
  if (options?.bmp === true) {
    planeSet.add(0);
  }

  if (planeSet.size > 0) {
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

  const min = codePointRanges[0];
  const max = codePointRanges[1] ?? min;
  return (test >= min) && (test <= max);
}

function _scriptMatches(test: rune, scripts?: script[]): boolean {

}
*/
