import { assertStrictEquals, assertThrows } from "@std/assert";
import { SafeInteger } from "../../mod.ts";

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeInteger.clamp()", () => {
  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`min` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    e2,
  );

  const e3 = "`max` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must be greater than or equal to `min`.";
  assertThrows(
    () => {
      SafeInteger.clamp(0, 1, 0);
    },
    RangeError,
    e4,
  );

  assertStrictEquals(SafeInteger.clamp(-2, -1, 0), -1);
  assertStrictEquals(SafeInteger.clamp(-1, -1, 0), -1);
  assertStrictEquals(SafeInteger.clamp(0, -1, 0), 0);
  assertStrictEquals(SafeInteger.clamp(1, -1, 0), 0);

  assertStrictEquals(SafeInteger.clamp(-1, 0, 0), 0);
  assertStrictEquals(SafeInteger.clamp(0, 0, 0), 0);
  assertStrictEquals(SafeInteger.clamp(1, 0, 0), 0);

  assertStrictEquals(SafeInteger.clamp(-1, 0, 1), 0);
  assertStrictEquals(SafeInteger.clamp(0, 0, 1), 0);
  assertStrictEquals(SafeInteger.clamp(1, 0, 1), 1);
  assertStrictEquals(SafeInteger.clamp(2, 0, 1), 1);

  assertStrictEquals(SafeInteger.clamp(-1, 0, 2), 0);
  assertStrictEquals(SafeInteger.clamp(0, 0, 2), 0);
  assertStrictEquals(SafeInteger.clamp(1, 0, 2), 1);
  assertStrictEquals(SafeInteger.clamp(2, 0, 2), 2);
  assertStrictEquals(SafeInteger.clamp(3, 0, 2), 2);
});

Deno.test("SafeInteger.fromString()", () => {
  // const rfe1 = "`value` must be a `string`.";
  const rfe2 = "`value` must be text representation of 10 based integer.";

  assertThrows(
    () => {
      SafeInteger.fromString(undefined as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString(0 as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString(0n as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("");
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("a");
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1"), -1);
  assertStrictEquals(SafeInteger.fromString("-0"), 0);
  assertStrictEquals(Object.is(SafeInteger.fromString("-0"), 0), true);
  assertStrictEquals(SafeInteger.fromString("0"), 0);
  assertStrictEquals(SafeInteger.fromString("1"), 1);
  assertStrictEquals(SafeInteger.fromString("1111"), 1111);

  assertStrictEquals(SafeInteger.fromString("+0"), 0);
  assertStrictEquals(SafeInteger.fromString("+1"), 1);

  assertStrictEquals(SafeInteger.fromString("00"), 0);
  assertStrictEquals(SafeInteger.fromString("01"), 1);

  assertStrictEquals(
    SafeInteger.fromString("9007199254740991"),
    9007199254740991,
  );
  assertStrictEquals(
    SafeInteger.fromString("-9007199254740991"),
    -9007199254740991,
  );

  const op2 = { radix: 2 } as const;
  assertStrictEquals(SafeInteger.fromString("11", op2), 3);

  const op8 = { radix: 8 } as const;
  assertStrictEquals(SafeInteger.fromString("11", op8), 9);

  const op16 = { radix: 16 } as const;
  assertStrictEquals(SafeInteger.fromString("1f", op16), 31);
  assertStrictEquals(SafeInteger.fromString("1F", op16), 31);

  const eo = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      SafeInteger.fromString("9007199254740992");
    },
    TypeError,
    eo,
  );
  assertThrows(
    () => {
      SafeInteger.fromString("-9007199254740992");
    },
    TypeError,
    eo,
  );
});

Deno.test("SafeInteger.fromString() - radix:2", () => {
  const op = { radix: 2 } as const;

  const rfe2 = "`value` must be text representation of 2 based integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("2", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 15);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:8", () => {
  const op = { radix: 8 } as const;

  const rfe2 = "`value` must be text representation of 8 based integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("8", op);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("9", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 585);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 1111);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:16", () => {
  const op = { radix: 16 } as const;

  const rfe2 = "`value` must be text representation of 16 based integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("g", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 4369);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);
  assertStrictEquals(SafeInteger.fromString("a", op), 10);
  assertStrictEquals(SafeInteger.fromString("B", op), 11);
  assertStrictEquals(SafeInteger.fromString("c", op), 12);
  assertStrictEquals(SafeInteger.fromString("0d", op), 13);
  assertStrictEquals(SafeInteger.fromString("E", op), 14);
  assertStrictEquals(SafeInteger.fromString("f", op), 15);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      SafeInteger.fromString("-1", op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  // assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  // assertStrictEquals(SafeInteger.fromString("0", op), 0);
  // assertStrictEquals(SafeInteger.fromString("1", op), 1);
  // assertStrictEquals(SafeInteger.fromString("1111", op), 1111);

  // assertStrictEquals(SafeInteger.fromString("2", op), 2);
  // assertStrictEquals(SafeInteger.fromString("3", op), 3);
  // assertStrictEquals(SafeInteger.fromString("4", op), 4);
  // assertStrictEquals(SafeInteger.fromString("5", op), 5);
  // assertStrictEquals(SafeInteger.fromString("6", op), 6);
  // assertStrictEquals(SafeInteger.fromString("7", op), 7);
  // assertStrictEquals(SafeInteger.fromString("8", op), 8);
  // assertStrictEquals(SafeInteger.fromString("9", op), 9);

  // assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  // assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  // assertStrictEquals(SafeInteger.fromString("00", op), 0);
  // assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromBigInt()", () => {
  const rfe2 = "`value` must be a `bigint` in the safe integer range.";

  assertThrows(
    () => {
      SafeInteger.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(0 as unknown as bigint);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(MIN) - 1n);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(MAX) + 1n);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromBigInt(BigInt(MIN)), MIN);
  assertStrictEquals(SafeInteger.fromBigInt(-1n), -1);
  assertStrictEquals(SafeInteger.fromBigInt(-0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(1n), 1);
  assertStrictEquals(SafeInteger.fromBigInt(BigInt(MAX)), MAX);
});

Deno.test("SafeInteger.toBigInt()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeInteger.toBigInt(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt("0" as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt(1.5);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.toBigInt(MIN), BigInt(MIN));
  assertStrictEquals(SafeInteger.toBigInt(-1), -1n);
  assertStrictEquals(SafeInteger.toBigInt(-0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(1), 1n);
  assertStrictEquals(SafeInteger.toBigInt(MAX), BigInt(MAX));
});
