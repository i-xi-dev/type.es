import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { IntegerRange } = Numerics;

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
