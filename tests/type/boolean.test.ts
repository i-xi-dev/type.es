import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isBoolean()", () => {
  assertStrictEquals(Type.isBoolean({}), false);
  assertStrictEquals(Type.isBoolean(null), false);
  assertStrictEquals(Type.isBoolean(undefined), false);
  assertStrictEquals(Type.isBoolean([]), false);
  assertStrictEquals(Type.isBoolean(new Error()), false);
  assertStrictEquals(Type.isBoolean(""), false);
  assertStrictEquals(Type.isBoolean(1), false);
  assertStrictEquals(Type.isBoolean(true), true);
  assertStrictEquals(Type.isBoolean(false), true);
});

Deno.test("Type.assertBoolean()", () => {
  try {
    Type.assertBoolean(true, "test-1");
    Type.assertBoolean(false, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBoolean(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBoolean(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBoolean(new Boolean(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isTrue()", () => {
  assertStrictEquals(Type.isTrue({}), false);
  assertStrictEquals(Type.isTrue(null), false);
  assertStrictEquals(Type.isTrue(undefined), false);
  assertStrictEquals(Type.isTrue([]), false);
  assertStrictEquals(Type.isTrue(new Error()), false);
  assertStrictEquals(Type.isTrue(""), false);
  assertStrictEquals(Type.isTrue(1), false);
  assertStrictEquals(Type.isTrue(true), true);
  assertStrictEquals(Type.isTrue(false), false);
});

Deno.test("Type.assertTrue()", () => {
  try {
    Type.assertTrue(true, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertTrue(false, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertTrue(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertTrue(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertTrue(new Boolean(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isFalse()", () => {
  assertStrictEquals(Type.isFalse({}), false);
  assertStrictEquals(Type.isFalse(null), false);
  assertStrictEquals(Type.isFalse(undefined), false);
  assertStrictEquals(Type.isFalse([]), false);
  assertStrictEquals(Type.isFalse(new Error()), false);
  assertStrictEquals(Type.isFalse(""), false);
  assertStrictEquals(Type.isFalse(1), false);
  assertStrictEquals(Type.isFalse(true), false);
  assertStrictEquals(Type.isFalse(false), true);
});

Deno.test("Type.assertFalse()", () => {
  try {
    Type.assertFalse(false, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertFalse(true, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFalse(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFalse(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFalse(new Boolean(0), "test-1");
    unreachable();
  } catch {
    //
  }
});
