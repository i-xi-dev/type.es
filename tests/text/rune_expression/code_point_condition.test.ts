import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { SimpleCondition } = Text;

Deno.test("Text.SimpleCondition.fromCodePointRanges()", () => {
  const c0 = SimpleCondition.fromCodePointRanges([]);
  assertStrictEquals(c0.isMatch("\uFFFF"), false);
  assertStrictEquals(c0.isMatch("\u{10000}"), false);
  assertStrictEquals(c0.isMatch(0), false);

  const c1 = SimpleCondition.fromCodePointRanges([[0, 0xFFFF]]);
  assertStrictEquals(c1.isMatch("\uFFFF"), true);
  assertStrictEquals(c1.isMatch("\u{10000}"), false);
  assertStrictEquals(c1.isMatch(0), true);

  assertThrows(
    () => {
      SimpleCondition.fromCodePointRanges(undefined as unknown as [[0, 0]]);
    },
    TypeError,
    "`subranges` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromCodePointRanges("1" as unknown as [[0, 0]]);
    },
    TypeError,
    "`subranges` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromCodePointRanges([0, 0] as unknown as [[0, 0]]);
    },
    TypeError,
    "`subrange` must be a range of code point.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromCodePointRanges(
        [["0", "0"]] as unknown as [[0, 0]],
      );
    },
    TypeError,
    "`subrange` must be a range of code point.",
  );
});

Deno.test("Text.SimpleCondition.fromCodePlanes()", () => {
  const c0 = SimpleCondition.fromCodePlanes([]);
  assertStrictEquals(c0.isMatch("\uFFFF"), false);
  assertStrictEquals(c0.isMatch("\u{10000}"), false);
  assertStrictEquals(c0.isMatch(0), false);

  const c1 = SimpleCondition.fromCodePlanes([0]);
  assertStrictEquals(c1.isMatch("\uFFFF"), true);
  assertStrictEquals(c1.isMatch("\u{10000}"), false);
  assertStrictEquals(c1.isMatch(0), true);

  assertThrows(
    () => {
      SimpleCondition.fromCodePlanes(undefined as unknown as [0]);
    },
    TypeError,
    "`planes` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromCodePlanes("1" as unknown as [0]);
    },
    TypeError,
    "`planes` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromCodePlanes([[0, 0]] as unknown as [0]);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromCodePlanes(["0"] as unknown as [0]);
    },
    TypeError,
    "`codePlane` must be an code point plane value.",
  );
});

Deno.test("Text.SimpleCondition.prototype.isMatch() - _CodePointCondition", () => {
  const c1 = SimpleCondition.fromCodePointRanges([[0x200, 0x204]]);
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
