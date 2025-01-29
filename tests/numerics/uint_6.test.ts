import { assertStrictEquals, assertThrows } from "@std/assert";
import { uint6 } from "../../src/_.ts";
import { Numerics } from "../../mod.ts";

const { Uint6 } = Numerics;

Deno.test("Uint6.bitLength", () => {
  assertStrictEquals(Uint6.bitLength, 6);
});

Deno.test("Uint6.is()", () => {
  assertStrictEquals(Uint6.is(-1), false);
  assertStrictEquals(Uint6.is(-0), true);
  assertStrictEquals(Uint6.is(0), true);
  assertStrictEquals(Uint6.is(63), true);
  assertStrictEquals(Uint6.is(64), false);
  assertStrictEquals(Uint6.is(127), false);
  assertStrictEquals(Uint6.is(128), false);
  assertStrictEquals(Uint6.is(255), false);
  assertStrictEquals(Uint6.is(256), false);
  assertStrictEquals(Uint6.is(65535), false);
  assertStrictEquals(Uint6.is(65536), false);
  assertStrictEquals(Uint6.is(0xFFFFFFFF), false);
  assertStrictEquals(Uint6.is(0x100000000), false);

  assertStrictEquals(Uint6.is(0.1), false);
  assertStrictEquals(Uint6.is(0.5), false);
  assertStrictEquals(Uint6.is("0" as unknown as number), false);
  assertStrictEquals(Uint6.is(false as unknown as number), false);
  assertStrictEquals(Uint6.is({} as unknown as number), false);
  assertStrictEquals(Uint6.is([] as unknown as number), false);
  assertStrictEquals(Uint6.is([0] as unknown as number), false);
  assertStrictEquals(Uint6.is(undefined as unknown as number), false);
  assertStrictEquals(Uint6.is(null as unknown as number), false);
});

Deno.test("Uint6.bitwiseAnd()", () => {
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b0000_00), 0b0000_00);

  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b0000_01), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b0000_01), 0b0000_01);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(undefined as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, undefined as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.bitwiseOr()", () => {
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b0000_01), 0b0000_01);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseOr(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr("0" as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, null as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.bitwiseXOr()", () => {
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b0000_01), 0b0000_00);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0n as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, [0] as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.rotateLeft()", () => {
  assertStrictEquals(Uint6.rotateLeft(0b100000, 0), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 1), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 2), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 3), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 4), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 5), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 6), 0b100000);

  assertStrictEquals(Uint6.rotateLeft(0b011111, 0), 0b011111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 1), 0b111110);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 2), 0b111101);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 3), 0b111011);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 4), 0b110111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 5), 0b101111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 6), 0b011111);

  assertStrictEquals(Uint6.rotateLeft(0b000001, -1), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 0), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 1), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 2), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 3), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 4), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 5), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 6), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 7), 0b000010);

  assertStrictEquals(Uint6.rotateLeft(0b111111, 1), 0b111111);

  assertStrictEquals(Uint6.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 101), 0);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.rotateLeft(0x40 as uint6, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.rotateLeft(-1 as uint6, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint6.rotateLeft(0x3F, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.fromNumber()", () => {
  assertStrictEquals(Uint6.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint6.fromNumber(-0), 0), true);
  assertStrictEquals(Uint6.fromNumber(1), 1);
  assertStrictEquals(Uint6.fromNumber(63), 63);
  assertStrictEquals(Uint6.fromNumber(64), 63);
  assertStrictEquals(Uint6.fromNumber(-1), 0);

  assertStrictEquals(Uint6.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint6.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint6.fromNumber(Number.MAX_SAFE_INTEGER), 63);
  assertStrictEquals(Uint6.fromNumber(Number.POSITIVE_INFINITY), 63);

  assertStrictEquals(Uint6.fromNumber(0.1), 0);
  assertStrictEquals(Uint6.fromNumber(0.4), 0);
  assertStrictEquals(Uint6.fromNumber(0.5), 0);
  assertStrictEquals(Uint6.fromNumber(0.6), 0);
  assertStrictEquals(Uint6.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint6.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint6.fromNumber(-0.4), 0);
  assertStrictEquals(Uint6.fromNumber(-0.5), 0);
  assertStrictEquals(Uint6.fromNumber(-0.6), 0);
  assertStrictEquals(Uint6.fromNumber(-0.9), 0);

  assertStrictEquals(Uint6.fromNumber(63.1), 63);
  assertStrictEquals(Uint6.fromNumber(63.4), 63);
  assertStrictEquals(Uint6.fromNumber(63.5), 63);
  assertStrictEquals(Uint6.fromNumber(63.6), 63);
  assertStrictEquals(Uint6.fromNumber(63.9), 63);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint6.fromNumber(undefined as unknown as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.fromNumber("0" as unknown as uint6);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint6.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint6.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint6.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint6.fromNumber(1, op), 1);
  assertStrictEquals(Uint6.fromNumber(63, op), 63);
  assertStrictEquals(Uint6.fromNumber(64, op), 63);
  assertStrictEquals(Uint6.fromNumber(-1, op), 0);

  assertStrictEquals(Uint6.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint6.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(Uint6.fromNumber(Number.MAX_SAFE_INTEGER, op), 63);
  assertStrictEquals(Uint6.fromNumber(Number.POSITIVE_INFINITY, op), 63);

  assertStrictEquals(Uint6.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint6.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint6.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint6.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint6.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint6.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint6.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint6.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint6.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint6.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint6.fromNumber(63.1, op), 63);
  assertStrictEquals(Uint6.fromNumber(63.4, op), 63);
  assertStrictEquals(Uint6.fromNumber(63.5, op), 63);
  assertStrictEquals(Uint6.fromNumber(63.6, op), 63);
  assertStrictEquals(Uint6.fromNumber(63.9, op), 63);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint6.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint6.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint6.fromNumber(1, op2), 1);
  assertStrictEquals(Uint6.fromNumber(63, op2), 63);
  assertStrictEquals(Uint6.fromNumber(64, op2), 63);
  assertStrictEquals(Uint6.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint6.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint6.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(Uint6.fromNumber(Number.MAX_SAFE_INTEGER, op2), 63);
  assertStrictEquals(Uint6.fromNumber(Number.POSITIVE_INFINITY, op2), 63);

  assertStrictEquals(Uint6.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint6.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint6.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint6.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint6.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint6.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint6.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint6.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint6.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint6.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint6.fromNumber(63.1, op2), 63);
  assertStrictEquals(Uint6.fromNumber(63.4, op2), 63);
  assertStrictEquals(Uint6.fromNumber(63.5, op2), 63);
  assertStrictEquals(Uint6.fromNumber(63.6, op2), 63);
  assertStrictEquals(Uint6.fromNumber(63.9, op2), 63);
});

Deno.test("Uint6.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint6`.";
  assertThrows(
    () => {
      Uint6.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.fromNumber(64, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint6.fromNumber(-1, op2), 63);
  assertStrictEquals(Uint6.fromNumber(64, op2), 0);
  assertStrictEquals(Uint6.fromNumber(65, op2), 1);
  assertStrictEquals(Uint6.fromNumber(128, op2), 0);
  assertStrictEquals(Uint6.fromNumber(129, op2), 1);
});

Deno.test("Uint6.toNumber()", () => {
  assertStrictEquals(Uint6.toNumber(0), 0);
  assertStrictEquals(Uint6.toNumber(-0), 0);
  assertStrictEquals(Object.is(Uint6.toNumber(-0), 0), true);
  assertStrictEquals(Uint6.toNumber(0x3F), 0x3F);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.toNumber(0x40 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toNumber(-1 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toNumber(undefined as unknown as uint6);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint6.fromBigInt()", () => {
  assertStrictEquals(Uint6.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint6.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint6.fromBigInt(1n), 1);
  assertStrictEquals(Uint6.fromBigInt(63n), 63);
  assertStrictEquals(Uint6.fromBigInt(64n), 63);
  assertStrictEquals(Uint6.fromBigInt(-1n), 0);

  assertStrictEquals(Uint6.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(Uint6.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)), 63);

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      Uint6.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint6.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint6.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint6`.";
  assertThrows(
    () => {
      Uint6.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.fromBigInt(64n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint6.fromBigInt(-1n, op2), 63);
  assertStrictEquals(Uint6.fromBigInt(64n, op2), 0);
  assertStrictEquals(Uint6.fromBigInt(65n, op2), 1);
  assertStrictEquals(Uint6.fromBigInt(128n, op2), 0);
  assertStrictEquals(Uint6.fromBigInt(129n, op2), 1);
});

Deno.test("Uint6.toBigInt()", () => {
  assertStrictEquals(Uint6.toBigInt(0), 0n);
  assertStrictEquals(Uint6.toBigInt(-0), 0n);
  assertStrictEquals(Uint6.toBigInt(0x3F), 0x3Fn);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.toBigInt(0x40 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toBigInt(-1 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toBigInt(undefined as unknown as uint6);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint6.fromString()", () => {
  assertStrictEquals(Uint6.fromString("0"), 0);
  assertStrictEquals(Uint6.fromString("-0"), 0);
  assertStrictEquals(Uint6.fromString("1"), 1);
  assertStrictEquals(Uint6.fromString("-1"), 0);
  assertStrictEquals(Uint6.fromString("63"), 63);
  assertStrictEquals(Uint6.fromString("64"), 63);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be a decimal representation of an integer.";
  const e22 = "`value` must be a binary representation of an integer.";
  const e28 = "`value` must be an octal representation of an integer.";
  const e216 = "`value` must be a hexadecimal representation of an integer.";
  assertThrows(
    () => {
      Uint6.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint6`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint6.fromString("0", op2), 0);
  assertStrictEquals(Uint6.fromString("000000", op2), 0);
  assertStrictEquals(Uint6.fromString("111111", op2), 63);
  assertStrictEquals(Uint6.fromString("+0111111", op2), 63);
  assertThrows(
    () => {
      Uint6.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint6.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint6.fromString("0", op8), 0);
  assertStrictEquals(Uint6.fromString("00", op8), 0);
  assertStrictEquals(Uint6.fromString("77", op8), 63);
  assertStrictEquals(Uint6.fromString("+077", op8), 63);
  assertThrows(
    () => {
      Uint6.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint6.fromString("0", op10), 0);
  assertStrictEquals(Uint6.fromString("00", op10), 0);
  assertStrictEquals(Uint6.fromString("63", op10), 63);
  assertStrictEquals(Uint6.fromString("+063", op10), 63);
  assertThrows(
    () => {
      Uint6.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint6.fromString("0", op16), 0);
  assertStrictEquals(Uint6.fromString("00", op16), 0);
  assertStrictEquals(Uint6.fromString("3f", op16), 63);
  assertStrictEquals(Uint6.fromString("3F", op16), 63);
  assertStrictEquals(Uint6.fromString("+03F", op16), 63);
  assertThrows(
    () => {
      Uint6.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("Uint6.toString()", () => {
  assertStrictEquals(Uint6.toString(0), "0");
  assertStrictEquals(Uint6.toString(-0), "0");
  assertStrictEquals(Uint6.toString(1), "1");
  assertStrictEquals(Uint6.toString(63), "63");

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.toString(0x40 as uint6);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint6.toString(0, op16), "0");
  assertStrictEquals(Uint6.toString(63, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(Uint6.toString(0, op16l), "0");
  assertStrictEquals(Uint6.toString(63, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(Uint6.toString(0, op16l2), "00");
  assertStrictEquals(Uint6.toString(63, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(Uint6.toString(0, op16u3), "000");
  assertStrictEquals(Uint6.toString(63, op16u3), "03F");
});
