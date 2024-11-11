import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "../deps.ts";
import { NumberType } from "../../mod.ts";

Deno.test("NumberType.assert()", () => {
  try {
    NumberType.assert(0, "test-1");
    NumberType.assert(0.5, "test-1");
    NumberType.assert(Number.NaN, "test-1");
    NumberType.assert(Number.POSITIVE_INFINITY, "test-1");
    NumberType.assert(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumberType.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assert(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumberType.assert(new Number(0), "test-1");
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

Deno.test("NumberType.is()", () => {
  assertStrictEquals(NumberType.is(0), true);
  assertStrictEquals(NumberType.is(-0), true);
  assertStrictEquals(NumberType.is(1), true);
  assertStrictEquals(NumberType.is(-1), true);

  assertStrictEquals(NumberType.is(-10.1), true);
  assertStrictEquals(NumberType.is(-9.9), true);
  assertStrictEquals(NumberType.is(9.9), true);
  assertStrictEquals(NumberType.is(10.1), true);

  assertStrictEquals(NumberType.is(0n), false);
  assertStrictEquals(NumberType.is(-0n), false);
  assertStrictEquals(NumberType.is(1n), false);
  assertStrictEquals(NumberType.is(-1n), false);

  assertStrictEquals(NumberType.is(Number.NaN), true);
  assertStrictEquals(NumberType.is(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(NumberType.is(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.is(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(NumberType.is(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(NumberType.is(undefined), false);
  assertStrictEquals(NumberType.is(null), false);
  assertStrictEquals(NumberType.is(true), false);
  assertStrictEquals(NumberType.is(false), false);
  assertStrictEquals(NumberType.is(""), false);
  assertStrictEquals(NumberType.is("0"), false);
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
  // assertStrictEquals(NumberType.isInRange(0, 0, Number.NaN), false);
  assertStrictEquals(NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, 0), true);
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, 0),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, Number.NaN, 0), false);

  assertStrictEquals(
    NumberType.isInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(
    NumberType.isInRange(0, 1, Number.POSITIVE_INFINITY),
    false,
  );
  // assertStrictEquals(NumberType.isInRange(0, 1, Number.NaN), false);
  assertStrictEquals(NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, 1), true);
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, 1),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, Number.NaN, 1), false);

  assertStrictEquals(
    NumberType.isInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(
    NumberType.isInRange(0, -1, Number.POSITIVE_INFINITY),
    true,
  );
  // assertStrictEquals(NumberType.isInRange(0, -1, Number.NaN), false);
  assertStrictEquals(
    NumberType.isInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );
  assertStrictEquals(
    NumberType.isInRange(0, Number.NEGATIVE_INFINITY, -1),
    false,
  );
  // assertStrictEquals(NumberType.isInRange(0, Number.NaN, -1), false);

  const e1 = "`min` must be a `number`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`max` must be a `number`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, 0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );

  const e3 = "`min` must not be `NaN`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, Number.NaN, 0);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must not be `NaN`.";
  assertThrows(
    () => {
      NumberType.isInRange(0, 0, Number.NaN);
    },
    TypeError,
    e4,
  );
});

Deno.test("NumberType.normalize()", () => {
  assertStrictEquals(Object.is(NumberType.normalize(0), 0), true);
  assertStrictEquals(Object.is(NumberType.normalize(-0), 0), true);
  assertStrictEquals(Object.is(NumberType.normalize(-0), -0), false);

  assertStrictEquals(
    NumberType.normalize(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    NumberType.normalize(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );
  assertStrictEquals(NumberType.normalize(Number.NaN), Number.NaN);
  assertStrictEquals(
    NumberType.normalize(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    NumberType.normalize(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      NumberType.normalize(0n as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("NumberType.clamp()", () => {
  const ex1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      NumberType.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `number`.";
  assertThrows(
    () => {
      NumberType.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `number`.";
  assertThrows(
    () => {
      NumberType.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(NumberType.clamp(0, 0, 0), 0);
  assertStrictEquals(NumberType.clamp(0, 0, 1), 0);
  assertStrictEquals(NumberType.clamp(0, -1, 0), 0);
  assertStrictEquals(NumberType.clamp(0, 1, 1), 1);
  assertStrictEquals(NumberType.clamp(0, -1, -1), -1);

  assertThrows(
    () => {
      NumberType.clamp(0, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberType.clamp(0, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(NumberType.clamp(0.5, 0, 0), 0);
  assertStrictEquals(NumberType.clamp(0.5, 0, 1), 0.5);
  assertStrictEquals(NumberType.clamp(0.5, -1, 0), 0);
  assertStrictEquals(NumberType.clamp(0.5, 1, 1), 1);
  assertStrictEquals(NumberType.clamp(0.5, -1, -1), -1);

  assertStrictEquals(NumberType.clamp(1, 0, 0), 0);
  assertStrictEquals(NumberType.clamp(1, 0, 1), 1);
  assertStrictEquals(NumberType.clamp(1, -1, 0), 0);
  assertStrictEquals(NumberType.clamp(1, 1, 1), 1);
  assertStrictEquals(NumberType.clamp(1, -1, -1), -1);

  assertThrows(
    () => {
      NumberType.clamp(1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberType.clamp(1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(NumberType.clamp(-0.5, 0, 0), 0);
  assertStrictEquals(NumberType.clamp(-0.5, 0, 1), 0);
  assertStrictEquals(NumberType.clamp(-0.5, -1, 0), -0.5);
  assertStrictEquals(NumberType.clamp(-0.5, 1, 1), 1);
  assertStrictEquals(NumberType.clamp(-0.5, -1, -1), -1);

  assertStrictEquals(NumberType.clamp(-1, 0, 0), 0);
  assertStrictEquals(NumberType.clamp(-1, 0, 1), 0);
  assertStrictEquals(NumberType.clamp(-1, -1, 0), -1);
  assertStrictEquals(NumberType.clamp(-1, 1, 1), 1);
  assertStrictEquals(NumberType.clamp(-1, -1, -1), -1);

  assertThrows(
    () => {
      NumberType.clamp(-1, 1, 0); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      NumberType.clamp(-1, 0, -1); // 負のrange
    },
    RangeError,
    e1,
  );
});
