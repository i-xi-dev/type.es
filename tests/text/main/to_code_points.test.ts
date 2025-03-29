import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";
import { str } from "../../test_utils.ts";

Deno.test("Text.toCodePoints()", () => {
  assertStrictEquals(str(Text.toCodePoints("")), `[]`);
  assertStrictEquals(str(Text.toCodePoints("012")), `[48,49,50]`);
  assertStrictEquals(
    str(Text.toCodePoints("あい")),
    `[12354,12356]`,
  );
  assertStrictEquals(
    str(Text.toCodePoints("\u{2000B}")),
    `[131083]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(
    str(Text.toCodePoints("012\u{2000B}あい")),
    `[48,49,50,131083,12354,12356]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      Text.toCodePoints(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...Text.toCodePoints("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );

  const op = { allowMalformed: true };
  assertStrictEquals(
    str(Text.toCodePoints("\u{dc0b}\u{d840}", op)),
    `[56331,55360]`,
  );
});
