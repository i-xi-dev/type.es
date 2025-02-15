import { assertRune } from "../type/string.ts";
import { assertUnicodeGeneralCategory } from "../type/unicode.ts";
import { type gc, type rune } from "../type.ts";

export class GeneralCategorySet {
  readonly #gcs: Array<gc>;
  readonly #regex: RegExp;

  constructor(gcs: Array<gc>) {
    if (Array.isArray(gcs) !== true) {
      throw new TypeError("`gcs` must be an Array.");
    }

    this.#gcs = [];
    for (const gc of gcs) {
      assertUnicodeGeneralCategory(gc, "gcs[*]");
      this.#gcs.push(gc);
    }
    this.#gcs.sort();

    const pattern = this.#gcs.map((gc) => `\\p{gc=${gc}}`).join();
    this.#regex = new RegExp(`^[${pattern}]$`, "v");
  }

  includes(value: rune): boolean {
    assertRune(value, "value");
    return (this.#gcs.length > 0) ? this.#regex.test(value) : false;
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  toArray(): Array<gc> {
    return [...this.#gcs];
  }
}
