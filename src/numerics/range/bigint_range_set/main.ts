import * as BigIntRange from "../bigint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { type bigintrange, type safeint } from "../../../_typedef/mod.ts";
import { _IntRangeSet } from "../_int_range_set.ts";

export class BigIntRangeSet extends _IntRangeSet<bigint, bigintrange> {
  static fromRanges(subranges: Iterable<bigintrange>) {
    Type.assertIterable(subranges, "subranges");
    return new BigIntRangeSet(subranges);
  }

  protected override _getSize(): safeint {
    let size = 0n;
    for (const subrange of this._set) {
      size += (subrange[1] as bigint) - (subrange[0] as bigint) + 1n;
    }

    if (Type.isBigIntInSafeIntRange(size) !== true) {
      throw new RangeError("TODO");
    }

    return Number(size);
  }

  protected override _assertValue(value: bigint): void {
    Type.assertBigInt(value, "value");
  }

  protected override _assertSubrange(subrange: bigintrange): void {
    Type.assertBigIntRange(subrange, "subrange");
  }

  protected override _mergeSubrangesIfPossible(
    a: bigintrange,
    b: bigintrange,
  ): bigintrange | null {
    return BigIntRange.mergeIfPossible(a, b);
  }
}
