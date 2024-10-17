import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { Type } from "../mod.ts";

const { assertBigInt, isBigInt } = Type;

Deno.test("assertBigInt()", () => {
  try {
    assertBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("isBigInt()", () => {
  assertStrictEquals(isBigInt(0), false);
  assertStrictEquals(isBigInt(-0), false);
  assertStrictEquals(isBigInt(1), false);
  assertStrictEquals(isBigInt(-1), false);

  assertStrictEquals(isBigInt(-10.1), false);
  assertStrictEquals(isBigInt(-9.9), false);
  assertStrictEquals(isBigInt(9.9), false);
  assertStrictEquals(isBigInt(10.1), false);

  assertStrictEquals(isBigInt(0n), true);
  assertStrictEquals(isBigInt(-0n), true);
  assertStrictEquals(isBigInt(1n), true);
  assertStrictEquals(isBigInt(-1n), true);

  assertStrictEquals(isBigInt(Number.NaN), false);
  assertStrictEquals(isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isBigInt(undefined), false);
  assertStrictEquals(isBigInt(null), false);
  assertStrictEquals(isBigInt(true), false);
  assertStrictEquals(isBigInt(false), false);
  assertStrictEquals(isBigInt(""), false);
  assertStrictEquals(isBigInt("0"), false);
});
