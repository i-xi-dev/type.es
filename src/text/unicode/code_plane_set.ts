import * as CodePoint from "../code_point/mod.ts";
import * as Rune from "../rune/mod.ts";
import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "./_propval_set_base.ts";
import {
  type codeplane,
  type codepoint,
  type rune,
} from "../../_typedef/mod.ts";

export class CodePlaneSet extends _PropertyValueSetBase<codeplane> {
  constructor(planes: Iterable<codeplane>) {
    Type.assertIterable(planes, "planes");
    const array: Array<codeplane> = [];
    for (const plane of planes) {
      Type.assertCodePlane(plane, "planes[*]");
      if (array.includes(plane) !== true) {
        array.push(plane);
      }
    }
    super(array.sort());
  }

  override includesRune(rune: rune): boolean {
    Type.assertRune(rune, "rune");

    const codePoint = Rune.toCodePoint(rune);
    return this.includesCodePoint(codePoint);
  }

  override includesCodePoint(codePoint: codepoint): boolean {
    Type.assertCodePoint(codePoint, "codePoint");

    const testPlane = CodePoint.planeOf(codePoint);
    return (this._set.size > 0) ? this._set.has(testPlane) : false;
  }

  override unionWith(other: Iterable<codeplane>): this {
    Type.assertIterable(other, "other");
    return Reflect.construct(this.constructor, [[...this, ...other]]);
  }
}
