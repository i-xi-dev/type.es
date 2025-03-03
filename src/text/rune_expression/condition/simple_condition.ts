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
  type usvstring,
} from "../../../_typedef/mod.ts";
import { CodePointRangeSet } from "../../code_point_range_set/mod.ts";
import {
  type FindMatchedRunesOptions,
  type FindMatchedRunesResults,
  type ICondition,
} from "../i_condition.ts";
import { UnicodeGeneralCategorySet } from "../../unicode_gc_set/mod.ts";
import { UnicodeScriptSet } from "../../unicode_sc_set/mod.ts";

//TODO 否定条件

abstract class _ConditionBase implements ICondition {
  abstract isMatch(codePointOrRune: codepoint | rune): boolean;

  findMatchedRunes(
    text: usvstring,
    options?: FindMatchedRunesOptions,
  ): FindMatchedRunesResults {
    Type.assertUSVString(text, "text");

    // deno-lint-ignore no-this-alias
    const self = this;

    return (function* (runes) {
      let runeIndex = 0;
      for (const rune of runes) {
        if (self.isMatch(rune)) {
          yield { rune, runeIndex };
        }
        runeIndex++;
      }
    })(text);
  }
}

class _CodePointCondition extends _ConditionBase implements ICondition {
  readonly #codePointRangeSet: CodePointRangeSet;

  constructor(ranges: Iterable<intrange<codepoint>>) {
    super();
    this.#codePointRangeSet = CodePointRangeSet.fromRanges(ranges);
  }

  override isMatch(codePointOrRune: codepoint | rune): boolean {
    const { codePoint } = _parse(codePointOrRune);
    return this.#codePointRangeSet.has(codePoint);
  }
}

export type UnicodeScriptConditionOptions = {
  excludeScx?: boolean;
};

abstract class _RegexConditionBase extends _ConditionBase
  implements ICondition {
  readonly #regex?: RegExp;

  protected constructor(regex?: RegExp) {
    super();
    this.#regex = regex;
  }

  override isMatch(codePointOrRune: codepoint | rune): boolean {
    const { rune } = _parse(codePointOrRune);
    return this.#regex?.test(rune) ?? false;
  }
}

class _UnicodeScriptCondition extends _RegexConditionBase
  implements ICondition {
  constructor(
    scripts: Iterable<script>,
    options?: UnicodeScriptConditionOptions,
  ) {
    const uscSet = new UnicodeScriptSet(scripts);
    let regex: RegExp | undefined = undefined;
    if (uscSet.size > 0) {
      const pattern = [...uscSet].map((script) => {
        return (options?.excludeScx === true)
          ? `\\p{sc=${script}}`
          : `\\p{sc=${script}}\\p{scx=${script}}`;
      }).join();
      regex = new RegExp(`^[${pattern}]$`, "v");
    }
    super(regex);
  }
}

class _UnicodeGeneralCategoryCondition extends _RegexConditionBase
  implements ICondition {
  constructor(gcs: Iterable<gc>) {
    const ugcSet = new UnicodeGeneralCategorySet(gcs);
    let regex: RegExp | undefined = undefined;
    if (ugcSet.size > 0) {
      const pattern = [...ugcSet].map((gc) => `\\p{gc=${gc}}`).join();
      regex = new RegExp(`^[${pattern}]$`, "v");
    }
    super(regex);
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
