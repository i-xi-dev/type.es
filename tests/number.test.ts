import { assertStrictEquals, assertThrows, fail, unreachable } from "./deps.ts";
import {
  assertEvenSafeInteger,
  assertNegativeNumber,
  assertNegativeSafeInteger,
  assertNonNegativeNumber,
  assertNonNegativeSafeInteger,
  assertNonPositiveNumber,
  assertNonPositiveSafeInteger,
  assertNumber,
  assertOddSafeInteger,
  assertPositiveNumber,
  assertPositiveSafeInteger,
  assertSafeInteger,
  isEvenSafeInteger,
  isNegativeNumber,
  isNegativeSafeInteger,
  isNonNegativeNumber,
  isNonNegativeSafeInteger,
  isNonPositiveNumber,
  isNonPositiveSafeInteger,
  isNumber,
  isNumberInRange,
  isOddSafeInteger,
  isPositiveNumber,
  isPositiveSafeInteger,
  isSafeInteger,
  isSafeIntegerInRange,
  toClampedNumber,
  toNormalizedNumber,
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

Deno.test("assertPositiveNumber()", () => {
  try {
    assertPositiveNumber(1, "test-1");
    assertPositiveNumber(0.5, "test-1");
    assertPositiveNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertPositiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonNegativeNumber()", () => {
  try {
    assertNonNegativeNumber(1, "test-1");
    assertNonNegativeNumber(0.5, "test-1");
    assertNonNegativeNumber(0, "test-1");
    assertNonNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonNegativeNumber(-0.1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonPositiveNumber()", () => {
  try {
    assertNonPositiveNumber(-1, "test-1");
    assertNonPositiveNumber(-0.5, "test-1");
    assertNonPositiveNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonPositiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNegativeNumber()", () => {
  try {
    assertNegativeNumber(-1, "test-1");
    assertNegativeNumber(-0.5, "test-1");
    assertNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNegativeNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeNumber(new Number(0), "test-1");
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

Deno.test("assertPositiveSafeInteger()", () => {
  try {
    assertPositiveSafeInteger(1, "test-1");
    assertPositiveSafeInteger(Number.MAX_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertPositiveSafeInteger(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertPositiveSafeInteger(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonNegativeSafeInteger()", () => {
  try {
    assertNonNegativeSafeInteger(0, "test-1");
    assertNonNegativeSafeInteger(1, "test-1");
    assertNonNegativeSafeInteger(Number.MAX_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonNegativeSafeInteger(-1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonNegativeSafeInteger(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonPositiveSafeInteger()", () => {
  try {
    assertNonPositiveSafeInteger(0, "test-1");
    assertNonPositiveSafeInteger(-1, "test-1");
    assertNonPositiveSafeInteger(Number.MIN_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonPositiveSafeInteger(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonPositiveSafeInteger(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNegativeSafeInteger()", () => {
  try {
    assertNegativeSafeInteger(-1, "test-1");
    assertNegativeSafeInteger(Number.MIN_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNegativeSafeInteger(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNegativeSafeInteger(new Number(0), "test-1");
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

Deno.test("isPositiveSafeInteger()", () => {
  assertStrictEquals(isPositiveSafeInteger(0), false);
  assertStrictEquals(isPositiveSafeInteger(-0), false);
  assertStrictEquals(isPositiveSafeInteger(1), true);
  assertStrictEquals(isPositiveSafeInteger(-1), false);

  assertStrictEquals(isPositiveSafeInteger(-10.1), false);
  assertStrictEquals(isPositiveSafeInteger(-9.9), false);
  assertStrictEquals(isPositiveSafeInteger(9.9), false);
  assertStrictEquals(isPositiveSafeInteger(10.1), false);

  assertStrictEquals(isPositiveSafeInteger(0n), false);
  assertStrictEquals(isPositiveSafeInteger(-0n), false);
  assertStrictEquals(isPositiveSafeInteger(1n), false);
  assertStrictEquals(isPositiveSafeInteger(-1n), false);

  assertStrictEquals(isPositiveSafeInteger(Number.NaN), false);
  assertStrictEquals(isPositiveSafeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isPositiveSafeInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isPositiveSafeInteger(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isPositiveSafeInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isPositiveSafeInteger(undefined), false);
  assertStrictEquals(isPositiveSafeInteger(null), false);
  assertStrictEquals(isPositiveSafeInteger(true), false);
  assertStrictEquals(isPositiveSafeInteger(false), false);
  assertStrictEquals(isPositiveSafeInteger(""), false);
  assertStrictEquals(isPositiveSafeInteger("0"), false);
});

Deno.test("isNonNegativeSafeInteger()", () => {
  assertStrictEquals(isNonNegativeSafeInteger(0), true);
  assertStrictEquals(isNonNegativeSafeInteger(-0), true);
  assertStrictEquals(isNonNegativeSafeInteger(1), true);
  assertStrictEquals(isNonNegativeSafeInteger(-1), false);

  assertStrictEquals(isNonNegativeSafeInteger(-10.1), false);
  assertStrictEquals(isNonNegativeSafeInteger(-9.9), false);
  assertStrictEquals(isNonNegativeSafeInteger(9.9), false);
  assertStrictEquals(isNonNegativeSafeInteger(10.1), false);

  assertStrictEquals(isNonNegativeSafeInteger(0n), false);
  assertStrictEquals(isNonNegativeSafeInteger(-0n), false);
  assertStrictEquals(isNonNegativeSafeInteger(1n), false);
  assertStrictEquals(isNonNegativeSafeInteger(-1n), false);

  assertStrictEquals(isNonNegativeSafeInteger(Number.NaN), false);
  assertStrictEquals(isNonNegativeSafeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonNegativeSafeInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isNonNegativeSafeInteger(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isNonNegativeSafeInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonNegativeSafeInteger(undefined), false);
  assertStrictEquals(isNonNegativeSafeInteger(null), false);
  assertStrictEquals(isNonNegativeSafeInteger(true), false);
  assertStrictEquals(isNonNegativeSafeInteger(false), false);
  assertStrictEquals(isNonNegativeSafeInteger(""), false);
  assertStrictEquals(isNonNegativeSafeInteger("0"), false);
});

Deno.test("isNonPositiveSafeInteger()", () => {
  assertStrictEquals(isNonPositiveSafeInteger(0), true);
  assertStrictEquals(isNonPositiveSafeInteger(-0), true);
  assertStrictEquals(isNonPositiveSafeInteger(1), false);
  assertStrictEquals(isNonPositiveSafeInteger(-1), true);

  assertStrictEquals(isNonPositiveSafeInteger(-10.1), false);
  assertStrictEquals(isNonPositiveSafeInteger(-9.9), false);
  assertStrictEquals(isNonPositiveSafeInteger(9.9), false);
  assertStrictEquals(isNonPositiveSafeInteger(10.1), false);

  assertStrictEquals(isNonPositiveSafeInteger(0n), false);
  assertStrictEquals(isNonPositiveSafeInteger(-0n), false);
  assertStrictEquals(isNonPositiveSafeInteger(1n), false);
  assertStrictEquals(isNonPositiveSafeInteger(-1n), false);

  assertStrictEquals(isNonPositiveSafeInteger(Number.NaN), false);
  assertStrictEquals(isNonPositiveSafeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonPositiveSafeInteger(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNonPositiveSafeInteger(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isNonPositiveSafeInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonPositiveSafeInteger(undefined), false);
  assertStrictEquals(isNonPositiveSafeInteger(null), false);
  assertStrictEquals(isNonPositiveSafeInteger(true), false);
  assertStrictEquals(isNonPositiveSafeInteger(false), false);
  assertStrictEquals(isNonPositiveSafeInteger(""), false);
  assertStrictEquals(isNonPositiveSafeInteger("0"), false);
});

Deno.test("isNegativeSafeInteger()", () => {
  assertStrictEquals(isNegativeSafeInteger(0), false);
  assertStrictEquals(isNegativeSafeInteger(-0), false);
  assertStrictEquals(isNegativeSafeInteger(1), false);
  assertStrictEquals(isNegativeSafeInteger(-1), true);

  assertStrictEquals(isNegativeSafeInteger(-10.1), false);
  assertStrictEquals(isNegativeSafeInteger(-9.9), false);
  assertStrictEquals(isNegativeSafeInteger(9.9), false);
  assertStrictEquals(isNegativeSafeInteger(10.1), false);

  assertStrictEquals(isNegativeSafeInteger(0n), false);
  assertStrictEquals(isNegativeSafeInteger(-0n), false);
  assertStrictEquals(isNegativeSafeInteger(1n), false);
  assertStrictEquals(isNegativeSafeInteger(-1n), false);

  assertStrictEquals(isNegativeSafeInteger(Number.NaN), false);
  assertStrictEquals(isNegativeSafeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNegativeSafeInteger(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNegativeSafeInteger(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isNegativeSafeInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNegativeSafeInteger(undefined), false);
  assertStrictEquals(isNegativeSafeInteger(null), false);
  assertStrictEquals(isNegativeSafeInteger(true), false);
  assertStrictEquals(isNegativeSafeInteger(false), false);
  assertStrictEquals(isNegativeSafeInteger(""), false);
  assertStrictEquals(isNegativeSafeInteger("0"), false);
});

Deno.test("isOddSafeInteger()", () => {
  assertStrictEquals(isOddSafeInteger(0), false);
  assertStrictEquals(isOddSafeInteger(-0), false);
  assertStrictEquals(isOddSafeInteger(1), true);
  assertStrictEquals(isOddSafeInteger(-1), true);
  assertStrictEquals(isOddSafeInteger(2), false);
  assertStrictEquals(isOddSafeInteger(-2), false);
  assertStrictEquals(isOddSafeInteger(3), true);
  assertStrictEquals(isOddSafeInteger(-3), true);
  assertStrictEquals(isOddSafeInteger(4), false);
  assertStrictEquals(isOddSafeInteger(-4), false);
});

Deno.test("isEvenSafeInteger()", () => {
  assertStrictEquals(isEvenSafeInteger(0), true);
  assertStrictEquals(isEvenSafeInteger(-0), true);
  assertStrictEquals(isEvenSafeInteger(1), false);
  assertStrictEquals(isEvenSafeInteger(-1), false);
  assertStrictEquals(isEvenSafeInteger(2), true);
  assertStrictEquals(isEvenSafeInteger(-2), true);
  assertStrictEquals(isEvenSafeInteger(3), false);
  assertStrictEquals(isEvenSafeInteger(-3), false);
  assertStrictEquals(isEvenSafeInteger(4), true);
  assertStrictEquals(isEvenSafeInteger(-4), true);
});

Deno.test("assertOddSafeInteger()", () => {
  try {
    assertOddSafeInteger(1, "test-1");
    assertOddSafeInteger(-1, "test-1");
    assertOddSafeInteger(3, "test-1");
    assertOddSafeInteger(-3, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertOddSafeInteger(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertOddSafeInteger(2, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertEvenSafeInteger()", () => {
  try {
    assertEvenSafeInteger(0, "test-1");
    assertEvenSafeInteger(-0, "test-1");
    assertEvenSafeInteger(2, "test-1");
    assertEvenSafeInteger(-2, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertEvenSafeInteger(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertEvenSafeInteger(-1, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("isNumberInRange()", () => {
  assertStrictEquals(isNumberInRange(0, 0, 0), true);
  assertStrictEquals(isNumberInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(isNumberInRange(0, 0, 1), true);
  assertStrictEquals(isNumberInRange(0, -1, 0), true);
  assertStrictEquals(isNumberInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(isNumberInRange(0, 1, 1), false);
  assertStrictEquals(isNumberInRange(0, -1, -1), false);

  assertStrictEquals(isNumberInRange(0.5, 0, 0), false);
  assertStrictEquals(isNumberInRange(0.5, 1, 0), false); // 負のrange
  assertStrictEquals(isNumberInRange(0.5, 0, 1), true);
  assertStrictEquals(isNumberInRange(0.5, -1, 0), false);
  assertStrictEquals(isNumberInRange(0.5, 0, -1), false); // 負のrange
  assertStrictEquals(isNumberInRange(0.5, 1, 1), false);
  assertStrictEquals(isNumberInRange(0.5, -1, -1), false);

  assertStrictEquals(isNumberInRange(1, 0, 0), false);
  assertStrictEquals(isNumberInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(isNumberInRange(1, 0, 1), true);
  assertStrictEquals(isNumberInRange(1, -1, 0), false);
  assertStrictEquals(isNumberInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(isNumberInRange(1, 1, 1), true);
  assertStrictEquals(isNumberInRange(1, -1, -1), false);

  assertStrictEquals(isNumberInRange(-0.5, 0, 0), false);
  assertStrictEquals(isNumberInRange(-0.5, 1, 0), false); // 負のrange
  assertStrictEquals(isNumberInRange(-0.5, 0, 1), false);
  assertStrictEquals(isNumberInRange(-0.5, -1, 0), true);
  assertStrictEquals(isNumberInRange(-0.5, 0, -1), false); // 負のrange
  assertStrictEquals(isNumberInRange(-0.5, 1, 1), false);
  assertStrictEquals(isNumberInRange(-0.5, -1, -1), false);

  assertStrictEquals(isNumberInRange(-1, 0, 0), false);
  assertStrictEquals(isNumberInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(isNumberInRange(-1, 0, 1), false);
  assertStrictEquals(isNumberInRange(-1, -1, 0), true);
  assertStrictEquals(isNumberInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(isNumberInRange(-1, 1, 1), false);
  assertStrictEquals(isNumberInRange(-1, -1, -1), true);

  assertStrictEquals(isNumberInRange(0n, 0, 0), false);
  assertStrictEquals(isNumberInRange(0, -0.5, 0.5), true);

  assertStrictEquals(isNumberInRange(0, 0, Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isNumberInRange(0, 0, Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNumberInRange(0, 0, Number.NaN), false);
  assertStrictEquals(isNumberInRange(0, Number.MIN_SAFE_INTEGER, 0), true);
  assertStrictEquals(isNumberInRange(0, Number.NEGATIVE_INFINITY, 0), true);
  assertStrictEquals(isNumberInRange(0, Number.NaN, 0), false);

  assertStrictEquals(isNumberInRange(0, 1, Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNumberInRange(0, 1, Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNumberInRange(0, 1, Number.NaN), false);
  assertStrictEquals(isNumberInRange(0, Number.MIN_SAFE_INTEGER, 1), true);
  assertStrictEquals(isNumberInRange(0, Number.NEGATIVE_INFINITY, 1), true);
  assertStrictEquals(isNumberInRange(0, Number.NaN, 1), false);

  assertStrictEquals(isNumberInRange(0, -1, Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isNumberInRange(0, -1, Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNumberInRange(0, -1, Number.NaN), false);
  assertStrictEquals(isNumberInRange(0, Number.MIN_SAFE_INTEGER, -1), false);
  assertStrictEquals(isNumberInRange(0, Number.NEGATIVE_INFINITY, -1), false);
  assertStrictEquals(isNumberInRange(0, Number.NaN, -1), false);
});

Deno.test("isSafeIntegerInRange()", () => {
  assertStrictEquals(isSafeIntegerInRange(0, 0, 0), true);
  assertStrictEquals(isSafeIntegerInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(isSafeIntegerInRange(0, 0, 1), true);
  assertStrictEquals(isSafeIntegerInRange(0, -1, 0), true);
  assertStrictEquals(isSafeIntegerInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(isSafeIntegerInRange(0, 1, 1), false);
  assertStrictEquals(isSafeIntegerInRange(0, -1, -1), false);

  assertStrictEquals(isSafeIntegerInRange(1, 0, 0), false);
  assertStrictEquals(isSafeIntegerInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(isSafeIntegerInRange(1, 0, 1), true);
  assertStrictEquals(isSafeIntegerInRange(1, -1, 0), false);
  assertStrictEquals(isSafeIntegerInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(isSafeIntegerInRange(1, 1, 1), true);
  assertStrictEquals(isSafeIntegerInRange(1, -1, -1), false);

  assertStrictEquals(isSafeIntegerInRange(-1, 0, 0), false);
  assertStrictEquals(isSafeIntegerInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(isSafeIntegerInRange(-1, 0, 1), false);
  assertStrictEquals(isSafeIntegerInRange(-1, -1, 0), true);
  assertStrictEquals(isSafeIntegerInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(isSafeIntegerInRange(-1, 1, 1), false);
  assertStrictEquals(isSafeIntegerInRange(-1, -1, -1), true);

  assertStrictEquals(isSafeIntegerInRange(0n, 0, 0), false);
  assertStrictEquals(isSafeIntegerInRange(0.5, -1, 1), false);

  assertStrictEquals(isSafeIntegerInRange(0, 0, Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(
    isSafeIntegerInRange(0, 0, Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(isSafeIntegerInRange(0, 0, Number.NaN), false);
  assertStrictEquals(isSafeIntegerInRange(0, Number.MIN_SAFE_INTEGER, 0), true);
  assertStrictEquals(
    isSafeIntegerInRange(0, Number.NEGATIVE_INFINITY, 0),
    true,
  );
  assertStrictEquals(isSafeIntegerInRange(0, Number.NaN, 0), false);

  assertStrictEquals(
    isSafeIntegerInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    isSafeIntegerInRange(0, 1, Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(isSafeIntegerInRange(0, 1, Number.NaN), false);
  assertStrictEquals(isSafeIntegerInRange(0, Number.MIN_SAFE_INTEGER, 1), true);
  assertStrictEquals(
    isSafeIntegerInRange(0, Number.NEGATIVE_INFINITY, 1),
    true,
  );
  assertStrictEquals(isSafeIntegerInRange(0, Number.NaN, 1), false);

  assertStrictEquals(
    isSafeIntegerInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    isSafeIntegerInRange(0, -1, Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(isSafeIntegerInRange(0, -1, Number.NaN), false);
  assertStrictEquals(
    isSafeIntegerInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );
  assertStrictEquals(
    isSafeIntegerInRange(0, Number.NEGATIVE_INFINITY, -1),
    false,
  );
  assertStrictEquals(isSafeIntegerInRange(0, Number.NaN, -1), false);
});

Deno.test("toNormalizedNumber()", () => {
  assertStrictEquals(Object.is(toNormalizedNumber(0), 0), true);
  assertStrictEquals(Object.is(toNormalizedNumber(-0), 0), true);
  assertStrictEquals(Object.is(toNormalizedNumber(-0), -0), false);

  assertStrictEquals(
    toNormalizedNumber(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    toNormalizedNumber(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );
  assertStrictEquals(toNormalizedNumber(Number.NaN), Number.NaN);
  assertStrictEquals(
    toNormalizedNumber(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    toNormalizedNumber(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );
});

Deno.test("toClampedNumber()", () => {
  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(toClampedNumber(0, 0, 0), 0);
  assertStrictEquals(toClampedNumber(0, 0, 1), 0);
  assertStrictEquals(toClampedNumber(0, -1, 0), 0);
  assertStrictEquals(toClampedNumber(0, 1, 1), 1);
  assertStrictEquals(toClampedNumber(0, -1, -1), -1);

  assertThrows(
    () => {
      toClampedNumber(0, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      toClampedNumber(0, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(toClampedNumber(0.5, 0, 0), 0);
  assertStrictEquals(toClampedNumber(0.5, 0, 1), 0.5);
  assertStrictEquals(toClampedNumber(0.5, -1, 0), 0);
  assertStrictEquals(toClampedNumber(0.5, 1, 1), 1);
  assertStrictEquals(toClampedNumber(0.5, -1, -1), -1);

  assertStrictEquals(toClampedNumber(1, 0, 0), 0);
  assertStrictEquals(toClampedNumber(1, 0, 1), 1);
  assertStrictEquals(toClampedNumber(1, -1, 0), 0);
  assertStrictEquals(toClampedNumber(1, 1, 1), 1);
  assertStrictEquals(toClampedNumber(1, -1, -1), -1);

  assertThrows(
    () => {
      toClampedNumber(1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      toClampedNumber(1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(toClampedNumber(-0.5, 0, 0), 0);
  assertStrictEquals(toClampedNumber(-0.5, 0, 1), 0);
  assertStrictEquals(toClampedNumber(-0.5, -1, 0), -0.5);
  assertStrictEquals(toClampedNumber(-0.5, 1, 1), 1);
  assertStrictEquals(toClampedNumber(-0.5, -1, -1), -1);

  assertStrictEquals(toClampedNumber(-1, 0, 0), 0);
  assertStrictEquals(toClampedNumber(-1, 0, 1), 0);
  assertStrictEquals(toClampedNumber(-1, -1, 0), -1);
  assertStrictEquals(toClampedNumber(-1, 1, 1), 1);
  assertStrictEquals(toClampedNumber(-1, -1, -1), -1);

  assertThrows(
    () => {
      toClampedNumber(-1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      toClampedNumber(-1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );
});
