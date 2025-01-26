import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { BigIntUtils } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("BigIntUtils.min()", () => {
  assertStrictEquals(BigIntUtils.min(0n), 0n);
  assertStrictEquals(BigIntUtils.min(1n), 1n);
  assertStrictEquals(BigIntUtils.min(-1n), -1n);

  assertStrictEquals(BigIntUtils.min(0n, 1n), 0n);
  assertStrictEquals(BigIntUtils.min(0n, -1n), -1n);

  assertStrictEquals(BigIntUtils.min(2n, 0n, 1n), 0n);
  assertStrictEquals(BigIntUtils.min(2n, 0n, -1n), -1n);
  assertStrictEquals(BigIntUtils.min(0n, 1n, 2n), 0n);
  assertStrictEquals(BigIntUtils.min(0n, -1n, 2n), -1n);
  assertStrictEquals(BigIntUtils.min(1n, 2n, 0n), 0n);
  assertStrictEquals(BigIntUtils.min(-1n, 2n, 0n), -1n);

  assertStrictEquals(BigIntUtils.min(-2n, 0n, 1n), -2n);
  assertStrictEquals(BigIntUtils.min(-2n, 0n, -1n), -2n);
  assertStrictEquals(BigIntUtils.min(0n, 1n, -2n), -2n);
  assertStrictEquals(BigIntUtils.min(0n, -1n, -2n), -2n);
  assertStrictEquals(BigIntUtils.min(1n, -2n, 0n), -2n);
  assertStrictEquals(BigIntUtils.min(-1n, -2n, 0n), -2n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.min(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.min(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("BigIntUtils.max()", () => {
  assertStrictEquals(BigIntUtils.max(0n), 0n);
  assertStrictEquals(BigIntUtils.max(1n), 1n);
  assertStrictEquals(BigIntUtils.max(-1n), -1n);

  assertStrictEquals(BigIntUtils.max(0n, 1n), 1n);
  assertStrictEquals(BigIntUtils.max(0n, -1n), 0n);

  assertStrictEquals(BigIntUtils.max(2n, 0n, 1n), 2n);
  assertStrictEquals(BigIntUtils.max(2n, 0n, -1n), 2n);
  assertStrictEquals(BigIntUtils.max(0n, 1n, 2n), 2n);
  assertStrictEquals(BigIntUtils.max(0n, -1n, 2n), 2n);
  assertStrictEquals(BigIntUtils.max(1n, 2n, 0n), 2n);
  assertStrictEquals(BigIntUtils.max(-1n, 2n, 0n), 2n);

  assertStrictEquals(BigIntUtils.max(-2n, 0n, 1n), 1n);
  assertStrictEquals(BigIntUtils.max(-2n, 0n, -1n), 0n);
  assertStrictEquals(BigIntUtils.max(0n, 1n, -2n), 1n);
  assertStrictEquals(BigIntUtils.max(0n, -1n, -2n), 0n);
  assertStrictEquals(BigIntUtils.max(1n, -2n, 0n), 1n);
  assertStrictEquals(BigIntUtils.max(-1n, -2n, 0n), 0n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.max(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.max(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("BigIntUtils.clamp()", () => {
  const ex1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.clamp(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.clamp(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      BigIntUtils.clamp(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(BigIntUtils.clamp(0n, 0n, 0n), 0n);
  assertStrictEquals(BigIntUtils.clamp(0n, 0n, 1n), 0n);
  assertStrictEquals(BigIntUtils.clamp(0n, -1n, 0n), 0n);
  assertStrictEquals(BigIntUtils.clamp(0n, 1n, 1n), 1n);
  assertStrictEquals(BigIntUtils.clamp(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntUtils.clamp(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntUtils.clamp(0n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigIntUtils.clamp(1n, 0n, 0n), 0n);
  assertStrictEquals(BigIntUtils.clamp(1n, 0n, 1n), 1n);
  assertStrictEquals(BigIntUtils.clamp(1n, -1n, 0n), 0n);
  assertStrictEquals(BigIntUtils.clamp(1n, 1n, 1n), 1n);
  assertStrictEquals(BigIntUtils.clamp(1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntUtils.clamp(1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntUtils.clamp(1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(BigIntUtils.clamp(-1n, 0n, 0n), 0n);
  assertStrictEquals(BigIntUtils.clamp(-1n, 0n, 1n), 0n);
  assertStrictEquals(BigIntUtils.clamp(-1n, -1n, 0n), -1n);
  assertStrictEquals(BigIntUtils.clamp(-1n, 1n, 1n), 1n);
  assertStrictEquals(BigIntUtils.clamp(-1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigIntUtils.clamp(-1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigIntUtils.clamp(-1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );
});
