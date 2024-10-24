import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { assertStringifiedInteger, isStringifiedInteger } from "../mod.ts";

Deno.test("isStringifiedInteger()", () => {
  assertStrictEquals(isStringifiedInteger("0"), true);
  assertStrictEquals(isStringifiedInteger("-0"), true);
  assertStrictEquals(isStringifiedInteger("+0"), true);
  assertStrictEquals(isStringifiedInteger("-1"), true);
  assertStrictEquals(isStringifiedInteger("+1"), true);

  assertStrictEquals(isStringifiedInteger("2"), true);
  assertStrictEquals(isStringifiedInteger("3"), true);
  assertStrictEquals(isStringifiedInteger("4"), true);
  assertStrictEquals(isStringifiedInteger("5"), true);
  assertStrictEquals(isStringifiedInteger("6"), true);
  assertStrictEquals(isStringifiedInteger("7"), true);
  assertStrictEquals(isStringifiedInteger("8"), true);
  assertStrictEquals(isStringifiedInteger("9"), true);
  assertStrictEquals(isStringifiedInteger("A"), false);
  assertStrictEquals(isStringifiedInteger("b"), false);
  assertStrictEquals(isStringifiedInteger("c"), false);
  assertStrictEquals(isStringifiedInteger("D"), false);
  assertStrictEquals(isStringifiedInteger("e"), false);
  assertStrictEquals(isStringifiedInteger("F"), false);
  assertStrictEquals(isStringifiedInteger("G"), false);
  assertStrictEquals(isStringifiedInteger("10"), true);

  assertStrictEquals(isStringifiedInteger("0.5"), false);
  assertStrictEquals(isStringifiedInteger(0), false);

  assertStrictEquals(isStringifiedInteger(""), false);
  assertStrictEquals(isStringifiedInteger(" "), false);
  assertStrictEquals(isStringifiedInteger("１"), false);

  assertStrictEquals(
    isStringifiedInteger(
      "10000000000000000000000000000000000000000000000000000000000",
    ),
    true,
  );
});

Deno.test("isStringifiedInteger() - 2", () => {
  assertStrictEquals(isStringifiedInteger("0", 2), true);
  assertStrictEquals(isStringifiedInteger("-0", 2), true);
  assertStrictEquals(isStringifiedInteger("+0", 2), true);
  assertStrictEquals(isStringifiedInteger("-1", 2), true);
  assertStrictEquals(isStringifiedInteger("+1", 2), true);

  assertStrictEquals(isStringifiedInteger("2", 2), false);
  assertStrictEquals(isStringifiedInteger("3", 2), false);
  assertStrictEquals(isStringifiedInteger("4", 2), false);
  assertStrictEquals(isStringifiedInteger("5", 2), false);
  assertStrictEquals(isStringifiedInteger("6", 2), false);
  assertStrictEquals(isStringifiedInteger("7", 2), false);
  assertStrictEquals(isStringifiedInteger("8", 2), false);
  assertStrictEquals(isStringifiedInteger("9", 2), false);
  assertStrictEquals(isStringifiedInteger("A", 2), false);
  assertStrictEquals(isStringifiedInteger("b", 2), false);
  assertStrictEquals(isStringifiedInteger("c", 2), false);
  assertStrictEquals(isStringifiedInteger("D", 2), false);
  assertStrictEquals(isStringifiedInteger("e", 2), false);
  assertStrictEquals(isStringifiedInteger("F", 2), false);
  assertStrictEquals(isStringifiedInteger("G", 2), false);
  assertStrictEquals(isStringifiedInteger("10", 2), true);

  assertStrictEquals(isStringifiedInteger("0.5", 2), false);
  assertStrictEquals(isStringifiedInteger(0, 2), false);

  assertStrictEquals(
    isStringifiedInteger(
      "10000000000000000000000000000000000000000000000000000000000",
      2,
    ),
    true,
  );
});

Deno.test("isStringifiedInteger() - 8", () => {
  assertStrictEquals(isStringifiedInteger("0", 8), true);
  assertStrictEquals(isStringifiedInteger("-0", 8), true);
  assertStrictEquals(isStringifiedInteger("+0", 8), true);
  assertStrictEquals(isStringifiedInteger("-1", 8), true);
  assertStrictEquals(isStringifiedInteger("+1", 8), true);

  assertStrictEquals(isStringifiedInteger("2", 8), true);
  assertStrictEquals(isStringifiedInteger("3", 8), true);
  assertStrictEquals(isStringifiedInteger("4", 8), true);
  assertStrictEquals(isStringifiedInteger("5", 8), true);
  assertStrictEquals(isStringifiedInteger("6", 8), true);
  assertStrictEquals(isStringifiedInteger("7", 8), true);
  assertStrictEquals(isStringifiedInteger("8", 8), false);
  assertStrictEquals(isStringifiedInteger("9", 8), false);
  assertStrictEquals(isStringifiedInteger("A", 8), false);
  assertStrictEquals(isStringifiedInteger("b", 8), false);
  assertStrictEquals(isStringifiedInteger("c", 8), false);
  assertStrictEquals(isStringifiedInteger("D", 8), false);
  assertStrictEquals(isStringifiedInteger("e", 8), false);
  assertStrictEquals(isStringifiedInteger("F", 8), false);
  assertStrictEquals(isStringifiedInteger("G", 8), false);
  assertStrictEquals(isStringifiedInteger("10", 8), true);

  assertStrictEquals(isStringifiedInteger("0.5", 8), false);
  assertStrictEquals(isStringifiedInteger(0, 8), false);

  assertStrictEquals(
    isStringifiedInteger(
      "10000000000000000000000000000000000000000000000000000000000",
      8,
    ),
    true,
  );
});

Deno.test("isStringifiedInteger() - 10", () => {
  assertStrictEquals(isStringifiedInteger("0", 10), true);
  assertStrictEquals(isStringifiedInteger("-0", 10), true);
  assertStrictEquals(isStringifiedInteger("+0", 10), true);
  assertStrictEquals(isStringifiedInteger("-1", 10), true);
  assertStrictEquals(isStringifiedInteger("+1", 10), true);

  assertStrictEquals(isStringifiedInteger("2", 10), true);
  assertStrictEquals(isStringifiedInteger("3", 10), true);
  assertStrictEquals(isStringifiedInteger("4", 10), true);
  assertStrictEquals(isStringifiedInteger("5", 10), true);
  assertStrictEquals(isStringifiedInteger("6", 10), true);
  assertStrictEquals(isStringifiedInteger("7", 10), true);
  assertStrictEquals(isStringifiedInteger("8", 10), true);
  assertStrictEquals(isStringifiedInteger("9", 10), true);
  assertStrictEquals(isStringifiedInteger("A", 10), false);
  assertStrictEquals(isStringifiedInteger("b", 10), false);
  assertStrictEquals(isStringifiedInteger("c", 10), false);
  assertStrictEquals(isStringifiedInteger("D", 10), false);
  assertStrictEquals(isStringifiedInteger("e", 10), false);
  assertStrictEquals(isStringifiedInteger("F", 10), false);
  assertStrictEquals(isStringifiedInteger("G", 10), false);
  assertStrictEquals(isStringifiedInteger("10", 10), true);

  assertStrictEquals(isStringifiedInteger("0.5", 10), false);
  assertStrictEquals(isStringifiedInteger(0, 10), false);

  assertStrictEquals(
    isStringifiedInteger(
      "10000000000000000000000000000000000000000000000000000000000",
      10,
    ),
    true,
  );
});

Deno.test("isStringifiedInteger() - 16", () => {
  assertStrictEquals(isStringifiedInteger("0", 16), true);
  assertStrictEquals(isStringifiedInteger("-0", 16), true);
  assertStrictEquals(isStringifiedInteger("+0", 16), true);
  assertStrictEquals(isStringifiedInteger("-1", 16), true);
  assertStrictEquals(isStringifiedInteger("+1", 16), true);

  assertStrictEquals(isStringifiedInteger("2", 16), true);
  assertStrictEquals(isStringifiedInteger("3", 16), true);
  assertStrictEquals(isStringifiedInteger("4", 16), true);
  assertStrictEquals(isStringifiedInteger("5", 16), true);
  assertStrictEquals(isStringifiedInteger("6", 16), true);
  assertStrictEquals(isStringifiedInteger("7", 16), true);
  assertStrictEquals(isStringifiedInteger("8", 16), true);
  assertStrictEquals(isStringifiedInteger("9", 16), true);
  assertStrictEquals(isStringifiedInteger("A", 16), true);
  assertStrictEquals(isStringifiedInteger("b", 16), true);
  assertStrictEquals(isStringifiedInteger("c", 16), true);
  assertStrictEquals(isStringifiedInteger("D", 16), true);
  assertStrictEquals(isStringifiedInteger("e", 16), true);
  assertStrictEquals(isStringifiedInteger("F", 16), true);
  assertStrictEquals(isStringifiedInteger("G", 16), false);
  assertStrictEquals(isStringifiedInteger("10", 16), true);

  assertStrictEquals(isStringifiedInteger("0.5", 16), false);
  assertStrictEquals(isStringifiedInteger(0, 16), false);

  assertStrictEquals(
    isStringifiedInteger(
      "10000000000000000000000000000000000000000000000000000000000",
      16,
    ),
    true,
  );
});

Deno.test("isStringifiedInteger() - X", () => {
  assertStrictEquals(isStringifiedInteger("0", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("-0", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("+0", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("-1", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("+1", 101 as 2), true);

  assertStrictEquals(isStringifiedInteger("2", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("3", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("4", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("5", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("6", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("7", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("8", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("9", 101 as 2), true);
  assertStrictEquals(isStringifiedInteger("A", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("b", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("c", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("D", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("e", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("F", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("G", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger("10", 101 as 2), true);

  assertStrictEquals(isStringifiedInteger("0.5", 101 as 2), false);
  assertStrictEquals(isStringifiedInteger(0, 101 as 2), false);

  assertStrictEquals(
    isStringifiedInteger(
      "10000000000000000000000000000000000000000000000000000000000",
      101 as 2,
    ),
    true,
  );
});

Deno.test("assertStringifiedInteger()", () => {
  try {
    assertStringifiedInteger("0", "test-1");
    assertStringifiedInteger("1", "test-1");
    assertStringifiedInteger("7", "test-1");
    assertStringifiedInteger("9", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertStringifiedInteger("a", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertStringifiedInteger("0", "test-1", 2);
    assertStringifiedInteger("1", "test-1", 2);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertStringifiedInteger("2", "test-1", 2);
    unreachable();
  } catch {
    //
  }

  try {
    assertStringifiedInteger("0", "test-1", 8);
    assertStringifiedInteger("1", "test-1", 8);
    assertStringifiedInteger("7", "test-1", 8);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertStringifiedInteger("8", "test-1", 8);
    unreachable();
  } catch {
    //
  }

  try {
    assertStringifiedInteger("0", "test-1", 16);
    assertStringifiedInteger("1", "test-1", 16);
    assertStringifiedInteger("7", "test-1", 16);
    assertStringifiedInteger("9", "test-1", 16);
    assertStringifiedInteger("f", "test-1", 16);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertStringifiedInteger("g", "test-1", 16);
    unreachable();
  } catch {
    //
  }

});
