import { assertStrictEquals } from "@std/assert";
import { Text } from "../../mod.ts";

const { Rune } = Text;

Deno.test("Rune.matchesCommonScript()", () => {
  assertStrictEquals(Rune.matchesCommonScript("ア"), false);
  assertStrictEquals(Rune.matchesCommonScript("あ"), false);
  assertStrictEquals(Rune.matchesCommonScript("ー"), true);
  assertStrictEquals(Rune.matchesCommonScript("\u3099"), false);
  assertStrictEquals(Rune.matchesCommonScript("a"), false);
  assertStrictEquals(Rune.matchesCommonScript("1"), true);

  assertStrictEquals(Rune.matchesCommonScript(""), false);
  assertStrictEquals(Rune.matchesCommonScript("11"), false);
});

Deno.test("Rune.matchesInheritedScript()", () => {
  assertStrictEquals(Rune.matchesInheritedScript("ア"), false);
  assertStrictEquals(Rune.matchesInheritedScript("あ"), false);
  assertStrictEquals(Rune.matchesInheritedScript("ー"), false);
  assertStrictEquals(Rune.matchesInheritedScript("\u3099"), true);
  assertStrictEquals(Rune.matchesInheritedScript("a"), false);
  assertStrictEquals(Rune.matchesInheritedScript("1"), false);

  assertStrictEquals(Rune.matchesInheritedScript(""), false);
  assertStrictEquals(Rune.matchesInheritedScript("11"), false);
});
