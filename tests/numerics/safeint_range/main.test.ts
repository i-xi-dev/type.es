import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { SafeIntRange } = Numerics;

const _MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.SafeIntRange.sizeOf()", () => {
  assertStrictEquals(SafeIntRange.sizeOf([0, 0]), 1);
  assertStrictEquals(SafeIntRange.sizeOf([0, 0x7FFFFFFF]), 0x80000000);
  assertStrictEquals(SafeIntRange.sizeOf([0, _MAX - 1]), _MAX);
  assertStrictEquals(SafeIntRange.sizeOf([1, _MAX]), _MAX);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntRange.sizeOf(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      SafeIntRange.sizeOf([0, _MAX]);
    },
    RangeError,
    "The size of `range` overflowed.",
  );
});

Deno.test("Numerics.SafeIntRange.minOf()", () => {
  assertStrictEquals(SafeIntRange.minOf([0, 0]), 0);
  assertStrictEquals(SafeIntRange.minOf([0, 0x7FFFFFFF]), 0);
  assertStrictEquals(SafeIntRange.minOf([0, _MAX - 1]), 0);
  assertStrictEquals(SafeIntRange.minOf([1, _MAX]), 1);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntRange.minOf(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.SafeIntRange.maxOf()", () => {
  assertStrictEquals(SafeIntRange.maxOf([0, 0]), 0);
  assertStrictEquals(SafeIntRange.maxOf([0, 0x7FFFFFFF]), 0x7FFFFFFF);
  assertStrictEquals(SafeIntRange.maxOf([0, _MAX - 1]), _MAX - 1);
  assertStrictEquals(SafeIntRange.maxOf([1, _MAX]), _MAX);

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntRange.maxOf(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.SafeIntRange.toIterable()", () => {
  const i1 = SafeIntRange.toIterable([0, 0]);
  assertStrictEquals(JSON.stringify([...i1]), "[0]");

  const i2 = SafeIntRange.toIterable([0, 9]);
  assertStrictEquals(JSON.stringify([...i2]), "[0,1,2,3,4,5,6,7,8,9]");

  const i3 = SafeIntRange.toIterable([-9, 0]);
  assertStrictEquals(JSON.stringify([...i3]), "[-9,-8,-7,-6,-5,-4,-3,-2,-1,0]");

  const e1 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntRange.toIterable(undefined as unknown as [0, 0]);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      SafeIntRange.toIterable([0, -1]);
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

Deno.test("Numerics.SafeIntRange.equals()", () => {
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m1_0), true);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m2_0), true);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.equals(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.equals(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      SafeIntRange.equals(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntRange.equals([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("Numerics.SafeIntRange.overlaps()", () => {
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_0, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p1, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p1, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_0_p2, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p1_p2, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_p2_p2, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_0, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_0_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_m1, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_0, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_0_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m1, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_m2, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m1_p1, r_m2_p2), true);

  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.overlaps(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      SafeIntRange.overlaps(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntRange.overlaps([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("Numerics.SafeIntRange.covers()", () => {
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m1_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_0_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m1_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m2_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_0_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.covers(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.covers(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      SafeIntRange.covers(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntRange.covers([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("Numerics.SafeIntRange.isDisjoint()", () => {
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_0_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m2_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_0_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_0_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_0_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_0_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isDisjoint(r_m2_p2, r_m2_p2), false);

  assertThrows(
    () => {
      SafeIntRange.isDisjoint(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntRange.isDisjoint([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("Numerics.SafeIntRange.isAdjacent()", () => {
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_0_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m2_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m2_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_0_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_0_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m2_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_0_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_p1_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_p1_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_0, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_0_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_0_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_0_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m1_0), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m1_m1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m1_p1), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_p2_p2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m2_m2), true);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_0_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_0_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_0_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m1_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m2_0), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(SafeIntRange.isAdjacent(r_m2_p2, r_m2_p2), false);

  assertThrows(
    () => {
      SafeIntRange.isAdjacent(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    "`a` must be a range of safe integer.",
  );
  assertThrows(
    () => {
      SafeIntRange.isAdjacent([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    "`b` must be a range of safe integer.",
  );
});

Deno.test("Numerics.SafeIntRange.includes()", () => {
  assertStrictEquals(SafeIntRange.includes(r_0_0, -1), false);
  assertStrictEquals(SafeIntRange.includes(r_0_0, -0), true);
  assertStrictEquals(SafeIntRange.includes(r_0_0, 0), true);
  assertStrictEquals(SafeIntRange.includes(r_0_0, 1), false);

  assertStrictEquals(SafeIntRange.includes(r_0_p1, -1), false);
  assertStrictEquals(SafeIntRange.includes(r_0_p1, -0), true);
  assertStrictEquals(SafeIntRange.includes(r_0_p1, 0), true);
  assertStrictEquals(SafeIntRange.includes(r_0_p1, 1), true);
  assertStrictEquals(SafeIntRange.includes(r_0_p1, 2), false);

  assertStrictEquals(SafeIntRange.includes(r_m1_0, -2), false);
  assertStrictEquals(SafeIntRange.includes(r_m1_0, -1), true);
  assertStrictEquals(SafeIntRange.includes(r_m1_0, -0), true);
  assertStrictEquals(SafeIntRange.includes(r_m1_0, 0), true);
  assertStrictEquals(SafeIntRange.includes(r_m1_0, 1), false);
});

function _s(r: [number, number] | null): string | null {
  if (r === null) {
    return null;
  }
  return r.map((i) => i.toString()).join(",");
}

Deno.test("Numerics.SafeIntRange.mergeIfPossible()", () => {
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([0, 0], [0, 0])),
    _s([0, 0]),
  );

  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([0, 2], [1, 3])),
    _s([0, 3]),
  );
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([0, 2], [2, 4])),
    _s([0, 4]),
  );
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([0, 1], [2, 3])),
    _s([0, 3]),
  );
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([0, 1], [3, 4])),
    _s(null),
  );

  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([1, 3], [0, 2])),
    _s([0, 3]),
  );
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([2, 4], [0, 2])),
    _s([0, 4]),
  );
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([2, 3], [0, 1])),
    _s([0, 3]),
  );
  assertStrictEquals(
    _s(SafeIntRange.mergeIfPossible([3, 4], [0, 1])),
    _s(null),
  );

  const e1 = "`a` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntRange.mergeIfPossible(undefined as unknown as [0, 0], [0, 0]);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeIntRange.mergeIfPossible([0, 0], undefined as unknown as [0, 0]);
    },
    TypeError,
    e2,
  );
});
