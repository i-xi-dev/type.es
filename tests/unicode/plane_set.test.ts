import { assertStrictEquals, assertThrows } from "@std/assert";
import { Unicode } from "../../mod.ts";

Deno.test("new Unicode.PlaneSet()", () => {
  const ps1 = new Unicode.PlaneSet([0]);
  assertStrictEquals(ps1.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(ps1.toArray()), `[0]`);

  const ps0 = new Unicode.PlaneSet([]);
  assertStrictEquals(ps0.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(ps0.toArray()), `[]`);

  const ps1x = new Unicode.PlaneSet(new Set([0]));
  assertStrictEquals(ps1x.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(ps1x.toArray()), `[0]`);

  const ps0x = new Unicode.PlaneSet(new Set([]));
  assertStrictEquals(ps0x.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(ps0x.toArray()), `[]`);

  assertThrows(
    () => {
      new Unicode.PlaneSet(undefined as unknown as []);
    },
    TypeError,
    "`planes` must be an `Array` of code point plane value or a `Set` of code point plane value.",
  );

  assertThrows(
    () => {
      new Unicode.PlaneSet(["0" as unknown as 0]);
    },
    TypeError,
    "`planes` must be an `Array` of code point plane value or a `Set` of code point plane value.",
  );

  assertThrows(
    () => {
      new Unicode.PlaneSet([-1 as unknown as 0]);
    },
    TypeError,
    "`planes` must be an `Array` of code point plane value or a `Set` of code point plane value.",
  );
});

Deno.test("Unicode.PlaneSet.prototype.includesRune()", () => {
  const ps1 = new Unicode.PlaneSet([0]);
  assertStrictEquals(ps1.includesRune("\u0000"), true);
  assertStrictEquals(ps1.includesRune("\uFFFF"), true);
  assertStrictEquals(ps1.includesRune("\u{10000}"), false);
  assertStrictEquals(ps1.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps1.includesRune("\u{100000}"), false);
  assertStrictEquals(ps1.includesRune("\u{10FFFF}"), false);

  const ps2 = new Unicode.PlaneSet([16]);
  assertStrictEquals(ps2.includesRune("\u0000"), false);
  assertStrictEquals(ps2.includesRune("\uFFFF"), false);
  assertStrictEquals(ps2.includesRune("\u{10000}"), false);
  assertStrictEquals(ps2.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps2.includesRune("\u{100000}"), true);
  assertStrictEquals(ps2.includesRune("\u{10FFFF}"), true);

  const ps3 = new Unicode.PlaneSet([0, 16]);
  assertStrictEquals(ps3.includesRune("\u0000"), true);
  assertStrictEquals(ps3.includesRune("\uFFFF"), true);
  assertStrictEquals(ps3.includesRune("\u{10000}"), false);
  assertStrictEquals(ps3.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps3.includesRune("\u{100000}"), true);
  assertStrictEquals(ps3.includesRune("\u{10FFFF}"), true);

  const ps0 = new Unicode.PlaneSet([]);
  assertStrictEquals(ps0.includesRune("\u0000"), false);
  assertStrictEquals(ps0.includesRune("\uFFFF"), false);
  assertStrictEquals(ps0.includesRune("\u{10000}"), false);
  assertStrictEquals(ps0.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps0.includesRune("\u{100000}"), false);
  assertStrictEquals(ps0.includesRune("\u{10FFFF}"), false);

  assertThrows(
    () => {
      ps1.includesRune("");
    },
    TypeError,
    "`rune` must be a string representing a single code point.",
  );

  assertThrows(
    () => {
      ps1.includesRune(0 as unknown as "a");
    },
    TypeError,
    "`rune` must be a string representing a single code point.",
  );
});

Deno.test("Unicode.PlaneSet.prototype.includesCodePoint()", () => {
  const ps1 = new Unicode.PlaneSet([0]);
  assertStrictEquals(ps1.includesCodePoint(0), true);
  assertStrictEquals(ps1.includesCodePoint(0xFFFF), true);
  assertStrictEquals(ps1.includesCodePoint(0x10000), false);
  assertStrictEquals(ps1.includesCodePoint(0xF0000), false);
  assertStrictEquals(ps1.includesCodePoint(0x100000), false);
  assertStrictEquals(ps1.includesCodePoint(0x10FFFF), false);

  assertThrows(
    () => {
      ps1.includesCodePoint(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
  assertThrows(
    () => {
      ps1.includesCodePoint(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});

Deno.test("Unicode.PlaneSet.prototype.unionWith()", () => {
  const gcs4 = new Unicode.PlaneSet([16, 0]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `[0,16]`);

  const gcs4b = new Unicode.PlaneSet([16, 0, 16]).unionWith([
    16,
    0,
  ]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `[0,16]`);

  const gcs5 = new Unicode.PlaneSet([]).unionWith([16, 0]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[0,16]`);

  const gcs6 = new Unicode.PlaneSet([]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs6.toArray()), `[]`);

  const gcs4xb = new Unicode.PlaneSet([16, 0, 16]).unionWith(
    new Unicode.PlaneSet([16, 0]),
  );
  assertStrictEquals(JSON.stringify(gcs4xb.toArray()), `[0,16]`);

  const gcs6x = new Unicode.PlaneSet([]).unionWith(
    new Unicode.PlaneSet([]),
  );
  assertStrictEquals(JSON.stringify(gcs6x.toArray()), `[]`);

  const gcs4yb = new Unicode.PlaneSet([16, 0, 16]).unionWith(
    new Set([16, 0]),
  );
  assertStrictEquals(JSON.stringify(gcs4yb.toArray()), `[0,16]`);

  const gcs6y = new Unicode.PlaneSet([]).unionWith(new Set([]));
  assertStrictEquals(JSON.stringify(gcs6y.toArray()), `[]`);
});

Deno.test("Unicode.PlaneSet.prototype.toArray()", () => {
  const gcs4 = new Unicode.PlaneSet([16, 0]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `[0,16]`);

  const gcs4b = new Unicode.PlaneSet([16, 0, 16]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `[0,16]`);

  const gcs5 = new Unicode.PlaneSet([]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[]`);
});
