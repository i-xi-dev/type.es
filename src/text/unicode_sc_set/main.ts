import * as Type from "../../type/mod.ts";
import { _PropertyValueSetBase } from "../_propval_set_base.ts";
import { type script } from "../../_typedef/mod.ts";

export class UnicodeScriptSet extends _PropertyValueSetBase<script> {
  constructor(scripts: Iterable<script>) {
    Type.assertIterable(scripts, "scripts");
    const array: Array<script> = [];
    for (const script of scripts) {
      Type.assertUnicodeScript(script, "scripts[*]");
      if (array.includes(script) !== true) {
        array.push(script);
      }
    }
    super(array.sort());
  }

  override get [Symbol.toStringTag](): string {
    return "UnicodeScriptSet";
  }

  override union(other: Iterable<script>): UnicodeScriptSet {
    Type.assertIterable(other, "other");
    return Reflect.construct(this.constructor, [[...this, ...other]]);
  }

  protected override _assertValue(value: script): void {
    Type.assertUnicodeScript(value, "value");
  }
}
