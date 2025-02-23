import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint24 } = xNumerics;

Deno.test("Uint24.fromNumber()", () => {
  assertStrictEquals(Uint24.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint24.fromNumber(-0), 0), true);
  assertStrictEquals(Uint24.fromNumber(1), 1);
  assertStrictEquals(Uint24.fromNumber(63), 63);
  assertStrictEquals(Uint24.fromNumber(64), 64);
  assertStrictEquals(Uint24.fromNumber(127), 127);
  assertStrictEquals(Uint24.fromNumber(128), 128);
  assertStrictEquals(Uint24.fromNumber(255), 255);
  assertStrictEquals(Uint24.fromNumber(256), 256);
  assertStrictEquals(Uint24.fromNumber(65535), 65535);
  assertStrictEquals(Uint24.fromNumber(65536), 65536);
  assertStrictEquals(Uint24.fromNumber(16777215), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777216), 16777215);
  assertStrictEquals(Uint24.fromNumber(-1), 0);

  assertStrictEquals(Uint24.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint24.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint24.fromNumber(Number.MAX_SAFE_INTEGER), 16777215);
  assertStrictEquals(Uint24.fromNumber(Number.POSITIVE_INFINITY), 16777215);

  assertStrictEquals(Uint24.fromNumber(0.1), 0);
  assertStrictEquals(Uint24.fromNumber(0.4), 0);
  assertStrictEquals(Uint24.fromNumber(0.5), 0);
  assertStrictEquals(Uint24.fromNumber(0.6), 0);
  assertStrictEquals(Uint24.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint24.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint24.fromNumber(-0.4), 0);
  assertStrictEquals(Uint24.fromNumber(-0.5), 0);
  assertStrictEquals(Uint24.fromNumber(-0.6), 0);
  assertStrictEquals(Uint24.fromNumber(-0.9), 0);

  assertStrictEquals(Uint24.fromNumber(16777215.1), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.4), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.5), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.6), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.9), 16777215);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint24.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint24.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint24.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint24.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint24.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint24.fromNumber(1, op), 1);
  assertStrictEquals(Uint24.fromNumber(63, op), 63);
  assertStrictEquals(Uint24.fromNumber(64, op), 64);
  assertStrictEquals(Uint24.fromNumber(127, op), 127);
  assertStrictEquals(Uint24.fromNumber(128, op), 128);
  assertStrictEquals(Uint24.fromNumber(255, op), 255);
  assertStrictEquals(Uint24.fromNumber(256, op), 256);
  assertStrictEquals(Uint24.fromNumber(65535, op), 65535);
  assertStrictEquals(Uint24.fromNumber(65536, op), 65536);
  assertStrictEquals(Uint24.fromNumber(16777215, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777216, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(-1, op), 0);

  assertStrictEquals(Uint24.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint24.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(Uint24.fromNumber(Number.MAX_SAFE_INTEGER, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(Number.POSITIVE_INFINITY, op), 16777215);

  assertStrictEquals(Uint24.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint24.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint24.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint24.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint24.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint24.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint24.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint24.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint24.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint24.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint24.fromNumber(16777215.1, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.4, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.5, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.6, op), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.9, op), 16777215);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint24.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint24.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint24.fromNumber(1, op2), 1);
  assertStrictEquals(Uint24.fromNumber(63, op2), 63);
  assertStrictEquals(Uint24.fromNumber(64, op2), 64);
  assertStrictEquals(Uint24.fromNumber(127, op2), 127);
  assertStrictEquals(Uint24.fromNumber(128, op2), 128);
  assertStrictEquals(Uint24.fromNumber(255, op2), 255);
  assertStrictEquals(Uint24.fromNumber(256, op2), 256);
  assertStrictEquals(Uint24.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint24.fromNumber(65536, op2), 65536);
  assertStrictEquals(Uint24.fromNumber(16777215, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777216, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint24.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint24.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(Uint24.fromNumber(Number.MAX_SAFE_INTEGER, op2), 16777215);
  assertStrictEquals(
    Uint24.fromNumber(Number.POSITIVE_INFINITY, op2),
    16777215,
  );

  assertStrictEquals(Uint24.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint24.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint24.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint24.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint24.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint24.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint24.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint24.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint24.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint24.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint24.fromNumber(16777215.1, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.4, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.5, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.6, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777215.9, op2), 16777215);
});

Deno.test("Uint24.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint24`.";
  assertThrows(
    () => {
      Uint24.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromNumber(16777216, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint24.fromNumber(-1, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(64, op2), 64);
  assertStrictEquals(Uint24.fromNumber(65, op2), 65);
  assertStrictEquals(Uint24.fromNumber(128, op2), 128);
  assertStrictEquals(Uint24.fromNumber(129, op2), 129);
  assertStrictEquals(Uint24.fromNumber(256, op2), 256);
  assertStrictEquals(Uint24.fromNumber(257, op2), 257);
  assertStrictEquals(Uint24.fromNumber(512, op2), 512);
  assertStrictEquals(Uint24.fromNumber(513, op2), 513);
  assertStrictEquals(Uint24.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint24.fromNumber(65536, op2), 65536);
  assertStrictEquals(Uint24.fromNumber(131071, op2), 131071);
  assertStrictEquals(Uint24.fromNumber(131072, op2), 131072);
  assertStrictEquals(Uint24.fromNumber(16777215, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(16777216, op2), 0);
  assertStrictEquals(Uint24.fromNumber(33554431, op2), 16777215);
  assertStrictEquals(Uint24.fromNumber(33554432, op2), 0);
});

Deno.test("Uint24.fromBigInt()", () => {
  assertStrictEquals(Uint24.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint24.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint24.fromBigInt(1n), 1);
  assertStrictEquals(Uint24.fromBigInt(63n), 63);
  assertStrictEquals(Uint24.fromBigInt(64n), 64);
  assertStrictEquals(Uint24.fromBigInt(127n), 127);
  assertStrictEquals(Uint24.fromBigInt(128n), 128);
  assertStrictEquals(Uint24.fromBigInt(255n), 255);
  assertStrictEquals(Uint24.fromBigInt(256n), 256);
  assertStrictEquals(Uint24.fromBigInt(65535n), 65535);
  assertStrictEquals(Uint24.fromBigInt(65536n), 65536);
  assertStrictEquals(Uint24.fromBigInt(16777215n), 16777215);
  assertStrictEquals(Uint24.fromBigInt(16777216n), 16777215);
  assertStrictEquals(Uint24.fromBigInt(-1n), 0);

  assertStrictEquals(Uint24.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(
    Uint24.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
    16777215,
  );

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      Uint24.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint24.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint24.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint24`.";
  assertThrows(
    () => {
      Uint24.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromBigInt(16777216n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint24.fromBigInt(-1n, op2), 16777215);
  assertStrictEquals(Uint24.fromBigInt(64n, op2), 64);
  assertStrictEquals(Uint24.fromBigInt(65n, op2), 65);
  assertStrictEquals(Uint24.fromBigInt(128n, op2), 128);
  assertStrictEquals(Uint24.fromBigInt(129n, op2), 129);
  assertStrictEquals(Uint24.fromBigInt(256n, op2), 256);
  assertStrictEquals(Uint24.fromBigInt(257n, op2), 257);
  assertStrictEquals(Uint24.fromBigInt(512n, op2), 512);
  assertStrictEquals(Uint24.fromBigInt(513n, op2), 513);
  assertStrictEquals(Uint24.fromBigInt(65535n, op2), 65535);
  assertStrictEquals(Uint24.fromBigInt(65536n, op2), 65536);
  assertStrictEquals(Uint24.fromBigInt(65537n, op2), 65537);
  assertStrictEquals(Uint24.fromBigInt(131071n, op2), 131071);
  assertStrictEquals(Uint24.fromBigInt(131072n, op2), 131072);
  assertStrictEquals(Uint24.fromBigInt(16777215n, op2), 16777215);
  assertStrictEquals(Uint24.fromBigInt(16777216n, op2), 0);
});

Deno.test("Uint24.fromString()", () => {
  assertStrictEquals(Uint24.fromString("0"), 0);
  assertStrictEquals(Uint24.fromString("-0"), 0);
  assertStrictEquals(Uint24.fromString("1"), 1);
  assertStrictEquals(Uint24.fromString("-1"), 0);
  assertStrictEquals(Uint24.fromString("16777215"), 16777215);
  assertStrictEquals(Uint24.fromString("16777216"), 16777215);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      Uint24.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint24`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint24.fromString("0", op2), 0);
  assertStrictEquals(Uint24.fromString("000000000000000000000000", op2), 0);
  assertStrictEquals(
    Uint24.fromString("111111111111111111111111", op2),
    16777215,
  );
  assertStrictEquals(
    Uint24.fromString("+0111111111111111111111111", op2),
    16777215,
  );
  assertThrows(
    () => {
      Uint24.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint24.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint24.fromString("0", op8), 0);
  assertStrictEquals(Uint24.fromString("00000000", op8), 0);
  assertStrictEquals(Uint24.fromString("77777777", op8), 16777215);
  assertStrictEquals(Uint24.fromString("+077777777", op8), 16777215);
  assertThrows(
    () => {
      Uint24.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint24.fromString("0", op10), 0);
  assertStrictEquals(Uint24.fromString("00000000", op10), 0);
  assertStrictEquals(Uint24.fromString("16777215", op10), 16777215);
  assertStrictEquals(Uint24.fromString("+016777215", op10), 16777215);
  assertThrows(
    () => {
      Uint24.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint24.fromString("0", op16), 0);
  assertStrictEquals(Uint24.fromString("000000", op16), 0);
  assertStrictEquals(Uint24.fromString("ffffff", op16), 16777215);
  assertStrictEquals(Uint24.fromString("FFFFFF", op16), 16777215);
  assertStrictEquals(Uint24.fromString("+0FFFFFF", op16), 16777215);
  assertThrows(
    () => {
      Uint24.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("Uint24.toString()", () => {
  assertStrictEquals(Uint24.toString(0), "0");
  assertStrictEquals(Uint24.toString(-0), "0");
  assertStrictEquals(Uint24.toString(1), "1");
  assertStrictEquals(Uint24.toString(63), "63");
  assertStrictEquals(Uint24.toString(127), "127");
  assertStrictEquals(Uint24.toString(255), "255");
  assertStrictEquals(Uint24.toString(65535), "65535");
  assertStrictEquals(Uint24.toString(16777215), "16777215");

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.toString(0x1000000 as number);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint24.toString(0, op16), "0");
  assertStrictEquals(Uint24.toString(63, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(Uint24.toString(0, op16l), "0");
  assertStrictEquals(Uint24.toString(63, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(Uint24.toString(0, op16l2), "00");
  assertStrictEquals(Uint24.toString(63, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(Uint24.toString(0, op16u3), "000");
  assertStrictEquals(Uint24.toString(63, op16u3), "03F");
});

Deno.test("Uint24.byteLength", () => {
  assertStrictEquals(Uint24.byteLength, 3);
});
