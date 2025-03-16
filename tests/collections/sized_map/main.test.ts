import { assertStrictEquals, assertThrows } from "@std/assert";
import { Collections } from "../../../mod.ts";

const { SizedMap } = Collections;

Deno.test("new Collections.SizedMap()", () => {
  assertThrows(
    () => {
      new SizedMap(undefined as unknown as number);
    },
    TypeError,
    "`maxSize` must be a non-negative safe integer.",
  );

  assertThrows(
    () => {
      new SizedMap("2" as unknown as number);
    },
    TypeError,
    "`maxSize` must be a non-negative safe integer.",
  );

  assertThrows(
    () => {
      new SizedMap(-1);
    },
    TypeError,
    "`maxSize` must be a non-negative safe integer.",
  );

  assertThrows(
    () => {
      new SizedMap(1.5);
    },
    TypeError,
    "`maxSize` must be a non-negative safe integer.",
  );

  const m0 = new SizedMap(1);
  assertStrictEquals(m0 instanceof Map, true);
});

Deno.test("Collections.SizedMap.prototype[Symbol.toStringTag]", () => {
  const m0 = new SizedMap<string, string>(0);
  assertStrictEquals(m0[Symbol.toStringTag], "SizedMap");
});

Deno.test("Collections.SizedMap.prototype.set() - 0", () => {
  const m0 = new SizedMap<string, string>(0);
  assertStrictEquals(m0.size, 0);
  m0.set("1", "a");
  assertStrictEquals(m0.size, 0);
  m0.set("2", "b");
  assertStrictEquals(m0.size, 0);
  assertStrictEquals(m0.has("1"), false);
  assertStrictEquals(m0.has("2"), false);
});

Deno.test("Collections.SizedMap.prototype.set() - 1", () => {
  const m0 = new SizedMap<string, string>(1);
  assertStrictEquals(m0.size, 0);
  m0.set("1", "a");
  assertStrictEquals(m0.size, 1);
  m0.set("2", "b");
  assertStrictEquals(m0.size, 1);
  assertStrictEquals(m0.has("1"), false);
  assertStrictEquals(m0.has("2"), true);
});

Deno.test("Collections.SizedMap.prototype.set() - 2", () => {
  const m0 = new SizedMap<string, string>(2);
  assertStrictEquals(m0.size, 0);
  m0.set("1", "a");
  assertStrictEquals(m0.size, 1);
  m0.set("2", "b");
  assertStrictEquals(m0.size, 2);
  assertStrictEquals(m0.has("1"), true);
  assertStrictEquals(m0.has("2"), true);
  m0.set("3", "c");
  assertStrictEquals(m0.size, 2);
  assertStrictEquals(m0.has("1"), false);
  assertStrictEquals(m0.has("2"), true);
  assertStrictEquals(m0.has("3"), true);
});
