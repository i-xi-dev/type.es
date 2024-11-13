import {
  assertAsyncIterable as assertAsyncIterableObject,
  assertIterable as assertIterableObject,
} from "../_0/object_type.ts";
import { GrowableBuffer } from "./growable_buffer.ts";
import { int, uint8 } from "../_.ts";
import { Uint8 } from "./uint_type.ts";

export function is(test: unknown): test is ArrayBuffer {
  return (test instanceof ArrayBuffer);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`ArrayBuffer\`.`);
  }
}

// const _DEFAULT_BYTE_LENGTH = 1_024;
// const _DEFAULT_MAX_BYTE_LENGTH = 1_048_576;

//TODO
// export type FromUint8IterableOptions = {
//   maxByteLength: int;
// };

export function fromUint8Iterable(
  value: Iterable<int /* uint8 */>,
  // options?: FromUint8IterableOptions,
): ArrayBuffer {
  assertIterableObject(value, "value");

  return Uint8Array.from(value, (byte, index) => {
    Uint8.assert(byte, `value[${index}]`);
    return byte;
  }).buffer;
}

export async function fromUint8AsyncIterable(
  value: AsyncIterable<int /* uint8 */>,
  // options?: FromUint8IterableOptions,
): Promise<ArrayBuffer> {
  assertAsyncIterableObject(value, "value");

  //TODO resizable ArrayBufferが広く実装されたらそちらに変更する
  const gb = new GrowableBuffer();
  let index = 0;
  for await (const byte of value) {
    Uint8.assert(byte, `value[${index}]`);
    gb.put(byte as uint8);
    index++;
  }
  return gb.slice().buffer;
}

export function toUint8Iterable(bytes: ArrayBuffer): Iterable<uint8> {
  assert(bytes, "bytes");
  return (new Uint8Array(bytes))[Symbol.iterator]() as Iterable<uint8>;
}
