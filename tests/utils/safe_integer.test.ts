import { assertStrictEquals, assertThrows } from "@std/assert";
import { SafeInteger } from "../../mod.ts";

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
