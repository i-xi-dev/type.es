import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint16 } = xNumerics;

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
