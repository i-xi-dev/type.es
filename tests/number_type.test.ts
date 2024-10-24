import { assertStrictEquals, assertThrows, fail, unreachable } from "./deps.ts";
import { NumberType } from "../mod.ts";

Deno.test("NumberType.assertNumber()", () => {
  try {
    NumberType.assertNumber(0, "test-1");
    NumberType.assertNumber(0.5, "test-1");
    NumberType.assertNumber(Number.NaN, "test-1");
    NumberType.assertNumber(Number.POSITIVE_INFINITY, "test-1");
    NumberType.assertNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumberType.assertNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("NumberType.assertPositive()", () => {
  try {
    NumberType.assertPositive(1, "test-1");
    NumberType.assertPositive(0.5, "test-1");
    NumberType.assertPositive(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumberType.assertPositive(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertPositive(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertPositive(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertPositive(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("NumberType.assertNonNegative()", () => {
  try {
    NumberType.assertNonNegative(1, "test-1");
    NumberType.assertNonNegative(0.5, "test-1");
    NumberType.assertNonNegative(0, "test-1");
    NumberType.assertNonNegative(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumberType.assertNonNegative(-0.1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonNegative(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonNegative(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonNegative(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("NumberType.assertNonPositive()", () => {
  try {
    NumberType.assertNonPositive(-1, "test-1");
    NumberType.assertNonPositive(-0.5, "test-1");
    NumberType.assertNonPositive(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumberType.assertNonPositive(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonPositive(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonPositive(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNonPositive(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("NumberType.assertNegative()", () => {
  try {
    NumberType.assertNegative(-1, "test-1");
    NumberType.assertNegative(-0.5, "test-1");
    NumberType.assertNegative(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumberType.assertNegative(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNegative(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNegative(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assertNegative(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("NumberType.isNumber()", () => {
  assertStrictEquals(NumberType.isNumber(0), true);
  assertStrictEquals(NumberType.isNumber(-0), true);
  assertStrictEquals(NumberType.isNumber(1), true);
  assertStrictEquals(NumberType.isNumber(-1), true);

  assertStrictEquals(NumberType.isNumber(-10.1), true);
  assertStrictEquals(NumberType.isNumber(-9.9), true);
  assertStrictEquals(NumberType.isNumber(9.9), true);
  assertStrictEquals(NumberType.isNumber(10.1), true);

  assertStrictEquals(NumberType.isNumber(0n), false);
  assertStrictEquals(NumberType.isNumber(-0n), false);
  assertStrictEquals(NumberType.isNumber(1n), false);
  assertStrictEquals(NumberType.isNumber(-1n), false);

  assertStrictEquals(NumberType.isNumber(Number.NaN), true);
  assertStrictEquals(NumberType.isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(NumberType.isNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.isNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(NumberType.isNumber(undefined), false);
  assertStrictEquals(NumberType.isNumber(null), false);
  assertStrictEquals(NumberType.isNumber(true), false);
  assertStrictEquals(NumberType.isNumber(false), false);
  assertStrictEquals(NumberType.isNumber(""), false);
  assertStrictEquals(NumberType.isNumber("0"), false);
});

Deno.test("NumberType.isPositive()", () => {
  assertStrictEquals(NumberType.isPositive(0), false);
  assertStrictEquals(NumberType.isPositive(-0), false);
  assertStrictEquals(NumberType.isPositive(1), true);
  assertStrictEquals(NumberType.isPositive(-1), false);

  assertStrictEquals(NumberType.isPositive(-10.1), false);
  assertStrictEquals(NumberType.isPositive(-9.9), false);
  assertStrictEquals(NumberType.isPositive(9.9), true);
  assertStrictEquals(NumberType.isPositive(10.1), true);

  assertStrictEquals(NumberType.isPositive(0n), false);
  assertStrictEquals(NumberType.isPositive(-0n), false);
  assertStrictEquals(NumberType.isPositive(1n), false);
  assertStrictEquals(NumberType.isPositive(-1n), false);

  assertStrictEquals(NumberType.isPositive(Number.NaN), false);
  assertStrictEquals(NumberType.isPositive(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(NumberType.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.isPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(NumberType.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(NumberType.isPositive(undefined), false);
  assertStrictEquals(NumberType.isPositive(null), false);
  assertStrictEquals(NumberType.isPositive(true), false);
  assertStrictEquals(NumberType.isPositive(false), false);
  assertStrictEquals(NumberType.isPositive(""), false);
  assertStrictEquals(NumberType.isPositive("0"), false);
});

Deno.test("NumberType.isNonNegative()", () => {
  assertStrictEquals(NumberType.isNonNegative(0), true);
  assertStrictEquals(NumberType.isNonNegative(-0), true);
  assertStrictEquals(NumberType.isNonNegative(1), true);
  assertStrictEquals(NumberType.isNonNegative(-1), false);

  assertStrictEquals(NumberType.isNonNegative(-10.1), false);
  assertStrictEquals(NumberType.isNonNegative(-9.9), false);
  assertStrictEquals(NumberType.isNonNegative(9.9), true);
  assertStrictEquals(NumberType.isNonNegative(10.1), true);

  assertStrictEquals(NumberType.isNonNegative(0n), false);
  assertStrictEquals(NumberType.isNonNegative(-0n), false);
  assertStrictEquals(NumberType.isNonNegative(1n), false);
  assertStrictEquals(NumberType.isNonNegative(-1n), false);

  assertStrictEquals(NumberType.isNonNegative(Number.NaN), false);
  assertStrictEquals(NumberType.isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(NumberType.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(NumberType.isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(NumberType.isNonNegative(undefined), false);
  assertStrictEquals(NumberType.isNonNegative(null), false);
  assertStrictEquals(NumberType.isNonNegative(true), false);
  assertStrictEquals(NumberType.isNonNegative(false), false);
  assertStrictEquals(NumberType.isNonNegative(""), false);
  assertStrictEquals(NumberType.isNonNegative("0"), false);
});

Deno.test("NumberType.isNonPositive()", () => {
  assertStrictEquals(NumberType.isNonPositive(0), true);
  assertStrictEquals(NumberType.isNonPositive(-0), true);
  assertStrictEquals(NumberType.isNonPositive(1), false);
  assertStrictEquals(NumberType.isNonPositive(-1), true);

  assertStrictEquals(NumberType.isNonPositive(-10.1), true);
  assertStrictEquals(NumberType.isNonPositive(-9.9), true);
  assertStrictEquals(NumberType.isNonPositive(9.9), false);
  assertStrictEquals(NumberType.isNonPositive(10.1), false);

  assertStrictEquals(NumberType.isNonPositive(0n), false);
  assertStrictEquals(NumberType.isNonPositive(-0n), false);
  assertStrictEquals(NumberType.isNonPositive(1n), false);
  assertStrictEquals(NumberType.isNonPositive(-1n), false);

  assertStrictEquals(NumberType.isNonPositive(Number.NaN), false);
  assertStrictEquals(NumberType.isNonPositive(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(NumberType.isNonPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(NumberType.isNonPositive(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.isNonPositive(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(NumberType.isNonPositive(undefined), false);
  assertStrictEquals(NumberType.isNonPositive(null), false);
  assertStrictEquals(NumberType.isNonPositive(true), false);
  assertStrictEquals(NumberType.isNonPositive(false), false);
  assertStrictEquals(NumberType.isNonPositive(""), false);
  assertStrictEquals(NumberType.isNonPositive("0"), false);
});

Deno.test("NumberType.isNegative()", () => {
  assertStrictEquals(NumberType.isNegative(0), false);
  assertStrictEquals(NumberType.isNegative(-0), false);
  assertStrictEquals(NumberType.isNegative(1), false);
  assertStrictEquals(NumberType.isNegative(-1), true);

  assertStrictEquals(NumberType.isNegative(-10.1), true);
  assertStrictEquals(NumberType.isNegative(-9.9), true);
  assertStrictEquals(NumberType.isNegative(9.9), false);
  assertStrictEquals(NumberType.isNegative(10.1), false);

  assertStrictEquals(NumberType.isNegative(0n), false);
  assertStrictEquals(NumberType.isNegative(-0n), false);
  assertStrictEquals(NumberType.isNegative(1n), false);
  assertStrictEquals(NumberType.isNegative(-1n), false);

  assertStrictEquals(NumberType.isNegative(Number.NaN), false);
  assertStrictEquals(NumberType.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(NumberType.isNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(NumberType.isNegative(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.isNegative(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(NumberType.isNegative(undefined), false);
  assertStrictEquals(NumberType.isNegative(null), false);
  assertStrictEquals(NumberType.isNegative(true), false);
  assertStrictEquals(NumberType.isNegative(false), false);
  assertStrictEquals(NumberType.isNegative(""), false);
  assertStrictEquals(NumberType.isNegative("0"), false);
});

Deno.test("NumberType.isInRange()", () => {
  assertStrictEquals(NumberType.isInRange(0, 0, 0), true);
  assertStrictEquals(NumberType.isInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0, 0, 1), true);
  assertStrictEquals(NumberType.isInRange(0, -1, 0), true);
  assertStrictEquals(NumberType.isInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(0, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(0.5, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(0.5, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0.5, 0, 1), true);
  assertStrictEquals(NumberType.isInRange(0.5, -1, 0), false);
  assertStrictEquals(NumberType.isInRange(0.5, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(0.5, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(0.5, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(1, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(1, 0, 1), true);
  assertStrictEquals(NumberType.isInRange(1, -1, 0), false);
  assertStrictEquals(NumberType.isInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(1, 1, 1), true);
  assertStrictEquals(NumberType.isInRange(1, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(-0.5, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(-0.5, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-0.5, 0, 1), false);
  assertStrictEquals(NumberType.isInRange(-0.5, -1, 0), true);
  assertStrictEquals(NumberType.isInRange(-0.5, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-0.5, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(-0.5, -1, -1), false);

  assertStrictEquals(NumberType.isInRange(-1, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-1, 0, 1), false);
  assertStrictEquals(NumberType.isInRange(-1, -1, 0), true);
  assertStrictEquals(NumberType.isInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(NumberType.isInRange(-1, 1, 1), false);
  assertStrictEquals(NumberType.isInRange(-1, -1, -1), true);

  assertStrictEquals(NumberType.isInRange(0n, 0, 0), false);
  assertStrictEquals(NumberType.isInRange(0, -0.5, 0.5), true);

  assertStrictEquals(NumberType.isInRange(0, 0, Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(
    NumberType.isInRange(0, 0, Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(NumberType.isInRange(0, 0, Number.NaN), false);
  assertStrictEquals(NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, 0), true);
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, 0),
    true,
  );
  assertStrictEquals(NumberType.isInRange(0, Number.NaN, 0), false);

  assertStrictEquals(
    NumberType.isInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    NumberType.isInRange(0, 1, Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(NumberType.isInRange(0, 1, Number.NaN), false);
  assertStrictEquals(NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, 1), true);
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, 1),
    true,
  );
  assertStrictEquals(NumberType.isInRange(0, Number.NaN, 1), false);

  assertStrictEquals(
    NumberType.isInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    NumberType.isInRange(0, -1, Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(NumberType.isInRange(0, -1, Number.NaN), false);
  assertStrictEquals(
    NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, -1),
    false,
  );
  assertStrictEquals(NumberType.isInRange(0, Number.NaN, -1), false);
});

Deno.test("NumberType.toNormalized()", () => {
  assertStrictEquals(Object.is(NumberType.toNormalized(0), 0), true);
  assertStrictEquals(Object.is(NumberType.toNormalized(-0), 0), true);
  assertStrictEquals(Object.is(NumberType.toNormalized(-0), -0), false);

  assertStrictEquals(
    NumberType.toNormalized(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    NumberType.toNormalized(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );
  assertStrictEquals(NumberType.toNormalized(Number.NaN), Number.NaN);
  assertStrictEquals(
    NumberType.toNormalized(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    NumberType.toNormalized(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );
});

Deno.test("NumberType.toClamped()", () => {
  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(NumberType.toClamped(0, 0, 0), 0);
  assertStrictEquals(NumberType.toClamped(0, 0, 1), 0);
  assertStrictEquals(NumberType.toClamped(0, -1, 0), 0);
  assertStrictEquals(NumberType.toClamped(0, 1, 1), 1);
  assertStrictEquals(NumberType.toClamped(0, -1, -1), -1);

  assertThrows(
    () => {
      NumberType.toClamped(0, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberType.toClamped(0, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(NumberType.toClamped(0.5, 0, 0), 0);
  assertStrictEquals(NumberType.toClamped(0.5, 0, 1), 0.5);
  assertStrictEquals(NumberType.toClamped(0.5, -1, 0), 0);
  assertStrictEquals(NumberType.toClamped(0.5, 1, 1), 1);
  assertStrictEquals(NumberType.toClamped(0.5, -1, -1), -1);

  assertStrictEquals(NumberType.toClamped(1, 0, 0), 0);
  assertStrictEquals(NumberType.toClamped(1, 0, 1), 1);
  assertStrictEquals(NumberType.toClamped(1, -1, 0), 0);
  assertStrictEquals(NumberType.toClamped(1, 1, 1), 1);
  assertStrictEquals(NumberType.toClamped(1, -1, -1), -1);

  assertThrows(
    () => {
      NumberType.toClamped(1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberType.toClamped(1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(NumberType.toClamped(-0.5, 0, 0), 0);
  assertStrictEquals(NumberType.toClamped(-0.5, 0, 1), 0);
  assertStrictEquals(NumberType.toClamped(-0.5, -1, 0), -0.5);
  assertStrictEquals(NumberType.toClamped(-0.5, 1, 1), 1);
  assertStrictEquals(NumberType.toClamped(-0.5, -1, -1), -1);

  assertStrictEquals(NumberType.toClamped(-1, 0, 0), 0);
  assertStrictEquals(NumberType.toClamped(-1, 0, 1), 0);
  assertStrictEquals(NumberType.toClamped(-1, -1, 0), -1);
  assertStrictEquals(NumberType.toClamped(-1, 1, 1), 1);
  assertStrictEquals(NumberType.toClamped(-1, -1, -1), -1);

  assertThrows(
    () => {
      NumberType.toClamped(-1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberType.toClamped(-1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );
});
