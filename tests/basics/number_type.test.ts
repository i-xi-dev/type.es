import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Basics } from "../../mod.ts";

const { NumberType } = Basics;

Deno.test("NumberType.isInRange()", () => {
  assertStrictEquals(NumberType.isInRange(0, 0, 0), true);
  assertStrictEquals(NumberType.isInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0, 0, 1), true);
  assertStrictEquals(NumberType.isInRange(0, -1, 0), true);
  assertStrictEquals(NumberType.isInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(0, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(0.5, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(0.5, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0.5, 0, 1), true);
  assertStrictEquals(NumberType.isInRange(0.5, -1, 0), false);
  assertStrictEquals(NumberType.isInRange(0.5, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0.5, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(0.5, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(1, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(1, 0, 1), true);
  assertStrictEquals(NumberType.isInRange(1, -1, 0), false);
  assertStrictEquals(NumberType.isInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(1, 1, 1), true);
  assertStrictEquals(NumberType.isInRange(1, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(-0.5, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(-0.5, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-0.5, 0, 1), false);
  assertStrictEquals(NumberType.isInRange(-0.5, -1, 0), true);
  assertStrictEquals(NumberType.isInRange(-0.5, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-0.5, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(-0.5, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(-1, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-1, 0, 1), false);
  assertStrictEquals(NumberType.isInRange(-1, -1, 0), true);
  assertStrictEquals(NumberType.isInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-1, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(-1, -1, -1), true);

  assertStrictEquals(NumberType.isInRange(0n, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(0, -0.5, 0.5), true);

  assertStrictEquals(NumberType.isInRange(0, 0, Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(
    NumberType.isInRange(0, 0, Number.POSITIVE_INFINITY),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, 0, Number.NaN), false);
  assertStrictEquals(NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, 0), true);
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, 0),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, Number.NaN, 0), false);

  assertStrictEquals(
    NumberType.isInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    NumberType.isInRange(0, 1, Number.POSITIVE_INFINITY),
    false,
  );
  // assertStrictEquals(NumberType.isInRange(0, 1, Number.NaN), false);
  assertStrictEquals(NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, 1), true);
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, 1),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, Number.NaN, 1), false);

  assertStrictEquals(
    NumberType.isInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    NumberType.isInRange(0, -1, Number.POSITIVE_INFINITY),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, -1, Number.NaN), false);
  assertStrictEquals(
    NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, -1),
    false,
  );
  // assertStrictEquals(NumberType.isInRange(0, Number.NaN, -1), false);

  const e1 = "`min` must be a `number`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`max` must be a `number`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, 0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );

  const e3 = "`min` must not be `NaN`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, Number.NaN, 0);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must not be `NaN`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, 0, Number.NaN);
    },
    TypeError,
    e4,
  );
});
