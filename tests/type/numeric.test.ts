import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("Type.isNumeric()", () => {
  assertStrictEquals(Type.isNumeric(0), true);
  assertStrictEquals(Type.isNumeric(-0), true);
  assertStrictEquals(Type.isNumeric(1), true);
  assertStrictEquals(Type.isNumeric(-1), true);

  assertStrictEquals(Type.isNumeric(-10.1), true);
  assertStrictEquals(Type.isNumeric(-9.9), true);
  assertStrictEquals(Type.isNumeric(9.9), true);
  assertStrictEquals(Type.isNumeric(10.1), true);

  assertStrictEquals(Type.isNumeric(0n), true);
  assertStrictEquals(Type.isNumeric(-0n), true);
  assertStrictEquals(Type.isNumeric(1n), true);
  assertStrictEquals(Type.isNumeric(-1n), true);

  assertStrictEquals(Type.isNumeric(Number.NaN), true);
  assertStrictEquals(Type.isNumeric(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isNumeric(SIMAX), true);
  assertStrictEquals(Type.isNumeric(SIMIN), true);
  assertStrictEquals(Type.isNumeric(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNumeric(undefined), false);
  assertStrictEquals(Type.isNumeric(null), false);
  assertStrictEquals(Type.isNumeric(true), false);
  assertStrictEquals(Type.isNumeric(false), false);
  assertStrictEquals(Type.isNumeric(""), false);
  assertStrictEquals(Type.isNumeric("0"), false);
});

Deno.test("Type.assertNumeric()", () => {
  try {
    Type.assertNumeric(0, "test-1");
    Type.assertNumeric(0.5, "test-1");
    Type.assertNumeric(Number.NaN, "test-1");
    Type.assertNumeric(Number.POSITIVE_INFINITY, "test-1");
    Type.assertNumeric(Number.NEGATIVE_INFINITY, "test-1");
    Type.assertNumeric(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isPositiveNumeric()", () => {
  assertStrictEquals(Type.isPositiveNumeric(0), false);
  assertStrictEquals(Type.isPositiveNumeric(-0), false);
  assertStrictEquals(Type.isPositiveNumeric(1), true);
  assertStrictEquals(Type.isPositiveNumeric(-1), false);

  assertStrictEquals(Type.isPositiveNumeric(-10.1), false);
  assertStrictEquals(Type.isPositiveNumeric(-9.9), false);
  assertStrictEquals(Type.isPositiveNumeric(9.9), true);
  assertStrictEquals(Type.isPositiveNumeric(10.1), true);

  assertStrictEquals(Type.isPositiveNumeric(0n), false);
  assertStrictEquals(Type.isPositiveNumeric(-0n), false);
  assertStrictEquals(Type.isPositiveNumeric(1n), true);
  assertStrictEquals(Type.isPositiveNumeric(-1n), false);

  assertStrictEquals(Type.isPositiveNumeric(Number.NaN), false);
  assertStrictEquals(Type.isPositiveNumeric(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isPositiveNumeric(Number.MAX_SAFE_INTEGER + 1), true);
  assertStrictEquals(Type.isPositiveNumeric(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isPositiveNumeric(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    Type.isPositiveNumeric(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(Type.isPositiveNumeric(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Type.isPositiveNumeric(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Type.isPositiveNumeric(null as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric(true as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric(false as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric("" as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric("0" as unknown as number), false);
});

Deno.test("Type.assertPositiveNumeric()", () => {
  try {
    Type.assertPositiveNumeric(0.5, "test-1");
    Type.assertPositiveNumeric(1, "test-1");
    Type.assertPositiveNumeric(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveNumeric(0, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPositiveNumeric(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPositiveNumeric(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPositiveNumeric(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});
