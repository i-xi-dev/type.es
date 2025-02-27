import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { CodePlaneSet } = Text;

Deno.test("new Text.CodePlaneSet()", () => {
  const ps1 = new CodePlaneSet([0]);
  assertStrictEquals(ps1.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(ps1.toArray()), `[0]`);

  const ps0 = new CodePlaneSet([]);
  assertStrictEquals(ps0.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(ps0.toArray()), `[]`);

  const ps1x = new CodePlaneSet(new Set([0]));
  assertStrictEquals(ps1x.includesRune("L"), true);
  assertStrictEquals(JSON.stringify(ps1x.toArray()), `[0]`);

  const ps0x = new CodePlaneSet(new Set([]));
  assertStrictEquals(ps0x.includesRune("L"), false);
  assertStrictEquals(JSON.stringify(ps0x.toArray()), `[]`);

  assertThrows(
    () => {
      new CodePlaneSet(undefined as unknown as []);
    },
    TypeError,
    "`planes` must be an `Array` of code point plane value or a `Set` of code point plane value.",
  );

  assertThrows(
    () => {
      new CodePlaneSet(["0" as unknown as 0]);
    },
    TypeError,
    "`planes` must be an `Array` of code point plane value or a `Set` of code point plane value.",
  );

  assertThrows(
    () => {
      new CodePlaneSet([-1 as unknown as 0]);
    },
    TypeError,
    "`planes` must be an `Array` of code point plane value or a `Set` of code point plane value.",
  );
});

// Deno.test("Text.CodePlaneSet.prototype.size", () => {
//   const gcs0 = new CodePlaneSet([]);
//   assertStrictEquals(gcs0.size, 0);
//   const gcs1 = new CodePlaneSet([1]);
//   assertStrictEquals(gcs1.size, 1);
//   const gcs2 = new CodePlaneSet([2, 4, 2]);
//   assertStrictEquals(gcs2.size, 2);
// });

Deno.test("Text.CodePlaneSet.prototype.includesRune()", () => {
  const ps1 = new CodePlaneSet([0]);
  assertStrictEquals(ps1.includesRune("\u0000"), true);
  assertStrictEquals(ps1.includesRune("\uFFFF"), true);
  assertStrictEquals(ps1.includesRune("\u{10000}"), false);
  assertStrictEquals(ps1.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps1.includesRune("\u{100000}"), false);
  assertStrictEquals(ps1.includesRune("\u{10FFFF}"), false);

  const ps2 = new CodePlaneSet([16]);
  assertStrictEquals(ps2.includesRune("\u0000"), false);
  assertStrictEquals(ps2.includesRune("\uFFFF"), false);
  assertStrictEquals(ps2.includesRune("\u{10000}"), false);
  assertStrictEquals(ps2.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps2.includesRune("\u{100000}"), true);
  assertStrictEquals(ps2.includesRune("\u{10FFFF}"), true);

  const ps3 = new CodePlaneSet([0, 16]);
  assertStrictEquals(ps3.includesRune("\u0000"), true);
  assertStrictEquals(ps3.includesRune("\uFFFF"), true);
  assertStrictEquals(ps3.includesRune("\u{10000}"), false);
  assertStrictEquals(ps3.includesRune("\u{F0000}"), false);
  assertStrictEquals(ps3.includesRune("\u{100000}"), true);
  assertStrictEquals(ps3.includesRune("\u{10FFFF}"), true);

  const ps0 = new CodePlaneSet([]);
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

Deno.test("Text.CodePlaneSet.prototype.includesCodePoint()", () => {
  const ps1 = new CodePlaneSet([0]);
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

Deno.test("Text.CodePlaneSet.prototype.findMatches()", () => {
  const s1 = new CodePlaneSet([1]);
  const r1a = s1.findMatches("123D\u{10000}E\u{10000}6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a.entries()]),
    `[["\u{10000}",[4,6]]]`,
  );
  const r1b = s1.findMatches("");
  assertStrictEquals(JSON.stringify([...r1b.entries()]), `[]`);
});

Deno.test("Text.CodePlaneSet.prototype.unionWith()", () => {
  const gcs4 = new CodePlaneSet([16, 0]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `[0,16]`);

  const gcs4b = new CodePlaneSet([16, 0, 16]).unionWith([
    16,
    0,
  ]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `[0,16]`);

  const gcs5 = new CodePlaneSet([]).unionWith([16, 0]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[0,16]`);

  const gcs6 = new CodePlaneSet([]).unionWith([]);
  assertStrictEquals(JSON.stringify(gcs6.toArray()), `[]`);

  const gcs4xb = new CodePlaneSet([16, 0, 16]).unionWith(
    new CodePlaneSet([16, 0]),
  );
  assertStrictEquals(JSON.stringify(gcs4xb.toArray()), `[0,16]`);

  const gcs6x = new CodePlaneSet([]).unionWith(
    new CodePlaneSet([]),
  );
  assertStrictEquals(JSON.stringify(gcs6x.toArray()), `[]`);

  const gcs4yb = new CodePlaneSet([16, 0, 16]).unionWith(
    new Set([16, 0]),
  );
  assertStrictEquals(JSON.stringify(gcs4yb.toArray()), `[0,16]`);

  const gcs6y = new CodePlaneSet([]).unionWith(new Set([]));
  assertStrictEquals(JSON.stringify(gcs6y.toArray()), `[]`);
});

// Deno.test("Text.CodePlaneSet.prototype.has()", () => {
//   const gcs0 = new CodePlaneSet([]);
//   assertStrictEquals(gcs0.has(0), false);
//   assertStrictEquals(gcs0.has(1), false);
//   assertStrictEquals(gcs0.has(4), false);
//   const gcs1 = new CodePlaneSet([1]);
//   assertStrictEquals(gcs1.has(0), false);
//   assertStrictEquals(gcs1.has(1), true);
//   assertStrictEquals(gcs1.has(4), false);
//   const gcs2 = new CodePlaneSet([2, 4, 2]);
//   assertStrictEquals(gcs2.has(0), false);
//   assertStrictEquals(gcs2.has(1), false);
//   assertStrictEquals(gcs2.has(4), true);
// });

// Deno.test("Text.CodePlaneSet.prototype.keys()", () => {
//   const gcs0 = new CodePlaneSet([]);
//   assertStrictEquals(JSON.stringify([...gcs0.keys()]), `[]`);
//   const gcs1 = new CodePlaneSet([1]);
//   assertStrictEquals(JSON.stringify([...gcs1.keys()]), `[1]`);
//   const gcs2 = new CodePlaneSet([2, 4, 2]);
//   assertStrictEquals(JSON.stringify([...gcs2.keys()]), `[2,4]`);
// });

Deno.test("Text.CodePlaneSet.prototype.toArray()", () => {
  const gcs4 = new CodePlaneSet([16, 0]);
  assertStrictEquals(JSON.stringify(gcs4.toArray()), `[0,16]`);

  const gcs4b = new CodePlaneSet([16, 0, 16]);
  assertStrictEquals(JSON.stringify(gcs4b.toArray()), `[0,16]`);

  const gcs5 = new CodePlaneSet([]);
  assertStrictEquals(JSON.stringify(gcs5.toArray()), `[]`);
});

Deno.test("Text.CodePlaneSet.prototype.toSet()", () => {
  const gcs4 = new CodePlaneSet([16, 0]);
  assertStrictEquals(JSON.stringify([...gcs4.toSet()]), `[0,16]`);

  const gcs4b = new CodePlaneSet([16, 0, 16]);
  assertStrictEquals(JSON.stringify([...gcs4b.toSet()]), `[0,16]`);

  const gcs5 = new CodePlaneSet([]);
  assertStrictEquals(JSON.stringify([...gcs5.toSet()]), `[]`);
});
