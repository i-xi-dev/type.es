import { assertStrictEquals } from "@std/assert";
import { I18n } from "../../mod.ts";
const { Language } = I18n;

Deno.test("Language.infoFor()", () => {
  const e = Language.infoFor("en");
  assertStrictEquals(e?.alpha2, "en");
  assertStrictEquals(e?.alpha3, "eng");
  assertStrictEquals(e?.alpha3b, "eng");
  assertStrictEquals(e?.name, "English");
  assertStrictEquals(e?.private, false);
  assertStrictEquals(e?.scope, "individual");
  assertStrictEquals(e?.type, "living");

  const n = Language.infoFor("nl");
  assertStrictEquals(n?.alpha2, "nl");
  assertStrictEquals(n?.alpha3, "nld");
  assertStrictEquals(n?.alpha3b, "dut");
  assertStrictEquals(n?.name, "Dutch");
  assertStrictEquals(n?.private, false);

  const q = Language.infoFor("qqz");
  assertStrictEquals(q?.alpha2, "");
  assertStrictEquals(q?.alpha3, "qqz");
  assertStrictEquals(q?.alpha3b, "qqz");
  assertStrictEquals(q?.name, "");
  assertStrictEquals(q?.private, true);
});
