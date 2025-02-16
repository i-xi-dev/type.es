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

export class GeneralCategorySet {
  readonly #gcs: Set<gc>;
  readonly #regex: RegExp;

  constructor(gcs: ArrayOrSet<gc>) {
    this.#gcs = new Set([..._toGcSet(gcs)].sort());

    const pattern = [...this.#gcs].map((gc) => `\\p{gc=${gc}}`).join();
    this.#regex = new RegExp(`^[${pattern}]$`, "v");
  }

  includesRune(rune: rune): boolean {
    assertRune(rune, "rune");
    return (this.#gcs.size > 0) ? this.#regex.test(rune) : false;
  }

  includesCodePoint(codePoint: codepoint): boolean {
    assertCodePoint(codePoint, "codePoint");

    const rune = runeFromCodePoint(codePoint);
    return this.includesRune(rune);
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  unionWith(other: GeneralCategorySet | ArrayOrSet<gc>): GeneralCategorySet {
    let otherGcs: Set<gc>;
    if (other instanceof GeneralCategorySet) {
      otherGcs = new Set(other.toArray());
    } else {
      otherGcs = _toGcSet(other);
    }

    const unionedGcs = otherGcs.union(this.#gcs);
    return new GeneralCategorySet(unionedGcs);
  }

  toArray(): Array<gc> {
    return [...this.#gcs];
  }

  // [Symbol.iterator]()
}
