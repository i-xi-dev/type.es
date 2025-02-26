import * as ExBigInt from "../../bigint/mod.ts";
import * as Type from "../../../type/mod.ts";
import { type bigintrange } from "../../../_typedef/mod.ts";

export function sizeOf(range: bigintrange): bigint {
  Type.assertBigIntRange(range, "range");

  const [min, max] = range;
  const d = (max as bigint) - (min as bigint); // typescriptでなぜかnumber扱いになる
  const size = d + 1n;

  return size;
}

export function minOf(range: bigintrange): bigint {
  Type.assertBigIntRange(range, "range");
  return range[0];
}

export function maxOf(range: bigintrange): bigint {
  Type.assertBigIntRange(range, "range");
  return range[1];
}

//XXX fromXxx(xxx: { min: bigint, max: bigint }): bigintrange
//XXX toXxx(range: bigintrange): { min: bigint, max: bigint }

export function toIterable(range: bigintrange): IterableIterator<bigint> {
  Type.assertBigIntRange(range, "range");

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

// toArray(): Array<bigint> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さいっぽい））
// toSet(): Set<bigint> → 同上

// a equals b (b equals a)
export function equals(a: bigintrange, b: bigintrange): boolean {
  Type.assertBigIntRange(a, "a");
  Type.assertBigIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin === bMin) && (aMax === bMax);
}

// a overlaps b (b overlaps a)
export function overlaps(a: bigintrange, b: bigintrange): boolean {
  Type.assertBigIntRange(a, "a");
  Type.assertBigIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMax) && (aMax >= bMin);
}

// a covers b (b isCoveredBy a) (a isSuperrangeOf b) (b isSubrangeOf a)
export function covers(a: bigintrange, b: bigintrange): boolean {
  Type.assertBigIntRange(a, "a");
  Type.assertBigIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMin) && (aMax >= bMax);
}

// a isDisjointFrom b (b isDisjointFrom a)
export function isDisjoint(a: bigintrange, b: bigintrange): boolean {
  return !overlaps(a, b);
}

// a isAdjacentTo b (b isAdjacent a)
// disjointかつ隣接（図形のtouchesとは意味が異なる）
export function isAdjacent(a: bigintrange, b: bigintrange): boolean {
  // Type.assertBigIntRange(a, "a");
  // Type.assertBigIntRange(b, "b");
  if (overlaps(a, b)) {
    return false;
  }

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  if ((bMin - aMax) === 1n) {
    return true;
  } else if ((aMin - bMax) === 1n) {
    return true;
  }
  return false;
}

export function includes(range: bigintrange, test: bigint): boolean {
  Type.assertBigIntRange(range, "range");
  const [min, max] = range;
  return Type.isBigInt(test) && (test >= min) && (test <= max);
}

//TODO unionではないのでは mergeIfOverlapedとか
export function union(a: bigintrange, b: bigintrange): bigintrange | null {
  // Type.assertBigIntRange(a, "a");
  // Type.assertBigIntRange(b, "b");

  if (overlaps(a, b) || isAdjacent(a, b)) {
    const [aMin, aMax] = a;
    const [bMin, bMax] = b;
    return [
      ExBigInt.min(aMin, bMin),
      ExBigInt.max(aMax, bMax),
    ];
  }
  return null;
}
