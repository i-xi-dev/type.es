import * as SafeIntRange from "../safeint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import {
  type int,
  type intrange,
  type safeint,
} from "../../../_typedef/mod.ts";
import { _IntRangeSet } from "../_int_range_set.ts";

export class SafeIntRangeSet<T extends safeint = safeint>
  extends _IntRangeSet<T> {
  static fromRanges<T extends safeint = safeint>(
    subranges: Iterable<intrange<T>>,
  ): SafeIntRangeSet<T> {
    // Type.assertIterable(subranges, "subranges");
    return new SafeIntRangeSet(subranges);
  }

  // static fromValues(values: Iterable<T extends safeint = safeint>): SafeIntRangeSet<T> {
  // }

  protected override _getSize(): safeint {
    return [...this._set].reduce(
      (total, subrange) => total += SafeIntRange.sizeOf(subrange),
      0,
    );
  }

  protected override _assertValue(value: int): void {
    Type.assertSafeInt(value, "value");
  }

  protected override _assertSubrange(subrange: intrange): void {
    Type.assertSafeIntRange(subrange, "subrange");
  }

  protected override _mergeSubrangesIfPossible(
    a: intrange<T>,
    b: intrange<T>,
  ): intrange<T> | null {
    return SafeIntRange.mergeIfPossible(a, b) as (intrange<T> | null);
  }
}
