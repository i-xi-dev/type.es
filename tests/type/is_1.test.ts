import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isBigIntInRange()", () => {
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, -1n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(0n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(0n, 1n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(0n, -1n, -1n), false);

  assertStrictEquals(Type.isBigIntInRange(1n, 0n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(1n, 0n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(1n, -1n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(1n, 1n, 1n), true);
  assertStrictEquals(Type.isBigIntInRange(1n, -1n, -1n), false);

  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, 0n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, 1n, 0n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, -1n, 0n), true);
  assertStrictEquals(Type.isBigIntInRange(-1n, 0n, -1n), false); // 負のrange
  assertStrictEquals(Type.isBigIntInRange(-1n, 1n, 1n), false);
  assertStrictEquals(Type.isBigIntInRange(-1n, -1n, -1n), true);

  assertStrictEquals(Type.isBigIntInRange(0, 0n, 0n), false);

  const ex2 = "`min` must be a `bigint`.";
  assertThrows(
    () => {
      Type.isBigIntInRange(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    ex2,
  );

  const ex3 = "`max` must be a `bigint`.";
  assertThrows(
    () => {
      Type.isBigIntInRange(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    ex3,
  );
});
