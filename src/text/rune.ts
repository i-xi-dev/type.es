import { codepoint, plane, rune, script } from "../_.ts";
import { IntegerRange } from "../numerics/integer_range.ts";
import { is as isString } from "../basics/string_type.ts";
import { isNull } from "../basics/object_type.ts";
import { isBmp as isBmpCodePoint, isInPlanes, planeOf } from "./code_point.ts";
import { RunePattern } from "./rune_pattern.ts";
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

export function isBmp(test: unknown): test is rune {
  return is(test) && isBmpCodePoint(test.codePointAt(0)!);
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
