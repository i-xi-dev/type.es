import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint16 } = xNumerics;

Deno.test("Uint16.fromNumber()", () => {
  assertStrictEquals(Uint16.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint16.fromNumber(-0), 0), true);
  assertStrictEquals(Uint16.fromNumber(1), 1);
  assertStrictEquals(Uint16.fromNumber(63), 63);
  assertStrictEquals(Uint16.fromNumber(64), 64);
  assertStrictEquals(Uint16.fromNumber(127), 127);
  assertStrictEquals(Uint16.fromNumber(128), 128);
  assertStrictEquals(Uint16.fromNumber(255), 255);
  assertStrictEquals(Uint16.fromNumber(256), 256);
  assertStrictEquals(Uint16.fromNumber(65535), 65535);
  assertStrictEquals(Uint16.fromNumber(65536), 65535);
  assertStrictEquals(Uint16.fromNumber(-1), 0);

  assertStrictEquals(Uint16.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MAX_SAFE_INTEGER), 65535);
  assertStrictEquals(Uint16.fromNumber(Number.POSITIVE_INFINITY), 65535);

  assertStrictEquals(Uint16.fromNumber(0.1), 0);
  assertStrictEquals(Uint16.fromNumber(0.4), 0);
  assertStrictEquals(Uint16.fromNumber(0.5), 0);
  assertStrictEquals(Uint16.fromNumber(0.6), 0);
  assertStrictEquals(Uint16.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint16.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint16.fromNumber(-0.4), 0);
  assertStrictEquals(Uint16.fromNumber(-0.5), 0);
  assertStrictEquals(Uint16.fromNumber(-0.6), 0);
  assertStrictEquals(Uint16.fromNumber(-0.9), 0);

  assertStrictEquals(Uint16.fromNumber(65535.1), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.4), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.5), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.6), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.9), 65535);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint16.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint16.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint16.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint16.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint16.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint16.fromNumber(1, op), 1);
  assertStrictEquals(Uint16.fromNumber(63, op), 63);
  assertStrictEquals(Uint16.fromNumber(64, op), 64);
  assertStrictEquals(Uint16.fromNumber(127, op), 127);
  assertStrictEquals(Uint16.fromNumber(128, op), 128);
  assertStrictEquals(Uint16.fromNumber(255, op), 255);
  assertStrictEquals(Uint16.fromNumber(256, op), 256);
  assertStrictEquals(Uint16.fromNumber(65535, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65536, op), 65535);
  assertStrictEquals(Uint16.fromNumber(-1, op), 0);

  assertStrictEquals(Uint16.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MAX_SAFE_INTEGER, op), 65535);
  assertStrictEquals(Uint16.fromNumber(Number.POSITIVE_INFINITY, op), 65535);

  assertStrictEquals(Uint16.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint16.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint16.fromNumber(65535.1, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.4, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.5, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.6, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.9, op), 65535);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint16.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint16.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint16.fromNumber(1, op2), 1);
  assertStrictEquals(Uint16.fromNumber(63, op2), 63);
  assertStrictEquals(Uint16.fromNumber(64, op2), 64);
  assertStrictEquals(Uint16.fromNumber(127, op2), 127);
  assertStrictEquals(Uint16.fromNumber(128, op2), 128);
  assertStrictEquals(Uint16.fromNumber(255, op2), 255);
  assertStrictEquals(Uint16.fromNumber(256, op2), 256);
  assertStrictEquals(Uint16.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65536, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint16.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MAX_SAFE_INTEGER, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(Number.POSITIVE_INFINITY, op2), 65535);

  assertStrictEquals(Uint16.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint16.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint16.fromNumber(65535.1, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.4, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.5, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.6, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.9, op2), 65535);
});

Deno.test("Uint16.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint16`.";
  assertThrows(
    () => {
      Uint16.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromNumber(65536, op);
    },
    RangeError,
    e1,
  );
});

Deno.test("Uint16.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint16`.";
  assertThrows(
    () => {
      Uint16.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromBigInt(65536n, op);
    },
    RangeError,
    e1,
  );
});

Deno.test("Uint16.fromString()", () => {
  assertStrictEquals(Uint16.fromString("0"), 0);
  assertStrictEquals(Uint16.fromString("-0"), 0);
  assertStrictEquals(Uint16.fromString("1"), 1);
  assertStrictEquals(Uint16.fromString("-1"), 0);
  assertStrictEquals(Uint16.fromString("65535"), 65535);
  assertStrictEquals(Uint16.fromString("65536"), 65535);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      Uint16.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint16`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint16.fromString("0", op2), 0);
  assertStrictEquals(Uint16.fromString("0000000000000000", op2), 0);
  assertStrictEquals(Uint16.fromString("1111111111111111", op2), 65535);
  assertStrictEquals(Uint16.fromString("+01111111111111111", op2), 65535);
  assertThrows(
    () => {
      Uint16.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint16.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint16.fromString("0", op8), 0);
  assertStrictEquals(Uint16.fromString("000000", op8), 0);
  assertStrictEquals(Uint16.fromString("177777", op8), 65535);
  assertStrictEquals(Uint16.fromString("+0177777", op8), 65535);
  assertThrows(
    () => {
      Uint16.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint16.fromString("0", op10), 0);
  assertStrictEquals(Uint16.fromString("00000", op10), 0);
  assertStrictEquals(Uint16.fromString("65535", op10), 65535);
  assertStrictEquals(Uint16.fromString("+065535", op10), 65535);
  assertThrows(
    () => {
      Uint16.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint16.fromString("0", op16), 0);
  assertStrictEquals(Uint16.fromString("0000", op16), 0);
  assertStrictEquals(Uint16.fromString("ffff", op16), 65535);
  assertStrictEquals(Uint16.fromString("FFFF", op16), 65535);
  assertStrictEquals(Uint16.fromString("+0FFFF", op16), 65535);
  assertThrows(
    () => {
      Uint16.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});
