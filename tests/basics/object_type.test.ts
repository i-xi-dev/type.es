import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Basics } from "../../mod.ts";

const { ObjectType } = Basics;

Deno.test("ObjectType.isNull()", () => {
  assertStrictEquals(ObjectType.isNull({}), false);
  assertStrictEquals(ObjectType.isNull(null), true);
  assertStrictEquals(ObjectType.isNull(undefined), false);
  assertStrictEquals(ObjectType.isNull([]), false);
  assertStrictEquals(ObjectType.isNull(new Error()), false);
  assertStrictEquals(ObjectType.isNull(""), false);
  assertStrictEquals(ObjectType.isNull(1), false);
  assertStrictEquals(ObjectType.isNull(true), false);
  assertStrictEquals(ObjectType.isNull(false), false);
});

Deno.test("ObjectType.isNullOrUndefined()", () => {
  assertStrictEquals(ObjectType.isNullOrUndefined({}), false);
  assertStrictEquals(ObjectType.isNullOrUndefined(null), true);
  assertStrictEquals(ObjectType.isNullOrUndefined(undefined), true);
  assertStrictEquals(ObjectType.isNullOrUndefined([]), false);
  assertStrictEquals(ObjectType.isNullOrUndefined(new Error()), false);
  assertStrictEquals(ObjectType.isNullOrUndefined(""), false);
  assertStrictEquals(ObjectType.isNullOrUndefined(1), false);
  assertStrictEquals(ObjectType.isNullOrUndefined(true), false);
  assertStrictEquals(ObjectType.isNullOrUndefined(false), false);
});

Deno.test("ObjectType.isIterable()", () => {
  assertStrictEquals(ObjectType.isIterable({}), false);
  assertStrictEquals(ObjectType.isIterable(null), false);
  assertStrictEquals(ObjectType.isIterable(undefined), false);
  assertStrictEquals(ObjectType.isIterable([]), true);
  assertStrictEquals(ObjectType.isIterable(new Error()), false);
  assertStrictEquals(ObjectType.isIterable(""), false);
  assertStrictEquals(ObjectType.isIterable(1), false);
  assertStrictEquals(ObjectType.isIterable(true), false);
  assertStrictEquals(ObjectType.isIterable(false), false);

  assertStrictEquals(ObjectType.isIterable(new Uint8Array()), true);
  assertStrictEquals(ObjectType.isIterable(new String()), true);
  assertStrictEquals(
    ObjectType.isIterable((function* () {})()),
    true,
  );
  assertStrictEquals(
    ObjectType.isIterable((async function* () {})()),
    false,
  );
});

Deno.test("ObjectType.assertIterable()", () => {
  try {
    ObjectType.assertIterable([], "test-1");
    ObjectType.assertIterable(
      (function* () {
        yield 0;
      })(),
      "test-1",
    );
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    ObjectType.assertAsyncIterable(
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
    ObjectType.assertIterable({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    ObjectType.assertIterable(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    ObjectType.assertIterable(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("ObjectType.isAsyncIterable()", () => {
  assertStrictEquals(ObjectType.isAsyncIterable({}), false);
  assertStrictEquals(ObjectType.isAsyncIterable(null), false);
  assertStrictEquals(ObjectType.isAsyncIterable(undefined), false);
  assertStrictEquals(ObjectType.isAsyncIterable([]), false);
  assertStrictEquals(ObjectType.isAsyncIterable(new Error()), false);
  assertStrictEquals(ObjectType.isAsyncIterable(""), false);
  assertStrictEquals(ObjectType.isAsyncIterable(1), false);
  assertStrictEquals(ObjectType.isAsyncIterable(true), false);
  assertStrictEquals(ObjectType.isAsyncIterable(false), false);

  assertStrictEquals(
    ObjectType.isAsyncIterable(new Uint8Array()),
    false,
  );
  assertStrictEquals(ObjectType.isAsyncIterable(new String()), false);
  assertStrictEquals(
    ObjectType.isAsyncIterable((function* () {})()),
    false,
  );
  assertStrictEquals(
    ObjectType.isAsyncIterable((async function* () {})()),
    true,
  );
});

Deno.test("ObjectType.assertAsyncIterable()", () => {
  try {
    ObjectType.assertAsyncIterable(
      (async function* () {
        yield 0;
      })(),
      "test-1",
    );
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    ObjectType.assertAsyncIterable([], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    ObjectType.assertAsyncIterable({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    ObjectType.assertAsyncIterable(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    ObjectType.assertAsyncIterable(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});
