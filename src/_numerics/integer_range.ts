import { type int } from "../type.ts";
import { isBigInt } from "../type/bigint.ts";
import { isSafeInt } from "../type/number.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

//TODO BigIntRangeSet, SafeIntRangeSet
// RangeのメソッドとunionWith, exceptWith, intersectWith, ...

export namespace IntegerRange {
  export type Tuple<T extends int> = [min: T, max: T] | [
    minmax: T,
  ];

  export type Struct<T extends int> = {
    min: T;
    max: T;
  };

  export type Like<T extends int> = Tuple<T> | Struct<T>;

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

      if (isSafeInt(parsedMin) && isSafeInt(parsedMax)) {
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

      if (isSafeInt(parsedMin) && isSafeInt(parsedMax)) {
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
