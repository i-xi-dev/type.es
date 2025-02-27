import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import { type codepoint, type rune, type script } from "../../_typedef/mod.ts";

export type ScriptSetMatchingOptions = {
  excludeScx?: boolean;
};

export class UnicodeScriptSet extends _PropertyValueSetBase<script> {
  readonly #excludeScx: boolean;
  readonly #regex: RegExp;

  constructor(scripts: Iterable<script>, options?: ScriptSetMatchingOptions) {
    Type.assertIterable(scripts, "scripts");
    const array: Array<script> = [];
    for (const script of scripts) {
      Type.assertUnicodeScript(script, "scripts[*]");
      if (array.includes(script) !== true) {
        array.push(script);
      }
    }
    super(array.sort());

    this.#excludeScx = options?.excludeScx === true;

    const pattern = [...this].map((script) => {
      return this.#excludeScx
        ? `\\p{sc=${script}}`
        : `\\p{sc=${script}}\\p{scx=${script}}`;
    }).join();
    this.#regex = new RegExp(`^[${pattern}]$`, "v");
  }

  override includesRune(rune: rune): boolean {
    Type.assertRune(rune, "rune");
    return (this._set.size > 0) ? this.#regex.test(rune) : false;
  }

  override includesCodePoint(codePoint: codepoint): boolean {
    Type.assertCodePoint(codePoint, "codePoint");

    const rune = Rune.fromCodePoint(codePoint);
    return this.includesRune(rune);
  }

  override unionWith(other: Iterable<script>): this {
    Type.assertIterable(other, "other");
    return Reflect.construct(this.constructor, [[...this, ...other], {
      excludeScx: this.#excludeScx,
    }]);
  }
}
