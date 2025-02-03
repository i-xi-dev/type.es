import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../mod.ts";

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
