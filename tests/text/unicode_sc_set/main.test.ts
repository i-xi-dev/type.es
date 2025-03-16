import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { UnicodeScriptSet } = Text;

Deno.test("new Text.UnicodeScriptSet()", () => {
  const scs1 = new UnicodeScriptSet(["Latn"]);
  assertStrictEquals(JSON.stringify([...scs1]), `["Latn"]`);

  const scs0 = new UnicodeScriptSet([]);
  assertStrictEquals(JSON.stringify([...scs0]), `[]`);

  const scs1x = new UnicodeScriptSet(new Set(["Latn"]));
  assertStrictEquals(JSON.stringify([...scs1x]), `["Latn"]`);

  const scs0x = new UnicodeScriptSet(new Set([]));
  assertStrictEquals(JSON.stringify([...scs0x]), `[]`);

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

Deno.test("Text.UnicodeScriptSet.prototype[Symbol.toStringTag]", () => {
  const encoder = new UnicodeScriptSet([]);
  assertStrictEquals(encoder[Symbol.toStringTag], "UnicodeScriptSet");
});

Deno.test("Text.UnicodeScriptSet.prototype.size", () => {
  const gcs0 = new UnicodeScriptSet([]);
  assertStrictEquals(gcs0.size, 0);
  const gcs1 = new UnicodeScriptSet(["Kana"]);
  assertStrictEquals(gcs1.size, 1);
  const gcs2 = new UnicodeScriptSet(["Hira", "Kana", "Hira"]);
  assertStrictEquals(gcs2.size, 2);
});

Deno.test("Text.UnicodeScriptSet.prototype.union()", () => {
  const gcs4 = new UnicodeScriptSet(["Latn", "Kana"]).union([]);
  assertStrictEquals(JSON.stringify([...gcs4]), `["Kana","Latn"]`);

  const gcs4b = new UnicodeScriptSet(["Latn", "Kana", "Latn"]).union([
    "Kana",
    "Latn",
  ]);
  assertStrictEquals(JSON.stringify([...gcs4b]), `["Kana","Latn"]`);

  const gcs5 = new UnicodeScriptSet([]).union(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify([...gcs5]), `["Kana","Latn"]`);

  const gcs6 = new UnicodeScriptSet([]).union([]);
  assertStrictEquals(JSON.stringify([...gcs6]), `[]`);

  const gcs4xb = new UnicodeScriptSet(["Latn", "Kana", "Latn"]).union(
    new UnicodeScriptSet(["Latn", "Kana"]),
  );
  assertStrictEquals(JSON.stringify([...gcs4xb]), `["Kana","Latn"]`);

  const gcs6x = new UnicodeScriptSet([]).union(
    new UnicodeScriptSet([]),
  );
  assertStrictEquals(JSON.stringify([...gcs6x]), `[]`);

  const gcs4yb = new UnicodeScriptSet(["Latn", "Kana", "Latn"]).union(
    new Set(["Latn", "Kana"]),
  );
  assertStrictEquals(JSON.stringify([...gcs4yb]), `["Kana","Latn"]`);

  const gcs6y = new UnicodeScriptSet([]).union(new Set([]));
  assertStrictEquals(JSON.stringify([...gcs6y]), `[]`);
});

Deno.test("Text.UnicodeScriptSet.prototype.has()", () => {
  const gcs0 = new UnicodeScriptSet([]);
  assertStrictEquals(gcs0.has("Latn"), false);
  assertStrictEquals(gcs0.has("Kana"), false);
  assertStrictEquals(gcs0.has("Zxxx"), false);
  const gcs1 = new UnicodeScriptSet(["Latn"]);
  assertStrictEquals(gcs1.has("Latn"), true);
  assertStrictEquals(gcs1.has("Kana"), false);
  assertStrictEquals(gcs1.has("Zxxx"), false);
  const gcs2 = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(gcs2.has("Latn"), true);
  assertStrictEquals(gcs2.has("Kana"), true);
  assertStrictEquals(gcs2.has("Zxxx"), false);
});

Deno.test("Text.UnicodeScriptSet.prototype.keys()", () => {
  const gcs0 = new UnicodeScriptSet([]);
  assertStrictEquals(JSON.stringify([...gcs0.keys()]), `[]`);
  const gcs1 = new UnicodeScriptSet(["Latn"]);
  assertStrictEquals(JSON.stringify([...gcs1.keys()]), `["Latn"]`);
  const gcs2 = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(JSON.stringify([...gcs2.keys()]), `["Kana","Latn"]`);
});

Deno.test("Text.UnicodeScriptSet.prototype.values()", () => {
  const gcs0 = new UnicodeScriptSet([]);
  assertStrictEquals(JSON.stringify([...gcs0.values()]), `[]`);
  const gcs1 = new UnicodeScriptSet(["Latn"]);
  assertStrictEquals(JSON.stringify([...gcs1.values()]), `["Latn"]`);
  const gcs2 = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(JSON.stringify([...gcs2.values()]), `["Kana","Latn"]`);
});

Deno.test("Text.UnicodeScriptSet.prototype[Symbol.iterator]()", () => {
  const scs11 = new UnicodeScriptSet(["Latn", "Kana"]);
  assertStrictEquals(
    JSON.stringify([...scs11[Symbol.iterator]()]),
    `["Kana","Latn"]`,
  );

  const scs11b = new UnicodeScriptSet(["Latn", "Kana", "Latn"]);
  assertStrictEquals(
    JSON.stringify([...scs11b[Symbol.iterator]()]),
    `["Kana","Latn"]`,
  );

  const scs00 = new UnicodeScriptSet([]);
  assertStrictEquals(JSON.stringify([...scs00[Symbol.iterator]()]), `[]`);
});
