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

Deno.test("SafeIntegerRange.minOf()", () => {
  assertStrictEquals(SafeIntegerRange.minOf([0, 0]), 0);
  assertStrictEquals(SafeIntegerRange.minOf([0, 0x7FFFFFFF]), 0);
  assertStrictEquals(SafeIntegerRange.minOf([0, _MAX - 1]), 0);
  assertStrictEquals(SafeIntegerRange.minOf([1, _MAX]), 1);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntegerRange.minOf(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeIntegerRange.maxOf()", () => {
  assertStrictEquals(SafeIntegerRange.maxOf([0, 0]), 0);
  assertStrictEquals(SafeIntegerRange.maxOf([0, 0x7FFFFFFF]), 0x7FFFFFFF);
  assertStrictEquals(SafeIntegerRange.maxOf([0, _MAX - 1]), _MAX - 1);
  assertStrictEquals(SafeIntegerRange.maxOf([1, _MAX]), _MAX);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntegerRange.maxOf(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
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

const r_0_0: [number, number] = [0, 0];
const r_0_p1: [number, number] = [0, 1];
const r_p1_p1: [number, number] = [1, 1];
const r_0_p2: [number, number] = [0, 2];
const r_p1_p2: [number, number] = [1, 2];
const r_p2_p2: [number, number] = [2, 2];
const r_m1_0: [number, number] = [-1, 0];
const r_m1_m1: [number, number] = [-1, -1];
const r_m2_0: [number, number] = [-2, 0];
const r_m2_m1: [number, number] = [-2, -1];
const r_m2_m2: [number, number] = [-2, -2];
const r_m1_p1: [number, number] = [-1, 1];
const r_m2_p2: [number, number] = [-2, 2];

Deno.test("SafeIntegerRange.equals()", () => {
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.equals(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.equals(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      SafeIntegerRange.equals(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntegerRange.equals([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("SafeIntegerRange.overlaps()", () => {
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_0, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p1, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p1, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_0_p2, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p1_p2, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_p2_p2, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_0, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_m1, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_0, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m1, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_m2, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m1_p1, r_m2_p2), true);

  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.overlaps(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      SafeIntegerRange.overlaps(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntegerRange.overlaps([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("SafeIntegerRange.covers()", () => {
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.covers(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      SafeIntegerRange.covers(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntegerRange.covers([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("SafeIntegerRange.isDisjoint()", () => {
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isDisjoint(r_m2_p2, r_m2_p2), false);

  assertThrows(
    () => {
      SafeIntegerRange.isDisjoint(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntegerRange.isDisjoint([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("SafeIntegerRange.isAdjacent()", () => {
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m2_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_p1_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_p1_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_0_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_0_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_0_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m1_0), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m1_m1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m1_p1), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_0_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntegerRange.isAdjacent(r_m2_p2, r_m2_p2), false);

  assertThrows(
    () => {
      SafeIntegerRange.isAdjacent(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntegerRange.isAdjacent([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("SafeIntegerRange.includes()", () => {
  assertStrictEquals(SafeIntegerRange.includes(r_0_0, -1), false);
  assertStrictEquals(SafeIntegerRange.includes(r_0_0, -0), true);
  assertStrictEquals(SafeIntegerRange.includes(r_0_0, 0), true);
  assertStrictEquals(SafeIntegerRange.includes(r_0_0, 1), false);

  assertStrictEquals(SafeIntegerRange.includes(r_0_p1, -1), false);
  assertStrictEquals(SafeIntegerRange.includes(r_0_p1, -0), true);
  assertStrictEquals(SafeIntegerRange.includes(r_0_p1, 0), true);
  assertStrictEquals(SafeIntegerRange.includes(r_0_p1, 1), true);
  assertStrictEquals(SafeIntegerRange.includes(r_0_p1, 2), false);

  assertStrictEquals(SafeIntegerRange.includes(r_m1_0, -2), false);
  assertStrictEquals(SafeIntegerRange.includes(r_m1_0, -1), true);
  assertStrictEquals(SafeIntegerRange.includes(r_m1_0, -0), true);
  assertStrictEquals(SafeIntegerRange.includes(r_m1_0, 0), true);
  assertStrictEquals(SafeIntegerRange.includes(r_m1_0, 1), false);
});
