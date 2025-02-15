import { assertStrictEquals } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("Unicode.Plane.*", () => {
  assertStrictEquals(Unicode.Plane.BMP, 0);
  assertStrictEquals(Unicode.Plane.SMP, 1);
  assertStrictEquals(Unicode.Plane.SIP, 2);
  assertStrictEquals(Unicode.Plane.TIP, 3);
  assertStrictEquals(Unicode.Plane.SSP, 14);
  assertStrictEquals(Unicode.Plane.SPUA_A, 15);
  assertStrictEquals(Unicode.Plane.SPUA_B, 16);
});

Deno.test("Unicode.GeneralCategory.*", () => {
  assertStrictEquals(Unicode.GeneralCategory.SPACE_SEPARATOR, "Zs");
});

Deno.test("Unicode.Block.*", () => {
  assertStrictEquals(
    Unicode.Block.SUPPLEMENTARY_PRIVATE_USE_AREA_A[0],
    0xF0000,
  );
  assertStrictEquals(
    Unicode.Block.SUPPLEMENTARY_PRIVATE_USE_AREA_A[1],
    0xFFFFF,
  );
});
