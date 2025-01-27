import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isBufferSource()", () => {
  assertStrictEquals(Type.isBufferSource(new ArrayBuffer(0)), true);
  assertStrictEquals(Type.isBufferSource(Uint8Array.of(0).buffer), true);
  assertStrictEquals(Type.isBufferSource(new Uint8Array(0)), true);
  assertStrictEquals(Type.isBufferSource([]), false);
  assertStrictEquals(Type.isBufferSource(null), false);
  assertStrictEquals(Type.isBufferSource(undefined), false);
  assertStrictEquals(
    Type.isBufferSource(new DataView(new ArrayBuffer(0))),
    true,
  );
});

Deno.test("Type.assertBufferSource()", () => {
  try {
    Type.assertBufferSource(new ArrayBuffer(0), "test-1");
    Type.assertBufferSource(Uint8Array.of(0).buffer, "test-1");
    Type.assertBufferSource(new Uint8Array(0), "test-1");
    Type.assertBufferSource(new DataView(new ArrayBuffer(0)), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBufferSource([], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBufferSource(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertArrayBufferView()", () => {
  try {
    Type.assertArrayBufferView(new Uint8Array(0), "test-1");
    Type.assertArrayBufferView(new DataView(new ArrayBuffer(0)), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArrayBufferView(new ArrayBuffer(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayBufferView([], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayBufferView(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isTypedArrayConstructor(*)", () => {
  assertStrictEquals(
    Type.isTypedArrayConstructor(Uint8Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Int8Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Uint16Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Int16Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Uint32Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Int32Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Float32Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Float64Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(BigUint64Array),
    true,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(BigInt64Array),
    true,
  );

  assertStrictEquals(
    Type.isTypedArrayConstructor(DataView),
    false,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(Array),
    false,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(null),
    false,
  );
  assertStrictEquals(
    Type.isTypedArrayConstructor(new Uint8Array(0)),
    false,
  );
});

Deno.test("Type.isDataViewConstructor(*)", () => {
  assertStrictEquals(
    Type.isDataViewConstructor(Uint8Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Uint8ClampedArray),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Int8Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Uint16Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Int16Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Uint32Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Int32Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Float32Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Float64Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(BigUint64Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(BigInt64Array),
    false,
  );

  assertStrictEquals(
    Type.isDataViewConstructor(DataView),
    true,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(Array),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(null),
    false,
  );
  assertStrictEquals(
    Type.isDataViewConstructor(new Uint8Array(0)),
    false,
  );
});

Deno.test("Type.isArrayBufferViewConstructor(*)", () => {
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Uint8Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Int8Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Uint16Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Int16Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Uint32Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Int32Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Float32Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Float64Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(BigUint64Array),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(BigInt64Array),
    true,
  );

  assertStrictEquals(
    Type.isArrayBufferViewConstructor(DataView),
    true,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(Array),
    false,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(null),
    false,
  );
  assertStrictEquals(
    Type.isArrayBufferViewConstructor(new Uint8Array(0)),
    false,
  );
});
