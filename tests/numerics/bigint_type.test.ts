import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Numerics } from "../../mod.ts";

const { BigIntType } = Numerics;

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("BigIntType.toString()", () => {
  const rfe1 = "`value` must be a `bigint`.";

  assertThrows(
    () => {
      BigIntType.toString(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigIntType.toString(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(BigIntType.toString(-1n), "-1");
  assertStrictEquals(BigIntType.toString(-0n), "0");
  assertStrictEquals(BigIntType.toString(0n), "0");
  assertStrictEquals(BigIntType.toString(1n), "1");

  assertStrictEquals(BigIntType.toString(1111n), "1111");

  assertStrictEquals(BigIntType.toString(2n), "2");
  assertStrictEquals(BigIntType.toString(3n), "3");
  assertStrictEquals(BigIntType.toString(4n), "4");
  assertStrictEquals(BigIntType.toString(5n), "5");
  assertStrictEquals(BigIntType.toString(6n), "6");
  assertStrictEquals(BigIntType.toString(7n), "7");
  assertStrictEquals(BigIntType.toString(8n), "8");
  assertStrictEquals(BigIntType.toString(9n), "9");
  assertStrictEquals(BigIntType.toString(10n), "10");
  assertStrictEquals(BigIntType.toString(11n), "11");
  assertStrictEquals(BigIntType.toString(12n), "12");
  assertStrictEquals(BigIntType.toString(13n), "13");
  assertStrictEquals(BigIntType.toString(14n), "14");
  assertStrictEquals(BigIntType.toString(15n), "15");
  assertStrictEquals(BigIntType.toString(16n), "16");
});

Deno.test("BigIntType.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "10001010111");

  assertStrictEquals(BigIntType.toString(2n, op), "10");
  assertStrictEquals(BigIntType.toString(3n, op), "11");
  assertStrictEquals(BigIntType.toString(4n, op), "100");
  assertStrictEquals(BigIntType.toString(5n, op), "101");
  assertStrictEquals(BigIntType.toString(6n, op), "110");
  assertStrictEquals(BigIntType.toString(7n, op), "111");
  assertStrictEquals(BigIntType.toString(8n, op), "1000");
  assertStrictEquals(BigIntType.toString(9n, op), "1001");
  assertStrictEquals(BigIntType.toString(10n, op), "1010");
  assertStrictEquals(BigIntType.toString(11n, op), "1011");
  assertStrictEquals(BigIntType.toString(12n, op), "1100");
  assertStrictEquals(BigIntType.toString(13n, op), "1101");
  assertStrictEquals(BigIntType.toString(14n, op), "1110");
  assertStrictEquals(BigIntType.toString(15n, op), "1111");
  assertStrictEquals(BigIntType.toString(16n, op), "10000");
});

Deno.test("BigIntType.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "2127");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "10");
  assertStrictEquals(BigIntType.toString(9n, op), "11");
  assertStrictEquals(BigIntType.toString(10n, op), "12");
  assertStrictEquals(BigIntType.toString(11n, op), "13");
  assertStrictEquals(BigIntType.toString(12n, op), "14");
  assertStrictEquals(BigIntType.toString(13n, op), "15");
  assertStrictEquals(BigIntType.toString(14n, op), "16");
  assertStrictEquals(BigIntType.toString(15n, op), "17");
  assertStrictEquals(BigIntType.toString(16n, op), "20");
});

Deno.test("BigIntType.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "1111");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "8");
  assertStrictEquals(BigIntType.toString(9n, op), "9");
  assertStrictEquals(BigIntType.toString(10n, op), "10");
  assertStrictEquals(BigIntType.toString(11n, op), "11");
  assertStrictEquals(BigIntType.toString(12n, op), "12");
  assertStrictEquals(BigIntType.toString(13n, op), "13");
  assertStrictEquals(BigIntType.toString(14n, op), "14");
  assertStrictEquals(BigIntType.toString(15n, op), "15");
  assertStrictEquals(BigIntType.toString(16n, op), "16");
});

Deno.test("BigIntType.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  assertStrictEquals(BigIntType.toString(-0n, op), "0");
  assertStrictEquals(BigIntType.toString(0n, op), "0");
  assertStrictEquals(BigIntType.toString(1n, op), "1");

  assertStrictEquals(BigIntType.toString(1111n, op), "457");

  assertStrictEquals(BigIntType.toString(2n, op), "2");
  assertStrictEquals(BigIntType.toString(3n, op), "3");
  assertStrictEquals(BigIntType.toString(4n, op), "4");
  assertStrictEquals(BigIntType.toString(5n, op), "5");
  assertStrictEquals(BigIntType.toString(6n, op), "6");
  assertStrictEquals(BigIntType.toString(7n, op), "7");
  assertStrictEquals(BigIntType.toString(8n, op), "8");
  assertStrictEquals(BigIntType.toString(9n, op), "9");
  assertStrictEquals(BigIntType.toString(10n, op), "A");
  assertStrictEquals(BigIntType.toString(11n, op), "B");
  assertStrictEquals(BigIntType.toString(12n, op), "C");
  assertStrictEquals(BigIntType.toString(13n, op), "D");
  assertStrictEquals(BigIntType.toString(14n, op), "E");
  assertStrictEquals(BigIntType.toString(15n, op), "F");
  assertStrictEquals(BigIntType.toString(16n, op), "10");
});

Deno.test("BigIntType.toString() - radix:unknown", () => {
  const op = { radix: 3 as 2 } as const;

  assertThrows(
    () => {
      BigIntType.toString(-1n, op);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
  // assertStrictEquals(BigIntType.toString(-1n, op), "-1");
  // assertStrictEquals(BigIntType.toString(-0n, op), "0");
  // assertStrictEquals(BigIntType.toString(0n, op), "0");
  // assertStrictEquals(BigIntType.toString(1n, op), "1");

  // assertStrictEquals(BigIntType.toString(1111n, op), "1111");

  // assertStrictEquals(BigIntType.toString(2n, op), "2");
  // assertStrictEquals(BigIntType.toString(3n, op), "3");
  // assertStrictEquals(BigIntType.toString(4n, op), "4");
  // assertStrictEquals(BigIntType.toString(5n, op), "5");
  // assertStrictEquals(BigIntType.toString(6n, op), "6");
  // assertStrictEquals(BigIntType.toString(7n, op), "7");
  // assertStrictEquals(BigIntType.toString(8n, op), "8");
  // assertStrictEquals(BigIntType.toString(9n, op), "9");
  // assertStrictEquals(BigIntType.toString(10n, op), "10");
  // assertStrictEquals(BigIntType.toString(11n, op), "11");
  // assertStrictEquals(BigIntType.toString(12n, op), "12");
  // assertStrictEquals(BigIntType.toString(13n, op), "13");
  // assertStrictEquals(BigIntType.toString(14n, op), "14");
  // assertStrictEquals(BigIntType.toString(15n, op), "15");
  // assertStrictEquals(BigIntType.toString(16n, op), "16");
});

Deno.test("BigIntType.fromNumber()", () => {
  const rfe1 = "`value` must be a `number`.";
  const rfe2 = "`value` must not be `NaN`.";

  assertThrows(
    () => {
      BigIntType.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigIntType.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigIntType.fromNumber(Number.NaN);
    },
    TypeError,
    rfe2,
  );

  assertStrictEquals(
    BigIntType.fromNumber(Number.POSITIVE_INFINITY),
    BigInt(SIMAX),
  );
  assertStrictEquals(
    BigIntType.fromNumber(Number.NEGATIVE_INFINITY),
    BigInt(SIMIN),
  );

  // assertThrows(
  //   () => {
  //     BigIntType.fromNumber(Number.POSITIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  // assertThrows(
  //   () => {
  //     BigIntType.fromNumber(Number.NEGATIVE_INFINITY, ope);
  //   },
  //   TypeError,
  //   rfe3,
  // );

  assertStrictEquals(BigIntType.fromNumber(0.5), 0n);

  assertStrictEquals(BigIntType.fromNumber(-1), -1n);
  assertStrictEquals(BigIntType.fromNumber(-0), 0n);
  assertStrictEquals(BigIntType.fromNumber(0), 0n);
  assertStrictEquals(BigIntType.fromNumber(1), 1n);

  assertStrictEquals(BigIntType.fromNumber(SIMAX), BigInt(SIMAX));
  assertStrictEquals(BigIntType.fromNumber(SIMIN), BigInt(SIMIN));
});
