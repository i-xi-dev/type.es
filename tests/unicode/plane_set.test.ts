import { assertStrictEquals, assertThrows } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("new Unicode.PlaneSet()", () => {
  const ps1 = new Unicode.PlaneSet([0]);
  assertStrictEquals(ps1.includes("L"), true);
  assertStrictEquals(JSON.stringify(ps1.toArray()), `[0]`);

  const ps0 = new Unicode.PlaneSet([]);
  assertStrictEquals(ps0.includes("L"), false);
  assertStrictEquals(JSON.stringify(ps0.toArray()), `[]`);

  assertThrows(
    () => {
      new Unicode.PlaneSet(undefined as unknown as []);
    },
    TypeError,
    "`planes` must be an Array.",
  );

  assertThrows(
    () => {
      new Unicode.PlaneSet(["0" as unknown as 0]);
    },
    TypeError,
    "`planes[*]` must be an code point plane value.",
  );
});

Deno.test("Unicode.PlaneSet.prototype.includes()", () => {
  const ps1 = new Unicode.PlaneSet([0]);
  assertStrictEquals(ps1.includes("\u0000"), true);
  assertStrictEquals(ps1.includes("\uFFFF"), true);
  assertStrictEquals(ps1.includes("\u{10000}"), false);
  assertStrictEquals(ps1.includes("\u{F0000}"), false);
  assertStrictEquals(ps1.includes("\u{100000}"), false);
  assertStrictEquals(ps1.includes("\u{10FFFF}"), false);
  assertStrictEquals(ps1.includes(0), true);
  assertStrictEquals(ps1.includes(0xFFFF), true);
  assertStrictEquals(ps1.includes(0x10000), false);
  assertStrictEquals(ps1.includes(0xF0000), false);
  assertStrictEquals(ps1.includes(0x100000), false);
  assertStrictEquals(ps1.includes(0x10FFFF), false);

  const ps2 = new Unicode.PlaneSet([16]);
  assertStrictEquals(ps2.includes("\u0000"), false);
  assertStrictEquals(ps2.includes("\uFFFF"), false);
  assertStrictEquals(ps2.includes("\u{10000}"), false);
  assertStrictEquals(ps2.includes("\u{F0000}"), false);
  assertStrictEquals(ps2.includes("\u{100000}"), true);
  assertStrictEquals(ps2.includes("\u{10FFFF}"), true);

  const ps3 = new Unicode.PlaneSet([0, 16]);
  assertStrictEquals(ps3.includes("\u0000"), true);
  assertStrictEquals(ps3.includes("\uFFFF"), true);
  assertStrictEquals(ps3.includes("\u{10000}"), false);
  assertStrictEquals(ps3.includes("\u{F0000}"), false);
  assertStrictEquals(ps3.includes("\u{100000}"), true);
  assertStrictEquals(ps3.includes("\u{10FFFF}"), true);

  const ps0 = new Unicode.PlaneSet([]);
  assertStrictEquals(ps0.includes("\u0000"), false);
  assertStrictEquals(ps0.includes("\uFFFF"), false);
  assertStrictEquals(ps0.includes("\u{10000}"), false);
  assertStrictEquals(ps0.includes("\u{F0000}"), false);
  assertStrictEquals(ps0.includes("\u{100000}"), false);
  assertStrictEquals(ps0.includes("\u{10FFFF}"), false);

  assertThrows(
    () => {
      ps1.includes("");
    },
    TypeError,
    "`codePointOrRune` must be a code point or a string representing a single code point.",
  );

  assertThrows(
    () => {
      ps1.includes(-1);
    },
    TypeError,
    "`codePointOrRune` must be a code point or a string representing a single code point.",
  );
  assertThrows(
    () => {
      ps1.includes(0x110000);
    },
    TypeError,
    "`codePointOrRune` must be a code point or a string representing a single code point.",
  );
});

Deno.test("Unicode.PlaneSet.prototype.toArray()", () => {
  const gcs4 = new Unicode.PlaneSet([16, 0]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `[0,16]`);

  const gcs5 = new Unicode.PlaneSet([]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[]`);
});
