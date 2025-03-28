import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";
import { str } from "../../test_utils.ts";

Deno.test("Text.toBytes()", () => {
  assertStrictEquals(str(Text.toBytes("")), "[]");

  assertStrictEquals(
    str(Text.toBytes("1あ3\u{A9}")),
    "[49,227,129,130,51,194,169]",
  );

  assertThrows(
    () => {
      Text.toBytes(null as unknown as string);
    },
    TypeError,
    "`text` must be a `string`.",
  );
});
