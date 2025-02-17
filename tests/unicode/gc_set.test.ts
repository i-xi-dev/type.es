import { assertStrictEquals, assertThrows } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("new Unicode.GeneralCategorySet()", () => {
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(gcs1.toArray()), `["Lu"]`);

  const gcs0 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(gcs0.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(gcs0.toArray()), `[]`);

  const gcs1s = new Unicode.GeneralCategorySet(new Set(["Lu"]));
  assertStrictEquals(gcs1s.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(gcs1s.toArray()), `["Lu"]`);

  const gcs0s = new Unicode.GeneralCategorySet(new Set([]));
  assertStrictEquals(gcs0s.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(gcs0s.toArray()), `[]`);

  assertThrows(
    () => {
      new Unicode.GeneralCategorySet(undefined as unknown as []);
    },
    TypeError,
    "`gcs` must be an `Array` of Unicode `General_Category` value or a `Set` of Unicode `General_Category` value.",
  );

  assertThrows(
    () => {
      new Unicode.GeneralCategorySet(["2" as "Lu"]);
    },
    TypeError,
    "`gcs` must be an `Array` of Unicode `General_Category` value or a `Set` of Unicode `General_Category` value.",
  );
});

Deno.test("Unicode.GeneralCategorySet.prototype.size", () => {
  const gcs0 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(gcs0.size, 0);
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.size, 1);
  const gcs2 = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(gcs2.size, 2);
});

Deno.test("Unicode.GeneralCategorySet.prototype.includesRune()", () => {
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.includesRune("L"), true);
  assertStrictEquals(gcs1.includesRune("l"), false);
  assertStrictEquals(gcs1.includesRune(" "), false);
  assertStrictEquals(gcs1.includesRune("0"), false);
  assertStrictEquals(gcs1.includesRune("$"), false);
  assertStrictEquals(gcs1.includesRune("\u{2029}"), false);

  const gcs2 = new Unicode.GeneralCategorySet(["Ll"]);
  assertStrictEquals(gcs2.includesRune("L"), false);
  assertStrictEquals(gcs2.includesRune("l"), true);
  assertStrictEquals(gcs2.includesRune(" "), false);
  assertStrictEquals(gcs2.includesRune("0"), false);
  assertStrictEquals(gcs2.includesRune("$"), false);
  assertStrictEquals(gcs2.includesRune("\u{2029}"), false);

  const gcs3 = new Unicode.GeneralCategorySet(["L"]);
  assertStrictEquals(gcs3.includesRune("L"), true);
  assertStrictEquals(gcs3.includesRune("l"), true);
  assertStrictEquals(gcs3.includesRune(" "), false);
  assertStrictEquals(gcs3.includesRune("0"), false);
  assertStrictEquals(gcs3.includesRune("$"), false);
  assertStrictEquals(gcs3.includesRune("\u{2029}"), false);

  const gcs4 = new Unicode.GeneralCategorySet(["Lu", "Ll"]);
  assertStrictEquals(gcs4.includesRune("L"), true);
  assertStrictEquals(gcs4.includesRune("l"), true);
  assertStrictEquals(gcs4.includesRune(" "), false);
  assertStrictEquals(gcs4.includesRune("0"), false);
  assertStrictEquals(gcs4.includesRune("$"), false);
  assertStrictEquals(gcs4.includesRune("\u{2029}"), false);

  const gcs5 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(gcs5.includesRune("L"), false);
  assertStrictEquals(gcs5.includesRune("l"), false);
  assertStrictEquals(gcs5.includesRune(" "), false);
  assertStrictEquals(gcs5.includesRune("0"), false);
  assertStrictEquals(gcs5.includesRune("$"), false);
  assertStrictEquals(gcs5.includesRune("\u{2029}"), false);

  assertThrows(
    () => {
      gcs1.includesRune("");
    },
    TypeError,
    "`rune` must be a string representing a single code point.",
  );
});

Deno.test("Unicode.GeneralCategorySet.prototype.includesCodePoint()", () => {
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.includesCodePoint(0x4C), true);
  assertStrictEquals(gcs1.includesCodePoint(0x6C), false);
  assertStrictEquals(gcs1.includesCodePoint(0x20), false);
  assertStrictEquals(gcs1.includesCodePoint(0x30), false);
  assertStrictEquals(gcs1.includesCodePoint(0x24), false);
  assertStrictEquals(gcs1.includesCodePoint(0x2029), false);

  assertThrows(
    () => {
      gcs1.includesCodePoint(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
  assertThrows(
    () => {
      gcs1.includesCodePoint(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});

Deno.test("Unicode.GeneralCategorySet.prototype.findMatches()", () => {
  const s1 = new Unicode.GeneralCategorySet(["Lu"]);
  const r1a = s1.findMatches("123DE6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a.entries()]),
    `[["D",[3]],["E",[4,10]],["G",[6]]]`,
  );
  const r1b = s1.findMatches("");
  assertStrictEquals(JSON.stringify([...r1b.entries()]), `[]`);
});

Deno.test("Unicode.GeneralCategorySet.prototype.unionWith()", () => {
  const gcs4 = new Unicode.GeneralCategorySet(["Lu", "Ll"]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `["Ll","Lu"]`);
  assertStrictEquals(gcs4 instanceof Unicode.GeneralCategorySet, true);

  const gcs4b = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]).unionWith([
    "Lu",
    "Ll",
  ]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `["Ll","Lu"]`);

  const gcs5 = new Unicode.GeneralCategorySet([]).unionWith(["Lu", "Ll"]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `["Ll","Lu"]`);

  const gcs6 = new Unicode.GeneralCategorySet([]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs6.toArray()), `[]`);

  const gcs4xb = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]).unionWith(
    new Unicode.GeneralCategorySet(["Lu", "Ll"]),
  );
  assertStrictEquals(JSON.stringify(gcs4xb.toArray()), `["Ll","Lu"]`);

  const gcs6x = new Unicode.GeneralCategorySet([]).unionWith(
    new Unicode.GeneralCategorySet([]),
  );
  assertStrictEquals(JSON.stringify(gcs6x.toArray()), `[]`);

  const gcs4yb = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]).unionWith(
    new Set(["Lu", "Ll"]),
  );
  assertStrictEquals(JSON.stringify(gcs4yb.toArray()), `["Ll","Lu"]`);

  const gcs6y = new Unicode.GeneralCategorySet([]).unionWith(new Set([]));
  assertStrictEquals(JSON.stringify(gcs6y.toArray()), `[]`);
});

Deno.test("Unicode.GeneralCategorySet.prototype.has()", () => {
  const gcs0 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(gcs0.has("Lu"), false);
  assertStrictEquals(gcs0.has("Ll"), false);
  assertStrictEquals(gcs0.has("L"), false);
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.has("Lu"), true);
  assertStrictEquals(gcs1.has("Ll"), false);
  assertStrictEquals(gcs1.has("L"), false);
  const gcs2 = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(gcs2.has("Lu"), true);
  assertStrictEquals(gcs2.has("Ll"), true);
  assertStrictEquals(gcs2.has("L"), false);
});

Deno.test("Unicode.GeneralCategorySet.prototype.keys()", () => {
  const gcs0 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(JSON.stringify([...gcs0.keys()]), `[]`);
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(JSON.stringify([...gcs1.keys()]), `["Lu"]`);
  const gcs2 = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(JSON.stringify([...gcs2.keys()]), `["Ll","Lu"]`);
});

Deno.test("Unicode.GeneralCategorySet.prototype.toArray()", () => {
  const gcs4 = new Unicode.GeneralCategorySet(["Lu", "Ll"]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `["Ll","Lu"]`);

  const gcs4b = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `["Ll","Lu"]`);

  const gcs5 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[]`);
});

Deno.test("Unicode.GeneralCategorySet.prototype.toSet()", () => {
  const gcs4 = new Unicode.GeneralCategorySet(["Lu", "Ll"]);
  assertStrictEquals(JSON.stringify([...gcs4.toSet()]), `["Ll","Lu"]`);

  const gcs4b = new Unicode.GeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(JSON.stringify([...gcs4b.toSet()]), `["Ll","Lu"]`);

  const gcs5 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(JSON.stringify([...gcs5.toSet()]), `[]`);
});
