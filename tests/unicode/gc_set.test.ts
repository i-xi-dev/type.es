import { assertStrictEquals, assertThrows } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("new Unicode.GeneralCategorySet()", () => {
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.includes("L"), true);
  assertStrictEquals(JSON.stringify(gcs1.toArray()), `["Lu"]`);

  const gcs0 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(gcs0.includes("L"), false);
  assertStrictEquals(JSON.stringify(gcs0.toArray()), `[]`);

  assertThrows(
    () => {
      new Unicode.GeneralCategorySet(undefined as unknown as []);
    },
    TypeError,
    "`gcs` must be an Array.",
  );

  assertThrows(
    () => {
      new Unicode.GeneralCategorySet(["2" as "Lu"]);
    },
    TypeError,
    "`gcs[*]` must be an Unicode `General_Category` value.",
  );
});

Deno.test("Unicode.GeneralCategorySet.prototype.includes()", () => {
  const gcs1 = new Unicode.GeneralCategorySet(["Lu"]);
  assertStrictEquals(gcs1.includes("L"), true);
  assertStrictEquals(gcs1.includes("l"), false);
  assertStrictEquals(gcs1.includes(" "), false);
  assertStrictEquals(gcs1.includes("0"), false);
  assertStrictEquals(gcs1.includes("$"), false);
  assertStrictEquals(gcs1.includes("\u{2029}"), false);

  const gcs2 = new Unicode.GeneralCategorySet(["Ll"]);
  assertStrictEquals(gcs2.includes("L"), false);
  assertStrictEquals(gcs2.includes("l"), true);
  assertStrictEquals(gcs2.includes(" "), false);
  assertStrictEquals(gcs2.includes("0"), false);
  assertStrictEquals(gcs2.includes("$"), false);
  assertStrictEquals(gcs2.includes("\u{2029}"), false);

  const gcs3 = new Unicode.GeneralCategorySet(["L"]);
  assertStrictEquals(gcs3.includes("L"), true);
  assertStrictEquals(gcs3.includes("l"), true);
  assertStrictEquals(gcs3.includes(" "), false);
  assertStrictEquals(gcs3.includes("0"), false);
  assertStrictEquals(gcs3.includes("$"), false);
  assertStrictEquals(gcs3.includes("\u{2029}"), false);

  const gcs4 = new Unicode.GeneralCategorySet(["Lu", "Ll"]);
  assertStrictEquals(gcs4.includes("L"), true);
  assertStrictEquals(gcs4.includes("l"), true);
  assertStrictEquals(gcs4.includes(" "), false);
  assertStrictEquals(gcs4.includes("0"), false);
  assertStrictEquals(gcs4.includes("$"), false);
  assertStrictEquals(gcs4.includes("\u{2029}"), false);

  const gcs5 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(gcs5.includes("L"), false);
  assertStrictEquals(gcs5.includes("l"), false);
  assertStrictEquals(gcs5.includes(" "), false);
  assertStrictEquals(gcs5.includes("0"), false);
  assertStrictEquals(gcs5.includes("$"), false);
  assertStrictEquals(gcs5.includes("\u{2029}"), false);

  assertThrows(
    () => {
      gcs1.includes("");
    },
    TypeError,
    "`value` must be an Unicode scalar value.",
  );
});

Deno.test("Unicode.GeneralCategorySet.prototype.toArray()", () => {
  const gcs4 = new Unicode.GeneralCategorySet(["Lu", "Ll"]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `["Ll","Lu"]`);

  const gcs5 = new Unicode.GeneralCategorySet([]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[]`);
});
