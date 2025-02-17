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

  /** @deprecated */
  get min(): T {
    return this.#min;
  }

  /** @deprecated */
  get max(): T {
    return this.#max;
  }

  /** @deprecated */
  get size(): number {
    const d = this.#max - this.#min;
    // if (d > Number.MAX_SAFE_INTEGER) {
    //   throw new Error("-");
    // }
    return Number(d) + 1;
  }

  /** @deprecated */
  static from<T extends bigint>(
    rangeLike: BigIntRange.Like<T>,
  ): BigIntRange<T> {
    const { min, max } = IntegerRange.Struct.fromRangeLike(rangeLike);
    return new BigIntRange(min, max);
  }

  /** @deprecated */
  static of<T extends bigint>(...args: Array<T>): BigIntRange<T> {
    return this.from(args as BigIntRange.Tuple<T>);
  }

  isAdjacentTo<U extends bigint>(otherRangeLike: BigIntRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeIsAdjacentTo(this, otherRange);
    } catch {
      return false;
    }
  }

  /** @deprecated */
  includes(test: bigint): test is T {
    return isBigInt(test) && (test >= this.#min) && (test <= this.#max);
  }

  /** @deprecated */
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

  /** @deprecated */
  [Symbol.iterator](): IterableIterator<T> {
    const min = this.min;
    const max = this.max;
    return (function* () {
      for (let i = min; i <= max; i++) {
        yield i;
      }
    })();
  }
}

export namespace BigIntRange {
  export type Tuple<T extends bigint> = IntegerRange.Tuple<T>;
  export type Struct<T extends bigint> = IntegerRange.Struct<T>;
  export type Like<T extends bigint> = IntegerRange.Like<T>;
}
