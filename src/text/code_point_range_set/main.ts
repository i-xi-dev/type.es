import * as Type from "../../type/mod.ts";
import { SafeIntRangeSet } from "../../numerics/mod.ts";
import { type codepoint, type int, type intrange } from "../../_typedef/mod.ts";

export class CodePointRangeSet<T extends codepoint = codepoint>
  extends SafeIntRangeSet<T> {
  override get [Symbol.toStringTag](): string {
    return "CodePointRangeSet";
  }

  static override fromRanges<T extends codepoint = codepoint>(
    subranges: Iterable<intrange<T>>,
  ): CodePointRangeSet<T> {
    // Type.assertIterable(subranges, "subranges");
    return new CodePointRangeSet(subranges);
  }

  // static fromValues(values: Iterable<codepoint>): CodePointRangeSet {
  // }

  protected override _assertValue(value: int): void {
    Type.assertCodePoint(value, "value");
  }

  protected override _assertSubrange(subrange: intrange): void {
    Type.assertCodePointRange(subrange, "subrange");
  }
}
