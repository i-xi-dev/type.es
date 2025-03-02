import { assertStrictEquals } from "@std/assert";
import { Text } from "../../../mod.ts";

const { UnicodeGeneralCategory } = Text;

Deno.test("Text.UnicodeGeneralCategory.*", () => {
  assertStrictEquals(UnicodeGeneralCategory.SPACE_SEPARATOR, "Zs");
});
