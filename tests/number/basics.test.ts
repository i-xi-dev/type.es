import { assertStrictEquals, assertThrows } from "@std/assert";
import { ExNumber } from "../../mod.ts";

Deno.test("ExNumber.normalize()", () => {
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

Deno.test("ExNumber.clamp()", () => {
  const ex1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      ExNumber.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `number`.";
  assertThrows(
    () => {
      ExNumber.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `number`.";
  assertThrows(
    () => {
      ExNumber.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(ExNumber.clamp(0, 0, 0), 0);
  assertStrictEquals(ExNumber.clamp(0, 0, 1), 0);
  assertStrictEquals(ExNumber.clamp(0, -1, 0), 0);
  assertStrictEquals(ExNumber.clamp(0, 1, 1), 1);
  assertStrictEquals(ExNumber.clamp(0, -1, -1), -1);

  assertThrows(
    () => {
      ExNumber.clamp(0, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExNumber.clamp(0, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExNumber.clamp(0.5, 0, 0), 0);
  assertStrictEquals(ExNumber.clamp(0.5, 0, 1), 0.5);
  assertStrictEquals(ExNumber.clamp(0.5, -1, 0), 0);
  assertStrictEquals(ExNumber.clamp(0.5, 1, 1), 1);
  assertStrictEquals(ExNumber.clamp(0.5, -1, -1), -1);

  assertStrictEquals(ExNumber.clamp(1, 0, 0), 0);
  assertStrictEquals(ExNumber.clamp(1, 0, 1), 1);
  assertStrictEquals(ExNumber.clamp(1, -1, 0), 0);
  assertStrictEquals(ExNumber.clamp(1, 1, 1), 1);
  assertStrictEquals(ExNumber.clamp(1, -1, -1), -1);

  assertThrows(
    () => {
      ExNumber.clamp(1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExNumber.clamp(1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExNumber.clamp(-0.5, 0, 0), 0);
  assertStrictEquals(ExNumber.clamp(-0.5, 0, 1), 0);
  assertStrictEquals(ExNumber.clamp(-0.5, -1, 0), -0.5);
  assertStrictEquals(ExNumber.clamp(-0.5, 1, 1), 1);
  assertStrictEquals(ExNumber.clamp(-0.5, -1, -1), -1);

  assertStrictEquals(ExNumber.clamp(-1, 0, 0), 0);
  assertStrictEquals(ExNumber.clamp(-1, 0, 1), 0);
  assertStrictEquals(ExNumber.clamp(-1, -1, 0), -1);
  assertStrictEquals(ExNumber.clamp(-1, 1, 1), 1);
  assertStrictEquals(ExNumber.clamp(-1, -1, -1), -1);

  assertThrows(
    () => {
      ExNumber.clamp(-1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExNumber.clamp(-1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );
});
