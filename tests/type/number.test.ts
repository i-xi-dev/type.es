import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isNumber()", () => {
  assertStrictEquals(Type.isNumber(0), true);
  assertStrictEquals(Type.isNumber(-0), true);
  assertStrictEquals(Type.isNumber(1), true);
  assertStrictEquals(Type.isNumber(-1), true);

  assertStrictEquals(Type.isNumber(-10.1), true);
  assertStrictEquals(Type.isNumber(-9.9), true);
  assertStrictEquals(Type.isNumber(9.9), true);
  assertStrictEquals(Type.isNumber(10.1), true);

  assertStrictEquals(Type.isNumber(0n), false);
  assertStrictEquals(Type.isNumber(-0n), false);
  assertStrictEquals(Type.isNumber(1n), false);
  assertStrictEquals(Type.isNumber(-1n), false);

  assertStrictEquals(Type.isNumber(Number.NaN), true);
  assertStrictEquals(Type.isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNumber(undefined), false);
  assertStrictEquals(Type.isNumber(null), false);
  assertStrictEquals(Type.isNumber(true), false);
  assertStrictEquals(Type.isNumber(false), false);
  assertStrictEquals(Type.isNumber(""), false);
  assertStrictEquals(Type.isNumber("0"), false);
});

Deno.test("Type.assertNumber()", () => {
  try {
    Type.assertNumber(0, "test-1");
    Type.assertNumber(0.5, "test-1");
    Type.assertNumber(Number.NaN, "test-1");
    Type.assertNumber(Number.POSITIVE_INFINITY, "test-1");
    Type.assertNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertFiniteNumber()", () => {
  try {
    Type.assertFiniteNumber(0, "test-1");
    Type.assertFiniteNumber(0.5, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertFiniteNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFiniteNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFiniteNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFiniteNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFiniteNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFiniteNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isPositiveNumber()", () => {
  assertStrictEquals(Type.isPositiveNumber(0), false);
  assertStrictEquals(Type.isPositiveNumber(-0), false);
  assertStrictEquals(Type.isPositiveNumber(1), true);
  assertStrictEquals(Type.isPositiveNumber(-1), false);

  assertStrictEquals(Type.isPositiveNumber(-10.1), false);
  assertStrictEquals(Type.isPositiveNumber(-9.9), false);
  assertStrictEquals(Type.isPositiveNumber(9.9), true);
  assertStrictEquals(Type.isPositiveNumber(10.1), true);

  assertStrictEquals(Type.isPositiveNumber(0n), false);
  assertStrictEquals(Type.isPositiveNumber(-0n), false);
  assertStrictEquals(Type.isPositiveNumber(1n), false);
  assertStrictEquals(Type.isPositiveNumber(-1n), false);

  assertStrictEquals(Type.isPositiveNumber(Number.NaN), false);
  assertStrictEquals(Type.isPositiveNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isPositiveNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isPositiveNumber(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isPositiveNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isPositiveNumber(undefined), false);
  assertStrictEquals(Type.isPositiveNumber(null), false);
  assertStrictEquals(Type.isPositiveNumber(true), false);
  assertStrictEquals(Type.isPositiveNumber(false), false);
  assertStrictEquals(Type.isPositiveNumber(""), false);
  assertStrictEquals(Type.isPositiveNumber("0"), false);
});

Deno.test("Type.assertPositiveNumber()", () => {
  try {
    Type.assertPositiveNumber(1, "test-1");
    Type.assertPositiveNumber(0.5, "test-1");
    Type.assertPositiveNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonNegativeNumber()", () => {
  assertStrictEquals(Type.isNonNegativeNumber(0), true);
  assertStrictEquals(Type.isNonNegativeNumber(-0), true);
  assertStrictEquals(Type.isNonNegativeNumber(1), true);
  assertStrictEquals(Type.isNonNegativeNumber(-1), false);

  assertStrictEquals(Type.isNonNegativeNumber(-10.1), false);
  assertStrictEquals(Type.isNonNegativeNumber(-9.9), false);
  assertStrictEquals(Type.isNonNegativeNumber(9.9), true);
  assertStrictEquals(Type.isNonNegativeNumber(10.1), true);

  assertStrictEquals(Type.isNonNegativeNumber(0n), false);
  assertStrictEquals(Type.isNonNegativeNumber(-0n), false);
  assertStrictEquals(Type.isNonNegativeNumber(1n), false);
  assertStrictEquals(Type.isNonNegativeNumber(-1n), false);

  assertStrictEquals(Type.isNonNegativeNumber(Number.NaN), false);
  assertStrictEquals(Type.isNonNegativeNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isNonNegativeNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNonNegativeNumber(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonNegativeNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonNegativeNumber(undefined), false);
  assertStrictEquals(Type.isNonNegativeNumber(null), false);
  assertStrictEquals(Type.isNonNegativeNumber(true), false);
  assertStrictEquals(Type.isNonNegativeNumber(false), false);
  assertStrictEquals(Type.isNonNegativeNumber(""), false);
  assertStrictEquals(Type.isNonNegativeNumber("0"), false);
});

Deno.test("Type.assertNonNegativeNumber()", () => {
  try {
    Type.assertNonNegativeNumber(1, "test-1");
    Type.assertNonNegativeNumber(0.5, "test-1");
    Type.assertNonNegativeNumber(0, "test-1");
    Type.assertNonNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeNumber(-0.1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonPositiveNumber()", () => {
  assertStrictEquals(Type.isNonPositiveNumber(0), true);
  assertStrictEquals(Type.isNonPositiveNumber(-0), true);
  assertStrictEquals(Type.isNonPositiveNumber(1), false);
  assertStrictEquals(Type.isNonPositiveNumber(-1), true);

  assertStrictEquals(Type.isNonPositiveNumber(-10.1), true);
  assertStrictEquals(Type.isNonPositiveNumber(-9.9), true);
  assertStrictEquals(Type.isNonPositiveNumber(9.9), false);
  assertStrictEquals(Type.isNonPositiveNumber(10.1), false);

  assertStrictEquals(Type.isNonPositiveNumber(0n), false);
  assertStrictEquals(Type.isNonPositiveNumber(-0n), false);
  assertStrictEquals(Type.isNonPositiveNumber(1n), false);
  assertStrictEquals(Type.isNonPositiveNumber(-1n), false);

  assertStrictEquals(Type.isNonPositiveNumber(Number.NaN), false);
  assertStrictEquals(Type.isNonPositiveNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonPositiveNumber(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonPositiveNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNonPositiveNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNonPositiveNumber(undefined), false);
  assertStrictEquals(Type.isNonPositiveNumber(null), false);
  assertStrictEquals(Type.isNonPositiveNumber(true), false);
  assertStrictEquals(Type.isNonPositiveNumber(false), false);
  assertStrictEquals(Type.isNonPositiveNumber(""), false);
  assertStrictEquals(Type.isNonPositiveNumber("0"), false);
});

Deno.test("Type.assertNonPositiveNumber()", () => {
  try {
    Type.assertNonPositiveNumber(-1, "test-1");
    Type.assertNonPositiveNumber(-0.5, "test-1");
    Type.assertNonPositiveNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNegativeNumber()", () => {
  assertStrictEquals(Type.isNegativeNumber(0), false);
  assertStrictEquals(Type.isNegativeNumber(-0), false);
  assertStrictEquals(Type.isNegativeNumber(1), false);
  assertStrictEquals(Type.isNegativeNumber(-1), true);

  assertStrictEquals(Type.isNegativeNumber(-10.1), true);
  assertStrictEquals(Type.isNegativeNumber(-9.9), true);
  assertStrictEquals(Type.isNegativeNumber(9.9), false);
  assertStrictEquals(Type.isNegativeNumber(10.1), false);

  assertStrictEquals(Type.isNegativeNumber(0n), false);
  assertStrictEquals(Type.isNegativeNumber(-0n), false);
  assertStrictEquals(Type.isNegativeNumber(1n), false);
  assertStrictEquals(Type.isNegativeNumber(-1n), false);

  assertStrictEquals(Type.isNegativeNumber(Number.NaN), false);
  assertStrictEquals(Type.isNegativeNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNegativeNumber(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNegativeNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNegativeNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNegativeNumber(undefined), false);
  assertStrictEquals(Type.isNegativeNumber(null), false);
  assertStrictEquals(Type.isNegativeNumber(true), false);
  assertStrictEquals(Type.isNegativeNumber(false), false);
  assertStrictEquals(Type.isNegativeNumber(""), false);
  assertStrictEquals(Type.isNegativeNumber("0"), false);
});

Deno.test("Type.assertNegativeNumber()", () => {
  try {
    Type.assertNegativeNumber(-1, "test-1");
    Type.assertNegativeNumber(-0.5, "test-1");
    Type.assertNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNumberInRange()", () => {
  assertStrictEquals(Type.isNumberInRange(0, [0, 0]), true);
  // assertStrictEquals(Type.isNumberInRange(0, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0, [0, 1]), true);
  assertStrictEquals(Type.isNumberInRange(0, [-1, 0]), true);
  // assertStrictEquals(Type.isNumberInRange(0, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0, [1, 1]), false);
  assertStrictEquals(Type.isNumberInRange(0, [-1, -1]), false);

  assertStrictEquals(Type.isNumberInRange(0.5, [0, 0]), false);
  // assertStrictEquals(Type.isNumberInRange(0.5, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0.5, [0, 1]), true);
  assertStrictEquals(Type.isNumberInRange(0.5, [-1, 0]), false);
  // assertStrictEquals(Type.isNumberInRange(0.5, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0.5, [1, 1]), false);
  assertStrictEquals(Type.isNumberInRange(0.5, [-1, -1]), false);

  assertStrictEquals(Type.isNumberInRange(1, [0, 0]), false);
  // assertStrictEquals(Type.isNumberInRange(1, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(1, [0, 1]), true);
  assertStrictEquals(Type.isNumberInRange(1, [-1, 0]), false);
  // assertStrictEquals(Type.isNumberInRange(1, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(1, [1, 1]), true);
  assertStrictEquals(Type.isNumberInRange(1, [-1, -1]), false);

  assertStrictEquals(Type.isNumberInRange(-0.5, [0, 0]), false);
  // assertStrictEquals(Type.isNumberInRange(-0.5, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-0.5, [0, 1]), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, [-1, 0]), true);
  // assertStrictEquals(Type.isNumberInRange(-0.5, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-0.5, [1, 1]), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, [-1, -1]), false);

  assertStrictEquals(Type.isNumberInRange(-1, [0, 0]), false);
  // assertStrictEquals(Type.isNumberInRange(-1, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-1, [0, 1]), false);
  assertStrictEquals(Type.isNumberInRange(-1, [-1, 0]), true);
  // assertStrictEquals(Type.isNumberInRange(-1, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-1, [1, 1]), false);
  assertStrictEquals(Type.isNumberInRange(-1, [-1, -1]), true);

  assertStrictEquals(Type.isNumberInRange(0n, [0, 0]), false);
  assertStrictEquals(Type.isNumberInRange(0, [-0.5, 0.5]), true);

  assertStrictEquals(
    Type.isNumberInRange(0, [0, Number.MAX_SAFE_INTEGER]),
    true,
  );

  const emax = "`range` must be a range of `number`.";
  assertThrows(
    () => {
      Type.isNumberInRange(0, [1, 0]);
    },
    TypeError,
    emax,
  );
  assertThrows(
    () => {
      Type.isNumberInRange(0, [0, Number.POSITIVE_INFINITY]);
    },
    TypeError,
    emax,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, [Number.MIN_SAFE_INTEGER, 0]),
    true,
  );

  const emin = "`range` must be a range of `number`.";
  assertThrows(
    () => {
      Type.isNumberInRange(0, [Number.NEGATIVE_INFINITY, 0]);
    },
    TypeError,
    emin,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, [1, Number.MAX_SAFE_INTEGER]),
    false,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, [Number.MIN_SAFE_INTEGER, 1]),
    true,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, [-1, Number.MAX_SAFE_INTEGER]),
    true,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, [Number.MIN_SAFE_INTEGER, -1]),
    false,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, [undefined as unknown as number, 0]);
    },
    TypeError,
    emin,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, [0, undefined as unknown as number]);
    },
    TypeError,
    emax,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, [Number.NaN, 0]);
    },
    TypeError,
    emin,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, [0, Number.NaN]);
    },
    TypeError,
    emax,
  );
});

Deno.test("Type.assertNumberInRange()", () => {
  try {
    Type.assertNumberInRange(0, "test-1", [0, 0]);
    Type.assertNumberInRange(0.5, "test-1", [-1, 1]);
    Type.assertNumberInRange(-0.5, "test-1", [-1, 1]);
    Type.assertNumberInRange(1, "test-1", [-1, 1]);
    Type.assertNumberInRange(-1, "test-1", [-1, 1]);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNumberInRange(0, "test-1", [1, 1]);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNumberInRange(1, "test-1", [0, 0]);
    unreachable();
  } catch {
    //
  }
});

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Type.isSafeInt()", () => {
  assertStrictEquals(Type.isSafeInt(0), true);
  assertStrictEquals(Type.isSafeInt(-0), true);
  assertStrictEquals(Type.isSafeInt(1), true);
  assertStrictEquals(Type.isSafeInt(-1), true);

  assertStrictEquals(Type.isSafeInt(-10.1), false);
  assertStrictEquals(Type.isSafeInt(-9.9), false);
  assertStrictEquals(Type.isSafeInt(9.9), false);
  assertStrictEquals(Type.isSafeInt(10.1), false);

  assertStrictEquals(Type.isSafeInt(0n), false);
  assertStrictEquals(Type.isSafeInt(-0n), false);
  assertStrictEquals(Type.isSafeInt(1n), false);
  assertStrictEquals(Type.isSafeInt(-1n), false);

  assertStrictEquals(Type.isSafeInt(Number.NaN), false);
  assertStrictEquals(Type.isSafeInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isSafeInt(MAX), true);
  assertStrictEquals(Type.isSafeInt(MIN), true);
  assertStrictEquals(Type.isSafeInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isSafeInt(undefined), false);
  assertStrictEquals(Type.isSafeInt(null), false);
  assertStrictEquals(Type.isSafeInt(true), false);
  assertStrictEquals(Type.isSafeInt(false), false);
  assertStrictEquals(Type.isSafeInt(""), false);
  assertStrictEquals(Type.isSafeInt("0"), false);
});

Deno.test("Type.assertSafeInt()", () => {
  try {
    Type.assertSafeInt(0, "test-1");
    Type.assertSafeInt(MAX, "test-1");
    Type.assertSafeInt(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertSafeInt(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertSafeInt(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertSafeInt(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertSafeInt(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertSafeInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertSafeInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertSafeInt(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isPositiveSafeInt()", () => {
  assertStrictEquals(Type.isPositiveSafeInt(0), false);
  assertStrictEquals(Type.isPositiveSafeInt(-0), false);
  assertStrictEquals(Type.isPositiveSafeInt(1), true);
  assertStrictEquals(Type.isPositiveSafeInt(-1), false);

  assertStrictEquals(Type.isPositiveSafeInt(-10.1), false);
  assertStrictEquals(Type.isPositiveSafeInt(-9.9), false);
  assertStrictEquals(Type.isPositiveSafeInt(9.9), false);
  assertStrictEquals(Type.isPositiveSafeInt(10.1), false);

  assertStrictEquals(Type.isPositiveSafeInt(0n), false);
  assertStrictEquals(Type.isPositiveSafeInt(-0n), false);
  assertStrictEquals(Type.isPositiveSafeInt(1n), false);
  assertStrictEquals(Type.isPositiveSafeInt(-1n), false);

  assertStrictEquals(Type.isPositiveSafeInt(Number.NaN), false);
  assertStrictEquals(
    Type.isPositiveSafeInt(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isPositiveSafeInt(MAX), true);
  assertStrictEquals(Type.isPositiveSafeInt(MIN), false);
  assertStrictEquals(
    Type.isPositiveSafeInt(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isPositiveSafeInt(undefined), false);
  assertStrictEquals(Type.isPositiveSafeInt(null), false);
  assertStrictEquals(Type.isPositiveSafeInt(true), false);
  assertStrictEquals(Type.isPositiveSafeInt(false), false);
  assertStrictEquals(Type.isPositiveSafeInt(""), false);
  assertStrictEquals(Type.isPositiveSafeInt("0"), false);
});

Deno.test("Type.assertPositiveSafeInt()", () => {
  try {
    Type.assertPositiveSafeInt(1, "test-1");
    Type.assertPositiveSafeInt(MAX, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveSafeInt(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveSafeInt(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonNegativeSafeInt()", () => {
  assertStrictEquals(Type.isNonNegativeSafeInt(0), true);
  assertStrictEquals(Type.isNonNegativeSafeInt(-0), true);
  assertStrictEquals(Type.isNonNegativeSafeInt(1), true);
  assertStrictEquals(Type.isNonNegativeSafeInt(-1), false);

  assertStrictEquals(Type.isNonNegativeSafeInt(-10.1), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(-9.9), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(9.9), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(10.1), false);

  assertStrictEquals(Type.isNonNegativeSafeInt(0n), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(-0n), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(1n), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(-1n), false);

  assertStrictEquals(Type.isNonNegativeSafeInt(Number.NaN), false);
  assertStrictEquals(
    Type.isNonNegativeSafeInt(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isNonNegativeSafeInt(MAX), true);
  assertStrictEquals(Type.isNonNegativeSafeInt(MIN), false);
  assertStrictEquals(
    Type.isNonNegativeSafeInt(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isNonNegativeSafeInt(undefined), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(null), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(true), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(false), false);
  assertStrictEquals(Type.isNonNegativeSafeInt(""), false);
  assertStrictEquals(Type.isNonNegativeSafeInt("0"), false);
});

Deno.test("Type.assertNonNegativeSafeInt()", () => {
  try {
    Type.assertNonNegativeSafeInt(0, "test-1");
    Type.assertNonNegativeSafeInt(1, "test-1");
    Type.assertNonNegativeSafeInt(MAX, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeSafeInt(-1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeSafeInt(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonPositiveSafeInt()", () => {
  assertStrictEquals(Type.isNonPositiveSafeInt(0), true);
  assertStrictEquals(Type.isNonPositiveSafeInt(-0), true);
  assertStrictEquals(Type.isNonPositiveSafeInt(1), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(-1), true);

  assertStrictEquals(Type.isNonPositiveSafeInt(-10.1), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(-9.9), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(9.9), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(10.1), false);

  assertStrictEquals(Type.isNonPositiveSafeInt(0n), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(-0n), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(1n), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(-1n), false);

  assertStrictEquals(Type.isNonPositiveSafeInt(Number.NaN), false);
  assertStrictEquals(
    Type.isNonPositiveSafeInt(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isNonPositiveSafeInt(MAX), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(MIN), true);
  assertStrictEquals(
    Type.isNonPositiveSafeInt(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isNonPositiveSafeInt(undefined), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(null), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(true), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(false), false);
  assertStrictEquals(Type.isNonPositiveSafeInt(""), false);
  assertStrictEquals(Type.isNonPositiveSafeInt("0"), false);
});

Deno.test("Type.assertNonPositiveSafeInt()", () => {
  try {
    Type.assertNonPositiveSafeInt(0, "test-1");
    Type.assertNonPositiveSafeInt(-1, "test-1");
    Type.assertNonPositiveSafeInt(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveSafeInt(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveSafeInt(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNegativeSafeInt()", () => {
  assertStrictEquals(Type.isNegativeSafeInt(0), false);
  assertStrictEquals(Type.isNegativeSafeInt(-0), false);
  assertStrictEquals(Type.isNegativeSafeInt(1), false);
  assertStrictEquals(Type.isNegativeSafeInt(-1), true);

  assertStrictEquals(Type.isNegativeSafeInt(-10.1), false);
  assertStrictEquals(Type.isNegativeSafeInt(-9.9), false);
  assertStrictEquals(Type.isNegativeSafeInt(9.9), false);
  assertStrictEquals(Type.isNegativeSafeInt(10.1), false);

  assertStrictEquals(Type.isNegativeSafeInt(0n), false);
  assertStrictEquals(Type.isNegativeSafeInt(-0n), false);
  assertStrictEquals(Type.isNegativeSafeInt(1n), false);
  assertStrictEquals(Type.isNegativeSafeInt(-1n), false);

  assertStrictEquals(Type.isNegativeSafeInt(Number.NaN), false);
  assertStrictEquals(
    Type.isNegativeSafeInt(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(Type.isNegativeSafeInt(MAX), false);
  assertStrictEquals(Type.isNegativeSafeInt(MIN), true);
  assertStrictEquals(
    Type.isNegativeSafeInt(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Type.isNegativeSafeInt(undefined), false);
  assertStrictEquals(Type.isNegativeSafeInt(null), false);
  assertStrictEquals(Type.isNegativeSafeInt(true), false);
  assertStrictEquals(Type.isNegativeSafeInt(false), false);
  assertStrictEquals(Type.isNegativeSafeInt(""), false);
  assertStrictEquals(Type.isNegativeSafeInt("0"), false);
});

Deno.test("Type.assertNegativeSafeInt()", () => {
  try {
    Type.assertNegativeSafeInt(-1, "test-1");
    Type.assertNegativeSafeInt(MIN, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeSafeInt(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(0.5, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeSafeInt(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isOddSafeInt()", () => {
  assertStrictEquals(Type.isOddSafeInt(0), false);
  assertStrictEquals(Type.isOddSafeInt(-0), false);
  assertStrictEquals(Type.isOddSafeInt(1), true);
  assertStrictEquals(Type.isOddSafeInt(-1), true);
  assertStrictEquals(Type.isOddSafeInt(2), false);
  assertStrictEquals(Type.isOddSafeInt(-2), false);
  assertStrictEquals(Type.isOddSafeInt(3), true);
  assertStrictEquals(Type.isOddSafeInt(-3), true);
  assertStrictEquals(Type.isOddSafeInt(4), false);
  assertStrictEquals(Type.isOddSafeInt(-4), false);
});

Deno.test("Type.assertOddSafeInt()", () => {
  try {
    Type.assertOddSafeInt(1, "test-1");
    Type.assertOddSafeInt(-1, "test-1");
    Type.assertOddSafeInt(3, "test-1");
    Type.assertOddSafeInt(-3, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertOddSafeInt(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertOddSafeInt(2, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isEvenSafeInt()", () => {
  assertStrictEquals(Type.isEvenSafeInt(0), true);
  assertStrictEquals(Type.isEvenSafeInt(-0), true);
  assertStrictEquals(Type.isEvenSafeInt(1), false);
  assertStrictEquals(Type.isEvenSafeInt(-1), false);
  assertStrictEquals(Type.isEvenSafeInt(2), true);
  assertStrictEquals(Type.isEvenSafeInt(-2), true);
  assertStrictEquals(Type.isEvenSafeInt(3), false);
  assertStrictEquals(Type.isEvenSafeInt(-3), false);
  assertStrictEquals(Type.isEvenSafeInt(4), true);
  assertStrictEquals(Type.isEvenSafeInt(-4), true);
});

Deno.test("Type.assertEvenSafeInt()", () => {
  try {
    Type.assertEvenSafeInt(0, "test-1");
    Type.assertEvenSafeInt(-0, "test-1");
    Type.assertEvenSafeInt(2, "test-1");
    Type.assertEvenSafeInt(-2, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertEvenSafeInt(1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEvenSafeInt(-1, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isSafeIntInRange()", () => {
  assertStrictEquals(Type.isSafeIntInRange(0, [0, 0]), true);
  // assertStrictEquals(Type.isSafeIntInRange(0, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isSafeIntInRange(0, [0, 1]), true);
  assertStrictEquals(Type.isSafeIntInRange(0, [-1, 0]), true);
  // assertStrictEquals(Type.isSafeIntInRange(0, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isSafeIntInRange(0, [1, 1]), false);
  assertStrictEquals(Type.isSafeIntInRange(0, [-1, -1]), false);

  assertStrictEquals(Type.isSafeIntInRange(1, [0, 0]), false);
  // assertStrictEquals(Type.isSafeIntInRange(1, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isSafeIntInRange(1, [0, 1]), true);
  assertStrictEquals(Type.isSafeIntInRange(1, [-1, 0]), false);
  // assertStrictEquals(Type.isSafeIntInRange(1, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isSafeIntInRange(1, [1, 1]), true);
  assertStrictEquals(Type.isSafeIntInRange(1, [-1, -1]), false);

  assertStrictEquals(Type.isSafeIntInRange(-1, [0, 0]), false);
  // assertStrictEquals(Type.isSafeIntInRange(-1, [1, 0]), false); // 負のrange
  assertStrictEquals(Type.isSafeIntInRange(-1, [0, 1]), false);
  assertStrictEquals(Type.isSafeIntInRange(-1, [-1, 0]), true);
  // assertStrictEquals(Type.isSafeIntInRange(-1, [0, -1]), false); // 負のrange
  assertStrictEquals(Type.isSafeIntInRange(-1, [1, 1]), false);
  assertStrictEquals(Type.isSafeIntInRange(-1, [-1, -1]), true);

  assertStrictEquals(Type.isSafeIntInRange(0n, [0, 0]), false);
  assertStrictEquals(Type.isSafeIntInRange(0.5, [-1, 1]), false);

  assertStrictEquals(Type.isSafeIntInRange(0, [0, MAX]), true);
  assertStrictEquals(Type.isSafeIntInRange(0, [MIN, 0]), true);

  assertStrictEquals(Type.isSafeIntInRange(0, [1, MAX]), false);
  assertStrictEquals(Type.isSafeIntInRange(0, [MIN, 1]), true);

  assertStrictEquals(Type.isSafeIntInRange(0, [-1, MAX]), true);
  assertStrictEquals(Type.isSafeIntInRange(0, [MIN, -1]), false);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [1, 0]);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [Number.NEGATIVE_INFINITY, 0]);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [Number.NaN, 0]);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [undefined as unknown as number, 0]);
    },
    TypeError,
    e1,
  );

  const e2 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [0, Number.POSITIVE_INFINITY]);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [0, Number.NaN]);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Type.isSafeIntInRange(0, [0, "0" as unknown as number]);
    },
    TypeError,
    e2,
  );
});

Deno.test("Type.assertSafeIntInRange()", () => {
  try {
    Type.assertSafeIntInRange(0, "test-1", [0, 0]);
    Type.assertSafeIntInRange(1, "test-1", [-1, 1]);
    Type.assertSafeIntInRange(-1, "test-1", [-1, 1]);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertSafeIntInRange(0, "test-1", [1, 1]);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertSafeIntInRange(1, "test-1", [0, 0]);
    unreachable();
  } catch {
    //
  }
});
