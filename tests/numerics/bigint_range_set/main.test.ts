import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { BigIntRangeSet } = Numerics;

function _s(r: [bigint, bigint] | null): string | null {
  if (r === null) {
    return null;
  }
  return r.map((i) => i.toString()).join(",");
}

Deno.test("new Numerics.BigIntRangeSet()", () => {
  const rs1 = new BigIntRangeSet([[0n, 0n], [0n, 0n]]);
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,0");

  const rs2 = new BigIntRangeSet([[0n, 2n], [1n, 3n]]);
  assertStrictEquals(rs2.toArray().map((r) => _s(r)).join("|"), "0,3");

  const rs3 = new BigIntRangeSet([[0n, 2n], [2n, 4n]]);
  assertStrictEquals(rs3.toArray().map((r) => _s(r)).join("|"), "0,4");

  const rs4 = new BigIntRangeSet([[0n, 1n], [2n, 3n]]);
  assertStrictEquals(rs4.toArray().map((r) => _s(r)).join("|"), "0,3");

  const rs5 = new BigIntRangeSet([[0n, 1n], [3n, 4n]]);
  assertStrictEquals(rs5.toArray().map((r) => _s(r)).join("|"), "0,1|3,4");

  const rs101 = new BigIntRangeSet([
    [0n, 1n],
    [31n, 33n],
    [3n, 24n],
    [8n, 14n],
    [3n, 4n],
    [25n, 26n],
  ]);
  assertStrictEquals(
    rs101.toArray().map((r) => _s(r)).join("|"),
    "0,1|3,26|31,33",
  );

  assertThrows(
    () => {
      new BigIntRangeSet([0] as unknown as [[0n, 0n]]);
    },
    TypeError,
    "`iterable[*]` must be a range of `bigint`.",
  );
});

Deno.test("Numerics.BigIntRangeSet.prototype.includesValue()", () => {
  const rs101 = new BigIntRangeSet([
    [0n, 1n],
    [31n, 33n],
    [3n, 24n],
    [8n, 14n],
    [3n, 4n],
    [25n, 26n],
  ]);
  assertStrictEquals(rs101.includesValue(-1n), false);
  assertStrictEquals(rs101.includesValue(0n), true);
  assertStrictEquals(rs101.includesValue(1n), true);
  assertStrictEquals(rs101.includesValue(2n), false);
  assertStrictEquals(rs101.includesValue(3n), true);
  assertStrictEquals(rs101.includesValue(4n), true);
  assertStrictEquals(rs101.includesValue(5n), true);
  assertStrictEquals(rs101.includesValue(6n), true);
  assertStrictEquals(rs101.includesValue(7n), true);
  assertStrictEquals(rs101.includesValue(8n), true);
  assertStrictEquals(rs101.includesValue(9n), true);
  assertStrictEquals(rs101.includesValue(10n), true);
  assertStrictEquals(rs101.includesValue(11n), true);
  assertStrictEquals(rs101.includesValue(12n), true);
  assertStrictEquals(rs101.includesValue(13n), true);
  assertStrictEquals(rs101.includesValue(14n), true);
  assertStrictEquals(rs101.includesValue(15n), true);
  assertStrictEquals(rs101.includesValue(16n), true);
  assertStrictEquals(rs101.includesValue(17n), true);
  assertStrictEquals(rs101.includesValue(18n), true);
  assertStrictEquals(rs101.includesValue(19n), true);
  assertStrictEquals(rs101.includesValue(20n), true);
  assertStrictEquals(rs101.includesValue(21n), true);
  assertStrictEquals(rs101.includesValue(22n), true);
  assertStrictEquals(rs101.includesValue(23n), true);
  assertStrictEquals(rs101.includesValue(24n), true);
  assertStrictEquals(rs101.includesValue(25n), true);
  assertStrictEquals(rs101.includesValue(26n), true);
  assertStrictEquals(rs101.includesValue(27n), false);
  assertStrictEquals(rs101.includesValue(28n), false);
  assertStrictEquals(rs101.includesValue(29n), false);
  assertStrictEquals(rs101.includesValue(30n), false);
  assertStrictEquals(rs101.includesValue(31n), true);
  assertStrictEquals(rs101.includesValue(32n), true);
  assertStrictEquals(rs101.includesValue(33n), true);
  assertStrictEquals(rs101.includesValue(34n), false);
});

Deno.test("Numerics.BigIntRangeSet.prototype.()", () => {
});

Deno.test("Numerics.BigIntRangeSet.prototype.[Symbol.iterator]()", () => {
  const rs1 = new BigIntRangeSet([[0n, 10n], [0n, 0n]]);
  [...rs1].splice(0);
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,10");
});

Deno.test("Numerics.BigIntRangeSet.prototype.toArray()", () => {
  const rs1 = new BigIntRangeSet([[0n, 10n], [0n, 0n]]);
  rs1.toArray().splice(0);
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,10");
});

Deno.test("Numerics.BigIntRangeSet.prototype.toSet()", () => {
  const rs1 = new BigIntRangeSet([[0n, 0n], [0n, 10n]]);
  rs1.toSet().clear();
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,10");
});
