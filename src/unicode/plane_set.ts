import {
  type ArrayOrSet,
  type codepoint,
  type plane,
  type rune,
} from "../type.ts";
import { assertArrayOrSet } from "../type/collection.ts";
import { assertCodePoint } from "../type/code_point.ts";
import { assertRune } from "../type/string.ts";
import { isPlane } from "../type/plane.ts";
import { planeOf as planeOfCodePoint } from "../code_point/basics.ts";
import { toCodePoint as runeToCodePoint } from "../rune/basics.ts";

function _toPlaneSet(planes: ArrayOrSet<plane>): Set<plane> {
  assertArrayOrSet(
    planes,
    "planes",
    { isT: isPlane, elementDesc: "code point plane value" },
  );
  return new Set(planes);
}

export class PlaneSet {
  readonly #planes: Set<plane>;

  constructor(planes: ArrayOrSet<plane>) {
    this.#planes = new Set([..._toPlaneSet(planes)].sort());
  }

  includesRune(rune: rune): boolean {
    assertRune(rune, "rune");

    const codePoint = runeToCodePoint(rune);
    return this.includesCodePoint(codePoint);
  }

  includesCodePoint(codePoint: codepoint): boolean {
    assertCodePoint(codePoint, "codePoint");

    const testPlane = planeOfCodePoint(codePoint);
    return (this.#planes.size > 0) ? this.#planes.has(testPlane) : false;
  }

  //TODO
  // findRunes(value: usvstring): Array<{  rune: rune, runeIndexes: safeint[], }> {
  // }

  unionWith(other: PlaneSet | ArrayOrSet<plane>): PlaneSet {
    let otherPlanes: Set<plane>;
    if (other instanceof PlaneSet) {
      otherPlanes = new Set(other.toArray());
    } else {
      otherPlanes = _toPlaneSet(other);
    }

    const unionedPlanes = otherPlanes.union(this.#planes);
    return new PlaneSet(unionedPlanes);
  }

  toArray(): Array<plane> {
    return [...this.#planes];
  }

  // [Symbol.iterator]()
}
