import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { IntegerType } from "../mod.ts";

Deno.test("IntegerType.isStringified()", () => {
  assertStrictEquals(IntegerType.isStringified("0"), true);
  assertStrictEquals(IntegerType.isStringified("-0"), true);
  assertStrictEquals(IntegerType.isStringified("+0"), true);
  assertStrictEquals(IntegerType.isStringified("-1"), true);
  assertStrictEquals(IntegerType.isStringified("+1"), true);

  assertStrictEquals(IntegerType.isStringified("2"), true);
  assertStrictEquals(IntegerType.isStringified("3"), true);
  assertStrictEquals(IntegerType.isStringified("4"), true);
  assertStrictEquals(IntegerType.isStringified("5"), true);
  assertStrictEquals(IntegerType.isStringified("6"), true);
  assertStrictEquals(IntegerType.isStringified("7"), true);
  assertStrictEquals(IntegerType.isStringified("8"), true);
  assertStrictEquals(IntegerType.isStringified("9"), true);
  assertStrictEquals(IntegerType.isStringified("A"), false);
  assertStrictEquals(IntegerType.isStringified("b"), false);
  assertStrictEquals(IntegerType.isStringified("c"), false);
  assertStrictEquals(IntegerType.isStringified("D"), false);
  assertStrictEquals(IntegerType.isStringified("e"), false);
  assertStrictEquals(IntegerType.isStringified("F"), false);
  assertStrictEquals(IntegerType.isStringified("G"), false);
  assertStrictEquals(IntegerType.isStringified("10"), true);

  assertStrictEquals(IntegerType.isStringified("0.5"), false);
  assertStrictEquals(IntegerType.isStringified(0), false);

  assertStrictEquals(IntegerType.isStringified(""), false);
  assertStrictEquals(IntegerType.isStringified(" "), false);
  assertStrictEquals(IntegerType.isStringified("１"), false);

  assertStrictEquals(
    IntegerType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
    ),
    true,
  );
});

Deno.test("IntegerType.isStringified() - 2", () => {
  assertStrictEquals(IntegerType.isStringified("0", 2), true);
  assertStrictEquals(IntegerType.isStringified("-0", 2), true);
  assertStrictEquals(IntegerType.isStringified("+0", 2), true);
  assertStrictEquals(IntegerType.isStringified("-1", 2), true);
  assertStrictEquals(IntegerType.isStringified("+1", 2), true);

  assertStrictEquals(IntegerType.isStringified("2", 2), false);
  assertStrictEquals(IntegerType.isStringified("3", 2), false);
  assertStrictEquals(IntegerType.isStringified("4", 2), false);
  assertStrictEquals(IntegerType.isStringified("5", 2), false);
  assertStrictEquals(IntegerType.isStringified("6", 2), false);
  assertStrictEquals(IntegerType.isStringified("7", 2), false);
  assertStrictEquals(IntegerType.isStringified("8", 2), false);
  assertStrictEquals(IntegerType.isStringified("9", 2), false);
  assertStrictEquals(IntegerType.isStringified("A", 2), false);
  assertStrictEquals(IntegerType.isStringified("b", 2), false);
  assertStrictEquals(IntegerType.isStringified("c", 2), false);
  assertStrictEquals(IntegerType.isStringified("D", 2), false);
  assertStrictEquals(IntegerType.isStringified("e", 2), false);
  assertStrictEquals(IntegerType.isStringified("F", 2), false);
  assertStrictEquals(IntegerType.isStringified("G", 2), false);
  assertStrictEquals(IntegerType.isStringified("10", 2), true);

  assertStrictEquals(IntegerType.isStringified("0.5", 2), false);
  assertStrictEquals(IntegerType.isStringified(0, 2), false);

  assertStrictEquals(
    IntegerType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      2,
    ),
    true,
  );
});

Deno.test("IntegerType.isStringified() - 8", () => {
  assertStrictEquals(IntegerType.isStringified("0", 8), true);
  assertStrictEquals(IntegerType.isStringified("-0", 8), true);
  assertStrictEquals(IntegerType.isStringified("+0", 8), true);
  assertStrictEquals(IntegerType.isStringified("-1", 8), true);
  assertStrictEquals(IntegerType.isStringified("+1", 8), true);

  assertStrictEquals(IntegerType.isStringified("2", 8), true);
  assertStrictEquals(IntegerType.isStringified("3", 8), true);
  assertStrictEquals(IntegerType.isStringified("4", 8), true);
  assertStrictEquals(IntegerType.isStringified("5", 8), true);
  assertStrictEquals(IntegerType.isStringified("6", 8), true);
  assertStrictEquals(IntegerType.isStringified("7", 8), true);
  assertStrictEquals(IntegerType.isStringified("8", 8), false);
  assertStrictEquals(IntegerType.isStringified("9", 8), false);
  assertStrictEquals(IntegerType.isStringified("A", 8), false);
  assertStrictEquals(IntegerType.isStringified("b", 8), false);
  assertStrictEquals(IntegerType.isStringified("c", 8), false);
  assertStrictEquals(IntegerType.isStringified("D", 8), false);
  assertStrictEquals(IntegerType.isStringified("e", 8), false);
  assertStrictEquals(IntegerType.isStringified("F", 8), false);
  assertStrictEquals(IntegerType.isStringified("G", 8), false);
  assertStrictEquals(IntegerType.isStringified("10", 8), true);

  assertStrictEquals(IntegerType.isStringified("0.5", 8), false);
  assertStrictEquals(IntegerType.isStringified(0, 8), false);

  assertStrictEquals(
    IntegerType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      8,
    ),
    true,
  );
});

Deno.test("IntegerType.isStringified() - 10", () => {
  assertStrictEquals(IntegerType.isStringified("0", 10), true);
  assertStrictEquals(IntegerType.isStringified("-0", 10), true);
  assertStrictEquals(IntegerType.isStringified("+0", 10), true);
  assertStrictEquals(IntegerType.isStringified("-1", 10), true);
  assertStrictEquals(IntegerType.isStringified("+1", 10), true);

  assertStrictEquals(IntegerType.isStringified("2", 10), true);
  assertStrictEquals(IntegerType.isStringified("3", 10), true);
  assertStrictEquals(IntegerType.isStringified("4", 10), true);
  assertStrictEquals(IntegerType.isStringified("5", 10), true);
  assertStrictEquals(IntegerType.isStringified("6", 10), true);
  assertStrictEquals(IntegerType.isStringified("7", 10), true);
  assertStrictEquals(IntegerType.isStringified("8", 10), true);
  assertStrictEquals(IntegerType.isStringified("9", 10), true);
  assertStrictEquals(IntegerType.isStringified("A", 10), false);
  assertStrictEquals(IntegerType.isStringified("b", 10), false);
  assertStrictEquals(IntegerType.isStringified("c", 10), false);
  assertStrictEquals(IntegerType.isStringified("D", 10), false);
  assertStrictEquals(IntegerType.isStringified("e", 10), false);
  assertStrictEquals(IntegerType.isStringified("F", 10), false);
  assertStrictEquals(IntegerType.isStringified("G", 10), false);
  assertStrictEquals(IntegerType.isStringified("10", 10), true);

  assertStrictEquals(IntegerType.isStringified("0.5", 10), false);
  assertStrictEquals(IntegerType.isStringified(0, 10), false);

  assertStrictEquals(
    IntegerType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      10,
    ),
    true,
  );
});

Deno.test("IntegerType.isStringified() - 16", () => {
  assertStrictEquals(IntegerType.isStringified("0", 16), true);
  assertStrictEquals(IntegerType.isStringified("-0", 16), true);
  assertStrictEquals(IntegerType.isStringified("+0", 16), true);
  assertStrictEquals(IntegerType.isStringified("-1", 16), true);
  assertStrictEquals(IntegerType.isStringified("+1", 16), true);

  assertStrictEquals(IntegerType.isStringified("2", 16), true);
  assertStrictEquals(IntegerType.isStringified("3", 16), true);
  assertStrictEquals(IntegerType.isStringified("4", 16), true);
  assertStrictEquals(IntegerType.isStringified("5", 16), true);
  assertStrictEquals(IntegerType.isStringified("6", 16), true);
  assertStrictEquals(IntegerType.isStringified("7", 16), true);
  assertStrictEquals(IntegerType.isStringified("8", 16), true);
  assertStrictEquals(IntegerType.isStringified("9", 16), true);
  assertStrictEquals(IntegerType.isStringified("A", 16), true);
  assertStrictEquals(IntegerType.isStringified("b", 16), true);
  assertStrictEquals(IntegerType.isStringified("c", 16), true);
  assertStrictEquals(IntegerType.isStringified("D", 16), true);
  assertStrictEquals(IntegerType.isStringified("e", 16), true);
  assertStrictEquals(IntegerType.isStringified("F", 16), true);
  assertStrictEquals(IntegerType.isStringified("G", 16), false);
  assertStrictEquals(IntegerType.isStringified("10", 16), true);

  assertStrictEquals(IntegerType.isStringified("0.5", 16), false);
  assertStrictEquals(IntegerType.isStringified(0, 16), false);

  assertStrictEquals(
    IntegerType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      16,
    ),
    true,
  );
});

Deno.test("IntegerType.isStringified() - X", () => {
  assertStrictEquals(IntegerType.isStringified("0", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("-0", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("+0", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("-1", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("+1", 101 as 2), true);

  assertStrictEquals(IntegerType.isStringified("2", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("3", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("4", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("5", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("6", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("7", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("8", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("9", 101 as 2), true);
  assertStrictEquals(IntegerType.isStringified("A", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("b", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("c", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("D", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("e", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("F", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("G", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified("10", 101 as 2), true);

  assertStrictEquals(IntegerType.isStringified("0.5", 101 as 2), false);
  assertStrictEquals(IntegerType.isStringified(0, 101 as 2), false);

  assertStrictEquals(
    IntegerType.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      101 as 2,
    ),
    true,
  );
});

Deno.test("IntegerType.assertStringified()", () => {
  try {
    IntegerType.assertStringified("0", "test-1");
    IntegerType.assertStringified("1", "test-1");
    IntegerType.assertStringified("7", "test-1");
    IntegerType.assertStringified("9", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    IntegerType.assertStringified("a", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    IntegerType.assertStringified("0", "test-1", 2);
    IntegerType.assertStringified("1", "test-1", 2);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    IntegerType.assertStringified("2", "test-1", 2);
    unreachable();
  } catch {
    //
  }

  try {
    IntegerType.assertStringified("0", "test-1", 8);
    IntegerType.assertStringified("1", "test-1", 8);
    IntegerType.assertStringified("7", "test-1", 8);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    IntegerType.assertStringified("8", "test-1", 8);
    unreachable();
  } catch {
    //
  }

  try {
    IntegerType.assertStringified("0", "test-1", 16);
    IntegerType.assertStringified("1", "test-1", 16);
    IntegerType.assertStringified("7", "test-1", 16);
    IntegerType.assertStringified("9", "test-1", 16);
    IntegerType.assertStringified("f", "test-1", 16);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    IntegerType.assertStringified("g", "test-1", 16);
    unreachable();
  } catch {
    //
  }
});
