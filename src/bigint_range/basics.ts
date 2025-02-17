import { assertBigIntRange } from "../type/numeric_range.ts";
import { type BigIntRange } from "../type.ts";

export function sizeOf<T extends bigint>(range: BigIntRange<T>): bigint {
  assertBigIntRange(range, "range");

  const [min, max] = range;
  const d = (max as bigint) - (min as bigint); // typescriptでなぜかnumber扱いになる
  const size = d + 1n;

  return size;
}

export function minOf<T extends bigint>(range: BigIntRange<T>): T {
  assertBigIntRange(range, "range");
  return range[0];
}

export function maxOf<T extends bigint>(range: BigIntRange<T>): T {
  assertBigIntRange(range, "range");
  return range[1];
}

//XXX fromXxx<T extends bigint>(xxx: { min: T, max: T }): BigIntRange<T>
//XXX toXxx<T extends bigint>(range: BigIntRange<T>): { min: T, max: T }

export function toIterable<T extends bigint>(
  range: BigIntRange<T>,
): IterableIterator<T> {
  assertBigIntRange(range, "range");

  const [min, max] = range;
  if (min > max) {
    throw new RangeError("The size of `range` is non-positive.");
  }

  return (function* () {
    for (let i = min; i <= max; i++) {
      yield i;
    }
  })();
}

// toArray<T extends bigint>(): Array<T> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さいっぽい））
// toSet<T extends bigint>(): Set<T> → 同上
