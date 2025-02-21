import * as Type from "../../../type/mod.ts";
import { type bigintrange } from "../../../_typedef/mod.ts";

export function sizeOf<T extends bigint>(range: bigintrange<T>): bigint {
  Type.assertBigIntRange(range, "range");

  const [min, max] = range;
  const d = (max as bigint) - (min as bigint); // typescriptでなぜかnumber扱いになる
  const size = d + 1n;

  return size;
}

export function minOf<T extends bigint>(range: bigintrange<T>): T {
  Type.assertBigIntRange(range, "range");
  return range[0];
}

export function maxOf<T extends bigint>(range: bigintrange<T>): T {
  Type.assertBigIntRange(range, "range");
  return range[1];
}

//XXX fromXxx<T extends bigint>(xxx: { min: T, max: T }): bigintrange<T>
//XXX toXxx<T extends bigint>(range: bigintrange<T>): { min: T, max: T }

export function toIterable<T extends bigint>(
  range: bigintrange<T>,
): IterableIterator<T> {
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

// toArray<T extends bigint>(): Array<T> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さいっぽい））
// toSet<T extends bigint>(): Set<T> → 同上

// a equals b (b equals a)
export function equals<T extends bigint>(
  a: bigintrange<T>,
  b: bigintrange<T>,
): boolean {
  Type.assertBigIntRange(a, "a");
  Type.assertBigIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin === bMin) && (aMax === bMax);
}

// a overlaps b (b overlaps a)
export function overlaps<T extends bigint>(
  a: bigintrange<T>,
  b: bigintrange<T>,
): boolean {
  Type.assertBigIntRange(a, "a");
  Type.assertBigIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMax) && (aMax >= bMin);
}

// a covers b (b isCoveredBy a) (a isSuperrangeOf b) (b isSubrangeOf a)
export function covers<T extends bigint>(
  a: bigintrange<T>,
  b: bigintrange<T>,
): boolean {
  Type.assertBigIntRange(a, "a");
  Type.assertBigIntRange(b, "b");

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  return (aMin <= bMin) && (aMax >= bMax);
}

// a isDisjointFrom b (b isDisjointFrom a)
export function isDisjoint<T extends bigint>(
  a: bigintrange<T>,
  b: bigintrange<T>,
): boolean {
  return !overlaps(a, b);
}

// a isAdjacentTo b (b isAdjacent a)
// disjointかつ隣接（図形のtouchesとは意味が異なる）
export function isAdjacent<T extends bigint>(
  a: bigintrange<T>,
  b: bigintrange<T>,
): boolean {
  // Type.assertBigIntRange(a, "a");
  // Type.assertBigIntRange(b, "b");
  if (overlaps(a, b)) {
    return false;
  }

  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  if ((bMin - aMax) as unknown as T === 1n) {
    return true;
  } else if ((aMin - bMax) as unknown as T === 1n) {
    return true;
  }
  return false;
}

export function includes<T extends bigint>(
  range: bigintrange<T>,
  test: T,
): boolean {
  Type.assertBigIntRange(range, "range");
  const [min, max] = range;
  return Type.isBigInt(test) && (test >= min) && (test <= max);
}
