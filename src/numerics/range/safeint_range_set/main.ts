import * as SafeIntRange from "../safeint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { type safeint, type safeintrange } from "../../../_typedef/mod.ts";
import { _IntRangeSet } from "../_int_range_set.ts";

export class SafeIntRangeSet extends _IntRangeSet<safeint, safeintrange> {
  static fromRanges(subranges: Iterable<safeintrange>) {
    Type.assertIterable(subranges, "subranges");
    return new SafeIntRangeSet(subranges);
  }

  protected override _getSize(): safeint {
    let size = 0;
    for (const subrange of this._set) {
      size += (subrange[1] as safeint) - (subrange[0] as safeint) + 1;
    }

    if (Type.isSafeInt(size) !== true) {
      throw new RangeError("TODO");
    }

    return Number(size);
  }

  protected override _assertValue(value: safeint): void {
    Type.assertSafeInt(value, "value");
  }

  protected override _assertSubrange(subrange: safeintrange): void {
    Type.assertSafeIntRange(subrange, "subrange");
  }

  protected override _mergeSubrangesIfPossible(
    a: safeintrange,
    b: safeintrange,
  ): safeintrange | null {
    return SafeIntRange.mergeIfPossible(a, b);
  }
}
