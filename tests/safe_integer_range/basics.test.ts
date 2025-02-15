import { assertStrictEquals, assertThrows } from "@std/assert";
import { SafeIntegerRange } from "../../mod.ts";

const _MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeIntegerRange.sizeOf()", () => {
  assertStrictEquals(SafeIntegerRange.sizeOf([0, 0]), 1);
  assertStrictEquals(SafeIntegerRange.sizeOf([0, 0x7FFFFFFF]), 0x80000000);
  assertStrictEquals(SafeIntegerRange.sizeOf([0, _MAX - 1]), _MAX);
  assertStrictEquals(SafeIntegerRange.sizeOf([1, _MAX]), _MAX);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntegerRange.sizeOf(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );
  
  assertThrows(
    () => {
      SafeIntegerRange.sizeOf([0, _MAX]);
    },
    RangeError,
    "The size of `range` overflowed.",
  );
});
