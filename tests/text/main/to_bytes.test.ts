import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";
import { str } from "../../test_utils.ts";

Deno.test("Text.toBytes()", () => {
  assertStrictEquals(str(Text.toBytes("")), "[]");

  assertStrictEquals(
    str(Text.toBytes("1あ3\u{A9}")),
    "[49,227,129,130,51,194,169]",
  );

  assertStrictEquals(
    str(Text.toBytes("1\uFEFFあ3\u{A9}")),
    "[49,239,187,191,227,129,130,51,194,169]",
  );

  assertStrictEquals(
    str(Text.toBytes("\uFEFF1あ3\u{A9}")),
    "[239,187,191,49,227,129,130,51,194,169]",
  );

  assertThrows(
    () => {
      Text.toBytes(null as unknown as string);
    },
    TypeError,
    "`text` must be a `USVString`.",
  );

  assertStrictEquals(str(Text.toBytes("\u{2000B}")), "[240,160,128,139]");
  assertStrictEquals(
    str(Text.toBytes("\u{d840}\u{dc0b}")),
    "[240,160,128,139]",
  );

  // lone surrogate * 2
  assertThrows(
    () => {
      Text.toBytes("\u{dc0b}\u{d840}");
    },
    TypeError,
    "`text` must be a `USVString`.",
  );
  const op = { allowMalformed: true };
  assertStrictEquals(
    str(Text.toBytes("\u{dc0b}\u{d840}", op)),
    "[239,191,189,239,191,189]",
  );
});
