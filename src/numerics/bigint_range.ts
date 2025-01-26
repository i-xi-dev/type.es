import { assertBigInt, isBigInt } from "../type/bigint.ts";
import { IntegerRange } from "./integer_range.ts";

export class BigIntRange<T extends bigint> implements IntegerRange<T> {
  readonly #min: T;
  readonly #max: T;

  private constructor(min: T, max: T) {
    const size = (max as bigint) - (min as bigint); // なぜかsizeがnumber型とみなされる
    if ((size + 1n) > 0x1_0000_0000_0000_0000n) { //XXX 暫定でuint64まで
      throw new RangeError("Range size exceeds upper limit.");
    }

    this.#min = min;
    this.#max = max;
  }

  get min(): T {
    return this.#min;
  }

  get max(): T {
    return this.#max;
  }

  get size(): number {
    const d = this.#max - this.#min;
    // if (d > Number.MAX_SAFE_INTEGER) {
    //   throw new Error("");
    // }
    return Number(d) + 1;
  }

  static from<T extends bigint>(
    rangeLike: BigIntRange.Like<T>,
  ): BigIntRange<T> {
    const { min, max } = IntegerRange.Struct.fromRangeLike(rangeLike);
    return new BigIntRange(min, max);
  }

  static of<T extends bigint>(...args: Array<T>): BigIntRange<T> {
    return this.from(args as BigIntRange.Tuple<T>);
  }

  rangeEquals<U extends bigint>(otherRangeLike: BigIntRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeEquals(this, otherRange);
    } catch {
      return false;
    }
  }

  overlaps<U extends bigint>(otherRangeLike: BigIntRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeOverlaps(this, otherRange);
    } catch {
      return false;
    }
  }

  covers<U extends bigint>(otherRangeLike: BigIntRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeCovers(this, otherRange);
    } catch {
      return false;
    }
  }

  isDisjointFrom<U extends bigint>(
    otherRangeLike: BigIntRange.Like<U>,
  ): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeIsDisjointFrom(this, otherRange);
    } catch {
      return false;
    }
  }

  isAdjacentTo<U extends bigint>(otherRangeLike: BigIntRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeIsAdjacentTo(this, otherRange);
    } catch {
      return false;
    }
  }

  includes(test: bigint): test is T {
    return isBigInt(test) && (test >= this.#min) && (test <= this.#max);
  }

  clamp(input: bigint): T {
    assertBigInt(input, "input");

    if (this.includes(input)) {
      return input;
    }

    if (input < this.#min) {
      return this.#min;
    } else { // if (input > this.#max) {
      return this.#max;
    }
  }

  equals(other: unknown): boolean {
    if (other instanceof BigIntRange) {
      return IntegerRange.rangeEquals(this, other);
    }
    return false;
  }

  // もし超巨大なレンジでも特に警告等しないので注意
  [Symbol.iterator](): IterableIterator<T> {
    const min = this.min;
    const max = this.max;
    return (function* () {
      for (let i = min; i <= max; i++) {
        yield i;
      }
    })();
  }

  // もし超巨大なレンジでも特に警告等しないので注意
  toArray(): Array<T> {
    return [...this[Symbol.iterator]()];
  }

  // もし超巨大なレンジでも特に警告等しないので注意
  toSet(): Set<T> {
    return new Set(this[Symbol.iterator]());
  }
}

export namespace BigIntRange {
  export type Tuple<T extends bigint> = IntegerRange.Tuple<T>;
  export type Struct<T extends bigint> = IntegerRange.Struct<T>;
  export type Like<T extends bigint> = IntegerRange.Like<T>;
}
