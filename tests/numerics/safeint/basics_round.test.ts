import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { RoundingMode, SafeInt } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.SafeInt.round()", () => {
  const rfe1 = "`value` must be a finite number.";

  assertThrows(
    () => {
      SafeInt.round(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.round(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.round(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.round(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInt.round(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInt.round(-1), -1);
  assertStrictEquals(SafeInt.round(-0), 0);
  assertStrictEquals(Object.is(SafeInt.round(-0), 0), true);
  assertStrictEquals(SafeInt.round(0), 0);
  assertStrictEquals(SafeInt.round(1), 1);

  assertStrictEquals(SafeInt.round(MAX), MAX);
  assertStrictEquals(SafeInt.round(MIN), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5), -8);
  assertStrictEquals(SafeInt.round(-7.5), -7);
  assertStrictEquals(SafeInt.round(-6.5), -6);
  assertStrictEquals(SafeInt.round(-5.5), -5);
  assertStrictEquals(SafeInt.round(-4.5), -4);
  assertStrictEquals(SafeInt.round(-3.5), -3);
  assertStrictEquals(SafeInt.round(-2.5), -2);

  assertStrictEquals(SafeInt.round(-1.9), -1);
  assertStrictEquals(SafeInt.round(-1.6), -1);
  assertStrictEquals(SafeInt.round(-1.55), -1);
  assertStrictEquals(SafeInt.round(-1.5), -1);
  assertStrictEquals(SafeInt.round(-1.45), -1);
  assertStrictEquals(SafeInt.round(-1.4), -1);
  assertStrictEquals(SafeInt.round(-1.1), -1);

  assertStrictEquals(SafeInt.round(-0.9), 0);
  assertStrictEquals(SafeInt.round(-0.6), 0);
  assertStrictEquals(SafeInt.round(-0.55), 0);
  assertStrictEquals(SafeInt.round(-0.5), 0);
  assertStrictEquals(SafeInt.round(-0.45), 0);
  assertStrictEquals(SafeInt.round(-0.4), 0);
  assertStrictEquals(SafeInt.round(-0.1), 0);

  assertStrictEquals(SafeInt.round(0.1), 0);
  assertStrictEquals(SafeInt.round(0.4), 0);
  assertStrictEquals(SafeInt.round(0.45), 0);
  assertStrictEquals(SafeInt.round(0.5), 0);
  assertStrictEquals(SafeInt.round(0.55), 0);
  assertStrictEquals(SafeInt.round(0.6), 0);
  assertStrictEquals(SafeInt.round(0.9), 0);

  assertStrictEquals(SafeInt.round(1.1), 1);
  assertStrictEquals(SafeInt.round(1.4), 1);
  assertStrictEquals(SafeInt.round(1.45), 1);
  assertStrictEquals(SafeInt.round(1.5), 1);
  assertStrictEquals(SafeInt.round(1.55), 1);
  assertStrictEquals(SafeInt.round(1.6), 1);
  assertStrictEquals(SafeInt.round(1.9), 1);

  assertStrictEquals(SafeInt.round(2.5), 2);
  assertStrictEquals(SafeInt.round(3.5), 3);
  assertStrictEquals(SafeInt.round(4.5), 4);
  assertStrictEquals(SafeInt.round(5.5), 5);
  assertStrictEquals(SafeInt.round(6.5), 6);
  assertStrictEquals(SafeInt.round(7.5), 7);
  assertStrictEquals(SafeInt.round(8.5), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:UP", () => {
  const op = RoundingMode.UP;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -1);
  assertStrictEquals(SafeInt.round(-1.6, op), -1);
  assertStrictEquals(SafeInt.round(-1.55, op), -1);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), 0);
  assertStrictEquals(SafeInt.round(-0.6, op), 0);
  assertStrictEquals(SafeInt.round(-0.55, op), 0);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 1);
  assertStrictEquals(SafeInt.round(0.4, op), 1);
  assertStrictEquals(SafeInt.round(0.45, op), 1);
  assertStrictEquals(SafeInt.round(0.5, op), 1);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 2);
  assertStrictEquals(SafeInt.round(1.4, op), 2);
  assertStrictEquals(SafeInt.round(1.45, op), 2);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 3);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 5);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 7);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:CEILING", () => {
  const op = RoundingMode.CEILING;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -1);
  assertStrictEquals(SafeInt.round(-1.6, op), -1);
  assertStrictEquals(SafeInt.round(-1.55, op), -1);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), 0);
  assertStrictEquals(SafeInt.round(-0.6, op), 0);
  assertStrictEquals(SafeInt.round(-0.55, op), 0);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 1);
  assertStrictEquals(SafeInt.round(0.4, op), 1);
  assertStrictEquals(SafeInt.round(0.45, op), 1);
  assertStrictEquals(SafeInt.round(0.5, op), 1);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 2);
  assertStrictEquals(SafeInt.round(1.4, op), 2);
  assertStrictEquals(SafeInt.round(1.45, op), 2);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 3);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 5);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 7);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:DOWN", () => {
  const op = RoundingMode.DOWN;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -9);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -7);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -5);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -3);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -2);
  assertStrictEquals(SafeInt.round(-1.4, op), -2);
  assertStrictEquals(SafeInt.round(-1.1, op), -2);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), -1);
  assertStrictEquals(SafeInt.round(-0.45, op), -1);
  assertStrictEquals(SafeInt.round(-0.4, op), -1);
  assertStrictEquals(SafeInt.round(-0.1, op), -1);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 0);
  assertStrictEquals(SafeInt.round(0.6, op), 0);
  assertStrictEquals(SafeInt.round(0.9, op), 0);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 1);
  assertStrictEquals(SafeInt.round(1.6, op), 1);
  assertStrictEquals(SafeInt.round(1.9, op), 1);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:FLOOR", () => {
  const op = RoundingMode.FLOOR;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -9);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -7);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -5);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -3);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -2);
  assertStrictEquals(SafeInt.round(-1.4, op), -2);
  assertStrictEquals(SafeInt.round(-1.1, op), -2);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), -1);
  assertStrictEquals(SafeInt.round(-0.45, op), -1);
  assertStrictEquals(SafeInt.round(-0.4, op), -1);
  assertStrictEquals(SafeInt.round(-0.1, op), -1);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 0);
  assertStrictEquals(SafeInt.round(0.6, op), 0);
  assertStrictEquals(SafeInt.round(0.9, op), 0);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 1);
  assertStrictEquals(SafeInt.round(1.6, op), 1);
  assertStrictEquals(SafeInt.round(1.9, op), 1);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:TOWARD_ZERO", () => {
  const op = RoundingMode.TOWARD_ZERO;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -1);
  assertStrictEquals(SafeInt.round(-1.6, op), -1);
  assertStrictEquals(SafeInt.round(-1.55, op), -1);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), 0);
  assertStrictEquals(SafeInt.round(-0.6, op), 0);
  assertStrictEquals(SafeInt.round(-0.55, op), 0);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 0);
  assertStrictEquals(SafeInt.round(0.6, op), 0);
  assertStrictEquals(SafeInt.round(0.9, op), 0);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 1);
  assertStrictEquals(SafeInt.round(1.6, op), 1);
  assertStrictEquals(SafeInt.round(1.9, op), 1);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:TRUNCATE", () => {
  const op = RoundingMode.TRUNCATE;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -1);
  assertStrictEquals(SafeInt.round(-1.6, op), -1);
  assertStrictEquals(SafeInt.round(-1.55, op), -1);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), 0);
  assertStrictEquals(SafeInt.round(-0.6, op), 0);
  assertStrictEquals(SafeInt.round(-0.55, op), 0);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 0);
  assertStrictEquals(SafeInt.round(0.6, op), 0);
  assertStrictEquals(SafeInt.round(0.9, op), 0);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 1);
  assertStrictEquals(SafeInt.round(1.6, op), 1);
  assertStrictEquals(SafeInt.round(1.9, op), 1);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:AWAY_FROM_ZERO", () => {
  const op = RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -9);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -7);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -5);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -3);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -2);
  assertStrictEquals(SafeInt.round(-1.4, op), -2);
  assertStrictEquals(SafeInt.round(-1.1, op), -2);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), -1);
  assertStrictEquals(SafeInt.round(-0.45, op), -1);
  assertStrictEquals(SafeInt.round(-0.4, op), -1);
  assertStrictEquals(SafeInt.round(-0.1, op), -1);

  assertStrictEquals(SafeInt.round(0.1, op), 1);
  assertStrictEquals(SafeInt.round(0.4, op), 1);
  assertStrictEquals(SafeInt.round(0.45, op), 1);
  assertStrictEquals(SafeInt.round(0.5, op), 1);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 2);
  assertStrictEquals(SafeInt.round(1.4, op), 2);
  assertStrictEquals(SafeInt.round(1.45, op), 2);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 3);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 5);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 7);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:HALF_UP", () => {
  const op = RoundingMode.HALF_UP;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 1);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 3);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 5);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 7);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:HALF_DOWN", () => {
  const op = RoundingMode.HALF_DOWN;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -9);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -7);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -5);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -3);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), -1);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:HALF_TOWARD_ZERO", () => {
  const op = RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:HALF_AWAY_FROM_ZERO", () => {
  const op = RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -9);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -7);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -5);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -3);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), -1);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 1);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 3);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 5);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 7);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:ROUND", () => {
  const op = RoundingMode.ROUND;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -9);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -7);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -5);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -3);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), -1);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 1);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 3);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 5);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 7);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:HALF_TO_EVEN", () => {
  const op = RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:CONVERGENT", () => {
  const op = RoundingMode.CONVERGENT;

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -8);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -6);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -4);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -2);
  assertStrictEquals(SafeInt.round(-1.6, op), -2);
  assertStrictEquals(SafeInt.round(-1.55, op), -2);
  assertStrictEquals(SafeInt.round(-1.5, op), -2);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), -1);
  assertStrictEquals(SafeInt.round(-0.6, op), -1);
  assertStrictEquals(SafeInt.round(-0.55, op), -1);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 1);
  assertStrictEquals(SafeInt.round(0.6, op), 1);
  assertStrictEquals(SafeInt.round(0.9, op), 1);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 2);
  assertStrictEquals(SafeInt.round(1.55, op), 2);
  assertStrictEquals(SafeInt.round(1.6, op), 2);
  assertStrictEquals(SafeInt.round(1.9, op), 2);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 4);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 6);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 8);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInt.round() - roundingMode:unknown", () => {
  // roundingMode:TRUNCATE として処理する
  const op = "hoge" as "up";

  assertStrictEquals(SafeInt.round(-1, op), -1);
  assertStrictEquals(SafeInt.round(-0, op), 0);
  assertStrictEquals(SafeInt.round(0, op), 0);
  assertStrictEquals(SafeInt.round(1, op), 1);

  assertStrictEquals(SafeInt.round(MAX, op), MAX);
  assertStrictEquals(SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInt.round(-8.5, op), -8);
  assertStrictEquals(SafeInt.round(-7.5, op), -7);
  assertStrictEquals(SafeInt.round(-6.5, op), -6);
  assertStrictEquals(SafeInt.round(-5.5, op), -5);
  assertStrictEquals(SafeInt.round(-4.5, op), -4);
  assertStrictEquals(SafeInt.round(-3.5, op), -3);
  assertStrictEquals(SafeInt.round(-2.5, op), -2);

  assertStrictEquals(SafeInt.round(-1.9, op), -1);
  assertStrictEquals(SafeInt.round(-1.6, op), -1);
  assertStrictEquals(SafeInt.round(-1.55, op), -1);
  assertStrictEquals(SafeInt.round(-1.5, op), -1);
  assertStrictEquals(SafeInt.round(-1.45, op), -1);
  assertStrictEquals(SafeInt.round(-1.4, op), -1);
  assertStrictEquals(SafeInt.round(-1.1, op), -1);

  assertStrictEquals(SafeInt.round(-0.9, op), 0);
  assertStrictEquals(SafeInt.round(-0.6, op), 0);
  assertStrictEquals(SafeInt.round(-0.55, op), 0);
  assertStrictEquals(SafeInt.round(-0.5, op), 0);
  assertStrictEquals(SafeInt.round(-0.45, op), 0);
  assertStrictEquals(SafeInt.round(-0.4, op), 0);
  assertStrictEquals(SafeInt.round(-0.1, op), 0);

  assertStrictEquals(SafeInt.round(0.1, op), 0);
  assertStrictEquals(SafeInt.round(0.4, op), 0);
  assertStrictEquals(SafeInt.round(0.45, op), 0);
  assertStrictEquals(SafeInt.round(0.5, op), 0);
  assertStrictEquals(SafeInt.round(0.55, op), 0);
  assertStrictEquals(SafeInt.round(0.6, op), 0);
  assertStrictEquals(SafeInt.round(0.9, op), 0);

  assertStrictEquals(SafeInt.round(1.1, op), 1);
  assertStrictEquals(SafeInt.round(1.4, op), 1);
  assertStrictEquals(SafeInt.round(1.45, op), 1);
  assertStrictEquals(SafeInt.round(1.5, op), 1);
  assertStrictEquals(SafeInt.round(1.55, op), 1);
  assertStrictEquals(SafeInt.round(1.6, op), 1);
  assertStrictEquals(SafeInt.round(1.9, op), 1);

  assertStrictEquals(SafeInt.round(2.5, op), 2);
  assertStrictEquals(SafeInt.round(3.5, op), 3);
  assertStrictEquals(SafeInt.round(4.5, op), 4);
  assertStrictEquals(SafeInt.round(5.5, op), 5);
  assertStrictEquals(SafeInt.round(6.5, op), 6);
  assertStrictEquals(SafeInt.round(7.5, op), 7);
  assertStrictEquals(SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});
