import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { SafeInteger } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeInteger.clampToPositive()", () => {
  assertStrictEquals(SafeInteger.clampToPositive(MIN), 1);
  assertStrictEquals(SafeInteger.clampToPositive(-2), 1);
  assertStrictEquals(SafeInteger.clampToPositive(-1), 1);
  assertStrictEquals(SafeInteger.clampToPositive(-0), 1);
  assertStrictEquals(SafeInteger.clampToPositive(0), 1);
  assertStrictEquals(SafeInteger.clampToPositive(1), 1);
  assertStrictEquals(SafeInteger.clampToPositive(2), 2);
  assertStrictEquals(SafeInteger.clampToPositive(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.clampToNonNegative()", () => {
  assertStrictEquals(SafeInteger.clampToNonNegative(MIN), 0);
  assertStrictEquals(SafeInteger.clampToNonNegative(-2), 0);
  assertStrictEquals(SafeInteger.clampToNonNegative(-1), 0);
  assertStrictEquals(
    Object.is(SafeInteger.clampToNonNegative(-0), 0),
    true,
  );
  assertStrictEquals(SafeInteger.clampToNonNegative(0), 0);
  assertStrictEquals(SafeInteger.clampToNonNegative(1), 1);
  assertStrictEquals(SafeInteger.clampToNonNegative(2), 2);
  assertStrictEquals(SafeInteger.clampToNonNegative(MAX), MAX);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToNonNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.clampToNonPositive()", () => {
  assertStrictEquals(SafeInteger.clampToNonPositive(MIN), MIN);
  assertStrictEquals(SafeInteger.clampToNonPositive(-2), -2);
  assertStrictEquals(SafeInteger.clampToNonPositive(-1), -1);
  assertStrictEquals(
    Object.is(SafeInteger.clampToNonPositive(-0), 0),
    true,
  );
  assertStrictEquals(SafeInteger.clampToNonPositive(0), 0);
  assertStrictEquals(SafeInteger.clampToNonPositive(1), 0);
  assertStrictEquals(SafeInteger.clampToNonPositive(2), 0);
  assertStrictEquals(SafeInteger.clampToNonPositive(MAX), 0);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToNonPositive(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("SafeInteger.clampToNegative()", () => {
  assertStrictEquals(SafeInteger.clampToNegative(MIN), MIN);
  assertStrictEquals(SafeInteger.clampToNegative(-2), -2);
  assertStrictEquals(SafeInteger.clampToNegative(-1), -1);
  assertStrictEquals(SafeInteger.clampToNegative(-0), -1);
  assertStrictEquals(SafeInteger.clampToNegative(0), -1);
  assertStrictEquals(SafeInteger.clampToNegative(1), -1);
  assertStrictEquals(SafeInteger.clampToNegative(2), -1);
  assertStrictEquals(SafeInteger.clampToNegative(MAX), -1);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      SafeInteger.clampToNegative(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
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

Deno.test("SafeInteger.toString()", () => {
  const rfe1 = "`value` must be a safe integer.";

  assertThrows(
    () => {
      SafeInteger.toString(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toString(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.toString(-1), "-1");
  assertStrictEquals(SafeInteger.toString(-0), "0");
  assertStrictEquals(SafeInteger.toString(0), "0");
  assertStrictEquals(SafeInteger.toString(1), "1");

  assertStrictEquals(SafeInteger.toString(1111), "1111");

  assertStrictEquals(SafeInteger.toString(2), "2");
  assertStrictEquals(SafeInteger.toString(3), "3");
  assertStrictEquals(SafeInteger.toString(4), "4");
  assertStrictEquals(SafeInteger.toString(5), "5");
  assertStrictEquals(SafeInteger.toString(6), "6");
  assertStrictEquals(SafeInteger.toString(7), "7");
  assertStrictEquals(SafeInteger.toString(8), "8");
  assertStrictEquals(SafeInteger.toString(9), "9");
  assertStrictEquals(SafeInteger.toString(10), "10");
  assertStrictEquals(SafeInteger.toString(11), "11");
  assertStrictEquals(SafeInteger.toString(12), "12");
  assertStrictEquals(SafeInteger.toString(13), "13");
  assertStrictEquals(SafeInteger.toString(14), "14");
  assertStrictEquals(SafeInteger.toString(15), "15");
  assertStrictEquals(SafeInteger.toString(16), "16");
});

Deno.test("SafeInteger.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "10001010111");

  assertStrictEquals(SafeInteger.toString(2, op), "10");
  assertStrictEquals(SafeInteger.toString(3, op), "11");
  assertStrictEquals(SafeInteger.toString(4, op), "100");
  assertStrictEquals(SafeInteger.toString(5, op), "101");
  assertStrictEquals(SafeInteger.toString(6, op), "110");
  assertStrictEquals(SafeInteger.toString(7, op), "111");
  assertStrictEquals(SafeInteger.toString(8, op), "1000");
  assertStrictEquals(SafeInteger.toString(9, op), "1001");
  assertStrictEquals(SafeInteger.toString(10, op), "1010");
  assertStrictEquals(SafeInteger.toString(11, op), "1011");
  assertStrictEquals(SafeInteger.toString(12, op), "1100");
  assertStrictEquals(SafeInteger.toString(13, op), "1101");
  assertStrictEquals(SafeInteger.toString(14, op), "1110");
  assertStrictEquals(SafeInteger.toString(15, op), "1111");
  assertStrictEquals(SafeInteger.toString(16, op), "10000");
});

Deno.test("SafeInteger.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "2127");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "10");
  assertStrictEquals(SafeInteger.toString(9, op), "11");
  assertStrictEquals(SafeInteger.toString(10, op), "12");
  assertStrictEquals(SafeInteger.toString(11, op), "13");
  assertStrictEquals(SafeInteger.toString(12, op), "14");
  assertStrictEquals(SafeInteger.toString(13, op), "15");
  assertStrictEquals(SafeInteger.toString(14, op), "16");
  assertStrictEquals(SafeInteger.toString(15, op), "17");
  assertStrictEquals(SafeInteger.toString(16, op), "20");
});

Deno.test("SafeInteger.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "1111");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "10");
  assertStrictEquals(SafeInteger.toString(11, op), "11");
  assertStrictEquals(SafeInteger.toString(12, op), "12");
  assertStrictEquals(SafeInteger.toString(13, op), "13");
  assertStrictEquals(SafeInteger.toString(14, op), "14");
  assertStrictEquals(SafeInteger.toString(15, op), "15");
  assertStrictEquals(SafeInteger.toString(16, op), "16");
});

Deno.test("SafeInteger.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "457");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "A");
  assertStrictEquals(SafeInteger.toString(11, op), "B");
  assertStrictEquals(SafeInteger.toString(12, op), "C");
  assertStrictEquals(SafeInteger.toString(13, op), "D");
  assertStrictEquals(SafeInteger.toString(14, op), "E");
  assertStrictEquals(SafeInteger.toString(15, op), "F");
  assertStrictEquals(SafeInteger.toString(16, op), "10");
});

Deno.test("SafeInteger.toString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 10 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "1111");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "10");
  assertStrictEquals(SafeInteger.toString(11, op), "11");
  assertStrictEquals(SafeInteger.toString(12, op), "12");
  assertStrictEquals(SafeInteger.toString(13, op), "13");
  assertStrictEquals(SafeInteger.toString(14, op), "14");
  assertStrictEquals(SafeInteger.toString(15, op), "15");
  assertStrictEquals(SafeInteger.toString(16, op), "16");
});
