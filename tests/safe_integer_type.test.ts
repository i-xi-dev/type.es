import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { SafeIntegerType } from "../mod.ts";

Deno.test("SafeIntegerType.isSafeInteger()", () => {
  assertStrictEquals(SafeIntegerType.isSafeInteger(0), true);
  assertStrictEquals(SafeIntegerType.isSafeInteger(-0), true);
  assertStrictEquals(SafeIntegerType.isSafeInteger(1), true);
  assertStrictEquals(SafeIntegerType.isSafeInteger(-1), true);

  assertStrictEquals(SafeIntegerType.isSafeInteger(-10.1), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(-9.9), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(9.9), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(10.1), false);

  assertStrictEquals(SafeIntegerType.isSafeInteger(0n), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(-0n), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(1n), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(-1n), false);

  assertStrictEquals(SafeIntegerType.isSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeIntegerType.isSafeInteger(undefined), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(null), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(true), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(false), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger(""), false);
  assertStrictEquals(SafeIntegerType.isSafeInteger("0"), false);
});

Deno.test("SafeIntegerType.isPositive()", () => {
  assertStrictEquals(SafeIntegerType.isPositive(0), false);
  assertStrictEquals(SafeIntegerType.isPositive(-0), false);
  assertStrictEquals(SafeIntegerType.isPositive(1), true);
  assertStrictEquals(SafeIntegerType.isPositive(-1), false);

  assertStrictEquals(SafeIntegerType.isPositive(-10.1), false);
  assertStrictEquals(SafeIntegerType.isPositive(-9.9), false);
  assertStrictEquals(SafeIntegerType.isPositive(9.9), false);
  assertStrictEquals(SafeIntegerType.isPositive(10.1), false);

  assertStrictEquals(SafeIntegerType.isPositive(0n), false);
  assertStrictEquals(SafeIntegerType.isPositive(-0n), false);
  assertStrictEquals(SafeIntegerType.isPositive(1n), false);
  assertStrictEquals(SafeIntegerType.isPositive(-1n), false);

  assertStrictEquals(SafeIntegerType.isPositive(Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeIntegerType.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(
    SafeIntegerType.isPositive(Number.MIN_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isPositive(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeIntegerType.isPositive(undefined), false);
  assertStrictEquals(SafeIntegerType.isPositive(null), false);
  assertStrictEquals(SafeIntegerType.isPositive(true), false);
  assertStrictEquals(SafeIntegerType.isPositive(false), false);
  assertStrictEquals(SafeIntegerType.isPositive(""), false);
  assertStrictEquals(SafeIntegerType.isPositive("0"), false);
});

Deno.test("SafeIntegerType.isNonNegative()", () => {
  assertStrictEquals(SafeIntegerType.isNonNegative(0), true);
  assertStrictEquals(SafeIntegerType.isNonNegative(-0), true);
  assertStrictEquals(SafeIntegerType.isNonNegative(1), true);
  assertStrictEquals(SafeIntegerType.isNonNegative(-1), false);

  assertStrictEquals(SafeIntegerType.isNonNegative(-10.1), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(-9.9), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(9.9), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(10.1), false);

  assertStrictEquals(SafeIntegerType.isNonNegative(0n), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(-0n), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(1n), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(-1n), false);

  assertStrictEquals(SafeIntegerType.isNonNegative(Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isNonNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isNonNegative(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isNonNegative(Number.MIN_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeIntegerType.isNonNegative(undefined), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(null), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(true), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(false), false);
  assertStrictEquals(SafeIntegerType.isNonNegative(""), false);
  assertStrictEquals(SafeIntegerType.isNonNegative("0"), false);
});

Deno.test("SafeIntegerType.isNonPositive()", () => {
  assertStrictEquals(SafeIntegerType.isNonPositive(0), true);
  assertStrictEquals(SafeIntegerType.isNonPositive(-0), true);
  assertStrictEquals(SafeIntegerType.isNonPositive(1), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(-1), true);

  assertStrictEquals(SafeIntegerType.isNonPositive(-10.1), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(-9.9), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(9.9), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(10.1), false);

  assertStrictEquals(SafeIntegerType.isNonPositive(0n), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(-0n), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(1n), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(-1n), false);

  assertStrictEquals(SafeIntegerType.isNonPositive(Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isNonPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isNonPositive(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isNonPositive(Number.MIN_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isNonPositive(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeIntegerType.isNonPositive(undefined), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(null), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(true), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(false), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(""), false);
  assertStrictEquals(SafeIntegerType.isNonPositive("0"), false);
});

Deno.test("SafeIntegerType.isNegative()", () => {
  assertStrictEquals(SafeIntegerType.isNegative(0), false);
  assertStrictEquals(SafeIntegerType.isNegative(-0), false);
  assertStrictEquals(SafeIntegerType.isNegative(1), false);
  assertStrictEquals(SafeIntegerType.isNegative(-1), true);

  assertStrictEquals(SafeIntegerType.isNegative(-10.1), false);
  assertStrictEquals(SafeIntegerType.isNegative(-9.9), false);
  assertStrictEquals(SafeIntegerType.isNegative(9.9), false);
  assertStrictEquals(SafeIntegerType.isNegative(10.1), false);

  assertStrictEquals(SafeIntegerType.isNegative(0n), false);
  assertStrictEquals(SafeIntegerType.isNegative(-0n), false);
  assertStrictEquals(SafeIntegerType.isNegative(1n), false);
  assertStrictEquals(SafeIntegerType.isNegative(-1n), false);

  assertStrictEquals(SafeIntegerType.isNegative(Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isNegative(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(SafeIntegerType.isNegative(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(
    SafeIntegerType.isNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeIntegerType.isNegative(undefined), false);
  assertStrictEquals(SafeIntegerType.isNegative(null), false);
  assertStrictEquals(SafeIntegerType.isNegative(true), false);
  assertStrictEquals(SafeIntegerType.isNegative(false), false);
  assertStrictEquals(SafeIntegerType.isNegative(""), false);
  assertStrictEquals(SafeIntegerType.isNegative("0"), false);
});

Deno.test("SafeIntegerType.isOdd()", () => {
  assertStrictEquals(SafeIntegerType.isOdd(0), false);
  assertStrictEquals(SafeIntegerType.isOdd(-0), false);
  assertStrictEquals(SafeIntegerType.isOdd(1), true);
  assertStrictEquals(SafeIntegerType.isOdd(-1), true);
  assertStrictEquals(SafeIntegerType.isOdd(2), false);
  assertStrictEquals(SafeIntegerType.isOdd(-2), false);
  assertStrictEquals(SafeIntegerType.isOdd(3), true);
  assertStrictEquals(SafeIntegerType.isOdd(-3), true);
  assertStrictEquals(SafeIntegerType.isOdd(4), false);
  assertStrictEquals(SafeIntegerType.isOdd(-4), false);
});

Deno.test("SafeIntegerType.isEven()", () => {
  assertStrictEquals(SafeIntegerType.isEven(0), true);
  assertStrictEquals(SafeIntegerType.isEven(-0), true);
  assertStrictEquals(SafeIntegerType.isEven(1), false);
  assertStrictEquals(SafeIntegerType.isEven(-1), false);
  assertStrictEquals(SafeIntegerType.isEven(2), true);
  assertStrictEquals(SafeIntegerType.isEven(-2), true);
  assertStrictEquals(SafeIntegerType.isEven(3), false);
  assertStrictEquals(SafeIntegerType.isEven(-3), false);
  assertStrictEquals(SafeIntegerType.isEven(4), true);
  assertStrictEquals(SafeIntegerType.isEven(-4), true);
});

Deno.test("SafeIntegerType.assertSafeInteger()", () => {
  try {
    SafeIntegerType.assertSafeInteger(0, "test-1");
    SafeIntegerType.assertSafeInteger(Number.MAX_SAFE_INTEGER, "test-1");
    SafeIntegerType.assertSafeInteger(Number.MIN_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertSafeInteger(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertSafeInteger(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertSafeInteger(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertSafeInteger(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertSafeInteger(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertSafeInteger(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertSafeInteger(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertPositive()", () => {
  try {
    SafeIntegerType.assertPositive(1, "test-1");
    SafeIntegerType.assertPositive(Number.MAX_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertPositive(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertPositive(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertNonNegative()", () => {
  try {
    SafeIntegerType.assertNonNegative(0, "test-1");
    SafeIntegerType.assertNonNegative(1, "test-1");
    SafeIntegerType.assertNonNegative(Number.MAX_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertNonNegative(-1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonNegative(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertNonPositive()", () => {
  try {
    SafeIntegerType.assertNonPositive(0, "test-1");
    SafeIntegerType.assertNonPositive(-1, "test-1");
    SafeIntegerType.assertNonPositive(Number.MIN_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertNonPositive(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNonPositive(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertNegative()", () => {
  try {
    SafeIntegerType.assertNegative(-1, "test-1");
    SafeIntegerType.assertNegative(Number.MIN_SAFE_INTEGER, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertNegative(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertNegative(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertOdd()", () => {
  try {
    SafeIntegerType.assertOdd(1, "test-1");
    SafeIntegerType.assertOdd(-1, "test-1");
    SafeIntegerType.assertOdd(3, "test-1");
    SafeIntegerType.assertOdd(-3, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertOdd(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertOdd(2, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertEven()", () => {
  try {
    SafeIntegerType.assertEven(0, "test-1");
    SafeIntegerType.assertEven(-0, "test-1");
    SafeIntegerType.assertEven(2, "test-1");
    SafeIntegerType.assertEven(-2, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assertEven(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assertEven(-1, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.isInRange()", () => {
  assertStrictEquals(SafeIntegerType.isInRange(0, 0, 0), true);
  assertStrictEquals(SafeIntegerType.isInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(SafeIntegerType.isInRange(0, 0, 1), true);
  assertStrictEquals(SafeIntegerType.isInRange(0, -1, 0), true);
  assertStrictEquals(SafeIntegerType.isInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(SafeIntegerType.isInRange(0, 1, 1), false);
  assertStrictEquals(SafeIntegerType.isInRange(0, -1, -1), false);

  assertStrictEquals(SafeIntegerType.isInRange(1, 0, 0), false);
  assertStrictEquals(SafeIntegerType.isInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(SafeIntegerType.isInRange(1, 0, 1), true);
  assertStrictEquals(SafeIntegerType.isInRange(1, -1, 0), false);
  assertStrictEquals(SafeIntegerType.isInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(SafeIntegerType.isInRange(1, 1, 1), true);
  assertStrictEquals(SafeIntegerType.isInRange(1, -1, -1), false);

  assertStrictEquals(SafeIntegerType.isInRange(-1, 0, 0), false);
  assertStrictEquals(SafeIntegerType.isInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(SafeIntegerType.isInRange(-1, 0, 1), false);
  assertStrictEquals(SafeIntegerType.isInRange(-1, -1, 0), true);
  assertStrictEquals(SafeIntegerType.isInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(SafeIntegerType.isInRange(-1, 1, 1), false);
  assertStrictEquals(SafeIntegerType.isInRange(-1, -1, -1), true);

  assertStrictEquals(SafeIntegerType.isInRange(0n, 0, 0), false);
  assertStrictEquals(SafeIntegerType.isInRange(0.5, -1, 1), false);

  assertStrictEquals(
    SafeIntegerType.isInRange(0, 0, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isInRange(0, 0, Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(SafeIntegerType.isInRange(0, 0, Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isInRange(0, Number.MIN_SAFE_INTEGER, 0),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isInRange(0, Number.NEGATIVE_INFINITY, 0),
    true,
  );
  assertStrictEquals(SafeIntegerType.isInRange(0, Number.NaN, 0), false);

  assertStrictEquals(
    SafeIntegerType.isInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isInRange(0, 1, Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeIntegerType.isInRange(0, 1, Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isInRange(0, Number.MIN_SAFE_INTEGER, 1),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isInRange(0, Number.NEGATIVE_INFINITY, 1),
    true,
  );
  assertStrictEquals(SafeIntegerType.isInRange(0, Number.NaN, 1), false);

  assertStrictEquals(
    SafeIntegerType.isInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    SafeIntegerType.isInRange(0, -1, Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(SafeIntegerType.isInRange(0, -1, Number.NaN), false);
  assertStrictEquals(
    SafeIntegerType.isInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );
  assertStrictEquals(
    SafeIntegerType.isInRange(0, Number.NEGATIVE_INFINITY, -1),
    false,
  );
  assertStrictEquals(SafeIntegerType.isInRange(0, Number.NaN, -1), false);
});
