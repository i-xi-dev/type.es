import { assertStrictEquals, assertThrows } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("new Unicode.ScriptSet()", () => {
  const scs1 = new Unicode.ScriptSet(["Latn"]);
  assertStrictEquals(scs1.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(scs1.toArray()), `["Latn"]`);

  const scs0 = new Unicode.ScriptSet([]);
  assertStrictEquals(scs0.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(scs0.toArray()), `[]`);

  const scs1x = new Unicode.ScriptSet(new Set(["Latn"]));
  assertStrictEquals(scs1x.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(scs1x.toArray()), `["Latn"]`);

  const scs0x = new Unicode.ScriptSet(new Set([]));
  assertStrictEquals(scs0x.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(scs0x.toArray()), `[]`);

  assertThrows(
    () => {
      new Unicode.ScriptSet(["Zsym"]);
    },
    TypeError,
    "`scripts` must be an `Array` of supported script in Unicode property or a `Set` of supported script in Unicode property.",
  );

  assertThrows(
    () => {
      new Unicode.ScriptSet(undefined as unknown as []);
    },
    TypeError,
    "`scripts` must be an `Array` of supported script in Unicode property or a `Set` of supported script in Unicode property.",
  );

  assertThrows(
    () => {
      new Unicode.ScriptSet(["2" as "Latn"]);
    },
    TypeError,
    "`scripts` must be an `Array` of supported script in Unicode property or a `Set` of supported script in Unicode property.",
  );
});

Deno.test("Unicode.ScriptSet.prototype.includesRune()", () => {
  const scs1 = new Unicode.ScriptSet(["Kana"]);
  assertStrictEquals(scs1.includesRune("ア"), true);
  assertStrictEquals(scs1.includesRune("あ"), false);
  assertStrictEquals(scs1.includesRune("ー"), true);
  assertStrictEquals(scs1.includesRune("\u3099"), true);

  const scs2 = new Unicode.ScriptSet(["Hira"]);
  assertStrictEquals(scs2.includesRune("ア"), false);
  assertStrictEquals(scs2.includesRune("あ"), true);
  assertStrictEquals(scs2.includesRune("ー"), true);
  assertStrictEquals(scs2.includesRune("\u3099"), true);

  const opEx = { excludeScx: true } as const;
  const scs1x = new Unicode.ScriptSet(["Kana"], opEx);
  assertStrictEquals(scs1x.includesRune("ア"), true);
  assertStrictEquals(scs1x.includesRune("あ"), false);
  assertStrictEquals(scs1x.includesRune("ー"), false);
  assertStrictEquals(scs1x.includesRune("\u3099"), false);

  const scs2x = new Unicode.ScriptSet(["Hira"], opEx);
  assertStrictEquals(scs2x.includesRune("ア"), false);
  assertStrictEquals(scs2x.includesRune("あ"), true);
  assertStrictEquals(scs2x.includesRune("ー"), false);
  assertStrictEquals(scs2x.includesRune("\u3099"), false);

  const scs10 = new Unicode.ScriptSet(["Latn"]);
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

  const scs11 = new Unicode.ScriptSet(["Latn", "Kana"]);
  assertStrictEquals(scs11.includesRune("ア"), true);
  assertStrictEquals(scs11.includesRune("あ"), false);
  assertStrictEquals(scs11.includesRune("ー"), true);
  assertStrictEquals(scs11.includesRune("\u3099"), true);
  assertStrictEquals(scs11.includesRune("a"), true);

  const scs00 = new Unicode.ScriptSet([]);
  assertStrictEquals(scs00.includesRune("ア"), false);
  assertStrictEquals(scs00.includesRune("あ"), false);
  assertStrictEquals(scs00.includesRune("ー"), false);
  assertStrictEquals(scs00.includesRune("\u3099"), false);
  assertStrictEquals(scs00.includesRune("a"), false);
});

Deno.test("Unicode.ScriptSet.prototype.includesCodePoint()", () => {
  const scs1 = new Unicode.ScriptSet(["Kana"]);
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

Deno.test("Unicode.ScriptSet.prototype.unionWith()", () => {
  const gcs4 = new Unicode.ScriptSet(["Latn", "Kana"]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `["Kana","Latn"]`);

  const gcs4b = new Unicode.ScriptSet(["Latn", "Kana", "Latn"]).unionWith([
    "Kana",
    "Latn",
  ]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `["Kana","Latn"]`);

  const gcs5 = new Unicode.ScriptSet([]).unionWith(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `["Kana","Latn"]`);

  const gcs6 = new Unicode.ScriptSet([]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs6.toArray()), `[]`);

  const gcs4xb = new Unicode.ScriptSet(["Latn", "Kana", "Latn"]).unionWith(
    new Unicode.ScriptSet(["Latn", "Kana"]),
  );
  assertStrictEquals(JSON.stringify(gcs4xb.toArray()), `["Kana","Latn"]`);

  const gcs6x = new Unicode.ScriptSet([]).unionWith(
    new Unicode.ScriptSet([]),
  );
  assertStrictEquals(JSON.stringify(gcs6x.toArray()), `[]`);

  const gcs4yb = new Unicode.ScriptSet(["Latn", "Kana", "Latn"]).unionWith(
    new Set(["Latn", "Kana"]),
  );
  assertStrictEquals(JSON.stringify(gcs4yb.toArray()), `["Kana","Latn"]`);

  const gcs6y = new Unicode.ScriptSet([]).unionWith(new Set([]));
  assertStrictEquals(JSON.stringify(gcs6y.toArray()), `[]`);
});

Deno.test("Unicode.ScriptSet.prototype.toArray()", () => {
  const scs11 = new Unicode.ScriptSet(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify(scs11.toArray()), `["Kana","Latn"]`);

  const scs11b = new Unicode.ScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(JSON.stringify(scs11b.toArray()), `["Kana","Latn"]`);

  const scs00 = new Unicode.ScriptSet([]);
  assertStrictEquals(JSON.stringify(scs00.toArray()), `[]`);
});
