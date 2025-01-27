import { assertSafeInteger, isSafeInteger } from "../type/number.ts";
import { IntegerRange } from "./integer_range.ts";
import * as NumberUtils from "../utils/number.ts";

export class SafeIntegerRange<T extends number> implements IntegerRange<T> {
  readonly #min: T;
  readonly #max: T;

  private constructor(min: T, max: T) {
    const size = max - min;
    if ((size + 1) > Number.MAX_SAFE_INTEGER) {
      throw new RangeError("Range size exceeds upper limit.");
    }

    this.#min = NumberUtils.normalize(min);
    this.#max = NumberUtils.normalize(max);
  }

  get min(): T {
    return this.#min;
  }

  get max(): T {
    return this.#max;
  }

  get size(): number {
    return (this.#max - this.#min) + 1;
  }

  static from<T extends number>(
    rangeLike: SafeIntegerRange.Like<T>,
  ): SafeIntegerRange<T> {
    const { min, max } = IntegerRange.Struct.fromRangeLike(rangeLike);
    return new SafeIntegerRange(min, max);
  }

  static of<T extends number>(...args: Array<T>): SafeIntegerRange<T> {
    return this.from(args as SafeIntegerRange.Tuple<T>);
  }

  rangeEquals<U extends number>(
    otherRangeLike: SafeIntegerRange.Like<U>,
  ): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeEquals(this, otherRange);
    } catch {
      return false;
    }
  }

  overlaps<U extends number>(
    otherRangeLike: SafeIntegerRange.Like<U>,
  ): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeOverlaps(this, otherRange);
    } catch {
      return false;
    }
  }

  covers<U extends number>(otherRangeLike: SafeIntegerRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeCovers(this, otherRange);
    } catch {
      return false;
    }
  }

  isDisjointFrom<U extends number>(
    otherRangeLike: SafeIntegerRange.Like<U>,
  ): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeIsDisjointFrom(this, otherRange);
    } catch {
      return false;
    }
  }

  isAdjacentTo<U extends number>(
    otherRangeLike: SafeIntegerRange.Like<U>,
  ): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeIsAdjacentTo(this, otherRange);
    } catch {
      return false;
    }
  }

  includes(test: number): test is T {
    return isSafeInteger(test) && (test >= this.#min) &&
      (test <= this.#max);
  }

  clamp(input: number): T {
    assertSafeInteger(input, "input");

    if (this.includes(input)) {
      return NumberUtils.normalize(input);
    }

    if (input < this.#min) {
      return this.#min;
    } else { // if (input > this.#max) {
      return this.#max;
    }
  }

  equals(other: unknown): boolean {
    if (other instanceof SafeIntegerRange) {
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

export namespace SafeIntegerRange {
  export type Tuple<T extends number> = IntegerRange.Tuple<T>;
  export type Struct<T extends number> = IntegerRange.Struct<T>;
  export type Like<T extends number> = IntegerRange.Like<T>;
}
