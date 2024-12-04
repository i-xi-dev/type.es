import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { SafeIntegerType } from "../../mod.ts";

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeIntegerType.is()", () => {
  assertStrictEquals(SafeIntegerType.is(0), true);
  assertStrictEquals(SafeIntegerType.is(-0), true);
  assertStrictEquals(SafeIntegerType.is(1), true);
  assertStrictEquals(SafeIntegerType.is(-1), true);

  assertStrictEquals(SafeIntegerType.is(-10.1), false);
  assertStrictEquals(SafeIntegerType.is(-9.9), false);
  assertStrictEquals(SafeIntegerType.is(9.9), false);
  assertStrictEquals(SafeIntegerType.is(10.1), false);

  assertStrictEquals(SafeIntegerType.is(0n), false);
  assertStrictEquals(SafeIntegerType.is(-0n), false);
  assertStrictEquals(SafeIntegerType.is(1n), false);
  assertStrictEquals(SafeIntegerType.is(-1n), false);

  assertStrictEquals(SafeIntegerType.is(Number.NaN), false);
  assertStrictEquals(SafeIntegerType.is(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeIntegerType.is(MAX), true);
  assertStrictEquals(SafeIntegerType.is(MIN), true);
  assertStrictEquals(SafeIntegerType.is(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(SafeIntegerType.is(undefined), false);
  assertStrictEquals(SafeIntegerType.is(null), false);
  assertStrictEquals(SafeIntegerType.is(true), false);
  assertStrictEquals(SafeIntegerType.is(false), false);
  assertStrictEquals(SafeIntegerType.is(""), false);
  assertStrictEquals(SafeIntegerType.is("0"), false);
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
  assertStrictEquals(SafeIntegerType.isPositive(MAX), true);
  assertStrictEquals(SafeIntegerType.isPositive(MIN), false);
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
  assertStrictEquals(SafeIntegerType.isNonNegative(MAX), true);
  assertStrictEquals(SafeIntegerType.isNonNegative(MIN), false);
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
  assertStrictEquals(SafeIntegerType.isNonPositive(MAX), false);
  assertStrictEquals(SafeIntegerType.isNonPositive(MIN), true);
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
  assertStrictEquals(SafeIntegerType.isNegative(MAX), false);
  assertStrictEquals(SafeIntegerType.isNegative(MIN), true);
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

Deno.test("SafeIntegerType.assert()", () => {
  try {
    SafeIntegerType.assert(0, "test-1");
    SafeIntegerType.assert(MAX, "test-1");
    SafeIntegerType.assert(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeIntegerType.assert(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assert(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assert(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assert(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assert(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeIntegerType.assert(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeIntegerType.assertPositive()", () => {
  try {
    SafeIntegerType.assertPositive(1, "test-1");
    SafeIntegerType.assertPositive(MAX, "test-1");
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
    SafeIntegerType.assertNonNegative(MAX, "test-1");
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
    SafeIntegerType.assertNonPositive(MIN, "test-1");
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
    SafeIntegerType.assertNegative(MIN, "test-1");
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

  assertStrictEquals(SafeIntegerType.isInRange(0, 0, MAX), true);
  assertStrictEquals(SafeIntegerType.isInRange(0, MIN, 0), true);

  assertStrictEquals(SafeIntegerType.isInRange(0, 1, MAX), false);
  assertStrictEquals(SafeIntegerType.isInRange(0, MIN, 1), true);

  assertStrictEquals(SafeIntegerType.isInRange(0, -1, MAX), true);
  assertStrictEquals(SafeIntegerType.isInRange(0, MIN, -1), false);

  const e1 = "`min` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.isInRange(0, Number.NEGATIVE_INFINITY, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      SafeIntegerType.isInRange(0, Number.NaN, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      SafeIntegerType.isInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`max` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.isInRange(0, 0, Number.POSITIVE_INFINITY);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      SafeIntegerType.isInRange(0, 0, Number.NaN);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      SafeIntegerType.isInRange(0, 0, "0" as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("SafeIntegerType.clamp()", () => {
  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`min` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    e2,
  );

  const e3 = "`max` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must be greater than or equal to `min`.";
  assertThrows(
    () => {
      SafeIntegerType.clamp(0, 1, 0);
    },
    RangeError,
    e4,
  );

  assertStrictEquals(SafeIntegerType.clamp(-2, -1, 0), -1);
  assertStrictEquals(SafeIntegerType.clamp(-1, -1, 0), -1);
  assertStrictEquals(SafeIntegerType.clamp(0, -1, 0), 0);
  assertStrictEquals(SafeIntegerType.clamp(1, -1, 0), 0);

  assertStrictEquals(SafeIntegerType.clamp(-1, 0, 0), 0);
  assertStrictEquals(SafeIntegerType.clamp(0, 0, 0), 0);
  assertStrictEquals(SafeIntegerType.clamp(1, 0, 0), 0);

  assertStrictEquals(SafeIntegerType.clamp(-1, 0, 1), 0);
  assertStrictEquals(SafeIntegerType.clamp(0, 0, 1), 0);
  assertStrictEquals(SafeIntegerType.clamp(1, 0, 1), 1);
  assertStrictEquals(SafeIntegerType.clamp(2, 0, 1), 1);

  assertStrictEquals(SafeIntegerType.clamp(-1, 0, 2), 0);
  assertStrictEquals(SafeIntegerType.clamp(0, 0, 2), 0);
  assertStrictEquals(SafeIntegerType.clamp(1, 0, 2), 1);
  assertStrictEquals(SafeIntegerType.clamp(2, 0, 2), 2);
  assertStrictEquals(SafeIntegerType.clamp(3, 0, 2), 2);
});

Deno.test("SafeIntegerType.clampToPositive()", () => {
  assertStrictEquals(SafeIntegerType.clampToPositive(MIN), 1);
  assertStrictEquals(SafeIntegerType.clampToPositive(-2), 1);
  assertStrictEquals(SafeIntegerType.clampToPositive(-1), 1);
  assertStrictEquals(SafeIntegerType.clampToPositive(-0), 1);
  assertStrictEquals(SafeIntegerType.clampToPositive(0), 1);
  assertStrictEquals(SafeIntegerType.clampToPositive(1), 1);
  assertStrictEquals(SafeIntegerType.clampToPositive(2), 2);
  assertStrictEquals(SafeIntegerType.clampToPositive(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clampToPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeIntegerType.clampToNonNegative()", () => {
  assertStrictEquals(SafeIntegerType.clampToNonNegative(MIN), 0);
  assertStrictEquals(SafeIntegerType.clampToNonNegative(-2), 0);
  assertStrictEquals(SafeIntegerType.clampToNonNegative(-1), 0);
  assertStrictEquals(
    Object.is(SafeIntegerType.clampToNonNegative(-0), 0),
    true,
  );
  assertStrictEquals(SafeIntegerType.clampToNonNegative(0), 0);
  assertStrictEquals(SafeIntegerType.clampToNonNegative(1), 1);
  assertStrictEquals(SafeIntegerType.clampToNonNegative(2), 2);
  assertStrictEquals(SafeIntegerType.clampToNonNegative(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clampToNonNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeIntegerType.clampToNonPositive()", () => {
  assertStrictEquals(SafeIntegerType.clampToNonPositive(MIN), MIN);
  assertStrictEquals(SafeIntegerType.clampToNonPositive(-2), -2);
  assertStrictEquals(SafeIntegerType.clampToNonPositive(-1), -1);
  assertStrictEquals(
    Object.is(SafeIntegerType.clampToNonPositive(-0), 0),
    true,
  );
  assertStrictEquals(SafeIntegerType.clampToNonPositive(0), 0);
  assertStrictEquals(SafeIntegerType.clampToNonPositive(1), 0);
  assertStrictEquals(SafeIntegerType.clampToNonPositive(2), 0);
  assertStrictEquals(SafeIntegerType.clampToNonPositive(MAX), 0);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clampToNonPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeIntegerType.clampToNegative()", () => {
  assertStrictEquals(SafeIntegerType.clampToNegative(MIN), MIN);
  assertStrictEquals(SafeIntegerType.clampToNegative(-2), -2);
  assertStrictEquals(SafeIntegerType.clampToNegative(-1), -1);
  assertStrictEquals(SafeIntegerType.clampToNegative(-0), -1);
  assertStrictEquals(SafeIntegerType.clampToNegative(0), -1);
  assertStrictEquals(SafeIntegerType.clampToNegative(1), -1);
  assertStrictEquals(SafeIntegerType.clampToNegative(2), -1);
  assertStrictEquals(SafeIntegerType.clampToNegative(MAX), -1);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.clampToNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeIntegerType.fromBigInt()", () => {
  const rfe1 = "`value` must be a `bigint`.";
  const rfe2 = "`value` must be within the range of safe integer.";

  assertThrows(
    () => {
      SafeIntegerType.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromBigInt(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromBigInt(BigInt(MIN) - 1n);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromBigInt(BigInt(MAX) + 1n);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeIntegerType.fromBigInt(BigInt(MIN)), MIN);
  assertStrictEquals(SafeIntegerType.fromBigInt(-1n), -1);
  assertStrictEquals(SafeIntegerType.fromBigInt(-0n), 0);
  assertStrictEquals(SafeIntegerType.fromBigInt(0n), 0);
  assertStrictEquals(SafeIntegerType.fromBigInt(1n), 1);
  assertStrictEquals(SafeIntegerType.fromBigInt(BigInt(MAX)), MAX);
});

Deno.test("SafeIntegerType.toBigInt()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeIntegerType.toBigInt(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeIntegerType.toBigInt(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeIntegerType.toBigInt("0" as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeIntegerType.toBigInt(1.5);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeIntegerType.toBigInt(MIN), BigInt(MIN));
  assertStrictEquals(SafeIntegerType.toBigInt(-1), -1n);
  assertStrictEquals(SafeIntegerType.toBigInt(-0), 0n);
  assertStrictEquals(SafeIntegerType.toBigInt(0), 0n);
  assertStrictEquals(SafeIntegerType.toBigInt(1), 1n);
  assertStrictEquals(SafeIntegerType.toBigInt(MAX), BigInt(MAX));
});

Deno.test("SafeIntegerType.fromString()", () => {
  // const rfe1 = "`value` must be a `string`.";
  const rfe2 = "`value` must be a decimal representation of an integer.";

  assertThrows(
    () => {
      SafeIntegerType.fromString(undefined as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromString(0 as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromString(0n as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromString("");
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromString("a");
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeIntegerType.fromString("-1"), -1);
  assertStrictEquals(SafeIntegerType.fromString("-0"), 0);
  assertStrictEquals(Object.is(SafeIntegerType.fromString("-0"), 0), true);
  assertStrictEquals(SafeIntegerType.fromString("0"), 0);
  assertStrictEquals(SafeIntegerType.fromString("1"), 1);
  assertStrictEquals(SafeIntegerType.fromString("1111"), 1111);

  assertStrictEquals(SafeIntegerType.fromString("+0"), 0);
  assertStrictEquals(SafeIntegerType.fromString("+1"), 1);

  assertStrictEquals(SafeIntegerType.fromString("00"), 0);
  assertStrictEquals(SafeIntegerType.fromString("01"), 1);

  assertStrictEquals(
    SafeIntegerType.fromString("9007199254740991"),
    9007199254740991,
  );
  assertStrictEquals(
    SafeIntegerType.fromString("-9007199254740991"),
    -9007199254740991,
  );

  const op2 = { radix: 2 } as const;
  assertStrictEquals(SafeIntegerType.fromString("11", op2), 3);

  const op8 = { radix: 8 } as const;
  assertStrictEquals(SafeIntegerType.fromString("11", op8), 9);

  const op16 = { radix: 16 } as const;
  assertStrictEquals(SafeIntegerType.fromString("1f", op16), 31);
  assertStrictEquals(SafeIntegerType.fromString("1F", op16), 31);

  const eo = "`value` must be within the range of safe integer.";
  assertThrows(
    () => {
      SafeIntegerType.fromString("9007199254740992");
    },
    RangeError,
    eo,
  );
  assertThrows(
    () => {
      SafeIntegerType.fromString("-9007199254740992");
    },
    RangeError,
    eo,
  );
});

Deno.test("SafeIntegerType.fromString() - radix:2", () => {
  const op = { radix: 2 } as const;

  const rfe2 = "`value` must be a binary representation of an integer.";

  assertThrows(
    () => {
      SafeIntegerType.fromString("2", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeIntegerType.fromString("-1", op), -1);
  assertStrictEquals(SafeIntegerType.fromString("-0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("1", op), 1);
  assertStrictEquals(SafeIntegerType.fromString("1111", op), 15);

  assertStrictEquals(SafeIntegerType.fromString("+0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("+1", op), 1);

  assertStrictEquals(SafeIntegerType.fromString("00", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("01", op), 1);
});

Deno.test("SafeIntegerType.fromString() - radix:8", () => {
  const op = { radix: 8 } as const;

  const rfe2 = "`value` must be an octal representation of an integer.";

  assertThrows(
    () => {
      SafeIntegerType.fromString("8", op);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeIntegerType.fromString("9", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeIntegerType.fromString("-1", op), -1);
  assertStrictEquals(SafeIntegerType.fromString("-0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("1", op), 1);
  assertStrictEquals(SafeIntegerType.fromString("1111", op), 585);

  assertStrictEquals(SafeIntegerType.fromString("2", op), 2);
  assertStrictEquals(SafeIntegerType.fromString("3", op), 3);
  assertStrictEquals(SafeIntegerType.fromString("4", op), 4);
  assertStrictEquals(SafeIntegerType.fromString("5", op), 5);
  assertStrictEquals(SafeIntegerType.fromString("6", op), 6);
  assertStrictEquals(SafeIntegerType.fromString("7", op), 7);

  assertStrictEquals(SafeIntegerType.fromString("+0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("+1", op), 1);

  assertStrictEquals(SafeIntegerType.fromString("00", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("01", op), 1);
});

Deno.test("SafeIntegerType.fromString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeIntegerType.fromString("-1", op), -1);
  assertStrictEquals(SafeIntegerType.fromString("-0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("1", op), 1);
  assertStrictEquals(SafeIntegerType.fromString("1111", op), 1111);

  assertStrictEquals(SafeIntegerType.fromString("2", op), 2);
  assertStrictEquals(SafeIntegerType.fromString("3", op), 3);
  assertStrictEquals(SafeIntegerType.fromString("4", op), 4);
  assertStrictEquals(SafeIntegerType.fromString("5", op), 5);
  assertStrictEquals(SafeIntegerType.fromString("6", op), 6);
  assertStrictEquals(SafeIntegerType.fromString("7", op), 7);
  assertStrictEquals(SafeIntegerType.fromString("8", op), 8);
  assertStrictEquals(SafeIntegerType.fromString("9", op), 9);

  assertStrictEquals(SafeIntegerType.fromString("+0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("+1", op), 1);

  assertStrictEquals(SafeIntegerType.fromString("00", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("01", op), 1);
});

Deno.test("SafeIntegerType.fromString() - radix:16", () => {
  const op = { radix: 16 } as const;

  const rfe2 = "`value` must be a hexadecimal representation of an integer.";

  assertThrows(
    () => {
      SafeIntegerType.fromString("g", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeIntegerType.fromString("-1", op), -1);
  assertStrictEquals(SafeIntegerType.fromString("-0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("1", op), 1);
  assertStrictEquals(SafeIntegerType.fromString("1111", op), 4369);

  assertStrictEquals(SafeIntegerType.fromString("2", op), 2);
  assertStrictEquals(SafeIntegerType.fromString("3", op), 3);
  assertStrictEquals(SafeIntegerType.fromString("4", op), 4);
  assertStrictEquals(SafeIntegerType.fromString("5", op), 5);
  assertStrictEquals(SafeIntegerType.fromString("6", op), 6);
  assertStrictEquals(SafeIntegerType.fromString("7", op), 7);
  assertStrictEquals(SafeIntegerType.fromString("8", op), 8);
  assertStrictEquals(SafeIntegerType.fromString("9", op), 9);
  assertStrictEquals(SafeIntegerType.fromString("a", op), 10);
  assertStrictEquals(SafeIntegerType.fromString("B", op), 11);
  assertStrictEquals(SafeIntegerType.fromString("c", op), 12);
  assertStrictEquals(SafeIntegerType.fromString("0d", op), 13);
  assertStrictEquals(SafeIntegerType.fromString("E", op), 14);
  assertStrictEquals(SafeIntegerType.fromString("f", op), 15);

  assertStrictEquals(SafeIntegerType.fromString("+0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("+1", op), 1);

  assertStrictEquals(SafeIntegerType.fromString("00", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("01", op), 1);
});

Deno.test("SafeIntegerType.fromString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 2 } as const;

  assertStrictEquals(SafeIntegerType.fromString("-1", op), -1);
  assertStrictEquals(SafeIntegerType.fromString("-0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("1", op), 1);
  assertStrictEquals(SafeIntegerType.fromString("1111", op), 1111);

  assertStrictEquals(SafeIntegerType.fromString("2", op), 2);
  assertStrictEquals(SafeIntegerType.fromString("3", op), 3);
  assertStrictEquals(SafeIntegerType.fromString("4", op), 4);
  assertStrictEquals(SafeIntegerType.fromString("5", op), 5);
  assertStrictEquals(SafeIntegerType.fromString("6", op), 6);
  assertStrictEquals(SafeIntegerType.fromString("7", op), 7);
  assertStrictEquals(SafeIntegerType.fromString("8", op), 8);
  assertStrictEquals(SafeIntegerType.fromString("9", op), 9);

  assertStrictEquals(SafeIntegerType.fromString("+0", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("+1", op), 1);

  assertStrictEquals(SafeIntegerType.fromString("00", op), 0);
  assertStrictEquals(SafeIntegerType.fromString("01", op), 1);
});

Deno.test("SafeIntegerType.toString()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeIntegerType.toString(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeIntegerType.toString(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeIntegerType.toString(-1), "-1");
  assertStrictEquals(SafeIntegerType.toString(-0), "0");
  assertStrictEquals(SafeIntegerType.toString(0), "0");
  assertStrictEquals(SafeIntegerType.toString(1), "1");

  assertStrictEquals(SafeIntegerType.toString(1111), "1111");

  assertStrictEquals(SafeIntegerType.toString(2), "2");
  assertStrictEquals(SafeIntegerType.toString(3), "3");
  assertStrictEquals(SafeIntegerType.toString(4), "4");
  assertStrictEquals(SafeIntegerType.toString(5), "5");
  assertStrictEquals(SafeIntegerType.toString(6), "6");
  assertStrictEquals(SafeIntegerType.toString(7), "7");
  assertStrictEquals(SafeIntegerType.toString(8), "8");
  assertStrictEquals(SafeIntegerType.toString(9), "9");
  assertStrictEquals(SafeIntegerType.toString(10), "10");
  assertStrictEquals(SafeIntegerType.toString(11), "11");
  assertStrictEquals(SafeIntegerType.toString(12), "12");
  assertStrictEquals(SafeIntegerType.toString(13), "13");
  assertStrictEquals(SafeIntegerType.toString(14), "14");
  assertStrictEquals(SafeIntegerType.toString(15), "15");
  assertStrictEquals(SafeIntegerType.toString(16), "16");
});

Deno.test("SafeIntegerType.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(SafeIntegerType.toString(-1, op), "-1");
  assertStrictEquals(SafeIntegerType.toString(-0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(1, op), "1");

  assertStrictEquals(SafeIntegerType.toString(1111, op), "10001010111");

  assertStrictEquals(SafeIntegerType.toString(2, op), "10");
  assertStrictEquals(SafeIntegerType.toString(3, op), "11");
  assertStrictEquals(SafeIntegerType.toString(4, op), "100");
  assertStrictEquals(SafeIntegerType.toString(5, op), "101");
  assertStrictEquals(SafeIntegerType.toString(6, op), "110");
  assertStrictEquals(SafeIntegerType.toString(7, op), "111");
  assertStrictEquals(SafeIntegerType.toString(8, op), "1000");
  assertStrictEquals(SafeIntegerType.toString(9, op), "1001");
  assertStrictEquals(SafeIntegerType.toString(10, op), "1010");
  assertStrictEquals(SafeIntegerType.toString(11, op), "1011");
  assertStrictEquals(SafeIntegerType.toString(12, op), "1100");
  assertStrictEquals(SafeIntegerType.toString(13, op), "1101");
  assertStrictEquals(SafeIntegerType.toString(14, op), "1110");
  assertStrictEquals(SafeIntegerType.toString(15, op), "1111");
  assertStrictEquals(SafeIntegerType.toString(16, op), "10000");
});

Deno.test("SafeIntegerType.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(SafeIntegerType.toString(-1, op), "-1");
  assertStrictEquals(SafeIntegerType.toString(-0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(1, op), "1");

  assertStrictEquals(SafeIntegerType.toString(1111, op), "2127");

  assertStrictEquals(SafeIntegerType.toString(2, op), "2");
  assertStrictEquals(SafeIntegerType.toString(3, op), "3");
  assertStrictEquals(SafeIntegerType.toString(4, op), "4");
  assertStrictEquals(SafeIntegerType.toString(5, op), "5");
  assertStrictEquals(SafeIntegerType.toString(6, op), "6");
  assertStrictEquals(SafeIntegerType.toString(7, op), "7");
  assertStrictEquals(SafeIntegerType.toString(8, op), "10");
  assertStrictEquals(SafeIntegerType.toString(9, op), "11");
  assertStrictEquals(SafeIntegerType.toString(10, op), "12");
  assertStrictEquals(SafeIntegerType.toString(11, op), "13");
  assertStrictEquals(SafeIntegerType.toString(12, op), "14");
  assertStrictEquals(SafeIntegerType.toString(13, op), "15");
  assertStrictEquals(SafeIntegerType.toString(14, op), "16");
  assertStrictEquals(SafeIntegerType.toString(15, op), "17");
  assertStrictEquals(SafeIntegerType.toString(16, op), "20");
});

Deno.test("SafeIntegerType.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeIntegerType.toString(-1, op), "-1");
  assertStrictEquals(SafeIntegerType.toString(-0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(1, op), "1");

  assertStrictEquals(SafeIntegerType.toString(1111, op), "1111");

  assertStrictEquals(SafeIntegerType.toString(2, op), "2");
  assertStrictEquals(SafeIntegerType.toString(3, op), "3");
  assertStrictEquals(SafeIntegerType.toString(4, op), "4");
  assertStrictEquals(SafeIntegerType.toString(5, op), "5");
  assertStrictEquals(SafeIntegerType.toString(6, op), "6");
  assertStrictEquals(SafeIntegerType.toString(7, op), "7");
  assertStrictEquals(SafeIntegerType.toString(8, op), "8");
  assertStrictEquals(SafeIntegerType.toString(9, op), "9");
  assertStrictEquals(SafeIntegerType.toString(10, op), "10");
  assertStrictEquals(SafeIntegerType.toString(11, op), "11");
  assertStrictEquals(SafeIntegerType.toString(12, op), "12");
  assertStrictEquals(SafeIntegerType.toString(13, op), "13");
  assertStrictEquals(SafeIntegerType.toString(14, op), "14");
  assertStrictEquals(SafeIntegerType.toString(15, op), "15");
  assertStrictEquals(SafeIntegerType.toString(16, op), "16");
});

Deno.test("SafeIntegerType.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(SafeIntegerType.toString(-1, op), "-1");
  assertStrictEquals(SafeIntegerType.toString(-0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(1, op), "1");

  assertStrictEquals(SafeIntegerType.toString(1111, op), "457");

  assertStrictEquals(SafeIntegerType.toString(2, op), "2");
  assertStrictEquals(SafeIntegerType.toString(3, op), "3");
  assertStrictEquals(SafeIntegerType.toString(4, op), "4");
  assertStrictEquals(SafeIntegerType.toString(5, op), "5");
  assertStrictEquals(SafeIntegerType.toString(6, op), "6");
  assertStrictEquals(SafeIntegerType.toString(7, op), "7");
  assertStrictEquals(SafeIntegerType.toString(8, op), "8");
  assertStrictEquals(SafeIntegerType.toString(9, op), "9");
  assertStrictEquals(SafeIntegerType.toString(10, op), "A");
  assertStrictEquals(SafeIntegerType.toString(11, op), "B");
  assertStrictEquals(SafeIntegerType.toString(12, op), "C");
  assertStrictEquals(SafeIntegerType.toString(13, op), "D");
  assertStrictEquals(SafeIntegerType.toString(14, op), "E");
  assertStrictEquals(SafeIntegerType.toString(15, op), "F");
  assertStrictEquals(SafeIntegerType.toString(16, op), "10");
});

Deno.test("SafeIntegerType.toString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 10 } as const;

  assertStrictEquals(SafeIntegerType.toString(-1, op), "-1");
  assertStrictEquals(SafeIntegerType.toString(-0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(0, op), "0");
  assertStrictEquals(SafeIntegerType.toString(1, op), "1");

  assertStrictEquals(SafeIntegerType.toString(1111, op), "1111");

  assertStrictEquals(SafeIntegerType.toString(2, op), "2");
  assertStrictEquals(SafeIntegerType.toString(3, op), "3");
  assertStrictEquals(SafeIntegerType.toString(4, op), "4");
  assertStrictEquals(SafeIntegerType.toString(5, op), "5");
  assertStrictEquals(SafeIntegerType.toString(6, op), "6");
  assertStrictEquals(SafeIntegerType.toString(7, op), "7");
  assertStrictEquals(SafeIntegerType.toString(8, op), "8");
  assertStrictEquals(SafeIntegerType.toString(9, op), "9");
  assertStrictEquals(SafeIntegerType.toString(10, op), "10");
  assertStrictEquals(SafeIntegerType.toString(11, op), "11");
  assertStrictEquals(SafeIntegerType.toString(12, op), "12");
  assertStrictEquals(SafeIntegerType.toString(13, op), "13");
  assertStrictEquals(SafeIntegerType.toString(14, op), "14");
  assertStrictEquals(SafeIntegerType.toString(15, op), "15");
  assertStrictEquals(SafeIntegerType.toString(16, op), "16");
});
