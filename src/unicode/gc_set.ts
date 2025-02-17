import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import {
  type ArrayOrSet,
  type codepoint,
  type gc,
  type rune,
} from "../type.ts";
import { assertArrayOrSet } from "../type/collection.ts";
import { assertCodePoint } from "../type/code_point.ts";
import { assertRune } from "../type/string.ts";
import { fromCodePoint as runeFromCodePoint } from "../rune/basics.ts";
import { isUnicodeGeneralCategory } from "../type/unicode.ts";

function _toGcSet(gcs: ArrayOrSet<gc>): Set<gc> {
  assertArrayOrSet(
    gcs,
    "gcs",
    {
      isT: isUnicodeGeneralCategory,
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
    assertRune(rune, "rune");
    return (this.size > 0) ? this.#regex.test(rune) : false;
  }

  includesCodePoint(codePoint: codepoint): boolean {
    assertCodePoint(codePoint, "codePoint");

    const rune = runeFromCodePoint(codePoint);
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
