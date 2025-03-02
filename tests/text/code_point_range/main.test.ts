import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { CodePointRange } = Text;

Deno.test("Text.CodePointRange.ofCodePlane()", () => {
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(0)),
    "[0,65535]",
  );
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(1)),
    "[65536,131071]",
  );
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(2)),
    "[131072,196607]",
  );
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(3)),
    "[196608,262143]",
  );
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(4)),
    "[262144,327679]",
  );
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(5)),
    "[327680,393215]",
  );
  assertStrictEquals(
    JSON.stringify(CodePointRange.ofCodePlane(16)),
    "[1048576,1114111]",
  );

  assertThrows(
    () => {
      CodePointRange.ofCodePlane(17 as 0);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
  assertThrows(
    () => {
      CodePointRange.ofCodePlane(-1 as 0);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
  assertThrows(
    () => {
      CodePointRange.ofCodePlane(0.5 as 0);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
});
