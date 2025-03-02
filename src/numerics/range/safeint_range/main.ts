import * as Type from "../../../type/mod.ts";
import { type intrange, type safeint } from "../../../_typedef/mod.ts";

type safeintrange = intrange<safeint>;

export function sizeOf(range: safeintrange): safeint {
  Type.assertSafeIntRange(range, "range");

  const [min, max] = range;
  const size = (max - min) + 1;

  if (size > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("The size of `range` overflowed.");
  }

  return size;
}

export function minOf(range: safeintrange): safeint {
  Type.assertSafeIntRange(range, "range");
  return range[0];
}

export function maxOf(range: safeintrange): safeint {
  Type.assertSafeIntRange(range, "range");
  return range[1];
}

//XXX fromXxx(xxx: { min: safeint, max: safeint }): intrange
//XXX toXxx(range: intrange): { min: safeint, max: safeint }

export function toIterable(range: safeintrange): IterableIterator<safeint> {
  Type.assertSafeIntRange(range, "range");

  const [min, max] = range;
  return (function* () {
    for (let i = min; i <= max; i++) {
      yield i;
    }
  })();
}

// toArray(): Array<safeint> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さいっぽい））
// toSet(): Set<safeint> → 同上

// a equals b (b equals a)
export function equals(a: safeintrange, b: safeintrange): boolean {
  Type.assertSafeIntRange(a, "a");
  Type.assertSafeIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin === bMin) && (aMax === bMax);
}

// a overlaps b (b overlaps a)
export function overlaps(a: safeintrange, b: safeintrange): boolean {
  Type.assertSafeIntRange(a, "a");
  Type.assertSafeIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMax) && (aMax >= bMin);
}

// a covers b (b isCoveredBy a) (a isSuperrangeOf b) (b isSubrangeOf a)
export function covers(a: safeintrange, b: safeintrange): boolean {
  Type.assertSafeIntRange(a, "a");
  Type.assertSafeIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMin) && (aMax >= bMax);
}

// a isDisjointFrom b (b isDisjointFrom a)
export function isDisjoint(a: safeintrange, b: safeintrange): boolean {
  return !overlaps(a, b);
}

// a isAdjacentTo b (b isAdjacent a)
// disjointかつ隣接（図形のtouchesとは意味が異なる）
export function isAdjacent(a: safeintrange, b: safeintrange): boolean {
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

export function includes(range: safeintrange, test: safeint): boolean {
  Type.assertSafeIntRange(range, "range");
  const [min, max] = range;
  return Type.isSafeInt(test) && (test >= min) && (test <= max);
}

// 範囲重複または隣接している場合は新たな範囲を返却、上記以外の場合nullを返却
export function mergeIfPossible(
  a: safeintrange,
  b: safeintrange,
): safeintrange | null {
  // Type.assertSafeIntRange(a, "a");
  // Type.assertSafeIntRange(b, "b");

  if (overlaps(a, b) || isAdjacent(a, b)) {
    const [aMin, aMax] = a;
    const [bMin, bMax] = b;
    return [
      Math.min(aMin, bMin),
      Math.max(aMax, bMax),
    ];
  }
  return null;
}
