import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { ObjectType } from "../mod.ts";

Deno.test("ObjectType.isObject()", () => {
  assertStrictEquals(ObjectType.isObject({}), true);
  assertStrictEquals(ObjectType.isObject(null), true);
  assertStrictEquals(ObjectType.isObject(undefined), false);
  assertStrictEquals(ObjectType.isObject([]), true);
  assertStrictEquals(ObjectType.isObject(new Error()), true);
  assertStrictEquals(ObjectType.isObject(""), false);
  assertStrictEquals(ObjectType.isObject(1), false);
  assertStrictEquals(ObjectType.isObject(true), false);
  assertStrictEquals(ObjectType.isObject(false), false);
});

Deno.test("ObjectType.assertObject()", () => {
  try {
    ObjectType.assertObject({}, "test-1");
    ObjectType.assertObject(null, "test-1");
    ObjectType.assertObject([], "test-1");
    ObjectType.assertObject(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    ObjectType.assertObject(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("ObjectType.isNonNull()", () => {
  assertStrictEquals(ObjectType.isNonNull({}), true);
  assertStrictEquals(ObjectType.isNonNull(null), false);
  assertStrictEquals(ObjectType.isNonNull(undefined), false);
  assertStrictEquals(ObjectType.isNonNull([]), true);
  assertStrictEquals(ObjectType.isNonNull(new Error()), true);
  assertStrictEquals(ObjectType.isNonNull(""), false);
  assertStrictEquals(ObjectType.isNonNull(1), false);
  assertStrictEquals(ObjectType.isNonNull(true), false);
  assertStrictEquals(ObjectType.isNonNull(false), false);
});

Deno.test("ObjectType.assertNonNull()", () => {
  try {
    ObjectType.assertNonNull({}, "test-1");
    ObjectType.assertNonNull([], "test-1");
    ObjectType.assertNonNull(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    ObjectType.assertNonNull(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    ObjectType.assertNonNull(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
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
