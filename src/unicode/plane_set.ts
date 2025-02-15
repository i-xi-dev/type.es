import { assertPlane } from "../type/plane.ts";
import { type codepoint, type plane, type rune } from "../type.ts";
import { isCodePoint } from "../type/code_point.ts";
import { isRune } from "../type/string.ts";
import { planeOf as planeOfCodePoint } from "../code_point/basics.ts";
import { toCodePoint as runeToCodePoint } from "../rune/basics.ts";

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

  includes(codePointOrRune: codepoint | rune): boolean {
    let codePoint: codepoint;
    if (isRune(codePointOrRune)) {
      codePoint = runeToCodePoint(codePointOrRune);
    } else if (isCodePoint(codePointOrRune)) {
      codePoint = codePointOrRune;
    } else {
      throw new TypeError(
        "`codePointOrRune` must be a code point or a string representing a single code point.",
      );
    }

    const testPlane = planeOfCodePoint(codePoint);

    return (this.#planes.length > 0) ? this.#planes.includes(testPlane) : false;
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  toArray(): Array<plane> {
    return [...this.#planes];
  }
}
