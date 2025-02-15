import { assertPlane } from "../type/plane.ts";
import { planeOf as planeOfCodePoint } from "../code_point/basics.ts";
import { toCodePoint as runeToCodePoint } from "../rune/basics.ts";
import { type plane, type rune } from "../type.ts";

export class PlaneSet {
  readonly #planes: Array<plane>;

  constructor(planes: Array<plane>) {
    if (Array.isArray(planes) !== true) {
      throw new TypeError("`planes` must be an Array.");
    }

    this.#planes = [];
    for (const plane of planes) {
      assertPlane(plane, "planes[*]");
      this.#planes.push(plane);
    }
    this.#planes.sort();
  }

  includes(rune: rune): boolean {
    // assertRune(rune, "rune");
    const testPlane = planeOfCodePoint(runeToCodePoint(rune));

    return (this.#planes.length > 0) ? this.#planes.includes(testPlane) : false;
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  toArray(): Array<plane> {
    return [...this.#planes];
  }
}
