import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../mod.ts";

Deno.test("Numerics.isPositive()", () => {
  assertStrictEquals(Numerics.isPositive(0), false);
  assertStrictEquals(Numerics.isPositive(-0), false);
  assertStrictEquals(Numerics.isPositive(1), true);
  assertStrictEquals(Numerics.isPositive(-1), false);

  assertStrictEquals(Numerics.isPositive(-10.1), false);
  assertStrictEquals(Numerics.isPositive(-9.9), false);
  assertStrictEquals(Numerics.isPositive(9.9), true);
  assertStrictEquals(Numerics.isPositive(10.1), true);

  assertStrictEquals(Numerics.isPositive(0n), false);
  assertStrictEquals(Numerics.isPositive(-0n), false);
  assertStrictEquals(Numerics.isPositive(1n), true);
  assertStrictEquals(Numerics.isPositive(-1n), false);

  assertStrictEquals(Numerics.isPositive(Number.NaN), false);
  assertStrictEquals(Numerics.isPositive(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numerics.isPositive(Number.MAX_SAFE_INTEGER + 1), true);
  assertStrictEquals(Numerics.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numerics.isPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    Numerics.isPositive(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(Numerics.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numerics.isPositive(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    Numerics.isPositive(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numerics.isPositive(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numerics.isPositive(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Numerics.isPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numerics.isPositive(null as unknown as number), false);
  assertStrictEquals(Numerics.isPositive(true as unknown as number), false);
  assertStrictEquals(Numerics.isPositive(false as unknown as number), false);
  assertStrictEquals(Numerics.isPositive("" as unknown as number), false);
  assertStrictEquals(Numerics.isPositive("0" as unknown as number), false);
});

Deno.test("Numerics.isNonNegative()", () => {
  assertStrictEquals(Numerics.isNonNegative(0), true);
  assertStrictEquals(Numerics.isNonNegative(-0), true);
  assertStrictEquals(Numerics.isNonNegative(1), true);
  assertStrictEquals(Numerics.isNonNegative(-1), false);

  assertStrictEquals(Numerics.isNonNegative(-10.1), false);
  assertStrictEquals(Numerics.isNonNegative(-9.9), false);
  assertStrictEquals(Numerics.isNonNegative(9.9), true);
  assertStrictEquals(Numerics.isNonNegative(10.1), true);

  assertStrictEquals(Numerics.isNonNegative(0n), true);
  assertStrictEquals(Numerics.isNonNegative(-0n), true);
  assertStrictEquals(Numerics.isNonNegative(1n), true);
  assertStrictEquals(Numerics.isNonNegative(-1n), false);

  assertStrictEquals(Numerics.isNonNegative(Number.NaN), false);
  assertStrictEquals(Numerics.isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(
    Numerics.isNonNegative(Number.MAX_SAFE_INTEGER + 1),
    true,
  );
  assertStrictEquals(Numerics.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numerics.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    Numerics.isNonNegative(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(
    Numerics.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    Numerics.isNonNegative(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    Numerics.isNonNegative(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numerics.isNonNegative(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numerics.isNonNegative(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Numerics.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numerics.isNonNegative(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Numerics.isNonNegative(true as unknown as number),
    false,
  );
  assertStrictEquals(
    Numerics.isNonNegative(false as unknown as number),
    false,
  );
  assertStrictEquals(Numerics.isNonNegative("" as unknown as number), false);
  assertStrictEquals(
    Numerics.isNonNegative("0" as unknown as number),
    false,
  );
});

Deno.test("Numerics.isNonPositive()", () => {
  assertStrictEquals(Numerics.isNonPositive(0), true);
  assertStrictEquals(Numerics.isNonPositive(-0), true);
  assertStrictEquals(Numerics.isNonPositive(1), false);
  assertStrictEquals(Numerics.isNonPositive(-1), true);

  assertStrictEquals(Numerics.isNonPositive(-10.1), true);
  assertStrictEquals(Numerics.isNonPositive(-9.9), true);
  assertStrictEquals(Numerics.isNonPositive(9.9), false);
  assertStrictEquals(Numerics.isNonPositive(10.1), false);

  assertStrictEquals(Numerics.isNonPositive(0n), true);
  assertStrictEquals(Numerics.isNonPositive(-0n), true);
  assertStrictEquals(Numerics.isNonPositive(1n), false);
  assertStrictEquals(Numerics.isNonPositive(-1n), true);

  assertStrictEquals(Numerics.isNonPositive(Number.NaN), false);
  assertStrictEquals(
    Numerics.isNonPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numerics.isNonPositive(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(Numerics.isNonPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Numerics.isNonPositive(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(
    Numerics.isNonPositive(Number.MIN_SAFE_INTEGER - 1),
    true,
  );
  assertStrictEquals(Numerics.isNonPositive(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numerics.isNonPositive(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Numerics.isNonPositive(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numerics.isNonPositive(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numerics.isNonPositive(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    Numerics.isNonPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numerics.isNonPositive(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Numerics.isNonPositive(true as unknown as number),
    false,
  );
  assertStrictEquals(
    Numerics.isNonPositive(false as unknown as number),
    false,
  );
  assertStrictEquals(Numerics.isNonPositive("" as unknown as number), false);
  assertStrictEquals(
    Numerics.isNonPositive("0" as unknown as number),
    false,
  );
});

Deno.test("Numerics.isNegative()", () => {
  assertStrictEquals(Numerics.isNegative(0), false);
  assertStrictEquals(Numerics.isNegative(-0), false);
  assertStrictEquals(Numerics.isNegative(1), false);
  assertStrictEquals(Numerics.isNegative(-1), true);

  assertStrictEquals(Numerics.isNegative(-10.1), true);
  assertStrictEquals(Numerics.isNegative(-9.9), true);
  assertStrictEquals(Numerics.isNegative(9.9), false);
  assertStrictEquals(Numerics.isNegative(10.1), false);

  assertStrictEquals(Numerics.isNegative(0n), false);
  assertStrictEquals(Numerics.isNegative(-0n), false);
  assertStrictEquals(Numerics.isNegative(1n), false);
  assertStrictEquals(Numerics.isNegative(-1n), true);

  assertStrictEquals(Numerics.isNegative(Number.NaN), false);
  assertStrictEquals(Numerics.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(
    Numerics.isNegative(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(Numerics.isNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Numerics.isNegative(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Numerics.isNegative(Number.MIN_SAFE_INTEGER - 1), true);
  assertStrictEquals(Numerics.isNegative(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numerics.isNegative(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Numerics.isNegative(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numerics.isNegative(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numerics.isNegative(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    Numerics.isNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numerics.isNegative(null as unknown as number), false);
  assertStrictEquals(Numerics.isNegative(true as unknown as number), false);
  assertStrictEquals(Numerics.isNegative(false as unknown as number), false);
  assertStrictEquals(Numerics.isNegative("" as unknown as number), false);
  assertStrictEquals(Numerics.isNegative("0" as unknown as number), false);
});
