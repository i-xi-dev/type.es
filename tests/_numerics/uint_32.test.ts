import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint32 } = xNumerics;

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
