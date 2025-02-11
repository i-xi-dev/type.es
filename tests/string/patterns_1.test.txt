import { assertStrictEquals } from "@std/assert";
import { Basics } from "../../mod.ts";

const { StringType } = Basics;

const TOS = "[\\u{9}\\u{20}]+";

Deno.test("StringType.matchesPattern() - v", () => {
  assertStrictEquals(StringType.matchesPattern("", TOS), false);
  assertStrictEquals(StringType.matchesPattern("\u0008", TOS), false);
  assertStrictEquals(StringType.matchesPattern("\t", TOS), true);
  assertStrictEquals(StringType.matchesPattern("\u000A", TOS), false);
  assertStrictEquals(StringType.matchesPattern("\u001F", TOS), false);
  assertStrictEquals(StringType.matchesPattern(" ", TOS), true);
  assertStrictEquals(StringType.matchesPattern("\u0021", TOS), false);
  assertStrictEquals(StringType.matchesPattern("a", TOS), false);
  assertStrictEquals(
    StringType.matchesPattern("\t      \t    ", TOS),
    true,
  );
  assertStrictEquals(
    StringType.matchesPattern("az", "[\\u{41}\\u{5A}]+"),
    false,
  );
  assertStrictEquals(
    StringType.matchesPattern("AZ", "[\\u{41}\\u{5A}]+"),
    true,
  );
  assertStrictEquals(
    StringType.matchesPattern("azAZ", "[\\u{41}\\u{5A}]+"),
    false,
  );

  assertStrictEquals(
    StringType.matchesPattern(undefined as unknown as string, TOS),
    false,
  );
  assertStrictEquals(
    StringType.matchesPattern("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(StringType.matchesPattern("", ""), true);
  assertStrictEquals(StringType.matchesPattern("0", ""), false);
});

Deno.test("StringType.containsPattern() - v", () => {
  assertStrictEquals(StringType.containsPattern("", TOS), false);
  assertStrictEquals(StringType.containsPattern("\u0008", TOS), false);
  assertStrictEquals(StringType.containsPattern("\t", TOS), true);
  assertStrictEquals(StringType.containsPattern("\u000A", TOS), false);
  assertStrictEquals(StringType.containsPattern("\u001F", TOS), false);
  assertStrictEquals(StringType.containsPattern(" ", TOS), true);
  assertStrictEquals(StringType.containsPattern("\u0021", TOS), false);
  assertStrictEquals(StringType.containsPattern("a", TOS), false);
  assertStrictEquals(
    StringType.containsPattern("\t      \t    ", TOS),
    true,
  );
  assertStrictEquals(
    StringType.containsPattern("az", "[\\u{41}\\u{5A}]+"),
    false,
  );
  assertStrictEquals(
    StringType.containsPattern("AZ", "[\\u{41}\\u{5A}]+"),
    true,
  );
  assertStrictEquals(
    StringType.containsPattern("azAZ", "[\\u{41}\\u{5A}]+"),
    true,
  );

  assertStrictEquals(StringType.containsPattern("x x", TOS), true);
  assertStrictEquals(StringType.containsPattern(" x", TOS), true);
  assertStrictEquals(StringType.containsPattern("x ", TOS), true);

  assertStrictEquals(
    StringType.containsPattern(undefined as unknown as string, TOS),
    false,
  );
  assertStrictEquals(
    StringType.containsPattern("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(StringType.containsPattern("", ""), true);
  assertStrictEquals(StringType.containsPattern("0", ""), true);
});

Deno.test("StringType.startsWithPattern()", () => {
  assertStrictEquals(StringType.startsWithPattern("", TOS), false);
  assertStrictEquals(
    StringType.startsWithPattern("\u0008", TOS),
    false,
  );
  assertStrictEquals(StringType.startsWithPattern("\t", TOS), true);
  assertStrictEquals(
    StringType.startsWithPattern("\u000A", TOS),
    false,
  );
  assertStrictEquals(
    StringType.startsWithPattern("\u001F", TOS),
    false,
  );
  assertStrictEquals(StringType.startsWithPattern(" ", TOS), true);
  assertStrictEquals(
    StringType.startsWithPattern("\u0021", TOS),
    false,
  );
  assertStrictEquals(StringType.startsWithPattern("a", TOS), false);
  assertStrictEquals(
    StringType.startsWithPattern("\t      \t    ", TOS),
    true,
  );
  assertStrictEquals(
    StringType.startsWithPattern("az", "[\\u{41}\\u{5A}]+"),
    false,
  );
  assertStrictEquals(
    StringType.startsWithPattern("AZ", "[\\u{41}\\u{5A}]+"),
    true,
  );
  assertStrictEquals(
    StringType.startsWithPattern("azAZ", "[\\u{41}\\u{5A}]+"),
    false,
  );

  assertStrictEquals(StringType.startsWithPattern("x x", TOS), false);
  assertStrictEquals(StringType.startsWithPattern(" x", TOS), true);
  assertStrictEquals(StringType.startsWithPattern("x ", TOS), false);

  assertStrictEquals(
    StringType.startsWithPattern(undefined as unknown as string, TOS),
    false,
  );
  assertStrictEquals(
    StringType.startsWithPattern("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(StringType.startsWithPattern("", ""), true);
  assertStrictEquals(StringType.startsWithPattern("0", ""), true);
});

Deno.test("StringType.endsWithPattern()", () => {
  assertStrictEquals(StringType.endsWithPattern("", TOS), false);
  assertStrictEquals(StringType.endsWithPattern("\u0008", TOS), false);
  assertStrictEquals(StringType.endsWithPattern("\t", TOS), true);
  assertStrictEquals(StringType.endsWithPattern("\u000A", TOS), false);
  assertStrictEquals(StringType.endsWithPattern("\u001F", TOS), false);
  assertStrictEquals(StringType.endsWithPattern(" ", TOS), true);
  assertStrictEquals(StringType.endsWithPattern("\u0021", TOS), false);
  assertStrictEquals(StringType.endsWithPattern("a", TOS), false);
  assertStrictEquals(
    StringType.endsWithPattern("\t      \t    ", TOS),
    true,
  );
  assertStrictEquals(
    StringType.endsWithPattern("az", "[\\u{41}\\u{5A}]+"),
    false,
  );
  assertStrictEquals(
    StringType.endsWithPattern("AZ", "[\\u{41}\\u{5A}]+"),
    true,
  );
  assertStrictEquals(
    StringType.endsWithPattern("azAZ", "[\\u{41}\\u{5A}]+"),
    true,
  );

  assertStrictEquals(StringType.endsWithPattern("x x", TOS), false);
  assertStrictEquals(StringType.endsWithPattern(" x", TOS), false);
  assertStrictEquals(StringType.endsWithPattern("x ", TOS), true);

  assertStrictEquals(
    StringType.endsWithPattern(undefined as unknown as string, TOS),
    false,
  );
  assertStrictEquals(
    StringType.endsWithPattern("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(StringType.endsWithPattern("", ""), true);
  assertStrictEquals(StringType.endsWithPattern("0", ""), true);
});
