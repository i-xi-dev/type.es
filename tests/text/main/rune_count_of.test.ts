import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

Deno.test("Text.runeCountOf()", () => {
  assertStrictEquals(Text.runeCountOf(""), 0);
  assertStrictEquals(Text.runeCountOf("012"), 3);
  assertStrictEquals(Text.runeCountOf("あい"), 2);
  assertStrictEquals(Text.runeCountOf("\u{2000B}"), 1);

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      Text.runeCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );

  // assertThrows(
  //   () => {
  //     Text.runeCountOf("\u{dc0b}\u{d840}");
  //   },
  //   TypeError,
  //   e1,
  // );
  assertStrictEquals(Text.runeCountOf("\u{dc0b}\u{d840}"), 2);
});
