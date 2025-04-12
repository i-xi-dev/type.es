import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isEventTarget()", () => {
  assertStrictEquals(Type.isEventTarget(new EventTarget()), true);
  assertStrictEquals(Type.isEventTarget(AbortSignal.abort()), true);

  assertStrictEquals(Type.isEventTarget(null), false);
});

Deno.test("Type.assertEventTarget()", () => {
  try {
    Type.assertEventTarget(new EventTarget(), "test-1");
    Type.assertEventTarget(AbortSignal.abort(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertEventTarget(null, "test-1");
    unreachable();
  } catch {
    //
  }
});
