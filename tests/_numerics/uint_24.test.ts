import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint24 } = xNumerics;

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
