import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Integer } from "../../../mod.ts";

Deno.test("Integer.isIntegerString()", () => {
  assertStrictEquals(Integer.isIntegerString("0"), true);
  assertStrictEquals(Integer.isIntegerString("-0"), true);
  assertStrictEquals(Integer.isIntegerString("+0"), true);
  assertStrictEquals(Integer.isIntegerString("-1"), true);
  assertStrictEquals(Integer.isIntegerString("+1"), true);

  assertStrictEquals(Integer.isIntegerString("2"), true);
  assertStrictEquals(Integer.isIntegerString("3"), true);
  assertStrictEquals(Integer.isIntegerString("4"), true);
  assertStrictEquals(Integer.isIntegerString("5"), true);
  assertStrictEquals(Integer.isIntegerString("6"), true);
  assertStrictEquals(Integer.isIntegerString("7"), true);
  assertStrictEquals(Integer.isIntegerString("8"), true);
  assertStrictEquals(Integer.isIntegerString("9"), true);
  assertStrictEquals(Integer.isIntegerString("A"), false);
  assertStrictEquals(Integer.isIntegerString("b"), false);
  assertStrictEquals(Integer.isIntegerString("c"), false);
  assertStrictEquals(Integer.isIntegerString("D"), false);
  assertStrictEquals(Integer.isIntegerString("e"), false);
  assertStrictEquals(Integer.isIntegerString("F"), false);
  assertStrictEquals(Integer.isIntegerString("G"), false);
  assertStrictEquals(Integer.isIntegerString("10"), true);

  assertStrictEquals(Integer.isIntegerString("0.5"), false);
  assertStrictEquals(Integer.isIntegerString(0), false);

  assertStrictEquals(Integer.isIntegerString(""), false);
  assertStrictEquals(Integer.isIntegerString(" "), false);
  assertStrictEquals(Integer.isIntegerString("１"), false);

  assertStrictEquals(
    Integer.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
    ),
    true,
  );
});

Deno.test("Integer.isIntegerString() - 2", () => {
  assertStrictEquals(Integer.isIntegerString("0", 2), true);
  assertStrictEquals(Integer.isIntegerString("-0", 2), true);
  assertStrictEquals(Integer.isIntegerString("+0", 2), true);
  assertStrictEquals(Integer.isIntegerString("-1", 2), true);
  assertStrictEquals(Integer.isIntegerString("+1", 2), true);

  assertStrictEquals(Integer.isIntegerString("2", 2), false);
  assertStrictEquals(Integer.isIntegerString("3", 2), false);
  assertStrictEquals(Integer.isIntegerString("4", 2), false);
  assertStrictEquals(Integer.isIntegerString("5", 2), false);
  assertStrictEquals(Integer.isIntegerString("6", 2), false);
  assertStrictEquals(Integer.isIntegerString("7", 2), false);
  assertStrictEquals(Integer.isIntegerString("8", 2), false);
  assertStrictEquals(Integer.isIntegerString("9", 2), false);
  assertStrictEquals(Integer.isIntegerString("A", 2), false);
  assertStrictEquals(Integer.isIntegerString("b", 2), false);
  assertStrictEquals(Integer.isIntegerString("c", 2), false);
  assertStrictEquals(Integer.isIntegerString("D", 2), false);
  assertStrictEquals(Integer.isIntegerString("e", 2), false);
  assertStrictEquals(Integer.isIntegerString("F", 2), false);
  assertStrictEquals(Integer.isIntegerString("G", 2), false);
  assertStrictEquals(Integer.isIntegerString("10", 2), true);

  assertStrictEquals(Integer.isIntegerString("0.5", 2), false);
  assertStrictEquals(Integer.isIntegerString(0, 2), false);

  assertStrictEquals(
    Integer.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      2,
    ),
    true,
  );
});

Deno.test("Integer.isIntegerString() - 8", () => {
  assertStrictEquals(Integer.isIntegerString("0", 8), true);
  assertStrictEquals(Integer.isIntegerString("-0", 8), true);
  assertStrictEquals(Integer.isIntegerString("+0", 8), true);
  assertStrictEquals(Integer.isIntegerString("-1", 8), true);
  assertStrictEquals(Integer.isIntegerString("+1", 8), true);

  assertStrictEquals(Integer.isIntegerString("2", 8), true);
  assertStrictEquals(Integer.isIntegerString("3", 8), true);
  assertStrictEquals(Integer.isIntegerString("4", 8), true);
  assertStrictEquals(Integer.isIntegerString("5", 8), true);
  assertStrictEquals(Integer.isIntegerString("6", 8), true);
  assertStrictEquals(Integer.isIntegerString("7", 8), true);
  assertStrictEquals(Integer.isIntegerString("8", 8), false);
  assertStrictEquals(Integer.isIntegerString("9", 8), false);
  assertStrictEquals(Integer.isIntegerString("A", 8), false);
  assertStrictEquals(Integer.isIntegerString("b", 8), false);
  assertStrictEquals(Integer.isIntegerString("c", 8), false);
  assertStrictEquals(Integer.isIntegerString("D", 8), false);
  assertStrictEquals(Integer.isIntegerString("e", 8), false);
  assertStrictEquals(Integer.isIntegerString("F", 8), false);
  assertStrictEquals(Integer.isIntegerString("G", 8), false);
  assertStrictEquals(Integer.isIntegerString("10", 8), true);

  assertStrictEquals(Integer.isIntegerString("0.5", 8), false);
  assertStrictEquals(Integer.isIntegerString(0, 8), false);

  assertStrictEquals(
    Integer.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      8,
    ),
    true,
  );
});

Deno.test("Integer.isIntegerString() - 10", () => {
  assertStrictEquals(Integer.isIntegerString("0", 10), true);
  assertStrictEquals(Integer.isIntegerString("-0", 10), true);
  assertStrictEquals(Integer.isIntegerString("+0", 10), true);
  assertStrictEquals(Integer.isIntegerString("-1", 10), true);
  assertStrictEquals(Integer.isIntegerString("+1", 10), true);

  assertStrictEquals(Integer.isIntegerString("2", 10), true);
  assertStrictEquals(Integer.isIntegerString("3", 10), true);
  assertStrictEquals(Integer.isIntegerString("4", 10), true);
  assertStrictEquals(Integer.isIntegerString("5", 10), true);
  assertStrictEquals(Integer.isIntegerString("6", 10), true);
  assertStrictEquals(Integer.isIntegerString("7", 10), true);
  assertStrictEquals(Integer.isIntegerString("8", 10), true);
  assertStrictEquals(Integer.isIntegerString("9", 10), true);
  assertStrictEquals(Integer.isIntegerString("A", 10), false);
  assertStrictEquals(Integer.isIntegerString("b", 10), false);
  assertStrictEquals(Integer.isIntegerString("c", 10), false);
  assertStrictEquals(Integer.isIntegerString("D", 10), false);
  assertStrictEquals(Integer.isIntegerString("e", 10), false);
  assertStrictEquals(Integer.isIntegerString("F", 10), false);
  assertStrictEquals(Integer.isIntegerString("G", 10), false);
  assertStrictEquals(Integer.isIntegerString("10", 10), true);

  assertStrictEquals(Integer.isIntegerString("0.5", 10), false);
  assertStrictEquals(Integer.isIntegerString(0, 10), false);

  assertStrictEquals(
    Integer.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      10,
    ),
    true,
  );
});

Deno.test("Integer.isIntegerString() - 16", () => {
  assertStrictEquals(Integer.isIntegerString("0", 16), true);
  assertStrictEquals(Integer.isIntegerString("-0", 16), true);
  assertStrictEquals(Integer.isIntegerString("+0", 16), true);
  assertStrictEquals(Integer.isIntegerString("-1", 16), true);
  assertStrictEquals(Integer.isIntegerString("+1", 16), true);

  assertStrictEquals(Integer.isIntegerString("2", 16), true);
  assertStrictEquals(Integer.isIntegerString("3", 16), true);
  assertStrictEquals(Integer.isIntegerString("4", 16), true);
  assertStrictEquals(Integer.isIntegerString("5", 16), true);
  assertStrictEquals(Integer.isIntegerString("6", 16), true);
  assertStrictEquals(Integer.isIntegerString("7", 16), true);
  assertStrictEquals(Integer.isIntegerString("8", 16), true);
  assertStrictEquals(Integer.isIntegerString("9", 16), true);
  assertStrictEquals(Integer.isIntegerString("A", 16), true);
  assertStrictEquals(Integer.isIntegerString("b", 16), true);
  assertStrictEquals(Integer.isIntegerString("c", 16), true);
  assertStrictEquals(Integer.isIntegerString("D", 16), true);
  assertStrictEquals(Integer.isIntegerString("e", 16), true);
  assertStrictEquals(Integer.isIntegerString("F", 16), true);
  assertStrictEquals(Integer.isIntegerString("G", 16), false);
  assertStrictEquals(Integer.isIntegerString("10", 16), true);

  assertStrictEquals(Integer.isIntegerString("0.5", 16), false);
  assertStrictEquals(Integer.isIntegerString(0, 16), false);

  assertStrictEquals(
    Integer.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      16,
    ),
    true,
  );
});

Deno.test("Integer.isIntegerString() - X", () => {
  assertThrows(
    () => {
      Integer.isIntegerString("0", 101 as 2);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );

  // assertStrictEquals(Integer.isIntegerString("0", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("-0", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("+0", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("-1", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("+1", 101 as 2), true);

  // assertStrictEquals(Integer.isIntegerString("2", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("3", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("4", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("5", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("6", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("7", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("8", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("9", 101 as 2), true);
  // assertStrictEquals(Integer.isIntegerString("A", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("b", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("c", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("D", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("e", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("F", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("G", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString("10", 101 as 2), true);

  // assertStrictEquals(Integer.isIntegerString("0.5", 101 as 2), false);
  // assertStrictEquals(Integer.isIntegerString(0, 101 as 2), false);

  // assertStrictEquals(
  //   Integer.isIntegerString(
  //     "10000000000000000000000000000000000000000000000000000000000",
  //     101 as 2,
  //   ),
  //   true,
  // );
});

Deno.test("Integer.assertIntegerString()", () => {
  try {
    Integer.assertIntegerString("0", "test-1");
    Integer.assertIntegerString("1", "test-1");
    Integer.assertIntegerString("7", "test-1");
    Integer.assertIntegerString("9", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertIntegerString("a", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Integer.assertIntegerString("0", "test-1", 2);
    Integer.assertIntegerString("1", "test-1", 2);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertIntegerString("2", "test-1", 2);
    unreachable();
  } catch {
    //
  }

  try {
    Integer.assertIntegerString("0", "test-1", 8);
    Integer.assertIntegerString("1", "test-1", 8);
    Integer.assertIntegerString("7", "test-1", 8);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertIntegerString("8", "test-1", 8);
    unreachable();
  } catch {
    //
  }

  try {
    Integer.assertIntegerString("0", "test-1", 16);
    Integer.assertIntegerString("1", "test-1", 16);
    Integer.assertIntegerString("7", "test-1", 16);
    Integer.assertIntegerString("9", "test-1", 16);
    Integer.assertIntegerString("f", "test-1", 16);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Integer.assertIntegerString("g", "test-1", 16);
    unreachable();
  } catch {
    //
  }
});
