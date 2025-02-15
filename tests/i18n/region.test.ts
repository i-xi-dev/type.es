import { assertStrictEquals } from "@std/assert";
import { I18n } from "../../mod.ts";
const { Region } = I18n;

Deno.test("I18n.Region.infoFor()", () => {
  const l = Region.infoFor("US");
  assertStrictEquals(l?.alpha2, "US");
  assertStrictEquals(l?.number, 840);
  assertStrictEquals(l?.alpha3, "USA");
  assertStrictEquals(l?.name, "United States");
  assertStrictEquals(l?.private, false);

  const q = Region.infoFor("XX");
  assertStrictEquals(q?.alpha2, "XX");
  assertStrictEquals(q?.number, Number.NaN);
  assertStrictEquals(q?.alpha3, "");
  assertStrictEquals(q?.name, "");
  assertStrictEquals(q?.private, true);
});
