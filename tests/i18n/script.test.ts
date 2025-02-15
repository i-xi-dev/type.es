import { assertStrictEquals } from "@std/assert";
import { I18n } from "../../mod.ts";
const { Script } = I18n;

Deno.test("I18n.Script.infoFor()", () => {
  const l = Script.infoFor("Latn");
  assertStrictEquals(l?.alpha4, "Latn");
  assertStrictEquals(l?.number, 215);
  assertStrictEquals(l?.name, "Latin");
  assertStrictEquals(l?.pva, "Latin");
  assertStrictEquals(l?.private, false);

  // const l2 = Script.infoFor("Latn", "ja");
  // assertStrictEquals(l2?.name, "ラテン文字"); 環境依存

  const s = Script.infoFor("Zsym");
  assertStrictEquals(s?.alpha4, "Zsym");
  assertStrictEquals(s?.number, 996);
  assertStrictEquals(s?.name, "Symbols");
  assertStrictEquals(s?.pva, "");
  assertStrictEquals(s?.private, false);

  const q = Script.infoFor("Qabc");
  assertStrictEquals(q?.alpha4, "Qabc");
  assertStrictEquals(q?.number, 928);
  assertStrictEquals(q?.name, "");
  assertStrictEquals(q?.pva, "");
  assertStrictEquals(q?.private, true);
});
