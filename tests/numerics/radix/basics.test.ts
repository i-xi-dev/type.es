import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { Radix } = Numerics;

Deno.test("Numerics.Radix.assertSupportedRadix()", () => {
  try {
    Radix.assertSupportedRadix(2, "test");
    Radix.assertSupportedRadix(8, "test");
    Radix.assertSupportedRadix(10, "test");
    Radix.assertSupportedRadix(16, "test");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Radix.assertSupportedRadix(0, "test");
    unreachable();
  } catch {
    //
  }
  try {
    Radix.assertSupportedRadix(1, "test");
    unreachable();
  } catch {
    //
  }
  try {
    Radix.assertSupportedRadix(3, "test");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Numerics.Radix.integerPatternOf()", () => {
  assertStrictEquals(Radix.integerPatternOf(2), "^[01]+$");
  assertStrictEquals(Radix.integerPatternOf(8), "^[0-7]+$");
  assertStrictEquals(Radix.integerPatternOf(10), "^[0-9]+$");
  assertStrictEquals(Radix.integerPatternOf(16), "^[0-9a-fA-F]+$");

  const op = { includesSign: true } as const;
  assertStrictEquals(Radix.integerPatternOf(2, op), "^[-+]?[01]+$");

  assertThrows(
    () => {
      Radix.integerPatternOf(3 as 2);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
});

Deno.test("Numerics.Radix.prefixOf()", () => {
  assertStrictEquals(Radix.prefixOf(2), "0b");
  assertStrictEquals(Radix.prefixOf(8), "0o");
  assertStrictEquals(Radix.prefixOf(10), "");
  assertStrictEquals(Radix.prefixOf(16), "0x");

  assertThrows(
    () => {
      Radix.prefixOf(3 as 2);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );
});
