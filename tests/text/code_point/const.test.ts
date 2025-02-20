import { assertStrictEquals } from "@std/assert";
import { Text } from "../../../mod.ts";

Deno.test("Text.CodePoint.MIN_VALUE", () => {
  assertStrictEquals(Text.CodePoint.MIN_VALUE, 0);
});

Deno.test("Text.CodePoint.MAX_VALUE", () => {
  assertStrictEquals(Text.CodePoint.MAX_VALUE, 0x10FFFF);
});
