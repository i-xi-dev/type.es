import { assertBigIntRange } from "../type/numeric_range.ts";
import { type BigIntRange } from "../type.ts";

export function sizeOf<T extends bigint>(range: BigIntRange<T>): bigint {
  assertBigIntRange(range, "range");

  const [min, max] = range;
  const d = (max as bigint) - (min as bigint); // typescriptでなぜかnumber扱いになる
  const size = d + 1n;

  return size;
}

//XXX fromXxx<T extends bigint>(xxx: { min: T, max: T }): BigIntRange<T>
//XXX toXxx<T extends bigint>(range: BigIntRange<T>): { min: T, max: T }

// toArray<T extends bigint>(): Array<T> → 実装しない（要素数が多いと配列を作れないので。（要素数上限はECMAの仕様上はMAX_SAFE_INTEGERだが、実装はそれよりはるかに小さい））
