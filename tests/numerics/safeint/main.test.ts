import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { SafeInt } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.SafeInt.clampToRange()", () => {
  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToRange(undefined as unknown as number, [0, 0]);
    },
    TypeError,
    e1,
  );

  const e2 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToRange(0, [undefined as unknown as number, 0]);
    },
    TypeError,
    e2,
  );

  const e3 = "`range` must be a range of safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToRange(0, [0, undefined as unknown as number]);
    },
    TypeError,
    e3,
  );

  const e4 = "`max` must be greater than or equal to `min`.";
  assertThrows(
    () => {
      SafeInt.clampToRange(0, [1, 0]);
    },
    RangeError,
    e4,
  );

  assertStrictEquals(SafeInt.clampToRange(-2, [-1, 0]), -1);
  assertStrictEquals(SafeInt.clampToRange(-1, [-1, 0]), -1);
  assertStrictEquals(SafeInt.clampToRange(0, [-1, 0]), 0);
  assertStrictEquals(SafeInt.clampToRange(1, [-1, 0]), 0);

  assertStrictEquals(SafeInt.clampToRange(-1, [0, 0]), 0);
  assertStrictEquals(SafeInt.clampToRange(0, [0, 0]), 0);
  assertStrictEquals(SafeInt.clampToRange(1, [0, 0]), 0);

  assertStrictEquals(SafeInt.clampToRange(-1, [0, 1]), 0);
  assertStrictEquals(SafeInt.clampToRange(0, [0, 1]), 0);
  assertStrictEquals(SafeInt.clampToRange(1, [0, 1]), 1);
  assertStrictEquals(SafeInt.clampToRange(2, [0, 1]), 1);

  assertStrictEquals(SafeInt.clampToRange(-1, [0, 2]), 0);
  assertStrictEquals(SafeInt.clampToRange(0, [0, 2]), 0);
  assertStrictEquals(SafeInt.clampToRange(1, [0, 2]), 1);
  assertStrictEquals(SafeInt.clampToRange(2, [0, 2]), 2);
  assertStrictEquals(SafeInt.clampToRange(3, [0, 2]), 2);
});

Deno.test("Numerics.SafeInt.clampToPositive()", () => {
  assertStrictEquals(SafeInt.clampToPositive(MIN), 1);
  assertStrictEquals(SafeInt.clampToPositive(-2), 1);
  assertStrictEquals(SafeInt.clampToPositive(-1), 1);
  assertStrictEquals(SafeInt.clampToPositive(-0), 1);
  assertStrictEquals(SafeInt.clampToPositive(0), 1);
  assertStrictEquals(SafeInt.clampToPositive(1), 1);
  assertStrictEquals(SafeInt.clampToPositive(2), 2);
  assertStrictEquals(SafeInt.clampToPositive(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.SafeInt.clampToNonNegative()", () => {
  assertStrictEquals(SafeInt.clampToNonNegative(MIN), 0);
  assertStrictEquals(SafeInt.clampToNonNegative(-2), 0);
  assertStrictEquals(SafeInt.clampToNonNegative(-1), 0);
  assertStrictEquals(
    Object.is(SafeInt.clampToNonNegative(-0), 0),
    true,
  );
  assertStrictEquals(SafeInt.clampToNonNegative(0), 0);
  assertStrictEquals(SafeInt.clampToNonNegative(1), 1);
  assertStrictEquals(SafeInt.clampToNonNegative(2), 2);
  assertStrictEquals(SafeInt.clampToNonNegative(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToNonNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.SafeInt.clampToNonPositive()", () => {
  assertStrictEquals(SafeInt.clampToNonPositive(MIN), MIN);
  assertStrictEquals(SafeInt.clampToNonPositive(-2), -2);
  assertStrictEquals(SafeInt.clampToNonPositive(-1), -1);
  assertStrictEquals(
    Object.is(SafeInt.clampToNonPositive(-0), 0),
    true,
  );
  assertStrictEquals(SafeInt.clampToNonPositive(0), 0);
  assertStrictEquals(SafeInt.clampToNonPositive(1), 0);
  assertStrictEquals(SafeInt.clampToNonPositive(2), 0);
  assertStrictEquals(SafeInt.clampToNonPositive(MAX), 0);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToNonPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.SafeInt.clampToNegative()", () => {
  assertStrictEquals(SafeInt.clampToNegative(MIN), MIN);
  assertStrictEquals(SafeInt.clampToNegative(-2), -2);
  assertStrictEquals(SafeInt.clampToNegative(-1), -1);
  assertStrictEquals(SafeInt.clampToNegative(-0), -1);
  assertStrictEquals(SafeInt.clampToNegative(0), -1);
  assertStrictEquals(SafeInt.clampToNegative(1), -1);
  assertStrictEquals(SafeInt.clampToNegative(2), -1);
  assertStrictEquals(SafeInt.clampToNegative(MAX), -1);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInt.clampToNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.SafeInt.fromString()", () => {
  // const rfe1 = "`value` must be a `string`.";
  const rfe2 = "`value` must be text representation of 10 based integer.";

  assertThrows(
    () => {
      SafeInt.fromString(undefined as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromString(0 as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromString(0n as unknown as string);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromString("");
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromString("a");
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInt.fromString("-1"), -1);
  assertStrictEquals(SafeInt.fromString("-0"), 0);
  assertStrictEquals(Object.is(SafeInt.fromString("-0"), 0), true);
  assertStrictEquals(SafeInt.fromString("0"), 0);
  assertStrictEquals(SafeInt.fromString("1"), 1);
  assertStrictEquals(SafeInt.fromString("1111"), 1111);

  assertStrictEquals(SafeInt.fromString("+0"), 0);
  assertStrictEquals(SafeInt.fromString("+1"), 1);

  assertStrictEquals(SafeInt.fromString("00"), 0);
  assertStrictEquals(SafeInt.fromString("01"), 1);

  assertStrictEquals(
    SafeInt.fromString("9007199254740991"),
    9007199254740991,
  );
  assertStrictEquals(
    SafeInt.fromString("-9007199254740991"),
    -9007199254740991,
  );

  const op2 = { radix: 2 } as const;
  assertStrictEquals(SafeInt.fromString("11", op2), 3);

  const op8 = { radix: 8 } as const;
  assertStrictEquals(SafeInt.fromString("11", op8), 9);

  const op16 = { radix: 16 } as const;
  assertStrictEquals(SafeInt.fromString("1f", op16), 31);
  assertStrictEquals(SafeInt.fromString("1F", op16), 31);

  const eo = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      SafeInt.fromString("9007199254740992");
    },
    TypeError,
    eo,
  );
  assertThrows(
    () => {
      SafeInt.fromString("-9007199254740992");
    },
    TypeError,
    eo,
  );
});

Deno.test("Numerics.SafeInt.fromString() - radix:2", () => {
  const op = { radix: 2 } as const;

  const rfe2 = "`value` must be text representation of 2 based integer.";

  assertThrows(
    () => {
      SafeInt.fromString("2", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInt.fromString("-1", op), -1);
  assertStrictEquals(SafeInt.fromString("-0", op), 0);
  assertStrictEquals(SafeInt.fromString("0", op), 0);
  assertStrictEquals(SafeInt.fromString("1", op), 1);
  assertStrictEquals(SafeInt.fromString("1111", op), 15);

  assertStrictEquals(SafeInt.fromString("+0", op), 0);
  assertStrictEquals(SafeInt.fromString("+1", op), 1);

  assertStrictEquals(SafeInt.fromString("00", op), 0);
  assertStrictEquals(SafeInt.fromString("01", op), 1);
});

Deno.test("Numerics.SafeInt.fromString() - radix:8", () => {
  const op = { radix: 8 } as const;

  const rfe2 = "`value` must be text representation of 8 based integer.";

  assertThrows(
    () => {
      SafeInt.fromString("8", op);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromString("9", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInt.fromString("-1", op), -1);
  assertStrictEquals(SafeInt.fromString("-0", op), 0);
  assertStrictEquals(SafeInt.fromString("0", op), 0);
  assertStrictEquals(SafeInt.fromString("1", op), 1);
  assertStrictEquals(SafeInt.fromString("1111", op), 585);

  assertStrictEquals(SafeInt.fromString("2", op), 2);
  assertStrictEquals(SafeInt.fromString("3", op), 3);
  assertStrictEquals(SafeInt.fromString("4", op), 4);
  assertStrictEquals(SafeInt.fromString("5", op), 5);
  assertStrictEquals(SafeInt.fromString("6", op), 6);
  assertStrictEquals(SafeInt.fromString("7", op), 7);

  assertStrictEquals(SafeInt.fromString("+0", op), 0);
  assertStrictEquals(SafeInt.fromString("+1", op), 1);

  assertStrictEquals(SafeInt.fromString("00", op), 0);
  assertStrictEquals(SafeInt.fromString("01", op), 1);
});

Deno.test("Numerics.SafeInt.fromString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInt.fromString("-1", op), -1);
  assertStrictEquals(SafeInt.fromString("-0", op), 0);
  assertStrictEquals(SafeInt.fromString("0", op), 0);
  assertStrictEquals(SafeInt.fromString("1", op), 1);
  assertStrictEquals(SafeInt.fromString("1111", op), 1111);

  assertStrictEquals(SafeInt.fromString("2", op), 2);
  assertStrictEquals(SafeInt.fromString("3", op), 3);
  assertStrictEquals(SafeInt.fromString("4", op), 4);
  assertStrictEquals(SafeInt.fromString("5", op), 5);
  assertStrictEquals(SafeInt.fromString("6", op), 6);
  assertStrictEquals(SafeInt.fromString("7", op), 7);
  assertStrictEquals(SafeInt.fromString("8", op), 8);
  assertStrictEquals(SafeInt.fromString("9", op), 9);

  assertStrictEquals(SafeInt.fromString("+0", op), 0);
  assertStrictEquals(SafeInt.fromString("+1", op), 1);

  assertStrictEquals(SafeInt.fromString("00", op), 0);
  assertStrictEquals(SafeInt.fromString("01", op), 1);
});

Deno.test("Numerics.SafeInt.fromString() - radix:16", () => {
  const op = { radix: 16 } as const;

  const rfe2 = "`value` must be text representation of 16 based integer.";

  assertThrows(
    () => {
      SafeInt.fromString("g", op);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInt.fromString("-1", op), -1);
  assertStrictEquals(SafeInt.fromString("-0", op), 0);
  assertStrictEquals(SafeInt.fromString("0", op), 0);
  assertStrictEquals(SafeInt.fromString("1", op), 1);
  assertStrictEquals(SafeInt.fromString("1111", op), 4369);

  assertStrictEquals(SafeInt.fromString("2", op), 2);
  assertStrictEquals(SafeInt.fromString("3", op), 3);
  assertStrictEquals(SafeInt.fromString("4", op), 4);
  assertStrictEquals(SafeInt.fromString("5", op), 5);
  assertStrictEquals(SafeInt.fromString("6", op), 6);
  assertStrictEquals(SafeInt.fromString("7", op), 7);
  assertStrictEquals(SafeInt.fromString("8", op), 8);
  assertStrictEquals(SafeInt.fromString("9", op), 9);
  assertStrictEquals(SafeInt.fromString("a", op), 10);
  assertStrictEquals(SafeInt.fromString("B", op), 11);
  assertStrictEquals(SafeInt.fromString("c", op), 12);
  assertStrictEquals(SafeInt.fromString("0d", op), 13);
  assertStrictEquals(SafeInt.fromString("E", op), 14);
  assertStrictEquals(SafeInt.fromString("f", op), 15);

  assertStrictEquals(SafeInt.fromString("+0", op), 0);
  assertStrictEquals(SafeInt.fromString("+1", op), 1);

  assertStrictEquals(SafeInt.fromString("00", op), 0);
  assertStrictEquals(SafeInt.fromString("01", op), 1);
});

Deno.test("Numerics.SafeInt.fromString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      SafeInt.fromString("-1", op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(SafeInt.fromString("-1", op), -1);
  // assertStrictEquals(SafeInt.fromString("-0", op), 0);
  // assertStrictEquals(SafeInt.fromString("0", op), 0);
  // assertStrictEquals(SafeInt.fromString("1", op), 1);
  // assertStrictEquals(SafeInt.fromString("1111", op), 1111);

  // assertStrictEquals(SafeInt.fromString("2", op), 2);
  // assertStrictEquals(SafeInt.fromString("3", op), 3);
  // assertStrictEquals(SafeInt.fromString("4", op), 4);
  // assertStrictEquals(SafeInt.fromString("5", op), 5);
  // assertStrictEquals(SafeInt.fromString("6", op), 6);
  // assertStrictEquals(SafeInt.fromString("7", op), 7);
  // assertStrictEquals(SafeInt.fromString("8", op), 8);
  // assertStrictEquals(SafeInt.fromString("9", op), 9);

  // assertStrictEquals(SafeInt.fromString("+0", op), 0);
  // assertStrictEquals(SafeInt.fromString("+1", op), 1);

  // assertStrictEquals(SafeInt.fromString("00", op), 0);
  // assertStrictEquals(SafeInt.fromString("01", op), 1);
});

Deno.test("Numerics.SafeInt.toString()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeInt.toString(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.toString(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInt.toString(-1), "-1");
  assertStrictEquals(SafeInt.toString(-0), "0");
  assertStrictEquals(SafeInt.toString(0), "0");
  assertStrictEquals(SafeInt.toString(1), "1");

  assertStrictEquals(SafeInt.toString(1111), "1111");

  assertStrictEquals(SafeInt.toString(2), "2");
  assertStrictEquals(SafeInt.toString(3), "3");
  assertStrictEquals(SafeInt.toString(4), "4");
  assertStrictEquals(SafeInt.toString(5), "5");
  assertStrictEquals(SafeInt.toString(6), "6");
  assertStrictEquals(SafeInt.toString(7), "7");
  assertStrictEquals(SafeInt.toString(8), "8");
  assertStrictEquals(SafeInt.toString(9), "9");
  assertStrictEquals(SafeInt.toString(10), "10");
  assertStrictEquals(SafeInt.toString(11), "11");
  assertStrictEquals(SafeInt.toString(12), "12");
  assertStrictEquals(SafeInt.toString(13), "13");
  assertStrictEquals(SafeInt.toString(14), "14");
  assertStrictEquals(SafeInt.toString(15), "15");
  assertStrictEquals(SafeInt.toString(16), "16");
});

Deno.test("Numerics.SafeInt.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(SafeInt.toString(-1, op), "-1");
  assertStrictEquals(SafeInt.toString(-0, op), "0");
  assertStrictEquals(SafeInt.toString(0, op), "0");
  assertStrictEquals(SafeInt.toString(1, op), "1");

  assertStrictEquals(SafeInt.toString(1111, op), "10001010111");

  assertStrictEquals(SafeInt.toString(2, op), "10");
  assertStrictEquals(SafeInt.toString(3, op), "11");
  assertStrictEquals(SafeInt.toString(4, op), "100");
  assertStrictEquals(SafeInt.toString(5, op), "101");
  assertStrictEquals(SafeInt.toString(6, op), "110");
  assertStrictEquals(SafeInt.toString(7, op), "111");
  assertStrictEquals(SafeInt.toString(8, op), "1000");
  assertStrictEquals(SafeInt.toString(9, op), "1001");
  assertStrictEquals(SafeInt.toString(10, op), "1010");
  assertStrictEquals(SafeInt.toString(11, op), "1011");
  assertStrictEquals(SafeInt.toString(12, op), "1100");
  assertStrictEquals(SafeInt.toString(13, op), "1101");
  assertStrictEquals(SafeInt.toString(14, op), "1110");
  assertStrictEquals(SafeInt.toString(15, op), "1111");
  assertStrictEquals(SafeInt.toString(16, op), "10000");
});

Deno.test("Numerics.SafeInt.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(SafeInt.toString(-1, op), "-1");
  assertStrictEquals(SafeInt.toString(-0, op), "0");
  assertStrictEquals(SafeInt.toString(0, op), "0");
  assertStrictEquals(SafeInt.toString(1, op), "1");

  assertStrictEquals(SafeInt.toString(1111, op), "2127");

  assertStrictEquals(SafeInt.toString(2, op), "2");
  assertStrictEquals(SafeInt.toString(3, op), "3");
  assertStrictEquals(SafeInt.toString(4, op), "4");
  assertStrictEquals(SafeInt.toString(5, op), "5");
  assertStrictEquals(SafeInt.toString(6, op), "6");
  assertStrictEquals(SafeInt.toString(7, op), "7");
  assertStrictEquals(SafeInt.toString(8, op), "10");
  assertStrictEquals(SafeInt.toString(9, op), "11");
  assertStrictEquals(SafeInt.toString(10, op), "12");
  assertStrictEquals(SafeInt.toString(11, op), "13");
  assertStrictEquals(SafeInt.toString(12, op), "14");
  assertStrictEquals(SafeInt.toString(13, op), "15");
  assertStrictEquals(SafeInt.toString(14, op), "16");
  assertStrictEquals(SafeInt.toString(15, op), "17");
  assertStrictEquals(SafeInt.toString(16, op), "20");
});

Deno.test("Numerics.SafeInt.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInt.toString(-1, op), "-1");
  assertStrictEquals(SafeInt.toString(-0, op), "0");
  assertStrictEquals(SafeInt.toString(0, op), "0");
  assertStrictEquals(SafeInt.toString(1, op), "1");

  assertStrictEquals(SafeInt.toString(1111, op), "1111");

  assertStrictEquals(SafeInt.toString(2, op), "2");
  assertStrictEquals(SafeInt.toString(3, op), "3");
  assertStrictEquals(SafeInt.toString(4, op), "4");
  assertStrictEquals(SafeInt.toString(5, op), "5");
  assertStrictEquals(SafeInt.toString(6, op), "6");
  assertStrictEquals(SafeInt.toString(7, op), "7");
  assertStrictEquals(SafeInt.toString(8, op), "8");
  assertStrictEquals(SafeInt.toString(9, op), "9");
  assertStrictEquals(SafeInt.toString(10, op), "10");
  assertStrictEquals(SafeInt.toString(11, op), "11");
  assertStrictEquals(SafeInt.toString(12, op), "12");
  assertStrictEquals(SafeInt.toString(13, op), "13");
  assertStrictEquals(SafeInt.toString(14, op), "14");
  assertStrictEquals(SafeInt.toString(15, op), "15");
  assertStrictEquals(SafeInt.toString(16, op), "16");
});

Deno.test("Numerics.SafeInt.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(SafeInt.toString(-1, op), "-1");
  assertStrictEquals(SafeInt.toString(-0, op), "0");
  assertStrictEquals(SafeInt.toString(0, op), "0");
  assertStrictEquals(SafeInt.toString(1, op), "1");

  assertStrictEquals(SafeInt.toString(1111, op), "457");

  assertStrictEquals(SafeInt.toString(2, op), "2");
  assertStrictEquals(SafeInt.toString(3, op), "3");
  assertStrictEquals(SafeInt.toString(4, op), "4");
  assertStrictEquals(SafeInt.toString(5, op), "5");
  assertStrictEquals(SafeInt.toString(6, op), "6");
  assertStrictEquals(SafeInt.toString(7, op), "7");
  assertStrictEquals(SafeInt.toString(8, op), "8");
  assertStrictEquals(SafeInt.toString(9, op), "9");
  assertStrictEquals(SafeInt.toString(10, op), "A");
  assertStrictEquals(SafeInt.toString(11, op), "B");
  assertStrictEquals(SafeInt.toString(12, op), "C");
  assertStrictEquals(SafeInt.toString(13, op), "D");
  assertStrictEquals(SafeInt.toString(14, op), "E");
  assertStrictEquals(SafeInt.toString(15, op), "F");
  assertStrictEquals(SafeInt.toString(16, op), "10");
});

Deno.test("Numerics.SafeInt.toString() - radix:unknown", () => {
  const op = { radix: 3 as 10 } as const;

  assertThrows(
    () => {
      SafeInt.toString(-1, op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(SafeInt.toString(-1, op), "-1");
  // assertStrictEquals(SafeInt.toString(-0, op), "0");
  // assertStrictEquals(SafeInt.toString(0, op), "0");
  // assertStrictEquals(SafeInt.toString(1, op), "1");

  // assertStrictEquals(SafeInt.toString(1111, op), "1111");

  // assertStrictEquals(SafeInt.toString(2, op), "2");
  // assertStrictEquals(SafeInt.toString(3, op), "3");
  // assertStrictEquals(SafeInt.toString(4, op), "4");
  // assertStrictEquals(SafeInt.toString(5, op), "5");
  // assertStrictEquals(SafeInt.toString(6, op), "6");
  // assertStrictEquals(SafeInt.toString(7, op), "7");
  // assertStrictEquals(SafeInt.toString(8, op), "8");
  // assertStrictEquals(SafeInt.toString(9, op), "9");
  // assertStrictEquals(SafeInt.toString(10, op), "10");
  // assertStrictEquals(SafeInt.toString(11, op), "11");
  // assertStrictEquals(SafeInt.toString(12, op), "12");
  // assertStrictEquals(SafeInt.toString(13, op), "13");
  // assertStrictEquals(SafeInt.toString(14, op), "14");
  // assertStrictEquals(SafeInt.toString(15, op), "15");
  // assertStrictEquals(SafeInt.toString(16, op), "16");
});

Deno.test("Numerics.SafeInt.fromBigInt()", () => {
  const rfe2 = "`value` must be a `bigint` in the safe integer range.";

  assertThrows(
    () => {
      SafeInt.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromBigInt(0 as unknown as bigint);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromBigInt(BigInt(MIN) - 1n);
    },
    TypeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInt.fromBigInt(BigInt(MAX) + 1n);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(SafeInt.fromBigInt(BigInt(MIN)), MIN);
  assertStrictEquals(SafeInt.fromBigInt(-1n), -1);
  assertStrictEquals(SafeInt.fromBigInt(-0n), 0);
  assertStrictEquals(SafeInt.fromBigInt(0n), 0);
  assertStrictEquals(SafeInt.fromBigInt(1n), 1);
  assertStrictEquals(SafeInt.fromBigInt(BigInt(MAX)), MAX);
});

Deno.test("Numerics.SafeInt.toBigInt()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeInt.toBigInt(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.toBigInt(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.toBigInt("0" as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.toBigInt(1.5);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInt.toBigInt(MIN), BigInt(MIN));
  assertStrictEquals(SafeInt.toBigInt(-1), -1n);
  assertStrictEquals(SafeInt.toBigInt(-0), 0n);
  assertStrictEquals(SafeInt.toBigInt(0), 0n);
  assertStrictEquals(SafeInt.toBigInt(1), 1n);
  assertStrictEquals(SafeInt.toBigInt(MAX), BigInt(MAX));
});
