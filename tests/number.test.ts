import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import {
  assertNumber,
  assertSafeInteger,
  isNumber,
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
