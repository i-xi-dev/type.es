import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("Type.isBigInt()", () => {
  assertStrictEquals(Type.isBigInt(0), false);
  assertStrictEquals(Type.isBigInt(-0), false);
  assertStrictEquals(Type.isBigInt(1), false);
  assertStrictEquals(Type.isBigInt(-1), false);

  assertStrictEquals(Type.isBigInt(-10.1), false);
  assertStrictEquals(Type.isBigInt(-9.9), false);
  assertStrictEquals(Type.isBigInt(9.9), false);
  assertStrictEquals(Type.isBigInt(10.1), false);

  assertStrictEquals(Type.isBigInt(0n), true);
  assertStrictEquals(Type.isBigInt(-0n), true);
  assertStrictEquals(Type.isBigInt(1n), true);
  assertStrictEquals(Type.isBigInt(-1n), true);

  assertStrictEquals(Type.isBigInt(Number.NaN), false);
  assertStrictEquals(Type.isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isBigInt(SIMAX), false);
  assertStrictEquals(Type.isBigInt(SIMIN), false);
  assertStrictEquals(Type.isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isBigInt(undefined), false);
  assertStrictEquals(Type.isBigInt(null), false);
  assertStrictEquals(Type.isBigInt(true), false);
  assertStrictEquals(Type.isBigInt(false), false);
  assertStrictEquals(Type.isBigInt(""), false);
  assertStrictEquals(Type.isBigInt("0"), false);
});

Deno.test("Type.assertBigInt()", () => {
  try {
    Type.assertBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isPositiveBigInt()", () => {
  assertStrictEquals(Type.isPositiveBigInt(0), false);
  assertStrictEquals(Type.isPositiveBigInt(-0), false);
  assertStrictEquals(Type.isPositiveBigInt(1), false);
  assertStrictEquals(Type.isPositiveBigInt(-1), false);

  assertStrictEquals(Type.isPositiveBigInt(-10.1), false);
  assertStrictEquals(Type.isPositiveBigInt(-9.9), false);
  assertStrictEquals(Type.isPositiveBigInt(9.9), false);
  assertStrictEquals(Type.isPositiveBigInt(10.1), false);

  assertStrictEquals(Type.isPositiveBigInt(0n), false);
  assertStrictEquals(Type.isPositiveBigInt(-0n), false);
  assertStrictEquals(Type.isPositiveBigInt(1n), true);
  assertStrictEquals(Type.isPositiveBigInt(-1n), false);

  assertStrictEquals(Type.isPositiveBigInt(Number.NaN), false);
  assertStrictEquals(Type.isPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isPositiveBigInt(SIMAX), false);
  assertStrictEquals(Type.isPositiveBigInt(SIMIN), false);
  assertStrictEquals(Type.isPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isPositiveBigInt(undefined), false);
  assertStrictEquals(Type.isPositiveBigInt(null), false);
  assertStrictEquals(Type.isPositiveBigInt(true), false);
  assertStrictEquals(Type.isPositiveBigInt(false), false);
  assertStrictEquals(Type.isPositiveBigInt(""), false);
  assertStrictEquals(Type.isPositiveBigInt("0"), false);
});

Deno.test("Type.assertPositiveBigInt()", () => {
  try {
    Type.assertPositiveBigInt(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonNegativeBigInt()", () => {
  assertStrictEquals(Type.isNonNegativeBigInt(0), false);
  assertStrictEquals(Type.isNonNegativeBigInt(-0), false);
  assertStrictEquals(Type.isNonNegativeBigInt(1), false);
  assertStrictEquals(Type.isNonNegativeBigInt(-1), false);

  assertStrictEquals(Type.isNonNegativeBigInt(-10.1), false);
  assertStrictEquals(Type.isNonNegativeBigInt(-9.9), false);
  assertStrictEquals(Type.isNonNegativeBigInt(9.9), false);
  assertStrictEquals(Type.isNonNegativeBigInt(10.1), false);

  assertStrictEquals(Type.isNonNegativeBigInt(0n), true);
  assertStrictEquals(Type.isNonNegativeBigInt(-0n), true);
  assertStrictEquals(Type.isNonNegativeBigInt(1n), true);
  assertStrictEquals(Type.isNonNegativeBigInt(-1n), false);

  assertStrictEquals(Type.isNonNegativeBigInt(Number.NaN), false);
  assertStrictEquals(Type.isNonNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonNegativeBigInt(SIMAX), false);
  assertStrictEquals(Type.isNonNegativeBigInt(SIMIN), false);
  assertStrictEquals(Type.isNonNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonNegativeBigInt(undefined), false);
  assertStrictEquals(Type.isNonNegativeBigInt(null), false);
  assertStrictEquals(Type.isNonNegativeBigInt(true), false);
  assertStrictEquals(Type.isNonNegativeBigInt(false), false);
  assertStrictEquals(Type.isNonNegativeBigInt(""), false);
  assertStrictEquals(Type.isNonNegativeBigInt("0"), false);
});

Deno.test("Type.assertNonNegativeBigInt()", () => {
  try {
    Type.assertNonNegativeBigInt(1n, "test-1");
    Type.assertNonNegativeBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeBigInt(-1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonPositiveBigInt()", () => {
  assertStrictEquals(Type.isNonPositiveBigInt(0), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-0), false);
  assertStrictEquals(Type.isNonPositiveBigInt(1), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-1), false);

  assertStrictEquals(Type.isNonPositiveBigInt(-10.1), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-9.9), false);
  assertStrictEquals(Type.isNonPositiveBigInt(9.9), false);
  assertStrictEquals(Type.isNonPositiveBigInt(10.1), false);

  assertStrictEquals(Type.isNonPositiveBigInt(0n), true);
  assertStrictEquals(Type.isNonPositiveBigInt(-0n), true);
  assertStrictEquals(Type.isNonPositiveBigInt(1n), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-1n), true);

  assertStrictEquals(Type.isNonPositiveBigInt(Number.NaN), false);
  assertStrictEquals(Type.isNonPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonPositiveBigInt(SIMAX), false);
  assertStrictEquals(Type.isNonPositiveBigInt(SIMIN), false);
  assertStrictEquals(Type.isNonPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonPositiveBigInt(undefined), false);
  assertStrictEquals(Type.isNonPositiveBigInt(null), false);
  assertStrictEquals(Type.isNonPositiveBigInt(true), false);
  assertStrictEquals(Type.isNonPositiveBigInt(false), false);
  assertStrictEquals(Type.isNonPositiveBigInt(""), false);
  assertStrictEquals(Type.isNonPositiveBigInt("0"), false);
});

Deno.test("Type.assertNonPositiveBigInt()", () => {
  try {
    Type.assertNonPositiveBigInt(-1n, "test-1");
    Type.assertNonPositiveBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveBigInt(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNegativeBigInt()", () => {
  assertStrictEquals(Type.isNegativeBigInt(0), false);
  assertStrictEquals(Type.isNegativeBigInt(-0), false);
  assertStrictEquals(Type.isNegativeBigInt(1), false);
  assertStrictEquals(Type.isNegativeBigInt(-1), false);

  assertStrictEquals(Type.isNegativeBigInt(-10.1), false);
  assertStrictEquals(Type.isNegativeBigInt(-9.9), false);
  assertStrictEquals(Type.isNegativeBigInt(9.9), false);
  assertStrictEquals(Type.isNegativeBigInt(10.1), false);

  assertStrictEquals(Type.isNegativeBigInt(0n), false);
  assertStrictEquals(Type.isNegativeBigInt(-0n), false);
  assertStrictEquals(Type.isNegativeBigInt(1n), false);
  assertStrictEquals(Type.isNegativeBigInt(-1n), true);

  assertStrictEquals(Type.isNegativeBigInt(Number.NaN), false);
  assertStrictEquals(Type.isNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNegativeBigInt(SIMAX), false);
  assertStrictEquals(Type.isNegativeBigInt(SIMIN), false);
  assertStrictEquals(Type.isNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNegativeBigInt(undefined), false);
  assertStrictEquals(Type.isNegativeBigInt(null), false);
  assertStrictEquals(Type.isNegativeBigInt(true), false);
  assertStrictEquals(Type.isNegativeBigInt(false), false);
  assertStrictEquals(Type.isNegativeBigInt(""), false);
  assertStrictEquals(Type.isNegativeBigInt("0"), false);
});

Deno.test("Type.assertNegativeBigInt()", () => {
  try {
    Type.assertNegativeBigInt(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isOddBigInt()", () => {
  assertStrictEquals(Type.isOddBigInt(0n), false);
  assertStrictEquals(Type.isOddBigInt(-0n), false);
  assertStrictEquals(Type.isOddBigInt(1n), true);
  assertStrictEquals(Type.isOddBigInt(-1n), true);
  assertStrictEquals(Type.isOddBigInt(2n), false);
  assertStrictEquals(Type.isOddBigInt(-2n), false);
  assertStrictEquals(Type.isOddBigInt(3n), true);
  assertStrictEquals(Type.isOddBigInt(-3n), true);
  assertStrictEquals(Type.isOddBigInt(4n), false);
  assertStrictEquals(Type.isOddBigInt(-4n), false);
});

Deno.test("Type.assertOddBigInt()", () => {
  try {
    Type.assertOddBigInt(1n, "test-1");
    Type.assertOddBigInt(-1n, "test-1");
    Type.assertOddBigInt(3n, "test-1");
    Type.assertOddBigInt(-3n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertOddBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertOddBigInt(2n, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isEvenBigInt()", () => {
  assertStrictEquals(Type.isEvenBigInt(0n), true);
  assertStrictEquals(Type.isEvenBigInt(-0n), true);
  assertStrictEquals(Type.isEvenBigInt(1n), false);
  assertStrictEquals(Type.isEvenBigInt(-1n), false);
  assertStrictEquals(Type.isEvenBigInt(2n), true);
  assertStrictEquals(Type.isEvenBigInt(-2n), true);
  assertStrictEquals(Type.isEvenBigInt(3n), false);
  assertStrictEquals(Type.isEvenBigInt(-3n), false);
  assertStrictEquals(Type.isEvenBigInt(4n), true);
  assertStrictEquals(Type.isEvenBigInt(-4n), true);
});

Deno.test("Type.assertEvenBigInt()", () => {
  try {
    Type.assertEvenBigInt(0n, "test-1");
    Type.assertEvenBigInt(-0n, "test-1");
    Type.assertEvenBigInt(2n, "test-1");
    Type.assertEvenBigInt(-2n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertEvenBigInt(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEvenBigInt(-1n, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isBigIntInRange()", () => {
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, -1n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(0n, 1n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(0n, -1n, -1n), false);

  assertStrictEquals(Type.isBigIntInRange(1n, 0n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(1n, 0n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(1n, -1n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(1n, 1n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(1n, -1n, -1n), false);

  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, -1n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(-1n, 1n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, -1n, -1n), true);

  assertStrictEquals(Type.isBigIntInRange(0, 0n, 0n), false);

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      Type.isBigIntInRange(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      Type.isBigIntInRange(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );
});

Deno.test("Type.assertBigIntInRange()", () => {
  try {
    Type.assertBigIntInRange(0n, "test-1", 0n, 0n);
    Type.assertBigIntInRange(1n, "test-1", -1n, 1n);
    Type.assertBigIntInRange(-1n, "test-1", -1n, 1n);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBigIntInRange(0n, "test-1", 1n, 1n);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBigIntInRange(1n, "test-1", 0n, 0n);
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isBigIntInSafeIntegerRange()", () => {
  assertStrictEquals(Type.isBigIntInSafeIntegerRange(0n), true);
  assertStrictEquals(Type.isBigIntInSafeIntegerRange(BigInt(SIMIN)), true);
  assertStrictEquals(
    Type.isBigIntInSafeIntegerRange(BigInt(SIMIN) - 1n),
    false,
  );
  assertStrictEquals(Type.isBigIntInSafeIntegerRange(BigInt(SIMAX)), true);
  assertStrictEquals(
    Type.isBigIntInSafeIntegerRange(BigInt(SIMAX) + 1n),
    false,
  );

  assertStrictEquals(Type.isBigIntInSafeIntegerRange(0), false);
  assertStrictEquals(Type.isBigIntInSafeIntegerRange(SIMAX), false);
  assertStrictEquals(Type.isBigIntInSafeIntegerRange(SIMAX), false);
  assertStrictEquals(Type.isBigIntInSafeIntegerRange("0"), false);
});

Deno.test("Type.assertBigIntInSafeIntegerRange()", () => {
  try {
    Type.assertBigIntInSafeIntegerRange(0n, "test-1");
    Type.assertBigIntInSafeIntegerRange(BigInt(SIMIN), "test-1");
    Type.assertBigIntInSafeIntegerRange(BigInt(SIMAX), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBigIntInSafeIntegerRange(BigInt(SIMIN) - 1n, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBigIntInSafeIntegerRange(BigInt(SIMAX) + 1n, "test-1");
    unreachable();
  } catch {
    //
  }
});
