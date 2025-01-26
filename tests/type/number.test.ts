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
  assertStrictEquals(Type.isNumberInRange(0, 0, 0), true);
  assertStrictEquals(Type.isNumberInRange(0, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0, 0, 1), true);
  assertStrictEquals(Type.isNumberInRange(0, -1, 0), true);
  assertStrictEquals(Type.isNumberInRange(0, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(0, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(0.5, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(0.5, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0.5, 0, 1), true);
  assertStrictEquals(Type.isNumberInRange(0.5, -1, 0), false);
  assertStrictEquals(Type.isNumberInRange(0.5, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(0.5, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(0.5, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(1, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(1, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(1, 0, 1), true);
  assertStrictEquals(Type.isNumberInRange(1, -1, 0), false);
  assertStrictEquals(Type.isNumberInRange(1, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(1, 1, 1), true);
  assertStrictEquals(Type.isNumberInRange(1, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(-0.5, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-0.5, 0, 1), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, -1, 0), true);
  assertStrictEquals(Type.isNumberInRange(-0.5, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-0.5, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(-0.5, -1, -1), false);

  assertStrictEquals(Type.isNumberInRange(-1, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(-1, 1, 0), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-1, 0, 1), false);
  assertStrictEquals(Type.isNumberInRange(-1, -1, 0), true);
  assertStrictEquals(Type.isNumberInRange(-1, 0, -1), false); // 負のrange
  assertStrictEquals(Type.isNumberInRange(-1, 1, 1), false);
  assertStrictEquals(Type.isNumberInRange(-1, -1, -1), true);

  assertStrictEquals(Type.isNumberInRange(0n, 0, 0), false);
  assertStrictEquals(Type.isNumberInRange(0, -0.5, 0.5), true);

  assertStrictEquals(
    Type.isNumberInRange(0, 0, Number.MAX_SAFE_INTEGER),
    true,
  );

  const emax = "`max` must be a finite `number`.";
  assertThrows(
    () => {
      Type.isNumberInRange(0, 0, Number.POSITIVE_INFINITY);
    },
    TypeError,
    emax,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, Number.MIN_SAFE_INTEGER, 0),
    true,
  );

  const emin = "`min` must be a finite `number`.";
  assertThrows(
    () => {
      Type.isNumberInRange(0, Number.NEGATIVE_INFINITY, 0);
    },
    TypeError,
    emin,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, 1, Number.MAX_SAFE_INTEGER),
    false,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, Number.MIN_SAFE_INTEGER, 1),
    true,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, -1, Number.MAX_SAFE_INTEGER),
    true,
  );

  assertStrictEquals(
    Type.isNumberInRange(0, Number.MIN_SAFE_INTEGER, -1),
    false,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, undefined as unknown as number, 0);
    },
    TypeError,
    emin,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, 0, undefined as unknown as number);
    },
    TypeError,
    emax,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, Number.NaN, 0);
    },
    TypeError,
    emin,
  );

  assertThrows(
    () => {
      Type.isNumberInRange(0, 0, Number.NaN);
    },
    TypeError,
    emax,
  );
});

Deno.test("Type.assertNumberInRange()", () => {
  try {
    Type.assertNumberInRange(0, "test-1", 0, 0);
    Type.assertNumberInRange(0.5, "test-1", -1, 1);
    Type.assertNumberInRange(-0.5, "test-1", -1, 1);
    Type.assertNumberInRange(1, "test-1", -1, 1);
    Type.assertNumberInRange(-1, "test-1", -1, 1);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNumberInRange(0, "test-1", 1, 1);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNumberInRange(1, "test-1", 0, 0);
    unreachable();
  } catch {
    //
  }
});
