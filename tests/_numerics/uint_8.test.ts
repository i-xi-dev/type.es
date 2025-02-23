import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint8 } = xNumerics;

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
