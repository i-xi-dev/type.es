import { assertSafeInteger, isSafeInteger } from "../type/number.ts";
import { IntegerRange } from "./integer_range.ts";
import { normalize as normalizeNumber } from "../number/basics.ts";

export class SafeIntegerRange<T extends number> implements IntegerRange<T> {
  readonly #min: T;
  readonly #max: T;

  private constructor(min: T, max: T) {
    const size = max - min;
    if ((size + 1) > Number.MAX_SAFE_INTEGER) {
      throw new RangeError("Range size exceeds upper limit.");
    }

    this.#min = normalizeNumber(min);
    this.#max = normalizeNumber(max);
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
    return (this.#max - this.#min) + 1;
  }

  /** @deprecated */
  static from<T extends number>(
    rangeLike: SafeIntegerRange.Like<T>,
  ): SafeIntegerRange<T> {
    const { min, max } = IntegerRange.Struct.fromRangeLike(rangeLike);
    return new SafeIntegerRange(min, max);
  }

  /** @deprecated */
  static of<T extends number>(...args: Array<T>): SafeIntegerRange<T> {
    return this.from(args as SafeIntegerRange.Tuple<T>);
  }

  /** @deprecated */
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

  /** @deprecated */
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

  /** @deprecated */
  covers<U extends number>(otherRangeLike: SafeIntegerRange.Like<U>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeCovers(this, otherRange);
    } catch {
      return false;
    }
  }

  /** @deprecated */
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

  /** @deprecated */
  includes(test: number): test is T {
    return isSafeInteger(test) && (test >= this.#min) &&
      (test <= this.#max);
  }

  /** @deprecated */
  clamp(input: number): T {
    assertSafeInteger(input, "input");

    if (this.includes(input)) {
      return normalizeNumber(input);
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

export namespace SafeIntegerRange {
  export type Tuple<T extends number> = IntegerRange.Tuple<T>;
  export type Struct<T extends number> = IntegerRange.Struct<T>;
  export type Like<T extends number> = IntegerRange.Like<T>;
}
