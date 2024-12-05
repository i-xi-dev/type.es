import { int, xint } from "../_.ts";
import { is as isBigInt } from "./bigint_type.ts";
import { is as isSafeInteger } from "./safe_integer.ts";

export interface IntegerRange<T extends xint> {
  get min(): T;
  get max(): T;
  get size(): int;
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
  toArray(): Array<T>;
  toSet(): Set<T>;
}

export namespace IntegerRange {
  export type Tuple<T extends xint> = [min: T, max: T] | [
    minmax: T,
  ];

  export type Struct<T extends xint> = {
    min: T;
    max: T;
  };

  export type Like<T extends xint> = Tuple<T> | Struct<T>;

  export function rangeEquals<T extends xint, U extends xint>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((self.min as xint) === (other.min as xint)) &&
      ((self.max as xint) === (other.max as xint));
  }

  export function rangeOverlaps<T extends xint, U extends xint>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((typeof self.min) === (typeof self.max)) &&
      (self.min <= other.max) && (self.max >= other.min);
  }

  export function rangeCovers<T extends xint, U extends xint>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((typeof self.min) === (typeof self.max)) &&
      (self.min <= other.min) && (self.max >= other.max);
  }

  export function rangeIsDisjointFrom<T extends xint, U extends xint>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return (rangeOverlaps(self, other) !== true);
  }

  // 図形のtouchesとは意味が異なる。disjointかつ隣接
  export function rangeIsAdjacentTo<T extends xint, U extends xint>(
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

  export namespace Struct {
    export function fromRangeLike<T extends xint>(
      rangeLike: Like<T>,
    ): Struct<T> {
      let parsedMin: T | undefined;
      let parsedMax: T | undefined;

      if (Array.isArray(rangeLike)) {
        if (rangeLike.length > 0) {
          parsedMin = rangeLike[0];
          if (rangeLike.length > 1) {
            parsedMax = rangeLike[1];
          } else {
            parsedMax = rangeLike[0];
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
