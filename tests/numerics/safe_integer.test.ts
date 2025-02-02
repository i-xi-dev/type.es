import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { SafeInteger } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

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
