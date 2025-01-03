import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Numerics } from "../../mod.ts";

const { SafeInteger } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeInteger.is()", () => {
  assertStrictEquals(SafeInteger.is(0), true);
  assertStrictEquals(SafeInteger.is(-0), true);
  assertStrictEquals(SafeInteger.is(1), true);
  assertStrictEquals(SafeInteger.is(-1), true);

  assertStrictEquals(SafeInteger.is(-10.1), false);
  assertStrictEquals(SafeInteger.is(-9.9), false);
  assertStrictEquals(SafeInteger.is(9.9), false);
  assertStrictEquals(SafeInteger.is(10.1), false);

  assertStrictEquals(SafeInteger.is(0n), false);
  assertStrictEquals(SafeInteger.is(-0n), false);
  assertStrictEquals(SafeInteger.is(1n), false);
  assertStrictEquals(SafeInteger.is(-1n), false);

  assertStrictEquals(SafeInteger.is(Number.NaN), false);
  assertStrictEquals(SafeInteger.is(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.is(MAX), true);
  assertStrictEquals(SafeInteger.is(MIN), true);
  assertStrictEquals(SafeInteger.is(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(SafeInteger.is(undefined), false);
  assertStrictEquals(SafeInteger.is(null), false);
  assertStrictEquals(SafeInteger.is(true), false);
  assertStrictEquals(SafeInteger.is(false), false);
  assertStrictEquals(SafeInteger.is(""), false);
  assertStrictEquals(SafeInteger.is("0"), false);
});

Deno.test("SafeInteger.isPositive()", () => {
  assertStrictEquals(SafeInteger.isPositive(0), false);
  assertStrictEquals(SafeInteger.isPositive(-0), false);
  assertStrictEquals(SafeInteger.isPositive(1), true);
  assertStrictEquals(SafeInteger.isPositive(-1), false);

  assertStrictEquals(SafeInteger.isPositive(-10.1), false);
  assertStrictEquals(SafeInteger.isPositive(-9.9), false);
  assertStrictEquals(SafeInteger.isPositive(9.9), false);
  assertStrictEquals(SafeInteger.isPositive(10.1), false);

  assertStrictEquals(SafeInteger.isPositive(0n), false);
  assertStrictEquals(SafeInteger.isPositive(-0n), false);
  assertStrictEquals(SafeInteger.isPositive(1n), false);
  assertStrictEquals(SafeInteger.isPositive(-1n), false);

  assertStrictEquals(SafeInteger.isPositive(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isPositive(MAX), true);
  assertStrictEquals(SafeInteger.isPositive(MIN), false);
  assertStrictEquals(
    SafeInteger.isPositive(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeInteger.isPositive(undefined), false);
  assertStrictEquals(SafeInteger.isPositive(null), false);
  assertStrictEquals(SafeInteger.isPositive(true), false);
  assertStrictEquals(SafeInteger.isPositive(false), false);
  assertStrictEquals(SafeInteger.isPositive(""), false);
  assertStrictEquals(SafeInteger.isPositive("0"), false);
});

Deno.test("SafeInteger.isNonNegative()", () => {
  assertStrictEquals(SafeInteger.isNonNegative(0), true);
  assertStrictEquals(SafeInteger.isNonNegative(-0), true);
  assertStrictEquals(SafeInteger.isNonNegative(1), true);
  assertStrictEquals(SafeInteger.isNonNegative(-1), false);

  assertStrictEquals(SafeInteger.isNonNegative(-10.1), false);
  assertStrictEquals(SafeInteger.isNonNegative(-9.9), false);
  assertStrictEquals(SafeInteger.isNonNegative(9.9), false);
  assertStrictEquals(SafeInteger.isNonNegative(10.1), false);

  assertStrictEquals(SafeInteger.isNonNegative(0n), false);
  assertStrictEquals(SafeInteger.isNonNegative(-0n), false);
  assertStrictEquals(SafeInteger.isNonNegative(1n), false);
  assertStrictEquals(SafeInteger.isNonNegative(-1n), false);

  assertStrictEquals(SafeInteger.isNonNegative(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative(MAX), true);
  assertStrictEquals(SafeInteger.isNonNegative(MIN), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeInteger.isNonNegative(undefined), false);
  assertStrictEquals(SafeInteger.isNonNegative(null), false);
  assertStrictEquals(SafeInteger.isNonNegative(true), false);
  assertStrictEquals(SafeInteger.isNonNegative(false), false);
  assertStrictEquals(SafeInteger.isNonNegative(""), false);
  assertStrictEquals(SafeInteger.isNonNegative("0"), false);
});

Deno.test("SafeInteger.isNonPositive()", () => {
  assertStrictEquals(SafeInteger.isNonPositive(0), true);
  assertStrictEquals(SafeInteger.isNonPositive(-0), true);
  assertStrictEquals(SafeInteger.isNonPositive(1), false);
  assertStrictEquals(SafeInteger.isNonPositive(-1), true);

  assertStrictEquals(SafeInteger.isNonPositive(-10.1), false);
  assertStrictEquals(SafeInteger.isNonPositive(-9.9), false);
  assertStrictEquals(SafeInteger.isNonPositive(9.9), false);
  assertStrictEquals(SafeInteger.isNonPositive(10.1), false);

  assertStrictEquals(SafeInteger.isNonPositive(0n), false);
  assertStrictEquals(SafeInteger.isNonPositive(-0n), false);
  assertStrictEquals(SafeInteger.isNonPositive(1n), false);
  assertStrictEquals(SafeInteger.isNonPositive(-1n), false);

  assertStrictEquals(SafeInteger.isNonPositive(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isNonPositive(MAX), false);
  assertStrictEquals(SafeInteger.isNonPositive(MIN), true);
  assertStrictEquals(
    SafeInteger.isNonPositive(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeInteger.isNonPositive(undefined), false);
  assertStrictEquals(SafeInteger.isNonPositive(null), false);
  assertStrictEquals(SafeInteger.isNonPositive(true), false);
  assertStrictEquals(SafeInteger.isNonPositive(false), false);
  assertStrictEquals(SafeInteger.isNonPositive(""), false);
  assertStrictEquals(SafeInteger.isNonPositive("0"), false);
});

Deno.test("SafeInteger.isNegative()", () => {
  assertStrictEquals(SafeInteger.isNegative(0), false);
  assertStrictEquals(SafeInteger.isNegative(-0), false);
  assertStrictEquals(SafeInteger.isNegative(1), false);
  assertStrictEquals(SafeInteger.isNegative(-1), true);

  assertStrictEquals(SafeInteger.isNegative(-10.1), false);
  assertStrictEquals(SafeInteger.isNegative(-9.9), false);
  assertStrictEquals(SafeInteger.isNegative(9.9), false);
  assertStrictEquals(SafeInteger.isNegative(10.1), false);

  assertStrictEquals(SafeInteger.isNegative(0n), false);
  assertStrictEquals(SafeInteger.isNegative(-0n), false);
  assertStrictEquals(SafeInteger.isNegative(1n), false);
  assertStrictEquals(SafeInteger.isNegative(-1n), false);

  assertStrictEquals(SafeInteger.isNegative(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isNegative(MAX), false);
  assertStrictEquals(SafeInteger.isNegative(MIN), true);
  assertStrictEquals(
    SafeInteger.isNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(SafeInteger.isNegative(undefined), false);
  assertStrictEquals(SafeInteger.isNegative(null), false);
  assertStrictEquals(SafeInteger.isNegative(true), false);
  assertStrictEquals(SafeInteger.isNegative(false), false);
  assertStrictEquals(SafeInteger.isNegative(""), false);
  assertStrictEquals(SafeInteger.isNegative("0"), false);
});

Deno.test("SafeInteger.isOdd()", () => {
  assertStrictEquals(SafeInteger.isOdd(0), false);
  assertStrictEquals(SafeInteger.isOdd(-0), false);
  assertStrictEquals(SafeInteger.isOdd(1), true);
  assertStrictEquals(SafeInteger.isOdd(-1), true);
  assertStrictEquals(SafeInteger.isOdd(2), false);
  assertStrictEquals(SafeInteger.isOdd(-2), false);
  assertStrictEquals(SafeInteger.isOdd(3), true);
  assertStrictEquals(SafeInteger.isOdd(-3), true);
  assertStrictEquals(SafeInteger.isOdd(4), false);
  assertStrictEquals(SafeInteger.isOdd(-4), false);
});

Deno.test("SafeInteger.isEven()", () => {
  assertStrictEquals(SafeInteger.isEven(0), true);
  assertStrictEquals(SafeInteger.isEven(-0), true);
  assertStrictEquals(SafeInteger.isEven(1), false);
  assertStrictEquals(SafeInteger.isEven(-1), false);
  assertStrictEquals(SafeInteger.isEven(2), true);
  assertStrictEquals(SafeInteger.isEven(-2), true);
  assertStrictEquals(SafeInteger.isEven(3), false);
  assertStrictEquals(SafeInteger.isEven(-3), false);
  assertStrictEquals(SafeInteger.isEven(4), true);
  assertStrictEquals(SafeInteger.isEven(-4), true);
});

Deno.test("SafeInteger.assert()", () => {
  try {
    SafeInteger.assert(0, "test-1");
    SafeInteger.assert(MAX, "test-1");
    SafeInteger.assert(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assert(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assert(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assert(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assert(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assert(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assert(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.assertPositive()", () => {
  try {
    SafeInteger.assertPositive(1, "test-1");
    SafeInteger.assertPositive(MAX, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assertPositive(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertPositive(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.assertNonNegative()", () => {
  try {
    SafeInteger.assertNonNegative(0, "test-1");
    SafeInteger.assertNonNegative(1, "test-1");
    SafeInteger.assertNonNegative(MAX, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assertNonNegative(-1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonNegative(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.assertNonPositive()", () => {
  try {
    SafeInteger.assertNonPositive(0, "test-1");
    SafeInteger.assertNonPositive(-1, "test-1");
    SafeInteger.assertNonPositive(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assertNonPositive(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNonPositive(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.assertNegative()", () => {
  try {
    SafeInteger.assertNegative(-1, "test-1");
    SafeInteger.assertNegative(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assertNegative(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertNegative(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.assertOdd()", () => {
  try {
    SafeInteger.assertOdd(1, "test-1");
    SafeInteger.assertOdd(-1, "test-1");
    SafeInteger.assertOdd(3, "test-1");
    SafeInteger.assertOdd(-3, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assertOdd(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertOdd(2, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.assertEven()", () => {
  try {
    SafeInteger.assertEven(0, "test-1");
    SafeInteger.assertEven(-0, "test-1");
    SafeInteger.assertEven(2, "test-1");
    SafeInteger.assertEven(-2, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    SafeInteger.assertEven(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    SafeInteger.assertEven(-1, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("SafeInteger.isInRange()", () => {
  assertStrictEquals(SafeInteger.isInRange(0, 0, 0), true);
  assertStrictEquals(SafeInteger.isInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(SafeInteger.isInRange(0, 0, 1), true);
  assertStrictEquals(SafeInteger.isInRange(0, -1, 0), true);
  assertStrictEquals(SafeInteger.isInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(SafeInteger.isInRange(0, 1, 1), false);
  assertStrictEquals(SafeInteger.isInRange(0, -1, -1), false);

  assertStrictEquals(SafeInteger.isInRange(1, 0, 0), false);
  assertStrictEquals(SafeInteger.isInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(SafeInteger.isInRange(1, 0, 1), true);
  assertStrictEquals(SafeInteger.isInRange(1, -1, 0), false);
  assertStrictEquals(SafeInteger.isInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(SafeInteger.isInRange(1, 1, 1), true);
  assertStrictEquals(SafeInteger.isInRange(1, -1, -1), false);

  assertStrictEquals(SafeInteger.isInRange(-1, 0, 0), false);
  assertStrictEquals(SafeInteger.isInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(SafeInteger.isInRange(-1, 0, 1), false);
  assertStrictEquals(SafeInteger.isInRange(-1, -1, 0), true);
  assertStrictEquals(SafeInteger.isInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(SafeInteger.isInRange(-1, 1, 1), false);
  assertStrictEquals(SafeInteger.isInRange(-1, -1, -1), true);

  assertStrictEquals(SafeInteger.isInRange(0n, 0, 0), false);
  assertStrictEquals(SafeInteger.isInRange(0.5, -1, 1), false);

  assertStrictEquals(SafeInteger.isInRange(0, 0, MAX), true);
  assertStrictEquals(SafeInteger.isInRange(0, MIN, 0), true);

  assertStrictEquals(SafeInteger.isInRange(0, 1, MAX), false);
  assertStrictEquals(SafeInteger.isInRange(0, MIN, 1), true);

  assertStrictEquals(SafeInteger.isInRange(0, -1, MAX), true);
  assertStrictEquals(SafeInteger.isInRange(0, MIN, -1), false);

  const e1 = "`min` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.isInRange(0, Number.NEGATIVE_INFINITY, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      SafeInteger.isInRange(0, Number.NaN, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      SafeInteger.isInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`max` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.isInRange(0, 0, Number.POSITIVE_INFINITY);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      SafeInteger.isInRange(0, 0, Number.NaN);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      SafeInteger.isInRange(0, 0, "0" as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("SafeInteger.clamp()", () => {
  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`min` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    e2,
  );

  const e3 = "`max` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must be greater than or equal to `min`.";
  assertThrows(
    () => {
      SafeInteger.clamp(0, 1, 0);
    },
    RangeError,
    e4,
  );

  assertStrictEquals(SafeInteger.clamp(-2, -1, 0), -1);
  assertStrictEquals(SafeInteger.clamp(-1, -1, 0), -1);
  assertStrictEquals(SafeInteger.clamp(0, -1, 0), 0);
  assertStrictEquals(SafeInteger.clamp(1, -1, 0), 0);

  assertStrictEquals(SafeInteger.clamp(-1, 0, 0), 0);
  assertStrictEquals(SafeInteger.clamp(0, 0, 0), 0);
  assertStrictEquals(SafeInteger.clamp(1, 0, 0), 0);

  assertStrictEquals(SafeInteger.clamp(-1, 0, 1), 0);
  assertStrictEquals(SafeInteger.clamp(0, 0, 1), 0);
  assertStrictEquals(SafeInteger.clamp(1, 0, 1), 1);
  assertStrictEquals(SafeInteger.clamp(2, 0, 1), 1);

  assertStrictEquals(SafeInteger.clamp(-1, 0, 2), 0);
  assertStrictEquals(SafeInteger.clamp(0, 0, 2), 0);
  assertStrictEquals(SafeInteger.clamp(1, 0, 2), 1);
  assertStrictEquals(SafeInteger.clamp(2, 0, 2), 2);
  assertStrictEquals(SafeInteger.clamp(3, 0, 2), 2);
});

Deno.test("SafeInteger.clampToPositive()", () => {
  assertStrictEquals(SafeInteger.clampToPositive(MIN), 1);
  assertStrictEquals(SafeInteger.clampToPositive(-2), 1);
  assertStrictEquals(SafeInteger.clampToPositive(-1), 1);
  assertStrictEquals(SafeInteger.clampToPositive(-0), 1);
  assertStrictEquals(SafeInteger.clampToPositive(0), 1);
  assertStrictEquals(SafeInteger.clampToPositive(1), 1);
  assertStrictEquals(SafeInteger.clampToPositive(2), 2);
  assertStrictEquals(SafeInteger.clampToPositive(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.clampToNonNegative()", () => {
  assertStrictEquals(SafeInteger.clampToNonNegative(MIN), 0);
  assertStrictEquals(SafeInteger.clampToNonNegative(-2), 0);
  assertStrictEquals(SafeInteger.clampToNonNegative(-1), 0);
  assertStrictEquals(
    Object.is(SafeInteger.clampToNonNegative(-0), 0),
    true,
  );
  assertStrictEquals(SafeInteger.clampToNonNegative(0), 0);
  assertStrictEquals(SafeInteger.clampToNonNegative(1), 1);
  assertStrictEquals(SafeInteger.clampToNonNegative(2), 2);
  assertStrictEquals(SafeInteger.clampToNonNegative(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToNonNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.clampToNonPositive()", () => {
  assertStrictEquals(SafeInteger.clampToNonPositive(MIN), MIN);
  assertStrictEquals(SafeInteger.clampToNonPositive(-2), -2);
  assertStrictEquals(SafeInteger.clampToNonPositive(-1), -1);
  assertStrictEquals(
    Object.is(SafeInteger.clampToNonPositive(-0), 0),
    true,
  );
  assertStrictEquals(SafeInteger.clampToNonPositive(0), 0);
  assertStrictEquals(SafeInteger.clampToNonPositive(1), 0);
  assertStrictEquals(SafeInteger.clampToNonPositive(2), 0);
  assertStrictEquals(SafeInteger.clampToNonPositive(MAX), 0);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToNonPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.clampToNegative()", () => {
  assertStrictEquals(SafeInteger.clampToNegative(MIN), MIN);
  assertStrictEquals(SafeInteger.clampToNegative(-2), -2);
  assertStrictEquals(SafeInteger.clampToNegative(-1), -1);
  assertStrictEquals(SafeInteger.clampToNegative(-0), -1);
  assertStrictEquals(SafeInteger.clampToNegative(0), -1);
  assertStrictEquals(SafeInteger.clampToNegative(1), -1);
  assertStrictEquals(SafeInteger.clampToNegative(2), -1);
  assertStrictEquals(SafeInteger.clampToNegative(MAX), -1);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.fromBigInt()", () => {
  const rfe1 = "`value` must be a `bigint`.";
  const rfe2 = "`value` must be within the range of safe integer.";

  assertThrows(
    () => {
      SafeInteger.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(MIN) - 1n);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(MAX) + 1n);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromBigInt(BigInt(MIN)), MIN);
  assertStrictEquals(SafeInteger.fromBigInt(-1n), -1);
  assertStrictEquals(SafeInteger.fromBigInt(-0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(1n), 1);
  assertStrictEquals(SafeInteger.fromBigInt(BigInt(MAX)), MAX);
});

Deno.test("SafeInteger.toBigInt()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeInteger.toBigInt(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt("0" as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt(1.5);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.toBigInt(MIN), BigInt(MIN));
  assertStrictEquals(SafeInteger.toBigInt(-1), -1n);
  assertStrictEquals(SafeInteger.toBigInt(-0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(1), 1n);
  assertStrictEquals(SafeInteger.toBigInt(MAX), BigInt(MAX));
});

Deno.test("SafeInteger.fromString()", () => {
  // const rfe1 = "`value` must be a `string`.";
  const rfe2 = "`value` must be a decimal representation of an integer.";

  assertThrows(
    () => {
      SafeInteger.fromString(undefined as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString(0 as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString(0n as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("");
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("a");
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1"), -1);
  assertStrictEquals(SafeInteger.fromString("-0"), 0);
  assertStrictEquals(Object.is(SafeInteger.fromString("-0"), 0), true);
  assertStrictEquals(SafeInteger.fromString("0"), 0);
  assertStrictEquals(SafeInteger.fromString("1"), 1);
  assertStrictEquals(SafeInteger.fromString("1111"), 1111);

  assertStrictEquals(SafeInteger.fromString("+0"), 0);
  assertStrictEquals(SafeInteger.fromString("+1"), 1);

  assertStrictEquals(SafeInteger.fromString("00"), 0);
  assertStrictEquals(SafeInteger.fromString("01"), 1);

  assertStrictEquals(
    SafeInteger.fromString("9007199254740991"),
    9007199254740991,
  );
  assertStrictEquals(
    SafeInteger.fromString("-9007199254740991"),
    -9007199254740991,
  );

  const op2 = { radix: 2 } as const;
  assertStrictEquals(SafeInteger.fromString("11", op2), 3);

  const op8 = { radix: 8 } as const;
  assertStrictEquals(SafeInteger.fromString("11", op8), 9);

  const op16 = { radix: 16 } as const;
  assertStrictEquals(SafeInteger.fromString("1f", op16), 31);
  assertStrictEquals(SafeInteger.fromString("1F", op16), 31);

  const eo = "`value` must be within the range of safe integer.";
  assertThrows(
    () => {
      SafeInteger.fromString("9007199254740992");
    },
    RangeError,
    eo,
  );
  assertThrows(
    () => {
      SafeInteger.fromString("-9007199254740992");
    },
    RangeError,
    eo,
  );
});

Deno.test("SafeInteger.fromString() - radix:2", () => {
  const op = { radix: 2 } as const;

  const rfe2 = "`value` must be a binary representation of an integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("2", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 15);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:8", () => {
  const op = { radix: 8 } as const;

  const rfe2 = "`value` must be an octal representation of an integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("8", op);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("9", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 585);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 1111);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:16", () => {
  const op = { radix: 16 } as const;

  const rfe2 = "`value` must be a hexadecimal representation of an integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("g", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 4369);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);
  assertStrictEquals(SafeInteger.fromString("a", op), 10);
  assertStrictEquals(SafeInteger.fromString("B", op), 11);
  assertStrictEquals(SafeInteger.fromString("c", op), 12);
  assertStrictEquals(SafeInteger.fromString("0d", op), 13);
  assertStrictEquals(SafeInteger.fromString("E", op), 14);
  assertStrictEquals(SafeInteger.fromString("f", op), 15);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 2 } as const;

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 1111);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.toString()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeInteger.toString(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toString(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.toString(-1), "-1");
  assertStrictEquals(SafeInteger.toString(-0), "0");
  assertStrictEquals(SafeInteger.toString(0), "0");
  assertStrictEquals(SafeInteger.toString(1), "1");

  assertStrictEquals(SafeInteger.toString(1111), "1111");

  assertStrictEquals(SafeInteger.toString(2), "2");
  assertStrictEquals(SafeInteger.toString(3), "3");
  assertStrictEquals(SafeInteger.toString(4), "4");
  assertStrictEquals(SafeInteger.toString(5), "5");
  assertStrictEquals(SafeInteger.toString(6), "6");
  assertStrictEquals(SafeInteger.toString(7), "7");
  assertStrictEquals(SafeInteger.toString(8), "8");
  assertStrictEquals(SafeInteger.toString(9), "9");
  assertStrictEquals(SafeInteger.toString(10), "10");
  assertStrictEquals(SafeInteger.toString(11), "11");
  assertStrictEquals(SafeInteger.toString(12), "12");
  assertStrictEquals(SafeInteger.toString(13), "13");
  assertStrictEquals(SafeInteger.toString(14), "14");
  assertStrictEquals(SafeInteger.toString(15), "15");
  assertStrictEquals(SafeInteger.toString(16), "16");
});

Deno.test("SafeInteger.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "10001010111");

  assertStrictEquals(SafeInteger.toString(2, op), "10");
  assertStrictEquals(SafeInteger.toString(3, op), "11");
  assertStrictEquals(SafeInteger.toString(4, op), "100");
  assertStrictEquals(SafeInteger.toString(5, op), "101");
  assertStrictEquals(SafeInteger.toString(6, op), "110");
  assertStrictEquals(SafeInteger.toString(7, op), "111");
  assertStrictEquals(SafeInteger.toString(8, op), "1000");
  assertStrictEquals(SafeInteger.toString(9, op), "1001");
  assertStrictEquals(SafeInteger.toString(10, op), "1010");
  assertStrictEquals(SafeInteger.toString(11, op), "1011");
  assertStrictEquals(SafeInteger.toString(12, op), "1100");
  assertStrictEquals(SafeInteger.toString(13, op), "1101");
  assertStrictEquals(SafeInteger.toString(14, op), "1110");
  assertStrictEquals(SafeInteger.toString(15, op), "1111");
  assertStrictEquals(SafeInteger.toString(16, op), "10000");
});

Deno.test("SafeInteger.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "2127");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "10");
  assertStrictEquals(SafeInteger.toString(9, op), "11");
  assertStrictEquals(SafeInteger.toString(10, op), "12");
  assertStrictEquals(SafeInteger.toString(11, op), "13");
  assertStrictEquals(SafeInteger.toString(12, op), "14");
  assertStrictEquals(SafeInteger.toString(13, op), "15");
  assertStrictEquals(SafeInteger.toString(14, op), "16");
  assertStrictEquals(SafeInteger.toString(15, op), "17");
  assertStrictEquals(SafeInteger.toString(16, op), "20");
});

Deno.test("SafeInteger.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "1111");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "10");
  assertStrictEquals(SafeInteger.toString(11, op), "11");
  assertStrictEquals(SafeInteger.toString(12, op), "12");
  assertStrictEquals(SafeInteger.toString(13, op), "13");
  assertStrictEquals(SafeInteger.toString(14, op), "14");
  assertStrictEquals(SafeInteger.toString(15, op), "15");
  assertStrictEquals(SafeInteger.toString(16, op), "16");
});

Deno.test("SafeInteger.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "457");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "A");
  assertStrictEquals(SafeInteger.toString(11, op), "B");
  assertStrictEquals(SafeInteger.toString(12, op), "C");
  assertStrictEquals(SafeInteger.toString(13, op), "D");
  assertStrictEquals(SafeInteger.toString(14, op), "E");
  assertStrictEquals(SafeInteger.toString(15, op), "F");
  assertStrictEquals(SafeInteger.toString(16, op), "10");
});

Deno.test("SafeInteger.toString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 10 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "1111");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "10");
  assertStrictEquals(SafeInteger.toString(11, op), "11");
  assertStrictEquals(SafeInteger.toString(12, op), "12");
  assertStrictEquals(SafeInteger.toString(13, op), "13");
  assertStrictEquals(SafeInteger.toString(14, op), "14");
  assertStrictEquals(SafeInteger.toString(15, op), "15");
  assertStrictEquals(SafeInteger.toString(16, op), "16");
});
