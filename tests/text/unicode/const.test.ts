import { assertStrictEquals } from "@std/assert";
import { Text } from "../../../mod.ts";

const { CodePlane, UnicodeBlock, UnicodeGeneralCategory } = Text;

Deno.test("Text.CodePlane.*", () => {
  assertStrictEquals(CodePlane.BMP, 0);
  assertStrictEquals(CodePlane.SMP, 1);
  assertStrictEquals(CodePlane.SIP, 2);
  assertStrictEquals(CodePlane.TIP, 3);
  assertStrictEquals(CodePlane.SSP, 14);
  assertStrictEquals(CodePlane.SPUA_A, 15);
  assertStrictEquals(CodePlane.SPUA_B, 16);
});

Deno.test("Text.UnicodeGeneralCategory.*", () => {
  assertStrictEquals(UnicodeGeneralCategory.SPACE_SEPARATOR, "Zs");
});

Deno.test("Text.UnicodeBlock.*", () => {
  assertStrictEquals(
    UnicodeBlock.SUPPLEMENTARY_PRIVATE_USE_AREA_A[0],
    0xF0000,
  );
  assertStrictEquals(
    UnicodeBlock.SUPPLEMENTARY_PRIVATE_USE_AREA_A[1],
    0xFFFFF,
  );
});
