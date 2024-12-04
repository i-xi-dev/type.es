import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { ObjectType } from "../../mod.ts";

Deno.test("ObjectType.is()", () => {
  assertStrictEquals(ObjectType.is({}), true);
  assertStrictEquals(ObjectType.is(null), true);
  assertStrictEquals(ObjectType.is(undefined), false);
  assertStrictEquals(ObjectType.is([]), true);
  assertStrictEquals(ObjectType.is(new Error()), true);
  assertStrictEquals(ObjectType.is(""), false);
  assertStrictEquals(ObjectType.is(1), false);
  assertStrictEquals(ObjectType.is(true), false);
  assertStrictEquals(ObjectType.is(false), false);
});

Deno.test("ObjectType.assert()", () => {
  try {
    ObjectType.assert({}, "test-1");
    ObjectType.assert(null, "test-1");
    ObjectType.assert([], "test-1");
    ObjectType.assert(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    ObjectType.assert(undefined, "test-1");
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
