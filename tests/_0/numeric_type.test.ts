import { assertStrictEquals } from "../deps.ts";
import { NumericType } from "../../mod.ts";

Deno.test("NumericType.isPositive()", () => {
  assertStrictEquals(NumericType.isPositive(0), false);
  assertStrictEquals(NumericType.isPositive(-0), false);
  assertStrictEquals(NumericType.isPositive(1), true);
  assertStrictEquals(NumericType.isPositive(-1), false);

  assertStrictEquals(NumericType.isPositive(-10.1), false);
  assertStrictEquals(NumericType.isPositive(-9.9), false);
  assertStrictEquals(NumericType.isPositive(9.9), true);
  assertStrictEquals(NumericType.isPositive(10.1), true);

  assertStrictEquals(NumericType.isPositive(0n), false);
  assertStrictEquals(NumericType.isPositive(-0n), false);
  assertStrictEquals(NumericType.isPositive(1n), true);
  assertStrictEquals(NumericType.isPositive(-1n), false);

  assertStrictEquals(NumericType.isPositive(Number.NaN), false);
  assertStrictEquals(NumericType.isPositive(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(NumericType.isPositive(Number.MAX_SAFE_INTEGER + 1), true);
  assertStrictEquals(NumericType.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(NumericType.isPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    NumericType.isPositive(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(NumericType.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    NumericType.isPositive(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    NumericType.isPositive(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    NumericType.isPositive(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    NumericType.isPositive(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    NumericType.isPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(NumericType.isPositive(null as unknown as number), false);
  assertStrictEquals(NumericType.isPositive(true as unknown as number), false);
  assertStrictEquals(NumericType.isPositive(false as unknown as number), false);
  assertStrictEquals(NumericType.isPositive("" as unknown as number), false);
  assertStrictEquals(NumericType.isPositive("0" as unknown as number), false);
});

Deno.test("NumericType.isNonNegative()", () => {
  assertStrictEquals(NumericType.isNonNegative(0), true);
  assertStrictEquals(NumericType.isNonNegative(-0), true);
  assertStrictEquals(NumericType.isNonNegative(1), true);
  assertStrictEquals(NumericType.isNonNegative(-1), false);

  assertStrictEquals(NumericType.isNonNegative(-10.1), false);
  assertStrictEquals(NumericType.isNonNegative(-9.9), false);
  assertStrictEquals(NumericType.isNonNegative(9.9), true);
  assertStrictEquals(NumericType.isNonNegative(10.1), true);

  assertStrictEquals(NumericType.isNonNegative(0n), true);
  assertStrictEquals(NumericType.isNonNegative(-0n), true);
  assertStrictEquals(NumericType.isNonNegative(1n), true);
  assertStrictEquals(NumericType.isNonNegative(-1n), false);

  assertStrictEquals(NumericType.isNonNegative(Number.NaN), false);
  assertStrictEquals(NumericType.isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(
    NumericType.isNonNegative(Number.MAX_SAFE_INTEGER + 1),
    true,
  );
  assertStrictEquals(NumericType.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(NumericType.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    NumericType.isNonNegative(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(
    NumericType.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    NumericType.isNonNegative(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    NumericType.isNonNegative(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    NumericType.isNonNegative(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    NumericType.isNonNegative(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    NumericType.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    NumericType.isNonNegative(null as unknown as number),
    false,
  );
  assertStrictEquals(
    NumericType.isNonNegative(true as unknown as number),
    false,
  );
  assertStrictEquals(
    NumericType.isNonNegative(false as unknown as number),
    false,
  );
  assertStrictEquals(NumericType.isNonNegative("" as unknown as number), false);
  assertStrictEquals(
    NumericType.isNonNegative("0" as unknown as number),
    false,
  );
});

Deno.test("NumericType.isNonPositive()", () => {
  assertStrictEquals(NumericType.isNonPositive(0), true);
  assertStrictEquals(NumericType.isNonPositive(-0), true);
  assertStrictEquals(NumericType.isNonPositive(1), false);
  assertStrictEquals(NumericType.isNonPositive(-1), true);

  assertStrictEquals(NumericType.isNonPositive(-10.1), true);
  assertStrictEquals(NumericType.isNonPositive(-9.9), true);
  assertStrictEquals(NumericType.isNonPositive(9.9), false);
  assertStrictEquals(NumericType.isNonPositive(10.1), false);

  assertStrictEquals(NumericType.isNonPositive(0n), true);
  assertStrictEquals(NumericType.isNonPositive(-0n), true);
  assertStrictEquals(NumericType.isNonPositive(1n), false);
  assertStrictEquals(NumericType.isNonPositive(-1n), true);

  assertStrictEquals(NumericType.isNonPositive(Number.NaN), false);
  assertStrictEquals(
    NumericType.isNonPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    NumericType.isNonPositive(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(NumericType.isNonPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(NumericType.isNonPositive(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(
    NumericType.isNonPositive(Number.MIN_SAFE_INTEGER - 1),
    true,
  );
  assertStrictEquals(NumericType.isNonPositive(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    NumericType.isNonPositive(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    NumericType.isNonPositive(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    NumericType.isNonPositive(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    NumericType.isNonPositive(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    NumericType.isNonPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    NumericType.isNonPositive(null as unknown as number),
    false,
  );
  assertStrictEquals(
    NumericType.isNonPositive(true as unknown as number),
    false,
  );
  assertStrictEquals(
    NumericType.isNonPositive(false as unknown as number),
    false,
  );
  assertStrictEquals(NumericType.isNonPositive("" as unknown as number), false);
  assertStrictEquals(
    NumericType.isNonPositive("0" as unknown as number),
    false,
  );
});

Deno.test("NumericType.isNegative()", () => {
  assertStrictEquals(NumericType.isNegative(0), false);
  assertStrictEquals(NumericType.isNegative(-0), false);
  assertStrictEquals(NumericType.isNegative(1), false);
  assertStrictEquals(NumericType.isNegative(-1), true);

  assertStrictEquals(NumericType.isNegative(-10.1), true);
  assertStrictEquals(NumericType.isNegative(-9.9), true);
  assertStrictEquals(NumericType.isNegative(9.9), false);
  assertStrictEquals(NumericType.isNegative(10.1), false);

  assertStrictEquals(NumericType.isNegative(0n), false);
  assertStrictEquals(NumericType.isNegative(-0n), false);
  assertStrictEquals(NumericType.isNegative(1n), false);
  assertStrictEquals(NumericType.isNegative(-1n), true);

  assertStrictEquals(NumericType.isNegative(Number.NaN), false);
  assertStrictEquals(NumericType.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(
    NumericType.isNegative(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(NumericType.isNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(NumericType.isNegative(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(NumericType.isNegative(Number.MIN_SAFE_INTEGER - 1), true);
  assertStrictEquals(NumericType.isNegative(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    NumericType.isNegative(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    NumericType.isNegative(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    NumericType.isNegative(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    NumericType.isNegative(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    NumericType.isNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(NumericType.isNegative(null as unknown as number), false);
  assertStrictEquals(NumericType.isNegative(true as unknown as number), false);
  assertStrictEquals(NumericType.isNegative(false as unknown as number), false);
  assertStrictEquals(NumericType.isNegative("" as unknown as number), false);
  assertStrictEquals(NumericType.isNegative("0" as unknown as number), false);
});
