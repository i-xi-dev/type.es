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
