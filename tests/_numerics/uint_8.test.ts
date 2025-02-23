import { assertStrictEquals, assertThrows } from "@std/assert";
import { type uint8, xNumerics } from "../../mod.ts";

const { Uint8 } = xNumerics;

Deno.test("Uint8.fromNumber()", () => {
  assertStrictEquals(Uint8.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint8.fromNumber(-0), 0), true);
  assertStrictEquals(Uint8.fromNumber(1), 1);
  assertStrictEquals(Uint8.fromNumber(63), 63);
  assertStrictEquals(Uint8.fromNumber(64), 64);
  assertStrictEquals(Uint8.fromNumber(127), 127);
  assertStrictEquals(Uint8.fromNumber(128), 128);
  assertStrictEquals(Uint8.fromNumber(255), 255);
  assertStrictEquals(Uint8.fromNumber(256), 255);
  assertStrictEquals(Uint8.fromNumber(-1), 0);

  assertStrictEquals(Uint8.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint8.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint8.fromNumber(Number.MAX_SAFE_INTEGER), 255);
  assertStrictEquals(Uint8.fromNumber(Number.POSITIVE_INFINITY), 255);

  assertStrictEquals(Uint8.fromNumber(0.1), 0);
  assertStrictEquals(Uint8.fromNumber(0.4), 0);
  assertStrictEquals(Uint8.fromNumber(0.5), 0);
  assertStrictEquals(Uint8.fromNumber(0.6), 0);
  assertStrictEquals(Uint8.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint8.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint8.fromNumber(-0.4), 0);
  assertStrictEquals(Uint8.fromNumber(-0.5), 0);
  assertStrictEquals(Uint8.fromNumber(-0.6), 0);
  assertStrictEquals(Uint8.fromNumber(-0.9), 0);

  assertStrictEquals(Uint8.fromNumber(255.1), 255);
  assertStrictEquals(Uint8.fromNumber(255.4), 255);
  assertStrictEquals(Uint8.fromNumber(255.5), 255);
  assertStrictEquals(Uint8.fromNumber(255.6), 255);
  assertStrictEquals(Uint8.fromNumber(255.9), 255);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint8.fromNumber(undefined as unknown as uint8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.fromNumber("0" as unknown as uint8);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint8.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint8.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint8.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint8.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint8.fromNumber(1, op), 1);
  assertStrictEquals(Uint8.fromNumber(63, op), 63);
  assertStrictEquals(Uint8.fromNumber(64, op), 64);
  assertStrictEquals(Uint8.fromNumber(127, op), 127);
  assertStrictEquals(Uint8.fromNumber(128, op), 128);
  assertStrictEquals(Uint8.fromNumber(255, op), 255);
  assertStrictEquals(Uint8.fromNumber(256, op), 255);
  assertStrictEquals(Uint8.fromNumber(-1, op), 0);

  assertStrictEquals(Uint8.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint8.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(Uint8.fromNumber(Number.MAX_SAFE_INTEGER, op), 255);
  assertStrictEquals(Uint8.fromNumber(Number.POSITIVE_INFINITY, op), 255);

  assertStrictEquals(Uint8.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint8.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint8.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint8.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint8.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint8.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint8.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint8.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint8.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint8.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint8.fromNumber(255.1, op), 255);
  assertStrictEquals(Uint8.fromNumber(255.4, op), 255);
  assertStrictEquals(Uint8.fromNumber(255.5, op), 255);
  assertStrictEquals(Uint8.fromNumber(255.6, op), 255);
  assertStrictEquals(Uint8.fromNumber(255.9, op), 255);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint8.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint8.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint8.fromNumber(1, op2), 1);
  assertStrictEquals(Uint8.fromNumber(63, op2), 63);
  assertStrictEquals(Uint8.fromNumber(64, op2), 64);
  assertStrictEquals(Uint8.fromNumber(127, op2), 127);
  assertStrictEquals(Uint8.fromNumber(128, op2), 128);
  assertStrictEquals(Uint8.fromNumber(255, op2), 255);
  assertStrictEquals(Uint8.fromNumber(256, op2), 255);
  assertStrictEquals(Uint8.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint8.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint8.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(Uint8.fromNumber(Number.MAX_SAFE_INTEGER, op2), 255);
  assertStrictEquals(Uint8.fromNumber(Number.POSITIVE_INFINITY, op2), 255);

  assertStrictEquals(Uint8.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint8.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint8.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint8.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint8.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint8.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint8.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint8.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint8.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint8.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint8.fromNumber(255.1, op2), 255);
  assertStrictEquals(Uint8.fromNumber(255.4, op2), 255);
  assertStrictEquals(Uint8.fromNumber(255.5, op2), 255);
  assertStrictEquals(Uint8.fromNumber(255.6, op2), 255);
  assertStrictEquals(Uint8.fromNumber(255.9, op2), 255);
});

Deno.test("Uint8.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint8`.";
  assertThrows(
    () => {
      Uint8.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.fromNumber(256, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint8.fromNumber(-1, op2), 255);
  assertStrictEquals(Uint8.fromNumber(64, op2), 64);
  assertStrictEquals(Uint8.fromNumber(65, op2), 65);
  assertStrictEquals(Uint8.fromNumber(128, op2), 128);
  assertStrictEquals(Uint8.fromNumber(129, op2), 129);
  assertStrictEquals(Uint8.fromNumber(256, op2), 0);
  assertStrictEquals(Uint8.fromNumber(257, op2), 1);
  assertStrictEquals(Uint8.fromNumber(512, op2), 0);
  assertStrictEquals(Uint8.fromNumber(513, op2), 1);
});

Deno.test("Uint8.fromBigInt()", () => {
  assertStrictEquals(Uint8.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint8.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint8.fromBigInt(1n), 1);
  assertStrictEquals(Uint8.fromBigInt(63n), 63);
  assertStrictEquals(Uint8.fromBigInt(64n), 64);
  assertStrictEquals(Uint8.fromBigInt(127n), 127);
  assertStrictEquals(Uint8.fromBigInt(128n), 128);
  assertStrictEquals(Uint8.fromBigInt(255n), 255);
  assertStrictEquals(Uint8.fromBigInt(256n), 255);
  assertStrictEquals(Uint8.fromBigInt(-1n), 0);

  assertStrictEquals(Uint8.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(Uint8.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)), 255);

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      Uint8.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint8.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint8.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint8`.";
  assertThrows(
    () => {
      Uint8.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.fromBigInt(256n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint8.fromBigInt(-1n, op2), 255);
  assertStrictEquals(Uint8.fromBigInt(64n, op2), 64);
  assertStrictEquals(Uint8.fromBigInt(65n, op2), 65);
  assertStrictEquals(Uint8.fromBigInt(128n, op2), 128);
  assertStrictEquals(Uint8.fromBigInt(129n, op2), 129);
  assertStrictEquals(Uint8.fromBigInt(256n, op2), 0);
  assertStrictEquals(Uint8.fromBigInt(257n, op2), 1);
  assertStrictEquals(Uint8.fromBigInt(512n, op2), 0);
  assertStrictEquals(Uint8.fromBigInt(513n, op2), 1);
});

Deno.test("Uint8.fromString()", () => {
  assertStrictEquals(Uint8.fromString("0"), 0);
  assertStrictEquals(Uint8.fromString("-0"), 0);
  assertStrictEquals(Uint8.fromString("1"), 1);
  assertStrictEquals(Uint8.fromString("-1"), 0);
  assertStrictEquals(Uint8.fromString("255"), 255);
  assertStrictEquals(Uint8.fromString("256"), 255);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      Uint8.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint8`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint8.fromString("0", op2), 0);
  assertStrictEquals(Uint8.fromString("00000000", op2), 0);
  assertStrictEquals(Uint8.fromString("11111111", op2), 255);
  assertStrictEquals(Uint8.fromString("+011111111", op2), 255);
  assertThrows(
    () => {
      Uint8.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint8.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint8.fromString("0", op8), 0);
  assertStrictEquals(Uint8.fromString("000", op8), 0);
  assertStrictEquals(Uint8.fromString("377", op8), 255);
  assertStrictEquals(Uint8.fromString("+0377", op8), 255);
  assertThrows(
    () => {
      Uint8.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint8.fromString("0", op10), 0);
  assertStrictEquals(Uint8.fromString("000", op10), 0);
  assertStrictEquals(Uint8.fromString("255", op10), 255);
  assertStrictEquals(Uint8.fromString("+0255", op10), 255);
  assertThrows(
    () => {
      Uint8.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint8.fromString("0", op16), 0);
  assertStrictEquals(Uint8.fromString("00", op16), 0);
  assertStrictEquals(Uint8.fromString("ff", op16), 255);
  assertStrictEquals(Uint8.fromString("FF", op16), 255);
  assertStrictEquals(Uint8.fromString("+0FF", op16), 255);
  assertThrows(
    () => {
      Uint8.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("Uint8.toString()", () => {
  assertStrictEquals(Uint8.toString(0), "0");
  assertStrictEquals(Uint8.toString(-0), "0");
  assertStrictEquals(Uint8.toString(1), "1");
  assertStrictEquals(Uint8.toString(63), "63");
  assertStrictEquals(Uint8.toString(127), "127");
  assertStrictEquals(Uint8.toString(255), "255");

  const e1 = "The type of `self` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.toString(0x100 as uint8);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint8.toString(0, op16), "0");
  assertStrictEquals(Uint8.toString(63, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(Uint8.toString(0, op16l), "0");
  assertStrictEquals(Uint8.toString(63, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(Uint8.toString(0, op16l2), "00");
  assertStrictEquals(Uint8.toString(63, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(Uint8.toString(0, op16u3), "000");
  assertStrictEquals(Uint8.toString(63, op16u3), "03F");
});

Deno.test("Uint8.byteLength", () => {
  assertStrictEquals(Uint8.byteLength, 1);
});
