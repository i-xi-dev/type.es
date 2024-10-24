import { assertStrictEquals, assertThrows, fail, unreachable } from "./deps.ts";
import { BigIntType } from "../mod.ts";

Deno.test("BigIntType.assertBigInt()", () => {
  try {
    BigIntType.assertBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.assertPositive()", () => {
  try {
    BigIntType.assertPositive(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertPositive(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.assertNonNegative()", () => {
  try {
    BigIntType.assertNonNegative(1n, "test-1");
    BigIntType.assertNonNegative(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertNonNegative(-1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertNonNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertNonNegative(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.assertNonPositive()", () => {
  try {
    BigIntType.assertNonPositive(-1n, "test-1");
    BigIntType.assertNonPositive(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertNonPositive(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertNonPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertNonPositive(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.assertNegative()", () => {
  try {
    BigIntType.assertNegative(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertNegative(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.isBigInt()", () => {
  assertStrictEquals(BigIntType.isBigInt(0), false);
  assertStrictEquals(BigIntType.isBigInt(-0), false);
  assertStrictEquals(BigIntType.isBigInt(1), false);
  assertStrictEquals(BigIntType.isBigInt(-1), false);

  assertStrictEquals(BigIntType.isBigInt(-10.1), false);
  assertStrictEquals(BigIntType.isBigInt(-9.9), false);
  assertStrictEquals(BigIntType.isBigInt(9.9), false);
  assertStrictEquals(BigIntType.isBigInt(10.1), false);

  assertStrictEquals(BigIntType.isBigInt(0n), true);
  assertStrictEquals(BigIntType.isBigInt(-0n), true);
  assertStrictEquals(BigIntType.isBigInt(1n), true);
  assertStrictEquals(BigIntType.isBigInt(-1n), true);

  assertStrictEquals(BigIntType.isBigInt(Number.NaN), false);
  assertStrictEquals(BigIntType.isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(BigIntType.isBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(BigIntType.isBigInt(undefined), false);
  assertStrictEquals(BigIntType.isBigInt(null), false);
  assertStrictEquals(BigIntType.isBigInt(true), false);
  assertStrictEquals(BigIntType.isBigInt(false), false);
  assertStrictEquals(BigIntType.isBigInt(""), false);
  assertStrictEquals(BigIntType.isBigInt("0"), false);
});

Deno.test("BigIntType.isPositive()", () => {
  assertStrictEquals(BigIntType.isPositive(0), false);
  assertStrictEquals(BigIntType.isPositive(-0), false);
  assertStrictEquals(BigIntType.isPositive(1), false);
  assertStrictEquals(BigIntType.isPositive(-1), false);

  assertStrictEquals(BigIntType.isPositive(-10.1), false);
  assertStrictEquals(BigIntType.isPositive(-9.9), false);
  assertStrictEquals(BigIntType.isPositive(9.9), false);
  assertStrictEquals(BigIntType.isPositive(10.1), false);

  assertStrictEquals(BigIntType.isPositive(0n), false);
  assertStrictEquals(BigIntType.isPositive(-0n), false);
  assertStrictEquals(BigIntType.isPositive(1n), true);
  assertStrictEquals(BigIntType.isPositive(-1n), false);

  assertStrictEquals(BigIntType.isPositive(Number.NaN), false);
  assertStrictEquals(BigIntType.isPositive(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(BigIntType.isPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(BigIntType.isPositive(undefined), false);
  assertStrictEquals(BigIntType.isPositive(null), false);
  assertStrictEquals(BigIntType.isPositive(true), false);
  assertStrictEquals(BigIntType.isPositive(false), false);
  assertStrictEquals(BigIntType.isPositive(""), false);
  assertStrictEquals(BigIntType.isPositive("0"), false);
});

Deno.test("BigIntType.isNonNegative()", () => {
  assertStrictEquals(BigIntType.isNonNegative(0), false);
  assertStrictEquals(BigIntType.isNonNegative(-0), false);
  assertStrictEquals(BigIntType.isNonNegative(1), false);
  assertStrictEquals(BigIntType.isNonNegative(-1), false);

  assertStrictEquals(BigIntType.isNonNegative(-10.1), false);
  assertStrictEquals(BigIntType.isNonNegative(-9.9), false);
  assertStrictEquals(BigIntType.isNonNegative(9.9), false);
  assertStrictEquals(BigIntType.isNonNegative(10.1), false);

  assertStrictEquals(BigIntType.isNonNegative(0n), true);
  assertStrictEquals(BigIntType.isNonNegative(-0n), true);
  assertStrictEquals(BigIntType.isNonNegative(1n), true);
  assertStrictEquals(BigIntType.isNonNegative(-1n), false);

  assertStrictEquals(BigIntType.isNonNegative(Number.NaN), false);
  assertStrictEquals(BigIntType.isNonNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(BigIntType.isNonNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(BigIntType.isNonNegative(undefined), false);
  assertStrictEquals(BigIntType.isNonNegative(null), false);
  assertStrictEquals(BigIntType.isNonNegative(true), false);
  assertStrictEquals(BigIntType.isNonNegative(false), false);
  assertStrictEquals(BigIntType.isNonNegative(""), false);
  assertStrictEquals(BigIntType.isNonNegative("0"), false);
});

Deno.test("BigIntType.isNonPositive()", () => {
  assertStrictEquals(BigIntType.isNonPositive(0), false);
  assertStrictEquals(BigIntType.isNonPositive(-0), false);
  assertStrictEquals(BigIntType.isNonPositive(1), false);
  assertStrictEquals(BigIntType.isNonPositive(-1), false);

  assertStrictEquals(BigIntType.isNonPositive(-10.1), false);
  assertStrictEquals(BigIntType.isNonPositive(-9.9), false);
  assertStrictEquals(BigIntType.isNonPositive(9.9), false);
  assertStrictEquals(BigIntType.isNonPositive(10.1), false);

  assertStrictEquals(BigIntType.isNonPositive(0n), true);
  assertStrictEquals(BigIntType.isNonPositive(-0n), true);
  assertStrictEquals(BigIntType.isNonPositive(1n), false);
  assertStrictEquals(BigIntType.isNonPositive(-1n), true);

  assertStrictEquals(BigIntType.isNonPositive(Number.NaN), false);
  assertStrictEquals(BigIntType.isNonPositive(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(BigIntType.isNonPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isNonPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isNonPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(BigIntType.isNonPositive(undefined), false);
  assertStrictEquals(BigIntType.isNonPositive(null), false);
  assertStrictEquals(BigIntType.isNonPositive(true), false);
  assertStrictEquals(BigIntType.isNonPositive(false), false);
  assertStrictEquals(BigIntType.isNonPositive(""), false);
  assertStrictEquals(BigIntType.isNonPositive("0"), false);
});

Deno.test("BigIntType.isNegative()", () => {
  assertStrictEquals(BigIntType.isNegative(0), false);
  assertStrictEquals(BigIntType.isNegative(-0), false);
  assertStrictEquals(BigIntType.isNegative(1), false);
  assertStrictEquals(BigIntType.isNegative(-1), false);

  assertStrictEquals(BigIntType.isNegative(-10.1), false);
  assertStrictEquals(BigIntType.isNegative(-9.9), false);
  assertStrictEquals(BigIntType.isNegative(9.9), false);
  assertStrictEquals(BigIntType.isNegative(10.1), false);

  assertStrictEquals(BigIntType.isNegative(0n), false);
  assertStrictEquals(BigIntType.isNegative(-0n), false);
  assertStrictEquals(BigIntType.isNegative(1n), false);
  assertStrictEquals(BigIntType.isNegative(-1n), true);

  assertStrictEquals(BigIntType.isNegative(Number.NaN), false);
  assertStrictEquals(BigIntType.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(BigIntType.isNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(BigIntType.isNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(BigIntType.isNegative(undefined), false);
  assertStrictEquals(BigIntType.isNegative(null), false);
  assertStrictEquals(BigIntType.isNegative(true), false);
  assertStrictEquals(BigIntType.isNegative(false), false);
  assertStrictEquals(BigIntType.isNegative(""), false);
  assertStrictEquals(BigIntType.isNegative("0"), false);
});

Deno.test("BigIntType.isOdd()", () => {
  assertStrictEquals(BigIntType.isOdd(0n), false);
  assertStrictEquals(BigIntType.isOdd(-0n), false);
  assertStrictEquals(BigIntType.isOdd(1n), true);
  assertStrictEquals(BigIntType.isOdd(-1n), true);
  assertStrictEquals(BigIntType.isOdd(2n), false);
  assertStrictEquals(BigIntType.isOdd(-2n), false);
  assertStrictEquals(BigIntType.isOdd(3n), true);
  assertStrictEquals(BigIntType.isOdd(-3n), true);
  assertStrictEquals(BigIntType.isOdd(4n), false);
  assertStrictEquals(BigIntType.isOdd(-4n), false);
});

Deno.test("BigIntType.isEven()", () => {
  assertStrictEquals(BigIntType.isEven(0n), true);
  assertStrictEquals(BigIntType.isEven(-0n), true);
  assertStrictEquals(BigIntType.isEven(1n), false);
  assertStrictEquals(BigIntType.isEven(-1n), false);
  assertStrictEquals(BigIntType.isEven(2n), true);
  assertStrictEquals(BigIntType.isEven(-2n), true);
  assertStrictEquals(BigIntType.isEven(3n), false);
  assertStrictEquals(BigIntType.isEven(-3n), false);
  assertStrictEquals(BigIntType.isEven(4n), true);
  assertStrictEquals(BigIntType.isEven(-4n), true);
});

Deno.test("BigIntType.assertOdd()", () => {
  try {
    BigIntType.assertOdd(1n, "test-1");
    BigIntType.assertOdd(-1n, "test-1");
    BigIntType.assertOdd(3n, "test-1");
    BigIntType.assertOdd(-3n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertOdd(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertOdd(2n, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.assertEven()", () => {
  try {
    BigIntType.assertEven(0n, "test-1");
    BigIntType.assertEven(-0n, "test-1");
    BigIntType.assertEven(2n, "test-1");
    BigIntType.assertEven(-2n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assertEven(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assertEven(-1n, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("BigIntType.minOf()", () => {
  assertStrictEquals(BigIntType.minOf(0n), 0n);
  assertStrictEquals(BigIntType.minOf(1n), 1n);
  assertStrictEquals(BigIntType.minOf(-1n), -1n);

  assertStrictEquals(BigIntType.minOf(0n, 1n), 0n);
  assertStrictEquals(BigIntType.minOf(0n, -1n), -1n);

  assertStrictEquals(BigIntType.minOf(2n, 0n, 1n), 0n);
  assertStrictEquals(BigIntType.minOf(2n, 0n, -1n), -1n);
  assertStrictEquals(BigIntType.minOf(0n, 1n, 2n), 0n);
  assertStrictEquals(BigIntType.minOf(0n, -1n, 2n), -1n);
  assertStrictEquals(BigIntType.minOf(1n, 2n, 0n), 0n);
  assertStrictEquals(BigIntType.minOf(-1n, 2n, 0n), -1n);

  assertStrictEquals(BigIntType.minOf(-2n, 0n, 1n), -2n);
  assertStrictEquals(BigIntType.minOf(-2n, 0n, -1n), -2n);
  assertStrictEquals(BigIntType.minOf(0n, 1n, -2n), -2n);
  assertStrictEquals(BigIntType.minOf(0n, -1n, -2n), -2n);
  assertStrictEquals(BigIntType.minOf(1n, -2n, 0n), -2n);
  assertStrictEquals(BigIntType.minOf(-1n, -2n, 0n), -2n);
});

Deno.test("BigIntType.maxOf()", () => {
  assertStrictEquals(BigIntType.maxOf(0n), 0n);
  assertStrictEquals(BigIntType.maxOf(1n), 1n);
  assertStrictEquals(BigIntType.maxOf(-1n), -1n);

  assertStrictEquals(BigIntType.maxOf(0n, 1n), 1n);
  assertStrictEquals(BigIntType.maxOf(0n, -1n), 0n);

  assertStrictEquals(BigIntType.maxOf(2n, 0n, 1n), 2n);
  assertStrictEquals(BigIntType.maxOf(2n, 0n, -1n), 2n);
  assertStrictEquals(BigIntType.maxOf(0n, 1n, 2n), 2n);
  assertStrictEquals(BigIntType.maxOf(0n, -1n, 2n), 2n);
  assertStrictEquals(BigIntType.maxOf(1n, 2n, 0n), 2n);
  assertStrictEquals(BigIntType.maxOf(-1n, 2n, 0n), 2n);

  assertStrictEquals(BigIntType.maxOf(-2n, 0n, 1n), 1n);
  assertStrictEquals(BigIntType.maxOf(-2n, 0n, -1n), 0n);
  assertStrictEquals(BigIntType.maxOf(0n, 1n, -2n), 1n);
  assertStrictEquals(BigIntType.maxOf(0n, -1n, -2n), 0n);
  assertStrictEquals(BigIntType.maxOf(1n, -2n, 0n), 1n);
  assertStrictEquals(BigIntType.maxOf(-1n, -2n, 0n), 0n);
});

Deno.test("BigIntType.isInRange()", () => {
  assertStrictEquals(BigIntType.isInRange(0n, 0n, 0n), true);
  assertStrictEquals(BigIntType.isInRange(0n, 1n, 0n), false); // 負のrange
  assertStrictEquals(BigIntType.isInRange(0n, 0n, 1n), true);
  assertStrictEquals(BigIntType.isInRange(0n, -1n, 0n), true);
  assertStrictEquals(BigIntType.isInRange(0n, 0n, -1n), false); // 負のrange
  assertStrictEquals(BigIntType.isInRange(0n, 1n, 1n), false);
  assertStrictEquals(BigIntType.isInRange(0n, -1n, -1n), false);

  assertStrictEquals(BigIntType.isInRange(1n, 0n, 0n), false);
  assertStrictEquals(BigIntType.isInRange(1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(BigIntType.isInRange(1n, 0n, 1n), true);
  assertStrictEquals(BigIntType.isInRange(1n, -1n, 0n), false);
  assertStrictEquals(BigIntType.isInRange(1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(BigIntType.isInRange(1n, 1n, 1n), true);
  assertStrictEquals(BigIntType.isInRange(1n, -1n, -1n), false);

  assertStrictEquals(BigIntType.isInRange(-1n, 0n, 0n), false);
  assertStrictEquals(BigIntType.isInRange(-1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(BigIntType.isInRange(-1n, 0n, 1n), false);
  assertStrictEquals(BigIntType.isInRange(-1n, -1n, 0n), true);
  assertStrictEquals(BigIntType.isInRange(-1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(BigIntType.isInRange(-1n, 1n, 1n), false);
  assertStrictEquals(BigIntType.isInRange(-1n, -1n, -1n), true);

  assertStrictEquals(BigIntType.isInRange(0, 0n, 0n), false);
});

Deno.test("BigIntType.toClamped()", () => {
  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(BigIntType.toClamped(0n, 0n, 0n), 0n);
  assertStrictEquals(BigIntType.toClamped(0n, 0n, 1n), 0n);
  assertStrictEquals(BigIntType.toClamped(0n, -1n, 0n), 0n);
  assertStrictEquals(BigIntType.toClamped(0n, 1n, 1n), 1n);
  assertStrictEquals(BigIntType.toClamped(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntType.toClamped(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.toClamped(0n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigIntType.toClamped(1n, 0n, 0n), 0n);
  assertStrictEquals(BigIntType.toClamped(1n, 0n, 1n), 1n);
  assertStrictEquals(BigIntType.toClamped(1n, -1n, 0n), 0n);
  assertStrictEquals(BigIntType.toClamped(1n, 1n, 1n), 1n);
  assertStrictEquals(BigIntType.toClamped(1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntType.toClamped(1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.toClamped(1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigIntType.toClamped(-1n, 0n, 0n), 0n);
  assertStrictEquals(BigIntType.toClamped(-1n, 0n, 1n), 0n);
  assertStrictEquals(BigIntType.toClamped(-1n, -1n, 0n), -1n);
  assertStrictEquals(BigIntType.toClamped(-1n, 1n, 1n), 1n);
  assertStrictEquals(BigIntType.toClamped(-1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntType.toClamped(-1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.toClamped(-1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );
});

Deno.test("BigIntType.fromString()", () => {
  assertStrictEquals(BigIntType.fromString("0"), 0n);
  assertStrictEquals(BigIntType.fromString("-0"), 0n);
  assertStrictEquals(BigIntType.fromString("+0"), 0n);
  assertStrictEquals(BigIntType.fromString("1"), 1n);
  assertStrictEquals(BigIntType.fromString("-1"), -1n);
});
