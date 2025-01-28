import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Basics } from "../../mod.ts";

const { StringType } = Basics;

Deno.test("StringType.charCountOf()", () => {
  assertStrictEquals(StringType.charCountOf(""), 0);
  assertStrictEquals(StringType.charCountOf("012"), 3);
  assertStrictEquals(StringType.charCountOf("あい"), 2);
  assertStrictEquals(StringType.charCountOf("\u{2000B}"), 2);
  assertStrictEquals(StringType.charCountOf("\u{dc0b}\u{d840}"), 2);

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      StringType.charCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
});

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("StringType.toChars()", () => {
  assertStrictEquals(_iToS(StringType.toChars("")), `[]`);
  assertStrictEquals(_iToS(StringType.toChars("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(StringType.toChars("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(StringType.toChars("\u{2000B}")),
    `["\\ud840","\\udc0b"]`,
  );
  assertStrictEquals(
    _iToS(StringType.toChars("\u{dc0b}\u{d840}")),
    `["\\udc0b","\\ud840"]`,
  );

  assertStrictEquals(
    _iToS(StringType.toChars("𩸽が塚󠄁")),
    `["\\ud867","\\ude3d","\u304b","\u3099","\u585A","\\udb40","\\udd01"]`,
  );

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.toChars(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
});
