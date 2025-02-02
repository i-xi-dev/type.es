import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("Type.isInteger()", () => {
  assertStrictEquals(Type.isInteger(0), true);
  assertStrictEquals(Type.isInteger(-0), true);
  assertStrictEquals(Type.isInteger(1), true);
  assertStrictEquals(Type.isInteger(-1), true);

  assertStrictEquals(Type.isInteger(-10.1), false);
  assertStrictEquals(Type.isInteger(-9.9), false);
  assertStrictEquals(Type.isInteger(9.9), false);
  assertStrictEquals(Type.isInteger(10.1), false);

  assertStrictEquals(Type.isInteger(0n), true);
  assertStrictEquals(Type.isInteger(-0n), true);
  assertStrictEquals(Type.isInteger(1n), true);
  assertStrictEquals(Type.isInteger(-1n), true);

  assertStrictEquals(Type.isInteger(Number.NaN), false);
  assertStrictEquals(Type.isInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isInteger(SIMAX), true);
  assertStrictEquals(Type.isInteger(SIMIN), true);
  assertStrictEquals(Type.isInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isInteger(undefined), false);
  assertStrictEquals(Type.isInteger(null), false);
  assertStrictEquals(Type.isInteger(true), false);
  assertStrictEquals(Type.isInteger(false), false);
  assertStrictEquals(Type.isInteger(""), false);
  assertStrictEquals(Type.isInteger("0"), false);
});

Deno.test("Type.assertInteger()", () => {
  try {
    Type.assertInteger(-1, "test-1");
    Type.assertInteger(-1n, "test-1");
    Type.assertInteger(0, "test-1");
    Type.assertInteger(0n, "test-1");
    Type.assertInteger(1, "test-1");
    Type.assertInteger(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertInteger("0", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isPositiveInteger()", () => {
  assertStrictEquals(Type.isPositiveInteger(0), false);
  assertStrictEquals(Type.isPositiveInteger(-0), false);
  assertStrictEquals(Type.isPositiveInteger(1), true);
  assertStrictEquals(Type.isPositiveInteger(-1), false);

  assertStrictEquals(Type.isPositiveInteger(-10.1), false);
  assertStrictEquals(Type.isPositiveInteger(-9.9), false);
  assertStrictEquals(Type.isPositiveInteger(9.9), false);
  assertStrictEquals(Type.isPositiveInteger(10.1), false);

  assertStrictEquals(Type.isPositiveInteger(0n), false);
  assertStrictEquals(Type.isPositiveInteger(-0n), false);
  assertStrictEquals(Type.isPositiveInteger(1n), true);
  assertStrictEquals(Type.isPositiveInteger(-1n), false);

  assertStrictEquals(Type.isPositiveInteger(Number.NaN), false);
  assertStrictEquals(Type.isPositiveInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isPositiveInteger(SIMAX), true);
  assertStrictEquals(Type.isPositiveInteger(SIMIN), false);
  assertStrictEquals(Type.isPositiveInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isPositiveInteger(undefined), false);
  assertStrictEquals(Type.isPositiveInteger(null), false);
  assertStrictEquals(Type.isPositiveInteger(true), false);
  assertStrictEquals(Type.isPositiveInteger(false), false);
  assertStrictEquals(Type.isPositiveInteger(""), false);
  assertStrictEquals(Type.isPositiveInteger("0"), false);
});

Deno.test("Type.assertPositiveInteger()", () => {
  try {
    Type.assertPositiveInteger(1, "test-1");
    Type.assertPositiveInteger(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveInteger(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveInteger("0", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonNegativeInteger()", () => {
  assertStrictEquals(Type.isNonNegativeInteger(0), true);
  assertStrictEquals(Type.isNonNegativeInteger(-0), true);
  assertStrictEquals(Type.isNonNegativeInteger(1), true);
  assertStrictEquals(Type.isNonNegativeInteger(-1), false);

  assertStrictEquals(Type.isNonNegativeInteger(-10.1), false);
  assertStrictEquals(Type.isNonNegativeInteger(-9.9), false);
  assertStrictEquals(Type.isNonNegativeInteger(9.9), false);
  assertStrictEquals(Type.isNonNegativeInteger(10.1), false);

  assertStrictEquals(Type.isNonNegativeInteger(0n), true);
  assertStrictEquals(Type.isNonNegativeInteger(-0n), true);
  assertStrictEquals(Type.isNonNegativeInteger(1n), true);
  assertStrictEquals(Type.isNonNegativeInteger(-1n), false);

  assertStrictEquals(Type.isNonNegativeInteger(Number.NaN), false);
  assertStrictEquals(
    Type.isNonNegativeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isNonNegativeInteger(SIMAX), true);
  assertStrictEquals(Type.isNonNegativeInteger(SIMIN), false);
  assertStrictEquals(
    Type.isNonNegativeInteger(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isNonNegativeInteger(undefined), false);
  assertStrictEquals(Type.isNonNegativeInteger(null), false);
  assertStrictEquals(Type.isNonNegativeInteger(true), false);
  assertStrictEquals(Type.isNonNegativeInteger(false), false);
  assertStrictEquals(Type.isNonNegativeInteger(""), false);
  assertStrictEquals(Type.isNonNegativeInteger("0"), false);
});

Deno.test("Type.assertNonNegativeInteger()", () => {
  try {
    Type.assertNonNegativeInteger(0, "test-1");
    Type.assertNonNegativeInteger(0n, "test-1");
    Type.assertNonNegativeInteger(1, "test-1");
    Type.assertNonNegativeInteger(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeInteger(-1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeInteger("0", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonPositiveInteger()", () => {
  assertStrictEquals(Type.isNonPositiveInteger(0), true);
  assertStrictEquals(Type.isNonPositiveInteger(-0), true);
  assertStrictEquals(Type.isNonPositiveInteger(1), false);
  assertStrictEquals(Type.isNonPositiveInteger(-1), true);

  assertStrictEquals(Type.isNonPositiveInteger(-10.1), false);
  assertStrictEquals(Type.isNonPositiveInteger(-9.9), false);
  assertStrictEquals(Type.isNonPositiveInteger(9.9), false);
  assertStrictEquals(Type.isNonPositiveInteger(10.1), false);

  assertStrictEquals(Type.isNonPositiveInteger(0n), true);
  assertStrictEquals(Type.isNonPositiveInteger(-0n), true);
  assertStrictEquals(Type.isNonPositiveInteger(1n), false);
  assertStrictEquals(Type.isNonPositiveInteger(-1n), true);

  assertStrictEquals(Type.isNonPositiveInteger(Number.NaN), false);
  assertStrictEquals(
    Type.isNonPositiveInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isNonPositiveInteger(SIMAX), false);
  assertStrictEquals(Type.isNonPositiveInteger(SIMIN), true);
  assertStrictEquals(
    Type.isNonPositiveInteger(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isNonPositiveInteger(undefined), false);
  assertStrictEquals(Type.isNonPositiveInteger(null), false);
  assertStrictEquals(Type.isNonPositiveInteger(true), false);
  assertStrictEquals(Type.isNonPositiveInteger(false), false);
  assertStrictEquals(Type.isNonPositiveInteger(""), false);
  assertStrictEquals(Type.isNonPositiveInteger("0"), false);
});

Deno.test("Type.assertNonPositiveInteger()", () => {
  try {
    Type.assertNonPositiveInteger(0, "test-1");
    Type.assertNonPositiveInteger(0n, "test-1");
    Type.assertNonPositiveInteger(-1, "test-1");
    Type.assertNonPositiveInteger(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveInteger(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveInteger("0", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNegativeInteger()", () => {
  assertStrictEquals(Type.isNegativeInteger(0), false);
  assertStrictEquals(Type.isNegativeInteger(-0), false);
  assertStrictEquals(Type.isNegativeInteger(1), false);
  assertStrictEquals(Type.isNegativeInteger(-1), true);

  assertStrictEquals(Type.isNegativeInteger(-10.1), false);
  assertStrictEquals(Type.isNegativeInteger(-9.9), false);
  assertStrictEquals(Type.isNegativeInteger(9.9), false);
  assertStrictEquals(Type.isNegativeInteger(10.1), false);

  assertStrictEquals(Type.isNegativeInteger(0n), false);
  assertStrictEquals(Type.isNegativeInteger(-0n), false);
  assertStrictEquals(Type.isNegativeInteger(1n), false);
  assertStrictEquals(Type.isNegativeInteger(-1n), true);

  assertStrictEquals(Type.isNegativeInteger(Number.NaN), false);
  assertStrictEquals(
    Type.isNegativeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isNegativeInteger(SIMAX), false);
  assertStrictEquals(Type.isNegativeInteger(SIMIN), true);
  assertStrictEquals(
    Type.isNegativeInteger(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isNegativeInteger(undefined), false);
  assertStrictEquals(Type.isNegativeInteger(null), false);
  assertStrictEquals(Type.isNegativeInteger(true), false);
  assertStrictEquals(Type.isNegativeInteger(false), false);
  assertStrictEquals(Type.isNegativeInteger(""), false);
  assertStrictEquals(Type.isNegativeInteger("0"), false);
});

Deno.test("Type.assertNegativeInteger()", () => {
  try {
    Type.assertNegativeInteger(-1, "test-1");
    Type.assertNegativeInteger(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeInteger(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeInteger("0", "test-1");
    unreachable();
  } catch {
    //
  }
});
