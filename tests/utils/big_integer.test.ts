import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
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
