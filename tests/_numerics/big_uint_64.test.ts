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

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(BigUint64.fromNumber(-1, op2), 0xFFFFFFFFFFFFFFFFn);
  assertStrictEquals(BigUint64.fromNumber(64, op2), 64n);
  assertStrictEquals(BigUint64.fromNumber(65, op2), 65n);
  assertStrictEquals(BigUint64.fromNumber(128, op2), 128n);
  assertStrictEquals(BigUint64.fromNumber(129, op2), 129n);
  assertStrictEquals(BigUint64.fromNumber(256, op2), 256n);
  assertStrictEquals(BigUint64.fromNumber(257, op2), 257n);
  assertStrictEquals(BigUint64.fromNumber(512, op2), 512n);
  assertStrictEquals(BigUint64.fromNumber(513, op2), 513n);
  assertStrictEquals(BigUint64.fromNumber(65535, op2), 65535n);
  assertStrictEquals(BigUint64.fromNumber(65536, op2), 65536n);
  assertStrictEquals(BigUint64.fromNumber(131071, op2), 131071n);
  assertStrictEquals(BigUint64.fromNumber(131072, op2), 131072n);
  assertStrictEquals(BigUint64.fromNumber(16777215, op2), 16777215n);
  assertStrictEquals(BigUint64.fromNumber(16777216, op2), 16777216n);
  assertStrictEquals(BigUint64.fromNumber(33554431, op2), 33554431n);
  assertStrictEquals(BigUint64.fromNumber(33554432, op2), 33554432n);
  assertStrictEquals(BigUint64.fromNumber(4294967295, op2), 4294967295n);
  assertStrictEquals(BigUint64.fromNumber(4294967296, op2), 4294967296n);
  assertStrictEquals(BigUint64.fromNumber(8589934591, op2), 8589934591n);
  assertStrictEquals(BigUint64.fromNumber(8589934592, op2), 8589934592n);
});

Deno.test("BigUint64.toNumber()", () => {
  assertStrictEquals(BigUint64.toNumber(0n), 0);
  assertStrictEquals(BigUint64.toNumber(-0n), 0);
  assertStrictEquals(Object.is(BigUint64.toNumber(-0n), 0), true);
  // assertStrictEquals(BigUint64.toNumber(0xFFFFFFFFFFFFFFFFn), 0xFFFFFFFFFFFFFFFF);
  assertStrictEquals(
    BigUint64.toNumber(BigInt(Number.MAX_SAFE_INTEGER)),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toNumber(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );

  const e2 = "`self` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      BigUint64.toNumber(0xFFFFFFFFFFFFFFFFn);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.fromBigInt()", () => {
  assertStrictEquals(BigUint64.fromBigInt(0n), 0n);
  assertStrictEquals(Object.is(BigUint64.fromBigInt(-0n), 0n), true);
  assertStrictEquals(BigUint64.fromBigInt(1n), 1n);
  assertStrictEquals(BigUint64.fromBigInt(63n), 63n);
  assertStrictEquals(BigUint64.fromBigInt(64n), 64n);
  assertStrictEquals(BigUint64.fromBigInt(127n), 127n);
  assertStrictEquals(BigUint64.fromBigInt(128n), 128n);
  assertStrictEquals(BigUint64.fromBigInt(255n), 255n);
  assertStrictEquals(BigUint64.fromBigInt(256n), 256n);
  assertStrictEquals(BigUint64.fromBigInt(65535n), 65535n);
  assertStrictEquals(BigUint64.fromBigInt(65536n), 65536n);
  assertStrictEquals(BigUint64.fromBigInt(16777215n), 16777215n);
  assertStrictEquals(BigUint64.fromBigInt(16777216n), 16777216n);
  assertStrictEquals(BigUint64.fromBigInt(4294967295n), 4294967295n);
  assertStrictEquals(
    BigUint64.fromBigInt(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBigInt(0x1_0000_0000_0000_0000n),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(BigUint64.fromBigInt(-1n), 0n);

  assertStrictEquals(BigUint64.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0n);
  assertStrictEquals(
    BigUint64.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  const e1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigUint64.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );
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

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(BigUint64.fromBigInt(-1n, op2), 0xFFFF_FFFF_FFFF_FFFFn);
  assertStrictEquals(BigUint64.fromBigInt(64n, op2), 64n);
  assertStrictEquals(BigUint64.fromBigInt(65n, op2), 65n);
  assertStrictEquals(BigUint64.fromBigInt(128n, op2), 128n);
  assertStrictEquals(BigUint64.fromBigInt(129n, op2), 129n);
  assertStrictEquals(BigUint64.fromBigInt(256n, op2), 256n);
  assertStrictEquals(BigUint64.fromBigInt(257n, op2), 257n);
  assertStrictEquals(BigUint64.fromBigInt(512n, op2), 512n);
  assertStrictEquals(BigUint64.fromBigInt(513n, op2), 513n);
  assertStrictEquals(BigUint64.fromBigInt(65535n, op2), 65535n);
  assertStrictEquals(BigUint64.fromBigInt(65536n, op2), 65536n);
  assertStrictEquals(BigUint64.fromBigInt(65537n, op2), 65537n);
  assertStrictEquals(BigUint64.fromBigInt(131071n, op2), 131071n);
  assertStrictEquals(BigUint64.fromBigInt(131072n, op2), 131072n);
  assertStrictEquals(BigUint64.fromBigInt(16777215n, op2), 16777215n);
  assertStrictEquals(BigUint64.fromBigInt(16777216n, op2), 16777216n);
  assertStrictEquals(BigUint64.fromBigInt(4294967295n, op2), 4294967295n);
  assertStrictEquals(BigUint64.fromBigInt(4294967296n, op2), 4294967296n);
  assertStrictEquals(
    BigUint64.fromBigInt(0xFFFF_FFFF_FFFF_FFFFn, op2),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(BigUint64.fromBigInt(0x1_0000_0000_0000_0000n, op2), 0n);
});

Deno.test("BigUint64.toBigInt()", () => {
  assertStrictEquals(BigUint64.toBigInt(0n), 0n);
  assertStrictEquals(BigUint64.toBigInt(-0n), 0n);
  assertStrictEquals(
    BigUint64.toBigInt(0xFFFFFFFFFFFFFFFFn),
    0xFFFFFFFFFFFFFFFFn,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toBigInt(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBigInt(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBigInt(undefined as unknown as bigint);
    },
    TypeError,
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

Deno.test("BigUint64.toString()", () => {
  assertStrictEquals(BigUint64.toString(0n), "0");
  assertStrictEquals(BigUint64.toString(-0n), "0");
  assertStrictEquals(BigUint64.toString(1n), "1");
  assertStrictEquals(BigUint64.toString(63n), "63");
  assertStrictEquals(BigUint64.toString(127n), "127");
  assertStrictEquals(BigUint64.toString(255n), "255");
  assertStrictEquals(BigUint64.toString(65535n), "65535");
  assertStrictEquals(BigUint64.toString(16777215n), "16777215");
  assertStrictEquals(BigUint64.toString(4294967295n), "4294967295");
  assertStrictEquals(
    BigUint64.toString(18446744073709551615n),
    "18446744073709551615",
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toString(0x10000000000000000n);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(BigUint64.toString(0n, op16), "0");
  assertStrictEquals(BigUint64.toString(63n, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(BigUint64.toString(0n, op16l), "0");
  assertStrictEquals(BigUint64.toString(63n, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(BigUint64.toString(0n, op16l2), "00");
  assertStrictEquals(BigUint64.toString(63n, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(BigUint64.toString(0n, op16u3), "000");
  assertStrictEquals(BigUint64.toString(63n, op16u3), "03F");
});
