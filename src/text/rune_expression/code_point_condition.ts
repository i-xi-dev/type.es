import * as CodePointRange from "../code_point_range/mod.ts";
import { _parse } from "./_utils.ts";
import {
  type codeplane,
  type codepoint,
  type intrange,
  type rune,
} from "../../_typedef/mod.ts";
import { CodePointRangeSet } from "../code_point_range_set/mod.ts";
import { ICondition } from "./i_condition.ts";
import { Type } from "../../../mod.ts";

export class CodePointCondition implements ICondition {
  readonly #codePointRangeSet: CodePointRangeSet;

  private constructor(ranges: Iterable<intrange<codepoint>>) {
    this.#codePointRangeSet = CodePointRangeSet.fromRanges(ranges);
  }

  static fromCodePlanes(planes: Iterable<codeplane>): CodePointCondition {
    Type.assertIterable(planes, "planes");
    const ranges = [];
    for (const plane of planes) {
      ranges.push(CodePointRange.ofCodePlane(plane));
    }
    return new CodePointCondition(ranges);
  }

  static fromCodePointRanges(
    ranges: Iterable<intrange<codepoint>>,
  ): CodePointCondition {
    // rangesはチェックされる
    return new CodePointCondition(ranges);
  }

  isMatch(codePointOrRune: codepoint | rune): boolean {
    const { codePoint } = _parse(codePointOrRune);
    return this.#codePointRangeSet?.has(codePoint);
  }
}
