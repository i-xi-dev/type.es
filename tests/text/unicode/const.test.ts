import { assertStrictEquals } from "@std/assert";
import { Text } from "../../../mod.ts";

const { Unicode } = Text;

Deno.test("Text.Unicode.Plane.*", () => {
  assertStrictEquals(Unicode.Plane.BMP, 0);
  assertStrictEquals(Unicode.Plane.SMP, 1);
  assertStrictEquals(Unicode.Plane.SIP, 2);
  assertStrictEquals(Unicode.Plane.TIP, 3);
  assertStrictEquals(Unicode.Plane.SSP, 14);
  assertStrictEquals(Unicode.Plane.SPUA_A, 15);
  assertStrictEquals(Unicode.Plane.SPUA_B, 16);
});

Deno.test("Text.Unicode.GeneralCategory.*", () => {
  assertStrictEquals(Unicode.GeneralCategory.SPACE_SEPARATOR, "Zs");
});

Deno.test("Text.Unicode.Block.*", () => {
  assertStrictEquals(
    Unicode.Block.SUPPLEMENTARY_PRIVATE_USE_AREA_A[0],
    0xF0000,
  );
  assertStrictEquals(
    Unicode.Block.SUPPLEMENTARY_PRIVATE_USE_AREA_A[1],
    0xFFFFF,
  );
});
