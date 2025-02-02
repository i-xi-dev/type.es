import { assertStrictEquals, assertThrows } from "@std/assert";
import { ExtBigInt } from "../../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("ExtBigInt.min()", () => {
  assertStrictEquals(ExtBigInt.min(0n), 0n);
  assertStrictEquals(ExtBigInt.min(1n), 1n);
  assertStrictEquals(ExtBigInt.min(-1n), -1n);

  assertStrictEquals(ExtBigInt.min(0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.min(0n, -1n), -1n);

  assertStrictEquals(ExtBigInt.min(2n, 0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.min(2n, 0n, -1n), -1n);
  assertStrictEquals(ExtBigInt.min(0n, 1n, 2n), 0n);
  assertStrictEquals(ExtBigInt.min(0n, -1n, 2n), -1n);
  assertStrictEquals(ExtBigInt.min(1n, 2n, 0n), 0n);
  assertStrictEquals(ExtBigInt.min(-1n, 2n, 0n), -1n);

  assertStrictEquals(ExtBigInt.min(-2n, 0n, 1n), -2n);
  assertStrictEquals(ExtBigInt.min(-2n, 0n, -1n), -2n);
  assertStrictEquals(ExtBigInt.min(0n, 1n, -2n), -2n);
  assertStrictEquals(ExtBigInt.min(0n, -1n, -2n), -2n);
  assertStrictEquals(ExtBigInt.min(1n, -2n, 0n), -2n);
  assertStrictEquals(ExtBigInt.min(-1n, -2n, 0n), -2n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.min(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.min(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("ExtBigInt.max()", () => {
  assertStrictEquals(ExtBigInt.max(0n), 0n);
  assertStrictEquals(ExtBigInt.max(1n), 1n);
  assertStrictEquals(ExtBigInt.max(-1n), -1n);

  assertStrictEquals(ExtBigInt.max(0n, 1n), 1n);
  assertStrictEquals(ExtBigInt.max(0n, -1n), 0n);

  assertStrictEquals(ExtBigInt.max(2n, 0n, 1n), 2n);
  assertStrictEquals(ExtBigInt.max(2n, 0n, -1n), 2n);
  assertStrictEquals(ExtBigInt.max(0n, 1n, 2n), 2n);
  assertStrictEquals(ExtBigInt.max(0n, -1n, 2n), 2n);
  assertStrictEquals(ExtBigInt.max(1n, 2n, 0n), 2n);
  assertStrictEquals(ExtBigInt.max(-1n, 2n, 0n), 2n);

  assertStrictEquals(ExtBigInt.max(-2n, 0n, 1n), 1n);
  assertStrictEquals(ExtBigInt.max(-2n, 0n, -1n), 0n);
  assertStrictEquals(ExtBigInt.max(0n, 1n, -2n), 1n);
  assertStrictEquals(ExtBigInt.max(0n, -1n, -2n), 0n);
  assertStrictEquals(ExtBigInt.max(1n, -2n, 0n), 1n);
  assertStrictEquals(ExtBigInt.max(-1n, -2n, 0n), 0n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.max(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.max(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("ExtBigInt.clamp()", () => {
  const ex1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.clamp(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.clamp(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.clamp(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(ExtBigInt.clamp(0n, 0n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(0n, 0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.clamp(0n, -1n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(0n, 1n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      ExtBigInt.clamp(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.clamp(0n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExtBigInt.clamp(1n, 0n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(1n, 0n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(1n, -1n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(1n, 1n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      ExtBigInt.clamp(1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.clamp(1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExtBigInt.clamp(-1n, 0n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(-1n, 0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.clamp(-1n, -1n, 0n), -1n);
  assertStrictEquals(ExtBigInt.clamp(-1n, 1n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(-1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      ExtBigInt.clamp(-1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.clamp(-1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );
});

Deno.test("ExtBigInt.fromString()", () => {
  assertStrictEquals(ExtBigInt.fromString("0"), 0n);
  assertStrictEquals(ExtBigInt.fromString("-0"), 0n);
  assertStrictEquals(ExtBigInt.fromString("+0"), 0n);
  assertStrictEquals(ExtBigInt.fromString("1"), 1n);
  assertStrictEquals(ExtBigInt.fromString("-1"), -1n);
  assertStrictEquals(ExtBigInt.fromString("+1"), 1n);
  assertStrictEquals(ExtBigInt.fromString("2"), 2n);
  assertStrictEquals(ExtBigInt.fromString("-2"), -2n);
  assertStrictEquals(ExtBigInt.fromString("3"), 3n);
  assertStrictEquals(ExtBigInt.fromString("-3"), -3n);
  assertStrictEquals(ExtBigInt.fromString("4"), 4n);
  assertStrictEquals(ExtBigInt.fromString("-4"), -4n);
  assertStrictEquals(ExtBigInt.fromString("5"), 5n);
  assertStrictEquals(ExtBigInt.fromString("-5"), -5n);
  assertStrictEquals(ExtBigInt.fromString("6"), 6n);
  assertStrictEquals(ExtBigInt.fromString("-6"), -6n);
  assertStrictEquals(ExtBigInt.fromString("7"), 7n);
  assertStrictEquals(ExtBigInt.fromString("-7"), -7n);
  assertStrictEquals(ExtBigInt.fromString("8"), 8n);
  assertStrictEquals(ExtBigInt.fromString("-8"), -8n);
  assertStrictEquals(ExtBigInt.fromString("9"), 9n);
  assertStrictEquals(ExtBigInt.fromString("-9"), -9n);
  assertStrictEquals(ExtBigInt.fromString("10"), 10n);
  assertStrictEquals(ExtBigInt.fromString("-10"), -10n);

  assertStrictEquals(ExtBigInt.fromString("+111"), 111n);

  const e1 = "`value` must be text representation of 10 based integer.";
  assertThrows(
    () => {
      ExtBigInt.fromString(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("" as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("A" as unknown as string);
    },
    TypeError,
    e1,
  );
});

Deno.test("ExtBigInt.fromString() - 2", () => {
  const op2 = { radix: 2 } as const;

  assertStrictEquals(ExtBigInt.fromString("0", op2), 0n);
  assertStrictEquals(ExtBigInt.fromString("-0", op2), 0n);
  assertStrictEquals(ExtBigInt.fromString("+0", op2), 0n);
  assertStrictEquals(ExtBigInt.fromString("1", op2), 1n);
  assertStrictEquals(ExtBigInt.fromString("-1", op2), -1n);
  assertStrictEquals(ExtBigInt.fromString("+1", op2), 1n);
  assertStrictEquals(ExtBigInt.fromString("10", op2), 2n);
  assertStrictEquals(ExtBigInt.fromString("-10", op2), -2n);

  assertStrictEquals(ExtBigInt.fromString("+111", op2), 7n);

  const e1 = "`value` must be text representation of 2 based integer.";
  assertThrows(
    () => {
      ExtBigInt.fromString(undefined as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("2" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
});

Deno.test("ExtBigInt.fromString() - 8", () => {
  const op8 = { radix: 8 } as const;

  assertStrictEquals(ExtBigInt.fromString("0", op8), 0n);
  assertStrictEquals(ExtBigInt.fromString("-0", op8), 0n);
  assertStrictEquals(ExtBigInt.fromString("+0", op8), 0n);
  assertStrictEquals(ExtBigInt.fromString("1", op8), 1n);
  assertStrictEquals(ExtBigInt.fromString("-1", op8), -1n);
  assertStrictEquals(ExtBigInt.fromString("+1", op8), 1n);
  assertStrictEquals(ExtBigInt.fromString("2", op8), 2n);
  assertStrictEquals(ExtBigInt.fromString("-2", op8), -2n);
  assertStrictEquals(ExtBigInt.fromString("3", op8), 3n);
  assertStrictEquals(ExtBigInt.fromString("-3", op8), -3n);
  assertStrictEquals(ExtBigInt.fromString("4", op8), 4n);
  assertStrictEquals(ExtBigInt.fromString("-4", op8), -4n);
  assertStrictEquals(ExtBigInt.fromString("5", op8), 5n);
  assertStrictEquals(ExtBigInt.fromString("-5", op8), -5n);
  assertStrictEquals(ExtBigInt.fromString("6", op8), 6n);
  assertStrictEquals(ExtBigInt.fromString("-6", op8), -6n);
  assertStrictEquals(ExtBigInt.fromString("7", op8), 7n);
  assertStrictEquals(ExtBigInt.fromString("-7", op8), -7n);
  assertStrictEquals(ExtBigInt.fromString("10", op8), 8n);
  assertStrictEquals(ExtBigInt.fromString("-10", op8), -8n);

  assertStrictEquals(ExtBigInt.fromString("+111", op8), 73n);

  const e1 = "`value` must be text representation of 8 based integer.";
  assertThrows(
    () => {
      ExtBigInt.fromString(undefined as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("8" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
});

Deno.test("ExtBigInt.fromString() - 10", () => {
  const op10 = { radix: 10 } as const;

  assertStrictEquals(ExtBigInt.fromString("0", op10), 0n);
  assertStrictEquals(ExtBigInt.fromString("-0", op10), 0n);
  assertStrictEquals(ExtBigInt.fromString("+0", op10), 0n);
  assertStrictEquals(ExtBigInt.fromString("1", op10), 1n);
  assertStrictEquals(ExtBigInt.fromString("-1", op10), -1n);
  assertStrictEquals(ExtBigInt.fromString("+1", op10), 1n);
  assertStrictEquals(ExtBigInt.fromString("2", op10), 2n);
  assertStrictEquals(ExtBigInt.fromString("-2", op10), -2n);
  assertStrictEquals(ExtBigInt.fromString("3", op10), 3n);
  assertStrictEquals(ExtBigInt.fromString("-3", op10), -3n);
  assertStrictEquals(ExtBigInt.fromString("4", op10), 4n);
  assertStrictEquals(ExtBigInt.fromString("-4", op10), -4n);
  assertStrictEquals(ExtBigInt.fromString("5", op10), 5n);
  assertStrictEquals(ExtBigInt.fromString("-5", op10), -5n);
  assertStrictEquals(ExtBigInt.fromString("6", op10), 6n);
  assertStrictEquals(ExtBigInt.fromString("-6", op10), -6n);
  assertStrictEquals(ExtBigInt.fromString("7", op10), 7n);
  assertStrictEquals(ExtBigInt.fromString("-7", op10), -7n);
  assertStrictEquals(ExtBigInt.fromString("8", op10), 8n);
  assertStrictEquals(ExtBigInt.fromString("-8", op10), -8n);
  assertStrictEquals(ExtBigInt.fromString("9", op10), 9n);
  assertStrictEquals(ExtBigInt.fromString("-9", op10), -9n);
  assertStrictEquals(ExtBigInt.fromString("10", op10), 10n);
  assertStrictEquals(ExtBigInt.fromString("-10", op10), -10n);

  assertStrictEquals(ExtBigInt.fromString("+111", op10), 111n);

  const e1 = "`value` must be text representation of 10 based integer.";
  assertThrows(
    () => {
      ExtBigInt.fromString(undefined as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("A" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
});

Deno.test("ExtBigInt.fromString() - 16", () => {
  const op16 = { radix: 16 } as const;

  assertStrictEquals(ExtBigInt.fromString("0", op16), 0n);
  assertStrictEquals(ExtBigInt.fromString("-0", op16), 0n);
  assertStrictEquals(ExtBigInt.fromString("+0", op16), 0n);
  assertStrictEquals(ExtBigInt.fromString("1", op16), 1n);
  assertStrictEquals(ExtBigInt.fromString("-1", op16), -1n);
  assertStrictEquals(ExtBigInt.fromString("+1", op16), 1n);
  assertStrictEquals(ExtBigInt.fromString("2", op16), 2n);
  assertStrictEquals(ExtBigInt.fromString("-2", op16), -2n);
  assertStrictEquals(ExtBigInt.fromString("3", op16), 3n);
  assertStrictEquals(ExtBigInt.fromString("-3", op16), -3n);
  assertStrictEquals(ExtBigInt.fromString("4", op16), 4n);
  assertStrictEquals(ExtBigInt.fromString("-4", op16), -4n);
  assertStrictEquals(ExtBigInt.fromString("5", op16), 5n);
  assertStrictEquals(ExtBigInt.fromString("-5", op16), -5n);
  assertStrictEquals(ExtBigInt.fromString("6", op16), 6n);
  assertStrictEquals(ExtBigInt.fromString("-6", op16), -6n);
  assertStrictEquals(ExtBigInt.fromString("7", op16), 7n);
  assertStrictEquals(ExtBigInt.fromString("-7", op16), -7n);
  assertStrictEquals(ExtBigInt.fromString("8", op16), 8n);
  assertStrictEquals(ExtBigInt.fromString("-8", op16), -8n);
  assertStrictEquals(ExtBigInt.fromString("9", op16), 9n);
  assertStrictEquals(ExtBigInt.fromString("-9", op16), -9n);
  assertStrictEquals(ExtBigInt.fromString("A", op16), 10n);
  assertStrictEquals(ExtBigInt.fromString("-a", op16), -10n);
  assertStrictEquals(ExtBigInt.fromString("b", op16), 11n);
  assertStrictEquals(ExtBigInt.fromString("-B", op16), -11n);
  assertStrictEquals(ExtBigInt.fromString("C", op16), 12n);
  assertStrictEquals(ExtBigInt.fromString("-c", op16), -12n);
  assertStrictEquals(ExtBigInt.fromString("d", op16), 13n);
  assertStrictEquals(ExtBigInt.fromString("-D", op16), -13n);
  assertStrictEquals(ExtBigInt.fromString("E", op16), 14n);
  assertStrictEquals(ExtBigInt.fromString("-e", op16), -14n);
  assertStrictEquals(ExtBigInt.fromString("f", op16), 15n);
  assertStrictEquals(ExtBigInt.fromString("-F", op16), -15n);
  assertStrictEquals(ExtBigInt.fromString("10", op16), 16n);
  assertStrictEquals(ExtBigInt.fromString("-10", op16), -16n);

  assertStrictEquals(ExtBigInt.fromString("+111", op16), 273n);

  const e1 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      ExtBigInt.fromString(undefined as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.fromString("G" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
});

Deno.test("ExtBigInt.fromString() - x", () => {
  const opx = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      ExtBigInt.fromString("G" as unknown as string, opx);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
});

Deno.test("ExtBigInt.toString()", () => {
  const rfe1 = "`value` must be a `bigint`.";

  assertThrows(
    () => {
      ExtBigInt.toString(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExtBigInt.toString(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(ExtBigInt.toString(-1n), "-1");
  assertStrictEquals(ExtBigInt.toString(-0n), "0");
  assertStrictEquals(ExtBigInt.toString(0n), "0");
  assertStrictEquals(ExtBigInt.toString(1n), "1");

  assertStrictEquals(ExtBigInt.toString(1111n), "1111");

  assertStrictEquals(ExtBigInt.toString(2n), "2");
  assertStrictEquals(ExtBigInt.toString(3n), "3");
  assertStrictEquals(ExtBigInt.toString(4n), "4");
  assertStrictEquals(ExtBigInt.toString(5n), "5");
  assertStrictEquals(ExtBigInt.toString(6n), "6");
  assertStrictEquals(ExtBigInt.toString(7n), "7");
  assertStrictEquals(ExtBigInt.toString(8n), "8");
  assertStrictEquals(ExtBigInt.toString(9n), "9");
  assertStrictEquals(ExtBigInt.toString(10n), "10");
  assertStrictEquals(ExtBigInt.toString(11n), "11");
  assertStrictEquals(ExtBigInt.toString(12n), "12");
  assertStrictEquals(ExtBigInt.toString(13n), "13");
  assertStrictEquals(ExtBigInt.toString(14n), "14");
  assertStrictEquals(ExtBigInt.toString(15n), "15");
  assertStrictEquals(ExtBigInt.toString(16n), "16");
});

Deno.test("ExtBigInt.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(ExtBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExtBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(1n, op), "1");

  assertStrictEquals(ExtBigInt.toString(1111n, op), "10001010111");

  assertStrictEquals(ExtBigInt.toString(2n, op), "10");
  assertStrictEquals(ExtBigInt.toString(3n, op), "11");
  assertStrictEquals(ExtBigInt.toString(4n, op), "100");
  assertStrictEquals(ExtBigInt.toString(5n, op), "101");
  assertStrictEquals(ExtBigInt.toString(6n, op), "110");
  assertStrictEquals(ExtBigInt.toString(7n, op), "111");
  assertStrictEquals(ExtBigInt.toString(8n, op), "1000");
  assertStrictEquals(ExtBigInt.toString(9n, op), "1001");
  assertStrictEquals(ExtBigInt.toString(10n, op), "1010");
  assertStrictEquals(ExtBigInt.toString(11n, op), "1011");
  assertStrictEquals(ExtBigInt.toString(12n, op), "1100");
  assertStrictEquals(ExtBigInt.toString(13n, op), "1101");
  assertStrictEquals(ExtBigInt.toString(14n, op), "1110");
  assertStrictEquals(ExtBigInt.toString(15n, op), "1111");
  assertStrictEquals(ExtBigInt.toString(16n, op), "10000");
});

Deno.test("ExtBigInt.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(ExtBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExtBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(1n, op), "1");

  assertStrictEquals(ExtBigInt.toString(1111n, op), "2127");

  assertStrictEquals(ExtBigInt.toString(2n, op), "2");
  assertStrictEquals(ExtBigInt.toString(3n, op), "3");
  assertStrictEquals(ExtBigInt.toString(4n, op), "4");
  assertStrictEquals(ExtBigInt.toString(5n, op), "5");
  assertStrictEquals(ExtBigInt.toString(6n, op), "6");
  assertStrictEquals(ExtBigInt.toString(7n, op), "7");
  assertStrictEquals(ExtBigInt.toString(8n, op), "10");
  assertStrictEquals(ExtBigInt.toString(9n, op), "11");
  assertStrictEquals(ExtBigInt.toString(10n, op), "12");
  assertStrictEquals(ExtBigInt.toString(11n, op), "13");
  assertStrictEquals(ExtBigInt.toString(12n, op), "14");
  assertStrictEquals(ExtBigInt.toString(13n, op), "15");
  assertStrictEquals(ExtBigInt.toString(14n, op), "16");
  assertStrictEquals(ExtBigInt.toString(15n, op), "17");
  assertStrictEquals(ExtBigInt.toString(16n, op), "20");
});

Deno.test("ExtBigInt.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(ExtBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExtBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(1n, op), "1");

  assertStrictEquals(ExtBigInt.toString(1111n, op), "1111");

  assertStrictEquals(ExtBigInt.toString(2n, op), "2");
  assertStrictEquals(ExtBigInt.toString(3n, op), "3");
  assertStrictEquals(ExtBigInt.toString(4n, op), "4");
  assertStrictEquals(ExtBigInt.toString(5n, op), "5");
  assertStrictEquals(ExtBigInt.toString(6n, op), "6");
  assertStrictEquals(ExtBigInt.toString(7n, op), "7");
  assertStrictEquals(ExtBigInt.toString(8n, op), "8");
  assertStrictEquals(ExtBigInt.toString(9n, op), "9");
  assertStrictEquals(ExtBigInt.toString(10n, op), "10");
  assertStrictEquals(ExtBigInt.toString(11n, op), "11");
  assertStrictEquals(ExtBigInt.toString(12n, op), "12");
  assertStrictEquals(ExtBigInt.toString(13n, op), "13");
  assertStrictEquals(ExtBigInt.toString(14n, op), "14");
  assertStrictEquals(ExtBigInt.toString(15n, op), "15");
  assertStrictEquals(ExtBigInt.toString(16n, op), "16");
});

Deno.test("ExtBigInt.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(ExtBigInt.toString(-1n, op), "-1");
  assertStrictEquals(ExtBigInt.toString(-0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(0n, op), "0");
  assertStrictEquals(ExtBigInt.toString(1n, op), "1");

  assertStrictEquals(ExtBigInt.toString(1111n, op), "457");

  assertStrictEquals(ExtBigInt.toString(2n, op), "2");
  assertStrictEquals(ExtBigInt.toString(3n, op), "3");
  assertStrictEquals(ExtBigInt.toString(4n, op), "4");
  assertStrictEquals(ExtBigInt.toString(5n, op), "5");
  assertStrictEquals(ExtBigInt.toString(6n, op), "6");
  assertStrictEquals(ExtBigInt.toString(7n, op), "7");
  assertStrictEquals(ExtBigInt.toString(8n, op), "8");
  assertStrictEquals(ExtBigInt.toString(9n, op), "9");
  assertStrictEquals(ExtBigInt.toString(10n, op), "A");
  assertStrictEquals(ExtBigInt.toString(11n, op), "B");
  assertStrictEquals(ExtBigInt.toString(12n, op), "C");
  assertStrictEquals(ExtBigInt.toString(13n, op), "D");
  assertStrictEquals(ExtBigInt.toString(14n, op), "E");
  assertStrictEquals(ExtBigInt.toString(15n, op), "F");
  assertStrictEquals(ExtBigInt.toString(16n, op), "10");
});

Deno.test("ExtBigInt.toString() - radix:unknown", () => {
  const op = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      ExtBigInt.toString(-1n, op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(ExtBigInt.toString(-1n, op), "-1");
  // assertStrictEquals(ExtBigInt.toString(-0n, op), "0");
  // assertStrictEquals(ExtBigInt.toString(0n, op), "0");
  // assertStrictEquals(ExtBigInt.toString(1n, op), "1");

  // assertStrictEquals(ExtBigInt.toString(1111n, op), "1111");

  // assertStrictEquals(ExtBigInt.toString(2n, op), "2");
  // assertStrictEquals(ExtBigInt.toString(3n, op), "3");
  // assertStrictEquals(ExtBigInt.toString(4n, op), "4");
  // assertStrictEquals(ExtBigInt.toString(5n, op), "5");
  // assertStrictEquals(ExtBigInt.toString(6n, op), "6");
  // assertStrictEquals(ExtBigInt.toString(7n, op), "7");
  // assertStrictEquals(ExtBigInt.toString(8n, op), "8");
  // assertStrictEquals(ExtBigInt.toString(9n, op), "9");
  // assertStrictEquals(ExtBigInt.toString(10n, op), "10");
  // assertStrictEquals(ExtBigInt.toString(11n, op), "11");
  // assertStrictEquals(ExtBigInt.toString(12n, op), "12");
  // assertStrictEquals(ExtBigInt.toString(13n, op), "13");
  // assertStrictEquals(ExtBigInt.toString(14n, op), "14");
  // assertStrictEquals(ExtBigInt.toString(15n, op), "15");
  // assertStrictEquals(ExtBigInt.toString(16n, op), "16");
});

Deno.test("ExtBigInt.fromNumber()", () => {
  const rfe1 = "`value` must be a finite `number`.";

  assertThrows(
    () => {
      ExtBigInt.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExtBigInt.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExtBigInt.fromNumber(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExtBigInt.fromNumber(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      ExtBigInt.fromNumber(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  // assertThrows(
  //   () => {
  //     ExtBigInt.fromNumber(Number.POSITIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  // assertThrows(
  //   () => {
  //     ExtBigInt.fromNumber(Number.NEGATIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  assertStrictEquals(ExtBigInt.fromNumber(0.5), 0n);

  assertStrictEquals(ExtBigInt.fromNumber(-1), -1n);
  assertStrictEquals(ExtBigInt.fromNumber(-0), 0n);
  assertStrictEquals(ExtBigInt.fromNumber(0), 0n);
  assertStrictEquals(ExtBigInt.fromNumber(1), 1n);

  assertStrictEquals(ExtBigInt.fromNumber(SIMAX), BigInt(SIMAX));
  assertStrictEquals(ExtBigInt.fromNumber(SIMIN), BigInt(SIMIN));
});

Deno.test("ExtBigInt.toNumber()", () => {
  assertStrictEquals(ExtBigInt.toNumber(0n), 0);
  assertStrictEquals(ExtBigInt.toNumber(-1n), -1);
  assertStrictEquals(ExtBigInt.toNumber(1n), 1);
  assertStrictEquals(ExtBigInt.toNumber(BigInt(SIMIN)), SIMIN);
  assertStrictEquals(ExtBigInt.toNumber(BigInt(SIMAX)), SIMAX);

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      ExtBigInt.toNumber(BigInt(SIMIN) - 1n);
    },
    TypeError,
    e1,
  );
});
