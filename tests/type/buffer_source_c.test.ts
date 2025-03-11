import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isArrayBuffer()", () => {
  assertStrictEquals(Type.isArrayBuffer(new ArrayBuffer(0)), true);
  assertStrictEquals(Type.isArrayBuffer(new SharedArrayBuffer(0)), false);
  assertStrictEquals(Type.isArrayBuffer(Uint8Array.of(0).buffer), true);
  assertStrictEquals(Type.isArrayBuffer(new Uint8Array(0)), false);
  assertStrictEquals(Type.isArrayBuffer([]), false);
  assertStrictEquals(Type.isArrayBuffer(null), false);
  assertStrictEquals(Type.isArrayBuffer(undefined), false);
});

Deno.test("Type.assertArrayBuffer()", () => {
  try {
    Type.assertArrayBuffer(new ArrayBuffer(0), "test-1");
    Type.assertArrayBuffer(Uint8Array.of(0).buffer, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArrayBuffer(new Uint8Array(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayBuffer(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isSharedArrayBuffer()", () => {
  assertStrictEquals(Type.isSharedArrayBuffer(new ArrayBuffer(0)), false);
  assertStrictEquals(Type.isSharedArrayBuffer(new SharedArrayBuffer(0)), true);
  assertStrictEquals(Type.isSharedArrayBuffer(Uint8Array.of(0).buffer), false);
  assertStrictEquals(Type.isSharedArrayBuffer(new Uint8Array(0)), false);
  assertStrictEquals(Type.isSharedArrayBuffer([]), false);
  assertStrictEquals(Type.isSharedArrayBuffer(null), false);
  assertStrictEquals(Type.isSharedArrayBuffer(undefined), false);
});

Deno.test("Type.assertSharedArrayBuffer()", () => {
  try {
    Type.assertSharedArrayBuffer(new SharedArrayBuffer(0), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertSharedArrayBuffer(new ArrayBuffer(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertSharedArrayBuffer(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isArrayBufferLike()", () => {
  assertStrictEquals(Type.isArrayBufferLike(new ArrayBuffer(0)), true);
  assertStrictEquals(Type.isArrayBufferLike(new SharedArrayBuffer(0)), true);
  assertStrictEquals(Type.isArrayBufferLike(Uint8Array.of(0).buffer), true);
  assertStrictEquals(Type.isArrayBufferLike(new Uint8Array(0)), false);
  assertStrictEquals(Type.isArrayBufferLike([]), false);
  assertStrictEquals(Type.isArrayBufferLike(null), false);
  assertStrictEquals(Type.isArrayBufferLike(undefined), false);
});

Deno.test("Type.assertArrayBufferLike()", () => {
  try {
    Type.assertArrayBufferLike(new ArrayBuffer(0), "test-1");
    Type.assertArrayBufferLike(new SharedArrayBuffer(0), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArrayBufferLike(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint8Array()", () => {
  assertStrictEquals(Type.isUint8Array(new ArrayBuffer(0)), false);
  assertStrictEquals(
    Type.isUint8Array(new Uint8Array(new SharedArrayBuffer(0))),
    false,
  );
  assertStrictEquals(Type.isUint8Array(Uint8Array.of(0).buffer), false);
  assertStrictEquals(Type.isUint8Array(new Uint8Array(0)), true);
  assertStrictEquals(Type.isUint8Array(new Uint8ClampedArray(0)), false);
  assertStrictEquals(Type.isUint8Array([]), false);
  assertStrictEquals(Type.isUint8Array(null), false);
  assertStrictEquals(Type.isUint8Array(undefined), false);
});

Deno.test("Type.assertUint8Array()", () => {
  try {
    Type.assertUint8Array(new Uint8Array(0), "test-1");
    Type.assertUint8Array(Uint8Array.of(0), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint8Array(new ArrayBuffer(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertUint8Array(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint8ClampedArray()", () => {
  assertStrictEquals(Type.isUint8ClampedArray(new ArrayBuffer(0)), false);
  assertStrictEquals(
    Type.isUint8ClampedArray(new Uint8Array(new SharedArrayBuffer(0))),
    false,
  );
  assertStrictEquals(Type.isUint8ClampedArray(Uint8Array.of(0).buffer), false);
  assertStrictEquals(Type.isUint8ClampedArray(new Uint8Array(0)), false);
  assertStrictEquals(Type.isUint8ClampedArray(new Uint8ClampedArray(0)), true);
  assertStrictEquals(
    Type.isUint8ClampedArray(new Uint8ClampedArray(new SharedArrayBuffer(0))),
    false,
  );
  assertStrictEquals(Type.isUint8ClampedArray([]), false);
  assertStrictEquals(Type.isUint8ClampedArray(null), false);
  assertStrictEquals(Type.isUint8ClampedArray(undefined), false);
});

Deno.test("Type.assertUint8ClampedArray()", () => {
  try {
    Type.assertUint8ClampedArray(new Uint8ClampedArray(0), "test-1");
    Type.assertUint8ClampedArray(Uint8ClampedArray.of(0), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint8ClampedArray(
      new Uint8ClampedArray(new SharedArrayBuffer(0)),
      "test-1",
    );
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertUint8ClampedArray(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isAllowSharedUint8Array()", () => {
  assertStrictEquals(Type.isAllowSharedUint8Array(new ArrayBuffer(0)), false);
  assertStrictEquals(
    Type.isAllowSharedUint8Array(new Uint8Array(new SharedArrayBuffer(0))),
    true,
  );
  assertStrictEquals(
    Type.isAllowSharedUint8Array(Uint8Array.of(0).buffer),
    false,
  );
  assertStrictEquals(Type.isAllowSharedUint8Array(new Uint8Array(0)), true);
  assertStrictEquals(Type.isAllowSharedUint8Array([]), false);
  assertStrictEquals(Type.isAllowSharedUint8Array(null), false);
  assertStrictEquals(Type.isAllowSharedUint8Array(undefined), false);
});

Deno.test("Type.assertAllowSharedUint8Array()", () => {
  try {
    Type.assertAllowSharedUint8Array(new Uint8Array(0), "test-1");
    Type.assertAllowSharedUint8Array(
      new Uint8Array(new SharedArrayBuffer(0)),
      "test-1",
    );
    Type.assertAllowSharedUint8Array(Uint8Array.of(0), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertAllowSharedUint8Array(new ArrayBuffer(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertAllowSharedUint8Array(null, "test-1");
    unreachable();
  } catch {
    //
  }
});
