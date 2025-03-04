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

export interface RuneExpression {
  isMatch(codePointOrRune: codepoint | rune): boolean;

  findMatchedRunes(
    text: usvstring,
    options?: RuneExpression.FindMatchedRunesOptions,
  ): RuneExpression.FindMatchedRunesResults;

  //XXX findGraphemes
}

abstract class _ExpressionBase implements RuneExpression {
  abstract isMatch(codePointOrRune: codepoint | rune): boolean;

  findMatchedRunes(
    text: usvstring,
    options?: RuneExpression.FindMatchedRunesOptions,
  ): RuneExpression.FindMatchedRunesResults {
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

class _CodePointExpression extends _ExpressionBase implements RuneExpression {
  readonly #codePointRangeSet: CodePointRangeSet;
  readonly #negative: boolean;

  constructor(
    ranges: Iterable<intrange<codepoint>>,
    options?: RuneExpression.Options,
  ) {
    super();
    this.#codePointRangeSet = CodePointRangeSet.fromRanges(ranges);
    if (this.#codePointRangeSet.size < 1) {
      throw new TypeError("`ranges` must have 1 or more ranges.");
    }
    this.#negative = options?.not === true;
  }

  override isMatch(codePointOrRune: codepoint | rune): boolean {
    const { codePoint } = _parse(codePointOrRune);
    const positiveMatched = this.#codePointRangeSet.has(codePoint);
    return (this.#negative === true) ? !positiveMatched : positiveMatched;
  }
}

abstract class _RegexExpressionBase extends _ExpressionBase
  implements RuneExpression {
  readonly #regex: RegExp;
  readonly #negative: boolean;

  protected constructor(regex: RegExp, options?: RuneExpression.Options) {
    super();
    this.#regex = regex;
    this.#negative = options?.not === true;
  }

  override isMatch(codePointOrRune: codepoint | rune): boolean {
    const { rune } = _parse(codePointOrRune);
    const positiveMatched = this.#regex.test(rune);
    return (this.#negative === true) ? !positiveMatched : positiveMatched;
  }
}

class _ScriptExpression extends _RegexExpressionBase implements RuneExpression {
  constructor(
    scripts: Iterable<script>,
    options?: RuneExpression.UnicodeScriptOptions,
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
    super(regex, options);
  }
}

class _GeneralCategoryExpression extends _RegexExpressionBase
  implements RuneExpression {
  constructor(gcs: Iterable<gc>, options?: RuneExpression.Options) {
    const ugcSet = new UnicodeGeneralCategorySet(gcs);
    if (ugcSet.size < 1) {
      throw new TypeError(
        "`gcs` must have 1 or more `General_Category` values.",
      );
    }

    const pattern = [...ugcSet].map((gc) => `\\p{gc=${gc}}`).join();
    const regex = new RegExp(`^[${pattern}]$`, "v");
    super(regex, options);
  }
}

abstract class _ComplexExpression extends _ExpressionBase
  implements RuneExpression {
  protected readonly _exps: Array<RuneExpression>;

  constructor(expressions: Array<RuneExpression>) {
    super();
    Type.assertArray(expressions, "expressions");
    if (expressions.length < 1) {
      throw new TypeError("`expressions` must have 1 or more expressions.");
    }
    if (expressions.every((con) => con instanceof _ExpressionBase) !== true) {
      throw new TypeError(
        "`expressions[*]` must be a `RuneExpression`.",
      );
    }
    this._exps = [...expressions];
  }
}

class _AndExpression extends _ComplexExpression implements RuneExpression {
  override isMatch(codePointOrRune: codepoint | rune): boolean {
    return this._exps.every((expression) =>
      expression.isMatch(codePointOrRune)
    );
  }
}

class _OrExpression extends _ComplexExpression implements RuneExpression {
  override isMatch(codePointOrRune: codepoint | rune): boolean {
    return this._exps.some((expression) => expression.isMatch(codePointOrRune));
  }
}

export namespace RuneExpression {
  export type FindMatchedRunesOptions = {};

  // indexesはcharのindexではなく、runeのindex
  export type FindMatchedRunesResult = {
    rune: rune;
    runeIndex: safeint;
  };

  export type FindMatchedRunesResults = Iterable<FindMatchedRunesResult>;

  export type Options = {
    not?: boolean;
  };

  export type UnicodeScriptOptions = Options & {
    excludeScx?: boolean;
  };

  export function fromCodePointRanges(
    ranges: Iterable<intrange<codepoint>>,
    options?: Options,
  ): RuneExpression {
    // rangesはチェックされる
    return new _CodePointExpression(ranges, options);
  }

  export function fromCodePlanes(
    planes: Iterable<codeplane>,
    options?: Options,
  ): RuneExpression {
    Type.assertIterable(planes, "planes");
    const ranges = [];
    for (const plane of planes) {
      ranges.push(CodePointRange.ofCodePlane(plane));
    }
    return new _CodePointExpression(ranges, options);
  }

  export function fromScripts(
    scripts: Iterable<script>,
    options?: UnicodeScriptOptions,
  ): RuneExpression {
    // scriptsはチェックされる
    return new _ScriptExpression(scripts, options);
  }

  export function fromGeneralCategories(
    gcs: Iterable<gc>,
    options?: Options,
  ): RuneExpression {
    // gcsはチェックされる
    return new _GeneralCategoryExpression(gcs, options);
  }

  export function and(expressions: Array<RuneExpression>): RuneExpression {
    return new _AndExpression(expressions);
  }

  export function or(expressions: Array<RuneExpression>): RuneExpression {
    return new _OrExpression(expressions);
  }
}
