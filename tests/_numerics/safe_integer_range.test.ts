import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { SafeIntegerRange } = Numerics;

const range00 = SafeIntegerRange.of(0);
const range01 = SafeIntegerRange.of(0, 1);
const range10 = SafeIntegerRange.of(-1, 0);
const range23 = SafeIntegerRange.of(2, 3);
const range32 = SafeIntegerRange.of(-3, -2);

const range00b = SafeIntegerRange.from({ min: 0, max: 0 });
const range01b = SafeIntegerRange.from({ min: 0, max: 1 });
const range10b = SafeIntegerRange.from({ min: -1, max: 0 });

const rangeX01 = SafeIntegerRange.of(-20, 280);

Deno.test("new SafeIntegerRange()", () => {
  const em1 = "Range size exceeds upper limit.";

  assertThrows(
    () => {
      SafeIntegerRange.from([0, Number.MAX_SAFE_INTEGER]);
    },
    RangeError,
    em1,
  );

  assertThrows(
    () => {
      SafeIntegerRange.from([-1, Number.MAX_SAFE_INTEGER]);
    },
    RangeError,
    em1,
  );

  const x0 = SafeIntegerRange.from([1, Number.MAX_SAFE_INTEGER]);
  assertStrictEquals(x0.size, Number.MAX_SAFE_INTEGER);
});

Deno.test("SafeIntegerRange.prototype.min", () => {
  assertStrictEquals(range00.min, 0);
  assertStrictEquals(range01.min, 0);
  assertStrictEquals(range10.min, -1);
  assertStrictEquals(range23.min, 2);
  assertStrictEquals(range32.min, -3);

  assertStrictEquals(range00b.min, 0);
  assertStrictEquals(range01b.min, 0);
  assertStrictEquals(range10b.min, -1);

  assertStrictEquals(rangeX01.min, -20);
});

Deno.test("SafeIntegerRange.prototype.max", () => {
  assertStrictEquals(range00.max, 0);
  assertStrictEquals(range01.max, 1);
  assertStrictEquals(range10.max, 0);
  assertStrictEquals(range23.max, 3);
  assertStrictEquals(range32.max, -2);

  assertStrictEquals(range00b.max, 0);
  assertStrictEquals(range01b.max, 1);
  assertStrictEquals(range10b.max, 0);

  assertStrictEquals(rangeX01.max, 280);
});

Deno.test("SafeIntegerRange.prototype.size", () => {
  assertStrictEquals(range00.size, 1);
  assertStrictEquals(range01.size, 2);
  assertStrictEquals(range10.size, 2);
  assertStrictEquals(range23.size, 2);
  assertStrictEquals(range32.size, 2);

  assertStrictEquals(range00b.size, 1);
  assertStrictEquals(range01b.size, 2);
  assertStrictEquals(range10b.size, 2);

  assertStrictEquals(rangeX01.size, 301);
});

Deno.test("SafeIntegerRange.from()", () => {
  const t1 = SafeIntegerRange.from(rangeX01);
  assertStrictEquals(t1.min, -20);
  assertStrictEquals(t1.max, 280);
  assertStrictEquals(t1.size, 301);
});

Deno.test("SafeIntegerRange.of()", () => {
  const t1 = SafeIntegerRange.of(4, 8, 9);
  assertStrictEquals(t1.min, 4);
  assertStrictEquals(t1.max, 8);
  assertStrictEquals(t1.size, 5);
});

Deno.test("SafeIntegerRange.prototype.rangeEquals()", () => {
  assertStrictEquals(range00.rangeEquals(range00), true);
  assertStrictEquals(range00.rangeEquals([0]), true);
  assertStrictEquals(range00.rangeEquals([0, 0]), true);
  assertStrictEquals(range00.rangeEquals({ min: 0, max: 0 }), true);
  assertStrictEquals(range00.rangeEquals(range01), false);
  assertStrictEquals(range00.rangeEquals(range10), false);

  assertStrictEquals(range00.rangeEquals(range00b), true);
  assertStrictEquals(range00.rangeEquals(range01b), false);
  assertStrictEquals(range00.rangeEquals(range10b), false);

  assertStrictEquals(range01.rangeEquals(range00), false);
  assertStrictEquals(range01.rangeEquals([0, 1]), true);
  assertStrictEquals(range01.rangeEquals({ min: 0, max: 1 }), true);
  assertStrictEquals(range01.rangeEquals(range01), true);
  assertStrictEquals(range01.rangeEquals(range10), false);

  assertStrictEquals(range01.rangeEquals(range00b), false);
  assertStrictEquals(range01.rangeEquals(range01b), true);
  assertStrictEquals(range01.rangeEquals(range10b), false);

  assertStrictEquals(range10.rangeEquals(range00), false);
  assertStrictEquals(range10.rangeEquals(range01), false);
  assertStrictEquals(range10.rangeEquals(range10), true);

  assertStrictEquals(range10.rangeEquals(range00b), false);
  assertStrictEquals(range10.rangeEquals(range01b), false);
  assertStrictEquals(range10.rangeEquals(range10b), true);

  assertStrictEquals(range23.rangeEquals(range00), false);
  assertStrictEquals(range23.rangeEquals(range01), false);
  assertStrictEquals(range23.rangeEquals(range10), false);

  assertStrictEquals(range23.rangeEquals(range00b), false);
  assertStrictEquals(range23.rangeEquals(range01b), false);
  assertStrictEquals(range23.rangeEquals(range10b), false);

  assertStrictEquals(range32.rangeEquals(range00), false);
  assertStrictEquals(range32.rangeEquals(range01), false);
  assertStrictEquals(range32.rangeEquals(range10), false);

  assertStrictEquals(range32.rangeEquals(range00b), false);
  assertStrictEquals(range32.rangeEquals(range01b), false);
  assertStrictEquals(range32.rangeEquals(range10b), false);
});

Deno.test("SafeIntegerRange.prototype.overlaps()", () => {
  assertStrictEquals(range00.overlaps(range00), true);
  assertStrictEquals(range00.overlaps([0]), true);
  assertStrictEquals(range00.overlaps([0, 0]), true);
  assertStrictEquals(range00.overlaps({ min: 0, max: 0 }), true);
  assertStrictEquals(range00.overlaps(range01), true);
  assertStrictEquals(range00.overlaps(range10), true);

  assertStrictEquals(range00.overlaps(range00b), true);
  assertStrictEquals(range00.overlaps(range01b), true);
  assertStrictEquals(range00.overlaps(range10b), true);

  assertStrictEquals(range01.overlaps(range00), true);
  assertStrictEquals(range01.overlaps([0, 1]), true);
  assertStrictEquals(range01.overlaps({ min: 0, max: 1 }), true);
  assertStrictEquals(range01.overlaps(range01), true);
  assertStrictEquals(range01.overlaps(range10), true);

  assertStrictEquals(range01.overlaps(range00b), true);
  assertStrictEquals(range01.overlaps(range01b), true);
  assertStrictEquals(range01.overlaps(range10b), true);

  assertStrictEquals(range10.overlaps(range00), true);
  assertStrictEquals(range10.overlaps(range01), true);
  assertStrictEquals(range10.overlaps(range10), true);

  assertStrictEquals(range10.overlaps(range00b), true);
  assertStrictEquals(range10.overlaps(range01b), true);
  assertStrictEquals(range10.overlaps(range10b), true);

  assertStrictEquals(range23.overlaps(range00), false);
  assertStrictEquals(range23.overlaps(range01), false);
  assertStrictEquals(range23.overlaps(range10), false);

  assertStrictEquals(range23.overlaps(range00b), false);
  assertStrictEquals(range23.overlaps(range01b), false);
  assertStrictEquals(range23.overlaps(range10b), false);

  assertStrictEquals(range32.overlaps(range00), false);
  assertStrictEquals(range32.overlaps(range01), false);
  assertStrictEquals(range32.overlaps(range10), false);

  assertStrictEquals(range32.overlaps(range00b), false);
  assertStrictEquals(range32.overlaps(range01b), false);
  assertStrictEquals(range32.overlaps(range10b), false);
});

Deno.test("SafeIntegerRange.prototype.covers()", () => {
  assertStrictEquals(range00.covers(range00), true);
  assertStrictEquals(range00.covers([0]), true);
  assertStrictEquals(range00.covers([0, 0]), true);
  assertStrictEquals(range00.covers({ min: 0, max: 0 }), true);
  assertStrictEquals(range00.covers(range01), false);
  assertStrictEquals(range00.covers(range10), false);

  assertStrictEquals(range00.covers(range00b), true);
  assertStrictEquals(range00.covers(range01b), false);
  assertStrictEquals(range00.covers(range10b), false);

  assertStrictEquals(range01.covers(range00), true);
  assertStrictEquals(range01.covers([0, 1]), true);
  assertStrictEquals(range01.covers({ min: 0, max: 1 }), true);
  assertStrictEquals(range01.covers(range01), true);
  assertStrictEquals(range01.covers(range10), false);

  assertStrictEquals(range01.covers(range00b), true);
  assertStrictEquals(range01.covers(range01b), true);
  assertStrictEquals(range01.covers(range10b), false);

  assertStrictEquals(range10.covers(range00), true);
  assertStrictEquals(range10.covers(range01), false);
  assertStrictEquals(range10.covers(range10), true);

  assertStrictEquals(range10.covers(range00b), true);
  assertStrictEquals(range10.covers(range01b), false);
  assertStrictEquals(range10.covers(range10b), true);

  assertStrictEquals(range23.covers(range00), false);
  assertStrictEquals(range23.covers(range01), false);
  assertStrictEquals(range23.covers(range10), false);

  assertStrictEquals(range23.covers(range00b), false);
  assertStrictEquals(range23.covers(range01b), false);
  assertStrictEquals(range23.covers(range10b), false);

  assertStrictEquals(range32.covers(range00), false);
  assertStrictEquals(range32.covers(range01), false);
  assertStrictEquals(range32.covers(range10), false);

  assertStrictEquals(range32.covers(range00b), false);
  assertStrictEquals(range32.covers(range01b), false);
  assertStrictEquals(range32.covers(range10b), false);
});

Deno.test("SafeIntegerRange.prototype.isDisjointFrom()", () => {
  assertStrictEquals(range00.isDisjointFrom(range00), false);
  assertStrictEquals(range00.isDisjointFrom([0]), false);
  assertStrictEquals(range00.isDisjointFrom([0, 0]), false);
  assertStrictEquals(range00.isDisjointFrom({ min: 0, max: 0 }), false);
  assertStrictEquals(range00.isDisjointFrom(range01), false);
  assertStrictEquals(range00.isDisjointFrom(range10), false);

  assertStrictEquals(range00.isDisjointFrom(range00b), false);
  assertStrictEquals(range00.isDisjointFrom(range01b), false);
  assertStrictEquals(range00.isDisjointFrom(range10b), false);

  assertStrictEquals(range01.isDisjointFrom(range00), false);
  assertStrictEquals(range01.isDisjointFrom([0, 1]), false);
  assertStrictEquals(range01.isDisjointFrom({ min: 0, max: 1 }), false);
  assertStrictEquals(range01.isDisjointFrom(range01), false);
  assertStrictEquals(range01.isDisjointFrom(range10), false);

  assertStrictEquals(range01.isDisjointFrom(range00b), false);
  assertStrictEquals(range01.isDisjointFrom(range01b), false);
  assertStrictEquals(range01.isDisjointFrom(range10b), false);

  assertStrictEquals(range10.isDisjointFrom(range00), false);
  assertStrictEquals(range10.isDisjointFrom(range01), false);
  assertStrictEquals(range10.isDisjointFrom(range10), false);

  assertStrictEquals(range10.isDisjointFrom(range00b), false);
  assertStrictEquals(range10.isDisjointFrom(range01b), false);
  assertStrictEquals(range10.isDisjointFrom(range10b), false);

  assertStrictEquals(range23.isDisjointFrom(range00), true);
  assertStrictEquals(range23.isDisjointFrom(range01), true);
  assertStrictEquals(range23.isDisjointFrom(range10), true);

  assertStrictEquals(range23.isDisjointFrom(range00b), true);
  assertStrictEquals(range23.isDisjointFrom(range01b), true);
  assertStrictEquals(range23.isDisjointFrom(range10b), true);

  assertStrictEquals(range32.isDisjointFrom(range00), true);
  assertStrictEquals(range32.isDisjointFrom(range01), true);
  assertStrictEquals(range32.isDisjointFrom(range10), true);

  assertStrictEquals(range32.isDisjointFrom(range00b), true);
  assertStrictEquals(range32.isDisjointFrom(range01b), true);
  assertStrictEquals(range32.isDisjointFrom(range10b), true);
});

Deno.test("SafeIntegerRange.prototype.isAdjacentTo()", () => {
  assertStrictEquals(range00.isAdjacentTo(range00), false);
  assertStrictEquals(range00.isAdjacentTo([0]), false);
  assertStrictEquals(range00.isAdjacentTo([0, 0]), false);
  assertStrictEquals(range00.isAdjacentTo({ min: 0, max: 0 }), false);
  assertStrictEquals(range00.isAdjacentTo(range01), false);
  assertStrictEquals(range00.isAdjacentTo(range10), false);

  assertStrictEquals(range00.isAdjacentTo(range00b), false);
  assertStrictEquals(range00.isAdjacentTo(range01b), false);
  assertStrictEquals(range00.isAdjacentTo(range10b), false);

  assertStrictEquals(range01.isAdjacentTo(range00), false);
  assertStrictEquals(range01.isAdjacentTo([0, 1]), false);
  assertStrictEquals(range01.isAdjacentTo({ min: 0, max: 1 }), false);
  assertStrictEquals(range01.isAdjacentTo(range01), false);
  assertStrictEquals(range01.isAdjacentTo(range10), false);

  assertStrictEquals(range01.isAdjacentTo(range00b), false);
  assertStrictEquals(range01.isAdjacentTo(range01b), false);
  assertStrictEquals(range01.isAdjacentTo(range10b), false);

  assertStrictEquals(range10.isAdjacentTo(range00), false);
  assertStrictEquals(range10.isAdjacentTo(range01), false);
  assertStrictEquals(range10.isAdjacentTo(range10), false);

  assertStrictEquals(range10.isAdjacentTo(range00b), false);
  assertStrictEquals(range10.isAdjacentTo(range01b), false);
  assertStrictEquals(range10.isAdjacentTo(range10b), false);

  assertStrictEquals(range23.isAdjacentTo(range00), false);
  assertStrictEquals(range23.isAdjacentTo(range01), true);
  assertStrictEquals(range23.isAdjacentTo(range10), false);

  assertStrictEquals(range23.isAdjacentTo(range00b), false);
  assertStrictEquals(range23.isAdjacentTo(range01b), true);
  assertStrictEquals(range23.isAdjacentTo(range10b), false);

  assertStrictEquals(range32.isAdjacentTo(range00), false);
  assertStrictEquals(range32.isAdjacentTo(range01), false);
  assertStrictEquals(range32.isAdjacentTo(range10), true);

  assertStrictEquals(range32.isAdjacentTo(range00b), false);
  assertStrictEquals(range32.isAdjacentTo(range01b), false);
  assertStrictEquals(range32.isAdjacentTo(range10b), true);
});

Deno.test("SafeIntegerRange.prototype.includes()", () => {
  assertStrictEquals(range00.includes(-1), false);
  assertStrictEquals(range00.includes(-0), true);
  assertStrictEquals(range00.includes(0), true);
  assertStrictEquals(range00.includes(1), false);

  assertStrictEquals(range01.includes(-1), false);
  assertStrictEquals(range01.includes(-0), true);
  assertStrictEquals(range01.includes(0), true);
  assertStrictEquals(range01.includes(1), true);
  assertStrictEquals(range01.includes(2), false);

  assertStrictEquals(range10.includes(-2), false);
  assertStrictEquals(range10.includes(-1), true);
  assertStrictEquals(range10.includes(-0), true);
  assertStrictEquals(range10.includes(0), true);
  assertStrictEquals(range10.includes(1), false);

  assertStrictEquals(range23.includes(0), false);
  assertStrictEquals(range23.includes(1), false);
  assertStrictEquals(range23.includes(2), true);
  assertStrictEquals(range23.includes(3), true);
  assertStrictEquals(range23.includes(4), false);

  assertStrictEquals(range32.includes(-4), false);
  assertStrictEquals(range32.includes(-3), true);
  assertStrictEquals(range32.includes(-2), true);
  assertStrictEquals(range32.includes(-1), false);
  assertStrictEquals(range32.includes(0), false);
});

Deno.test("SafeIntegerRange.prototype.equals()", () => {
  assertStrictEquals(range00.equals(range00), true);
  assertStrictEquals(range00.equals([0]), false);
  assertStrictEquals(range00.equals([0, 0]), false);
  assertStrictEquals(range00.equals({ min: 0, max: 0 }), false);
  assertStrictEquals(range00.equals(range00b), true);
  assertStrictEquals(range00.equals(range01), false);
});

Deno.test("SafeIntegerRange.prototype[Symbol.iterator]()", () => {
  assertStrictEquals(JSON.stringify([...range00[Symbol.iterator]()]), "[0]");
  assertStrictEquals(JSON.stringify([...range01[Symbol.iterator]()]), "[0,1]");
  assertStrictEquals(JSON.stringify([...range10[Symbol.iterator]()]), "[-1,0]");
});

Deno.test("SafeIntegerRange.prototype.toArray()", () => {
  assertStrictEquals(JSON.stringify(range00.toArray()), "[0]");
  assertStrictEquals(JSON.stringify(range01.toArray()), "[0,1]");
  assertStrictEquals(JSON.stringify(range10.toArray()), "[-1,0]");
});

Deno.test("SafeIntegerRange.prototype.toSet()", () => {
  assertStrictEquals(JSON.stringify([...range00.toSet()]), "[0]");
  assertStrictEquals(JSON.stringify([...range01.toSet()]), "[0,1]");
  assertStrictEquals(JSON.stringify([...range10.toSet()]), "[-1,0]");
});
