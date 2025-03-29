import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

Deno.test("Text.fromCodePoints()", () => {
  assertStrictEquals(Text.fromCodePoints([]), "");
  assertStrictEquals(Text.fromCodePoints([48, 49, 50]), "012");
  assertStrictEquals(Text.fromCodePoints([12354, 12356]), "あい");
  assertStrictEquals(Text.fromCodePoints([131083]), "\u{2000B}");

  assertStrictEquals(
    Text.fromCodePoints([48, 49, 50, 131083, 12354, 12356]),
    "012\u{2000B}あい",
  );

  const e1 = "`value` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      [...Text.fromCodePoints(1 as unknown as number[])];
    },
    TypeError,
    e1,
  );

  const e2 = "`value[1]` must be a code point.";
  assertThrows(
    () => {
      [...Text.fromCodePoints([48, -1])];
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must not contain lone surrogate code points.";
  assertThrows(
    () => {
      [...Text.fromCodePoints([48, 0xDC00, 0xD800])];
    },
    RangeError,
    e3,
  );
  const op = { allowMalformed: true };
  assertStrictEquals(
    Text.fromCodePoints([48, 0xDC00, 0xD800], op),
    "0\uDC00\uD800",
  );
});
