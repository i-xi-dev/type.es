import { codepoint, plane, rune } from "../_.ts";
import { GeneralCategory } from "./unicode.ts";
import { IntegerRange } from "../numerics/integer_range.ts";
import { is as isString } from "../basics/string_type.ts";
import { isNull } from "../basics/object_type.ts";
import {
  isBmp as isBmpCodePoint,
  isInPlanes,
  planeOf as planeOfCodePoint,
} from "./code_point.ts";
import { SafeIntegerRange } from "../numerics/safe_integer_range.ts";

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

export function isInPlane() {
}

function _isGeneralCategory(test: unknown): test is GeneralCategory {
  return Object.values(GeneralCategory).includes(test as GeneralCategory);
}

function _assertGeneralCategory(test: unknown, label: string): void {
  if (_isGeneralCategory(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be an Unicode \`General_Category\` value.`,
    );
  }
}

export function isInGeneralCategory(
  test: unknown,
  category: GeneralCategory,
): test is rune {
  _assertGeneralCategory(category, "category");
  return is(test) && (new RegExp(`^\\p{gc=${category}}$`, "v")).test(test);
}

export function isInBlock() {}

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
