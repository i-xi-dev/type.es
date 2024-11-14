import {
  assertAsyncIterable as assertAsyncIterableObject,
  assertIterable as assertIterableObject,
} from "../_0/object_type.ts";
import { ByteOrder } from "../byte_order.ts";
import * as env from "../env.ts";
import { GrowableBuffer } from "./growable_buffer.ts";
import { int, uint16, uint8, xint } from "../_.ts";
import { Uint16, Uint8 } from "./uint_type.ts";

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
//   maxByteLength?: int;
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

type _Uint8xArrayCtor =
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | BigUint64ArrayConstructor;

type _Setter<T extends xint> = (
  dataView: DataView,
  value: T,
  isLittleEndian: boolean,
) => void;

function _resolveByteOrder(byteOrder?: ByteOrder): ByteOrder {
  if (Object.values(ByteOrder).includes(byteOrder as ByteOrder)) {
    return byteOrder!;
  }
  return env.BYTE_ORDER;
}

function _fromUint8xIterable<T extends xint>(
  value: Iterable<T>,
  uint8xArrayCtor: _Uint8xArrayCtor,
  assertElement: (i: unknown, label: string) => void,
  viewSetter: _Setter<T>,
  byteOrder: ByteOrder,
): ArrayBuffer {
  const gb = new GrowableBuffer();
  const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
  const tmp = new ArrayBuffer(uint8xArrayCtor.BYTES_PER_ELEMENT);
  const tmpView = new DataView(tmp);

  let index = 0;
  for (const i of value) {
    assertElement(i, `value[${index}]`);
    viewSetter(tmpView, i, isLittleEndian);
    gb.putRange(tmpView);
    index++;
  }
  return gb.slice().buffer;
}

export type FromUint16IterableOptions = {
  byteOrder?: ByteOrder;
  // maxByteLength?: int;
};

export function fromUint16Iterable(
  value: Iterable<uint16>,
  options?: FromUint16IterableOptions,
): ArrayBuffer {
  assertIterableObject(value, "value");

  const byteOrder = _resolveByteOrder(options?.byteOrder);

  if (byteOrder !== env.BYTE_ORDER) {
    return _fromUint8xIterable<uint16>(
      value,
      Uint16Array,
      (t, l) => Uint16.assert(t, l),
      (v, i, e) => v.setUint16(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    return Uint16Array.from(value, (i, index) => {
      Uint16.assert(i, `value[${index}]`);
      return i;
    }).buffer;
  }
}
