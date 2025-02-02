import { assertStrictEquals, assertThrows } from "@std/assert";
import { ExtNumber } from "../../../mod.ts";

Deno.test("ExtNumber.normalize()", () => {
  assertStrictEquals(Object.is(ExtNumber.normalize(0), 0), true);
  assertStrictEquals(Object.is(ExtNumber.normalize(-0), 0), true);
  assertStrictEquals(Object.is(ExtNumber.normalize(-0), -0), false);

  assertStrictEquals(
    ExtNumber.normalize(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    ExtNumber.normalize(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );
  assertStrictEquals(ExtNumber.normalize(Number.NaN), Number.NaN);
  assertStrictEquals(
    ExtNumber.normalize(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    ExtNumber.normalize(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      ExtNumber.normalize(0n as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("ExtNumber.clamp()", () => {
  const ex1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      ExtNumber.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `number`.";
  assertThrows(
    () => {
      ExtNumber.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `number`.";
  assertThrows(
    () => {
      ExtNumber.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(ExtNumber.clamp(0, 0, 0), 0);
  assertStrictEquals(ExtNumber.clamp(0, 0, 1), 0);
  assertStrictEquals(ExtNumber.clamp(0, -1, 0), 0);
  assertStrictEquals(ExtNumber.clamp(0, 1, 1), 1);
  assertStrictEquals(ExtNumber.clamp(0, -1, -1), -1);

  assertThrows(
    () => {
      ExtNumber.clamp(0, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtNumber.clamp(0, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExtNumber.clamp(0.5, 0, 0), 0);
  assertStrictEquals(ExtNumber.clamp(0.5, 0, 1), 0.5);
  assertStrictEquals(ExtNumber.clamp(0.5, -1, 0), 0);
  assertStrictEquals(ExtNumber.clamp(0.5, 1, 1), 1);
  assertStrictEquals(ExtNumber.clamp(0.5, -1, -1), -1);

  assertStrictEquals(ExtNumber.clamp(1, 0, 0), 0);
  assertStrictEquals(ExtNumber.clamp(1, 0, 1), 1);
  assertStrictEquals(ExtNumber.clamp(1, -1, 0), 0);
  assertStrictEquals(ExtNumber.clamp(1, 1, 1), 1);
  assertStrictEquals(ExtNumber.clamp(1, -1, -1), -1);

  assertThrows(
    () => {
      ExtNumber.clamp(1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtNumber.clamp(1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExtNumber.clamp(-0.5, 0, 0), 0);
  assertStrictEquals(ExtNumber.clamp(-0.5, 0, 1), 0);
  assertStrictEquals(ExtNumber.clamp(-0.5, -1, 0), -0.5);
  assertStrictEquals(ExtNumber.clamp(-0.5, 1, 1), 1);
  assertStrictEquals(ExtNumber.clamp(-0.5, -1, -1), -1);

  assertStrictEquals(ExtNumber.clamp(-1, 0, 0), 0);
  assertStrictEquals(ExtNumber.clamp(-1, 0, 1), 0);
  assertStrictEquals(ExtNumber.clamp(-1, -1, 0), -1);
  assertStrictEquals(ExtNumber.clamp(-1, 1, 1), 1);
  assertStrictEquals(ExtNumber.clamp(-1, -1, -1), -1);

  assertThrows(
    () => {
      ExtNumber.clamp(-1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtNumber.clamp(-1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );
});
