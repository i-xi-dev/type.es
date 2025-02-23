import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint7 } = xNumerics;

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
