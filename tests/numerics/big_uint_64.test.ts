import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { BigUint64 } = Numerics;

Deno.test("BigUint64.bitLength", () => {
  assertStrictEquals(BigUint64.bitLength, 64);
});

Deno.test("BigUint64.is()", () => {
  assertStrictEquals(BigUint64.is(-1n), false);
  assertStrictEquals(BigUint64.is(-0n), true);
  assertStrictEquals(BigUint64.is(0n), true);
  assertStrictEquals(BigUint64.is(63n), true);
  assertStrictEquals(BigUint64.is(64n), true);
  assertStrictEquals(BigUint64.is(127n), true);
  assertStrictEquals(BigUint64.is(128n), true);
  assertStrictEquals(BigUint64.is(255n), true);
  assertStrictEquals(BigUint64.is(256n), true);
  assertStrictEquals(BigUint64.is(65535n), true);
  assertStrictEquals(BigUint64.is(65536n), true);
  assertStrictEquals(BigUint64.is(0xFFFFFFn), true);
  assertStrictEquals(BigUint64.is(0x1000000n), true);
  assertStrictEquals(BigUint64.is(0xFFFFFFFFn), true);
  assertStrictEquals(BigUint64.is(0x100000000n), true);
  assertStrictEquals(BigUint64.is(0xFFFFFFFFFFFFFFFFn), true);
  assertStrictEquals(BigUint64.is(0x10000000000000000n), false);

  assertStrictEquals(BigUint64.is(0.1 as unknown as bigint), false);
  assertStrictEquals(BigUint64.is(0.5 as unknown as bigint), false);
  assertStrictEquals(BigUint64.is("0" as unknown as bigint), false);
  assertStrictEquals(BigUint64.is(false as unknown as bigint), false);
  assertStrictEquals(BigUint64.is({} as unknown as bigint), false);
  assertStrictEquals(BigUint64.is([] as unknown as bigint), false);
  assertStrictEquals(BigUint64.is([0] as unknown as bigint), false);
  assertStrictEquals(BigUint64.is(undefined as unknown as bigint), false);
  assertStrictEquals(BigUint64.is(null as unknown as bigint), false);
});

Deno.test("BigUint64.bitwiseAnd()", () => {
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseAnd([0] as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0n, undefined as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.bitwiseOr()", () => {
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );

  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseOr("0" as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0n, null as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.bitwiseXOr()", () => {
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );

  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0 as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0n, [0] as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.rotateLeft()", () => {
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      1,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      2,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000010n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      3,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000100n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      4,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00001000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      5,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00010000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      6,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00100000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      7,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_01000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      8,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_10000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      9,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000001_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      10,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000010_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      11,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000100_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      12,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00001000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      13,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00010000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      14,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00100000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      15,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_01000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      16,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_10000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      17,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000001_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      18,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000010_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      19,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000100_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      20,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00001000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      21,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00010000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      22,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00100000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      23,
    ),
    0b00000000_00000000_00000000_00000000_00000000_01000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      24,
    ),
    0b00000000_00000000_00000000_00000000_00000000_10000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      25,
    ),
    0b00000000_00000000_00000000_00000000_00000001_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      26,
    ),
    0b00000000_00000000_00000000_00000000_00000010_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      27,
    ),
    0b00000000_00000000_00000000_00000000_00000100_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      28,
    ),
    0b00000000_00000000_00000000_00000000_00001000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      29,
    ),
    0b00000000_00000000_00000000_00000000_00010000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      30,
    ),
    0b00000000_00000000_00000000_00000000_00100000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      31,
    ),
    0b00000000_00000000_00000000_00000000_01000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      32,
    ),
    0b00000000_00000000_00000000_00000000_10000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      33,
    ),
    0b00000000_00000000_00000000_00000001_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      34,
    ),
    0b00000000_00000000_00000000_00000010_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      35,
    ),
    0b00000000_00000000_00000000_00000100_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      36,
    ),
    0b00000000_00000000_00000000_00001000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      37,
    ),
    0b00000000_00000000_00000000_00010000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      38,
    ),
    0b00000000_00000000_00000000_00100000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      39,
    ),
    0b00000000_00000000_00000000_01000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      40,
    ),
    0b00000000_00000000_00000000_10000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      41,
    ),
    0b00000000_00000000_00000001_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      42,
    ),
    0b00000000_00000000_00000010_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      43,
    ),
    0b00000000_00000000_00000100_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      44,
    ),
    0b00000000_00000000_00001000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      45,
    ),
    0b00000000_00000000_00010000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      46,
    ),
    0b00000000_00000000_00100000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      47,
    ),
    0b00000000_00000000_01000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      48,
    ),
    0b00000000_00000000_10000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      49,
    ),
    0b00000000_00000001_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      50,
    ),
    0b00000000_00000010_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      51,
    ),
    0b00000000_00000100_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      52,
    ),
    0b00000000_00001000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      53,
    ),
    0b00000000_00010000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      54,
    ),
    0b00000000_00100000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      55,
    ),
    0b00000000_01000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      56,
    ),
    0b00000000_10000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      57,
    ),
    0b00000001_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      58,
    ),
    0b00000010_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      59,
    ),
    0b00000100_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      60,
    ),
    0b00001000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      61,
    ),
    0b00010000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      62,
    ),
    0b00100000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      63,
    ),
    0b01000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      64,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      65,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      -1,
    ),
    0b01000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  assertStrictEquals(BigUint64.rotateLeft(0n, -1), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 0), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 1), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 101), 0n);

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.rotateLeft(0x10000000000000000n as bigint, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.rotateLeft(-1n as bigint, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      BigUint64.rotateLeft(0xFFn, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.fromNumber()", () => {
  // number最大値の方がuint64最大値より小さいのでオーバーフローは起こりえない（アンダーフローは起きる）

  assertStrictEquals(BigUint64.fromNumber(0), 0n);
  assertStrictEquals(Object.is(BigUint64.fromNumber(-0), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(1), 1n);
  assertStrictEquals(BigUint64.fromNumber(63), 63n);
  assertStrictEquals(BigUint64.fromNumber(64), 64n);
  assertStrictEquals(BigUint64.fromNumber(127), 127n);
  assertStrictEquals(BigUint64.fromNumber(128), 128n);
  assertStrictEquals(BigUint64.fromNumber(255), 255n);
  assertStrictEquals(BigUint64.fromNumber(256), 256n);
  assertStrictEquals(BigUint64.fromNumber(65535), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536), 65536n);
  assertStrictEquals(BigUint64.fromNumber(16777215), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(4294967295), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(-1), 0n);

  assertStrictEquals(BigUint64.fromNumber(Number.NEGATIVE_INFINITY), 0n);
  assertStrictEquals(BigUint64.fromNumber(Number.MIN_SAFE_INTEGER), 0n);
  assertStrictEquals(
    BigUint64.fromNumber(Number.MAX_SAFE_INTEGER),
    BigInt(Number.MAX_SAFE_INTEGER),
  );
  assertStrictEquals(
    BigUint64.fromNumber(Number.POSITIVE_INFINITY),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  assertStrictEquals(BigUint64.fromNumber(0.1), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.4), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.5), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.6), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.9), 0n);

  assertStrictEquals(Object.is(BigUint64.fromNumber(-0.1), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(-0.4), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.5), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.6), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.9), 0n);

  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.1),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.4),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.5),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.6),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.9),
    9007199254740991n,
  );

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      BigUint64.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      BigUint64.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(BigUint64.fromNumber(0, op), 0n);
  assertStrictEquals(Object.is(BigUint64.fromNumber(-0, op), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(1, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(63, op), 63n);
  assertStrictEquals(BigUint64.fromNumber(64, op), 64n);
  assertStrictEquals(BigUint64.fromNumber(127, op), 127n);
  assertStrictEquals(BigUint64.fromNumber(128, op), 128n);
  assertStrictEquals(BigUint64.fromNumber(255, op), 255n);
  assertStrictEquals(BigUint64.fromNumber(256, op), 256n);
  assertStrictEquals(BigUint64.fromNumber(65535, op), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536, op), 65536n);
  assertStrictEquals(BigUint64.fromNumber(16777215, op), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216, op), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(4294967295, op), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296, op), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(-1, op), 0n);

  assertStrictEquals(BigUint64.fromNumber(Number.NEGATIVE_INFINITY, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(Number.MIN_SAFE_INTEGER, op), 0n);
  assertStrictEquals(
    BigUint64.fromNumber(Number.MAX_SAFE_INTEGER, op),
    BigInt(Number.MAX_SAFE_INTEGER),
  );
  assertStrictEquals(
    BigUint64.fromNumber(Number.POSITIVE_INFINITY, op),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  assertStrictEquals(BigUint64.fromNumber(0.1, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.4, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.5, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.6, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.9, op), 1n);

  assertStrictEquals(BigUint64.fromNumber(-0.1, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.4, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.5, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.6, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.9, op), 0n);

  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.1, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.4, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.5, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.6, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.9, op),
    9007199254740991n,
  );

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(BigUint64.fromNumber(0, op2), 0n);
  assertStrictEquals(Object.is(BigUint64.fromNumber(-0, op2), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(1, op2), 1n);
  assertStrictEquals(BigUint64.fromNumber(63, op2), 63n);
  assertStrictEquals(BigUint64.fromNumber(64, op2), 64n);
  assertStrictEquals(BigUint64.fromNumber(127, op2), 127n);
  assertStrictEquals(BigUint64.fromNumber(128, op2), 128n);
  assertStrictEquals(BigUint64.fromNumber(255, op2), 255n);
  assertStrictEquals(BigUint64.fromNumber(256, op2), 256n);
  assertStrictEquals(BigUint64.fromNumber(65535, op2), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536, op2), 65536n);
  assertStrictEquals(BigUint64.fromNumber(16777215, op2), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216, op2), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(4294967295, op2), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296, op2), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(-1, op2), 0n);

  assertStrictEquals(BigUint64.fromNumber(Number.NEGATIVE_INFINITY, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0n);
  assertStrictEquals(
    BigUint64.fromNumber(Number.MAX_SAFE_INTEGER, op2),
    BigInt(Number.MAX_SAFE_INTEGER),
  );
  assertStrictEquals(
    BigUint64.fromNumber(Number.POSITIVE_INFINITY, op2),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  assertStrictEquals(BigUint64.fromNumber(0.1, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.4, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.5, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.6, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.9, op2), 0n);

  assertStrictEquals(BigUint64.fromNumber(-0.1, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.4, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.5, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.6, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.9, op2), 0n);

  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.1, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.4, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.5, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.6, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.9, op2),
    9007199254740991n,
  );
});

Deno.test("BigUint64.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint64`.";
  assertThrows(
    () => {
      BigUint64.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  // assertThrows(
  //   () => {
  //     BigUint64.fromNumber(x, op);
  //   },
  //   RangeError,
  //   e1,
  // );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(BigUint64.fromNumber(-1, op2), 0xFFFFFFFFFFFFFFFFn);
  assertStrictEquals(BigUint64.fromNumber(64, op2), 64n);
  assertStrictEquals(BigUint64.fromNumber(65, op2), 65n);
  assertStrictEquals(BigUint64.fromNumber(128, op2), 128n);
  assertStrictEquals(BigUint64.fromNumber(129, op2), 129n);
  assertStrictEquals(BigUint64.fromNumber(256, op2), 256n);
  assertStrictEquals(BigUint64.fromNumber(257, op2), 257n);
  assertStrictEquals(BigUint64.fromNumber(512, op2), 512n);
  assertStrictEquals(BigUint64.fromNumber(513, op2), 513n);
  assertStrictEquals(BigUint64.fromNumber(65535, op2), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536, op2), 65536n);
  assertStrictEquals(BigUint64.fromNumber(131071, op2), 131071n);
  assertStrictEquals(BigUint64.fromNumber(131072, op2), 131072n);
  assertStrictEquals(BigUint64.fromNumber(16777215, op2), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216, op2), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(33554431, op2), 33554431n);
  assertStrictEquals(BigUint64.fromNumber(33554432, op2), 33554432n);
  assertStrictEquals(BigUint64.fromNumber(4294967295, op2), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296, op2), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(8589934591, op2), 8589934591n);
  assertStrictEquals(BigUint64.fromNumber(8589934592, op2), 8589934592n);
});

Deno.test("BigUint64.toNumber()", () => {
  assertStrictEquals(BigUint64.toNumber(0n), 0);
  assertStrictEquals(BigUint64.toNumber(-0n), 0);
  assertStrictEquals(Object.is(BigUint64.toNumber(-0n), 0), true);
  // assertStrictEquals(BigUint64.toNumber(0xFFFFFFFFFFFFFFFFn), 0xFFFFFFFFFFFFFFFF);
  assertStrictEquals(
    BigUint64.toNumber(BigInt(Number.MAX_SAFE_INTEGER)),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toNumber(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );

  const e2 = "`self` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      BigUint64.toNumber(0xFFFFFFFFFFFFFFFFn);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.fromBigInt()", () => {
  assertStrictEquals(BigUint64.fromBigInt(0n), 0n);
  assertStrictEquals(Object.is(BigUint64.fromBigInt(-0n), 0n), true);
  assertStrictEquals(BigUint64.fromBigInt(1n), 1n);
  assertStrictEquals(BigUint64.fromBigInt(63n), 63n);
  assertStrictEquals(BigUint64.fromBigInt(64n), 64n);
  assertStrictEquals(BigUint64.fromBigInt(127n), 127n);
  assertStrictEquals(BigUint64.fromBigInt(128n), 128n);
  assertStrictEquals(BigUint64.fromBigInt(255n), 255n);
  assertStrictEquals(BigUint64.fromBigInt(256n), 256n);
  assertStrictEquals(BigUint64.fromBigInt(65535n), 65535n);
  assertStrictEquals(BigUint64.fromBigInt(65536n), 65536n);
  assertStrictEquals(BigUint64.fromBigInt(16777215n), 16777215n);
  assertStrictEquals(BigUint64.fromBigInt(16777216n), 16777216n);
  assertStrictEquals(BigUint64.fromBigInt(4294967295n), 4294967295n);
  assertStrictEquals(
    BigUint64.fromBigInt(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBigInt(0x1_0000_0000_0000_0000n),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(BigUint64.fromBigInt(-1n), 0n);

  assertStrictEquals(BigUint64.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0n);
  assertStrictEquals(
    BigUint64.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  const e1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigUint64.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigUint64.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint64`.";
  assertThrows(
    () => {
      BigUint64.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromBigInt(0x1_0000_0000_0000_0000n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(BigUint64.fromBigInt(-1n, op2), 0xFFFF_FFFF_FFFF_FFFFn);
  assertStrictEquals(BigUint64.fromBigInt(64n, op2), 64n);
  assertStrictEquals(BigUint64.fromBigInt(65n, op2), 65n);
  assertStrictEquals(BigUint64.fromBigInt(128n, op2), 128n);
  assertStrictEquals(BigUint64.fromBigInt(129n, op2), 129n);
  assertStrictEquals(BigUint64.fromBigInt(256n, op2), 256n);
  assertStrictEquals(BigUint64.fromBigInt(257n, op2), 257n);
  assertStrictEquals(BigUint64.fromBigInt(512n, op2), 512n);
  assertStrictEquals(BigUint64.fromBigInt(513n, op2), 513n);
  assertStrictEquals(BigUint64.fromBigInt(65535n, op2), 65535n);
  assertStrictEquals(BigUint64.fromBigInt(65536n, op2), 65536n);
  assertStrictEquals(BigUint64.fromBigInt(65537n, op2), 65537n);
  assertStrictEquals(BigUint64.fromBigInt(131071n, op2), 131071n);
  assertStrictEquals(BigUint64.fromBigInt(131072n, op2), 131072n);
  assertStrictEquals(BigUint64.fromBigInt(16777215n, op2), 16777215n);
  assertStrictEquals(BigUint64.fromBigInt(16777216n, op2), 16777216n);
  assertStrictEquals(BigUint64.fromBigInt(4294967295n, op2), 4294967295n);
  assertStrictEquals(BigUint64.fromBigInt(4294967296n, op2), 4294967296n);
  assertStrictEquals(
    BigUint64.fromBigInt(0xFFFF_FFFF_FFFF_FFFFn, op2),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(BigUint64.fromBigInt(0x1_0000_0000_0000_0000n, op2), 0n);
});

Deno.test("BigUint64.toBigInt()", () => {
  assertStrictEquals(BigUint64.toBigInt(0n), 0n);
  assertStrictEquals(BigUint64.toBigInt(-0n), 0n);
  assertStrictEquals(
    BigUint64.toBigInt(0xFFFFFFFFFFFFFFFFn),
    0xFFFFFFFFFFFFFFFFn,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toBigInt(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBigInt(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigUint64.fromString()", () => {
  assertStrictEquals(BigUint64.fromString("0"), 0n);
  assertStrictEquals(BigUint64.fromString("-0"), 0n);
  assertStrictEquals(BigUint64.fromString("1"), 1n);
  assertStrictEquals(BigUint64.fromString("-1"), 0n);
  assertStrictEquals(
    BigUint64.fromString("18446744073709551615"),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("18446744073709551616"),
    18446744073709551615n,
  );

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be a decimal representation of an integer.";
  const e22 = "`value` must be a binary representation of an integer.";
  const e28 = "`value` must be an octal representation of an integer.";
  const e216 = "`value` must be a hexadecimal representation of an integer.";
  assertThrows(
    () => {
      BigUint64.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint64`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(BigUint64.fromString("0", op2), 0n);
  assertStrictEquals(
    BigUint64.fromString(
      "0000000000000000000000000000000000000000000000000000000000000000",
      op2,
    ),
    0n,
  );
  assertStrictEquals(
    BigUint64.fromString(
      "1111111111111111111111111111111111111111111111111111111111111111",
      op2,
    ),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString(
      "+01111111111111111111111111111111111111111111111111111111111111111",
      op2,
    ),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      BigUint64.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(BigUint64.fromString("0", op8), 0n);
  assertStrictEquals(BigUint64.fromString("0000000000000000000000", op8), 0n);
  assertStrictEquals(
    BigUint64.fromString("1777777777777777777777", op8),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("+01777777777777777777777", op8),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(BigUint64.fromString("0", op10), 0n);
  assertStrictEquals(BigUint64.fromString("00000000000000000000", op10), 0n);
  assertStrictEquals(
    BigUint64.fromString("18446744073709551615", op10),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("+018446744073709551615", op10),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(BigUint64.fromString("0", op16), 0n);
  assertStrictEquals(BigUint64.fromString("0000000000000000", op16), 0n);
  assertStrictEquals(
    BigUint64.fromString("ffffffffffffffff", op16),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("FFFFFFFFFFFFFFFF", op16),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("+0FFFFFFFFFFFFFFFF", op16),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("BigUint64.toString()", () => {
  assertStrictEquals(BigUint64.toString(0n), "0");
  assertStrictEquals(BigUint64.toString(-0n), "0");
  assertStrictEquals(BigUint64.toString(1n), "1");
  assertStrictEquals(BigUint64.toString(63n), "63");
  assertStrictEquals(BigUint64.toString(127n), "127");
  assertStrictEquals(BigUint64.toString(255n), "255");
  assertStrictEquals(BigUint64.toString(65535n), "65535");
  assertStrictEquals(BigUint64.toString(16777215n), "16777215");
  assertStrictEquals(BigUint64.toString(4294967295n), "4294967295");
  assertStrictEquals(
    BigUint64.toString(18446744073709551615n),
    "18446744073709551615",
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toString(0x10000000000000000n);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(BigUint64.toString(0n, op16), "0");
  assertStrictEquals(BigUint64.toString(63n, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(BigUint64.toString(0n, op16l), "0");
  assertStrictEquals(BigUint64.toString(63n, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(BigUint64.toString(0n, op16l2), "00");
  assertStrictEquals(BigUint64.toString(63n, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(BigUint64.toString(0n, op16u3), "000");
  assertStrictEquals(BigUint64.toString(63n, op16u3), "03F");
});

Deno.test("BigUint64.byteLength", () => {
  assertStrictEquals(BigUint64.byteLength, 8);
});

Deno.test("BigUint64.toBytes()", () => {
  assertStrictEquals(
    [...BigUint64.toBytes(0n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0n, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0n, true)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn, true)].map((i) => i.toString()).join(","),
    "255,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x100n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,1,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100n, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,1,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100n, true)].map((i) => i.toString()).join(","),
    "0,1,0,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn, true)].map((i) => i.toString()).join(","),
    "255,255,0,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,1,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,1,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n, true)].map((i) => i.toString()).join(","),
    "0,0,1,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn, true)].map((i) => i.toString()).join(","),
    "255,255,255,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n)].map((i) => i.toString()).join(","),
    "0,0,0,0,1,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,1,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n, true)].map((i) => i.toString()).join(","),
    "0,0,0,1,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn, true)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n)].map((i) => i.toString()).join(","),
    "0,0,0,1,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,1,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n, true)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,1,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn, true)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n)].map((i) => i.toString()).join(","),
    "0,0,1,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,1,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n, true)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,0,1,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn, false)].map((i) => i.toString())
      .join(","),
    "0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn, true)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,255,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n)].map((i) => i.toString()).join(","),
    "0,1,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n, false)].map((i) => i.toString())
      .join(","),
    "0,1,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n, true)].map((i) => i.toString())
      .join(","),
    "0,0,0,0,0,0,1,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn)].map((i) => i.toString()).join(
      ",",
    ),
    "0,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn, false)].map((i) => i.toString())
      .join(","),
    "0,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn, true)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n)].map((i) => i.toString()).join(
      ",",
    ),
    "1,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n, false)].map((i) => i.toString())
      .join(","),
    "1,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n, true)].map((i) => i.toString())
      .join(","),
    "0,0,0,0,0,0,0,1",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn, false)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn, true)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,255",
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toBytes(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBytes(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBytes(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});
