import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { NumericType } from "../mod.ts";

Deno.test("NumericType.isStringified()", () => {
  assertStrictEquals(NumericType.isStringified("0"), true);
  assertStrictEquals(NumericType.isStringified("-0"), true);
  assertStrictEquals(NumericType.isStringified("+0"), true);
  assertStrictEquals(NumericType.isStringified("-1"), true);
  assertStrictEquals(NumericType.isStringified("+1"), true);

  assertStrictEquals(NumericType.isStringified("2"), true);
  assertStrictEquals(NumericType.isStringified("3"), true);
  assertStrictEquals(NumericType.isStringified("4"), true);
  assertStrictEquals(NumericType.isStringified("5"), true);
  assertStrictEquals(NumericType.isStringified("6"), true);
  assertStrictEquals(NumericType.isStringified("7"), true);
  assertStrictEquals(NumericType.isStringified("8"), true);
  assertStrictEquals(NumericType.isStringified("9"), true);
  assertStrictEquals(NumericType.isStringified("A"), false);
  assertStrictEquals(NumericType.isStringified("b"), false);
  assertStrictEquals(NumericType.isStringified("c"), false);
  assertStrictEquals(NumericType.isStringified("D"), false);
  assertStrictEquals(NumericType.isStringified("e"), false);
  assertStrictEquals(NumericType.isStringified("F"), false);
  assertStrictEquals(NumericType.isStringified("G"), false);
  assertStrictEquals(NumericType.isStringified("10"), true);

  assertStrictEquals(NumericType.isStringified("0.5"), false);
  assertStrictEquals(NumericType.isStringified(0), false);

  assertStrictEquals(NumericType.isStringified(""), false);
  assertStrictEquals(NumericType.isStringified(" "), false);
  assertStrictEquals(NumericType.isStringified("１"), false);

  assertStrictEquals(
    NumericType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
    ),
    true,
  );
});

Deno.test("NumericType.isStringified() - 2", () => {
  assertStrictEquals(NumericType.isStringified("0", 2), true);
  assertStrictEquals(NumericType.isStringified("-0", 2), true);
  assertStrictEquals(NumericType.isStringified("+0", 2), true);
  assertStrictEquals(NumericType.isStringified("-1", 2), true);
  assertStrictEquals(NumericType.isStringified("+1", 2), true);

  assertStrictEquals(NumericType.isStringified("2", 2), false);
  assertStrictEquals(NumericType.isStringified("3", 2), false);
  assertStrictEquals(NumericType.isStringified("4", 2), false);
  assertStrictEquals(NumericType.isStringified("5", 2), false);
  assertStrictEquals(NumericType.isStringified("6", 2), false);
  assertStrictEquals(NumericType.isStringified("7", 2), false);
  assertStrictEquals(NumericType.isStringified("8", 2), false);
  assertStrictEquals(NumericType.isStringified("9", 2), false);
  assertStrictEquals(NumericType.isStringified("A", 2), false);
  assertStrictEquals(NumericType.isStringified("b", 2), false);
  assertStrictEquals(NumericType.isStringified("c", 2), false);
  assertStrictEquals(NumericType.isStringified("D", 2), false);
  assertStrictEquals(NumericType.isStringified("e", 2), false);
  assertStrictEquals(NumericType.isStringified("F", 2), false);
  assertStrictEquals(NumericType.isStringified("G", 2), false);
  assertStrictEquals(NumericType.isStringified("10", 2), true);

  assertStrictEquals(NumericType.isStringified("0.5", 2), false);
  assertStrictEquals(NumericType.isStringified(0, 2), false);

  assertStrictEquals(
    NumericType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      2,
    ),
    true,
  );
});

Deno.test("NumericType.isStringified() - 8", () => {
  assertStrictEquals(NumericType.isStringified("0", 8), true);
  assertStrictEquals(NumericType.isStringified("-0", 8), true);
  assertStrictEquals(NumericType.isStringified("+0", 8), true);
  assertStrictEquals(NumericType.isStringified("-1", 8), true);
  assertStrictEquals(NumericType.isStringified("+1", 8), true);

  assertStrictEquals(NumericType.isStringified("2", 8), true);
  assertStrictEquals(NumericType.isStringified("3", 8), true);
  assertStrictEquals(NumericType.isStringified("4", 8), true);
  assertStrictEquals(NumericType.isStringified("5", 8), true);
  assertStrictEquals(NumericType.isStringified("6", 8), true);
  assertStrictEquals(NumericType.isStringified("7", 8), true);
  assertStrictEquals(NumericType.isStringified("8", 8), false);
  assertStrictEquals(NumericType.isStringified("9", 8), false);
  assertStrictEquals(NumericType.isStringified("A", 8), false);
  assertStrictEquals(NumericType.isStringified("b", 8), false);
  assertStrictEquals(NumericType.isStringified("c", 8), false);
  assertStrictEquals(NumericType.isStringified("D", 8), false);
  assertStrictEquals(NumericType.isStringified("e", 8), false);
  assertStrictEquals(NumericType.isStringified("F", 8), false);
  assertStrictEquals(NumericType.isStringified("G", 8), false);
  assertStrictEquals(NumericType.isStringified("10", 8), true);

  assertStrictEquals(NumericType.isStringified("0.5", 8), false);
  assertStrictEquals(NumericType.isStringified(0, 8), false);

  assertStrictEquals(
    NumericType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      8,
    ),
    true,
  );
});

Deno.test("NumericType.isStringified() - 10", () => {
  assertStrictEquals(NumericType.isStringified("0", 10), true);
  assertStrictEquals(NumericType.isStringified("-0", 10), true);
  assertStrictEquals(NumericType.isStringified("+0", 10), true);
  assertStrictEquals(NumericType.isStringified("-1", 10), true);
  assertStrictEquals(NumericType.isStringified("+1", 10), true);

  assertStrictEquals(NumericType.isStringified("2", 10), true);
  assertStrictEquals(NumericType.isStringified("3", 10), true);
  assertStrictEquals(NumericType.isStringified("4", 10), true);
  assertStrictEquals(NumericType.isStringified("5", 10), true);
  assertStrictEquals(NumericType.isStringified("6", 10), true);
  assertStrictEquals(NumericType.isStringified("7", 10), true);
  assertStrictEquals(NumericType.isStringified("8", 10), true);
  assertStrictEquals(NumericType.isStringified("9", 10), true);
  assertStrictEquals(NumericType.isStringified("A", 10), false);
  assertStrictEquals(NumericType.isStringified("b", 10), false);
  assertStrictEquals(NumericType.isStringified("c", 10), false);
  assertStrictEquals(NumericType.isStringified("D", 10), false);
  assertStrictEquals(NumericType.isStringified("e", 10), false);
  assertStrictEquals(NumericType.isStringified("F", 10), false);
  assertStrictEquals(NumericType.isStringified("G", 10), false);
  assertStrictEquals(NumericType.isStringified("10", 10), true);

  assertStrictEquals(NumericType.isStringified("0.5", 10), false);
  assertStrictEquals(NumericType.isStringified(0, 10), false);

  assertStrictEquals(
    NumericType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      10,
    ),
    true,
  );
});

Deno.test("NumericType.isStringified() - 16", () => {
  assertStrictEquals(NumericType.isStringified("0", 16), true);
  assertStrictEquals(NumericType.isStringified("-0", 16), true);
  assertStrictEquals(NumericType.isStringified("+0", 16), true);
  assertStrictEquals(NumericType.isStringified("-1", 16), true);
  assertStrictEquals(NumericType.isStringified("+1", 16), true);

  assertStrictEquals(NumericType.isStringified("2", 16), true);
  assertStrictEquals(NumericType.isStringified("3", 16), true);
  assertStrictEquals(NumericType.isStringified("4", 16), true);
  assertStrictEquals(NumericType.isStringified("5", 16), true);
  assertStrictEquals(NumericType.isStringified("6", 16), true);
  assertStrictEquals(NumericType.isStringified("7", 16), true);
  assertStrictEquals(NumericType.isStringified("8", 16), true);
  assertStrictEquals(NumericType.isStringified("9", 16), true);
  assertStrictEquals(NumericType.isStringified("A", 16), true);
  assertStrictEquals(NumericType.isStringified("b", 16), true);
  assertStrictEquals(NumericType.isStringified("c", 16), true);
  assertStrictEquals(NumericType.isStringified("D", 16), true);
  assertStrictEquals(NumericType.isStringified("e", 16), true);
  assertStrictEquals(NumericType.isStringified("F", 16), true);
  assertStrictEquals(NumericType.isStringified("G", 16), false);
  assertStrictEquals(NumericType.isStringified("10", 16), true);

  assertStrictEquals(NumericType.isStringified("0.5", 16), false);
  assertStrictEquals(NumericType.isStringified(0, 16), false);

  assertStrictEquals(
    NumericType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      16,
    ),
    true,
  );
});

Deno.test("NumericType.isStringified() - X", () => {
  assertStrictEquals(NumericType.isStringified("0", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("-0", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("+0", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("-1", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("+1", 101 as 2), true);

  assertStrictEquals(NumericType.isStringified("2", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("3", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("4", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("5", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("6", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("7", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("8", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("9", 101 as 2), true);
  assertStrictEquals(NumericType.isStringified("A", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("b", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("c", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("D", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("e", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("F", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("G", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified("10", 101 as 2), true);

  assertStrictEquals(NumericType.isStringified("0.5", 101 as 2), false);
  assertStrictEquals(NumericType.isStringified(0, 101 as 2), false);

  assertStrictEquals(
    NumericType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      101 as 2,
    ),
    true,
  );
});

Deno.test("NumericType.assertStringified()", () => {
  try {
    NumericType.assertStringified("0", "test-1");
    NumericType.assertStringified("1", "test-1");
    NumericType.assertStringified("7", "test-1");
    NumericType.assertStringified("9", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumericType.assertStringified("a", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    NumericType.assertStringified("0", "test-1", 2);
    NumericType.assertStringified("1", "test-1", 2);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumericType.assertStringified("2", "test-1", 2);
    unreachable();
  } catch {
    //
  }

  try {
    NumericType.assertStringified("0", "test-1", 8);
    NumericType.assertStringified("1", "test-1", 8);
    NumericType.assertStringified("7", "test-1", 8);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumericType.assertStringified("8", "test-1", 8);
    unreachable();
  } catch {
    //
  }

  try {
    NumericType.assertStringified("0", "test-1", 16);
    NumericType.assertStringified("1", "test-1", 16);
    NumericType.assertStringified("7", "test-1", 16);
    NumericType.assertStringified("9", "test-1", 16);
    NumericType.assertStringified("f", "test-1", 16);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    NumericType.assertStringified("g", "test-1", 16);
    unreachable();
  } catch {
    //
  }
});
