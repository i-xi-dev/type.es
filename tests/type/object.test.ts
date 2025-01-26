import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isObject()", () => {
  assertStrictEquals(Type.isObject({}), true);
  assertStrictEquals(Type.isObject(null), true);
  assertStrictEquals(Type.isObject(undefined), false);
  assertStrictEquals(Type.isObject([]), true);
  assertStrictEquals(Type.isObject(new Error()), true);
  assertStrictEquals(Type.isObject(""), false);
  assertStrictEquals(Type.isObject(1), false);
  assertStrictEquals(Type.isObject(true), false);
  assertStrictEquals(Type.isObject(false), false);
});

Deno.test("Type.assertObject()", () => {
  try {
    Type.assertObject({}, "test-1");
    Type.assertObject(null, "test-1");
    Type.assertObject([], "test-1");
    Type.assertObject(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertObject(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNonNullObject()", () => {
  assertStrictEquals(Type.isNonNullObject({}), true);
  assertStrictEquals(Type.isNonNullObject(null), false);
  assertStrictEquals(Type.isNonNullObject(undefined), false);
  assertStrictEquals(Type.isNonNullObject([]), true);
  assertStrictEquals(Type.isNonNullObject(new Error()), true);
  assertStrictEquals(Type.isNonNullObject(""), false);
  assertStrictEquals(Type.isNonNullObject(1), false);
  assertStrictEquals(Type.isNonNullObject(true), false);
  assertStrictEquals(Type.isNonNullObject(false), false);
});

Deno.test("Type.assertNonNullObject()", () => {
  try {
    Type.assertNonNullObject({}, "test-1");
    Type.assertNonNullObject([], "test-1");
    Type.assertNonNullObject(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNullObject(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNonNullObject(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNull()", () => {
  assertStrictEquals(Type.isNull({}), false);
  assertStrictEquals(Type.isNull(null), true);
  assertStrictEquals(Type.isNull(undefined), false);
  assertStrictEquals(Type.isNull([]), false);
  assertStrictEquals(Type.isNull(new Error()), false);
  assertStrictEquals(Type.isNull(""), false);
  assertStrictEquals(Type.isNull(1), false);
  assertStrictEquals(Type.isNull(true), false);
  assertStrictEquals(Type.isNull(false), false);
});

Deno.test("Type.assertNull()", () => {
  try {
    Type.assertNull(null, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNull(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNull({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNull(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isNullOrUndefined()", () => {
  assertStrictEquals(Type.isNullOrUndefined({}), false);
  assertStrictEquals(Type.isNullOrUndefined(null), true);
  assertStrictEquals(Type.isNullOrUndefined(undefined), true);
  assertStrictEquals(Type.isNullOrUndefined([]), false);
  assertStrictEquals(Type.isNullOrUndefined(new Error()), false);
  assertStrictEquals(Type.isNullOrUndefined(""), false);
  assertStrictEquals(Type.isNullOrUndefined(1), false);
  assertStrictEquals(Type.isNullOrUndefined(true), false);
  assertStrictEquals(Type.isNullOrUndefined(false), false);
});

Deno.test("Type.assertNullOrUndefined()", () => {
  try {
    Type.assertNullOrUndefined(null, "test-1");
    Type.assertNullOrUndefined(undefined, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNullOrUndefined({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNullOrUndefined(0, "test-1");
    unreachable();
  } catch {
    //
  }
});
