import { assertStrictEquals, assertThrows } from "@std/assert";
import { Rune } from "../../mod.ts";

Deno.test("Rune.fromCodePoint()", () => {
  assertStrictEquals(Rune.fromCodePoint(-0x0), "\u0000");
  assertStrictEquals(Rune.fromCodePoint(0x0), "\u0000");
  assertStrictEquals(Rune.fromCodePoint(0xFFFF), "\uFFFF");
  assertStrictEquals(Rune.fromCodePoint(0x10000), "\u{10000}");
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF), "\u{10FFFF}");

  assertThrows(
    () => {
      Rune.fromCodePoint(0xD800);
    },
    RangeError,
    `\`codePoint\` is a lone surrogate code point.`,
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint("0" as unknown as number);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});

Deno.test("Rune.toCodePoint()", () => {
  assertStrictEquals(Rune.toCodePoint("\u0000"), 0x0);
  assertStrictEquals(Rune.toCodePoint("\uFFFF"), 0xFFFF);
  assertStrictEquals(Rune.toCodePoint("\u{10000}"), 0x10000);
  assertStrictEquals(Rune.toCodePoint("\u{10FFFF}"), 0x10FFFF);

  assertThrows(
    () => {
      Rune.toCodePoint("\uD800");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );

  assertThrows(
    () => {
      Rune.toCodePoint("");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );

  assertThrows(
    () => {
      Rune.toCodePoint("00");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );

  assertThrows(
    () => {
      Rune.toCodePoint(0 as unknown as string);
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );
});
