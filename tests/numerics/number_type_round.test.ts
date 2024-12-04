import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { NumberType } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("NumberType.round()", () => {
  const rfe1 = "`value` must be a finite number.";

  assertThrows(
    () => {
      NumberType.round(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      NumberType.round(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      NumberType.round(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      NumberType.round(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      NumberType.round(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(NumberType.round(-1), -1);
  assertStrictEquals(NumberType.round(-0), 0);
  assertStrictEquals(Object.is(NumberType.round(-0), 0), true);
  assertStrictEquals(NumberType.round(0), 0);
  assertStrictEquals(NumberType.round(1), 1);

  assertStrictEquals(NumberType.round(MAX), MAX);
  assertStrictEquals(NumberType.round(MIN), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5), -8);
  assertStrictEquals(NumberType.round(-7.5), -7);
  assertStrictEquals(NumberType.round(-6.5), -6);
  assertStrictEquals(NumberType.round(-5.5), -5);
  assertStrictEquals(NumberType.round(-4.5), -4);
  assertStrictEquals(NumberType.round(-3.5), -3);
  assertStrictEquals(NumberType.round(-2.5), -2);

  assertStrictEquals(NumberType.round(-1.9), -1);
  assertStrictEquals(NumberType.round(-1.6), -1);
  assertStrictEquals(NumberType.round(-1.55), -1);
  assertStrictEquals(NumberType.round(-1.5), -1);
  assertStrictEquals(NumberType.round(-1.45), -1);
  assertStrictEquals(NumberType.round(-1.4), -1);
  assertStrictEquals(NumberType.round(-1.1), -1);

  assertStrictEquals(NumberType.round(-0.9), 0);
  assertStrictEquals(NumberType.round(-0.6), 0);
  assertStrictEquals(NumberType.round(-0.55), 0);
  assertStrictEquals(NumberType.round(-0.5), 0);
  assertStrictEquals(NumberType.round(-0.45), 0);
  assertStrictEquals(NumberType.round(-0.4), 0);
  assertStrictEquals(NumberType.round(-0.1), 0);

  assertStrictEquals(NumberType.round(0.1), 0);
  assertStrictEquals(NumberType.round(0.4), 0);
  assertStrictEquals(NumberType.round(0.45), 0);
  assertStrictEquals(NumberType.round(0.5), 0);
  assertStrictEquals(NumberType.round(0.55), 0);
  assertStrictEquals(NumberType.round(0.6), 0);
  assertStrictEquals(NumberType.round(0.9), 0);

  assertStrictEquals(NumberType.round(1.1), 1);
  assertStrictEquals(NumberType.round(1.4), 1);
  assertStrictEquals(NumberType.round(1.45), 1);
  assertStrictEquals(NumberType.round(1.5), 1);
  assertStrictEquals(NumberType.round(1.55), 1);
  assertStrictEquals(NumberType.round(1.6), 1);
  assertStrictEquals(NumberType.round(1.9), 1);

  assertStrictEquals(NumberType.round(2.5), 2);
  assertStrictEquals(NumberType.round(3.5), 3);
  assertStrictEquals(NumberType.round(4.5), 4);
  assertStrictEquals(NumberType.round(5.5), 5);
  assertStrictEquals(NumberType.round(6.5), 6);
  assertStrictEquals(NumberType.round(7.5), 7);
  assertStrictEquals(NumberType.round(8.5), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:UP", () => {
  const op = Numerics.RoundingMode.UP;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -1);
  assertStrictEquals(NumberType.round(-1.6, op), -1);
  assertStrictEquals(NumberType.round(-1.55, op), -1);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), 0);
  assertStrictEquals(NumberType.round(-0.6, op), 0);
  assertStrictEquals(NumberType.round(-0.55, op), 0);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 1);
  assertStrictEquals(NumberType.round(0.4, op), 1);
  assertStrictEquals(NumberType.round(0.45, op), 1);
  assertStrictEquals(NumberType.round(0.5, op), 1);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 2);
  assertStrictEquals(NumberType.round(1.4, op), 2);
  assertStrictEquals(NumberType.round(1.45, op), 2);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 3);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 5);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 7);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:CEILING", () => {
  const op = Numerics.RoundingMode.CEILING;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -1);
  assertStrictEquals(NumberType.round(-1.6, op), -1);
  assertStrictEquals(NumberType.round(-1.55, op), -1);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), 0);
  assertStrictEquals(NumberType.round(-0.6, op), 0);
  assertStrictEquals(NumberType.round(-0.55, op), 0);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 1);
  assertStrictEquals(NumberType.round(0.4, op), 1);
  assertStrictEquals(NumberType.round(0.45, op), 1);
  assertStrictEquals(NumberType.round(0.5, op), 1);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 2);
  assertStrictEquals(NumberType.round(1.4, op), 2);
  assertStrictEquals(NumberType.round(1.45, op), 2);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 3);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 5);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 7);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:DOWN", () => {
  const op = Numerics.RoundingMode.DOWN;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -9);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -7);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -5);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -3);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -2);
  assertStrictEquals(NumberType.round(-1.4, op), -2);
  assertStrictEquals(NumberType.round(-1.1, op), -2);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), -1);
  assertStrictEquals(NumberType.round(-0.45, op), -1);
  assertStrictEquals(NumberType.round(-0.4, op), -1);
  assertStrictEquals(NumberType.round(-0.1, op), -1);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 0);
  assertStrictEquals(NumberType.round(0.6, op), 0);
  assertStrictEquals(NumberType.round(0.9, op), 0);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 1);
  assertStrictEquals(NumberType.round(1.6, op), 1);
  assertStrictEquals(NumberType.round(1.9, op), 1);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:FLOOR", () => {
  const op = Numerics.RoundingMode.FLOOR;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -9);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -7);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -5);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -3);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -2);
  assertStrictEquals(NumberType.round(-1.4, op), -2);
  assertStrictEquals(NumberType.round(-1.1, op), -2);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), -1);
  assertStrictEquals(NumberType.round(-0.45, op), -1);
  assertStrictEquals(NumberType.round(-0.4, op), -1);
  assertStrictEquals(NumberType.round(-0.1, op), -1);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 0);
  assertStrictEquals(NumberType.round(0.6, op), 0);
  assertStrictEquals(NumberType.round(0.9, op), 0);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 1);
  assertStrictEquals(NumberType.round(1.6, op), 1);
  assertStrictEquals(NumberType.round(1.9, op), 1);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:TOWARD_ZERO", () => {
  const op = Numerics.RoundingMode.TOWARD_ZERO;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -1);
  assertStrictEquals(NumberType.round(-1.6, op), -1);
  assertStrictEquals(NumberType.round(-1.55, op), -1);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), 0);
  assertStrictEquals(NumberType.round(-0.6, op), 0);
  assertStrictEquals(NumberType.round(-0.55, op), 0);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 0);
  assertStrictEquals(NumberType.round(0.6, op), 0);
  assertStrictEquals(NumberType.round(0.9, op), 0);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 1);
  assertStrictEquals(NumberType.round(1.6, op), 1);
  assertStrictEquals(NumberType.round(1.9, op), 1);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:TRUNCATE", () => {
  const op = Numerics.RoundingMode.TRUNCATE;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -1);
  assertStrictEquals(NumberType.round(-1.6, op), -1);
  assertStrictEquals(NumberType.round(-1.55, op), -1);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), 0);
  assertStrictEquals(NumberType.round(-0.6, op), 0);
  assertStrictEquals(NumberType.round(-0.55, op), 0);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 0);
  assertStrictEquals(NumberType.round(0.6, op), 0);
  assertStrictEquals(NumberType.round(0.9, op), 0);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 1);
  assertStrictEquals(NumberType.round(1.6, op), 1);
  assertStrictEquals(NumberType.round(1.9, op), 1);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:AWAY_FROM_ZERO", () => {
  const op = Numerics.RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -9);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -7);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -5);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -3);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -2);
  assertStrictEquals(NumberType.round(-1.4, op), -2);
  assertStrictEquals(NumberType.round(-1.1, op), -2);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), -1);
  assertStrictEquals(NumberType.round(-0.45, op), -1);
  assertStrictEquals(NumberType.round(-0.4, op), -1);
  assertStrictEquals(NumberType.round(-0.1, op), -1);

  assertStrictEquals(NumberType.round(0.1, op), 1);
  assertStrictEquals(NumberType.round(0.4, op), 1);
  assertStrictEquals(NumberType.round(0.45, op), 1);
  assertStrictEquals(NumberType.round(0.5, op), 1);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 2);
  assertStrictEquals(NumberType.round(1.4, op), 2);
  assertStrictEquals(NumberType.round(1.45, op), 2);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 3);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 5);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 7);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:HALF_UP", () => {
  const op = Numerics.RoundingMode.HALF_UP;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 1);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 3);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 5);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 7);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:HALF_DOWN", () => {
  const op = Numerics.RoundingMode.HALF_DOWN;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -9);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -7);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -5);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -3);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), -1);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:HALF_TOWARD_ZERO", () => {
  const op = Numerics.RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:HALF_AWAY_FROM_ZERO", () => {
  const op = Numerics.RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -9);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -7);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -5);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -3);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), -1);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 1);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 3);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 5);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 7);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:ROUND", () => {
  const op = Numerics.RoundingMode.ROUND;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -9);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -7);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -5);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -3);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), -1);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 1);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 3);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 5);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 7);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:HALF_TO_EVEN", () => {
  const op = Numerics.RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:CONVERGENT", () => {
  const op = Numerics.RoundingMode.CONVERGENT;

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -8);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -6);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -4);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -2);
  assertStrictEquals(NumberType.round(-1.6, op), -2);
  assertStrictEquals(NumberType.round(-1.55, op), -2);
  assertStrictEquals(NumberType.round(-1.5, op), -2);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), -1);
  assertStrictEquals(NumberType.round(-0.6, op), -1);
  assertStrictEquals(NumberType.round(-0.55, op), -1);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 1);
  assertStrictEquals(NumberType.round(0.6, op), 1);
  assertStrictEquals(NumberType.round(0.9, op), 1);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 2);
  assertStrictEquals(NumberType.round(1.55, op), 2);
  assertStrictEquals(NumberType.round(1.6, op), 2);
  assertStrictEquals(NumberType.round(1.9, op), 2);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 4);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 6);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 8);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("NumberType.round() - roundingMode:unknown", () => {
  // roundingMode:TRUNCATE として処理する
  const op = "hoge" as "up";

  assertStrictEquals(NumberType.round(-1, op), -1);
  assertStrictEquals(NumberType.round(-0, op), 0);
  assertStrictEquals(NumberType.round(0, op), 0);
  assertStrictEquals(NumberType.round(1, op), 1);

  assertStrictEquals(NumberType.round(MAX, op), MAX);
  assertStrictEquals(NumberType.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(NumberType.round(MIN + 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.1, op), MIN);
  assertStrictEquals(NumberType.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(NumberType.round(-8.5, op), -8);
  assertStrictEquals(NumberType.round(-7.5, op), -7);
  assertStrictEquals(NumberType.round(-6.5, op), -6);
  assertStrictEquals(NumberType.round(-5.5, op), -5);
  assertStrictEquals(NumberType.round(-4.5, op), -4);
  assertStrictEquals(NumberType.round(-3.5, op), -3);
  assertStrictEquals(NumberType.round(-2.5, op), -2);

  assertStrictEquals(NumberType.round(-1.9, op), -1);
  assertStrictEquals(NumberType.round(-1.6, op), -1);
  assertStrictEquals(NumberType.round(-1.55, op), -1);
  assertStrictEquals(NumberType.round(-1.5, op), -1);
  assertStrictEquals(NumberType.round(-1.45, op), -1);
  assertStrictEquals(NumberType.round(-1.4, op), -1);
  assertStrictEquals(NumberType.round(-1.1, op), -1);

  assertStrictEquals(NumberType.round(-0.9, op), 0);
  assertStrictEquals(NumberType.round(-0.6, op), 0);
  assertStrictEquals(NumberType.round(-0.55, op), 0);
  assertStrictEquals(NumberType.round(-0.5, op), 0);
  assertStrictEquals(NumberType.round(-0.45, op), 0);
  assertStrictEquals(NumberType.round(-0.4, op), 0);
  assertStrictEquals(NumberType.round(-0.1, op), 0);

  assertStrictEquals(NumberType.round(0.1, op), 0);
  assertStrictEquals(NumberType.round(0.4, op), 0);
  assertStrictEquals(NumberType.round(0.45, op), 0);
  assertStrictEquals(NumberType.round(0.5, op), 0);
  assertStrictEquals(NumberType.round(0.55, op), 0);
  assertStrictEquals(NumberType.round(0.6, op), 0);
  assertStrictEquals(NumberType.round(0.9, op), 0);

  assertStrictEquals(NumberType.round(1.1, op), 1);
  assertStrictEquals(NumberType.round(1.4, op), 1);
  assertStrictEquals(NumberType.round(1.45, op), 1);
  assertStrictEquals(NumberType.round(1.5, op), 1);
  assertStrictEquals(NumberType.round(1.55, op), 1);
  assertStrictEquals(NumberType.round(1.6, op), 1);
  assertStrictEquals(NumberType.round(1.9, op), 1);

  assertStrictEquals(NumberType.round(2.5, op), 2);
  assertStrictEquals(NumberType.round(3.5, op), 3);
  assertStrictEquals(NumberType.round(4.5, op), 4);
  assertStrictEquals(NumberType.round(5.5, op), 5);
  assertStrictEquals(NumberType.round(6.5, op), 6);
  assertStrictEquals(NumberType.round(7.5, op), 7);
  assertStrictEquals(NumberType.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(NumberType.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(NumberType.round(MAX - 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.1, op), MAX);
  assertStrictEquals(NumberType.round(MAX + 0.9, op), MAX + 1);
  // <<<
});
