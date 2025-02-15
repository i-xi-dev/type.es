import { assertSafeIntegerRange } from "../type/numeric_range.ts";
import { type safeint, type SafeIntegerRange } from "../type.ts";

export function sizeOf<T extends safeint>(range: SafeIntegerRange<T>): safeint {
  assertSafeIntegerRange(range, "range");

  const [min, max] = range;
  const size = (max - min) + 1;

  if (size > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("The size of `range` overflowed.");
  }

  return size;
}

//XXX fromXxx<T extends safeint>(xxx: { min: T, max: T }): SafeIntegerRange<T>
//XXX toXxx<T extends safeint>(range: SafeIntegerRange<T>): { min: T, max: T }

export function toIterable<T extends safeint>(
  range: SafeIntegerRange<T>,
): IterableIterator<T> {
  assertSafeIntegerRange(range, "range");

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

// toArray<T extends safeint>(): Array<T> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さいっぽい））
// toSet<T extends safeint>(): Set<T> → 同上
