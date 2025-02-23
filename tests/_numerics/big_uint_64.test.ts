import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { BigUint64 } = xNumerics;

Deno.test("BigUint64.fromNumber()", () => {
  // number最大値の方がuint64最大値より小さいのでオーバーフローは起こりえない（アンダーフローは起きる）

  assertStrictEquals(BigUint64.fromNumber(0), 0n);
  assertStrictEquals(Object.is(BigUint64.fromNumber(-0), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(1), 1n);
  assertStrictEquals(BigUint64.fromNumber(63), 63n);
  assertStrictEquals(BigUint64.fromNumber(64), 64n);
  assertStrictEquals(BigUint64.fromNumber(127), 127n);
  assertStrictEquals(BigUint64.fromNumber(128), 128n);
  assertStrictEquals(BigUint64.fromNumber(255), 255n);
  assertStrictEquals(BigUint64.fromNumber(256), 256n);
  assertStrictEquals(BigUint64.fromNumber(65535), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536), 65536n);
  assertStrictEquals(BigUint64.fromNumber(16777215), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(4294967295), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(-1), 0n);

  // assertStrictEquals(BigUint64.fromNumber(Number.NEGATIVE_INFINITY), 0n);
  assertStrictEquals(BigUint64.fromNumber(Number.MIN_SAFE_INTEGER), 0n);
  assertStrictEquals(
    BigUint64.fromNumber(Number.MAX_SAFE_INTEGER),
    BigInt(Number.MAX_SAFE_INTEGER),
  );
  // assertStrictEquals(
  //   BigUint64.fromNumber(Number.POSITIVE_INFINITY),
  //   BigInt(Number.MAX_SAFE_INTEGER),
  // );

  assertStrictEquals(BigUint64.fromNumber(0.1), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.4), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.5), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.6), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.9), 0n);

  assertStrictEquals(Object.is(BigUint64.fromNumber(-0.1), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(-0.4), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.5), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.6), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.9), 0n);

  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.1),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.4),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.5),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.6),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.9),
    9007199254740991n,
  );

  const e1 = "`value` must be a finite `number`.";
  assertThrows(
    () => {
      BigUint64.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      BigUint64.fromNumber(Number.NaN);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigUint64.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(BigUint64.fromNumber(0, op), 0n);
  assertStrictEquals(Object.is(BigUint64.fromNumber(-0, op), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(1, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(63, op), 63n);
  assertStrictEquals(BigUint64.fromNumber(64, op), 64n);
  assertStrictEquals(BigUint64.fromNumber(127, op), 127n);
  assertStrictEquals(BigUint64.fromNumber(128, op), 128n);
  assertStrictEquals(BigUint64.fromNumber(255, op), 255n);
  assertStrictEquals(BigUint64.fromNumber(256, op), 256n);
  assertStrictEquals(BigUint64.fromNumber(65535, op), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536, op), 65536n);
  assertStrictEquals(BigUint64.fromNumber(16777215, op), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216, op), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(4294967295, op), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296, op), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(-1, op), 0n);

  // assertStrictEquals(BigUint64.fromNumber(Number.NEGATIVE_INFINITY, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(Number.MIN_SAFE_INTEGER, op), 0n);
  assertStrictEquals(
    BigUint64.fromNumber(Number.MAX_SAFE_INTEGER, op),
    BigInt(Number.MAX_SAFE_INTEGER),
  );
  // assertStrictEquals(
  //   BigUint64.fromNumber(Number.POSITIVE_INFINITY, op),
  //   BigInt(Number.MAX_SAFE_INTEGER),
  // );

  assertStrictEquals(BigUint64.fromNumber(0.1, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.4, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.5, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.6, op), 1n);
  assertStrictEquals(BigUint64.fromNumber(0.9, op), 1n);

  assertStrictEquals(BigUint64.fromNumber(-0.1, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.4, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.5, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.6, op), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.9, op), 0n);

  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.1, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.4, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.5, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.6, op),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.9, op),
    9007199254740991n,
  );

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(BigUint64.fromNumber(0, op2), 0n);
  assertStrictEquals(Object.is(BigUint64.fromNumber(-0, op2), 0n), true);
  assertStrictEquals(BigUint64.fromNumber(1, op2), 1n);
  assertStrictEquals(BigUint64.fromNumber(63, op2), 63n);
  assertStrictEquals(BigUint64.fromNumber(64, op2), 64n);
  assertStrictEquals(BigUint64.fromNumber(127, op2), 127n);
  assertStrictEquals(BigUint64.fromNumber(128, op2), 128n);
  assertStrictEquals(BigUint64.fromNumber(255, op2), 255n);
  assertStrictEquals(BigUint64.fromNumber(256, op2), 256n);
  assertStrictEquals(BigUint64.fromNumber(65535, op2), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536, op2), 65536n);
  assertStrictEquals(BigUint64.fromNumber(16777215, op2), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216, op2), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(4294967295, op2), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296, op2), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(-1, op2), 0n);

  // assertStrictEquals(BigUint64.fromNumber(Number.NEGATIVE_INFINITY, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0n);
  assertStrictEquals(
    BigUint64.fromNumber(Number.MAX_SAFE_INTEGER, op2),
    BigInt(Number.MAX_SAFE_INTEGER),
  );
  // assertStrictEquals(
  //   BigUint64.fromNumber(Number.POSITIVE_INFINITY, op2),
  //   BigInt(Number.MAX_SAFE_INTEGER),
  // );

  assertStrictEquals(BigUint64.fromNumber(0.1, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.4, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.5, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.6, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(0.9, op2), 0n);

  assertStrictEquals(BigUint64.fromNumber(-0.1, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.4, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.5, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.6, op2), 0n);
  assertStrictEquals(BigUint64.fromNumber(-0.9, op2), 0n);

  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.1, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.4, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.5, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.6, op2),
    9007199254740991n,
  );
  assertStrictEquals(
    BigUint64.fromNumber(9007199254740991.9, op2),
    9007199254740991n,
  );
});

Deno.test("BigUint64.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint64`.";
  assertThrows(
    () => {
      BigUint64.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  // assertThrows(
  //   () => {
  //     BigUint64.fromNumber(x, op);
  //   },
  //   RangeError,
  //   e1,
  // );
});

Deno.test("BigUint64.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint64`.";
  assertThrows(
    () => {
      BigUint64.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromBigInt(0x1_0000_0000_0000_0000n, op);
    },
    RangeError,
    e1,
  );
});

Deno.test("BigUint64.fromString()", () => {
  assertStrictEquals(BigUint64.fromString("0"), 0n);
  assertStrictEquals(BigUint64.fromString("-0"), 0n);
  assertStrictEquals(BigUint64.fromString("1"), 1n);
  assertStrictEquals(BigUint64.fromString("-1"), 0n);
  assertStrictEquals(
    BigUint64.fromString("18446744073709551615"),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("18446744073709551616"),
    18446744073709551615n,
  );

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      BigUint64.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint64`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(BigUint64.fromString("0", op2), 0n);
  assertStrictEquals(
    BigUint64.fromString(
      "0000000000000000000000000000000000000000000000000000000000000000",
      op2,
    ),
    0n,
  );
  assertStrictEquals(
    BigUint64.fromString(
      "1111111111111111111111111111111111111111111111111111111111111111",
      op2,
    ),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString(
      "+01111111111111111111111111111111111111111111111111111111111111111",
      op2,
    ),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      BigUint64.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(BigUint64.fromString("0", op8), 0n);
  assertStrictEquals(BigUint64.fromString("0000000000000000000000", op8), 0n);
  assertStrictEquals(
    BigUint64.fromString("1777777777777777777777", op8),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("+01777777777777777777777", op8),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(BigUint64.fromString("0", op10), 0n);
  assertStrictEquals(BigUint64.fromString("00000000000000000000", op10), 0n);
  assertStrictEquals(
    BigUint64.fromString("18446744073709551615", op10),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("+018446744073709551615", op10),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(BigUint64.fromString("0", op16), 0n);
  assertStrictEquals(BigUint64.fromString("0000000000000000", op16), 0n);
  assertStrictEquals(
    BigUint64.fromString("ffffffffffffffff", op16),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("FFFFFFFFFFFFFFFF", op16),
    18446744073709551615n,
  );
  assertStrictEquals(
    BigUint64.fromString("+0FFFFFFFFFFFFFFFF", op16),
    18446744073709551615n,
  );
  assertThrows(
    () => {
      BigUint64.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});
