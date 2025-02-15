import { assertStrictEquals, assertThrows } from "@std/assert";
import { BigIntRange } from "../../mod.ts";

const _MIN = BigInt(Number.MIN_SAFE_INTEGER);
const _MAX = BigInt(Number.MAX_SAFE_INTEGER);

Deno.test("BigIntRange.sizeOf()", () => {
  assertStrictEquals(BigIntRange.sizeOf([0n, 0n]), 1n);
  assertStrictEquals(BigIntRange.sizeOf([0n, 0x7FFFFFFFn]), 0x80000000n);
  assertStrictEquals(BigIntRange.sizeOf([0n, _MAX - 1n]), _MAX);
  assertStrictEquals(BigIntRange.sizeOf([1n, _MAX]), _MAX);

  assertStrictEquals(BigIntRange.sizeOf([0n, _MAX]), _MAX + 1n);
  assertStrictEquals(BigIntRange.sizeOf([_MIN, _MAX]), _MAX * 2n + 1n);

  const e1 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      BigIntRange.sizeOf(undefined as unknown as [0n, 0n]);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigIntRange.toIterable()", () => {
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
    RangeError,
    "The size of `range` is non-positive.",
  );
});
