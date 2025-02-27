import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { UnicodeScriptSet } = Text;

Deno.test("new Text.UnicodeScriptSet()", () => {
  const scs1 = new UnicodeScriptSet(["Latn"]);
  assertStrictEquals(scs1.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(scs1.toArray()), `["Latn"]`);

  const scs0 = new UnicodeScriptSet([]);
  assertStrictEquals(scs0.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(scs0.toArray()), `[]`);

  const scs1x = new UnicodeScriptSet(new Set(["Latn"]));
  assertStrictEquals(scs1x.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(scs1x.toArray()), `["Latn"]`);

  const scs0x = new UnicodeScriptSet(new Set([]));
  assertStrictEquals(scs0x.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(scs0x.toArray()), `[]`);

  assertThrows(
    () => {
      new UnicodeScriptSet(["Zsym"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );

  assertThrows(
    () => {
      new UnicodeScriptSet(undefined as unknown as []);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      new UnicodeScriptSet(["2" as "Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
});

// Deno.test("Text.UnicodeScriptSet.prototype.size", () => {
//   const gcs0 = new UnicodeScriptSet([]);
//   assertStrictEquals(gcs0.size, 0);
//   const gcs1 = new UnicodeScriptSet(["Kana"]);
//   assertStrictEquals(gcs1.size, 1);
//   const gcs2 = new UnicodeScriptSet(["Hira", "Kana", "Hira"]);
//   assertStrictEquals(gcs2.size, 2);
// });

Deno.test("Text.UnicodeScriptSet.prototype.includesRune()", () => {
  const scs1 = new UnicodeScriptSet(["Kana"]);
  assertStrictEquals(scs1.includesRune("ア"), true);
  assertStrictEquals(scs1.includesRune("あ"), false);
  assertStrictEquals(scs1.includesRune("ー"), true);
  assertStrictEquals(scs1.includesRune("\u3099"), true);

  const scs2 = new UnicodeScriptSet(["Hira"]);
  assertStrictEquals(scs2.includesRune("ア"), false);
  assertStrictEquals(scs2.includesRune("あ"), true);
  assertStrictEquals(scs2.includesRune("ー"), true);
  assertStrictEquals(scs2.includesRune("\u3099"), true);

  const opEx = { excludeScx: true } as const;
  const scs1x = new UnicodeScriptSet(["Kana"], opEx);
  assertStrictEquals(scs1x.includesRune("ア"), true);
  assertStrictEquals(scs1x.includesRune("あ"), false);
  assertStrictEquals(scs1x.includesRune("ー"), false);
  assertStrictEquals(scs1x.includesRune("\u3099"), false);

  const scs2x = new UnicodeScriptSet(["Hira"], opEx);
  assertStrictEquals(scs2x.includesRune("ア"), false);
  assertStrictEquals(scs2x.includesRune("あ"), true);
  assertStrictEquals(scs2x.includesRune("ー"), false);
  assertStrictEquals(scs2x.includesRune("\u3099"), false);

  const scs10 = new UnicodeScriptSet(["Latn"]);
  assertStrictEquals(scs10.includesRune("a"), true);
  assertStrictEquals(scs10.includesRune("1"), false);
  assertThrows(
    () => {
      scs10.includesRune("");
    },
    TypeError,
    "`rune` must be a string representing a single code point.",
  );
  assertThrows(
    () => {
      scs10.includesRune("aa");
    },
    TypeError,
    "`rune` must be a string representing a single code point.",
  );

  const scs11 = new UnicodeScriptSet(["Latn", "Kana"]);
  assertStrictEquals(scs11.includesRune("ア"), true);
  assertStrictEquals(scs11.includesRune("あ"), false);
  assertStrictEquals(scs11.includesRune("ー"), true);
  assertStrictEquals(scs11.includesRune("\u3099"), true);
  assertStrictEquals(scs11.includesRune("a"), true);

  const scs00 = new UnicodeScriptSet([]);
  assertStrictEquals(scs00.includesRune("ア"), false);
  assertStrictEquals(scs00.includesRune("あ"), false);
  assertStrictEquals(scs00.includesRune("ー"), false);
  assertStrictEquals(scs00.includesRune("\u3099"), false);
  assertStrictEquals(scs00.includesRune("a"), false);
});

Deno.test("Text.UnicodeScriptSet.prototype.includesCodePoint()", () => {
  const scs1 = new UnicodeScriptSet(["Kana"]);
  assertStrictEquals(scs1.includesCodePoint(0x30A2), true);
  assertStrictEquals(scs1.includesCodePoint(0x3042), false);
  assertStrictEquals(scs1.includesCodePoint(0x30FC), true);
  assertStrictEquals(scs1.includesCodePoint(0x3099), true);

  assertThrows(
    () => {
      scs1.includesCodePoint(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
  assertThrows(
    () => {
      scs1.includesCodePoint(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});

Deno.test("Text.UnicodeScriptSet.prototype.findMatches()", () => {
  const s1 = new UnicodeScriptSet(["Latn"]);
  const r1a = s1.findMatches("123DE6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a.entries()]),
    `[["D",[3]],["E",[4,10]],["G",[6]],["h",[7]],["i",[8]],["j",[9]]]`,
  );
  const r1b = s1.findMatches("");
  assertStrictEquals(JSON.stringify([...r1b.entries()]), `[]`);
});

Deno.test("Text.UnicodeScriptSet.prototype.unionWith()", () => {
  const gcs4 = new UnicodeScriptSet(["Latn", "Kana"]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `["Kana","Latn"]`);

  const gcs4b = new UnicodeScriptSet(["Latn", "Kana", "Latn"]).unionWith([
    "Kana",
    "Latn",
  ]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `["Kana","Latn"]`);

  const gcs5 = new UnicodeScriptSet([]).unionWith(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `["Kana","Latn"]`);

  const gcs6 = new UnicodeScriptSet([]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs6.toArray()), `[]`);

  const gcs4xb = new UnicodeScriptSet(["Latn", "Kana", "Latn"]).unionWith(
    new UnicodeScriptSet(["Latn", "Kana"]),
  );
  assertStrictEquals(JSON.stringify(gcs4xb.toArray()), `["Kana","Latn"]`);

  const gcs6x = new UnicodeScriptSet([]).unionWith(
    new UnicodeScriptSet([]),
  );
  assertStrictEquals(JSON.stringify(gcs6x.toArray()), `[]`);

  const gcs4yb = new UnicodeScriptSet(["Latn", "Kana", "Latn"]).unionWith(
    new Set(["Latn", "Kana"]),
  );
  assertStrictEquals(JSON.stringify(gcs4yb.toArray()), `["Kana","Latn"]`);

  const gcs6y = new UnicodeScriptSet([]).unionWith(new Set([]));
  assertStrictEquals(JSON.stringify(gcs6y.toArray()), `[]`);

  const gcs8i = new UnicodeScriptSet(["Hira"]).unionWith([]);
  const gcs8e = new UnicodeScriptSet(["Hira"], { excludeScx: true }).unionWith(
    [],
  );
  assertStrictEquals(gcs8i.includesRune("ー"), true);
  assertStrictEquals(gcs8e.includesRune("ー"), false);
});

// Deno.test("Text.UnicodeScriptSet.prototype.has()", () => {
//   const gcs0 = new UnicodeScriptSet([]);
//   assertStrictEquals(gcs0.has("Latn"), false);
//   assertStrictEquals(gcs0.has("Kana"), false);
//   assertStrictEquals(gcs0.has("Zxxx"), false);
//   const gcs1 = new UnicodeScriptSet(["Latn"]);
//   assertStrictEquals(gcs1.has("Latn"), true);
//   assertStrictEquals(gcs1.has("Kana"), false);
//   assertStrictEquals(gcs1.has("Zxxx"), false);
//   const gcs2 = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
//   assertStrictEquals(gcs2.has("Latn"), true);
//   assertStrictEquals(gcs2.has("Kana"), true);
//   assertStrictEquals(gcs2.has("Zxxx"), false);
// });

// Deno.test("Text.UnicodeScriptSet.prototype.keys()", () => {
//   const gcs0 = new UnicodeScriptSet([]);
//   assertStrictEquals(JSON.stringify([...gcs0.keys()]), `[]`);
//   const gcs1 = new UnicodeScriptSet(["Latn"]);
//   assertStrictEquals(JSON.stringify([...gcs1.keys()]), `["Latn"]`);
//   const gcs2 = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
//   assertStrictEquals(JSON.stringify([...gcs2.keys()]), `["Kana","Latn"]`);
// });

Deno.test("Text.UnicodeScriptSet.prototype.toArray()", () => {
  const scs11 = new UnicodeScriptSet(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify(scs11.toArray()), `["Kana","Latn"]`);

  const scs11b = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(JSON.stringify(scs11b.toArray()), `["Kana","Latn"]`);

  const scs00 = new UnicodeScriptSet([]);
  assertStrictEquals(JSON.stringify(scs00.toArray()), `[]`);
});

Deno.test("Text.UnicodeScriptSet.prototype.toSet()", () => {
  const scs11 = new UnicodeScriptSet(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify([...scs11.toSet()]), `["Kana","Latn"]`);

  const scs11b = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(JSON.stringify([...scs11b.toSet()]), `["Kana","Latn"]`);

  const scs00 = new UnicodeScriptSet([]);
  assertStrictEquals(JSON.stringify([...scs00.toSet()]), `[]`);
});
