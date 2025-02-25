import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../mod.ts";

const { SafeIntRangeSet } = Numerics;

function _s(r: [number, number] | null): string | null {
  if (r === null) {
    return null;
  }
  return r.map((i) => i.toString()).join(",");
}

Deno.test("new Numerics.SafeIntRangeSet()", () => {
  const rs1 = new SafeIntRangeSet([[0, 0], [0, 0]]);
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,0");

  const rs2 = new SafeIntRangeSet([[0, 2], [1, 3]]);
  assertStrictEquals(rs2.toArray().map((r) => _s(r)).join("|"), "0,3");

  const rs3 = new SafeIntRangeSet([[0, 2], [2, 4]]);
  assertStrictEquals(rs3.toArray().map((r) => _s(r)).join("|"), "0,4");

  const rs4 = new SafeIntRangeSet([[0, 1], [2, 3]]);
  assertStrictEquals(rs4.toArray().map((r) => _s(r)).join("|"), "0,3");

  const rs5 = new SafeIntRangeSet([[0, 1], [3, 4]]);
  assertStrictEquals(rs5.toArray().map((r) => _s(r)).join("|"), "0,1|3,4");

  const rs101 = new SafeIntRangeSet([
    [0, 1],
    [31, 33],
    [3, 24],
    [8, 14],
    [3, 4],
    [25, 26],
  ]);
  assertStrictEquals(
    rs101.toArray().map((r) => _s(r)).join("|"),
    "0,1|3,26|31,33",
  );

  assertThrows(
    () => {
      new SafeIntRangeSet([0] as unknown as [[0, 0]]);
    },
    TypeError,
    "`iterable[*]` must be a range of safe integer.",
  );
});

Deno.test("Numerics.SafeIntRangeSet.prototype.includesValue()", () => {
  const rs101 = new SafeIntRangeSet([
    [0, 1],
    [31, 33],
    [3, 24],
    [8, 14],
    [3, 4],
    [25, 26],
  ]);
  assertStrictEquals(rs101.includesValue(-1), false);
  assertStrictEquals(rs101.includesValue(0), true);
  assertStrictEquals(rs101.includesValue(1), true);
  assertStrictEquals(rs101.includesValue(2), false);
  assertStrictEquals(rs101.includesValue(3), true);
  assertStrictEquals(rs101.includesValue(4), true);
  assertStrictEquals(rs101.includesValue(5), true);
  assertStrictEquals(rs101.includesValue(6), true);
  assertStrictEquals(rs101.includesValue(7), true);
  assertStrictEquals(rs101.includesValue(8), true);
  assertStrictEquals(rs101.includesValue(9), true);
  assertStrictEquals(rs101.includesValue(10), true);
  assertStrictEquals(rs101.includesValue(11), true);
  assertStrictEquals(rs101.includesValue(12), true);
  assertStrictEquals(rs101.includesValue(13), true);
  assertStrictEquals(rs101.includesValue(14), true);
  assertStrictEquals(rs101.includesValue(15), true);
  assertStrictEquals(rs101.includesValue(16), true);
  assertStrictEquals(rs101.includesValue(17), true);
  assertStrictEquals(rs101.includesValue(18), true);
  assertStrictEquals(rs101.includesValue(19), true);
  assertStrictEquals(rs101.includesValue(20), true);
  assertStrictEquals(rs101.includesValue(21), true);
  assertStrictEquals(rs101.includesValue(22), true);
  assertStrictEquals(rs101.includesValue(23), true);
  assertStrictEquals(rs101.includesValue(24), true);
  assertStrictEquals(rs101.includesValue(25), true);
  assertStrictEquals(rs101.includesValue(26), true);
  assertStrictEquals(rs101.includesValue(27), false);
  assertStrictEquals(rs101.includesValue(28), false);
  assertStrictEquals(rs101.includesValue(29), false);
  assertStrictEquals(rs101.includesValue(30), false);
  assertStrictEquals(rs101.includesValue(31), true);
  assertStrictEquals(rs101.includesValue(32), true);
  assertStrictEquals(rs101.includesValue(33), true);
  assertStrictEquals(rs101.includesValue(34), false);
});

Deno.test("Numerics.SafeIntRangeSet.prototype.[Symbol.iterator]()", () => {
  const rs1 = new SafeIntRangeSet([[0, 10], [0, 0]]);
  [...rs1].splice(0);
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,10");
});

Deno.test("Numerics.SafeIntRangeSet.prototype.toArray()", () => {
  const rs1 = new SafeIntRangeSet([[0, 10], [0, 0]]);
  rs1.toArray().splice(0);
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,10");
});

Deno.test("Numerics.SafeIntRangeSet.prototype.toSet()", () => {
  const rs1 = new SafeIntRangeSet([[0, 0], [0, 10]]);
  rs1.toSet().clear();
  assertStrictEquals(rs1.toArray().map((r) => _s(r)).join("|"), "0,10");
});
