import { assertStrictEquals, assertThrows } from "@std/assert";
import { NumberUtils } from "../../mod.ts";

Deno.test("NumberUtils.normalize()", () => {
  assertStrictEquals(Object.is(NumberUtils.normalize(0), 0), true);
  assertStrictEquals(Object.is(NumberUtils.normalize(-0), 0), true);
  assertStrictEquals(Object.is(NumberUtils.normalize(-0), -0), false);

  assertStrictEquals(
    NumberUtils.normalize(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    NumberUtils.normalize(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );
  assertStrictEquals(NumberUtils.normalize(Number.NaN), Number.NaN);
  assertStrictEquals(
    NumberUtils.normalize(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    NumberUtils.normalize(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      NumberUtils.normalize(0n as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("NumberUtils.clamp()", () => {
  const ex1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      NumberUtils.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `number`.";
  assertThrows(
    () => {
      NumberUtils.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `number`.";
  assertThrows(
    () => {
      NumberUtils.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(NumberUtils.clamp(0, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(0, 0, 1), 0);
  assertStrictEquals(NumberUtils.clamp(0, -1, 0), 0);
  assertStrictEquals(NumberUtils.clamp(0, 1, 1), 1);
  assertStrictEquals(NumberUtils.clamp(0, -1, -1), -1);

  assertThrows(
    () => {
      NumberUtils.clamp(0, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberUtils.clamp(0, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(NumberUtils.clamp(0.5, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(0.5, 0, 1), 0.5);
  assertStrictEquals(NumberUtils.clamp(0.5, -1, 0), 0);
  assertStrictEquals(NumberUtils.clamp(0.5, 1, 1), 1);
  assertStrictEquals(NumberUtils.clamp(0.5, -1, -1), -1);

  assertStrictEquals(NumberUtils.clamp(1, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(1, 0, 1), 1);
  assertStrictEquals(NumberUtils.clamp(1, -1, 0), 0);
  assertStrictEquals(NumberUtils.clamp(1, 1, 1), 1);
  assertStrictEquals(NumberUtils.clamp(1, -1, -1), -1);

  assertThrows(
    () => {
      NumberUtils.clamp(1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberUtils.clamp(1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(NumberUtils.clamp(-0.5, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(-0.5, 0, 1), 0);
  assertStrictEquals(NumberUtils.clamp(-0.5, -1, 0), -0.5);
  assertStrictEquals(NumberUtils.clamp(-0.5, 1, 1), 1);
  assertStrictEquals(NumberUtils.clamp(-0.5, -1, -1), -1);

  assertStrictEquals(NumberUtils.clamp(-1, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(-1, 0, 1), 0);
  assertStrictEquals(NumberUtils.clamp(-1, -1, 0), -1);
  assertStrictEquals(NumberUtils.clamp(-1, 1, 1), 1);
  assertStrictEquals(NumberUtils.clamp(-1, -1, -1), -1);

  assertThrows(
    () => {
      NumberUtils.clamp(-1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberUtils.clamp(-1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );
});

Deno.test("NumberUtils.isInRange()", () => {
  assertStrictEquals(NumberUtils.isInRange(0, 0, 0), true);
  assertStrictEquals(NumberUtils.isInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(0, 0, 1), true);
  assertStrictEquals(NumberUtils.isInRange(0, -1, 0), true);
  assertStrictEquals(NumberUtils.isInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(0, 1, 1), false);
  assertStrictEquals(NumberUtils.isInRange(0, -1, -1), false);

  assertStrictEquals(NumberUtils.isInRange(0.5, 0, 0), false);
  assertStrictEquals(NumberUtils.isInRange(0.5, 1, 0), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(0.5, 0, 1), true);
  assertStrictEquals(NumberUtils.isInRange(0.5, -1, 0), false);
  assertStrictEquals(NumberUtils.isInRange(0.5, 0, -1), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(0.5, 1, 1), false);
  assertStrictEquals(NumberUtils.isInRange(0.5, -1, -1), false);

  assertStrictEquals(NumberUtils.isInRange(1, 0, 0), false);
  assertStrictEquals(NumberUtils.isInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(1, 0, 1), true);
  assertStrictEquals(NumberUtils.isInRange(1, -1, 0), false);
  assertStrictEquals(NumberUtils.isInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(1, 1, 1), true);
  assertStrictEquals(NumberUtils.isInRange(1, -1, -1), false);

  assertStrictEquals(NumberUtils.isInRange(-0.5, 0, 0), false);
  assertStrictEquals(NumberUtils.isInRange(-0.5, 1, 0), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(-0.5, 0, 1), false);
  assertStrictEquals(NumberUtils.isInRange(-0.5, -1, 0), true);
  assertStrictEquals(NumberUtils.isInRange(-0.5, 0, -1), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(-0.5, 1, 1), false);
  assertStrictEquals(NumberUtils.isInRange(-0.5, -1, -1), false);

  assertStrictEquals(NumberUtils.isInRange(-1, 0, 0), false);
  assertStrictEquals(NumberUtils.isInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(-1, 0, 1), false);
  assertStrictEquals(NumberUtils.isInRange(-1, -1, 0), true);
  assertStrictEquals(NumberUtils.isInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(NumberUtils.isInRange(-1, 1, 1), false);
  assertStrictEquals(NumberUtils.isInRange(-1, -1, -1), true);

  assertStrictEquals(NumberUtils.isInRange(0n, 0, 0), false);
  assertStrictEquals(NumberUtils.isInRange(0, -0.5, 0.5), true);

  assertStrictEquals(
    NumberUtils.isInRange(0, 0, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    NumberUtils.isInRange(0, 0, Number.POSITIVE_INFINITY),
    true,
  );
  // assertStrictEquals(NumberUtils.isInRange(0, 0, Number.NaN), false);
  assertStrictEquals(
    NumberUtils.isInRange(0, Number.MIN_SAFE_INTEGER, 0),
    true,
  );
  assertStrictEquals(
    NumberUtils.isInRange(0, Number.NEGATIVE_INFINITY, 0),
    true,
  );
  // assertStrictEquals(NumberUtils.isInRange(0, Number.NaN, 0), false);

  assertStrictEquals(
    NumberUtils.isInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    NumberUtils.isInRange(0, 1, Number.POSITIVE_INFINITY),
    false,
  );
  // assertStrictEquals(NumberUtils.isInRange(0, 1, Number.NaN), false);
  assertStrictEquals(
    NumberUtils.isInRange(0, Number.MIN_SAFE_INTEGER, 1),
    true,
  );
  assertStrictEquals(
    NumberUtils.isInRange(0, Number.NEGATIVE_INFINITY, 1),
    true,
  );
  // assertStrictEquals(NumberUtils.isInRange(0, Number.NaN, 1), false);

  assertStrictEquals(
    NumberUtils.isInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    NumberUtils.isInRange(0, -1, Number.POSITIVE_INFINITY),
    true,
  );
  // assertStrictEquals(NumberUtils.isInRange(0, -1, Number.NaN), false);
  assertStrictEquals(
    NumberUtils.isInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );
  assertStrictEquals(
    NumberUtils.isInRange(0, Number.NEGATIVE_INFINITY, -1),
    false,
  );
  // assertStrictEquals(NumberUtils.isInRange(0, Number.NaN, -1), false);

  const e1 = "`min` must be a `number`.";
  assertThrows(
    () => {
      NumberUtils.isInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`max` must be a `number`.";
  assertThrows(
    () => {
      NumberUtils.isInRange(0, 0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );

  const e3 = "`min` must not be `NaN`.";
  assertThrows(
    () => {
      NumberUtils.isInRange(0, Number.NaN, 0);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must not be `NaN`.";
  assertThrows(
    () => {
      NumberUtils.isInRange(0, 0, Number.NaN);
    },
    TypeError,
    e4,
  );
});
