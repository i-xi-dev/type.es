import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { BigIntType } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("BigIntType.assert()", () => {
  try {
    BigIntType.assert(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    BigIntType.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    BigIntType.assert(0, "test-1");
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

Deno.test("BigIntType.is()", () => {
  assertStrictEquals(BigIntType.is(0), false);
  assertStrictEquals(BigIntType.is(-0), false);
  assertStrictEquals(BigIntType.is(1), false);
  assertStrictEquals(BigIntType.is(-1), false);

  assertStrictEquals(BigIntType.is(-10.1), false);
  assertStrictEquals(BigIntType.is(-9.9), false);
  assertStrictEquals(BigIntType.is(9.9), false);
  assertStrictEquals(BigIntType.is(10.1), false);

  assertStrictEquals(BigIntType.is(0n), true);
  assertStrictEquals(BigIntType.is(-0n), true);
  assertStrictEquals(BigIntType.is(1n), true);
  assertStrictEquals(BigIntType.is(-1n), true);

  assertStrictEquals(BigIntType.is(Number.NaN), false);
  assertStrictEquals(BigIntType.is(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(BigIntType.is(SIMAX), false);
  assertStrictEquals(BigIntType.is(SIMIN), false);
  assertStrictEquals(BigIntType.is(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(BigIntType.is(undefined), false);
  assertStrictEquals(BigIntType.is(null), false);
  assertStrictEquals(BigIntType.is(true), false);
  assertStrictEquals(BigIntType.is(false), false);
  assertStrictEquals(BigIntType.is(""), false);
  assertStrictEquals(BigIntType.is("0"), false);
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
  assertStrictEquals(BigIntType.isPositive(SIMAX), false);
  assertStrictEquals(BigIntType.isPositive(SIMIN), false);
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
  assertStrictEquals(BigIntType.isNonNegative(SIMAX), false);
  assertStrictEquals(BigIntType.isNonNegative(SIMIN), false);
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
  assertStrictEquals(BigIntType.isNonPositive(SIMAX), false);
  assertStrictEquals(BigIntType.isNonPositive(SIMIN), false);
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
  assertStrictEquals(BigIntType.isNegative(SIMAX), false);
  assertStrictEquals(BigIntType.isNegative(SIMIN), false);
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

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.minOf(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.minOf(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
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

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.maxOf(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.maxOf(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
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

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.isInRange(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.isInRange(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );
});

Deno.test("BigIntType.clamp()", () => {
  const ex1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clamp(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clamp(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clamp(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(BigIntType.clamp(0n, 0n, 0n), 0n);
  assertStrictEquals(BigIntType.clamp(0n, 0n, 1n), 0n);
  assertStrictEquals(BigIntType.clamp(0n, -1n, 0n), 0n);
  assertStrictEquals(BigIntType.clamp(0n, 1n, 1n), 1n);
  assertStrictEquals(BigIntType.clamp(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntType.clamp(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.clamp(0n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigIntType.clamp(1n, 0n, 0n), 0n);
  assertStrictEquals(BigIntType.clamp(1n, 0n, 1n), 1n);
  assertStrictEquals(BigIntType.clamp(1n, -1n, 0n), 0n);
  assertStrictEquals(BigIntType.clamp(1n, 1n, 1n), 1n);
  assertStrictEquals(BigIntType.clamp(1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntType.clamp(1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.clamp(1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigIntType.clamp(-1n, 0n, 0n), 0n);
  assertStrictEquals(BigIntType.clamp(-1n, 0n, 1n), 0n);
  assertStrictEquals(BigIntType.clamp(-1n, -1n, 0n), -1n);
  assertStrictEquals(BigIntType.clamp(-1n, 1n, 1n), 1n);
  assertStrictEquals(BigIntType.clamp(-1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntType.clamp(-1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.clamp(-1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );
});

Deno.test("BigIntType.clampToPositive()", () => {
  assertStrictEquals(BigIntType.clampToPositive(BigInt(SIMIN)), 1n);
  assertStrictEquals(BigIntType.clampToPositive(-2n), 1n);
  assertStrictEquals(BigIntType.clampToPositive(-1n), 1n);
  assertStrictEquals(BigIntType.clampToPositive(-0n), 1n);
  assertStrictEquals(BigIntType.clampToPositive(0n), 1n);
  assertStrictEquals(BigIntType.clampToPositive(1n), 1n);
  assertStrictEquals(BigIntType.clampToPositive(2n), 2n);
  assertStrictEquals(BigIntType.clampToPositive(BigInt(SIMAX)), BigInt(SIMAX));

  const e1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clampToPositive(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.clampToNonNegative()", () => {
  assertStrictEquals(BigIntType.clampToNonNegative(BigInt(SIMIN)), 0n);
  assertStrictEquals(BigIntType.clampToNonNegative(-2n), 0n);
  assertStrictEquals(BigIntType.clampToNonNegative(-1n), 0n);
  assertStrictEquals(BigIntType.clampToNonNegative(-0n), 0n);
  assertStrictEquals(BigIntType.clampToNonNegative(0n), 0n);
  assertStrictEquals(BigIntType.clampToNonNegative(1n), 1n);
  assertStrictEquals(BigIntType.clampToNonNegative(2n), 2n);
  assertStrictEquals(
    BigIntType.clampToNonNegative(BigInt(SIMAX)),
    BigInt(SIMAX),
  );

  const e1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clampToNonNegative(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.clampToNonPositive()", () => {
  assertStrictEquals(
    BigIntType.clampToNonPositive(BigInt(SIMIN)),
    BigInt(SIMIN),
  );
  assertStrictEquals(BigIntType.clampToNonPositive(-2n), -2n);
  assertStrictEquals(BigIntType.clampToNonPositive(-1n), -1n);
  assertStrictEquals(BigIntType.clampToNonPositive(-0n), 0n);
  assertStrictEquals(BigIntType.clampToNonPositive(0n), 0n);
  assertStrictEquals(BigIntType.clampToNonPositive(1n), 0n);
  assertStrictEquals(BigIntType.clampToNonPositive(2n), 0n);
  assertStrictEquals(BigIntType.clampToNonPositive(BigInt(SIMAX)), 0n);

  const e1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clampToNonPositive(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.clampToNegative()", () => {
  assertStrictEquals(BigIntType.clampToNegative(BigInt(SIMIN)), BigInt(SIMIN));
  assertStrictEquals(BigIntType.clampToNegative(-2n), -2n);
  assertStrictEquals(BigIntType.clampToNegative(-1n), -1n);
  assertStrictEquals(BigIntType.clampToNegative(-0n), -1n);
  assertStrictEquals(BigIntType.clampToNegative(0n), -1n);
  assertStrictEquals(BigIntType.clampToNegative(1n), -1n);
  assertStrictEquals(BigIntType.clampToNegative(2n), -1n);
  assertStrictEquals(BigIntType.clampToNegative(BigInt(SIMAX)), -1n);

  const e1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntType.clampToNegative(undefined as unknown as bigint);
    },
    TypeError,
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
  const op2 = { radix: 2 } as const;

  assertStrictEquals(BigIntType.fromString("0", op2), 0n);
  assertStrictEquals(BigIntType.fromString("-0", op2), 0n);
  assertStrictEquals(BigIntType.fromString("+0", op2), 0n);
  assertStrictEquals(BigIntType.fromString("1", op2), 1n);
  assertStrictEquals(BigIntType.fromString("-1", op2), -1n);
  assertStrictEquals(BigIntType.fromString("+1", op2), 1n);
  assertStrictEquals(BigIntType.fromString("10", op2), 2n);
  assertStrictEquals(BigIntType.fromString("-10", op2), -2n);

  assertStrictEquals(BigIntType.fromString("+111", op2), 7n);

  const e1 = "`value` must be a binary representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("2" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 8", () => {
  const op8 = { radix: 8 } as const;

  assertStrictEquals(BigIntType.fromString("0", op8), 0n);
  assertStrictEquals(BigIntType.fromString("-0", op8), 0n);
  assertStrictEquals(BigIntType.fromString("+0", op8), 0n);
  assertStrictEquals(BigIntType.fromString("1", op8), 1n);
  assertStrictEquals(BigIntType.fromString("-1", op8), -1n);
  assertStrictEquals(BigIntType.fromString("+1", op8), 1n);
  assertStrictEquals(BigIntType.fromString("2", op8), 2n);
  assertStrictEquals(BigIntType.fromString("-2", op8), -2n);
  assertStrictEquals(BigIntType.fromString("3", op8), 3n);
  assertStrictEquals(BigIntType.fromString("-3", op8), -3n);
  assertStrictEquals(BigIntType.fromString("4", op8), 4n);
  assertStrictEquals(BigIntType.fromString("-4", op8), -4n);
  assertStrictEquals(BigIntType.fromString("5", op8), 5n);
  assertStrictEquals(BigIntType.fromString("-5", op8), -5n);
  assertStrictEquals(BigIntType.fromString("6", op8), 6n);
  assertStrictEquals(BigIntType.fromString("-6", op8), -6n);
  assertStrictEquals(BigIntType.fromString("7", op8), 7n);
  assertStrictEquals(BigIntType.fromString("-7", op8), -7n);
  assertStrictEquals(BigIntType.fromString("10", op8), 8n);
  assertStrictEquals(BigIntType.fromString("-10", op8), -8n);

  assertStrictEquals(BigIntType.fromString("+111", op8), 73n);

  const e1 = "`value` must be an octal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("8" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 10", () => {
  const op10 = { radix: 10 } as const;

  assertStrictEquals(BigIntType.fromString("0", op10), 0n);
  assertStrictEquals(BigIntType.fromString("-0", op10), 0n);
  assertStrictEquals(BigIntType.fromString("+0", op10), 0n);
  assertStrictEquals(BigIntType.fromString("1", op10), 1n);
  assertStrictEquals(BigIntType.fromString("-1", op10), -1n);
  assertStrictEquals(BigIntType.fromString("+1", op10), 1n);
  assertStrictEquals(BigIntType.fromString("2", op10), 2n);
  assertStrictEquals(BigIntType.fromString("-2", op10), -2n);
  assertStrictEquals(BigIntType.fromString("3", op10), 3n);
  assertStrictEquals(BigIntType.fromString("-3", op10), -3n);
  assertStrictEquals(BigIntType.fromString("4", op10), 4n);
  assertStrictEquals(BigIntType.fromString("-4", op10), -4n);
  assertStrictEquals(BigIntType.fromString("5", op10), 5n);
  assertStrictEquals(BigIntType.fromString("-5", op10), -5n);
  assertStrictEquals(BigIntType.fromString("6", op10), 6n);
  assertStrictEquals(BigIntType.fromString("-6", op10), -6n);
  assertStrictEquals(BigIntType.fromString("7", op10), 7n);
  assertStrictEquals(BigIntType.fromString("-7", op10), -7n);
  assertStrictEquals(BigIntType.fromString("8", op10), 8n);
  assertStrictEquals(BigIntType.fromString("-8", op10), -8n);
  assertStrictEquals(BigIntType.fromString("9", op10), 9n);
  assertStrictEquals(BigIntType.fromString("-9", op10), -9n);
  assertStrictEquals(BigIntType.fromString("10", op10), 10n);
  assertStrictEquals(BigIntType.fromString("-10", op10), -10n);

  assertStrictEquals(BigIntType.fromString("+111", op10), 111n);

  const e1 = "`value` must be a decimal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("A" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.fromString() - 16", () => {
  const op16 = { radix: 16 } as const;

  assertStrictEquals(BigIntType.fromString("0", op16), 0n);
  assertStrictEquals(BigIntType.fromString("-0", op16), 0n);
  assertStrictEquals(BigIntType.fromString("+0", op16), 0n);
  assertStrictEquals(BigIntType.fromString("1", op16), 1n);
  assertStrictEquals(BigIntType.fromString("-1", op16), -1n);
  assertStrictEquals(BigIntType.fromString("+1", op16), 1n);
  assertStrictEquals(BigIntType.fromString("2", op16), 2n);
  assertStrictEquals(BigIntType.fromString("-2", op16), -2n);
  assertStrictEquals(BigIntType.fromString("3", op16), 3n);
  assertStrictEquals(BigIntType.fromString("-3", op16), -3n);
  assertStrictEquals(BigIntType.fromString("4", op16), 4n);
  assertStrictEquals(BigIntType.fromString("-4", op16), -4n);
  assertStrictEquals(BigIntType.fromString("5", op16), 5n);
  assertStrictEquals(BigIntType.fromString("-5", op16), -5n);
  assertStrictEquals(BigIntType.fromString("6", op16), 6n);
  assertStrictEquals(BigIntType.fromString("-6", op16), -6n);
  assertStrictEquals(BigIntType.fromString("7", op16), 7n);
  assertStrictEquals(BigIntType.fromString("-7", op16), -7n);
  assertStrictEquals(BigIntType.fromString("8", op16), 8n);
  assertStrictEquals(BigIntType.fromString("-8", op16), -8n);
  assertStrictEquals(BigIntType.fromString("9", op16), 9n);
  assertStrictEquals(BigIntType.fromString("-9", op16), -9n);
  assertStrictEquals(BigIntType.fromString("A", op16), 10n);
  assertStrictEquals(BigIntType.fromString("-a", op16), -10n);
  assertStrictEquals(BigIntType.fromString("b", op16), 11n);
  assertStrictEquals(BigIntType.fromString("-B", op16), -11n);
  assertStrictEquals(BigIntType.fromString("C", op16), 12n);
  assertStrictEquals(BigIntType.fromString("-c", op16), -12n);
  assertStrictEquals(BigIntType.fromString("d", op16), 13n);
  assertStrictEquals(BigIntType.fromString("-D", op16), -13n);
  assertStrictEquals(BigIntType.fromString("E", op16), 14n);
  assertStrictEquals(BigIntType.fromString("-e", op16), -14n);
  assertStrictEquals(BigIntType.fromString("f", op16), 15n);
  assertStrictEquals(BigIntType.fromString("-F", op16), -15n);
  assertStrictEquals(BigIntType.fromString("10", op16), 16n);
  assertStrictEquals(BigIntType.fromString("-10", op16), -16n);

  assertStrictEquals(BigIntType.fromString("+111", op16), 273n);

  const e1 = "`value` must be a hexadecimal representation of an integer.";
  assertThrows(
    () => {
      BigIntType.fromString(undefined as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntType.fromString("G" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntType.toString()", () => {
  const rfe1 = "`value` must be a `bigint`.";

  assertThrows(
    () => {
      BigIntType.toString(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigIntType.toString(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(BigIntType.toString(-1n), "-1");
  assertStrictEquals(BigIntType.toString(-0n), "0");
  assertStrictEquals(BigIntType.toString(0n), "0");
  assertStrictEquals(BigIntType.toString(1n), "1");

  assertStrictEquals(BigIntType.toString(1111n), "1111");

  assertStrictEquals(BigIntType.toString(2n), "2");
  assertStrictEquals(BigIntType.toString(3n), "3");
  assertStrictEquals(BigIntType.toString(4n), "4");
  assertStrictEquals(BigIntType.toString(5n), "5");
  assertStrictEquals(BigIntType.toString(6n), "6");
  assertStrictEquals(BigIntType.toString(7n), "7");
  assertStrictEquals(BigIntType.toString(8n), "8");
  assertStrictEquals(BigIntType.toString(9n), "9");
  assertStrictEquals(BigIntType.toString(10n), "10");
  assertStrictEquals(BigIntType.toString(11n), "11");
  assertStrictEquals(BigIntType.toString(12n), "12");
  assertStrictEquals(BigIntType.toString(13n), "13");
  assertStrictEquals(BigIntType.toString(14n), "14");
  assertStrictEquals(BigIntType.toString(15n), "15");
  assertStrictEquals(BigIntType.toString(16n), "16");
});

Deno.test("BigIntType.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "10001010111");

  assertStrictEquals(BigIntType.toString(2n, op), "10");
  assertStrictEquals(BigIntType.toString(3n, op), "11");
  assertStrictEquals(BigIntType.toString(4n, op), "100");
  assertStrictEquals(BigIntType.toString(5n, op), "101");
  assertStrictEquals(BigIntType.toString(6n, op), "110");
  assertStrictEquals(BigIntType.toString(7n, op), "111");
  assertStrictEquals(BigIntType.toString(8n, op), "1000");
  assertStrictEquals(BigIntType.toString(9n, op), "1001");
  assertStrictEquals(BigIntType.toString(10n, op), "1010");
  assertStrictEquals(BigIntType.toString(11n, op), "1011");
  assertStrictEquals(BigIntType.toString(12n, op), "1100");
  assertStrictEquals(BigIntType.toString(13n, op), "1101");
  assertStrictEquals(BigIntType.toString(14n, op), "1110");
  assertStrictEquals(BigIntType.toString(15n, op), "1111");
  assertStrictEquals(BigIntType.toString(16n, op), "10000");
});

Deno.test("BigIntType.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "2127");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "10");
  assertStrictEquals(BigIntType.toString(9n, op), "11");
  assertStrictEquals(BigIntType.toString(10n, op), "12");
  assertStrictEquals(BigIntType.toString(11n, op), "13");
  assertStrictEquals(BigIntType.toString(12n, op), "14");
  assertStrictEquals(BigIntType.toString(13n, op), "15");
  assertStrictEquals(BigIntType.toString(14n, op), "16");
  assertStrictEquals(BigIntType.toString(15n, op), "17");
  assertStrictEquals(BigIntType.toString(16n, op), "20");
});

Deno.test("BigIntType.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "1111");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "8");
  assertStrictEquals(BigIntType.toString(9n, op), "9");
  assertStrictEquals(BigIntType.toString(10n, op), "10");
  assertStrictEquals(BigIntType.toString(11n, op), "11");
  assertStrictEquals(BigIntType.toString(12n, op), "12");
  assertStrictEquals(BigIntType.toString(13n, op), "13");
  assertStrictEquals(BigIntType.toString(14n, op), "14");
  assertStrictEquals(BigIntType.toString(15n, op), "15");
  assertStrictEquals(BigIntType.toString(16n, op), "16");
});

Deno.test("BigIntType.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "457");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "8");
  assertStrictEquals(BigIntType.toString(9n, op), "9");
  assertStrictEquals(BigIntType.toString(10n, op), "A");
  assertStrictEquals(BigIntType.toString(11n, op), "B");
  assertStrictEquals(BigIntType.toString(12n, op), "C");
  assertStrictEquals(BigIntType.toString(13n, op), "D");
  assertStrictEquals(BigIntType.toString(14n, op), "E");
  assertStrictEquals(BigIntType.toString(15n, op), "F");
  assertStrictEquals(BigIntType.toString(16n, op), "10");
});

Deno.test("BigIntType.toString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 2 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "1111");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "8");
  assertStrictEquals(BigIntType.toString(9n, op), "9");
  assertStrictEquals(BigIntType.toString(10n, op), "10");
  assertStrictEquals(BigIntType.toString(11n, op), "11");
  assertStrictEquals(BigIntType.toString(12n, op), "12");
  assertStrictEquals(BigIntType.toString(13n, op), "13");
  assertStrictEquals(BigIntType.toString(14n, op), "14");
  assertStrictEquals(BigIntType.toString(15n, op), "15");
  assertStrictEquals(BigIntType.toString(16n, op), "16");
});

Deno.test("BigIntType.fromNumber()", () => {
  const rfe1 = "`value` must be a `number`.";
  const rfe2 = "`value` must not be `NaN`.";

  assertThrows(
    () => {
      BigIntType.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigIntType.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigIntType.fromNumber(Number.NaN);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(
    BigIntType.fromNumber(Number.POSITIVE_INFINITY),
    BigInt(SIMAX),
  );
  assertStrictEquals(
    BigIntType.fromNumber(Number.NEGATIVE_INFINITY),
    BigInt(SIMIN),
  );

  // assertThrows(
  //   () => {
  //     BigIntType.fromNumber(Number.POSITIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  // assertThrows(
  //   () => {
  //     BigIntType.fromNumber(Number.NEGATIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  assertStrictEquals(BigIntType.fromNumber(0.5), 0n);

  assertStrictEquals(BigIntType.fromNumber(-1), -1n);
  assertStrictEquals(BigIntType.fromNumber(-0), 0n);
  assertStrictEquals(BigIntType.fromNumber(0), 0n);
  assertStrictEquals(BigIntType.fromNumber(1), 1n);

  assertStrictEquals(BigIntType.fromNumber(SIMAX), BigInt(SIMAX));
  assertStrictEquals(BigIntType.fromNumber(SIMIN), BigInt(SIMIN));
});
