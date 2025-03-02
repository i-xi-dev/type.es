import * as CodePointRange from "../../code_point_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { _parse } from "../_utils.ts";
import {
  type codeplane,
  type codepoint,
  type intrange,
  type rune,
} from "../../../_typedef/mod.ts";
import { CodePointRangeSet } from "../../code_point_range_set/mod.ts";
import { ICondition } from "../i_condition.ts";

class _CodePointCondition implements ICondition {
  readonly #codePointRangeSet: CodePointRangeSet;

  constructor(ranges: Iterable<intrange<codepoint>>) {
    this.#codePointRangeSet = CodePointRangeSet.fromRanges(ranges);
  }

  isMatch(codePointOrRune: codepoint | rune): boolean {
    const { codePoint } = _parse(codePointOrRune);
    return this.#codePointRangeSet?.has(codePoint);
  }
}

export function fromCodePointRanges(
  ranges: Iterable<intrange<codepoint>>,
): ICondition {
  // rangesはチェックされる
  return new _CodePointCondition(ranges);
}

export function fromCodePlanes(planes: Iterable<codeplane>): ICondition {
  Type.assertIterable(planes, "planes");
  const ranges = [];
  for (const plane of planes) {
    ranges.push(CodePointRange.ofCodePlane(plane));
  }
  return new _CodePointCondition(ranges);
}
