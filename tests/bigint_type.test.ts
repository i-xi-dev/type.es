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
  assertStrictEquals(BigIntType.fromString("+1"), 1n);
  assertStrictEquals(BigIntType.fromString("2"), 2n);
  assertStrictEquals(BigIntType.fromString("-2"), -2n);
  assertStrictEquals(BigIntType.fromString("3"), 3n);
  assertStrictEquals(BigIntType.fromString("-3"), -3n);
  assertStrictEquals(BigIntType.fromString("4"), 4n);
  assertStrictEquals(BigIntType.fromString("-4"), -4n);
  assertStrictEquals(BigIntType.fromString("5"), 5n);
  assertStrictEquals(BigIntType.fromString("-5"), -5n);
  assertStrictEquals(BigIntType.fromString("6"), 6n);
  assertStrictEquals(BigIntType.fromString("-6"), -6n);
  assertStrictEquals(BigIntType.fromString("7"), 7n);
  assertStrictEquals(BigIntType.fromString("-7"), -7n);
  assertStrictEquals(BigIntType.fromString("8"), 8n);
  assertStrictEquals(BigIntType.fromString("-8"), -8n);
  assertStrictEquals(BigIntType.fromString("9"), 9n);
  assertStrictEquals(BigIntType.fromString("-9"), -9n);
  assertStrictEquals(BigIntType.fromString("10"), 10n);
  assertStrictEquals(BigIntType.fromString("-10"), -10n);
  
  assertStrictEquals(BigIntType.fromString("+111"), 111n);
  
  const e1 = "`value` must be a decimal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("A" as unknown as string);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 2", () => {
  assertStrictEquals(BigIntType.fromString("0", 2), 0n);
  assertStrictEquals(BigIntType.fromString("-0", 2), 0n);
  assertStrictEquals(BigIntType.fromString("+0", 2), 0n);
  assertStrictEquals(BigIntType.fromString("1", 2), 1n);
  assertStrictEquals(BigIntType.fromString("-1", 2), -1n);
  assertStrictEquals(BigIntType.fromString("+1", 2), 1n);
  assertStrictEquals(BigIntType.fromString("10", 2), 2n);
  assertStrictEquals(BigIntType.fromString("-10", 2), -2n);

  assertStrictEquals(BigIntType.fromString("+111", 2), 7n);
  
  const e1 = "`value` must be a binary representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, 2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, 2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("2" as unknown as string, 2);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 8", () => {
  assertStrictEquals(BigIntType.fromString("0", 8), 0n);
  assertStrictEquals(BigIntType.fromString("-0", 8), 0n);
  assertStrictEquals(BigIntType.fromString("+0", 8), 0n);
  assertStrictEquals(BigIntType.fromString("1", 8), 1n);
  assertStrictEquals(BigIntType.fromString("-1", 8), -1n);
  assertStrictEquals(BigIntType.fromString("+1", 8), 1n);
  assertStrictEquals(BigIntType.fromString("2", 8), 2n);
  assertStrictEquals(BigIntType.fromString("-2", 8), -2n);
  assertStrictEquals(BigIntType.fromString("3", 8), 3n);
  assertStrictEquals(BigIntType.fromString("-3", 8), -3n);
  assertStrictEquals(BigIntType.fromString("4", 8), 4n);
  assertStrictEquals(BigIntType.fromString("-4", 8), -4n);
  assertStrictEquals(BigIntType.fromString("5", 8), 5n);
  assertStrictEquals(BigIntType.fromString("-5", 8), -5n);
  assertStrictEquals(BigIntType.fromString("6", 8), 6n);
  assertStrictEquals(BigIntType.fromString("-6", 8), -6n);
  assertStrictEquals(BigIntType.fromString("7", 8), 7n);
  assertStrictEquals(BigIntType.fromString("-7", 8), -7n);
  assertStrictEquals(BigIntType.fromString("10", 8), 8n);
  assertStrictEquals(BigIntType.fromString("-10", 8), -8n);
  
  assertStrictEquals(BigIntType.fromString("+111", 8), 73n);
  
  const e1 = "`value` must be an octal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, 8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, 8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("8" as unknown as string, 8);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 10", () => {
  assertStrictEquals(BigIntType.fromString("0", 10), 0n);
  assertStrictEquals(BigIntType.fromString("-0", 10), 0n);
  assertStrictEquals(BigIntType.fromString("+0", 10), 0n);
  assertStrictEquals(BigIntType.fromString("1", 10), 1n);
  assertStrictEquals(BigIntType.fromString("-1", 10), -1n);
  assertStrictEquals(BigIntType.fromString("+1", 10), 1n);
  assertStrictEquals(BigIntType.fromString("2", 10), 2n);
  assertStrictEquals(BigIntType.fromString("-2", 10), -2n);
  assertStrictEquals(BigIntType.fromString("3", 10), 3n);
  assertStrictEquals(BigIntType.fromString("-3", 10), -3n);
  assertStrictEquals(BigIntType.fromString("4", 10), 4n);
  assertStrictEquals(BigIntType.fromString("-4", 10), -4n);
  assertStrictEquals(BigIntType.fromString("5", 10), 5n);
  assertStrictEquals(BigIntType.fromString("-5", 10), -5n);
  assertStrictEquals(BigIntType.fromString("6", 10), 6n);
  assertStrictEquals(BigIntType.fromString("-6", 10), -6n);
  assertStrictEquals(BigIntType.fromString("7", 10), 7n);
  assertStrictEquals(BigIntType.fromString("-7", 10), -7n);
  assertStrictEquals(BigIntType.fromString("8", 10), 8n);
  assertStrictEquals(BigIntType.fromString("-8", 10), -8n);
  assertStrictEquals(BigIntType.fromString("9", 10), 9n);
  assertStrictEquals(BigIntType.fromString("-9", 10), -9n);
  assertStrictEquals(BigIntType.fromString("10", 10), 10n);
  assertStrictEquals(BigIntType.fromString("-10", 10), -10n);
  
  assertStrictEquals(BigIntType.fromString("+111", 10), 111n);
  
  const e1 = "`value` must be a decimal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, 10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, 10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("A" as unknown as string, 10);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 16", () => {
  assertStrictEquals(BigIntType.fromString("0", 16), 0n);
  assertStrictEquals(BigIntType.fromString("-0", 16), 0n);
  assertStrictEquals(BigIntType.fromString("+0", 16), 0n);
  assertStrictEquals(BigIntType.fromString("1", 16), 1n);
  assertStrictEquals(BigIntType.fromString("-1", 16), -1n);
  assertStrictEquals(BigIntType.fromString("+1", 16), 1n);
  assertStrictEquals(BigIntType.fromString("2", 16), 2n);
  assertStrictEquals(BigIntType.fromString("-2", 16), -2n);
  assertStrictEquals(BigIntType.fromString("3", 16), 3n);
  assertStrictEquals(BigIntType.fromString("-3", 16), -3n);
  assertStrictEquals(BigIntType.fromString("4", 16), 4n);
  assertStrictEquals(BigIntType.fromString("-4", 16), -4n);
  assertStrictEquals(BigIntType.fromString("5", 16), 5n);
  assertStrictEquals(BigIntType.fromString("-5", 16), -5n);
  assertStrictEquals(BigIntType.fromString("6", 16), 6n);
  assertStrictEquals(BigIntType.fromString("-6", 16), -6n);
  assertStrictEquals(BigIntType.fromString("7", 16), 7n);
  assertStrictEquals(BigIntType.fromString("-7", 16), -7n);
  assertStrictEquals(BigIntType.fromString("8", 16), 8n);
  assertStrictEquals(BigIntType.fromString("-8", 16), -8n);
  assertStrictEquals(BigIntType.fromString("9", 16), 9n);
  assertStrictEquals(BigIntType.fromString("-9", 16), -9n);
  assertStrictEquals(BigIntType.fromString("A", 16), 10n);
  assertStrictEquals(BigIntType.fromString("-a", 16), -10n);
  assertStrictEquals(BigIntType.fromString("b", 16), 11n);
  assertStrictEquals(BigIntType.fromString("-B", 16), -11n);
  assertStrictEquals(BigIntType.fromString("C", 16), 12n);
  assertStrictEquals(BigIntType.fromString("-c", 16), -12n);
  assertStrictEquals(BigIntType.fromString("d", 16), 13n);
  assertStrictEquals(BigIntType.fromString("-D", 16), -13n);
  assertStrictEquals(BigIntType.fromString("E", 16), 14n);
  assertStrictEquals(BigIntType.fromString("-e", 16), -14n);
  assertStrictEquals(BigIntType.fromString("f", 16), 15n);
  assertStrictEquals(BigIntType.fromString("-F", 16), -15n);
  assertStrictEquals(BigIntType.fromString("10", 16), 16n);
  assertStrictEquals(BigIntType.fromString("-10", 16), -16n);
  
  assertStrictEquals(BigIntType.fromString("+111", 16), 273n);
  
  const e1 = "`value` must be a hexadecimal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, 16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, 16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("G" as unknown as string, 16);
    },
    TypeError,
    e1,
  );
});
