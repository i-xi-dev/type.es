import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { RuneExpression } = Text;

Deno.test("Text.RuneExpression.or()", () => {
  const c1 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
  ]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("a"), true);
  assertStrictEquals(c1.isMatch("1"), false);
  assertStrictEquals(c1.isMatch(0), false);

  const c2 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
    RuneExpression.fromGeneralCategories(["N"]),
  ]);
  assertStrictEquals(c2.isMatch("A"), true);
  assertStrictEquals(c2.isMatch("a"), true);
  assertStrictEquals(c2.isMatch("1"), true);
  assertStrictEquals(c2.isMatch(0), false);

  assertThrows(
    () => {
      RuneExpression.or([]);
    },
    TypeError,
    "`expressions` must have 1 or more expressions.",
  );

  assertThrows(
    () => {
      RuneExpression.or([{} as unknown as Text.RuneExpression]);
    },
    TypeError,
    "`expressions[*]` must be a `RuneExpression`.",
  );
});

Deno.test(" _OrExpression.prototype[Symbol.toStringTag]", () => {
  const c1 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
  ]);
  assertStrictEquals(
    (c1 as unknown as { [Symbol.toStringTag]: string })[Symbol.toStringTag],
    "RuneExpression",
  );
});

Deno.test(" _OrExpression.prototype.isMatch()", () => {
  const c1 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
  ]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("a"), true);
  assertStrictEquals(c1.isMatch("1"), false);
  assertStrictEquals(c1.isMatch("\u0000"), false);
  assertStrictEquals(c1.isMatch(0x0041), true);
  assertStrictEquals(c1.isMatch(0x0061), true);
  assertStrictEquals(c1.isMatch(0x0031), false);
  assertStrictEquals(c1.isMatch(0x0000), false);

  const c2 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
    RuneExpression.fromGeneralCategories(["N"]),
  ]);
  assertStrictEquals(c2.isMatch("A"), true);
  assertStrictEquals(c2.isMatch("a"), true);
  assertStrictEquals(c2.isMatch("1"), true);
  assertStrictEquals(c2.isMatch("\u0000"), false);
  assertStrictEquals(c2.isMatch(0x0041), true);
  assertStrictEquals(c2.isMatch(0x0061), true);
  assertStrictEquals(c2.isMatch(0x0031), true);
  assertStrictEquals(c2.isMatch(0x0000), false);

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
});

Deno.test(" _OrExpression.prototype.isMatch() - not", () => {
  const c1 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
  ], { not: true });
  assertStrictEquals(c1.isMatch("A"), false);
  assertStrictEquals(c1.isMatch("a"), false);
  assertStrictEquals(c1.isMatch("1"), true);
  assertStrictEquals(c1.isMatch("\u0000"), true);
  assertStrictEquals(c1.isMatch(0x0041), false);
  assertStrictEquals(c1.isMatch(0x0061), false);
  assertStrictEquals(c1.isMatch(0x0031), true);
  assertStrictEquals(c1.isMatch(0x0000), true);

  const c2 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
    RuneExpression.fromGeneralCategories(["N"]),
  ], { not: true });
  assertStrictEquals(c2.isMatch("A"), false);
  assertStrictEquals(c2.isMatch("a"), false);
  assertStrictEquals(c2.isMatch("1"), false);
  assertStrictEquals(c2.isMatch("\u0000"), true);
  assertStrictEquals(c2.isMatch(0x0041), false);
  assertStrictEquals(c2.isMatch(0x0061), false);
  assertStrictEquals(c2.isMatch(0x0031), false);
  assertStrictEquals(c2.isMatch(0x0000), true);

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
});

Deno.test(" _OrExpression.prototype.findMatchedRunes()", () => {
  const c2 = RuneExpression.or([
    RuneExpression.fromScripts(["Latn"]),
    RuneExpression.fromGeneralCategories(["Ll"]),
  ]);

  const c2r = c2.findMatchedRunes("tT4uU5");
  assertStrictEquals(
    JSON.stringify([...c2r]),
    `[{"rune":"t","runeIndex":0},{"rune":"T","runeIndex":1},{"rune":"u","runeIndex":3},{"rune":"U","runeIndex":4}]`,
  );
});

//XXX _ComplexExpressionのネスト
