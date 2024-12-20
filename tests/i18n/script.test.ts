import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { I18n } from "../../mod.ts";

const { Script } = I18n;

Deno.test("Script.is()", () => {
  assertStrictEquals(Script.is("Latn"), true);

  assertStrictEquals(Script.is("Aaaaa"), false);
  assertStrictEquals(Script.is("Aaa"), false);
  assertStrictEquals(Script.is("AAAA"), false);
});

Deno.test("Script.assert()", () => {
  try {
    Script.assert("Latn", "test-1");
    Script.assert("Zxxx", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Script.assert("Aaaaa", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Script.propertiesOf()", () => {
  const l = Script.propertiesOf("Latn");
  assertStrictEquals(l?.code, "Latn");
  assertStrictEquals(l?.number, 215);
  assertStrictEquals(l?.name, "Latin");
  assertStrictEquals(l?.alias, "Latin");

  const s = Script.propertiesOf("Zsym");
  assertStrictEquals(s?.code, "Zsym");
  assertStrictEquals(s?.number, 996);
  assertStrictEquals(s?.name, "Symbols");
  assertStrictEquals(s?.alias, "");
});
