import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isNumberInRange()", () => {
  assertStrictEquals(Type.isNumberInRange(0, 0, 0), true);
  assertStrictEquals(Type.isNumberInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0, 0, 1), true);
  assertStrictEquals(Type.isNumberInRange(0, -1, 0), true);
  assertStrictEquals(Type.isNumberInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(0, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(0.5, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(0.5, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0.5, 0, 1), true);
  assertStrictEquals(Type.isNumberInRange(0.5, -1, 0), false);
  assertStrictEquals(Type.isNumberInRange(0.5, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0.5, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(0.5, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(1, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(1, 0, 1), true);
  assertStrictEquals(Type.isNumberInRange(1, -1, 0), false);
  assertStrictEquals(Type.isNumberInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(1, 1, 1), true);
  assertStrictEquals(Type.isNumberInRange(1, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(-0.5, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-0.5, 0, 1), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, -1, 0), true);
  assertStrictEquals(Type.isNumberInRange(-0.5, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-0.5, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(-1, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-1, 0, 1), false);
  assertStrictEquals(Type.isNumberInRange(-1, -1, 0), true);
  assertStrictEquals(Type.isNumberInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-1, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(-1, -1, -1), true);

  assertStrictEquals(Type.isNumberInRange(0n, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(0, -0.5, 0.5), true);

  assertStrictEquals(
    Type.isNumberInRange(0, 0, Number.MAX_SAFE_INTEGER),
    true,
  );

  const emax = "`max` must be a finite `number`.";
  assertThrows(
    () => {
      Type.isNumberInRange(0, 0, Number.POSITIVE_INFINITY);
    },
    TypeError,
    emax,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, Number.MIN_SAFE_INTEGER, 0),
    true,
  );

  const emin = "`min` must be a finite `number`.";
  assertThrows(
    () => {
      Type.isNumberInRange(0, Number.NEGATIVE_INFINITY, 0);
    },
    TypeError,
    emin,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, Number.MIN_SAFE_INTEGER, 1),
    true,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    emin,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, 0, undefined as unknown as number);
    },
    TypeError,
    emax,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, Number.NaN, 0);
    },
    TypeError,
    emin,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, 0, Number.NaN);
    },
    TypeError,
    emax,
  );
});

Deno.test("Type.isBigIntInRange()", () => {
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, -1n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(0n, 1n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(0n, -1n, -1n), false);

  assertStrictEquals(Type.isBigIntInRange(1n, 0n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(1n, 0n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(1n, -1n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(1n, 1n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(1n, -1n, -1n), false);

  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, -1n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(-1n, 1n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, -1n, -1n), true);

  assertStrictEquals(Type.isBigIntInRange(0, 0n, 0n), false);

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      Type.isBigIntInRange(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      Type.isBigIntInRange(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );
});
