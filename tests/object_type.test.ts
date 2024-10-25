import { assertStrictEquals } from "./deps.ts";
import { ObjectType } from "../mod.ts";

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
