import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { UnicodeGeneralCategorySet } = Text;

Deno.test("new Text.UnicodeGeneralCategorySet()", () => {
  const gcs1 = new UnicodeGeneralCategorySet(["Lu"]);
  assertStrictEquals(JSON.stringify([...gcs1]), `["Lu"]`);

  const gcs0 = new UnicodeGeneralCategorySet([]);
  assertStrictEquals(JSON.stringify([...gcs0]), `[]`);

  const gcs1s = new UnicodeGeneralCategorySet(new Set(["Lu"]));
  assertStrictEquals(JSON.stringify([...gcs1s]), `["Lu"]`);

  const gcs0s = new UnicodeGeneralCategorySet(new Set([]));
  assertStrictEquals(JSON.stringify([...gcs0s]), `[]`);

  assertThrows(
    () => {
      new UnicodeGeneralCategorySet(undefined as unknown as []);
    },
    TypeError,
    "`gcs` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      new UnicodeGeneralCategorySet(["2" as "Lu"]);
    },
    TypeError,
    "`gcs[*]` must be an Unicode `General_Category` value.",
  );
});

Deno.test("Text.UnicodeGeneralCategorySet.prototype.size", () => {
  const gcs0 = new UnicodeGeneralCategorySet([]);
  assertStrictEquals(gcs0.size, 0);
  const gcs1 = new UnicodeGeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.size, 1);
  const gcs2 = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(gcs2.size, 2);
});

Deno.test("Text.UnicodeGeneralCategorySet.prototype.union()", () => {
  const gcs4 = new UnicodeGeneralCategorySet(["Lu", "Ll"]).union([]);
  assertStrictEquals(JSON.stringify([...gcs4]), `["Ll","Lu"]`);
  assertStrictEquals(gcs4 instanceof UnicodeGeneralCategorySet, true);

  const gcs4b = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]).union([
    "Lu",
    "Ll",
  ]);
  assertStrictEquals(JSON.stringify([...gcs4b]), `["Ll","Lu"]`);

  const gcs5 = new UnicodeGeneralCategorySet([]).union(["Lu", "Ll"]);
  assertStrictEquals(JSON.stringify([...gcs5]), `["Ll","Lu"]`);

  const gcs6 = new UnicodeGeneralCategorySet([]).union([]);
  assertStrictEquals(JSON.stringify([...gcs6]), `[]`);

  const gcs4xb = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]).union(
    new UnicodeGeneralCategorySet(["Lu", "Ll"]),
  );
  assertStrictEquals(JSON.stringify([...gcs4xb]), `["Ll","Lu"]`);

  const gcs6x = new UnicodeGeneralCategorySet([]).union(
    new UnicodeGeneralCategorySet([]),
  );
  assertStrictEquals(JSON.stringify([...gcs6x]), `[]`);

  const gcs4yb = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]).union(
    new Set(["Lu", "Ll"]),
  );
  assertStrictEquals(JSON.stringify([...gcs4yb]), `["Ll","Lu"]`);

  const gcs6y = new UnicodeGeneralCategorySet([]).union(new Set([]));
  assertStrictEquals(JSON.stringify([...gcs6y]), `[]`);
});

Deno.test("Text.UnicodeGeneralCategorySet.prototype.has()", () => {
  const gcs0 = new UnicodeGeneralCategorySet([]);
  assertStrictEquals(gcs0.has("Lu"), false);
  assertStrictEquals(gcs0.has("Ll"), false);
  assertStrictEquals(gcs0.has("L"), false);
  const gcs1 = new UnicodeGeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.has("Lu"), true);
  assertStrictEquals(gcs1.has("Ll"), false);
  assertStrictEquals(gcs1.has("L"), false);
  const gcs2 = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(gcs2.has("Lu"), true);
  assertStrictEquals(gcs2.has("Ll"), true);
  assertStrictEquals(gcs2.has("L"), false);
});

Deno.test("Text.UnicodeGeneralCategorySet.prototype.keys()", () => {
  const gcs0 = new UnicodeGeneralCategorySet([]);
  assertStrictEquals(JSON.stringify([...gcs0.keys()]), `[]`);
  const gcs1 = new UnicodeGeneralCategorySet(["Lu"]);
  assertStrictEquals(JSON.stringify([...gcs1.keys()]), `["Lu"]`);
  const gcs2 = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(JSON.stringify([...gcs2.keys()]), `["Ll","Lu"]`);
});

Deno.test("Text.UnicodeGeneralCategorySet.prototype.values()", () => {
  const gcs0 = new UnicodeGeneralCategorySet([]);
  assertStrictEquals(JSON.stringify([...gcs0.values()]), `[]`);
  const gcs1 = new UnicodeGeneralCategorySet(["Lu"]);
  assertStrictEquals(JSON.stringify([...gcs1.values()]), `["Lu"]`);
  const gcs2 = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(JSON.stringify([...gcs2.values()]), `["Ll","Lu"]`);
});

Deno.test("Text.UnicodeGeneralCategorySet.prototype[Symbol.iterator]()", () => {
  const gcs4 = new UnicodeGeneralCategorySet(["Lu", "Ll"]);
  assertStrictEquals(
    JSON.stringify([...gcs4[Symbol.iterator]()]),
    `["Ll","Lu"]`,
  );

  const gcs4b = new UnicodeGeneralCategorySet(["Lu", "Ll", "Lu"]);
  assertStrictEquals(
    JSON.stringify([...gcs4b[Symbol.iterator]()]),
    `["Ll","Lu"]`,
  );

  const gcs5 = new UnicodeGeneralCategorySet([]);
  assertStrictEquals(JSON.stringify([...gcs5[Symbol.iterator]()]), `[]`);
});
