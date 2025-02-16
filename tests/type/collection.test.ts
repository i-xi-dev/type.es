import {
  assertStrictEquals,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isArray()", () => {
  assertStrictEquals(Type.isArray([]), true);
  assertStrictEquals(Type.isArray([1]), true);
  assertStrictEquals(Type.isArray([1, 2]), true);
  assertStrictEquals(Type.isArray([1, "2"]), true);
  assertStrictEquals(Type.isArray(["1"]), true);
  assertStrictEquals(Type.isArray([{}, {}]), true);

  assertStrictEquals(Type.isArray(null), false);
  assertStrictEquals(Type.isArray(Uint8Array.of(0)), false);
  assertStrictEquals(Type.isArray(new Set([1])), false);

  const isS1 = (v: unknown): v is number => Number.isSafeInteger(v);
  assertStrictEquals(Type.isArray([], isS1), true);
  assertStrictEquals(Type.isArray([1], isS1), true);
  assertStrictEquals(Type.isArray([1, 2], isS1), true);
  assertStrictEquals(Type.isArray([1, "2"], isS1), false);
  assertStrictEquals(Type.isArray(["1"], isS1), false);
  assertStrictEquals(Type.isArray([{}, {}], isS1), false);

  const isS2 = (v: unknown): v is string => (typeof v === "string");
  assertStrictEquals(Type.isArray([], isS2), true);
  assertStrictEquals(Type.isArray([1], isS2), false);
  assertStrictEquals(Type.isArray([1, 2], isS2), false);
  assertStrictEquals(Type.isArray([1, "2"], isS2), false);
  assertStrictEquals(Type.isArray(["1"], isS2), true);
  assertStrictEquals(Type.isArray([{}, {}], isS2), false);

  // deno-lint-ignore ban-types
  const isS3 = (v: unknown): v is {} => (typeof v === "object") && (v != null);
  assertStrictEquals(Type.isArray([], isS3), true);
  assertStrictEquals(Type.isArray([1], isS3), false);
  assertStrictEquals(Type.isArray([1, 2], isS3), false);
  assertStrictEquals(Type.isArray([1, "2"], isS3), false);
  assertStrictEquals(Type.isArray(["1"], isS3), false);
  assertStrictEquals(Type.isArray([{}, {}], isS3), true);
});

Deno.test("Type.assertArray()", () => {
  const isS1 = (v: unknown): v is number => Number.isSafeInteger(v);
  const op1 = { isT: isS1, elementDesc: "x" } as const;
  try {
    Type.assertArray([], "test-1");
    Type.assertArray([0], "test-1");
    Type.assertArray(["1"], "test-1");

    Type.assertArray([], "test-1", op1);
    Type.assertArray([0], "test-1", op1);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArray(["0"], "test-1", op1);
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isSet()", () => {
  assertStrictEquals(Type.isSet(new Set([])), true);
  assertStrictEquals(Type.isSet(new Set([1])), true);
  assertStrictEquals(Type.isSet(new Set([1, 2])), true);
  assertStrictEquals(Type.isSet(new Set([1, "2"])), true);
  assertStrictEquals(Type.isSet(new Set(["1"])), true);
  assertStrictEquals(Type.isSet(new Set([{}, {}])), true);

  assertStrictEquals(Type.isSet(null), false);
  assertStrictEquals(Type.isSet(Uint8Array.of(0)), false);
  assertStrictEquals(Type.isSet([1]), false);

  const isS1 = (v: unknown): v is number => Number.isSafeInteger(v);
  assertStrictEquals(Type.isSet(new Set([]), isS1), true);
  assertStrictEquals(Type.isSet(new Set([1]), isS1), true);
  assertStrictEquals(Type.isSet(new Set([1, 2]), isS1), true);
  assertStrictEquals(Type.isSet(new Set([1, "2"]), isS1), false);
  assertStrictEquals(Type.isSet(new Set(["1"]), isS1), false);
  assertStrictEquals(Type.isSet(new Set([{}, {}]), isS1), false);

  const isS2 = (v: unknown): v is string => (typeof v === "string");
  assertStrictEquals(Type.isSet(new Set([]), isS2), true);
  assertStrictEquals(Type.isSet(new Set([1]), isS2), false);
  assertStrictEquals(Type.isSet(new Set([1, 2]), isS2), false);
  assertStrictEquals(Type.isSet(new Set([1, "2"]), isS2), false);
  assertStrictEquals(Type.isSet(new Set(["1"]), isS2), true);
  assertStrictEquals(Type.isSet(new Set([{}, {}]), isS2), false);

  // deno-lint-ignore ban-types
  const isS3 = (v: unknown): v is {} => (typeof v === "object") && (v != null);
  assertStrictEquals(Type.isSet(new Set([]), isS3), true);
  assertStrictEquals(Type.isSet(new Set([1]), isS3), false);
  assertStrictEquals(Type.isSet(new Set([1, 2]), isS3), false);
  assertStrictEquals(Type.isSet(new Set([1, "2"]), isS3), false);
  assertStrictEquals(Type.isSet(new Set(["1"]), isS3), false);
  assertStrictEquals(Type.isSet(new Set([{}, {}]), isS3), true);
});

Deno.test("Type.assertSet()", () => {
  const isS1 = (v: unknown): v is number => Number.isSafeInteger(v);
  const op1 = { isT: isS1, elementDesc: "x" } as const;
  try {
    Type.assertSet(new Set([]), "test-1");
    Type.assertSet(new Set([0]), "test-1");
    Type.assertSet(new Set(["1"]), "test-1");

    Type.assertSet(new Set([]), "test-1", op1);
    Type.assertSet(new Set([0]), "test-1", op1);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertSet(new Set(["0"]), "test-1", op1);
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isArrayOrSet()", () => {
  assertStrictEquals(Type.isArrayOrSet([]), true);
  assertStrictEquals(Type.isArrayOrSet([1]), true);
  assertStrictEquals(Type.isArrayOrSet(["1"]), true);
  assertStrictEquals(Type.isArrayOrSet(new Set([])), true);
  assertStrictEquals(Type.isArrayOrSet(new Set([1])), true);
  assertStrictEquals(Type.isArrayOrSet(new Set(["1"])), true);

  assertStrictEquals(Type.isArrayOrSet(null), false);
  assertStrictEquals(Type.isArrayOrSet(Uint8Array.of(0)), false);

  const isS1 = (v: unknown): v is number => Number.isSafeInteger(v);
  assertStrictEquals(Type.isArrayOrSet(new Set([]), isS1), true);
  assertStrictEquals(Type.isArrayOrSet(new Set([1]), isS1), true);
  assertStrictEquals(Type.isArrayOrSet(new Set(["1"]), isS1), false);
  assertStrictEquals(Type.isArrayOrSet(new Set([]), isS1), true);
  assertStrictEquals(Type.isArrayOrSet(new Set([1]), isS1), true);
  assertStrictEquals(Type.isArrayOrSet(new Set(["1"]), isS1), false);
});

Deno.test("Type.assertArrayOrSet()", () => {
  const isS1 = (v: unknown): v is number => Number.isSafeInteger(v);
  const op1 = { isT: isS1, elementDesc: "x" } as const;
  try {
    Type.assertArrayOrSet([], "test-1");
    Type.assertArrayOrSet([0], "test-1");
    Type.assertArrayOrSet(["1"], "test-1");
    Type.assertArrayOrSet(new Set([]), "test-1");
    Type.assertArrayOrSet(new Set([0]), "test-1");
    Type.assertArrayOrSet(new Set(["1"]), "test-1");

    Type.assertArrayOrSet([], "test-1", op1);
    Type.assertArrayOrSet([0], "test-1", op1);
    Type.assertArrayOrSet(new Set([]), "test-1", op1);
    Type.assertArrayOrSet(new Set([0]), "test-1", op1);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertSet(["0"], "test-1", op1);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertSet(new Set(["0"]), "test-1", op1);
    unreachable();
  } catch {
    //
  }
});
