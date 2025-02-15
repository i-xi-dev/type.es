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

Deno.test("SafeIntegerRange.toIterable()", () => {
  const i1 = SafeIntegerRange.toIterable([0, 0]);
  assertStrictEquals(JSON.stringify([...i1]), "[0]");

  const i2 = SafeIntegerRange.toIterable([0, 9]);
  assertStrictEquals(JSON.stringify([...i2]), "[0,1,2,3,4,5,6,7,8,9]");

  const i3 = SafeIntegerRange.toIterable([-9, 0]);
  assertStrictEquals(JSON.stringify([...i3]), "[-9,-8,-7,-6,-5,-4,-3,-2,-1,0]");

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntegerRange.toIterable(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      SafeIntegerRange.toIterable([0, -1]);
    },
    RangeError,
    "The size of `range` is non-positive.",
  );
});
