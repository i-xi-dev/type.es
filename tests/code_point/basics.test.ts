import { assertStrictEquals, assertThrows } from "@std/assert";
import { CodePoint } from "../../mod.ts";

Deno.test("CodePoint.toString()", () => {
  assertStrictEquals(CodePoint.toString(-0x0), "U+0000");
  assertStrictEquals(CodePoint.toString(0x0), "U+0000");
  assertStrictEquals(CodePoint.toString(0xFFFF), "U+FFFF");
  assertStrictEquals(CodePoint.toString(0x10000), "U+10000");
  assertStrictEquals(CodePoint.toString(0x10FFFF), "U+10FFFF");

  assertThrows(
    () => {
      CodePoint.toString(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      CodePoint.toString(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      CodePoint.toString("0" as unknown as number);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});

Deno.test("CodePoint.toRune()", () => {
  assertStrictEquals(CodePoint.toRune(-0x0), "\u0000");
  assertStrictEquals(CodePoint.toRune(0x0), "\u0000");
  assertStrictEquals(CodePoint.toRune(0xFFFF), "\uFFFF");
  assertStrictEquals(CodePoint.toRune(0x10000), "\u{10000}");
  assertStrictEquals(CodePoint.toRune(0x10FFFF), "\u{10FFFF}");

  assertThrows(
    () => {
      CodePoint.toRune(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      CodePoint.toRune(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      CodePoint.toRune("0" as unknown as number);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});
