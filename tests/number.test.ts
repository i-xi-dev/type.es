import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import {
  assertNumber,
  assertSafeInteger,
  isNegativeNumber,
  isNonNegativeNumber,
  isNonPositiveNumber,
  isNumber,
  isPositiveNumber,
  isSafeInteger,
} from "../mod.ts";

Deno.test("assertNumber()", () => {
  try {
    assertNumber(0, "test-1");
    assertNumber(0.5, "test-1");
    assertNumber(Number.NaN, "test-1");
    assertNumber(Number.POSITIVE_INFINITY, "test-1");
    assertNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertSafeInteger()", () => {
  try {
    assertSafeInteger(0, "test-1");
    assertSafeInteger(Number.MAX_SAFE_INTEGER, "test-1");
    assertSafeInteger(Number.MIN_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertSafeInteger(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertSafeInteger(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertSafeInteger(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertSafeInteger(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertSafeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertSafeInteger(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertSafeInteger(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("isNumber()", () => {
  assertStrictEquals(isNumber(0), true);
  assertStrictEquals(isNumber(-0), true);
  assertStrictEquals(isNumber(1), true);
  assertStrictEquals(isNumber(-1), true);

  assertStrictEquals(isNumber(-10.1), true);
  assertStrictEquals(isNumber(-9.9), true);
  assertStrictEquals(isNumber(9.9), true);
  assertStrictEquals(isNumber(10.1), true);

  assertStrictEquals(isNumber(0n), false);
  assertStrictEquals(isNumber(-0n), false);
  assertStrictEquals(isNumber(1n), false);
  assertStrictEquals(isNumber(-1n), false);

  assertStrictEquals(isNumber(Number.NaN), true);
  assertStrictEquals(isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNumber(undefined), false);
  assertStrictEquals(isNumber(null), false);
  assertStrictEquals(isNumber(true), false);
  assertStrictEquals(isNumber(false), false);
  assertStrictEquals(isNumber(""), false);
  assertStrictEquals(isNumber("0"), false);
});

Deno.test("isPositiveNumber()", () => {
  assertStrictEquals(isPositiveNumber(0), false);
  assertStrictEquals(isPositiveNumber(-0), false);
  assertStrictEquals(isPositiveNumber(1), true);
  assertStrictEquals(isPositiveNumber(-1), false);

  assertStrictEquals(isPositiveNumber(-10.1), false);
  assertStrictEquals(isPositiveNumber(-9.9), false);
  assertStrictEquals(isPositiveNumber(9.9), true);
  assertStrictEquals(isPositiveNumber(10.1), true);

  assertStrictEquals(isPositiveNumber(0n), false);
  assertStrictEquals(isPositiveNumber(-0n), false);
  assertStrictEquals(isPositiveNumber(1n), false);
  assertStrictEquals(isPositiveNumber(-1n), false);

  assertStrictEquals(isPositiveNumber(Number.NaN), false);
  assertStrictEquals(isPositiveNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isPositiveNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isPositiveNumber(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isPositiveNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isPositiveNumber(undefined), false);
  assertStrictEquals(isPositiveNumber(null), false);
  assertStrictEquals(isPositiveNumber(true), false);
  assertStrictEquals(isPositiveNumber(false), false);
  assertStrictEquals(isPositiveNumber(""), false);
  assertStrictEquals(isPositiveNumber("0"), false);
});

Deno.test("isNonNegativeNumber()", () => {
  assertStrictEquals(isNonNegativeNumber(0), true);
  assertStrictEquals(isNonNegativeNumber(-0), true);
  assertStrictEquals(isNonNegativeNumber(1), true);
  assertStrictEquals(isNonNegativeNumber(-1), false);

  assertStrictEquals(isNonNegativeNumber(-10.1), false);
  assertStrictEquals(isNonNegativeNumber(-9.9), false);
  assertStrictEquals(isNonNegativeNumber(9.9), true);
  assertStrictEquals(isNonNegativeNumber(10.1), true);

  assertStrictEquals(isNonNegativeNumber(0n), false);
  assertStrictEquals(isNonNegativeNumber(-0n), false);
  assertStrictEquals(isNonNegativeNumber(1n), false);
  assertStrictEquals(isNonNegativeNumber(-1n), false);

  assertStrictEquals(isNonNegativeNumber(Number.NaN), false);
  assertStrictEquals(isNonNegativeNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNonNegativeNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isNonNegativeNumber(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isNonNegativeNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonNegativeNumber(undefined), false);
  assertStrictEquals(isNonNegativeNumber(null), false);
  assertStrictEquals(isNonNegativeNumber(true), false);
  assertStrictEquals(isNonNegativeNumber(false), false);
  assertStrictEquals(isNonNegativeNumber(""), false);
  assertStrictEquals(isNonNegativeNumber("0"), false);
});

Deno.test("isNonPositiveNumber()", () => {
  assertStrictEquals(isNonPositiveNumber(0), true);
  assertStrictEquals(isNonPositiveNumber(-0), true);
  assertStrictEquals(isNonPositiveNumber(1), false);
  assertStrictEquals(isNonPositiveNumber(-1), true);

  assertStrictEquals(isNonPositiveNumber(-10.1), true);
  assertStrictEquals(isNonPositiveNumber(-9.9), true);
  assertStrictEquals(isNonPositiveNumber(9.9), false);
  assertStrictEquals(isNonPositiveNumber(10.1), false);

  assertStrictEquals(isNonPositiveNumber(0n), false);
  assertStrictEquals(isNonPositiveNumber(-0n), false);
  assertStrictEquals(isNonPositiveNumber(1n), false);
  assertStrictEquals(isNonPositiveNumber(-1n), false);

  assertStrictEquals(isNonPositiveNumber(Number.NaN), false);
  assertStrictEquals(isNonPositiveNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonPositiveNumber(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNonPositiveNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isNonPositiveNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNonPositiveNumber(undefined), false);
  assertStrictEquals(isNonPositiveNumber(null), false);
  assertStrictEquals(isNonPositiveNumber(true), false);
  assertStrictEquals(isNonPositiveNumber(false), false);
  assertStrictEquals(isNonPositiveNumber(""), false);
  assertStrictEquals(isNonPositiveNumber("0"), false);
});

Deno.test("isNegativeNumber()", () => {
  assertStrictEquals(isNegativeNumber(0), false);
  assertStrictEquals(isNegativeNumber(-0), false);
  assertStrictEquals(isNegativeNumber(1), false);
  assertStrictEquals(isNegativeNumber(-1), true);

  assertStrictEquals(isNegativeNumber(-10.1), true);
  assertStrictEquals(isNegativeNumber(-9.9), true);
  assertStrictEquals(isNegativeNumber(9.9), false);
  assertStrictEquals(isNegativeNumber(10.1), false);

  assertStrictEquals(isNegativeNumber(0n), false);
  assertStrictEquals(isNegativeNumber(-0n), false);
  assertStrictEquals(isNegativeNumber(1n), false);
  assertStrictEquals(isNegativeNumber(-1n), false);

  assertStrictEquals(isNegativeNumber(Number.NaN), false);
  assertStrictEquals(isNegativeNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNegativeNumber(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNegativeNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isNegativeNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNegativeNumber(undefined), false);
  assertStrictEquals(isNegativeNumber(null), false);
  assertStrictEquals(isNegativeNumber(true), false);
  assertStrictEquals(isNegativeNumber(false), false);
  assertStrictEquals(isNegativeNumber(""), false);
  assertStrictEquals(isNegativeNumber("0"), false);
});

Deno.test("isSafeInteger()", () => {
  assertStrictEquals(isSafeInteger(0), true);
  assertStrictEquals(isSafeInteger(-0), true);
  assertStrictEquals(isSafeInteger(1), true);
  assertStrictEquals(isSafeInteger(-1), true);

  assertStrictEquals(isSafeInteger(-10.1), false);
  assertStrictEquals(isSafeInteger(-9.9), false);
  assertStrictEquals(isSafeInteger(9.9), false);
  assertStrictEquals(isSafeInteger(10.1), false);

  assertStrictEquals(isSafeInteger(0n), false);
  assertStrictEquals(isSafeInteger(-0n), false);
  assertStrictEquals(isSafeInteger(1n), false);
  assertStrictEquals(isSafeInteger(-1n), false);

  assertStrictEquals(isSafeInteger(Number.NaN), false);
  assertStrictEquals(isSafeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isSafeInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isSafeInteger(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isSafeInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isSafeInteger(undefined), false);
  assertStrictEquals(isSafeInteger(null), false);
  assertStrictEquals(isSafeInteger(true), false);
  assertStrictEquals(isSafeInteger(false), false);
  assertStrictEquals(isSafeInteger(""), false);
  assertStrictEquals(isSafeInteger("0"), false);
});
