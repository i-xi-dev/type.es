import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import { type codepoint, type gc, type rune } from "../../_typedef/mod.ts";

export class UnicodeGeneralCategorySet extends _PropertyValueSetBase<gc> {
  readonly #regex: RegExp;

  constructor(gcs: Iterable<gc>) {
    Type.assertIterable(gcs, "gcs");
    const array: Array<gc> = [];
    for (const gc of gcs) {
      Type.assertUnicodeGeneralCategory(gc, "gcs[*]");
      if (array.includes(gc) !== true) {
        array.push(gc);
      }
    }
    super(array.sort());

    const pattern = [...this].map((gc) => `\\p{gc=${gc}}`).join();
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

  override unionWith(other: Iterable<gc>): this {
    Type.assertIterable(other, "other");
    return Reflect.construct(this.constructor, [[...this, ...other]]);
  }
}
