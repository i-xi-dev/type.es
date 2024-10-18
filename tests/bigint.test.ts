import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import {
  assertBigInt,
  assertNegativeBigInt,
  assertNonNegativeBigInt,
  assertNonPositiveBigInt,
  assertPositiveBigInt,
  isBigInt,
  isNegativeBigInt,
  isNonNegativeBigInt,
  isNonPositiveBigInt,
  isPositiveBigInt,
} from "../mod.ts";

Deno.test("assertBigInt()", () => {
  try {
    assertBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertPositiveBigInt()", () => {
  try {
    assertPositiveBigInt(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertPositiveBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonNegativeBigInt()", () => {
  try {
    assertNonNegativeBigInt(1n, "test-1");
    assertNonNegativeBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonNegativeBigInt(-1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonPositiveBigInt()", () => {
  try {
    assertNonPositiveBigInt(-1n, "test-1");
    assertNonPositiveBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonPositiveBigInt(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNegativeBigInt()", () => {
  try {
    assertNegativeBigInt(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNegativeBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("isBigInt()", () => {
  assertStrictEquals(isBigInt(0), false);
  assertStrictEquals(isBigInt(-0), false);
  assertStrictEquals(isBigInt(1), false);
  assertStrictEquals(isBigInt(-1), false);

  assertStrictEquals(isBigInt(-10.1), false);
  assertStrictEquals(isBigInt(-9.9), false);
  assertStrictEquals(isBigInt(9.9), false);
  assertStrictEquals(isBigInt(10.1), false);

  assertStrictEquals(isBigInt(0n), true);
  assertStrictEquals(isBigInt(-0n), true);
  assertStrictEquals(isBigInt(1n), true);
  assertStrictEquals(isBigInt(-1n), true);

  assertStrictEquals(isBigInt(Number.NaN), false);
  assertStrictEquals(isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isBigInt(undefined), false);
  assertStrictEquals(isBigInt(null), false);
  assertStrictEquals(isBigInt(true), false);
  assertStrictEquals(isBigInt(false), false);
  assertStrictEquals(isBigInt(""), false);
  assertStrictEquals(isBigInt("0"), false);
});

Deno.test("isPositiveBigInt()", () => {
  assertStrictEquals(isPositiveBigInt(0), false);
  assertStrictEquals(isPositiveBigInt(-0), false);
  assertStrictEquals(isPositiveBigInt(1), false);
  assertStrictEquals(isPositiveBigInt(-1), false);

  assertStrictEquals(isPositiveBigInt(-10.1), false);
  assertStrictEquals(isPositiveBigInt(-9.9), false);
  assertStrictEquals(isPositiveBigInt(9.9), false);
  assertStrictEquals(isPositiveBigInt(10.1), false);

  assertStrictEquals(isPositiveBigInt(0n), false);
  assertStrictEquals(isPositiveBigInt(-0n), false);
  assertStrictEquals(isPositiveBigInt(1n), true);
  assertStrictEquals(isPositiveBigInt(-1n), false);

  assertStrictEquals(isPositiveBigInt(Number.NaN), false);
  assertStrictEquals(isPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isPositiveBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isPositiveBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isPositiveBigInt(undefined), false);
  assertStrictEquals(isPositiveBigInt(null), false);
  assertStrictEquals(isPositiveBigInt(true), false);
  assertStrictEquals(isPositiveBigInt(false), false);
  assertStrictEquals(isPositiveBigInt(""), false);
  assertStrictEquals(isPositiveBigInt("0"), false);
});

Deno.test("isNonNegativeBigInt()", () => {
  assertStrictEquals(isNonNegativeBigInt(0), false);
  assertStrictEquals(isNonNegativeBigInt(-0), false);
  assertStrictEquals(isNonNegativeBigInt(1), false);
  assertStrictEquals(isNonNegativeBigInt(-1), false);

  assertStrictEquals(isNonNegativeBigInt(-10.1), false);
  assertStrictEquals(isNonNegativeBigInt(-9.9), false);
  assertStrictEquals(isNonNegativeBigInt(9.9), false);
  assertStrictEquals(isNonNegativeBigInt(10.1), false);

  assertStrictEquals(isNonNegativeBigInt(0n), true);
  assertStrictEquals(isNonNegativeBigInt(-0n), true);
  assertStrictEquals(isNonNegativeBigInt(1n), true);
  assertStrictEquals(isNonNegativeBigInt(-1n), false);

  assertStrictEquals(isNonNegativeBigInt(Number.NaN), false);
  assertStrictEquals(isNonNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonNegativeBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNonNegativeBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isNonNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonNegativeBigInt(undefined), false);
  assertStrictEquals(isNonNegativeBigInt(null), false);
  assertStrictEquals(isNonNegativeBigInt(true), false);
  assertStrictEquals(isNonNegativeBigInt(false), false);
  assertStrictEquals(isNonNegativeBigInt(""), false);
  assertStrictEquals(isNonNegativeBigInt("0"), false);
});

Deno.test("isNonPositiveBigInt()", () => {
  assertStrictEquals(isNonPositiveBigInt(0), false);
  assertStrictEquals(isNonPositiveBigInt(-0), false);
  assertStrictEquals(isNonPositiveBigInt(1), false);
  assertStrictEquals(isNonPositiveBigInt(-1), false);

  assertStrictEquals(isNonPositiveBigInt(-10.1), false);
  assertStrictEquals(isNonPositiveBigInt(-9.9), false);
  assertStrictEquals(isNonPositiveBigInt(9.9), false);
  assertStrictEquals(isNonPositiveBigInt(10.1), false);

  assertStrictEquals(isNonPositiveBigInt(0n), true);
  assertStrictEquals(isNonPositiveBigInt(-0n), true);
  assertStrictEquals(isNonPositiveBigInt(1n), false);
  assertStrictEquals(isNonPositiveBigInt(-1n), true);

  assertStrictEquals(isNonPositiveBigInt(Number.NaN), false);
  assertStrictEquals(isNonPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonPositiveBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNonPositiveBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isNonPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonPositiveBigInt(undefined), false);
  assertStrictEquals(isNonPositiveBigInt(null), false);
  assertStrictEquals(isNonPositiveBigInt(true), false);
  assertStrictEquals(isNonPositiveBigInt(false), false);
  assertStrictEquals(isNonPositiveBigInt(""), false);
  assertStrictEquals(isNonPositiveBigInt("0"), false);
});

Deno.test("isNegativeBigInt()", () => {
  assertStrictEquals(isNegativeBigInt(0), false);
  assertStrictEquals(isNegativeBigInt(-0), false);
  assertStrictEquals(isNegativeBigInt(1), false);
  assertStrictEquals(isNegativeBigInt(-1), false);

  assertStrictEquals(isNegativeBigInt(-10.1), false);
  assertStrictEquals(isNegativeBigInt(-9.9), false);
  assertStrictEquals(isNegativeBigInt(9.9), false);
  assertStrictEquals(isNegativeBigInt(10.1), false);

  assertStrictEquals(isNegativeBigInt(0n), false);
  assertStrictEquals(isNegativeBigInt(-0n), false);
  assertStrictEquals(isNegativeBigInt(1n), false);
  assertStrictEquals(isNegativeBigInt(-1n), true);

  assertStrictEquals(isNegativeBigInt(Number.NaN), false);
  assertStrictEquals(isNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNegativeBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNegativeBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNegativeBigInt(undefined), false);
  assertStrictEquals(isNegativeBigInt(null), false);
  assertStrictEquals(isNegativeBigInt(true), false);
  assertStrictEquals(isNegativeBigInt(false), false);
  assertStrictEquals(isNegativeBigInt(""), false);
  assertStrictEquals(isNegativeBigInt("0"), false);
});
