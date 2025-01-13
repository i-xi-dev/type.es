import { assertStrictEquals } from "@std/assert";
import { Basics } from "../../mod.ts";

const { StringType } = Basics;

const TOS = "[\\u{9}\\u{20}]+";

Deno.test("StringType.patternMatches() - v", () => {
  assertStrictEquals(StringType.patternMatches("", TOS), false);
  assertStrictEquals(StringType.patternMatches("\u0008", TOS), false);
  assertStrictEquals(StringType.patternMatches("\t", TOS), true);
  assertStrictEquals(StringType.patternMatches("\u000A", TOS), false);
  assertStrictEquals(StringType.patternMatches("\u001F", TOS), false);
  assertStrictEquals(StringType.patternMatches(" ", TOS), true);
  assertStrictEquals(StringType.patternMatches("\u0021", TOS), false);
  assertStrictEquals(StringType.patternMatches("a", TOS), false);
  assertStrictEquals(
    StringType.patternMatches("\t      \t    ", TOS),
    true,
  );
  assertStrictEquals(
    StringType.patternMatches("az", "[\\u{41}\\u{5A}]+"),
    false,
  );
  assertStrictEquals(
    StringType.patternMatches("AZ", "[\\u{41}\\u{5A}]+"),
    true,
  );
  assertStrictEquals(
    StringType.patternMatches("azAZ", "[\\u{41}\\u{5A}]+"),
    false,
  );

  assertStrictEquals(
    StringType.patternMatches(undefined as unknown as string, TOS),
    false,
  );
  assertStrictEquals(
    StringType.patternMatches("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(StringType.patternMatches("", ""), true);
  assertStrictEquals(StringType.patternMatches("0", ""), false);
});

Deno.test("StringType.patternContains() - v", () => {
  assertStrictEquals(StringType.patternContains("", TOS), false);
  assertStrictEquals(StringType.patternContains("\u0008", TOS), false);
  assertStrictEquals(StringType.patternContains("\t", TOS), true);
  assertStrictEquals(StringType.patternContains("\u000A", TOS), false);
  assertStrictEquals(StringType.patternContains("\u001F", TOS), false);
  assertStrictEquals(StringType.patternContains(" ", TOS), true);
  assertStrictEquals(StringType.patternContains("\u0021", TOS), false);
  assertStrictEquals(StringType.patternContains("a", TOS), false);
  assertStrictEquals(
    StringType.patternContains("\t      \t    ", TOS),
    true,
  );
  assertStrictEquals(
    StringType.patternContains("az", "[\\u{41}\\u{5A}]+"),
    false,
  );
  assertStrictEquals(
    StringType.patternContains("AZ", "[\\u{41}\\u{5A}]+"),
    true,
  );
  assertStrictEquals(
    StringType.patternContains("azAZ", "[\\u{41}\\u{5A}]+"),
    true,
  );

  assertStrictEquals(StringType.patternContains("x x", TOS), true);
  assertStrictEquals(StringType.patternContains(" x", TOS), true);
  assertStrictEquals(StringType.patternContains("x ", TOS), true);

  assertStrictEquals(
    StringType.patternContains(undefined as unknown as string, TOS),
    false,
  );
  assertStrictEquals(
    StringType.patternContains("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(StringType.patternContains("", ""), true);
  assertStrictEquals(StringType.patternContains("0", ""), true);
});
