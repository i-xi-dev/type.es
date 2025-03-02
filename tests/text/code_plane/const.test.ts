import { assertStrictEquals } from "@std/assert";
import { Text } from "../../../mod.ts";

const { CodePlane } = Text;

Deno.test("Text.CodePlane.*", () => {
  assertStrictEquals(CodePlane.BMP, 0);
  assertStrictEquals(CodePlane.SMP, 1);
  assertStrictEquals(CodePlane.SIP, 2);
  assertStrictEquals(CodePlane.TIP, 3);
  assertStrictEquals(CodePlane.SSP, 14);
  assertStrictEquals(CodePlane.SPUA_A, 15);
  assertStrictEquals(CodePlane.SPUA_B, 16);
});
