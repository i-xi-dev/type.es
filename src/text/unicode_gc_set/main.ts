import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "../_propval_set_base.ts";
import { type gc } from "../../_typedef/mod.ts";

export class UnicodeGeneralCategorySet extends _PropertyValueSetBase<gc> {
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
  }

  override get [Symbol.toStringTag](): string {
    return "UnicodeGeneralCategorySet";
  }

  override union(other: Iterable<gc>): UnicodeGeneralCategorySet {
    Type.assertIterable(other, "other");
    return Reflect.construct(this.constructor, [[...this, ...other]]);
  }

  protected override _assertValue(value: gc): void {
    Type.assertUnicodeGeneralCategory(value, "value");
  }
}
