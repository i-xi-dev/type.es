import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { BigIntRange } = Numerics;

const range00 = BigIntRange.of(0n);
const range01 = BigIntRange.of(0n, 1n);
const range10 = BigIntRange.of(-1n, 0n);
const range23 = BigIntRange.of(2n, 3n);
const range32 = BigIntRange.of(-3n, -2n);

const range00b = BigIntRange.from({ min: 0n, max: 0n });
const range01b = BigIntRange.from({ min: 0n, max: 1n });
const range10b = BigIntRange.from({ min: -1n, max: 0n });

const rangeX01 = BigIntRange.of(-20n, 280n);

Deno.test("new BigIntRange()", () => {
  const em1 = "Range size exceeds upper limit.";

  assertThrows(
    () => {
      BigIntRange.from([0n, 0x1_0000_0000_0000_0000n]);
    },
    RangeError,
    em1,
  );

  assertThrows(
    () => {
      BigIntRange.from([-1n, 0xFFFF_FFFF_FFFF_FFFFn]);
    },
    RangeError,
    em1,
  );

  const x0 = BigIntRange.from([1n, BigInt(Number.MAX_SAFE_INTEGER)]);
  assertStrictEquals(x0.size, Number.MAX_SAFE_INTEGER);
});

Deno.test("BigIntRange.prototype.min", () => {
  assertStrictEquals(range00.min, 0n);
  assertStrictEquals(range01.min, 0n);
  assertStrictEquals(range10.min, -1n);
  assertStrictEquals(range23.min, 2n);
  assertStrictEquals(range32.min, -3n);

  assertStrictEquals(range00b.min, 0n);
  assertStrictEquals(range01b.min, 0n);
  assertStrictEquals(range10b.min, -1n);

  assertStrictEquals(rangeX01.min, -20n);
});

Deno.test("BigIntRange.prototype.max", () => {
  assertStrictEquals(range00.max, 0n);
  assertStrictEquals(range01.max, 1n);
  assertStrictEquals(range10.max, 0n);
  assertStrictEquals(range23.max, 3n);
  assertStrictEquals(range32.max, -2n);

  assertStrictEquals(range00b.max, 0n);
  assertStrictEquals(range01b.max, 1n);
  assertStrictEquals(range10b.max, 0n);

  assertStrictEquals(rangeX01.max, 280n);
});

Deno.test("BigIntRange.prototype.size", () => {
  assertStrictEquals(range00.size, 1);
  assertStrictEquals(range01.size, 2);
  assertStrictEquals(range10.size, 2);
  assertStrictEquals(range23.size, 2);
  assertStrictEquals(range32.size, 2);

  assertStrictEquals(range00b.size, 1);
  assertStrictEquals(range01b.size, 2);
  assertStrictEquals(range10b.size, 2);

  assertStrictEquals(rangeX01.size, 301);
});

Deno.test("BigIntRange.from()", () => {
  const t1 = BigIntRange.from(rangeX01);
  assertStrictEquals(t1.min, -20n);
  assertStrictEquals(t1.max, 280n);
  assertStrictEquals(t1.size, 301);
});

Deno.test("BigIntRange.of()", () => {
  const t1 = BigIntRange.of(4n, 8n, 9n);
  assertStrictEquals(t1.min, 4n);
  assertStrictEquals(t1.max, 8n);
  assertStrictEquals(t1.size, 5);
});

Deno.test("BigIntRange.prototype.includes()", () => {
  assertStrictEquals(range00.includes(-1n), false);
  assertStrictEquals(range00.includes(-0n), true);
  assertStrictEquals(range00.includes(0n), true);
  assertStrictEquals(range00.includes(1n), false);

  assertStrictEquals(range01.includes(-1n), false);
  assertStrictEquals(range01.includes(-0n), true);
  assertStrictEquals(range01.includes(0n), true);
  assertStrictEquals(range01.includes(1n), true);
  assertStrictEquals(range01.includes(2n), false);

  assertStrictEquals(range10.includes(-2n), false);
  assertStrictEquals(range10.includes(-1n), true);
  assertStrictEquals(range10.includes(-0n), true);
  assertStrictEquals(range10.includes(0n), true);
  assertStrictEquals(range10.includes(1n), false);

  assertStrictEquals(range23.includes(0n), false);
  assertStrictEquals(range23.includes(1n), false);
  assertStrictEquals(range23.includes(2n), true);
  assertStrictEquals(range23.includes(3n), true);
  assertStrictEquals(range23.includes(4n), false);

  assertStrictEquals(range32.includes(-4n), false);
  assertStrictEquals(range32.includes(-3n), true);
  assertStrictEquals(range32.includes(-2n), true);
  assertStrictEquals(range32.includes(-1n), false);
  assertStrictEquals(range32.includes(0n), false);
});
