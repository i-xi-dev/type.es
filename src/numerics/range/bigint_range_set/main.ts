import * as BigIntRange from "../bigint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import {
  type int,
  type intrange,
  type safeint,
} from "../../../_typedef/mod.ts";
import { _IntRangeSet } from "../_int_range_set.ts";

export class BigIntRangeSet<T extends bigint = bigint> extends _IntRangeSet<T> {
  static fromRanges<T extends bigint = bigint>(
    subranges: Iterable<intrange<T>>,
  ): BigIntRangeSet<T> {
    Type.assertIterable(subranges, "subranges");
    return new BigIntRangeSet(subranges);
  }

  // static fromValues<T extends bigint = bigint>(values: Iterable<bigint>): BigIntRangeSet {
  // }

  protected override _getSize(): safeint {
    const size = [...this._set].reduce(
      (total, subrange) => total += BigIntRange.sizeOf(subrange),
      0n,
    );

    if (Type.isBigIntInSafeIntRange(size) !== true) {
      throw new RangeError("TODO");
    }

    return Number(size);
  }

  protected override _assertValue(value: int): void {
    Type.assertBigInt(value, "value");
  }

  protected override _assertSubrange(subrange: intrange): void {
    Type.assertBigIntRange(subrange, "subrange");
  }

  protected override _mergeSubrangesIfPossible(
    a: intrange<T>,
    b: intrange<T>,
  ): intrange<T> | null {
    return BigIntRange.mergeIfPossible(a, b) as (intrange<T> | null);
  }
}
