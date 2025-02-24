import * as Type from "../../../type/mod.ts";
import { type safeint, type safeintrange } from "../../../_typedef/mod.ts";

export function sizeOf<T extends safeint>(range: safeintrange<T>): safeint {
  Type.assertSafeIntRange(range, "range");

  const [min, max] = range;
  const size = (max - min) + 1;

  if (size > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("The size of `range` overflowed.");
  }

  return size;
}

export function minOf<T extends safeint>(range: safeintrange<T>): T {
  Type.assertSafeIntRange(range, "range");
  return range[0];
}

export function maxOf<T extends safeint>(range: safeintrange<T>): T {
  Type.assertSafeIntRange(range, "range");
  return range[1];
}

//XXX fromXxx<T extends safeint>(xxx: { min: T, max: T }): safeintrange<T>
//XXX toXxx<T extends safeint>(range: safeintrange<T>): { min: T, max: T }

export function toIterable<T extends safeint>(
  range: safeintrange<T>,
): IterableIterator<T> {
  Type.assertSafeIntRange(range, "range");

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
  a: safeintrange<T>,
  b: safeintrange<T>,
): boolean {
  Type.assertSafeIntRange(a, "a");
  Type.assertSafeIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin === bMin) && (aMax === bMax);
}

// a overlaps b (b overlaps a)
export function overlaps<T extends safeint>(
  a: safeintrange<T>,
  b: safeintrange<T>,
): boolean {
  Type.assertSafeIntRange(a, "a");
  Type.assertSafeIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMax) && (aMax >= bMin);
}

// a covers b (b isCoveredBy a) (a isSuperrangeOf b) (b isSubrangeOf a)
export function covers<T extends safeint>(
  a: safeintrange<T>,
  b: safeintrange<T>,
): boolean {
  Type.assertSafeIntRange(a, "a");
  Type.assertSafeIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMin) && (aMax >= bMax);
}

// a isDisjointFrom b (b isDisjointFrom a)
export function isDisjoint<T extends safeint>(
  a: safeintrange<T>,
  b: safeintrange<T>,
): boolean {
  return !overlaps(a, b);
}

// a isAdjacentTo b (b isAdjacent a)
// disjointかつ隣接（図形のtouchesとは意味が異なる）
export function isAdjacent<T extends safeint>(
  a: safeintrange<T>,
  b: safeintrange<T>,
): boolean {
  // Type.assertSafeIntRange(a, "a");
  // Type.assertSafeIntRange(b, "b");
  if (overlaps(a, b)) {
    return false;
  }

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  if ((bMin - aMax) === 1) {
    return true;
  } else if ((aMin - bMax) === 1) {
    return true;
  }
  return false;
}

export function includes<T extends safeint>(
  range: safeintrange<T>,
  test: T,
): boolean {
  Type.assertSafeIntRange(range, "range");
  const [min, max] = range;
  return Type.isSafeInt(test) && (test >= min) && (test <= max);
}

export function union<T extends safeint>(
  a: safeintrange<T>,
  b: safeintrange<T>,
): safeintrange<T> | null {
  // Type.assertSafeIntRange(a, "a");
  // Type.assertSafeIntRange(b, "b");

  if (overlaps(a, b) || isAdjacent(a, b)) {
    const [aMin, aMax] = a;
    const [bMin, bMax] = b;
    return [
      Math.min(aMin, bMin) as T,
      Math.max(aMax, bMax) as T,
    ];
  }
  return null;
}
