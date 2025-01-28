import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { ExtBigInt } from "../../mod.ts";

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("ExtBigInt.min()", () => {
  assertStrictEquals(ExtBigInt.min(0n), 0n);
  assertStrictEquals(ExtBigInt.min(1n), 1n);
  assertStrictEquals(ExtBigInt.min(-1n), -1n);

  assertStrictEquals(ExtBigInt.min(0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.min(0n, -1n), -1n);

  assertStrictEquals(ExtBigInt.min(2n, 0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.min(2n, 0n, -1n), -1n);
  assertStrictEquals(ExtBigInt.min(0n, 1n, 2n), 0n);
  assertStrictEquals(ExtBigInt.min(0n, -1n, 2n), -1n);
  assertStrictEquals(ExtBigInt.min(1n, 2n, 0n), 0n);
  assertStrictEquals(ExtBigInt.min(-1n, 2n, 0n), -1n);

  assertStrictEquals(ExtBigInt.min(-2n, 0n, 1n), -2n);
  assertStrictEquals(ExtBigInt.min(-2n, 0n, -1n), -2n);
  assertStrictEquals(ExtBigInt.min(0n, 1n, -2n), -2n);
  assertStrictEquals(ExtBigInt.min(0n, -1n, -2n), -2n);
  assertStrictEquals(ExtBigInt.min(1n, -2n, 0n), -2n);
  assertStrictEquals(ExtBigInt.min(-1n, -2n, 0n), -2n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.min(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.min(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("ExtBigInt.max()", () => {
  assertStrictEquals(ExtBigInt.max(0n), 0n);
  assertStrictEquals(ExtBigInt.max(1n), 1n);
  assertStrictEquals(ExtBigInt.max(-1n), -1n);

  assertStrictEquals(ExtBigInt.max(0n, 1n), 1n);
  assertStrictEquals(ExtBigInt.max(0n, -1n), 0n);

  assertStrictEquals(ExtBigInt.max(2n, 0n, 1n), 2n);
  assertStrictEquals(ExtBigInt.max(2n, 0n, -1n), 2n);
  assertStrictEquals(ExtBigInt.max(0n, 1n, 2n), 2n);
  assertStrictEquals(ExtBigInt.max(0n, -1n, 2n), 2n);
  assertStrictEquals(ExtBigInt.max(1n, 2n, 0n), 2n);
  assertStrictEquals(ExtBigInt.max(-1n, 2n, 0n), 2n);

  assertStrictEquals(ExtBigInt.max(-2n, 0n, 1n), 1n);
  assertStrictEquals(ExtBigInt.max(-2n, 0n, -1n), 0n);
  assertStrictEquals(ExtBigInt.max(0n, 1n, -2n), 1n);
  assertStrictEquals(ExtBigInt.max(0n, -1n, -2n), 0n);
  assertStrictEquals(ExtBigInt.max(1n, -2n, 0n), 1n);
  assertStrictEquals(ExtBigInt.max(-1n, -2n, 0n), 0n);

  const ex1 = "`value0` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.max(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`values[1]` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.max(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex2,
  );
});

Deno.test("ExtBigInt.clamp()", () => {
  const ex1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.clamp(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    ex1,
  );

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.clamp(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      ExtBigInt.clamp(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );

  const e1 = "`max` must be greater than or equal to `min`.";

  assertStrictEquals(ExtBigInt.clamp(0n, 0n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(0n, 0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.clamp(0n, -1n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(0n, 1n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      ExtBigInt.clamp(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.clamp(0n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExtBigInt.clamp(1n, 0n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(1n, 0n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(1n, -1n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(1n, 1n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      ExtBigInt.clamp(1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.clamp(1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );

  assertStrictEquals(ExtBigInt.clamp(-1n, 0n, 0n), 0n);
  assertStrictEquals(ExtBigInt.clamp(-1n, 0n, 1n), 0n);
  assertStrictEquals(ExtBigInt.clamp(-1n, -1n, 0n), -1n);
  assertStrictEquals(ExtBigInt.clamp(-1n, 1n, 1n), 1n);
  assertStrictEquals(ExtBigInt.clamp(-1n, -1n, -1n), -1n);

  assertThrows(
    () => {
      ExtBigInt.clamp(-1n, 1n, 0n); // 負のrange
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      ExtBigInt.clamp(-1n, 0n, -1n); // 負のrange
    },
    RangeError,
    e1,
  );
});
