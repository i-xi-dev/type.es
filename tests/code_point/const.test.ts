import { assertStrictEquals } from "@std/assert";
import { CodePoint } from "../../mod.ts";

Deno.test("CodePoint.MIN_VALUE", () => {
  assertStrictEquals(CodePoint.MIN_VALUE, 0);
});

Deno.test("CodePoint.MAX_VALUE", () => {
  assertStrictEquals(CodePoint.MAX_VALUE, 0x10FFFF);
});
