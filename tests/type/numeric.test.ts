import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("Type.isNumeric()", () => {
  assertStrictEquals(Type.isNumeric(0), true);
  assertStrictEquals(Type.isNumeric(-0), true);
  assertStrictEquals(Type.isNumeric(1), true);
  assertStrictEquals(Type.isNumeric(-1), true);

  assertStrictEquals(Type.isNumeric(-10.1), true);
  assertStrictEquals(Type.isNumeric(-9.9), true);
  assertStrictEquals(Type.isNumeric(9.9), true);
  assertStrictEquals(Type.isNumeric(10.1), true);

  assertStrictEquals(Type.isNumeric(0n), true);
  assertStrictEquals(Type.isNumeric(-0n), true);
  assertStrictEquals(Type.isNumeric(1n), true);
  assertStrictEquals(Type.isNumeric(-1n), true);

  assertStrictEquals(Type.isNumeric(Number.NaN), true);
  assertStrictEquals(Type.isNumeric(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isNumeric(SIMAX), true);
  assertStrictEquals(Type.isNumeric(SIMIN), true);
  assertStrictEquals(Type.isNumeric(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNumeric(undefined), false);
  assertStrictEquals(Type.isNumeric(null), false);
  assertStrictEquals(Type.isNumeric(true), false);
  assertStrictEquals(Type.isNumeric(false), false);
  assertStrictEquals(Type.isNumeric(""), false);
  assertStrictEquals(Type.isNumeric("0"), false);
});

Deno.test("Type.assertNumeric()", () => {
  try {
    Type.assertNumeric(0, "test-1");
    Type.assertNumeric(0.5, "test-1");
    Type.assertNumeric(Number.NaN, "test-1");
    Type.assertNumeric(Number.POSITIVE_INFINITY, "test-1");
    Type.assertNumeric(Number.NEGATIVE_INFINITY, "test-1");
    Type.assertNumeric(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isPositiveNumeric()", () => {
  assertStrictEquals(Type.isPositiveNumeric(0), false);
  assertStrictEquals(Type.isPositiveNumeric(-0), false);
  assertStrictEquals(Type.isPositiveNumeric(1), true);
  assertStrictEquals(Type.isPositiveNumeric(-1), false);

  assertStrictEquals(Type.isPositiveNumeric(-10.1), false);
  assertStrictEquals(Type.isPositiveNumeric(-9.9), false);
  assertStrictEquals(Type.isPositiveNumeric(9.9), true);
  assertStrictEquals(Type.isPositiveNumeric(10.1), true);

  assertStrictEquals(Type.isPositiveNumeric(0n), false);
  assertStrictEquals(Type.isPositiveNumeric(-0n), false);
  assertStrictEquals(Type.isPositiveNumeric(1n), true);
  assertStrictEquals(Type.isPositiveNumeric(-1n), false);

  assertStrictEquals(Type.isPositiveNumeric(Number.NaN), false);
  assertStrictEquals(Type.isPositiveNumeric(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isPositiveNumeric(Number.MAX_SAFE_INTEGER + 1), true);
  assertStrictEquals(Type.isPositiveNumeric(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isPositiveNumeric(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    Type.isPositiveNumeric(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(Type.isPositiveNumeric(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Type.isPositiveNumeric(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Type.isPositiveNumeric(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Type.isPositiveNumeric(null as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric(true as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric(false as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric("" as unknown as number), false);
  assertStrictEquals(Type.isPositiveNumeric("0" as unknown as number), false);
});

Deno.test("Type.assertPositiveNumeric()", () => {
  try {
    Type.assertPositiveNumeric(0.5, "test-1");
    Type.assertPositiveNumeric(1, "test-1");
    Type.assertPositiveNumeric(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveNumeric(0, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPositiveNumeric(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPositiveNumeric(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPositiveNumeric(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonNegativeNumeric()", () => {
  assertStrictEquals(Type.isNonNegativeNumeric(0), true);
  assertStrictEquals(Type.isNonNegativeNumeric(-0), true);
  assertStrictEquals(Type.isNonNegativeNumeric(1), true);
  assertStrictEquals(Type.isNonNegativeNumeric(-1), false);

  assertStrictEquals(Type.isNonNegativeNumeric(-10.1), false);
  assertStrictEquals(Type.isNonNegativeNumeric(-9.9), false);
  assertStrictEquals(Type.isNonNegativeNumeric(9.9), true);
  assertStrictEquals(Type.isNonNegativeNumeric(10.1), true);

  assertStrictEquals(Type.isNonNegativeNumeric(0n), true);
  assertStrictEquals(Type.isNonNegativeNumeric(-0n), true);
  assertStrictEquals(Type.isNonNegativeNumeric(1n), true);
  assertStrictEquals(Type.isNonNegativeNumeric(-1n), false);

  assertStrictEquals(Type.isNonNegativeNumeric(Number.NaN), false);
  assertStrictEquals(Type.isNonNegativeNumeric(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(
    Type.isNonNegativeNumeric(Number.MAX_SAFE_INTEGER + 1),
    true,
  );
  assertStrictEquals(Type.isNonNegativeNumeric(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNonNegativeNumeric(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    Type.isNonNegativeNumeric(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    Type.isNonNegativeNumeric(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Type.isNonNegativeNumeric(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(true as unknown as number),
    false,
  );
  assertStrictEquals(
    Type.isNonNegativeNumeric(false as unknown as number),
    false,
  );
  assertStrictEquals(Type.isNonNegativeNumeric("" as unknown as number), false);
  assertStrictEquals(
    Type.isNonNegativeNumeric("0" as unknown as number),
    false,
  );
});

Deno.test("Type.assertNonNegativeNumeric()", () => {
  try {
    Type.assertNonNegativeNumeric(0.5, "test-1");
    Type.assertNonNegativeNumeric(1, "test-1");
    Type.assertNonNegativeNumeric(1n, "test-1");
    Type.assertNonNegativeNumeric(0, "test-1");
    Type.assertNonNegativeNumeric(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeNumeric(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNonNegativeNumeric(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNonNegativeNumeric(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonPositiveNumeric()", () => {
  assertStrictEquals(Type.isNonPositiveNumeric(0), true);
  assertStrictEquals(Type.isNonPositiveNumeric(-0), true);
  assertStrictEquals(Type.isNonPositiveNumeric(1), false);
  assertStrictEquals(Type.isNonPositiveNumeric(-1), true);

  assertStrictEquals(Type.isNonPositiveNumeric(-10.1), true);
  assertStrictEquals(Type.isNonPositiveNumeric(-9.9), true);
  assertStrictEquals(Type.isNonPositiveNumeric(9.9), false);
  assertStrictEquals(Type.isNonPositiveNumeric(10.1), false);

  assertStrictEquals(Type.isNonPositiveNumeric(0n), true);
  assertStrictEquals(Type.isNonPositiveNumeric(-0n), true);
  assertStrictEquals(Type.isNonPositiveNumeric(1n), false);
  assertStrictEquals(Type.isNonPositiveNumeric(-1n), true);

  assertStrictEquals(Type.isNonPositiveNumeric(Number.NaN), false);
  assertStrictEquals(
    Type.isNonPositiveNumeric(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(Type.isNonPositiveNumeric(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonPositiveNumeric(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(
    Type.isNonPositiveNumeric(Number.MIN_SAFE_INTEGER - 1),
    true,
  );
  assertStrictEquals(Type.isNonPositiveNumeric(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Type.isNonPositiveNumeric(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    Type.isNonPositiveNumeric(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(true as unknown as number),
    false,
  );
  assertStrictEquals(
    Type.isNonPositiveNumeric(false as unknown as number),
    false,
  );
  assertStrictEquals(Type.isNonPositiveNumeric("" as unknown as number), false);
  assertStrictEquals(
    Type.isNonPositiveNumeric("0" as unknown as number),
    false,
  );
});

Deno.test("Type.assertNonNegativeNumeric()", () => {
  try {
    Type.assertNonPositiveNumeric(-0.5, "test-1");
    Type.assertNonPositiveNumeric(-1, "test-1");
    Type.assertNonPositiveNumeric(-1n, "test-1");
    Type.assertNonPositiveNumeric(0, "test-1");
    Type.assertNonPositiveNumeric(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveNumeric(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNonPositiveNumeric(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNonPositiveNumeric(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNegativeNumeric()", () => {
  assertStrictEquals(Type.isNegativeNumeric(0), false);
  assertStrictEquals(Type.isNegativeNumeric(-0), false);
  assertStrictEquals(Type.isNegativeNumeric(1), false);
  assertStrictEquals(Type.isNegativeNumeric(-1), true);

  assertStrictEquals(Type.isNegativeNumeric(-10.1), true);
  assertStrictEquals(Type.isNegativeNumeric(-9.9), true);
  assertStrictEquals(Type.isNegativeNumeric(9.9), false);
  assertStrictEquals(Type.isNegativeNumeric(10.1), false);

  assertStrictEquals(Type.isNegativeNumeric(0n), false);
  assertStrictEquals(Type.isNegativeNumeric(-0n), false);
  assertStrictEquals(Type.isNegativeNumeric(1n), false);
  assertStrictEquals(Type.isNegativeNumeric(-1n), true);

  assertStrictEquals(Type.isNegativeNumeric(Number.NaN), false);
  assertStrictEquals(Type.isNegativeNumeric(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(
    Type.isNegativeNumeric(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(Type.isNegativeNumeric(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNegativeNumeric(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNegativeNumeric(Number.MIN_SAFE_INTEGER - 1), true);
  assertStrictEquals(Type.isNegativeNumeric(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Type.isNegativeNumeric(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Type.isNegativeNumeric(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Type.isNegativeNumeric(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Type.isNegativeNumeric(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    Type.isNegativeNumeric(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Type.isNegativeNumeric(null as unknown as number), false);
  assertStrictEquals(Type.isNegativeNumeric(true as unknown as number), false);
  assertStrictEquals(Type.isNegativeNumeric(false as unknown as number), false);
  assertStrictEquals(Type.isNegativeNumeric("" as unknown as number), false);
  assertStrictEquals(Type.isNegativeNumeric("0" as unknown as number), false);
});

Deno.test("Type.assertNonNegativeNumeric()", () => {
  try {
    Type.assertNegativeNumeric(-0.5, "test-1");
    Type.assertNegativeNumeric(-1, "test-1");
    Type.assertNegativeNumeric(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeNumeric(0, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNegativeNumeric(0n, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNegativeNumeric(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNegativeNumeric(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNegativeNumeric(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumeric(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumeric(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});
