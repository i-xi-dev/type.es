import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { RuneExpression } = Text;

Deno.test("Text.RuneExpression.fromCodePointRanges()", () => {
  const c0 = RuneExpression.fromCodePointRanges([]);
  assertStrictEquals(c0.isMatch("\uFFFF"), false);
  assertStrictEquals(c0.isMatch("\u{10000}"), false);
  assertStrictEquals(c0.isMatch(0), false);

  const c1 = RuneExpression.fromCodePointRanges([[0, 0xFFFF]]);
  assertStrictEquals(c1.isMatch("\uFFFF"), true);
  assertStrictEquals(c1.isMatch("\u{10000}"), false);
  assertStrictEquals(c1.isMatch(0), true);

  assertThrows(
    () => {
      RuneExpression.fromCodePointRanges(undefined as unknown as [[0, 0]]);
    },
    TypeError,
    "`subranges` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromCodePointRanges("1" as unknown as [[0, 0]]);
    },
    TypeError,
    "`subranges` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromCodePointRanges([0, 0] as unknown as [[0, 0]]);
    },
    TypeError,
    "`subrange` must be a range of code point.",
  );
  assertThrows(
    () => {
      RuneExpression.fromCodePointRanges(
        [["0", "0"]] as unknown as [[0, 0]],
      );
    },
    TypeError,
    "`subrange` must be a range of code point.",
  );
});

Deno.test("Text.RuneExpression.fromCodePlanes()", () => {
  const c0 = RuneExpression.fromCodePlanes([]);
  assertStrictEquals(c0.isMatch("\uFFFF"), false);
  assertStrictEquals(c0.isMatch("\u{10000}"), false);
  assertStrictEquals(c0.isMatch(0), false);

  const c1 = RuneExpression.fromCodePlanes([0]);
  assertStrictEquals(c1.isMatch("\uFFFF"), true);
  assertStrictEquals(c1.isMatch("\u{10000}"), false);
  assertStrictEquals(c1.isMatch(0), true);

  assertThrows(
    () => {
      RuneExpression.fromCodePlanes(undefined as unknown as [0]);
    },
    TypeError,
    "`planes` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromCodePlanes("1" as unknown as [0]);
    },
    TypeError,
    "`planes` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromCodePlanes([[0, 0]] as unknown as [0]);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
  assertThrows(
    () => {
      RuneExpression.fromCodePlanes(["0"] as unknown as [0]);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
});

Deno.test(" _CodePointCondition.prototype.isMatch()", () => {
  const c1 = RuneExpression.fromCodePointRanges([[0x200, 0x204]]);
  assertStrictEquals(c1.isMatch(0x1FF), false);
  assertStrictEquals(c1.isMatch(0x200), true);
  assertStrictEquals(c1.isMatch(0x201), true);
  assertStrictEquals(c1.isMatch(0x202), true);
  assertStrictEquals(c1.isMatch(0x203), true);
  assertStrictEquals(c1.isMatch(0x204), true);
  assertStrictEquals(c1.isMatch(0x205), false);

  assertStrictEquals(c1.isMatch("\u01FF"), false);
  assertStrictEquals(c1.isMatch("\u0200"), true);
  assertStrictEquals(c1.isMatch("\u0201"), true);
  assertStrictEquals(c1.isMatch("\u0202"), true);
  assertStrictEquals(c1.isMatch("\u0203"), true);
  assertStrictEquals(c1.isMatch("\u0204"), true);
  assertStrictEquals(c1.isMatch("\u0205"), false);

  assertThrows(
    () => {
      c1.isMatch(-1);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      c1.isMatch(0x110000);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      c1.isMatch("");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      c1.isMatch("00");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      c1.isMatch(null as unknown as 0);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
});

Deno.test(" _CodePointCondition.prototype.findMatchedRunes()", () => {
  const s1 = RuneExpression.fromCodePlanes([1]);
  const r1a = s1.findMatchedRunes("123D\u{10000}E\u{10000}6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a]),
    `[{"rune":"\u{10000}","runeIndex":4},{"rune":"\u{10000}","runeIndex":6}]`,
  );
  const r1b = s1.findMatchedRunes("");
  assertStrictEquals(JSON.stringify([...r1b]), `[]`);

  assertThrows(
    () => {
      s1.findMatchedRunes("\uD800");
    },
    TypeError,
    "`text` must be a `USVString`.",
  );
});
