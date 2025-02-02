import { assertStrictEquals, assertThrows } from "@std/assert";
import { BigInteger } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("BigInteger.min()", () => {
  assertStrictEquals(BigInteger.min(0n), 0n);
  assertStrictEquals(BigInteger.min(1n), 1n);
  assertStrictEquals(BigInteger.min(-1n), -1n);

  assertStrictEquals(BigInteger.min(0n, 1n), 0n);
  assertStrictEquals(BigInteger.min(0n, -1n), -1n);

  assertStrictEquals(BigInteger.min(2n, 0n, 1n), 0n);
  assertStrictEquals(BigInteger.min(2n, 0n, -1n), -1n);
  assertStrictEquals(BigInteger.min(0n, 1n, 2n), 0n);
  assertStrictEquals(BigInteger.min(0n, -1n, 2n), -1n);
  assertStrictEquals(BigInteger.min(1n, 2n, 0n), 0n);
  assertStrictEquals(BigInteger.min(-1n, 2n, 0n), -1n);

  assertStrictEquals(BigInteger.min(-2n, 0n, 1n), -2n);
  assertStrictEquals(BigInteger.min(-2n, 0n, -1n), -2n);
  assertStrictEquals(BigInteger.min(0n, 1n, -2n), -2n);
  assertStrictEquals(BigInteger.min(0n, -1n, -2n), -2n);
  assertStrictEquals(BigInteger.min(1n, -2n, 0n), -2n);
  assertStrictEquals(BigInteger.min(-1n, -2n, 0n), -2n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.min(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.min(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("BigInteger.max()", () => {
  assertStrictEquals(BigInteger.max(0n), 0n);
  assertStrictEquals(BigInteger.max(1n), 1n);
  assertStrictEquals(BigInteger.max(-1n), -1n);

  assertStrictEquals(BigInteger.max(0n, 1n), 1n);
  assertStrictEquals(BigInteger.max(0n, -1n), 0n);

  assertStrictEquals(BigInteger.max(2n, 0n, 1n), 2n);
  assertStrictEquals(BigInteger.max(2n, 0n, -1n), 2n);
  assertStrictEquals(BigInteger.max(0n, 1n, 2n), 2n);
  assertStrictEquals(BigInteger.max(0n, -1n, 2n), 2n);
  assertStrictEquals(BigInteger.max(1n, 2n, 0n), 2n);
  assertStrictEquals(BigInteger.max(-1n, 2n, 0n), 2n);

  assertStrictEquals(BigInteger.max(-2n, 0n, 1n), 1n);
  assertStrictEquals(BigInteger.max(-2n, 0n, -1n), 0n);
  assertStrictEquals(BigInteger.max(0n, 1n, -2n), 1n);
  assertStrictEquals(BigInteger.max(0n, -1n, -2n), 0n);
  assertStrictEquals(BigInteger.max(1n, -2n, 0n), 1n);
  assertStrictEquals(BigInteger.max(-1n, -2n, 0n), 0n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.max(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.max(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("BigInteger.clamp()", () => {
  const ex1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.clamp(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.clamp(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      BigInteger.clamp(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(BigInteger.clamp(0n, 0n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(0n, 0n, 1n), 0n);
  assertStrictEquals(BigInteger.clamp(0n, -1n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(0n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigInteger.clamp(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.clamp(0n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigInteger.clamp(1n, 0n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(1n, 0n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(1n, -1n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(1n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigInteger.clamp(1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.clamp(1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigInteger.clamp(-1n, 0n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(-1n, 0n, 1n), 0n);
  assertStrictEquals(BigInteger.clamp(-1n, -1n, 0n), -1n);
  assertStrictEquals(BigInteger.clamp(-1n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(-1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigInteger.clamp(-1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.clamp(-1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );
});

Deno.test("BigInteger.fromString()", () => {
  assertStrictEquals(BigInteger.fromString("0"), 0n);
  assertStrictEquals(BigInteger.fromString("-0"), 0n);
  assertStrictEquals(BigInteger.fromString("+0"), 0n);
  assertStrictEquals(BigInteger.fromString("1"), 1n);
  assertStrictEquals(BigInteger.fromString("-1"), -1n);
  assertStrictEquals(BigInteger.fromString("+1"), 1n);
  assertStrictEquals(BigInteger.fromString("2"), 2n);
  assertStrictEquals(BigInteger.fromString("-2"), -2n);
  assertStrictEquals(BigInteger.fromString("3"), 3n);
  assertStrictEquals(BigInteger.fromString("-3"), -3n);
  assertStrictEquals(BigInteger.fromString("4"), 4n);
  assertStrictEquals(BigInteger.fromString("-4"), -4n);
  assertStrictEquals(BigInteger.fromString("5"), 5n);
  assertStrictEquals(BigInteger.fromString("-5"), -5n);
  assertStrictEquals(BigInteger.fromString("6"), 6n);
  assertStrictEquals(BigInteger.fromString("-6"), -6n);
  assertStrictEquals(BigInteger.fromString("7"), 7n);
  assertStrictEquals(BigInteger.fromString("-7"), -7n);
  assertStrictEquals(BigInteger.fromString("8"), 8n);
  assertStrictEquals(BigInteger.fromString("-8"), -8n);
  assertStrictEquals(BigInteger.fromString("9"), 9n);
  assertStrictEquals(BigInteger.fromString("-9"), -9n);
  assertStrictEquals(BigInteger.fromString("10"), 10n);
  assertStrictEquals(BigInteger.fromString("-10"), -10n);

  assertStrictEquals(BigInteger.fromString("+111"), 111n);

  const e1 = "`value` must be text representation of 10 based integer.";
  assertThrows(
    () => {
      BigInteger.fromString(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("" as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("A" as unknown as string);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigInteger.fromString() - 2", () => {
  const op2 = { radix: 2 } as const;

  assertStrictEquals(BigInteger.fromString("0", op2), 0n);
  assertStrictEquals(BigInteger.fromString("-0", op2), 0n);
  assertStrictEquals(BigInteger.fromString("+0", op2), 0n);
  assertStrictEquals(BigInteger.fromString("1", op2), 1n);
  assertStrictEquals(BigInteger.fromString("-1", op2), -1n);
  assertStrictEquals(BigInteger.fromString("+1", op2), 1n);
  assertStrictEquals(BigInteger.fromString("10", op2), 2n);
  assertStrictEquals(BigInteger.fromString("-10", op2), -2n);

  assertStrictEquals(BigInteger.fromString("+111", op2), 7n);

  const e1 = "`value` must be text representation of 2 based integer.";
  assertThrows(
    () => {
      BigInteger.fromString(undefined as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("2" as unknown as string, op2);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigInteger.fromString() - 8", () => {
  const op8 = { radix: 8 } as const;

  assertStrictEquals(BigInteger.fromString("0", op8), 0n);
  assertStrictEquals(BigInteger.fromString("-0", op8), 0n);
  assertStrictEquals(BigInteger.fromString("+0", op8), 0n);
  assertStrictEquals(BigInteger.fromString("1", op8), 1n);
  assertStrictEquals(BigInteger.fromString("-1", op8), -1n);
  assertStrictEquals(BigInteger.fromString("+1", op8), 1n);
  assertStrictEquals(BigInteger.fromString("2", op8), 2n);
  assertStrictEquals(BigInteger.fromString("-2", op8), -2n);
  assertStrictEquals(BigInteger.fromString("3", op8), 3n);
  assertStrictEquals(BigInteger.fromString("-3", op8), -3n);
  assertStrictEquals(BigInteger.fromString("4", op8), 4n);
  assertStrictEquals(BigInteger.fromString("-4", op8), -4n);
  assertStrictEquals(BigInteger.fromString("5", op8), 5n);
  assertStrictEquals(BigInteger.fromString("-5", op8), -5n);
  assertStrictEquals(BigInteger.fromString("6", op8), 6n);
  assertStrictEquals(BigInteger.fromString("-6", op8), -6n);
  assertStrictEquals(BigInteger.fromString("7", op8), 7n);
  assertStrictEquals(BigInteger.fromString("-7", op8), -7n);
  assertStrictEquals(BigInteger.fromString("10", op8), 8n);
  assertStrictEquals(BigInteger.fromString("-10", op8), -8n);

  assertStrictEquals(BigInteger.fromString("+111", op8), 73n);

  const e1 = "`value` must be text representation of 8 based integer.";
  assertThrows(
    () => {
      BigInteger.fromString(undefined as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("8" as unknown as string, op8);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigInteger.fromString() - 10", () => {
  const op10 = { radix: 10 } as const;

  assertStrictEquals(BigInteger.fromString("0", op10), 0n);
  assertStrictEquals(BigInteger.fromString("-0", op10), 0n);
  assertStrictEquals(BigInteger.fromString("+0", op10), 0n);
  assertStrictEquals(BigInteger.fromString("1", op10), 1n);
  assertStrictEquals(BigInteger.fromString("-1", op10), -1n);
  assertStrictEquals(BigInteger.fromString("+1", op10), 1n);
  assertStrictEquals(BigInteger.fromString("2", op10), 2n);
  assertStrictEquals(BigInteger.fromString("-2", op10), -2n);
  assertStrictEquals(BigInteger.fromString("3", op10), 3n);
  assertStrictEquals(BigInteger.fromString("-3", op10), -3n);
  assertStrictEquals(BigInteger.fromString("4", op10), 4n);
  assertStrictEquals(BigInteger.fromString("-4", op10), -4n);
  assertStrictEquals(BigInteger.fromString("5", op10), 5n);
  assertStrictEquals(BigInteger.fromString("-5", op10), -5n);
  assertStrictEquals(BigInteger.fromString("6", op10), 6n);
  assertStrictEquals(BigInteger.fromString("-6", op10), -6n);
  assertStrictEquals(BigInteger.fromString("7", op10), 7n);
  assertStrictEquals(BigInteger.fromString("-7", op10), -7n);
  assertStrictEquals(BigInteger.fromString("8", op10), 8n);
  assertStrictEquals(BigInteger.fromString("-8", op10), -8n);
  assertStrictEquals(BigInteger.fromString("9", op10), 9n);
  assertStrictEquals(BigInteger.fromString("-9", op10), -9n);
  assertStrictEquals(BigInteger.fromString("10", op10), 10n);
  assertStrictEquals(BigInteger.fromString("-10", op10), -10n);

  assertStrictEquals(BigInteger.fromString("+111", op10), 111n);

  const e1 = "`value` must be text representation of 10 based integer.";
  assertThrows(
    () => {
      BigInteger.fromString(undefined as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("A" as unknown as string, op10);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigInteger.fromString() - 16", () => {
  const op16 = { radix: 16 } as const;

  assertStrictEquals(BigInteger.fromString("0", op16), 0n);
  assertStrictEquals(BigInteger.fromString("-0", op16), 0n);
  assertStrictEquals(BigInteger.fromString("+0", op16), 0n);
  assertStrictEquals(BigInteger.fromString("1", op16), 1n);
  assertStrictEquals(BigInteger.fromString("-1", op16), -1n);
  assertStrictEquals(BigInteger.fromString("+1", op16), 1n);
  assertStrictEquals(BigInteger.fromString("2", op16), 2n);
  assertStrictEquals(BigInteger.fromString("-2", op16), -2n);
  assertStrictEquals(BigInteger.fromString("3", op16), 3n);
  assertStrictEquals(BigInteger.fromString("-3", op16), -3n);
  assertStrictEquals(BigInteger.fromString("4", op16), 4n);
  assertStrictEquals(BigInteger.fromString("-4", op16), -4n);
  assertStrictEquals(BigInteger.fromString("5", op16), 5n);
  assertStrictEquals(BigInteger.fromString("-5", op16), -5n);
  assertStrictEquals(BigInteger.fromString("6", op16), 6n);
  assertStrictEquals(BigInteger.fromString("-6", op16), -6n);
  assertStrictEquals(BigInteger.fromString("7", op16), 7n);
  assertStrictEquals(BigInteger.fromString("-7", op16), -7n);
  assertStrictEquals(BigInteger.fromString("8", op16), 8n);
  assertStrictEquals(BigInteger.fromString("-8", op16), -8n);
  assertStrictEquals(BigInteger.fromString("9", op16), 9n);
  assertStrictEquals(BigInteger.fromString("-9", op16), -9n);
  assertStrictEquals(BigInteger.fromString("A", op16), 10n);
  assertStrictEquals(BigInteger.fromString("-a", op16), -10n);
  assertStrictEquals(BigInteger.fromString("b", op16), 11n);
  assertStrictEquals(BigInteger.fromString("-B", op16), -11n);
  assertStrictEquals(BigInteger.fromString("C", op16), 12n);
  assertStrictEquals(BigInteger.fromString("-c", op16), -12n);
  assertStrictEquals(BigInteger.fromString("d", op16), 13n);
  assertStrictEquals(BigInteger.fromString("-D", op16), -13n);
  assertStrictEquals(BigInteger.fromString("E", op16), 14n);
  assertStrictEquals(BigInteger.fromString("-e", op16), -14n);
  assertStrictEquals(BigInteger.fromString("f", op16), 15n);
  assertStrictEquals(BigInteger.fromString("-F", op16), -15n);
  assertStrictEquals(BigInteger.fromString("10", op16), 16n);
  assertStrictEquals(BigInteger.fromString("-10", op16), -16n);

  assertStrictEquals(BigInteger.fromString("+111", op16), 273n);

  const e1 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      BigInteger.fromString(undefined as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigInteger.fromString("G" as unknown as string, op16);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigInteger.fromString() - x", () => {
  const opx = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      BigInteger.fromString("G" as unknown as string, opx);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
});

Deno.test("BigInteger.toString()", () => {
  const rfe1 = "`value` must be a `bigint`.";

  assertThrows(
    () => {
      BigInteger.toString(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.toString(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(BigInteger.toString(-1n), "-1");
  assertStrictEquals(BigInteger.toString(-0n), "0");
  assertStrictEquals(BigInteger.toString(0n), "0");
  assertStrictEquals(BigInteger.toString(1n), "1");

  assertStrictEquals(BigInteger.toString(1111n), "1111");

  assertStrictEquals(BigInteger.toString(2n), "2");
  assertStrictEquals(BigInteger.toString(3n), "3");
  assertStrictEquals(BigInteger.toString(4n), "4");
  assertStrictEquals(BigInteger.toString(5n), "5");
  assertStrictEquals(BigInteger.toString(6n), "6");
  assertStrictEquals(BigInteger.toString(7n), "7");
  assertStrictEquals(BigInteger.toString(8n), "8");
  assertStrictEquals(BigInteger.toString(9n), "9");
  assertStrictEquals(BigInteger.toString(10n), "10");
  assertStrictEquals(BigInteger.toString(11n), "11");
  assertStrictEquals(BigInteger.toString(12n), "12");
  assertStrictEquals(BigInteger.toString(13n), "13");
  assertStrictEquals(BigInteger.toString(14n), "14");
  assertStrictEquals(BigInteger.toString(15n), "15");
  assertStrictEquals(BigInteger.toString(16n), "16");
});

Deno.test("BigInteger.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(BigInteger.toString(-1n, op), "-1");
  assertStrictEquals(BigInteger.toString(-0n, op), "0");
  assertStrictEquals(BigInteger.toString(0n, op), "0");
  assertStrictEquals(BigInteger.toString(1n, op), "1");

  assertStrictEquals(BigInteger.toString(1111n, op), "10001010111");

  assertStrictEquals(BigInteger.toString(2n, op), "10");
  assertStrictEquals(BigInteger.toString(3n, op), "11");
  assertStrictEquals(BigInteger.toString(4n, op), "100");
  assertStrictEquals(BigInteger.toString(5n, op), "101");
  assertStrictEquals(BigInteger.toString(6n, op), "110");
  assertStrictEquals(BigInteger.toString(7n, op), "111");
  assertStrictEquals(BigInteger.toString(8n, op), "1000");
  assertStrictEquals(BigInteger.toString(9n, op), "1001");
  assertStrictEquals(BigInteger.toString(10n, op), "1010");
  assertStrictEquals(BigInteger.toString(11n, op), "1011");
  assertStrictEquals(BigInteger.toString(12n, op), "1100");
  assertStrictEquals(BigInteger.toString(13n, op), "1101");
  assertStrictEquals(BigInteger.toString(14n, op), "1110");
  assertStrictEquals(BigInteger.toString(15n, op), "1111");
  assertStrictEquals(BigInteger.toString(16n, op), "10000");
});

Deno.test("BigInteger.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(BigInteger.toString(-1n, op), "-1");
  assertStrictEquals(BigInteger.toString(-0n, op), "0");
  assertStrictEquals(BigInteger.toString(0n, op), "0");
  assertStrictEquals(BigInteger.toString(1n, op), "1");

  assertStrictEquals(BigInteger.toString(1111n, op), "2127");

  assertStrictEquals(BigInteger.toString(2n, op), "2");
  assertStrictEquals(BigInteger.toString(3n, op), "3");
  assertStrictEquals(BigInteger.toString(4n, op), "4");
  assertStrictEquals(BigInteger.toString(5n, op), "5");
  assertStrictEquals(BigInteger.toString(6n, op), "6");
  assertStrictEquals(BigInteger.toString(7n, op), "7");
  assertStrictEquals(BigInteger.toString(8n, op), "10");
  assertStrictEquals(BigInteger.toString(9n, op), "11");
  assertStrictEquals(BigInteger.toString(10n, op), "12");
  assertStrictEquals(BigInteger.toString(11n, op), "13");
  assertStrictEquals(BigInteger.toString(12n, op), "14");
  assertStrictEquals(BigInteger.toString(13n, op), "15");
  assertStrictEquals(BigInteger.toString(14n, op), "16");
  assertStrictEquals(BigInteger.toString(15n, op), "17");
  assertStrictEquals(BigInteger.toString(16n, op), "20");
});

Deno.test("BigInteger.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(BigInteger.toString(-1n, op), "-1");
  assertStrictEquals(BigInteger.toString(-0n, op), "0");
  assertStrictEquals(BigInteger.toString(0n, op), "0");
  assertStrictEquals(BigInteger.toString(1n, op), "1");

  assertStrictEquals(BigInteger.toString(1111n, op), "1111");

  assertStrictEquals(BigInteger.toString(2n, op), "2");
  assertStrictEquals(BigInteger.toString(3n, op), "3");
  assertStrictEquals(BigInteger.toString(4n, op), "4");
  assertStrictEquals(BigInteger.toString(5n, op), "5");
  assertStrictEquals(BigInteger.toString(6n, op), "6");
  assertStrictEquals(BigInteger.toString(7n, op), "7");
  assertStrictEquals(BigInteger.toString(8n, op), "8");
  assertStrictEquals(BigInteger.toString(9n, op), "9");
  assertStrictEquals(BigInteger.toString(10n, op), "10");
  assertStrictEquals(BigInteger.toString(11n, op), "11");
  assertStrictEquals(BigInteger.toString(12n, op), "12");
  assertStrictEquals(BigInteger.toString(13n, op), "13");
  assertStrictEquals(BigInteger.toString(14n, op), "14");
  assertStrictEquals(BigInteger.toString(15n, op), "15");
  assertStrictEquals(BigInteger.toString(16n, op), "16");
});

Deno.test("BigInteger.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(BigInteger.toString(-1n, op), "-1");
  assertStrictEquals(BigInteger.toString(-0n, op), "0");
  assertStrictEquals(BigInteger.toString(0n, op), "0");
  assertStrictEquals(BigInteger.toString(1n, op), "1");

  assertStrictEquals(BigInteger.toString(1111n, op), "457");

  assertStrictEquals(BigInteger.toString(2n, op), "2");
  assertStrictEquals(BigInteger.toString(3n, op), "3");
  assertStrictEquals(BigInteger.toString(4n, op), "4");
  assertStrictEquals(BigInteger.toString(5n, op), "5");
  assertStrictEquals(BigInteger.toString(6n, op), "6");
  assertStrictEquals(BigInteger.toString(7n, op), "7");
  assertStrictEquals(BigInteger.toString(8n, op), "8");
  assertStrictEquals(BigInteger.toString(9n, op), "9");
  assertStrictEquals(BigInteger.toString(10n, op), "A");
  assertStrictEquals(BigInteger.toString(11n, op), "B");
  assertStrictEquals(BigInteger.toString(12n, op), "C");
  assertStrictEquals(BigInteger.toString(13n, op), "D");
  assertStrictEquals(BigInteger.toString(14n, op), "E");
  assertStrictEquals(BigInteger.toString(15n, op), "F");
  assertStrictEquals(BigInteger.toString(16n, op), "10");
});

Deno.test("BigInteger.toString() - radix:unknown", () => {
  const op = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      BigInteger.toString(-1n, op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(BigInteger.toString(-1n, op), "-1");
  // assertStrictEquals(BigInteger.toString(-0n, op), "0");
  // assertStrictEquals(BigInteger.toString(0n, op), "0");
  // assertStrictEquals(BigInteger.toString(1n, op), "1");

  // assertStrictEquals(BigInteger.toString(1111n, op), "1111");

  // assertStrictEquals(BigInteger.toString(2n, op), "2");
  // assertStrictEquals(BigInteger.toString(3n, op), "3");
  // assertStrictEquals(BigInteger.toString(4n, op), "4");
  // assertStrictEquals(BigInteger.toString(5n, op), "5");
  // assertStrictEquals(BigInteger.toString(6n, op), "6");
  // assertStrictEquals(BigInteger.toString(7n, op), "7");
  // assertStrictEquals(BigInteger.toString(8n, op), "8");
  // assertStrictEquals(BigInteger.toString(9n, op), "9");
  // assertStrictEquals(BigInteger.toString(10n, op), "10");
  // assertStrictEquals(BigInteger.toString(11n, op), "11");
  // assertStrictEquals(BigInteger.toString(12n, op), "12");
  // assertStrictEquals(BigInteger.toString(13n, op), "13");
  // assertStrictEquals(BigInteger.toString(14n, op), "14");
  // assertStrictEquals(BigInteger.toString(15n, op), "15");
  // assertStrictEquals(BigInteger.toString(16n, op), "16");
});

Deno.test("BigInteger.fromNumber()", () => {
  const rfe1 = "`value` must be a finite `number`.";

  assertThrows(
    () => {
      BigInteger.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  // assertThrows(
  //   () => {
  //     BigInteger.fromNumber(Number.POSITIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  // assertThrows(
  //   () => {
  //     BigInteger.fromNumber(Number.NEGATIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  assertStrictEquals(BigInteger.fromNumber(0.5), 0n);

  assertStrictEquals(BigInteger.fromNumber(-1), -1n);
  assertStrictEquals(BigInteger.fromNumber(-0), 0n);
  assertStrictEquals(BigInteger.fromNumber(0), 0n);
  assertStrictEquals(BigInteger.fromNumber(1), 1n);

  assertStrictEquals(BigInteger.fromNumber(SIMAX), BigInt(SIMAX));
  assertStrictEquals(BigInteger.fromNumber(SIMIN), BigInt(SIMIN));
});

Deno.test("BigInteger.toNumber()", () => {
  assertStrictEquals(BigInteger.toNumber(0n), 0);
  assertStrictEquals(BigInteger.toNumber(-1n), -1);
  assertStrictEquals(BigInteger.toNumber(1n), 1);
  assertStrictEquals(BigInteger.toNumber(BigInt(SIMIN)), SIMIN);
  assertStrictEquals(BigInteger.toNumber(BigInt(SIMAX)), SIMAX);

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      BigInteger.toNumber(BigInt(SIMIN) - 1n);
    },
    TypeError,
    e1,
  );
});
