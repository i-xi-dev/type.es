import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { SimpleCondition } = Text;

Deno.test("Text.SimpleCondition.fromScripts()", () => {
  const c0 = SimpleCondition.fromScripts([]);
  assertStrictEquals(c0.isMatch("A"), false);
  assertStrictEquals(c0.isMatch("0"), false);

  const c1 = SimpleCondition.fromScripts(["Latn"]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("0"), false);

  assertThrows(
    () => {
      SimpleCondition.fromScripts(undefined as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromScripts("Latn" as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromScripts(["2222"] as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromScripts([1] as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
});
