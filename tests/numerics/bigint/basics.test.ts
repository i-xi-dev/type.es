import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { BigInt: ExBigInt } = Numerics;

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.BigInt.min()", () => {
  assertStrictEquals(ExBigInt.min(0n), 0n);
  assertStrictEquals(ExBigInt.min(1n), 1n);
  assertStrictEquals(ExBigInt.min(-1n), -1n);

  assertStrictEquals(ExBigInt.min(0n, 1n), 0n);
  assertStrictEquals(ExBigInt.min(0n, -1n), -1n);

  assertStrictEquals(ExBigInt.min(2n, 0n, 1n), 0n);
  assertStrictEquals(ExBigInt.min(2n, 0n, -1n), -1n);
  assertStrictEquals(ExBigInt.min(0n, 1n, 2n), 0n);
  assertStrictEquals(ExBigInt.min(0n, -1n, 2n), -1n);
  assertStrictEquals(ExBigInt.min(1n, 2n, 0n), 0n);
  assertStrictEquals(ExBigInt.min(-1n, 2n, 0n), -1n);

  assertStrictEquals(ExBigInt.min(-2n, 0n, 1n), -2n);
  assertStrictEquals(ExBigInt.min(-2n, 0n, -1n), -2n);
  assertStrictEquals(ExBigInt.min(0n, 1n, -2n), -2n);
  assertStrictEquals(ExBigInt.min(0n, -1n, -2n), -2n);
  assertStrictEquals(ExBigInt.min(1n, -2n, 0n), -2n);
  assertStrictEquals(ExBigInt.min(-1n, -2n, 0n), -2n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      ExBigInt.min(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      ExBigInt.min(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("Numerics.BigInt.max()", () => {
  assertStrictEquals(ExBigInt.max(0n), 0n);
  assertStrictEquals(ExBigInt.max(1n), 1n);
  assertStrictEquals(ExBigInt.max(-1n), -1n);

  assertStrictEquals(ExBigInt.max(0n, 1n), 1n);
  assertStrictEquals(ExBigInt.max(0n, -1n), 0n);

  assertStrictEquals(ExBigInt.max(2n, 0n, 1n), 2n);
  assertStrictEquals(ExBigInt.max(2n, 0n, -1n), 2n);
  assertStrictEquals(ExBigInt.max(0n, 1n, 2n), 2n);
  assertStrictEquals(ExBigInt.max(0n, -1n, 2n), 2n);
  assertStrictEquals(ExBigInt.max(1n, 2n, 0n), 2n);
  assertStrictEquals(ExBigInt.max(-1n, 2n, 0n), 2n);

  assertStrictEquals(ExBigInt.max(-2n, 0n, 1n), 1n);
  assertStrictEquals(ExBigInt.max(-2n, 0n, -1n), 0n);
  assertStrictEquals(ExBigInt.max(0n, 1n, -2n), 1n);
  assertStrictEquals(ExBigInt.max(0n, -1n, -2n), 0n);
  assertStrictEquals(ExBigInt.max(1n, -2n, 0n), 1n);
  assertStrictEquals(ExBigInt.max(-1n, -2n, 0n), 0n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      ExBigInt.max(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      ExBigInt.max(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("Numerics.BigInt.clampToRange()", () => {
  const ex1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      ExBigInt.clampToRange(undefined as unknown as bigint, [0n, 0n]);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      ExBigInt.clampToRange(0n, [undefined as unknown as bigint, 0n]);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`range` must be a range of `bigint`.";
  assertThrows(
    () => {
      ExBigInt.clampToRange(0n, [0n, undefined as unknown as bigint]);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(ExBigInt.clampToRange(0n, [0n, 0n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(0n, [0n, 1n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(0n, [-1n, 0n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(0n, [1n, 1n]), 1n);
  assertStrictEquals(ExBigInt.clampToRange(0n, [-1n, -1n]), -1n);

  assertThrows(
    () => {
      ExBigInt.clampToRange(0n, [1n, 0n]); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.clampToRange(0n, [0n, -1n]); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExBigInt.clampToRange(1n, [0n, 0n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(1n, [0n, 1n]), 1n);
  assertStrictEquals(ExBigInt.clampToRange(1n, [-1n, 0n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(1n, [1n, 1n]), 1n);
  assertStrictEquals(ExBigInt.clampToRange(1n, [-1n, -1n]), -1n);

  assertThrows(
    () => {
      ExBigInt.clampToRange(1n, [1n, 0n]); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.clampToRange(1n, [0n, -1n]); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExBigInt.clampToRange(-1n, [0n, 0n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(-1n, [0n, 1n]), 0n);
  assertStrictEquals(ExBigInt.clampToRange(-1n, [-1n, 0n]), -1n);
  assertStrictEquals(ExBigInt.clampToRange(-1n, [1n, 1n]), 1n);
  assertStrictEquals(ExBigInt.clampToRange(-1n, [-1n, -1n]), -1n);

  assertThrows(
    () => {
      ExBigInt.clampToRange(-1n, [1n, 0n]); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.clampToRange(-1n, [0n, -1n]); // 負のrange
    },
    RangeError,
    e1,
  );
});

Deno.test("Numerics.BigInt.fromString()", () => {
  assertStrictEquals(ExBigInt.fromString("0"), 0n);
  assertStrictEquals(ExBigInt.fromString("-0"), 0n);
  assertStrictEquals(ExBigInt.fromString("+0"), 0n);
  assertStrictEquals(ExBigInt.fromString("1"), 1n);
  assertStrictEquals(ExBigInt.fromString("-1"), -1n);
  assertStrictEquals(ExBigInt.fromString("+1"), 1n);
  assertStrictEquals(ExBigInt.fromString("2"), 2n);
  assertStrictEquals(ExBigInt.fromString("-2"), -2n);
  assertStrictEquals(ExBigInt.fromString("3"), 3n);
  assertStrictEquals(ExBigInt.fromString("-3"), -3n);
  assertStrictEquals(ExBigInt.fromString("4"), 4n);
  assertStrictEquals(ExBigInt.fromString("-4"), -4n);
  assertStrictEquals(ExBigInt.fromString("5"), 5n);
  assertStrictEquals(ExBigInt.fromString("-5"), -5n);
  assertStrictEquals(ExBigInt.fromString("6"), 6n);
  assertStrictEquals(ExBigInt.fromString("-6"), -6n);
  assertStrictEquals(ExBigInt.fromString("7"), 7n);
  assertStrictEquals(ExBigInt.fromString("-7"), -7n);
  assertStrictEquals(ExBigInt.fromString("8"), 8n);
  assertStrictEquals(ExBigInt.fromString("-8"), -8n);
  assertStrictEquals(ExBigInt.fromString("9"), 9n);
  assertStrictEquals(ExBigInt.fromString("-9"), -9n);
  assertStrictEquals(ExBigInt.fromString("10"), 10n);
  assertStrictEquals(ExBigInt.fromString("-10"), -10n);

  assertStrictEquals(ExBigInt.fromString("+111"), 111n);

  const e1 = "`value` must be text representation of 10 based integer.";
  assertThrows(
    () => {
      ExBigInt.fromString(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("" as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("A" as unknown as string);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigInt.fromString() - 2", () => {
  const op2 = { radix: 2 } as const;

  assertStrictEquals(ExBigInt.fromString("0", op2), 0n);
  assertStrictEquals(ExBigInt.fromString("-0", op2), 0n);
  assertStrictEquals(ExBigInt.fromString("+0", op2), 0n);
  assertStrictEquals(ExBigInt.fromString("1", op2), 1n);
  assertStrictEquals(ExBigInt.fromString("-1", op2), -1n);
  assertStrictEquals(ExBigInt.fromString("+1", op2), 1n);
  assertStrictEquals(ExBigInt.fromString("10", op2), 2n);
  assertStrictEquals(ExBigInt.fromString("-10", op2), -2n);

  assertStrictEquals(ExBigInt.fromString("+111", op2), 7n);

  const e1 = "`value` must be text representation of 2 based integer.";
  assertThrows(
    () => {
      ExBigInt.fromString(undefined as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("2" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigInt.fromString() - 8", () => {
  const op8 = { radix: 8 } as const;

  assertStrictEquals(ExBigInt.fromString("0", op8), 0n);
  assertStrictEquals(ExBigInt.fromString("-0", op8), 0n);
  assertStrictEquals(ExBigInt.fromString("+0", op8), 0n);
  assertStrictEquals(ExBigInt.fromString("1", op8), 1n);
  assertStrictEquals(ExBigInt.fromString("-1", op8), -1n);
  assertStrictEquals(ExBigInt.fromString("+1", op8), 1n);
  assertStrictEquals(ExBigInt.fromString("2", op8), 2n);
  assertStrictEquals(ExBigInt.fromString("-2", op8), -2n);
  assertStrictEquals(ExBigInt.fromString("3", op8), 3n);
  assertStrictEquals(ExBigInt.fromString("-3", op8), -3n);
  assertStrictEquals(ExBigInt.fromString("4", op8), 4n);
  assertStrictEquals(ExBigInt.fromString("-4", op8), -4n);
  assertStrictEquals(ExBigInt.fromString("5", op8), 5n);
  assertStrictEquals(ExBigInt.fromString("-5", op8), -5n);
  assertStrictEquals(ExBigInt.fromString("6", op8), 6n);
  assertStrictEquals(ExBigInt.fromString("-6", op8), -6n);
  assertStrictEquals(ExBigInt.fromString("7", op8), 7n);
  assertStrictEquals(ExBigInt.fromString("-7", op8), -7n);
  assertStrictEquals(ExBigInt.fromString("10", op8), 8n);
  assertStrictEquals(ExBigInt.fromString("-10", op8), -8n);

  assertStrictEquals(ExBigInt.fromString("+111", op8), 73n);

  const e1 = "`value` must be text representation of 8 based integer.";
  assertThrows(
    () => {
      ExBigInt.fromString(undefined as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("8" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigInt.fromString() - 10", () => {
  const op10 = { radix: 10 } as const;

  assertStrictEquals(ExBigInt.fromString("0", op10), 0n);
  assertStrictEquals(ExBigInt.fromString("-0", op10), 0n);
  assertStrictEquals(ExBigInt.fromString("+0", op10), 0n);
  assertStrictEquals(ExBigInt.fromString("1", op10), 1n);
  assertStrictEquals(ExBigInt.fromString("-1", op10), -1n);
  assertStrictEquals(ExBigInt.fromString("+1", op10), 1n);
  assertStrictEquals(ExBigInt.fromString("2", op10), 2n);
  assertStrictEquals(ExBigInt.fromString("-2", op10), -2n);
  assertStrictEquals(ExBigInt.fromString("3", op10), 3n);
  assertStrictEquals(ExBigInt.fromString("-3", op10), -3n);
  assertStrictEquals(ExBigInt.fromString("4", op10), 4n);
  assertStrictEquals(ExBigInt.fromString("-4", op10), -4n);
  assertStrictEquals(ExBigInt.fromString("5", op10), 5n);
  assertStrictEquals(ExBigInt.fromString("-5", op10), -5n);
  assertStrictEquals(ExBigInt.fromString("6", op10), 6n);
  assertStrictEquals(ExBigInt.fromString("-6", op10), -6n);
  assertStrictEquals(ExBigInt.fromString("7", op10), 7n);
  assertStrictEquals(ExBigInt.fromString("-7", op10), -7n);
  assertStrictEquals(ExBigInt.fromString("8", op10), 8n);
  assertStrictEquals(ExBigInt.fromString("-8", op10), -8n);
  assertStrictEquals(ExBigInt.fromString("9", op10), 9n);
  assertStrictEquals(ExBigInt.fromString("-9", op10), -9n);
  assertStrictEquals(ExBigInt.fromString("10", op10), 10n);
  assertStrictEquals(ExBigInt.fromString("-10", op10), -10n);

  assertStrictEquals(ExBigInt.fromString("+111", op10), 111n);

  const e1 = "`value` must be text representation of 10 based integer.";
  assertThrows(
    () => {
      ExBigInt.fromString(undefined as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("A" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigInt.fromString() - 16", () => {
  const op16 = { radix: 16 } as const;

  assertStrictEquals(ExBigInt.fromString("0", op16), 0n);
  assertStrictEquals(ExBigInt.fromString("-0", op16), 0n);
  assertStrictEquals(ExBigInt.fromString("+0", op16), 0n);
  assertStrictEquals(ExBigInt.fromString("1", op16), 1n);
  assertStrictEquals(ExBigInt.fromString("-1", op16), -1n);
  assertStrictEquals(ExBigInt.fromString("+1", op16), 1n);
  assertStrictEquals(ExBigInt.fromString("2", op16), 2n);
  assertStrictEquals(ExBigInt.fromString("-2", op16), -2n);
  assertStrictEquals(ExBigInt.fromString("3", op16), 3n);
  assertStrictEquals(ExBigInt.fromString("-3", op16), -3n);
  assertStrictEquals(ExBigInt.fromString("4", op16), 4n);
  assertStrictEquals(ExBigInt.fromString("-4", op16), -4n);
  assertStrictEquals(ExBigInt.fromString("5", op16), 5n);
  assertStrictEquals(ExBigInt.fromString("-5", op16), -5n);
  assertStrictEquals(ExBigInt.fromString("6", op16), 6n);
  assertStrictEquals(ExBigInt.fromString("-6", op16), -6n);
  assertStrictEquals(ExBigInt.fromString("7", op16), 7n);
  assertStrictEquals(ExBigInt.fromString("-7", op16), -7n);
  assertStrictEquals(ExBigInt.fromString("8", op16), 8n);
  assertStrictEquals(ExBigInt.fromString("-8", op16), -8n);
  assertStrictEquals(ExBigInt.fromString("9", op16), 9n);
  assertStrictEquals(ExBigInt.fromString("-9", op16), -9n);
  assertStrictEquals(ExBigInt.fromString("A", op16), 10n);
  assertStrictEquals(ExBigInt.fromString("-a", op16), -10n);
  assertStrictEquals(ExBigInt.fromString("b", op16), 11n);
  assertStrictEquals(ExBigInt.fromString("-B", op16), -11n);
  assertStrictEquals(ExBigInt.fromString("C", op16), 12n);
  assertStrictEquals(ExBigInt.fromString("-c", op16), -12n);
  assertStrictEquals(ExBigInt.fromString("d", op16), 13n);
  assertStrictEquals(ExBigInt.fromString("-D", op16), -13n);
  assertStrictEquals(ExBigInt.fromString("E", op16), 14n);
  assertStrictEquals(ExBigInt.fromString("-e", op16), -14n);
  assertStrictEquals(ExBigInt.fromString("f", op16), 15n);
  assertStrictEquals(ExBigInt.fromString("-F", op16), -15n);
  assertStrictEquals(ExBigInt.fromString("10", op16), 16n);
  assertStrictEquals(ExBigInt.fromString("-10", op16), -16n);

  assertStrictEquals(ExBigInt.fromString("+111", op16), 273n);

  const e1 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      ExBigInt.fromString(undefined as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExBigInt.fromString("G" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigInt.fromString() - x", () => {
  const opx = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      ExBigInt.fromString("G" as unknown as string, opx);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
});

Deno.test("Numerics.BigInt.toString()", () => {
  const rfe1 = "`value` must be a `bigint`.";

  assertThrows(
    () => {
      ExBigInt.toString(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExBigInt.toString(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(ExBigInt.toString(-1n), "-1");
  assertStrictEquals(ExBigInt.toString(-0n), "0");
  assertStrictEquals(ExBigInt.toString(0n), "0");
  assertStrictEquals(ExBigInt.toString(1n), "1");

  assertStrictEquals(ExBigInt.toString(1111n), "1111");

  assertStrictEquals(ExBigInt.toString(2n), "2");
  assertStrictEquals(ExBigInt.toString(3n), "3");
  assertStrictEquals(ExBigInt.toString(4n), "4");
  assertStrictEquals(ExBigInt.toString(5n), "5");
  assertStrictEquals(ExBigInt.toString(6n), "6");
  assertStrictEquals(ExBigInt.toString(7n), "7");
  assertStrictEquals(ExBigInt.toString(8n), "8");
  assertStrictEquals(ExBigInt.toString(9n), "9");
  assertStrictEquals(ExBigInt.toString(10n), "10");
  assertStrictEquals(ExBigInt.toString(11n), "11");
  assertStrictEquals(ExBigInt.toString(12n), "12");
  assertStrictEquals(ExBigInt.toString(13n), "13");
  assertStrictEquals(ExBigInt.toString(14n), "14");
  assertStrictEquals(ExBigInt.toString(15n), "15");
  assertStrictEquals(ExBigInt.toString(16n), "16");
});

Deno.test("Numerics.BigInt.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(ExBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExBigInt.toString(0n, op), "0");
  assertStrictEquals(ExBigInt.toString(1n, op), "1");

  assertStrictEquals(ExBigInt.toString(1111n, op), "10001010111");

  assertStrictEquals(ExBigInt.toString(2n, op), "10");
  assertStrictEquals(ExBigInt.toString(3n, op), "11");
  assertStrictEquals(ExBigInt.toString(4n, op), "100");
  assertStrictEquals(ExBigInt.toString(5n, op), "101");
  assertStrictEquals(ExBigInt.toString(6n, op), "110");
  assertStrictEquals(ExBigInt.toString(7n, op), "111");
  assertStrictEquals(ExBigInt.toString(8n, op), "1000");
  assertStrictEquals(ExBigInt.toString(9n, op), "1001");
  assertStrictEquals(ExBigInt.toString(10n, op), "1010");
  assertStrictEquals(ExBigInt.toString(11n, op), "1011");
  assertStrictEquals(ExBigInt.toString(12n, op), "1100");
  assertStrictEquals(ExBigInt.toString(13n, op), "1101");
  assertStrictEquals(ExBigInt.toString(14n, op), "1110");
  assertStrictEquals(ExBigInt.toString(15n, op), "1111");
  assertStrictEquals(ExBigInt.toString(16n, op), "10000");
});

Deno.test("Numerics.BigInt.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(ExBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExBigInt.toString(0n, op), "0");
  assertStrictEquals(ExBigInt.toString(1n, op), "1");

  assertStrictEquals(ExBigInt.toString(1111n, op), "2127");

  assertStrictEquals(ExBigInt.toString(2n, op), "2");
  assertStrictEquals(ExBigInt.toString(3n, op), "3");
  assertStrictEquals(ExBigInt.toString(4n, op), "4");
  assertStrictEquals(ExBigInt.toString(5n, op), "5");
  assertStrictEquals(ExBigInt.toString(6n, op), "6");
  assertStrictEquals(ExBigInt.toString(7n, op), "7");
  assertStrictEquals(ExBigInt.toString(8n, op), "10");
  assertStrictEquals(ExBigInt.toString(9n, op), "11");
  assertStrictEquals(ExBigInt.toString(10n, op), "12");
  assertStrictEquals(ExBigInt.toString(11n, op), "13");
  assertStrictEquals(ExBigInt.toString(12n, op), "14");
  assertStrictEquals(ExBigInt.toString(13n, op), "15");
  assertStrictEquals(ExBigInt.toString(14n, op), "16");
  assertStrictEquals(ExBigInt.toString(15n, op), "17");
  assertStrictEquals(ExBigInt.toString(16n, op), "20");
});

Deno.test("Numerics.BigInt.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(ExBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExBigInt.toString(0n, op), "0");
  assertStrictEquals(ExBigInt.toString(1n, op), "1");

  assertStrictEquals(ExBigInt.toString(1111n, op), "1111");

  assertStrictEquals(ExBigInt.toString(2n, op), "2");
  assertStrictEquals(ExBigInt.toString(3n, op), "3");
  assertStrictEquals(ExBigInt.toString(4n, op), "4");
  assertStrictEquals(ExBigInt.toString(5n, op), "5");
  assertStrictEquals(ExBigInt.toString(6n, op), "6");
  assertStrictEquals(ExBigInt.toString(7n, op), "7");
  assertStrictEquals(ExBigInt.toString(8n, op), "8");
  assertStrictEquals(ExBigInt.toString(9n, op), "9");
  assertStrictEquals(ExBigInt.toString(10n, op), "10");
  assertStrictEquals(ExBigInt.toString(11n, op), "11");
  assertStrictEquals(ExBigInt.toString(12n, op), "12");
  assertStrictEquals(ExBigInt.toString(13n, op), "13");
  assertStrictEquals(ExBigInt.toString(14n, op), "14");
  assertStrictEquals(ExBigInt.toString(15n, op), "15");
  assertStrictEquals(ExBigInt.toString(16n, op), "16");
});

Deno.test("Numerics.BigInt.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(ExBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExBigInt.toString(0n, op), "0");
  assertStrictEquals(ExBigInt.toString(1n, op), "1");

  assertStrictEquals(ExBigInt.toString(1111n, op), "457");

  assertStrictEquals(ExBigInt.toString(2n, op), "2");
  assertStrictEquals(ExBigInt.toString(3n, op), "3");
  assertStrictEquals(ExBigInt.toString(4n, op), "4");
  assertStrictEquals(ExBigInt.toString(5n, op), "5");
  assertStrictEquals(ExBigInt.toString(6n, op), "6");
  assertStrictEquals(ExBigInt.toString(7n, op), "7");
  assertStrictEquals(ExBigInt.toString(8n, op), "8");
  assertStrictEquals(ExBigInt.toString(9n, op), "9");
  assertStrictEquals(ExBigInt.toString(10n, op), "A");
  assertStrictEquals(ExBigInt.toString(11n, op), "B");
  assertStrictEquals(ExBigInt.toString(12n, op), "C");
  assertStrictEquals(ExBigInt.toString(13n, op), "D");
  assertStrictEquals(ExBigInt.toString(14n, op), "E");
  assertStrictEquals(ExBigInt.toString(15n, op), "F");
  assertStrictEquals(ExBigInt.toString(16n, op), "10");
});

Deno.test("Numerics.BigInt.toString() - radix:unknown", () => {
  const op = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      ExBigInt.toString(-1n, op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(ExBigInt.toString(-1n, op), "-1");
  // assertStrictEquals(ExBigInt.toString(-0n, op), "0");
  // assertStrictEquals(ExBigInt.toString(0n, op), "0");
  // assertStrictEquals(ExBigInt.toString(1n, op), "1");

  // assertStrictEquals(ExBigInt.toString(1111n, op), "1111");

  // assertStrictEquals(ExBigInt.toString(2n, op), "2");
  // assertStrictEquals(ExBigInt.toString(3n, op), "3");
  // assertStrictEquals(ExBigInt.toString(4n, op), "4");
  // assertStrictEquals(ExBigInt.toString(5n, op), "5");
  // assertStrictEquals(ExBigInt.toString(6n, op), "6");
  // assertStrictEquals(ExBigInt.toString(7n, op), "7");
  // assertStrictEquals(ExBigInt.toString(8n, op), "8");
  // assertStrictEquals(ExBigInt.toString(9n, op), "9");
  // assertStrictEquals(ExBigInt.toString(10n, op), "10");
  // assertStrictEquals(ExBigInt.toString(11n, op), "11");
  // assertStrictEquals(ExBigInt.toString(12n, op), "12");
  // assertStrictEquals(ExBigInt.toString(13n, op), "13");
  // assertStrictEquals(ExBigInt.toString(14n, op), "14");
  // assertStrictEquals(ExBigInt.toString(15n, op), "15");
  // assertStrictEquals(ExBigInt.toString(16n, op), "16");
});

Deno.test("Numerics.BigInt.fromNumber()", () => {
  const rfe1 = "`value` must be a finite `number`.";

  assertThrows(
    () => {
      ExBigInt.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExBigInt.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExBigInt.fromNumber(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExBigInt.fromNumber(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExBigInt.fromNumber(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  // assertThrows(
  //   () => {
  //     ExBigInt.fromNumber(Number.POSITIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  // assertThrows(
  //   () => {
  //     ExBigInt.fromNumber(Number.NEGATIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  assertStrictEquals(ExBigInt.fromNumber(0.5), 0n);

  assertStrictEquals(ExBigInt.fromNumber(-1), -1n);
  assertStrictEquals(ExBigInt.fromNumber(-0), 0n);
  assertStrictEquals(ExBigInt.fromNumber(0), 0n);
  assertStrictEquals(ExBigInt.fromNumber(1), 1n);

  assertStrictEquals(ExBigInt.fromNumber(SIMAX), BigInt(SIMAX));
  assertStrictEquals(ExBigInt.fromNumber(SIMIN), BigInt(SIMIN));
});

Deno.test("Numerics.BigInt.toNumber()", () => {
  assertStrictEquals(ExBigInt.toNumber(0n), 0);
  assertStrictEquals(ExBigInt.toNumber(-1n), -1);
  assertStrictEquals(ExBigInt.toNumber(1n), 1);
  assertStrictEquals(ExBigInt.toNumber(BigInt(SIMIN)), SIMIN);
  assertStrictEquals(ExBigInt.toNumber(BigInt(SIMAX)), SIMAX);

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      ExBigInt.toNumber(BigInt(SIMIN) - 1n);
    },
    TypeError,
    e1,
  );
});
