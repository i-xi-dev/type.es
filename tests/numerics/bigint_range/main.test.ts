import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { BigIntRange } = Numerics;

const _MIN = BigInt(Number.MIN_SAFE_INTEGER);
const _MAX = BigInt(Number.MAX_SAFE_INTEGER);

Deno.test("Numerics.BigIntRange.sizeOf()", () => {
  assertStrictEquals(BigIntRange.sizeOf([0n, 0n]), 1n);
  assertStrictEquals(BigIntRange.sizeOf([0n, 0x7FFFFFFFn]), 0x80000000n);
  assertStrictEquals(BigIntRange.sizeOf([0n, _MAX - 1n]), _MAX);
  assertStrictEquals(BigIntRange.sizeOf([1n, _MAX]), _MAX);

  // assertStrictEquals(BigIntRange.sizeOf([0n, _MAX]), _MAX + 1n);
  // assertStrictEquals(BigIntRange.sizeOf([_MIN, _MAX]), _MAX * 2n + 1n);

  const e1 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.sizeOf(undefined as unknown as [0n, 0n]);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntRange.sizeOf([0n, _MAX]);
    },
    RangeError,
    "The size of `range` overflowed.",
  );
});

Deno.test("Numerics.BigIntRange.minOf()", () => {
  assertStrictEquals(BigIntRange.minOf([0n, 0n]), 0n);
  assertStrictEquals(BigIntRange.minOf([0n, 0x7FFFFFFFn]), 0n);
  assertStrictEquals(BigIntRange.minOf([0n, _MAX - 1n]), 0n);
  assertStrictEquals(BigIntRange.minOf([1n, _MAX]), 1n);

  assertStrictEquals(BigIntRange.minOf([0n, _MAX]), 0n);
  assertStrictEquals(BigIntRange.minOf([_MIN, _MAX]), _MIN);

  const e1 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.minOf(undefined as unknown as [0n, 0n]);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigIntRange.maxOf()", () => {
  assertStrictEquals(BigIntRange.maxOf([0n, 0n]), 0n);
  assertStrictEquals(BigIntRange.maxOf([0n, 0x7FFFFFFFn]), 0x7FFFFFFFn);
  assertStrictEquals(BigIntRange.maxOf([0n, _MAX - 1n]), _MAX - 1n);
  assertStrictEquals(BigIntRange.maxOf([1n, _MAX]), _MAX);

  assertStrictEquals(BigIntRange.maxOf([0n, _MAX]), _MAX);
  assertStrictEquals(BigIntRange.maxOf([_MIN, _MAX]), _MAX);

  const e1 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.maxOf(undefined as unknown as [0n, 0n]);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigIntRange.toIterable()", () => {
  const i1 = BigIntRange.toIterable([0n, 0n]);
  assertStrictEquals(JSON.stringify([...i1].map((i) => Number(i))), "[0]");

  const i2 = BigIntRange.toIterable([0n, 9n]);
  assertStrictEquals(
    JSON.stringify([...i2].map((i) => Number(i))),
    "[0,1,2,3,4,5,6,7,8,9]",
  );

  const i3 = BigIntRange.toIterable([-9n, 0n]);
  assertStrictEquals(
    JSON.stringify([...i3].map((i) => Number(i))),
    "[-9,-8,-7,-6,-5,-4,-3,-2,-1,0]",
  );

  const e1 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.toIterable(undefined as unknown as [0n, 0n]);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      BigIntRange.toIterable([0n, -1n]);
    },
    TypeError,
    "`range` must be a range of `bigint`.",
  );
});

const r_0_0: [bigint, bigint] = [0n, 0n];
const r_0_p1: [bigint, bigint] = [0n, 1n];
const r_p1_p1: [bigint, bigint] = [1n, 1n];
const r_0_p2: [bigint, bigint] = [0n, 2n];
const r_p1_p2: [bigint, bigint] = [1n, 2n];
const r_p2_p2: [bigint, bigint] = [2n, 2n];
const r_m1_0: [bigint, bigint] = [-1n, 0n];
const r_m1_m1: [bigint, bigint] = [-1n, -1n];
const r_m2_0: [bigint, bigint] = [-2n, 0n];
const r_m2_m1: [bigint, bigint] = [-2n, -1n];
const r_m2_m2: [bigint, bigint] = [-2n, -2n];
const r_m1_p1: [bigint, bigint] = [-1n, 1n];
const r_m2_p2: [bigint, bigint] = [-2n, 2n];

Deno.test("Numerics.BigIntRange.equals()", () => {
  assertStrictEquals(BigIntRange.equals(r_0_0, r_0_0), true);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_0_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_0_p1), true);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_0_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_0_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m1_0, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m1_0), true);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m2_0, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m2_0), true);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.equals(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.equals(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      BigIntRange.equals(undefined as unknown as [0n, 0n], [0n, 0n]);
    },
    TypeError,
    "`a` must be a range of `bigint`.",
  );
  assertThrows(
    () => {
      BigIntRange.equals([0n, 0n], undefined as unknown as [0n, 0n]);
    },
    TypeError,
    "`b` must be a range of `bigint`.",
  );
});

Deno.test("Numerics.BigIntRange.overlaps()", () => {
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_0, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p1, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p1, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_0_p2, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_p1_p2, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_p2_p2, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m1_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_0, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_0_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_0_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_0_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_m1, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m1_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m2_m2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_0, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_0_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_0_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_0_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m1, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_0_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_0_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_0_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m1_0), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.overlaps(r_m2_m2, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m1_p1, r_m2_p2), true);

  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m1_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m2_0), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.overlaps(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      BigIntRange.overlaps(undefined as unknown as [0n, 0n], [0n, 0n]);
    },
    TypeError,
    "`a` must be a range of `bigint`.",
  );
  assertThrows(
    () => {
      BigIntRange.overlaps([0n, 0n], undefined as unknown as [0n, 0n]);
    },
    TypeError,
    "`b` must be a range of `bigint`.",
  );
});

Deno.test("Numerics.BigIntRange.covers()", () => {
  assertStrictEquals(BigIntRange.covers(r_0_0, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_0_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_0_p1, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_0_p1), true);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_0_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_0_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_0_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m1_0, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m1_0), true);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m1_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_0_0), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m2_0, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m1_0), true);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m1_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m2_0), true);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m2_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m2_m2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_0_0), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_0_0), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_0_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m1_0), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.covers(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_0_p1), true);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m1_0), true);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_0_p2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m1_0), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m2_0), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.covers(r_m2_p2, r_m2_p2), true);

  assertThrows(
    () => {
      BigIntRange.covers(undefined as unknown as [0n, 0n], [0n, 0n]);
    },
    TypeError,
    "`a` must be a range of `bigint`.",
  );
  assertThrows(
    () => {
      BigIntRange.covers([0n, 0n], undefined as unknown as [0n, 0n]);
    },
    TypeError,
    "`b` must be a range of `bigint`.",
  );
});

Deno.test("Numerics.BigIntRange.isDisjoint()", () => {
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_0_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m1_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m2_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_0_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m1_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m2_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m1_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m2_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_0_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_0_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_0_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_0_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_0_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_0_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_0_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_0_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_0_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m1_0), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isDisjoint(r_m2_p2, r_m2_p2), false);

  assertThrows(
    () => {
      BigIntRange.isDisjoint(undefined as unknown as [0n, 0n], [0n, 0n]);
    },
    TypeError,
    "`a` must be a range of `bigint`.",
  );
  assertThrows(
    () => {
      BigIntRange.isDisjoint([0n, 0n], undefined as unknown as [0n, 0n]);
    },
    TypeError,
    "`b` must be a range of `bigint`.",
  );
});

Deno.test("Numerics.BigIntRange.isAdjacent()", () => {
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_0_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m1_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m2_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m2_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_0_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_0_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m1_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m2_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p1_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_0_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_p2_p2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_0_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_0_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_0_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_p1_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_p1_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_0, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_0_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_0_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_0_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m1_0), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m1_m1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m1_p1), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_m2, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_p2_p2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m2_m2), true);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m1_p1, r_m2_p2), false);

  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_0_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_0_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_p1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_0_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_p1_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_p2_p2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m1_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m1_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m2_0), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m2_m1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m2_m2), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m1_p1), false);
  assertStrictEquals(BigIntRange.isAdjacent(r_m2_p2, r_m2_p2), false);

  assertThrows(
    () => {
      BigIntRange.isAdjacent(undefined as unknown as [0n, 0n], [0n, 0n]);
    },
    TypeError,
    "`a` must be a range of `bigint`.",
  );
  assertThrows(
    () => {
      BigIntRange.isAdjacent([0n, 0n], undefined as unknown as [0n, 0n]);
    },
    TypeError,
    "`b` must be a range of `bigint`.",
  );
});

Deno.test("Numerics.BigIntRange.includes()", () => {
  assertStrictEquals(BigIntRange.includes(r_0_0, -1n), false);
  assertStrictEquals(BigIntRange.includes(r_0_0, -0n), true);
  assertStrictEquals(BigIntRange.includes(r_0_0, 0n), true);
  assertStrictEquals(BigIntRange.includes(r_0_0, 1n), false);

  assertStrictEquals(BigIntRange.includes(r_0_p1, -1n), false);
  assertStrictEquals(BigIntRange.includes(r_0_p1, -0n), true);
  assertStrictEquals(BigIntRange.includes(r_0_p1, 0n), true);
  assertStrictEquals(BigIntRange.includes(r_0_p1, 1n), true);
  assertStrictEquals(BigIntRange.includes(r_0_p1, 2n), false);

  assertStrictEquals(BigIntRange.includes(r_m1_0, -2n), false);
  assertStrictEquals(BigIntRange.includes(r_m1_0, -1n), true);
  assertStrictEquals(BigIntRange.includes(r_m1_0, -0n), true);
  assertStrictEquals(BigIntRange.includes(r_m1_0, 0n), true);
  assertStrictEquals(BigIntRange.includes(r_m1_0, 1n), false);
});

function _s(r: [bigint, bigint] | null): string | null {
  if (r === null) {
    return null;
  }
  return r.map((i) => i.toString()).join(",");
}

Deno.test("Numerics.BigIntRange.mergeIfPossible()", () => {
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([0n, 0n], [0n, 0n])),
    _s([0n, 0n]),
  );

  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([0n, 2n], [1n, 3n])),
    _s([0n, 3n]),
  );
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([0n, 2n], [2n, 4n])),
    _s([0n, 4n]),
  );
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([0n, 1n], [2n, 3n])),
    _s([0n, 3n]),
  );
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([0n, 1n], [3n, 4n])),
    _s(null),
  );

  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([1n, 3n], [0n, 2n])),
    _s([0n, 3n]),
  );
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([2n, 4n], [0n, 2n])),
    _s([0n, 4n]),
  );
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([2n, 3n], [0n, 1n])),
    _s([0n, 3n]),
  );
  assertStrictEquals(
    _s(BigIntRange.mergeIfPossible([3n, 4n], [0n, 1n])),
    _s(null),
  );

  const e1 = "`a` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.mergeIfPossible(undefined as unknown as [0n, 0n], [0n, 0n]);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.mergeIfPossible([0n, 0n], undefined as unknown as [0n, 0n]);
    },
    TypeError,
    e2,
  );
});
