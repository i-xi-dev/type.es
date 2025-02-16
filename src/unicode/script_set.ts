import {
  type ArrayOrSet,
  type codepoint,
  type rune,
  type script,
} from "../type.ts";
import { assertArrayOrSet } from "../type/collection.ts";
import { assertCodePoint } from "../type/code_point.ts";
import { assertRune } from "../type/string.ts";
import { fromCodePoint as runeFromCodePoint } from "../rune/basics.ts";
import { isUnicodeScript } from "../type/unicode.ts";

function _toScriptSet(scripts: ArrayOrSet<script>): Set<script> {
  assertArrayOrSet(
    scripts,
    "scripts",
    {
      isT: isUnicodeScript,
      elementDesc: "supported script in Unicode property",
    },
  );
  return new Set(scripts);
}

export type ScriptSetMatchingOptions = {
  excludeScx?: boolean;
};

export class ScriptSet {
  readonly #scripts: Set<script>;
  readonly #regex: RegExp;

  constructor(scripts: ArrayOrSet<script>, options?: ScriptSetMatchingOptions) {
    this.#scripts = new Set([..._toScriptSet(scripts)].sort());

    const pattern = [...this.#scripts].map((script) => {
      return (options?.excludeScx === true)
        ? `\\p{sc=${script}}`
        : `\\p{sc=${script}}\\p{scx=${script}}`;
    }).join();
    this.#regex = new RegExp(`^[${pattern}]$`, "v");
  }

  includesRune(rune: rune): boolean {
    assertRune(rune, "rune");
    return (this.#scripts.size > 0) ? this.#regex.test(rune) : false;
  }

  includesCodePoint(codePoint: codepoint): boolean {
    assertCodePoint(codePoint, "codePoint");

    const rune = runeFromCodePoint(codePoint);
    return this.includesRune(rune);
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  unionWith(other: ScriptSet | ArrayOrSet<script>): ScriptSet {
    let otherScripts: Set<script>;
    if (other instanceof ScriptSet) {
      otherScripts = new Set(other.toArray());
    } else {
      otherScripts = _toScriptSet(other);
    }

    const unionedScripts = otherScripts.union(this.#scripts);
    return new ScriptSet(unionedScripts);
  }

  toArray(): Array<script> {
    return [...this.#scripts];
  }

  // [Symbol.iterator]()
}
