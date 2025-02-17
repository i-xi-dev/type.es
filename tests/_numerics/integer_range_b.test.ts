import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { IntegerRange } = Numerics;

const minmax2m = { min: -2n, max: -2n };
const minmax1m = { min: -1n, max: -1n };
const minmax0 = { min: 0n, max: 0n };
const minmax1 = { min: 1n, max: 1n };
const minmax2 = { min: 2n, max: 2n };

const min0max1 = { min: 0n, max: 1n };

Deno.test("IntegerRange.rangeEquals() - bigint", () => {
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax0), true);

  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax1), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax2m), false);

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, min0max1), false);
  assertStrictEquals(
    IntegerRange.rangeEquals({ min: -1n, max: 0n }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeEquals(minmax0, { min: -1n, max: 0n }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax1), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax1m, minmax0), false);

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax2), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax2, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax2m, minmax0), false);
});

Deno.test("IntegerRange.rangeIsAdjacentTo() - bigint", () => {
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax0), false);

  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax2m),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax1m),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax2m),
    false,
  );

  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(minmax0, min0max1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo({ min: -1n, max: 0n }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(minmax0, { min: -1n, max: 0n }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax1), true);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax1, minmax0), true);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax1m), true);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax1m, minmax0), true);

  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax2), false);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax2, minmax0), false);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax2m, minmax0), false);
});

Deno.test("IntegerRange.Struct.fromRangeLike() - bigint", () => {
  const a00 = IntegerRange.Struct.fromRangeLike({ min: 0n, max: 0n });
  assertStrictEquals(a00.min, 0n);
  assertStrictEquals(a00.max, 0n);
  const b00 = IntegerRange.Struct.fromRangeLike([0n, 0n]);
  assertStrictEquals(b00.min, 0n);
  assertStrictEquals(b00.max, 0n);
  const c00 = IntegerRange.Struct.fromRangeLike([0n]);
  assertStrictEquals(c00.min, 0n);
  assertStrictEquals(c00.max, 0n);

  const a01 = IntegerRange.Struct.fromRangeLike({ min: 0n, max: 1n });
  assertStrictEquals(a01.min, 0n);
  assertStrictEquals(a01.max, 1n);
  const b01 = IntegerRange.Struct.fromRangeLike([0n, 1n]);
  assertStrictEquals(b01.min, 0n);
  assertStrictEquals(b01.max, 1n);

  const c11 = IntegerRange.Struct.fromRangeLike([1n]);
  assertStrictEquals(c11.min, 1n);
  assertStrictEquals(c11.max, 1n);

  const a10 = IntegerRange.Struct.fromRangeLike({ min: -1n, max: 0n });
  assertStrictEquals(a10.min, -1n);
  assertStrictEquals(a10.max, 0n);
  const b10 = IntegerRange.Struct.fromRangeLike([-1n, 0n]);
  assertStrictEquals(b10.min, -1n);
  assertStrictEquals(b10.max, 0n);

  const rfe1 = "`rangeLike` array must have more than one element.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([] as unknown as [bigint]);
    },
    RangeError,
    rfe1,
  );

  const b01x = IntegerRange.Struct.fromRangeLike(
    [0n, 1n, 2n] as unknown as [bigint],
  );
  assertStrictEquals(b01x.min, 0n);
  assertStrictEquals(b01x.max, 1n);

  const rfe2 = "`rangeLike` must be a `IntegerRange.Like`.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(null as unknown as [bigint]);
    },
    TypeError,
    rfe2,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(0n as unknown as [bigint]);
    },
    TypeError,
    rfe2,
  );

  const rfe3 = "`rangeLike` must have the integers `min` and `max`.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(Math as unknown as [bigint]);
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(
        { min: null, max: null } as unknown as [bigint],
      );
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(
        { min: 0.5, max: 0.5 } as unknown as [bigint],
      );
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([null, null] as unknown as [bigint]);
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([0.5, 0.5] as unknown as [bigint]);
    },
    TypeError,
    rfe3,
  );

  const rfe4 = "`min` must be less than or equal to `max`.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([0n, -1n]);
    },
    RangeError,
    rfe4,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike({ min: 0n, max: -1n });
    },
    RangeError,
    rfe4,
  );
});
