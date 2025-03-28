import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";
import { str } from "../../test_utils.ts";

Deno.test("Text.toRunes()", () => {
  assertStrictEquals(str(Text.toRunes("")), `[]`);
  assertStrictEquals(str(Text.toRunes("012")), `["0","1","2"]`);
  assertStrictEquals(str(Text.toRunes("あい")), `["あ","い"]`);
  assertStrictEquals(
    str(Text.toRunes("\u{2000B}")),
    `["\u{2000B}"]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(str(Text.toRunes("g̈")), `["\u0067","\u0308"]`);
  assertStrictEquals(str(Text.toRunes("각")), `["\uAC01"]`);
  assertStrictEquals(
    str(Text.toRunes("각")),
    `["\u1100","\u1161","\u11A8"]`,
  );
  assertStrictEquals(str(Text.toRunes("ก")), `["\u0E01"]`);

  assertStrictEquals(str(Text.toRunes("நி")), `["\u0BA8","\u0BBF"]`);
  assertStrictEquals(str(Text.toRunes("เ")), `["\u0E40"]`);
  assertStrictEquals(str(Text.toRunes("กำ")), `["\u0E01","\u0E33"]`);
  assertStrictEquals(str(Text.toRunes("षि")), `["\u0937","\u093F"]`);
  assertStrictEquals(
    str(Text.toRunes("क्षि")),
    `["\u0915","\u094D","\u0937","\u093F"]`,
  );

  assertStrictEquals(str(Text.toRunes("ำ")), `["\u0E33"]`);
  assertStrictEquals(str(Text.toRunes("ष")), `["\u0937"]`);
  assertStrictEquals(str(Text.toRunes("ि")), `["\u093F"]`);

  assertStrictEquals(str(Text.toRunes("ch")), `["\u0063","\u0068"]`);
  assertStrictEquals(str(Text.toRunes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(str(Text.toRunes("Ą́")), `["\u0104","\u0301"]`);

  assertStrictEquals(
    str(Text.toRunes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b","\u3099","\u585A","\u{E0101}"]`,
  );

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      Text.toRunes(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  // assertThrows(
  //   () => {
  //     Text.toRunes("\u{dc0b}\u{d840}");
  //   },
  //   TypeError,
  //   e1,
  // );
  assertStrictEquals(
    str(Text.toRunes("\u{dc0b}\u{d840}")),
    `["\\udc0b","\\ud840"]`,
  );
});
