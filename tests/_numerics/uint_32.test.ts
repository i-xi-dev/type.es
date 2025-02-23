import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint32 } = xNumerics;

Deno.test("Uint32.fromNumber()", () => {
  assertStrictEquals(Uint32.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint32.fromNumber(-0), 0), true);
  assertStrictEquals(Uint32.fromNumber(1), 1);
  assertStrictEquals(Uint32.fromNumber(63), 63);
  assertStrictEquals(Uint32.fromNumber(64), 64);
  assertStrictEquals(Uint32.fromNumber(127), 127);
  assertStrictEquals(Uint32.fromNumber(128), 128);
  assertStrictEquals(Uint32.fromNumber(255), 255);
  assertStrictEquals(Uint32.fromNumber(256), 256);
  assertStrictEquals(Uint32.fromNumber(65535), 65535);
  assertStrictEquals(Uint32.fromNumber(65536), 65536);
  assertStrictEquals(Uint32.fromNumber(16777215), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216), 16777216);
  assertStrictEquals(Uint32.fromNumber(4294967295), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296), 4294967295);
  assertStrictEquals(Uint32.fromNumber(-1), 0);

  assertStrictEquals(Uint32.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MAX_SAFE_INTEGER), 4294967295);
  assertStrictEquals(Uint32.fromNumber(Number.POSITIVE_INFINITY), 4294967295);

  assertStrictEquals(Uint32.fromNumber(0.1), 0);
  assertStrictEquals(Uint32.fromNumber(0.4), 0);
  assertStrictEquals(Uint32.fromNumber(0.5), 0);
  assertStrictEquals(Uint32.fromNumber(0.6), 0);
  assertStrictEquals(Uint32.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint32.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint32.fromNumber(-0.4), 0);
  assertStrictEquals(Uint32.fromNumber(-0.5), 0);
  assertStrictEquals(Uint32.fromNumber(-0.6), 0);
  assertStrictEquals(Uint32.fromNumber(-0.9), 0);

  assertStrictEquals(Uint32.fromNumber(4294967295.1), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.4), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.5), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.6), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.9), 4294967295);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint32.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint32.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint32.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint32.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint32.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint32.fromNumber(1, op), 1);
  assertStrictEquals(Uint32.fromNumber(63, op), 63);
  assertStrictEquals(Uint32.fromNumber(64, op), 64);
  assertStrictEquals(Uint32.fromNumber(127, op), 127);
  assertStrictEquals(Uint32.fromNumber(128, op), 128);
  assertStrictEquals(Uint32.fromNumber(255, op), 255);
  assertStrictEquals(Uint32.fromNumber(256, op), 256);
  assertStrictEquals(Uint32.fromNumber(65535, op), 65535);
  assertStrictEquals(Uint32.fromNumber(65536, op), 65536);
  assertStrictEquals(Uint32.fromNumber(16777215, op), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216, op), 16777216);
  assertStrictEquals(Uint32.fromNumber(4294967295, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(-1, op), 0);

  assertStrictEquals(Uint32.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(
    Uint32.fromNumber(Number.MAX_SAFE_INTEGER, op),
    4294967295,
  );
  assertStrictEquals(
    Uint32.fromNumber(Number.POSITIVE_INFINITY, op),
    4294967295,
  );

  assertStrictEquals(Uint32.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint32.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint32.fromNumber(4294967295.1, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.4, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.5, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.6, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.9, op), 4294967295);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint32.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint32.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint32.fromNumber(1, op2), 1);
  assertStrictEquals(Uint32.fromNumber(63, op2), 63);
  assertStrictEquals(Uint32.fromNumber(64, op2), 64);
  assertStrictEquals(Uint32.fromNumber(127, op2), 127);
  assertStrictEquals(Uint32.fromNumber(128, op2), 128);
  assertStrictEquals(Uint32.fromNumber(255, op2), 255);
  assertStrictEquals(Uint32.fromNumber(256, op2), 256);
  assertStrictEquals(Uint32.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint32.fromNumber(65536, op2), 65536);
  assertStrictEquals(Uint32.fromNumber(16777215, op2), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216, op2), 16777216);
  assertStrictEquals(Uint32.fromNumber(4294967295, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint32.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(
    Uint32.fromNumber(Number.MAX_SAFE_INTEGER, op2),
    4294967295,
  );
  assertStrictEquals(
    Uint32.fromNumber(Number.POSITIVE_INFINITY, op2),
    4294967295,
  );

  assertStrictEquals(Uint32.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint32.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint32.fromNumber(4294967295.1, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.4, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.5, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.6, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.9, op2), 4294967295);
});

Deno.test("Uint32.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint32`.";
  assertThrows(
    () => {
      Uint32.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromNumber(4294967296, op);
    },
    RangeError,
    e1,
  );
});

Deno.test("Uint32.fromBigInt()", () => {
  assertStrictEquals(Uint32.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint32.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint32.fromBigInt(1n), 1);
  assertStrictEquals(Uint32.fromBigInt(63n), 63);
  assertStrictEquals(Uint32.fromBigInt(64n), 64);
  assertStrictEquals(Uint32.fromBigInt(127n), 127);
  assertStrictEquals(Uint32.fromBigInt(128n), 128);
  assertStrictEquals(Uint32.fromBigInt(255n), 255);
  assertStrictEquals(Uint32.fromBigInt(256n), 256);
  assertStrictEquals(Uint32.fromBigInt(65535n), 65535);
  assertStrictEquals(Uint32.fromBigInt(65536n), 65536);
  assertStrictEquals(Uint32.fromBigInt(16777215n), 16777215);
  assertStrictEquals(Uint32.fromBigInt(16777216n), 16777216);
  assertStrictEquals(Uint32.fromBigInt(4294967295n), 4294967295);
  assertStrictEquals(Uint32.fromBigInt(4294967296n), 4294967295);
  assertStrictEquals(Uint32.fromBigInt(-1n), 0);

  assertStrictEquals(Uint32.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(
    Uint32.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
    4294967295,
  );

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      Uint32.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint32.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint32.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint32`.";
  assertThrows(
    () => {
      Uint32.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromBigInt(4294967296n, op);
    },
    RangeError,
    e1,
  );
});

Deno.test("Uint32.fromString()", () => {
  assertStrictEquals(Uint32.fromString("0"), 0);
  assertStrictEquals(Uint32.fromString("-0"), 0);
  assertStrictEquals(Uint32.fromString("1"), 1);
  assertStrictEquals(Uint32.fromString("-1"), 0);
  assertStrictEquals(Uint32.fromString("4294967295"), 4294967295);
  assertStrictEquals(Uint32.fromString("4294967296"), 4294967295);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      Uint32.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint32`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint32.fromString("0", op2), 0);
  assertStrictEquals(
    Uint32.fromString("00000000000000000000000000000000", op2),
    0,
  );
  assertStrictEquals(
    Uint32.fromString("11111111111111111111111111111111", op2),
    4294967295,
  );
  assertStrictEquals(
    Uint32.fromString("+011111111111111111111111111111111", op2),
    4294967295,
  );
  assertThrows(
    () => {
      Uint32.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint32.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint32.fromString("0", op8), 0);
  assertStrictEquals(Uint32.fromString("00000000000", op8), 0);
  assertStrictEquals(Uint32.fromString("37777777777", op8), 4294967295);
  assertStrictEquals(Uint32.fromString("+037777777777", op8), 4294967295);
  assertThrows(
    () => {
      Uint32.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint32.fromString("0", op10), 0);
  assertStrictEquals(Uint32.fromString("0000000000", op10), 0);
  assertStrictEquals(Uint32.fromString("4294967295", op10), 4294967295);
  assertStrictEquals(Uint32.fromString("+04294967295", op10), 4294967295);
  assertThrows(
    () => {
      Uint32.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint32.fromString("0", op16), 0);
  assertStrictEquals(Uint32.fromString("00000000", op16), 0);
  assertStrictEquals(Uint32.fromString("ffffffff", op16), 4294967295);
  assertStrictEquals(Uint32.fromString("FFFFFFFF", op16), 4294967295);
  assertStrictEquals(Uint32.fromString("+0FFFFFFFF", op16), 4294967295);
  assertThrows(
    () => {
      Uint32.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});
