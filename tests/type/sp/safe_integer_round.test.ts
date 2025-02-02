import { assertStrictEquals, assertThrows } from "@std/assert";
import { RoundingMode, SafeInteger } from "../../../mod.ts";

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeInteger.round()", () => {
  const rfe1 = "`value` must be a finite number.";

  assertThrows(
    () => {
      SafeInteger.round(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.round(-1), -1);
  assertStrictEquals(SafeInteger.round(-0), 0);
  assertStrictEquals(Object.is(SafeInteger.round(-0), 0), true);
  assertStrictEquals(SafeInteger.round(0), 0);
  assertStrictEquals(SafeInteger.round(1), 1);

  assertStrictEquals(SafeInteger.round(MAX), MAX);
  assertStrictEquals(SafeInteger.round(MIN), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5), -8);
  assertStrictEquals(SafeInteger.round(-7.5), -7);
  assertStrictEquals(SafeInteger.round(-6.5), -6);
  assertStrictEquals(SafeInteger.round(-5.5), -5);
  assertStrictEquals(SafeInteger.round(-4.5), -4);
  assertStrictEquals(SafeInteger.round(-3.5), -3);
  assertStrictEquals(SafeInteger.round(-2.5), -2);

  assertStrictEquals(SafeInteger.round(-1.9), -1);
  assertStrictEquals(SafeInteger.round(-1.6), -1);
  assertStrictEquals(SafeInteger.round(-1.55), -1);
  assertStrictEquals(SafeInteger.round(-1.5), -1);
  assertStrictEquals(SafeInteger.round(-1.45), -1);
  assertStrictEquals(SafeInteger.round(-1.4), -1);
  assertStrictEquals(SafeInteger.round(-1.1), -1);

  assertStrictEquals(SafeInteger.round(-0.9), 0);
  assertStrictEquals(SafeInteger.round(-0.6), 0);
  assertStrictEquals(SafeInteger.round(-0.55), 0);
  assertStrictEquals(SafeInteger.round(-0.5), 0);
  assertStrictEquals(SafeInteger.round(-0.45), 0);
  assertStrictEquals(SafeInteger.round(-0.4), 0);
  assertStrictEquals(SafeInteger.round(-0.1), 0);

  assertStrictEquals(SafeInteger.round(0.1), 0);
  assertStrictEquals(SafeInteger.round(0.4), 0);
  assertStrictEquals(SafeInteger.round(0.45), 0);
  assertStrictEquals(SafeInteger.round(0.5), 0);
  assertStrictEquals(SafeInteger.round(0.55), 0);
  assertStrictEquals(SafeInteger.round(0.6), 0);
  assertStrictEquals(SafeInteger.round(0.9), 0);

  assertStrictEquals(SafeInteger.round(1.1), 1);
  assertStrictEquals(SafeInteger.round(1.4), 1);
  assertStrictEquals(SafeInteger.round(1.45), 1);
  assertStrictEquals(SafeInteger.round(1.5), 1);
  assertStrictEquals(SafeInteger.round(1.55), 1);
  assertStrictEquals(SafeInteger.round(1.6), 1);
  assertStrictEquals(SafeInteger.round(1.9), 1);

  assertStrictEquals(SafeInteger.round(2.5), 2);
  assertStrictEquals(SafeInteger.round(3.5), 3);
  assertStrictEquals(SafeInteger.round(4.5), 4);
  assertStrictEquals(SafeInteger.round(5.5), 5);
  assertStrictEquals(SafeInteger.round(6.5), 6);
  assertStrictEquals(SafeInteger.round(7.5), 7);
  assertStrictEquals(SafeInteger.round(8.5), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:UP", () => {
  const op = RoundingMode.UP;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 1);
  assertStrictEquals(SafeInteger.round(0.4, op), 1);
  assertStrictEquals(SafeInteger.round(0.45, op), 1);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 2);
  assertStrictEquals(SafeInteger.round(1.4, op), 2);
  assertStrictEquals(SafeInteger.round(1.45, op), 2);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:CEILING", () => {
  const op = RoundingMode.CEILING;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 1);
  assertStrictEquals(SafeInteger.round(0.4, op), 1);
  assertStrictEquals(SafeInteger.round(0.45, op), 1);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 2);
  assertStrictEquals(SafeInteger.round(1.4, op), 2);
  assertStrictEquals(SafeInteger.round(1.45, op), 2);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:DOWN", () => {
  const op = RoundingMode.DOWN;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -2);
  assertStrictEquals(SafeInteger.round(-1.4, op), -2);
  assertStrictEquals(SafeInteger.round(-1.1, op), -2);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:FLOOR", () => {
  const op = RoundingMode.FLOOR;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -2);
  assertStrictEquals(SafeInteger.round(-1.4, op), -2);
  assertStrictEquals(SafeInteger.round(-1.1, op), -2);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:TOWARD_ZERO", () => {
  const op = RoundingMode.TOWARD_ZERO;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:TRUNCATE", () => {
  const op = RoundingMode.TRUNCATE;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:AWAY_FROM_ZERO", () => {
  const op = RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -2);
  assertStrictEquals(SafeInteger.round(-1.4, op), -2);
  assertStrictEquals(SafeInteger.round(-1.1, op), -2);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 1);
  assertStrictEquals(SafeInteger.round(0.4, op), 1);
  assertStrictEquals(SafeInteger.round(0.45, op), 1);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 2);
  assertStrictEquals(SafeInteger.round(1.4, op), 2);
  assertStrictEquals(SafeInteger.round(1.45, op), 2);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:HALF_UP", () => {
  const op = RoundingMode.HALF_UP;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:HALF_DOWN", () => {
  const op = RoundingMode.HALF_DOWN;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:HALF_TOWARD_ZERO", () => {
  const op = RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:HALF_AWAY_FROM_ZERO", () => {
  const op = RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:ROUND", () => {
  const op = RoundingMode.ROUND;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:HALF_TO_EVEN", () => {
  const op = RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:CONVERGENT", () => {
  const op = RoundingMode.CONVERGENT;

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("SafeInteger.round() - roundingMode:unknown", () => {
  // roundingMode:TRUNCATE として処理する
  const op = "hoge" as "up";

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -8);
  assertStrictEquals(SafeInteger.round(-7.5, op), -7);
  assertStrictEquals(SafeInteger.round(-6.5, op), -6);
  assertStrictEquals(SafeInteger.round(-5.5, op), -5);
  assertStrictEquals(SafeInteger.round(-4.5, op), -4);
  assertStrictEquals(SafeInteger.round(-3.5, op), -3);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);

  assertStrictEquals(SafeInteger.round(-1.9, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});
