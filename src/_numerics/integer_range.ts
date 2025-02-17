import { type int, type safeint } from "../type.ts";
import { isBigInt } from "../type/bigint.ts";
import { isSafeInteger } from "../type/number.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

//TODO 離散範囲にする

export interface IntegerRange<T extends int> {
  get min(): T;
  get max(): T;
  get size(): safeint;
  rangeEquals(otherRangeLike: IntegerRange.Like<T>): boolean;
  overlaps(otherRangeLike: IntegerRange.Like<T>): boolean;
  covers(otherRangeLike: IntegerRange.Like<T>): boolean; // isSuperrangeOf
  //XXX isCoveredBy(otherRangeLike: IntegerRange.Like<T>): boolean; // isSubrangeOf
  isDisjointFrom(otherRangeLike: IntegerRange.Like<T>): boolean;
  isAdjacentTo(otherRangeLike: IntegerRange.Like<T>): boolean;
  //XXX exceptWith(otherRangeLike: IntegerRange.Like<T>): IntegerRange;
  //XXX intersectWith(otherRangeLike: IntegerRange.Like<T>): IntegerRange;
  //XXX unionWith(otherRangeLike: IntegerRange.Like<T>): IntegerRange;
  // normalize(ranges)
  includes(test: T): boolean;
  clamp(input: T): T;
  equals(other: unknown): boolean;
  [Symbol.iterator](): IterableIterator<T>;
}

export namespace IntegerRange {
  export type Tuple<T extends int> = [min: T, max: T] | [
    minmax: T,
  ];

  export type Struct<T extends int> = {
    min: T;
    max: T;
  };

  export type Like<T extends int> = Tuple<T> | Struct<T>;

  /** @deprecated */
  export function rangeEquals<T extends int, U extends int>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((self.min as int) === (other.min as int)) &&
      ((self.max as int) === (other.max as int));
  }

  /** @deprecated */
  export function rangeOverlaps<T extends int, U extends int>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((typeof self.min) === (typeof self.max)) &&
      (self.min <= other.max) && (self.max >= other.min);
  }

  /** @deprecated */
  export function rangeCovers<T extends int, U extends int>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((typeof self.min) === (typeof self.max)) &&
      (self.min <= other.min) && (self.max >= other.max);
  }

  /** @deprecated */
  export function rangeIsDisjointFrom<T extends int, U extends int>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return (rangeOverlaps(self, other) !== true);
  }

  // 図形のtouchesとは意味が異なる。disjointかつ隣接
  export function rangeIsAdjacentTo<T extends int, U extends int>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    if (rangeIsDisjointFrom(self, other) !== true) {
      return false;
    }

    const one = (isBigInt(self.min) ? 1n : 1) as T;
    if ((other.min - self.max) === one) {
      return true;
    } else if ((self.min - other.max) === one) {
      return true;
    }

    return false;
  }

  export namespace Tuple {
    export function is<T extends int>(test: unknown): test is Tuple<T> {
      if (Array.isArray(test) !== true) {
        return false;
      }

      let parsedMin: T | undefined;
      let parsedMax: T | undefined;
      if (test.length === 1) {
        parsedMin = test[NUMBER_ZERO];
        parsedMax = parsedMin;
      } else if (test.length === 2) {
        parsedMin = test[NUMBER_ZERO];
        parsedMax = test[1];
      }

      if (isSafeInteger(parsedMin) && isSafeInteger(parsedMax)) {
        return true;
      } else if (isBigInt(parsedMin) && isBigInt(parsedMax)) {
        return true;
      } else {
        return false;
      }
    }

    export function assert(test: unknown, label: string): void {
      if (is(test) !== true) {
        throw new TypeError(
          `\`${label}\` must be a tuple consisting of one or two integers.`,
        );
      }
    }
  }

  export namespace Struct {
    export function fromRangeLike<T extends int>(
      rangeLike: Like<T>,
    ): Struct<T> {
      let parsedMin: T | undefined;
      let parsedMax: T | undefined;

      //XXX Tuple.is()等に分割
      if (Array.isArray(rangeLike)) {
        if (rangeLike.length > NUMBER_ZERO) {
          parsedMin = rangeLike[NUMBER_ZERO];
          if (rangeLike.length > 1) {
            parsedMax = rangeLike[1];
          } else {
            parsedMax = rangeLike[NUMBER_ZERO];
          }
        } else {
          throw new RangeError(
            "`rangeLike` array must have more than one element.",
          );
        }
      } else if (rangeLike && (typeof rangeLike === "object")) {
        parsedMin = ("min" in rangeLike) ? rangeLike.min : undefined;
        parsedMax = ("max" in rangeLike) ? rangeLike.max : undefined;
      } else {
        throw new TypeError("`rangeLike` must be a `IntegerRange.Like`.");
      }

      if (isSafeInteger(parsedMin) && isSafeInteger(parsedMax)) {
        // ok
      } else if (isBigInt(parsedMin) && isBigInt(parsedMax)) {
        // ok
      } else {
        throw new TypeError(
          "`rangeLike` must have the integers `min` and `max`.",
        );
      }

      if (parsedMin > parsedMax) {
        throw new RangeError(
          "`min` must be less than or equal to `max`.",
        );
      }

      return {
        min: parsedMin,
        max: parsedMax,
      };
    }
  }
}
