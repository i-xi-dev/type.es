import * as CodePointRange from "../../code_point_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { _parse } from "../_utils.ts";
import {
  type codeplane,
  type codepoint,
  type gc,
  type intrange,
  type rune,
  type script,
} from "../../../_typedef/mod.ts";
import { CodePointRangeSet } from "../../code_point_range_set/mod.ts";
import { ICondition } from "../i_condition.ts";
import { UnicodeGeneralCategorySet } from "../../unicode_gc_set/mod.ts";
import { UnicodeScriptSet } from "../../unicode_sc_set/mod.ts";

//TODO 否定条件

class _CodePointCondition implements ICondition {
  readonly #codePointRangeSet: CodePointRangeSet;

  constructor(ranges: Iterable<intrange<codepoint>>) {
    this.#codePointRangeSet = CodePointRangeSet.fromRanges(ranges);
  }

  isMatch(codePointOrRune: codepoint | rune): boolean {
    const { codePoint } = _parse(codePointOrRune);
    return this.#codePointRangeSet.has(codePoint);
  }
}

export type UnicodeScriptConditionOptions = {
  excludeScx?: boolean;
};

class _UnicodeScriptCondition implements ICondition {
  readonly #uscSet: UnicodeScriptSet;
  readonly #regex?: RegExp;

  constructor(
    scripts: Iterable<script>,
    options?: UnicodeScriptConditionOptions,
  ) {
    this.#uscSet = new UnicodeScriptSet(scripts);
    if (this.#uscSet.size > 0) {
      const pattern = [...this.#uscSet].map((script) => {
        return (options?.excludeScx === true)
          ? `\\p{sc=${script}}`
          : `\\p{sc=${script}}\\p{scx=${script}}`;
      }).join();
      this.#regex = new RegExp(`^[${pattern}]$`, "v");
    }
  }

  isMatch(codePointOrRune: codepoint | rune): boolean {
    const { rune } = _parse(codePointOrRune);
    return this.#regex?.test(rune) ?? false;
  }
}

class _UnicodeGeneralCategoryCondition implements ICondition {
  readonly #ugcSet: UnicodeGeneralCategorySet;
  readonly #regex?: RegExp;

  constructor(gcs: Iterable<gc>) {
    this.#ugcSet = new UnicodeGeneralCategorySet(gcs);
    if (this.#ugcSet.size > 0) {
      const pattern = [...this.#ugcSet].map((gc) => `\\p{gc=${gc}}`).join();
      this.#regex = new RegExp(`^[${pattern}]$`, "v");
    }
  }

  isMatch(codePointOrRune: codepoint | rune): boolean {
    const { rune } = _parse(codePointOrRune);
    return this.#regex?.test(rune) ?? false;
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

export function fromScripts(
  scripts: Iterable<script>,
  options?: UnicodeScriptConditionOptions,
): ICondition {
  // scriptsはチェックされる
  return new _UnicodeScriptCondition(scripts, options);
}

export function fromGeneralCategories(gcs: Iterable<gc>): ICondition {
  // gcsはチェックされる
  return new _UnicodeGeneralCategoryCondition(gcs);
}
