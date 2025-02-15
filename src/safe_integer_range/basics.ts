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

// toArray<T extends safeint>(): Array<T> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さい））
