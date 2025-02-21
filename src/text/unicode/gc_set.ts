import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import { type ArrayOrSet } from "../../type.ts";
import { type codepoint, type gc, type rune } from "../../_typedef/mod.ts";

function _toGcSet(gcs: ArrayOrSet<gc>): Set<gc> {
  Type.assertArrayOrSet(
    gcs,
    "gcs",
    {
      isT: Type.isUnicodeGeneralCategory,
      elementDesc: "Unicode \`General_Category\` value",
    },
  );
  return new Set(gcs);
}

export class GeneralCategorySet extends _PropertyValueSetBase<gc> {
  readonly #regex: RegExp;

  constructor(gcs: ArrayOrSet<gc>) {
    super([..._toGcSet(gcs)].sort());

    const pattern = [...this].map((gc) => `\\p{gc=${gc}}`).join();
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

  unionWith(other: this | ArrayOrSet<gc>): this {
    let otherGcs: Set<gc>;
    if (other instanceof GeneralCategorySet) {
      otherGcs = new Set(other.toArray());
    } else {
      otherGcs = _toGcSet(other);
    }

    const unionedGcs = otherGcs.union(this);
    return Reflect.construct(this.constructor, [unionedGcs]);
  }
}
