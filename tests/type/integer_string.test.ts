import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isIntegerString()", () => {
  assertStrictEquals(Type.isIntegerString("0"), true);
  assertStrictEquals(Type.isIntegerString("-0"), true);
  assertStrictEquals(Type.isIntegerString("+0"), true);
  assertStrictEquals(Type.isIntegerString("-1"), true);
  assertStrictEquals(Type.isIntegerString("+1"), true);

  assertStrictEquals(Type.isIntegerString("2"), true);
  assertStrictEquals(Type.isIntegerString("3"), true);
  assertStrictEquals(Type.isIntegerString("4"), true);
  assertStrictEquals(Type.isIntegerString("5"), true);
  assertStrictEquals(Type.isIntegerString("6"), true);
  assertStrictEquals(Type.isIntegerString("7"), true);
  assertStrictEquals(Type.isIntegerString("8"), true);
  assertStrictEquals(Type.isIntegerString("9"), true);
  assertStrictEquals(Type.isIntegerString("A"), false);
  assertStrictEquals(Type.isIntegerString("b"), false);
  assertStrictEquals(Type.isIntegerString("c"), false);
  assertStrictEquals(Type.isIntegerString("D"), false);
  assertStrictEquals(Type.isIntegerString("e"), false);
  assertStrictEquals(Type.isIntegerString("F"), false);
  assertStrictEquals(Type.isIntegerString("G"), false);
  assertStrictEquals(Type.isIntegerString("10"), true);

  assertStrictEquals(Type.isIntegerString("0.5"), false);
  assertStrictEquals(Type.isIntegerString(0), false);

  assertStrictEquals(Type.isIntegerString(""), false);
  assertStrictEquals(Type.isIntegerString(" "), false);
  assertStrictEquals(Type.isIntegerString("１"), false);

  assertStrictEquals(
    Type.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
    ),
    true,
  );
});

Deno.test("Type.isIntegerString() - 2", () => {
  assertStrictEquals(Type.isIntegerString("0", 2), true);
  assertStrictEquals(Type.isIntegerString("-0", 2), true);
  assertStrictEquals(Type.isIntegerString("+0", 2), true);
  assertStrictEquals(Type.isIntegerString("-1", 2), true);
  assertStrictEquals(Type.isIntegerString("+1", 2), true);

  assertStrictEquals(Type.isIntegerString("2", 2), false);
  assertStrictEquals(Type.isIntegerString("3", 2), false);
  assertStrictEquals(Type.isIntegerString("4", 2), false);
  assertStrictEquals(Type.isIntegerString("5", 2), false);
  assertStrictEquals(Type.isIntegerString("6", 2), false);
  assertStrictEquals(Type.isIntegerString("7", 2), false);
  assertStrictEquals(Type.isIntegerString("8", 2), false);
  assertStrictEquals(Type.isIntegerString("9", 2), false);
  assertStrictEquals(Type.isIntegerString("A", 2), false);
  assertStrictEquals(Type.isIntegerString("b", 2), false);
  assertStrictEquals(Type.isIntegerString("c", 2), false);
  assertStrictEquals(Type.isIntegerString("D", 2), false);
  assertStrictEquals(Type.isIntegerString("e", 2), false);
  assertStrictEquals(Type.isIntegerString("F", 2), false);
  assertStrictEquals(Type.isIntegerString("G", 2), false);
  assertStrictEquals(Type.isIntegerString("10", 2), true);

  assertStrictEquals(Type.isIntegerString("0.5", 2), false);
  assertStrictEquals(Type.isIntegerString(0, 2), false);

  assertStrictEquals(
    Type.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      2,
    ),
    true,
  );
});

Deno.test("Type.isIntegerString() - 8", () => {
  assertStrictEquals(Type.isIntegerString("0", 8), true);
  assertStrictEquals(Type.isIntegerString("-0", 8), true);
  assertStrictEquals(Type.isIntegerString("+0", 8), true);
  assertStrictEquals(Type.isIntegerString("-1", 8), true);
  assertStrictEquals(Type.isIntegerString("+1", 8), true);

  assertStrictEquals(Type.isIntegerString("2", 8), true);
  assertStrictEquals(Type.isIntegerString("3", 8), true);
  assertStrictEquals(Type.isIntegerString("4", 8), true);
  assertStrictEquals(Type.isIntegerString("5", 8), true);
  assertStrictEquals(Type.isIntegerString("6", 8), true);
  assertStrictEquals(Type.isIntegerString("7", 8), true);
  assertStrictEquals(Type.isIntegerString("8", 8), false);
  assertStrictEquals(Type.isIntegerString("9", 8), false);
  assertStrictEquals(Type.isIntegerString("A", 8), false);
  assertStrictEquals(Type.isIntegerString("b", 8), false);
  assertStrictEquals(Type.isIntegerString("c", 8), false);
  assertStrictEquals(Type.isIntegerString("D", 8), false);
  assertStrictEquals(Type.isIntegerString("e", 8), false);
  assertStrictEquals(Type.isIntegerString("F", 8), false);
  assertStrictEquals(Type.isIntegerString("G", 8), false);
  assertStrictEquals(Type.isIntegerString("10", 8), true);

  assertStrictEquals(Type.isIntegerString("0.5", 8), false);
  assertStrictEquals(Type.isIntegerString(0, 8), false);

  assertStrictEquals(
    Type.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      8,
    ),
    true,
  );
});

Deno.test("Type.isIntegerString() - 10", () => {
  assertStrictEquals(Type.isIntegerString("0", 10), true);
  assertStrictEquals(Type.isIntegerString("-0", 10), true);
  assertStrictEquals(Type.isIntegerString("+0", 10), true);
  assertStrictEquals(Type.isIntegerString("-1", 10), true);
  assertStrictEquals(Type.isIntegerString("+1", 10), true);

  assertStrictEquals(Type.isIntegerString("2", 10), true);
  assertStrictEquals(Type.isIntegerString("3", 10), true);
  assertStrictEquals(Type.isIntegerString("4", 10), true);
  assertStrictEquals(Type.isIntegerString("5", 10), true);
  assertStrictEquals(Type.isIntegerString("6", 10), true);
  assertStrictEquals(Type.isIntegerString("7", 10), true);
  assertStrictEquals(Type.isIntegerString("8", 10), true);
  assertStrictEquals(Type.isIntegerString("9", 10), true);
  assertStrictEquals(Type.isIntegerString("A", 10), false);
  assertStrictEquals(Type.isIntegerString("b", 10), false);
  assertStrictEquals(Type.isIntegerString("c", 10), false);
  assertStrictEquals(Type.isIntegerString("D", 10), false);
  assertStrictEquals(Type.isIntegerString("e", 10), false);
  assertStrictEquals(Type.isIntegerString("F", 10), false);
  assertStrictEquals(Type.isIntegerString("G", 10), false);
  assertStrictEquals(Type.isIntegerString("10", 10), true);

  assertStrictEquals(Type.isIntegerString("0.5", 10), false);
  assertStrictEquals(Type.isIntegerString(0, 10), false);

  assertStrictEquals(
    Type.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      10,
    ),
    true,
  );
});

Deno.test("Type.isIntegerString() - 16", () => {
  assertStrictEquals(Type.isIntegerString("0", 16), true);
  assertStrictEquals(Type.isIntegerString("-0", 16), true);
  assertStrictEquals(Type.isIntegerString("+0", 16), true);
  assertStrictEquals(Type.isIntegerString("-1", 16), true);
  assertStrictEquals(Type.isIntegerString("+1", 16), true);

  assertStrictEquals(Type.isIntegerString("2", 16), true);
  assertStrictEquals(Type.isIntegerString("3", 16), true);
  assertStrictEquals(Type.isIntegerString("4", 16), true);
  assertStrictEquals(Type.isIntegerString("5", 16), true);
  assertStrictEquals(Type.isIntegerString("6", 16), true);
  assertStrictEquals(Type.isIntegerString("7", 16), true);
  assertStrictEquals(Type.isIntegerString("8", 16), true);
  assertStrictEquals(Type.isIntegerString("9", 16), true);
  assertStrictEquals(Type.isIntegerString("A", 16), true);
  assertStrictEquals(Type.isIntegerString("b", 16), true);
  assertStrictEquals(Type.isIntegerString("c", 16), true);
  assertStrictEquals(Type.isIntegerString("D", 16), true);
  assertStrictEquals(Type.isIntegerString("e", 16), true);
  assertStrictEquals(Type.isIntegerString("F", 16), true);
  assertStrictEquals(Type.isIntegerString("G", 16), false);
  assertStrictEquals(Type.isIntegerString("10", 16), true);

  assertStrictEquals(Type.isIntegerString("0.5", 16), false);
  assertStrictEquals(Type.isIntegerString(0, 16), false);

  assertStrictEquals(
    Type.isIntegerString(
      "10000000000000000000000000000000000000000000000000000000000",
      16,
    ),
    true,
  );
});

Deno.test("Type.isIntegerString() - X", () => {
  assertThrows(
    () => {
      Type.isIntegerString("0", 101 as 2);
    },
    TypeError,
    "`radix` must be 2, 8, 10 or 16.",
  );

  // assertStrictEquals(Type.isIntegerString("0", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("-0", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("+0", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("-1", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("+1", 101 as 2), true);

  // assertStrictEquals(Type.isIntegerString("2", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("3", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("4", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("5", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("6", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("7", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("8", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("9", 101 as 2), true);
  // assertStrictEquals(Type.isIntegerString("A", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("b", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("c", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("D", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("e", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("F", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("G", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString("10", 101 as 2), true);

  // assertStrictEquals(Type.isIntegerString("0.5", 101 as 2), false);
  // assertStrictEquals(Type.isIntegerString(0, 101 as 2), false);

  // assertStrictEquals(
  //   Type.isIntegerString(
  //     "10000000000000000000000000000000000000000000000000000000000",
  //     101 as 2,
  //   ),
  //   true,
  // );
});

Deno.test("Type.assertIntegerString()", () => {
  try {
    Type.assertIntegerString("0", "test-1");
    Type.assertIntegerString("1", "test-1");
    Type.assertIntegerString("7", "test-1");
    Type.assertIntegerString("9", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertIntegerString("a", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertIntegerString("0", "test-1", 2);
    Type.assertIntegerString("1", "test-1", 2);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertIntegerString("2", "test-1", 2);
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertIntegerString("0", "test-1", 8);
    Type.assertIntegerString("1", "test-1", 8);
    Type.assertIntegerString("7", "test-1", 8);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertIntegerString("8", "test-1", 8);
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertIntegerString("0", "test-1", 16);
    Type.assertIntegerString("1", "test-1", 16);
    Type.assertIntegerString("7", "test-1", 16);
    Type.assertIntegerString("9", "test-1", 16);
    Type.assertIntegerString("f", "test-1", 16);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertIntegerString("g", "test-1", 16);
    unreachable();
  } catch {
    //
  }
});
