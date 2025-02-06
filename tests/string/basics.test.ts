import { assertStrictEquals, assertThrows } from "@std/assert";
import { ExString } from "../../mod.ts";

Deno.test("ExString.charCountOf()", () => {
  assertStrictEquals(ExString.charCountOf(""), 0);
  assertStrictEquals(ExString.charCountOf("012"), 3);
  assertStrictEquals(ExString.charCountOf("あい"), 2);
  assertStrictEquals(ExString.charCountOf("\u{2000B}"), 2);
  assertStrictEquals(ExString.charCountOf("\u{dc0b}\u{d840}"), 2);

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      ExString.charCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
});

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("ExString.toChars()", () => {
  assertStrictEquals(_iToS(ExString.toChars("")), `[]`);
  assertStrictEquals(_iToS(ExString.toChars("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(ExString.toChars("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(ExString.toChars("\u{2000B}")),
    `["\\ud840","\\udc0b"]`,
  );
  assertStrictEquals(
    _iToS(ExString.toChars("\u{dc0b}\u{d840}")),
    `["\\udc0b","\\ud840"]`,
  );

  assertStrictEquals(
    _iToS(ExString.toChars("𩸽が塚󠄁")),
    `["\\ud867","\\ude3d","\u304b","\u3099","\u585A","\\udb40","\\udd01"]`,
  );

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...ExString.toChars(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
});

Deno.test("ExString.toCharCodes()", () => {
  assertStrictEquals(_iToS(ExString.toCharCodes("")), `[]`);
  assertStrictEquals(_iToS(ExString.toCharCodes("012")), `[48,49,50]`);
  assertStrictEquals(_iToS(ExString.toCharCodes("あい")), `[12354,12356]`);
  assertStrictEquals(
    _iToS(ExString.toCharCodes("\u{2000B}")),
    `[55360,56331]`,
  );
  assertStrictEquals(
    _iToS(ExString.toCharCodes("\u{dc0b}\u{d840}")),
    `[56331,55360]`,
  );

  assertStrictEquals(
    _iToS(ExString.toCharCodes("𩸽が塚󠄁")),
    `[55399,56893,12363,12441,22618,56128,56577]`,
  );

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...ExString.toCharCodes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
});
