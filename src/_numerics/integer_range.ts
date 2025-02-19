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
}
