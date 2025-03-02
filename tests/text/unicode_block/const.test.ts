import { assertStrictEquals } from "@std/assert";
import { Text } from "../../../mod.ts";

const { UnicodeBlock } = Text;

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
