import { assertStrictEquals, assertThrows } from "@std/assert";
import { uint7 } from "../../src/_.ts";
import { Numerics } from "../../mod.ts";

const { Uint7 } = Numerics;

Deno.test("Uint7.bitLength", () => {
  assertStrictEquals(Uint7.bitLength, 7);
});

Deno.test("Uint7.is()", () => {
  assertStrictEquals(Uint7.is(-1), false);
  assertStrictEquals(Uint7.is(-0), true);
  assertStrictEquals(Uint7.is(0), true);
  assertStrictEquals(Uint7.is(63), true);
  assertStrictEquals(Uint7.is(64), true);
  assertStrictEquals(Uint7.is(127), true);
  assertStrictEquals(Uint7.is(128), false);
  assertStrictEquals(Uint7.is(255), false);
  assertStrictEquals(Uint7.is(256), false);
  assertStrictEquals(Uint7.is(65535), false);
  assertStrictEquals(Uint7.is(65536), false);
  assertStrictEquals(Uint7.is(0xFFFFFFFF), false);
  assertStrictEquals(Uint7.is(0x100000000), false);

  assertStrictEquals(Uint7.is(0.1), false);
  assertStrictEquals(Uint7.is(0.5), false);
  assertStrictEquals(Uint7.is("0" as unknown as number), false);
  assertStrictEquals(Uint7.is(false as unknown as number), false);
  assertStrictEquals(Uint7.is({} as unknown as number), false);
  assertStrictEquals(Uint7.is([] as unknown as number), false);
  assertStrictEquals(Uint7.is([0] as unknown as number), false);
  assertStrictEquals(Uint7.is(undefined as unknown as number), false);
  assertStrictEquals(Uint7.is(null as unknown as number), false);
});

Deno.test("Uint7.bitwiseAnd()", () => {
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b0000_000), 0b0000_000);

  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b0000_001), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b0000_001), 0b0000_001);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd([0] as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, undefined as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.bitwiseOr()", () => {
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b0000_001), 0b0000_001);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseOr(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr("0" as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, null as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.bitwiseXOr()", () => {
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b0000_001), 0b0000_000);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0n as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, [0] as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.rotateLeft()", () => {
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 0), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 1), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 2), 0b0000010);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 3), 0b0000100);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 4), 0b0001000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 5), 0b0010000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 6), 0b0100000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 7), 0b1000000);

  assertStrictEquals(Uint7.rotateLeft(0b0111111, 0), 0b0111111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 1), 0b1111110);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 2), 0b1111101);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 3), 0b1111011);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 4), 0b1110111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 5), 0b1101111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 6), 0b1011111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 7), 0b0111111);

  assertStrictEquals(Uint7.rotateLeft(0b0000001, -1), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 0), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 1), 0b0000010);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 2), 0b0000100);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 3), 0b0001000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 4), 0b0010000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 5), 0b0100000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 6), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 7), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 8), 0b0000010);

  assertStrictEquals(Uint7.rotateLeft(0b1111111, 1), 0b1111111);

  assertStrictEquals(Uint7.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 101), 0);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.rotateLeft(0x80 as uint7, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.rotateLeft(-1 as uint7, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint7.rotateLeft(0x7F, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.fromNumber()", () => {
  assertStrictEquals(Uint7.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint7.fromNumber(-0), 0), true);
  assertStrictEquals(Uint7.fromNumber(1), 1);
  assertStrictEquals(Uint7.fromNumber(63), 63);
  assertStrictEquals(Uint7.fromNumber(64), 64);
  assertStrictEquals(Uint7.fromNumber(127), 127);
  assertStrictEquals(Uint7.fromNumber(128), 127);
  assertStrictEquals(Uint7.fromNumber(-1), 0);

  assertStrictEquals(Uint7.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint7.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint7.fromNumber(Number.MAX_SAFE_INTEGER), 127);
  assertStrictEquals(Uint7.fromNumber(Number.POSITIVE_INFINITY), 127);

  assertStrictEquals(Uint7.fromNumber(0.1), 0);
  assertStrictEquals(Uint7.fromNumber(0.4), 0);
  assertStrictEquals(Uint7.fromNumber(0.5), 0);
  assertStrictEquals(Uint7.fromNumber(0.6), 0);
  assertStrictEquals(Uint7.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint7.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint7.fromNumber(-0.4), 0);
  assertStrictEquals(Uint7.fromNumber(-0.5), 0);
  assertStrictEquals(Uint7.fromNumber(-0.6), 0);
  assertStrictEquals(Uint7.fromNumber(-0.9), 0);

  assertStrictEquals(Uint7.fromNumber(127.1), 127);
  assertStrictEquals(Uint7.fromNumber(127.4), 127);
  assertStrictEquals(Uint7.fromNumber(127.5), 127);
  assertStrictEquals(Uint7.fromNumber(127.6), 127);
  assertStrictEquals(Uint7.fromNumber(127.9), 127);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint7.fromNumber(undefined as unknown as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.fromNumber("0" as unknown as uint7);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint7.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint7.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint7.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint7.fromNumber(1, op), 1);
  assertStrictEquals(Uint7.fromNumber(63, op), 63);
  assertStrictEquals(Uint7.fromNumber(64, op), 64);
  assertStrictEquals(Uint7.fromNumber(127, op), 127);
  assertStrictEquals(Uint7.fromNumber(128, op), 127);
  assertStrictEquals(Uint7.fromNumber(-1, op), 0);

  assertStrictEquals(Uint7.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint7.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(Uint7.fromNumber(Number.MAX_SAFE_INTEGER, op), 127);
  assertStrictEquals(Uint7.fromNumber(Number.POSITIVE_INFINITY, op), 127);

  assertStrictEquals(Uint7.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint7.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint7.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint7.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint7.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint7.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint7.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint7.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint7.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint7.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint7.fromNumber(127.1, op), 127);
  assertStrictEquals(Uint7.fromNumber(127.4, op), 127);
  assertStrictEquals(Uint7.fromNumber(127.5, op), 127);
  assertStrictEquals(Uint7.fromNumber(127.6, op), 127);
  assertStrictEquals(Uint7.fromNumber(127.9, op), 127);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint7.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint7.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint7.fromNumber(1, op2), 1);
  assertStrictEquals(Uint7.fromNumber(63, op2), 63);
  assertStrictEquals(Uint7.fromNumber(64, op2), 64);
  assertStrictEquals(Uint7.fromNumber(127, op2), 127);
  assertStrictEquals(Uint7.fromNumber(128, op2), 127);
  assertStrictEquals(Uint7.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint7.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint7.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(Uint7.fromNumber(Number.MAX_SAFE_INTEGER, op2), 127);
  assertStrictEquals(Uint7.fromNumber(Number.POSITIVE_INFINITY, op2), 127);

  assertStrictEquals(Uint7.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint7.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint7.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint7.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint7.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint7.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint7.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint7.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint7.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint7.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint7.fromNumber(127.1, op2), 127);
  assertStrictEquals(Uint7.fromNumber(127.4, op2), 127);
  assertStrictEquals(Uint7.fromNumber(127.5, op2), 127);
  assertStrictEquals(Uint7.fromNumber(127.6, op2), 127);
  assertStrictEquals(Uint7.fromNumber(127.9, op2), 127);
});

Deno.test("Uint7.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint7`.";
  assertThrows(
    () => {
      Uint7.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.fromNumber(128, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint7.fromNumber(-1, op2), 127);
  assertStrictEquals(Uint7.fromNumber(64, op2), 64);
  assertStrictEquals(Uint7.fromNumber(65, op2), 65);
  assertStrictEquals(Uint7.fromNumber(128, op2), 0);
  assertStrictEquals(Uint7.fromNumber(129, op2), 1);
  assertStrictEquals(Uint7.fromNumber(256, op2), 0);
  assertStrictEquals(Uint7.fromNumber(257, op2), 1);
});

Deno.test("Uint7.toNumber()", () => {
  assertStrictEquals(Uint7.toNumber(0), 0);
  assertStrictEquals(Uint7.toNumber(-0), 0);
  assertStrictEquals(Object.is(Uint7.toNumber(-0), 0), true);
  assertStrictEquals(Uint7.toNumber(0x7F), 0x7F);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.toNumber(0x80 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toNumber(-1 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toNumber(undefined as unknown as uint7);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint7.fromBigInt()", () => {
  assertStrictEquals(Uint7.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint7.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint7.fromBigInt(1n), 1);
  assertStrictEquals(Uint7.fromBigInt(63n), 63);
  assertStrictEquals(Uint7.fromBigInt(64n), 64);
  assertStrictEquals(Uint7.fromBigInt(127n), 127);
  assertStrictEquals(Uint7.fromBigInt(128n), 127);
  assertStrictEquals(Uint7.fromBigInt(-1n), 0);

  assertStrictEquals(Uint7.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(Uint7.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)), 127);

  const e1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      Uint7.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must be within the range of safe integer.";
  assertThrows(
    () => {
      Uint7.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    RangeError,
    e2,
  );
});

Deno.test("Uint7.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint7`.";
  assertThrows(
    () => {
      Uint7.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.fromBigInt(128n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint7.fromBigInt(-1n, op2), 127);
  assertStrictEquals(Uint7.fromBigInt(64n, op2), 64);
  assertStrictEquals(Uint7.fromBigInt(65n, op2), 65);
  assertStrictEquals(Uint7.fromBigInt(128n, op2), 0);
  assertStrictEquals(Uint7.fromBigInt(129n, op2), 1);
  assertStrictEquals(Uint7.fromBigInt(256n, op2), 0);
  assertStrictEquals(Uint7.fromBigInt(257n, op2), 1);
});

Deno.test("Uint7.toBigInt()", () => {
  assertStrictEquals(Uint7.toBigInt(0), 0n);
  assertStrictEquals(Uint7.toBigInt(-0), 0n);
  assertStrictEquals(Uint7.toBigInt(0x7F), 0x7Fn);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.toBigInt(0x80 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toBigInt(-1 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toBigInt(undefined as unknown as uint7);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint7.fromString()", () => {
  assertStrictEquals(Uint7.fromString("0"), 0);
  assertStrictEquals(Uint7.fromString("-0"), 0);
  assertStrictEquals(Uint7.fromString("1"), 1);
  assertStrictEquals(Uint7.fromString("-1"), 0);
  assertStrictEquals(Uint7.fromString("127"), 127);
  assertStrictEquals(Uint7.fromString("128"), 127);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be a decimal representation of an integer.";
  const e22 = "`value` must be a binary representation of an integer.";
  const e28 = "`value` must be an octal representation of an integer.";
  const e216 = "`value` must be a hexadecimal representation of an integer.";
  assertThrows(
    () => {
      Uint7.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint7`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint7.fromString("0", op2), 0);
  assertStrictEquals(Uint7.fromString("0000000", op2), 0);
  assertStrictEquals(Uint7.fromString("1111111", op2), 127);
  assertStrictEquals(Uint7.fromString("+01111111", op2), 127);
  assertThrows(
    () => {
      Uint7.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint7.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint7.fromString("0", op8), 0);
  assertStrictEquals(Uint7.fromString("000", op8), 0);
  assertStrictEquals(Uint7.fromString("177", op8), 127);
  assertStrictEquals(Uint7.fromString("+0177", op8), 127);
  assertThrows(
    () => {
      Uint7.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint7.fromString("0", op10), 0);
  assertStrictEquals(Uint7.fromString("000", op10), 0);
  assertStrictEquals(Uint7.fromString("127", op10), 127);
  assertStrictEquals(Uint7.fromString("+0127", op10), 127);
  assertThrows(
    () => {
      Uint7.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint7.fromString("0", op16), 0);
  assertStrictEquals(Uint7.fromString("00", op16), 0);
  assertStrictEquals(Uint7.fromString("7f", op16), 127);
  assertStrictEquals(Uint7.fromString("7F", op16), 127);
  assertStrictEquals(Uint7.fromString("+07F", op16), 127);
  assertThrows(
    () => {
      Uint7.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("Uint7.toString()", () => {
  assertStrictEquals(Uint7.toString(0), "0");
  assertStrictEquals(Uint7.toString(-0), "0");
  assertStrictEquals(Uint7.toString(1), "1");
  assertStrictEquals(Uint7.toString(63), "63");
  assertStrictEquals(Uint7.toString(127), "127");

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.toString(0x80 as uint7);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint7.toString(0, op16), "0");
  assertStrictEquals(Uint7.toString(63, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(Uint7.toString(0, op16l), "0");
  assertStrictEquals(Uint7.toString(63, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(Uint7.toString(0, op16l2), "00");
  assertStrictEquals(Uint7.toString(63, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(Uint7.toString(0, op16u3), "000");
  assertStrictEquals(Uint7.toString(63, op16u3), "03F");
});
