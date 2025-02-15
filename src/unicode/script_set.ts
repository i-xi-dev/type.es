import { assertRune } from "../type/string.ts";
import { assertUnicodeScript } from "../type/unicode.ts";
import { type rune, type script } from "../type.ts";

export type ScriptSetMatchingOptions = {
  excludeScx?: boolean;
};

export class ScriptSet {
  readonly #scripts: Array<script>;
  readonly #regex: RegExp;

  constructor(scripts: Array<script>, options?: ScriptSetMatchingOptions) {
    if (Array.isArray(scripts) !== true) {
      throw new TypeError("`scripts` must be an Array.");
    }

    this.#scripts = [];
    for (const script of scripts) {
      assertUnicodeScript(script, "scripts[*]");
      this.#scripts.push(script);
    }
    this.#scripts.sort();

    const pattern = this.#scripts.map((script) => {
      return (options?.excludeScx === true)
        ? `\\p{sc=${script}}`
        : `\\p{sc=${script}}\\p{scx=${script}}`;
    }).join();
    this.#regex = new RegExp(`^[${pattern}]$`, "v");
  }

  includes(rune: rune): boolean {
    assertRune(rune, "rune");
    return (this.#scripts.length > 0) ? this.#regex.test(rune) : false;
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  toArray(): Array<script> {
    return [...this.#scripts];
  }
}
