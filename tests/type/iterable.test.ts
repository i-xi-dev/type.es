import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isIterable()", () => {
  assertStrictEquals(Type.isIterable({}), false);
  assertStrictEquals(Type.isIterable(null), false);
  assertStrictEquals(Type.isIterable(undefined), false);
  assertStrictEquals(Type.isIterable([]), true);
  assertStrictEquals(Type.isIterable(new Error()), false);
  assertStrictEquals(Type.isIterable(""), false);
  assertStrictEquals(Type.isIterable(1), false);
  assertStrictEquals(Type.isIterable(true), false);
  assertStrictEquals(Type.isIterable(false), false);

  assertStrictEquals(Type.isIterable(new Uint8Array()), true);
  assertStrictEquals(Type.isIterable(new String()), true);
  assertStrictEquals(
    Type.isIterable((function* () {})()),
    true,
  );
  assertStrictEquals(
    Type.isIterable((async function* () {})()),
    false,
  );
});

Deno.test("Type.assertIterable()", () => {
  try {
    Type.assertIterable([], "test-1");
    Type.assertIterable(
      (function* () {
        yield 0;
      })(),
      "test-1",
    );
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertAsyncIterable(
      (async function* () {
        yield 0;
      })(),
      "test-1",
    );
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertIterable({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertIterable(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertIterable(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isAsyncIterable()", () => {
  assertStrictEquals(Type.isAsyncIterable({}), false);
  assertStrictEquals(Type.isAsyncIterable(null), false);
  assertStrictEquals(Type.isAsyncIterable(undefined), false);
  assertStrictEquals(Type.isAsyncIterable([]), false);
  assertStrictEquals(Type.isAsyncIterable(new Error()), false);
  assertStrictEquals(Type.isAsyncIterable(""), false);
  assertStrictEquals(Type.isAsyncIterable(1), false);
  assertStrictEquals(Type.isAsyncIterable(true), false);
  assertStrictEquals(Type.isAsyncIterable(false), false);

  assertStrictEquals(
    Type.isAsyncIterable(new Uint8Array()),
    false,
  );
  assertStrictEquals(Type.isAsyncIterable(new String()), false);
  assertStrictEquals(
    Type.isAsyncIterable((function* () {})()),
    false,
  );
  assertStrictEquals(
    Type.isAsyncIterable((async function* () {})()),
    true,
  );
});

Deno.test("Type.assertAsyncIterable()", () => {
  try {
    Type.assertAsyncIterable(
      (async function* () {
        yield 0;
      })(),
      "test-1",
    );
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertAsyncIterable([], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertAsyncIterable({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertAsyncIterable(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertAsyncIterable(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});
