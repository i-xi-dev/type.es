import * as CodePoint from "../code_point/mod.ts";
import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import {
  type ArrayOrSet,
  type codeplane,
  type codepoint,
  type rune,
} from "../../_typedef/mod.ts";

function _toCodePlaneSet(planes: ArrayOrSet<codeplane>): Set<codeplane> {
  Type.assertArrayOrSet(
    planes,
    "planes",
    { isT: Type.isCodePlane, elementDesc: "code point plane value" },
  );
  return new Set(planes);
}

export class CodePlaneSet extends _PropertyValueSetBase<codeplane> {
  constructor(planes: ArrayOrSet<codeplane>) {
    super([..._toCodePlaneSet(planes)].sort());
  }

  includesRune(rune: rune): boolean {
    Type.assertRune(rune, "rune");

    const codePoint = Rune.toCodePoint(rune);
    return this.includesCodePoint(codePoint);
  }

  includesCodePoint(codePoint: codepoint): boolean {
    Type.assertCodePoint(codePoint, "codePoint");

    const testPlane = CodePoint.planeOf(codePoint);
    return (this.size > 0) ? this.has(testPlane) : false;
  }

  unionWith(other: this | ArrayOrSet<codeplane>): this {
    let otherPlanes: Set<codeplane>;
    if (other instanceof CodePlaneSet) {
      otherPlanes = new Set(other.toArray());
    } else {
      otherPlanes = _toCodePlaneSet(other);
    }

    const unionedPlanes = otherPlanes.union(this);
    return Reflect.construct(this.constructor, [unionedPlanes]);
  }
}
