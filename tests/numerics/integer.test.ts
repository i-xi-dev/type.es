import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Numerics } from "../../mod.ts";

const { Integer } = Numerics;

Deno.test("Integer.isStringified()", () => {
  assertStrictEquals(Integer.isStringified("0"), true);
  assertStrictEquals(Integer.isStringified("-0"), true);
  assertStrictEquals(Integer.isStringified("+0"), true);
  assertStrictEquals(Integer.isStringified("-1"), true);
  assertStrictEquals(Integer.isStringified("+1"), true);

  assertStrictEquals(Integer.isStringified("2"), true);
  assertStrictEquals(Integer.isStringified("3"), true);
  assertStrictEquals(Integer.isStringified("4"), true);
  assertStrictEquals(Integer.isStringified("5"), true);
  assertStrictEquals(Integer.isStringified("6"), true);
  assertStrictEquals(Integer.isStringified("7"), true);
  assertStrictEquals(Integer.isStringified("8"), true);
  assertStrictEquals(Integer.isStringified("9"), true);
  assertStrictEquals(Integer.isStringified("A"), false);
  assertStrictEquals(Integer.isStringified("b"), false);
  assertStrictEquals(Integer.isStringified("c"), false);
  assertStrictEquals(Integer.isStringified("D"), false);
  assertStrictEquals(Integer.isStringified("e"), false);
  assertStrictEquals(Integer.isStringified("F"), false);
  assertStrictEquals(Integer.isStringified("G"), false);
  assertStrictEquals(Integer.isStringified("10"), true);

  assertStrictEquals(Integer.isStringified("0.5"), false);
  assertStrictEquals(Integer.isStringified(0), false);

  assertStrictEquals(Integer.isStringified(""), false);
  assertStrictEquals(Integer.isStringified(" "), false);
  assertStrictEquals(Integer.isStringified("１"), false);

  assertStrictEquals(
    Integer.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
    ),
    true,
  );
});

Deno.test("Integer.isStringified() - 2", () => {
  assertStrictEquals(Integer.isStringified("0", 2), true);
  assertStrictEquals(Integer.isStringified("-0", 2), true);
  assertStrictEquals(Integer.isStringified("+0", 2), true);
  assertStrictEquals(Integer.isStringified("-1", 2), true);
  assertStrictEquals(Integer.isStringified("+1", 2), true);

  assertStrictEquals(Integer.isStringified("2", 2), false);
  assertStrictEquals(Integer.isStringified("3", 2), false);
  assertStrictEquals(Integer.isStringified("4", 2), false);
  assertStrictEquals(Integer.isStringified("5", 2), false);
  assertStrictEquals(Integer.isStringified("6", 2), false);
  assertStrictEquals(Integer.isStringified("7", 2), false);
  assertStrictEquals(Integer.isStringified("8", 2), false);
  assertStrictEquals(Integer.isStringified("9", 2), false);
  assertStrictEquals(Integer.isStringified("A", 2), false);
  assertStrictEquals(Integer.isStringified("b", 2), false);
  assertStrictEquals(Integer.isStringified("c", 2), false);
  assertStrictEquals(Integer.isStringified("D", 2), false);
  assertStrictEquals(Integer.isStringified("e", 2), false);
  assertStrictEquals(Integer.isStringified("F", 2), false);
  assertStrictEquals(Integer.isStringified("G", 2), false);
  assertStrictEquals(Integer.isStringified("10", 2), true);

  assertStrictEquals(Integer.isStringified("0.5", 2), false);
  assertStrictEquals(Integer.isStringified(0, 2), false);

  assertStrictEquals(
    Integer.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      2,
    ),
    true,
  );
});

Deno.test("Integer.isStringified() - 8", () => {
  assertStrictEquals(Integer.isStringified("0", 8), true);
  assertStrictEquals(Integer.isStringified("-0", 8), true);
  assertStrictEquals(Integer.isStringified("+0", 8), true);
  assertStrictEquals(Integer.isStringified("-1", 8), true);
  assertStrictEquals(Integer.isStringified("+1", 8), true);

  assertStrictEquals(Integer.isStringified("2", 8), true);
  assertStrictEquals(Integer.isStringified("3", 8), true);
  assertStrictEquals(Integer.isStringified("4", 8), true);
  assertStrictEquals(Integer.isStringified("5", 8), true);
  assertStrictEquals(Integer.isStringified("6", 8), true);
  assertStrictEquals(Integer.isStringified("7", 8), true);
  assertStrictEquals(Integer.isStringified("8", 8), false);
  assertStrictEquals(Integer.isStringified("9", 8), false);
  assertStrictEquals(Integer.isStringified("A", 8), false);
  assertStrictEquals(Integer.isStringified("b", 8), false);
  assertStrictEquals(Integer.isStringified("c", 8), false);
  assertStrictEquals(Integer.isStringified("D", 8), false);
  assertStrictEquals(Integer.isStringified("e", 8), false);
  assertStrictEquals(Integer.isStringified("F", 8), false);
  assertStrictEquals(Integer.isStringified("G", 8), false);
  assertStrictEquals(Integer.isStringified("10", 8), true);

  assertStrictEquals(Integer.isStringified("0.5", 8), false);
  assertStrictEquals(Integer.isStringified(0, 8), false);

  assertStrictEquals(
    Integer.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      8,
    ),
    true,
  );
});

Deno.test("Integer.isStringified() - 10", () => {
  assertStrictEquals(Integer.isStringified("0", 10), true);
  assertStrictEquals(Integer.isStringified("-0", 10), true);
  assertStrictEquals(Integer.isStringified("+0", 10), true);
  assertStrictEquals(Integer.isStringified("-1", 10), true);
  assertStrictEquals(Integer.isStringified("+1", 10), true);

  assertStrictEquals(Integer.isStringified("2", 10), true);
  assertStrictEquals(Integer.isStringified("3", 10), true);
  assertStrictEquals(Integer.isStringified("4", 10), true);
  assertStrictEquals(Integer.isStringified("5", 10), true);
  assertStrictEquals(Integer.isStringified("6", 10), true);
  assertStrictEquals(Integer.isStringified("7", 10), true);
  assertStrictEquals(Integer.isStringified("8", 10), true);
  assertStrictEquals(Integer.isStringified("9", 10), true);
  assertStrictEquals(Integer.isStringified("A", 10), false);
  assertStrictEquals(Integer.isStringified("b", 10), false);
  assertStrictEquals(Integer.isStringified("c", 10), false);
  assertStrictEquals(Integer.isStringified("D", 10), false);
  assertStrictEquals(Integer.isStringified("e", 10), false);
  assertStrictEquals(Integer.isStringified("F", 10), false);
  assertStrictEquals(Integer.isStringified("G", 10), false);
  assertStrictEquals(Integer.isStringified("10", 10), true);

  assertStrictEquals(Integer.isStringified("0.5", 10), false);
  assertStrictEquals(Integer.isStringified(0, 10), false);

  assertStrictEquals(
    Integer.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      10,
    ),
    true,
  );
});

Deno.test("Integer.isStringified() - 16", () => {
  assertStrictEquals(Integer.isStringified("0", 16), true);
  assertStrictEquals(Integer.isStringified("-0", 16), true);
  assertStrictEquals(Integer.isStringified("+0", 16), true);
  assertStrictEquals(Integer.isStringified("-1", 16), true);
  assertStrictEquals(Integer.isStringified("+1", 16), true);

  assertStrictEquals(Integer.isStringified("2", 16), true);
  assertStrictEquals(Integer.isStringified("3", 16), true);
  assertStrictEquals(Integer.isStringified("4", 16), true);
  assertStrictEquals(Integer.isStringified("5", 16), true);
  assertStrictEquals(Integer.isStringified("6", 16), true);
  assertStrictEquals(Integer.isStringified("7", 16), true);
  assertStrictEquals(Integer.isStringified("8", 16), true);
  assertStrictEquals(Integer.isStringified("9", 16), true);
  assertStrictEquals(Integer.isStringified("A", 16), true);
  assertStrictEquals(Integer.isStringified("b", 16), true);
  assertStrictEquals(Integer.isStringified("c", 16), true);
  assertStrictEquals(Integer.isStringified("D", 16), true);
  assertStrictEquals(Integer.isStringified("e", 16), true);
  assertStrictEquals(Integer.isStringified("F", 16), true);
  assertStrictEquals(Integer.isStringified("G", 16), false);
  assertStrictEquals(Integer.isStringified("10", 16), true);

  assertStrictEquals(Integer.isStringified("0.5", 16), false);
  assertStrictEquals(Integer.isStringified(0, 16), false);

  assertStrictEquals(
    Integer.isStringified(
      "10000000000000000000000000000000000000000000000000000000000",
      16,
    ),
    true,
  );
});

Deno.test("Integer.isStringified() - X", () => {
  assertThrows(
    () => {
      Integer.isStringified("0", 101 as 2);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );

  // assertStrictEquals(Integer.isStringified("0", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("-0", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("+0", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("-1", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("+1", 101 as 2), true);

  // assertStrictEquals(Integer.isStringified("2", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("3", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("4", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("5", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("6", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("7", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("8", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("9", 101 as 2), true);
  // assertStrictEquals(Integer.isStringified("A", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("b", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("c", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("D", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("e", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("F", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("G", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified("10", 101 as 2), true);

  // assertStrictEquals(Integer.isStringified("0.5", 101 as 2), false);
  // assertStrictEquals(Integer.isStringified(0, 101 as 2), false);

  // assertStrictEquals(
  //   Integer.isStringified(
  //     "10000000000000000000000000000000000000000000000000000000000",
  //     101 as 2,
  //   ),
  //   true,
  // );
});

Deno.test("Integer.assertStringified()", () => {
  try {
    Integer.assertStringified("0", "test-1");
    Integer.assertStringified("1", "test-1");
    Integer.assertStringified("7", "test-1");
    Integer.assertStringified("9", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertStringified("a", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Integer.assertStringified("0", "test-1", 2);
    Integer.assertStringified("1", "test-1", 2);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertStringified("2", "test-1", 2);
    unreachable();
  } catch {
    //
  }

  try {
    Integer.assertStringified("0", "test-1", 8);
    Integer.assertStringified("1", "test-1", 8);
    Integer.assertStringified("7", "test-1", 8);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertStringified("8", "test-1", 8);
    unreachable();
  } catch {
    //
  }

  try {
    Integer.assertStringified("0", "test-1", 16);
    Integer.assertStringified("1", "test-1", 16);
    Integer.assertStringified("7", "test-1", 16);
    Integer.assertStringified("9", "test-1", 16);
    Integer.assertStringified("f", "test-1", 16);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertStringified("g", "test-1", 16);
    unreachable();
  } catch {
    //
  }
});
