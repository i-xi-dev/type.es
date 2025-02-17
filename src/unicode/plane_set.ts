import { _PropertyValueSetBase } from "./_propval_set_base.ts";
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

export class PlaneSet extends _PropertyValueSetBase<plane> {
  constructor(planes: ArrayOrSet<plane>) {
    super([..._toPlaneSet(planes)].sort());
  }

  includesRune(rune: rune): boolean {
    assertRune(rune, "rune");

    const codePoint = runeToCodePoint(rune);
    return this.includesCodePoint(codePoint);
  }

  includesCodePoint(codePoint: codepoint): boolean {
    assertCodePoint(codePoint, "codePoint");

    const testPlane = planeOfCodePoint(codePoint);
    return (this.size > 0) ? this.has(testPlane) : false;
  }

  unionWith(other: this | ArrayOrSet<plane>): this {
    let otherPlanes: Set<plane>;
    if (other instanceof PlaneSet) {
      otherPlanes = new Set(other.toArray());
    } else {
      otherPlanes = _toPlaneSet(other);
    }

    const unionedPlanes = otherPlanes.union(this);
    return Reflect.construct(this.constructor, [unionedPlanes]);
  }
}
