import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { Number: ExNumber } = Numerics;

Deno.test("Numerics.Number.normalize()", () => {
  assertStrictEquals(Object.is(ExNumber.normalize(0), 0), true);
  assertStrictEquals(Object.is(ExNumber.normalize(-0), 0), true);
  assertStrictEquals(Object.is(ExNumber.normalize(-0), -0), false);

  assertStrictEquals(
    ExNumber.normalize(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    ExNumber.normalize(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );
  assertStrictEquals(ExNumber.normalize(Number.NaN), Number.NaN);
  assertStrictEquals(
    ExNumber.normalize(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    ExNumber.normalize(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      ExNumber.normalize(0n as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.Number.clampToRange()", () => {
  const ex1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      ExNumber.clampToRange(undefined as unknown as number, [0, 0]);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`range` must be a range of `number`.";
  assertThrows(
    () => {
      ExNumber.clampToRange(0, [undefined as unknown as number, 0]);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`range` must be a range of `number`.";
  assertThrows(
    () => {
      ExNumber.clampToRange(0, [0, undefined as unknown as number]);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(ExNumber.clampToRange(0, [0, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(0, [0, 1]), 0);
  assertStrictEquals(ExNumber.clampToRange(0, [-1, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(0, [1, 1]), 1);
  assertStrictEquals(ExNumber.clampToRange(0, [-1, -1]), -1);

  assertThrows(
    () => {
      ExNumber.clampToRange(0, [1, 0]); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExNumber.clampToRange(0, [0, -1]); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExNumber.clampToRange(0.5, [0, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(0.5, [0, 1]), 0.5);
  assertStrictEquals(ExNumber.clampToRange(0.5, [-1, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(0.5, [1, 1]), 1);
  assertStrictEquals(ExNumber.clampToRange(0.5, [-1, -1]), -1);

  assertStrictEquals(ExNumber.clampToRange(1, [0, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(1, [0, 1]), 1);
  assertStrictEquals(ExNumber.clampToRange(1, [-1, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(1, [1, 1]), 1);
  assertStrictEquals(ExNumber.clampToRange(1, [-1, -1]), -1);

  assertThrows(
    () => {
      ExNumber.clampToRange(1, [1, 0]); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExNumber.clampToRange(1, [0, -1]); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExNumber.clampToRange(-0.5, [0, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(-0.5, [0, 1]), 0);
  assertStrictEquals(ExNumber.clampToRange(-0.5, [-1, 0]), -0.5);
  assertStrictEquals(ExNumber.clampToRange(-0.5, [1, 1]), 1);
  assertStrictEquals(ExNumber.clampToRange(-0.5, [-1, -1]), -1);

  assertStrictEquals(ExNumber.clampToRange(-1, [0, 0]), 0);
  assertStrictEquals(ExNumber.clampToRange(-1, [0, 1]), 0);
  assertStrictEquals(ExNumber.clampToRange(-1, [-1, 0]), -1);
  assertStrictEquals(ExNumber.clampToRange(-1, [1, 1]), 1);
  assertStrictEquals(ExNumber.clampToRange(-1, [-1, -1]), -1);

  assertThrows(
    () => {
      ExNumber.clampToRange(-1, [1, 0]); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExNumber.clampToRange(-1, [0, -1]); // 負のrange
    },
    RangeError,
    e1,
  );
});
