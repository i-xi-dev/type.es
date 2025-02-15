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
