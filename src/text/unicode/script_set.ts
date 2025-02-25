import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import {
  type ArrayOrSet,
  type codepoint,
  type rune,
  type script,
} from "../../_typedef/mod.ts";

function _toScriptSet(scripts: ArrayOrSet<script>): Set<script> {
  Type.assertArrayOrSet(
    scripts,
    "scripts",
    {
      isT: Type.isUnicodeScript,
      elementDesc: "supported script in Unicode property",
    },
  );
  return new Set(scripts);
}

export type ScriptSetMatchingOptions = {
  excludeScx?: boolean;
};

export class UnicodeScriptSet extends _PropertyValueSetBase<script> {
  readonly #excludeScx: boolean;
  readonly #regex: RegExp;

  constructor(scripts: ArrayOrSet<script>, options?: ScriptSetMatchingOptions) {
    super([..._toScriptSet(scripts)].sort());

    this.#excludeScx = options?.excludeScx === true;

    const pattern = [...this].map((script) => {
      return this.#excludeScx
        ? `\\p{sc=${script}}`
        : `\\p{sc=${script}}\\p{scx=${script}}`;
    }).join();
    this.#regex = new RegExp(`^[${pattern}]$`, "v");
  }

  includesRune(rune: rune): boolean {
    Type.assertRune(rune, "rune");
    return (this.size > 0) ? this.#regex.test(rune) : false;
  }

  includesCodePoint(codePoint: codepoint): boolean {
    Type.assertCodePoint(codePoint, "codePoint");

    const rune = Rune.fromCodePoint(codePoint);
    return this.includesRune(rune);
  }

  unionWith(other: this | ArrayOrSet<script>): this {
    let otherScripts: Set<script>;
    if (other instanceof UnicodeScriptSet) {
      otherScripts = new Set(other.toArray());
    } else {
      otherScripts = _toScriptSet(other);
    }

    const unionedScripts = otherScripts.union(this);
    return Reflect.construct(this.constructor, [unionedScripts, {
      excludeScx: this.#excludeScx,
    }]);
  }
}
