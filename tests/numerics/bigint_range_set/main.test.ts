import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { BigIntRangeSet } = Numerics;

function _s(r: [bigint, bigint] | null): string | null {
  if (r === null) {
    return null;
  }
  return r.map((i) => i.toString()).join(",");
}

function _i(r: bigint[]): string {
  return r.map((i) => i.toString()).join(",");
}

Deno.test("Numerics.BigIntRangeSet.fromRanges()", () => {
  const rs1 = BigIntRangeSet.fromRanges([[0n, 0n], [0n, 0n]]);
  assertStrictEquals([...rs1.toRanges()].map((r) => _s(r)).join("|"), "0,0");

  const rs2 = BigIntRangeSet.fromRanges([[0n, 2n], [1n, 3n]]);
  assertStrictEquals([...rs2.toRanges()].map((r) => _s(r)).join("|"), "0,3");

  const rs3 = BigIntRangeSet.fromRanges([[0n, 2n], [2n, 4n]]);
  assertStrictEquals([...rs3.toRanges()].map((r) => _s(r)).join("|"), "0,4");

  const rs4 = BigIntRangeSet.fromRanges([[0n, 1n], [2n, 3n]]);
  assertStrictEquals([...rs4.toRanges()].map((r) => _s(r)).join("|"), "0,3");

  const rs5 = BigIntRangeSet.fromRanges([[0n, 1n], [3n, 4n]]);
  assertStrictEquals(
    [...rs5.toRanges()].map((r) => _s(r)).join("|"),
    "0,1|3,4",
  );

  const rs101 = BigIntRangeSet.fromRanges([
    [0n, 1n],
    [31n, 33n],
    [3n, 24n],
    [8n, 14n],
    [3n, 4n],
    [25n, 26n],
  ]);
  assertStrictEquals(
    [...rs101.toRanges()].map((r) => _s(r)).join("|"),
    "0,1|3,26|31,33",
  );

  assertThrows(
    () => {
      BigIntRangeSet.fromRanges([0] as unknown as [[0n, 0n]]);
    },
    TypeError,
    "`subrange` must be a range of `bigint`.",
  );

  assertThrows(
    () => {
      BigIntRangeSet.fromRanges([[0n, BigInt(Number.MAX_SAFE_INTEGER)]]);
    },
    RangeError,
    "The size of `range` overflowed.",
  );
});

Deno.test("Numerics.BigIntRangeSet.prototype.size", () => {
  const rs0 = BigIntRangeSet.fromRanges([]);
  assertStrictEquals(rs0.size, 0);

  const rs101 = BigIntRangeSet.fromRanges([
    [0n, 1n],
    [31n, 33n],
    [3n, 24n],
    [8n, 14n],
    [3n, 4n],
    [25n, 26n],
  ]);
  assertStrictEquals(rs101.size, 29);
});

Deno.test("Numerics.BigIntRangeSet.prototype.has()", () => {
  const rs101 = BigIntRangeSet.fromRanges([
    [0n, 1n],
    [31n, 33n],
    [3n, 24n],
    [8n, 14n],
    [3n, 4n],
    [25n, 26n],
  ]);
  assertStrictEquals(rs101.has(-1n), false);
  assertStrictEquals(rs101.has(0n), true);
  assertStrictEquals(rs101.has(1n), true);
  assertStrictEquals(rs101.has(2n), false);
  assertStrictEquals(rs101.has(3n), true);
  assertStrictEquals(rs101.has(4n), true);
  assertStrictEquals(rs101.has(5n), true);
  assertStrictEquals(rs101.has(6n), true);
  assertStrictEquals(rs101.has(7n), true);
  assertStrictEquals(rs101.has(8n), true);
  assertStrictEquals(rs101.has(9n), true);
  assertStrictEquals(rs101.has(10n), true);
  assertStrictEquals(rs101.has(11n), true);
  assertStrictEquals(rs101.has(12n), true);
  assertStrictEquals(rs101.has(13n), true);
  assertStrictEquals(rs101.has(14n), true);
  assertStrictEquals(rs101.has(15n), true);
  assertStrictEquals(rs101.has(16n), true);
  assertStrictEquals(rs101.has(17n), true);
  assertStrictEquals(rs101.has(18n), true);
  assertStrictEquals(rs101.has(19n), true);
  assertStrictEquals(rs101.has(20n), true);
  assertStrictEquals(rs101.has(21n), true);
  assertStrictEquals(rs101.has(22n), true);
  assertStrictEquals(rs101.has(23n), true);
  assertStrictEquals(rs101.has(24n), true);
  assertStrictEquals(rs101.has(25n), true);
  assertStrictEquals(rs101.has(26n), true);
  assertStrictEquals(rs101.has(27n), false);
  assertStrictEquals(rs101.has(28n), false);
  assertStrictEquals(rs101.has(29n), false);
  assertStrictEquals(rs101.has(30n), false);
  assertStrictEquals(rs101.has(31n), true);
  assertStrictEquals(rs101.has(32n), true);
  assertStrictEquals(rs101.has(33n), true);
  assertStrictEquals(rs101.has(34n), false);

  assertThrows(
    () => {
      rs101.has(0);
    },
    TypeError,
    "`value` must be a `bigint`.",
  );
});

Deno.test("Numerics.BigIntRangeSet.prototype.keys()", () => {
  const rs0 = BigIntRangeSet.fromRanges([]);
  assertStrictEquals(_i([...rs0.keys()]), "");

  const rs101 = BigIntRangeSet.fromRanges([
    [0n, 1n],
    [31n, 33n],
    [3n, 24n],
    [8n, 14n],
    [3n, 4n],
    [25n, 26n],
  ]);
  assertStrictEquals(
    _i([...rs101.keys()]),
    "0,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,31,32,33",
  );
});

// [Symbol.iterator]() → keys()

// toRanges() → fromRangesで一緒に確認済
