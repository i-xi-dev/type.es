import { assertStrictEquals, assertThrows } from "@std/assert";
import { type uint7, xNumerics } from "../../mod.ts";

const { Uint7 } = xNumerics;

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

  const e1 = "`value` must be a `bigint` in the safe integer range.";
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

  assertThrows(
    () => {
      Uint7.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    TypeError,
    e1,
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

Deno.test("Uint7.fromString()", () => {
  assertStrictEquals(Uint7.fromString("0"), 0);
  assertStrictEquals(Uint7.fromString("-0"), 0);
  assertStrictEquals(Uint7.fromString("1"), 1);
  assertStrictEquals(Uint7.fromString("-1"), 0);
  assertStrictEquals(Uint7.fromString("127"), 127);
  assertStrictEquals(Uint7.fromString("128"), 127);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
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
