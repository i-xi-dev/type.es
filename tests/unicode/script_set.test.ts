import { assertStrictEquals, assertThrows } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("new Unicode.ScriptSet()", () => {
  const scs1 = new Unicode.ScriptSet(["Latn"]);
  assertStrictEquals(scs1.includes("L"), true);
  assertStrictEquals(JSON.stringify(scs1.toArray()), `["Latn"]`);

  const scs0 = new Unicode.ScriptSet([]);
  assertStrictEquals(scs0.includes("L"), false);
  assertStrictEquals(JSON.stringify(scs0.toArray()), `[]`);

  assertThrows(
    () => {
      new Unicode.ScriptSet(["Zsym"]);
    },
    TypeError,
    "`scripts[*]` is not supported script in Unicode property.",
  );

  assertThrows(
    () => {
      new Unicode.ScriptSet(undefined as unknown as []);
    },
    TypeError,
    "`scripts` must be an Array.",
  );

  assertThrows(
    () => {
      new Unicode.ScriptSet(["2" as "Latn"]);
    },
    TypeError,
    "`scripts[*]` is not supported script in Unicode property.",
  );
});

Deno.test("Unicode.ScriptSet.prototype.includes()", () => {
  const scs1 = new Unicode.ScriptSet(["Kana"]);
  assertStrictEquals(scs1.includes("ア"), true);
  assertStrictEquals(scs1.includes("あ"), false);
  assertStrictEquals(scs1.includes("ー"), true);
  assertStrictEquals(scs1.includes("\u3099"), true);

  const scs2 = new Unicode.ScriptSet(["Hira"]);
  assertStrictEquals(scs2.includes("ア"), false);
  assertStrictEquals(scs2.includes("あ"), true);
  assertStrictEquals(scs2.includes("ー"), true);
  assertStrictEquals(scs2.includes("\u3099"), true);

  const opEx = { excludeScx: true } as const;
  const scs1x = new Unicode.ScriptSet(["Kana"], opEx);
  assertStrictEquals(scs1x.includes("ア"), true);
  assertStrictEquals(scs1x.includes("あ"), false);
  assertStrictEquals(scs1x.includes("ー"), false);
  assertStrictEquals(scs1x.includes("\u3099"), false);

  const scs2x = new Unicode.ScriptSet(["Hira"], opEx);
  assertStrictEquals(scs2x.includes("ア"), false);
  assertStrictEquals(scs2x.includes("あ"), true);
  assertStrictEquals(scs2x.includes("ー"), false);
  assertStrictEquals(scs2x.includes("\u3099"), false);

  const scs10 = new Unicode.ScriptSet(["Latn"]);
  assertStrictEquals(scs10.includes("a"), true);
  assertStrictEquals(scs10.includes("1"), false);
  assertThrows(
    () => {
      scs10.includes("");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );
  assertThrows(
    () => {
      scs10.includes("aa");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );

  const scs11 = new Unicode.ScriptSet(["Latn", "Kana"]);
  assertStrictEquals(scs11.includes("ア"), true);
  assertStrictEquals(scs11.includes("あ"), false);
  assertStrictEquals(scs11.includes("ー"), true);
  assertStrictEquals(scs11.includes("\u3099"), true);
  assertStrictEquals(scs11.includes("a"), true);

  const scs00 = new Unicode.ScriptSet([]);
  assertStrictEquals(scs00.includes("ア"), false);
  assertStrictEquals(scs00.includes("あ"), false);
  assertStrictEquals(scs00.includes("ー"), false);
  assertStrictEquals(scs00.includes("\u3099"), false);
  assertStrictEquals(scs00.includes("a"), false);
});

Deno.test("Unicode.ScriptSet.prototype.toArray()", () => {
  const scs11 = new Unicode.ScriptSet(["Latn", "Kana"]);
  assertStrictEquals(JSON.stringify(scs11.toArray()), `["Kana","Latn"]`);

  const scs00 = new Unicode.ScriptSet([]);
  assertStrictEquals(JSON.stringify(scs00.toArray()), `[]`);
});
