import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { IntegerRange } = Numerics;

const minmax2m = { min: -2, max: -2 };
const minmax1m = { min: -1, max: -1 };
const minmax0 = { min: 0, max: 0 };
const minmax1 = { min: 1, max: 1 };
const minmax2 = { min: 2, max: 2 };

const min0max1 = { min: 0, max: 1 };

Deno.test("IntegerRange.rangeEquals() - number", () => {
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax0), true);

  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax1), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax2m), false);

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, min0max1), false);
  assertStrictEquals(
    IntegerRange.rangeEquals({ min: -1, max: 0 }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeEquals(minmax0, { min: -1, max: 0 }),
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

Deno.test("IntegerRange.rangeIsDisjointFrom() - number", () => {
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax0), false);

  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax2m),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax1m),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax2m),
    true,
  );

  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(minmax0, min0max1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom({ min: -1, max: 0 }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(minmax0, { min: -1, max: 0 }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax1), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax1, minmax0), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax1m), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax1m, minmax0), true);

  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax2), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax2, minmax0), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax2m), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax2m, minmax0), true);
});

Deno.test("IntegerRange.rangeIsAdjacentTo() - number", () => {
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
    IntegerRange.rangeIsAdjacentTo({ min: -1, max: 0 }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(minmax0, { min: -1, max: 0 }),
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

Deno.test("IntegerRange.Struct.fromRangeLike() - number", () => {
  const a00 = IntegerRange.Struct.fromRangeLike({ min: 0, max: 0 });
  assertStrictEquals(a00.min, 0);
  assertStrictEquals(a00.max, 0);
  const b00 = IntegerRange.Struct.fromRangeLike([0, 0]);
  assertStrictEquals(b00.min, 0);
  assertStrictEquals(b00.max, 0);
  const c00 = IntegerRange.Struct.fromRangeLike([0]);
  assertStrictEquals(c00.min, 0);
  assertStrictEquals(c00.max, 0);

  const a01 = IntegerRange.Struct.fromRangeLike({ min: 0, max: 1 });
  assertStrictEquals(a01.min, 0);
  assertStrictEquals(a01.max, 1);
  const b01 = IntegerRange.Struct.fromRangeLike([0, 1]);
  assertStrictEquals(b01.min, 0);
  assertStrictEquals(b01.max, 1);

  const c11 = IntegerRange.Struct.fromRangeLike([1]);
  assertStrictEquals(c11.min, 1);
  assertStrictEquals(c11.max, 1);

  const a10 = IntegerRange.Struct.fromRangeLike({ min: -1, max: 0 });
  assertStrictEquals(a10.min, -1);
  assertStrictEquals(a10.max, 0);
  const b10 = IntegerRange.Struct.fromRangeLike([-1, 0]);
  assertStrictEquals(b10.min, -1);
  assertStrictEquals(b10.max, 0);

  const rfe1 = "`rangeLike` array must have more than one element.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([] as unknown as [number]);
    },
    RangeError,
    rfe1,
  );

  const b01x = IntegerRange.Struct.fromRangeLike(
    [0, 1, 2] as unknown as [number],
  );
  assertStrictEquals(b01x.min, 0);
  assertStrictEquals(b01x.max, 1);

  const rfe2 = "`rangeLike` must be a `IntegerRange.Like`.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(null as unknown as [number]);
    },
    TypeError,
    rfe2,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(0 as unknown as [number]);
    },
    TypeError,
    rfe2,
  );

  const rfe3 = "`rangeLike` must have the integers `min` and `max`.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(Math as unknown as [number]);
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(
        { min: null, max: null } as unknown as [number],
      );
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike(
        { min: 0.5, max: 0.5 } as unknown as [number],
      );
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([null, null] as unknown as [number]);
    },
    TypeError,
    rfe3,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([0.5, 0.5] as unknown as [number]);
    },
    TypeError,
    rfe3,
  );

  const rfe4 = "`min` must be less than or equal to `max`.";
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike([0, -1]);
    },
    RangeError,
    rfe4,
  );
  assertThrows(
    () => {
      IntegerRange.Struct.fromRangeLike({ min: 0, max: -1 });
    },
    RangeError,
    rfe4,
  );
});
