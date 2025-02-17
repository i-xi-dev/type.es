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

export function minOf<T extends safeint>(range: SafeIntegerRange<T>): T {
  assertSafeIntegerRange(range, "range");
  return range[0];
}

export function maxOf<T extends safeint>(range: SafeIntegerRange<T>): T {
  assertSafeIntegerRange(range, "range");
  return range[1];
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

// a equals b (b equals a)
export function equals<T extends safeint>(
  a: SafeIntegerRange<T>,
  b: SafeIntegerRange<T>,
): boolean {
  assertSafeIntegerRange(a, "a");
  assertSafeIntegerRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin === bMin) && (aMax === bMax);
}

// a overlaps b (b overlaps a)
export function overlaps<T extends safeint>(
  a: SafeIntegerRange<T>,
  b: SafeIntegerRange<T>,
): boolean {
  assertSafeIntegerRange(a, "a");
  assertSafeIntegerRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMax) && (aMax >= bMin);
}

// a covers b (b isCoveredBy a) (a isSuperrangeOf b)
export function covers<T extends safeint>(
  a: SafeIntegerRange<T>,
  b: SafeIntegerRange<T>,
): boolean {
  assertSafeIntegerRange(a, "a");
  assertSafeIntegerRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMin) && (aMax >= bMax);
}

// a isDisjointFrom b (b isDisjointFrom a)
export function isDisjoint<T extends safeint>(
  a: SafeIntegerRange<T>,
  b: SafeIntegerRange<T>,
): boolean {
  return !overlaps(a, b);
}
