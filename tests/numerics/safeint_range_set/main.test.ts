import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { SafeIntRangeSet } = Numerics;

function _s(r: [number, number] | null): string | null {
  if (r === null) {
    return null;
  }
  return r.map((i) => i.toString()).join(",");
}

function _i(r: number[]): string {
  return r.map((i) => i.toString()).join(",");
}

Deno.test("Numerics.SafeIntRangeSet.fromRanges()", () => {
  const rs1 = SafeIntRangeSet.fromRanges([[0, 0], [0, 0]]);
  assertStrictEquals([...rs1.toRanges()].map((r) => _s(r)).join("|"), "0,0");

  const rs2 = SafeIntRangeSet.fromRanges([[0, 2], [1, 3]]);
  assertStrictEquals([...rs2.toRanges()].map((r) => _s(r)).join("|"), "0,3");

  const rs3 = SafeIntRangeSet.fromRanges([[0, 2], [2, 4]]);
  assertStrictEquals([...rs3.toRanges()].map((r) => _s(r)).join("|"), "0,4");

  const rs4 = SafeIntRangeSet.fromRanges([[0, 1], [2, 3]]);
  assertStrictEquals([...rs4.toRanges()].map((r) => _s(r)).join("|"), "0,3");

  const rs5 = SafeIntRangeSet.fromRanges([[0, 1], [3, 4]]);
  assertStrictEquals(
    [...rs5.toRanges()].map((r) => _s(r)).join("|"),
    "0,1|3,4",
  );

  const rs101 = SafeIntRangeSet.fromRanges([
    [0, 1],
    [31, 33],
    [3, 24],
    [8, 14],
    [3, 4],
    [25, 26],
  ]);
  assertStrictEquals(
    [...rs101.toRanges()].map((r) => _s(r)).join("|"),
    "0,1|3,26|31,33",
  );

  assertThrows(
    () => {
      SafeIntRangeSet.fromRanges([0] as unknown as [[0, 0]]);
    },
    TypeError,
    "`subrange` must be a range of safe integer.",
  );

  assertThrows(
    () => {
      SafeIntRangeSet.fromRanges([[0, Number.MAX_SAFE_INTEGER]]);
    },
    RangeError,
    "The size of `range` overflowed.",
  );
});

Deno.test("Numerics.SafeIntRangeSet.prototype.size", () => {
  const rs0 = SafeIntRangeSet.fromRanges([]);
  assertStrictEquals(rs0.size, 0);

  const rs101 = SafeIntRangeSet.fromRanges([
    [0, 1],
    [31, 33],
    [3, 24],
    [8, 14],
    [3, 4],
    [25, 26],
  ]);
  assertStrictEquals(rs101.size, 29);
});

Deno.test("Numerics.SafeIntRangeSet.prototype.has()", () => {
  const rs101 = SafeIntRangeSet.fromRanges([
    [0, 1],
    [31, 33],
    [3, 24],
    [8, 14],
    [3, 4],
    [25, 26],
  ]);
  assertStrictEquals(rs101.has(-1), false);
  assertStrictEquals(rs101.has(0), true);
  assertStrictEquals(rs101.has(1), true);
  assertStrictEquals(rs101.has(2), false);
  assertStrictEquals(rs101.has(3), true);
  assertStrictEquals(rs101.has(4), true);
  assertStrictEquals(rs101.has(5), true);
  assertStrictEquals(rs101.has(6), true);
  assertStrictEquals(rs101.has(7), true);
  assertStrictEquals(rs101.has(8), true);
  assertStrictEquals(rs101.has(9), true);
  assertStrictEquals(rs101.has(10), true);
  assertStrictEquals(rs101.has(11), true);
  assertStrictEquals(rs101.has(12), true);
  assertStrictEquals(rs101.has(13), true);
  assertStrictEquals(rs101.has(14), true);
  assertStrictEquals(rs101.has(15), true);
  assertStrictEquals(rs101.has(16), true);
  assertStrictEquals(rs101.has(17), true);
  assertStrictEquals(rs101.has(18), true);
  assertStrictEquals(rs101.has(19), true);
  assertStrictEquals(rs101.has(20), true);
  assertStrictEquals(rs101.has(21), true);
  assertStrictEquals(rs101.has(22), true);
  assertStrictEquals(rs101.has(23), true);
  assertStrictEquals(rs101.has(24), true);
  assertStrictEquals(rs101.has(25), true);
  assertStrictEquals(rs101.has(26), true);
  assertStrictEquals(rs101.has(27), false);
  assertStrictEquals(rs101.has(28), false);
  assertStrictEquals(rs101.has(29), false);
  assertStrictEquals(rs101.has(30), false);
  assertStrictEquals(rs101.has(31), true);
  assertStrictEquals(rs101.has(32), true);
  assertStrictEquals(rs101.has(33), true);
  assertStrictEquals(rs101.has(34), false);

  assertThrows(
    () => {
      rs101.has(Number.MIN_SAFE_INTEGER - 1);
    },
    TypeError,
    "`value` must be a safe integer.",
  );
});

Deno.test("Numerics.SafeIntRangeSet.prototype.keys()", () => {
  const rs0 = SafeIntRangeSet.fromRanges([]);
  assertStrictEquals(_i([...rs0.keys()]), "");

  const rs101 = SafeIntRangeSet.fromRanges([
    [0, 1],
    [31, 33],
    [3, 24],
    [8, 14],
    [3, 4],
    [25, 26],
  ]);
  assertStrictEquals(
    _i([...rs101.keys()]),
    "0,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,31,32,33",
  );
});

// [Symbol.iterator]() → keys()

// toRanges() → fromRangesで一緒に確認済
