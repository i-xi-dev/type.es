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
