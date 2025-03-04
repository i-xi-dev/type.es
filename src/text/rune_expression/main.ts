import * as CodePointRange from "../code_point_range/mod.ts";
import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import {
  type codeplane,
  type codepoint,
  type gc,
  type intrange,
  type rune,
  type safeint,
  type script,
  type usvstring,
} from "../../_typedef/mod.ts";
import { CodePointRangeSet } from "../code_point_range_set/mod.ts";
import { UnicodeGeneralCategorySet } from "../unicode_gc_set/mod.ts";
import { UnicodeScriptSet } from "../unicode_sc_set/mod.ts";

//TODO 否定条件

function _parse(
  codePointOrRune: codepoint | rune,
): { codePoint: codepoint; rune: rune } {
  let codePoint: codepoint;
  let rune: rune;
  if (Type.isCodePoint(codePointOrRune)) {
    codePoint = codePointOrRune;
    rune = Rune.fromCodePoint(codePointOrRune);
  } else if (Type.isRune(codePointOrRune)) {
    codePoint = Rune.toCodePoint(codePointOrRune);
    rune = codePointOrRune;
  } else {
    throw new TypeError(
      "`codePointOrRune` must be a code point or string representing a single code point.",
    );
  }

  return { codePoint, rune };
}

export type FindMatchedRunesOptions = {};

// indexesはcharのindexではなく、runeのindex
export type FindMatchedRunesResult = {
  rune: rune;
  runeIndex: safeint;
};

export type FindMatchedRunesResults = Iterable<FindMatchedRunesResult>;

export interface Condition {
  isMatch(codePointOrRune: codepoint | rune): boolean;

  findMatchedRunes(
    text: usvstring,
    options?: FindMatchedRunesOptions,
  ): FindMatchedRunesResults;

  //TODO findUnmatched

  //XXX findGraphemes
}

abstract class _ConditionBase implements Condition {
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

class _CodePointCondition extends _ConditionBase implements Condition {
  readonly #codePointRangeSet: CodePointRangeSet;

  constructor(ranges: Iterable<intrange<codepoint>>) {
    super();
    this.#codePointRangeSet = CodePointRangeSet.fromRanges(ranges);
    if (this.#codePointRangeSet.size < 1) {
      throw new TypeError("`ranges` must have 1 or more ranges.");
    }
  }

  override isMatch(codePointOrRune: codepoint | rune): boolean {
    const { codePoint } = _parse(codePointOrRune);
    return this.#codePointRangeSet.has(codePoint);
  }
}

export type UnicodeScriptConditionOptions = {
  excludeScx?: boolean;
};

abstract class _RegexConditionBase extends _ConditionBase implements Condition {
  readonly #regex: RegExp;

  protected constructor(regex: RegExp) {
    super();
    this.#regex = regex;
  }

  override isMatch(codePointOrRune: codepoint | rune): boolean {
    const { rune } = _parse(codePointOrRune);
    return this.#regex.test(rune);
  }
}

class _UnicodeScriptCondition extends _RegexConditionBase implements Condition {
  constructor(
    scripts: Iterable<script>,
    options?: UnicodeScriptConditionOptions,
  ) {
    const uscSet = new UnicodeScriptSet(scripts);
    if (uscSet.size < 1) {
      throw new TypeError("`scripts` must have 1 or more scripts.");
    }

    const pattern = [...uscSet].map((script) => {
      return (options?.excludeScx === true)
        ? `\\p{sc=${script}}`
        : `\\p{sc=${script}}\\p{scx=${script}}`;
    }).join();
    const regex = new RegExp(`^[${pattern}]$`, "v");
    super(regex);
  }
}

class _UnicodeGeneralCategoryCondition extends _RegexConditionBase
  implements Condition {
  constructor(gcs: Iterable<gc>) {
    const ugcSet = new UnicodeGeneralCategorySet(gcs);
    if (ugcSet.size < 1) {
      throw new TypeError(
        "`gcs` must have 1 or more `General_Category` values.",
      );
    }

    const pattern = [...ugcSet].map((gc) => `\\p{gc=${gc}}`).join();
    const regex = new RegExp(`^[${pattern}]$`, "v");
    super(regex);
  }
}

export function fromCodePointRanges(
  ranges: Iterable<intrange<codepoint>>,
): Condition {
  // rangesはチェックされる
  return new _CodePointCondition(ranges);
}

export function fromCodePlanes(planes: Iterable<codeplane>): Condition {
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
): Condition {
  // scriptsはチェックされる
  return new _UnicodeScriptCondition(scripts, options);
}

export function fromGeneralCategories(gcs: Iterable<gc>): Condition {
  // gcsはチェックされる
  return new _UnicodeGeneralCategoryCondition(gcs);
}

abstract class _ComplexCondition extends _ConditionBase implements Condition {
  protected readonly _conditions: Array<Condition>;

  constructor(conditions: Array<Condition>) {
    super();
    Type.assertArray(conditions, "conditions");
    if (conditions.length < 1) {
      throw new TypeError("`conditions` must have 1 or more conditions.");
    }
    if (conditions.every((con) => con instanceof _ConditionBase) !== true) {
      throw new TypeError(
        "`conditions[*]` must be a `RuneExpression.Condition`.",
      );
    }
    this._conditions = [...conditions];
  }
}

class _AndContion extends _ComplexCondition implements Condition {
  override isMatch(codePointOrRune: codepoint | rune): boolean {
    return this._conditions.every((condition) =>
      condition.isMatch(codePointOrRune)
    );
  }
}

class _OrContion extends _ComplexCondition implements Condition {
  override isMatch(codePointOrRune: codepoint | rune): boolean {
    return this._conditions.some((condition) =>
      condition.isMatch(codePointOrRune)
    );
  }
}

export function and(conditions: Array<Condition>): Condition {
  return new _AndContion(conditions);
}

export function or(conditions: Array<Condition>): Condition {
  return new _OrContion(conditions);
}
