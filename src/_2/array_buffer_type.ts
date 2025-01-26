import { assertArrayBuffer } from "../type/array_buffer.ts";
import {
  assertAsyncIterable as assertAsyncIterableObject,
  assertIterable as assertIterableObject,
} from "../basics/object_type.ts";
import { ByteOrder } from "../basics/byte_order.ts";
import * as env from "../env.ts";
import { GrowableBuffer } from "./growable_buffer.ts";
import { biguint64, int, uint16, uint32, uint8, xint } from "../_.ts";
import { BigUint64 } from "../numerics/big_uint.ts";
import { Uint16, Uint32, Uint8 } from "../numerics/uint.ts";

// const _DEFAULT_BYTE_LENGTH = 1_024;
// const _DEFAULT_MAX_BYTE_LENGTH = 1_048_576;

//XXX
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

  //XXX resizable ArrayBufferが広く実装されたらそちらに変更する
  const gb = new GrowableBuffer();
  let index = 0;
  for await (const byte of value) {
    Uint8.assert(byte, `value[${index}]`);
    gb.put(byte as uint8);
    index++;
  }
  return gb.slice().buffer;
}

export function toUint8Iterable(value: ArrayBuffer): Iterable<uint8> {
  assertArrayBuffer(value, "value");
  return (new Uint8Array(value))[Symbol.iterator]() as Iterable<uint8>;
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

async function _fromUint8xAsyncIterable<T extends xint>(
  value: AsyncIterable<T>,
  uint8xArrayCtor: _Uint8xArrayCtor,
  assertElement: (i: unknown, label: string) => void,
  viewSetter: _Setter<T>,
  byteOrder: ByteOrder,
): Promise<ArrayBuffer> {
  const gb = new GrowableBuffer();
  const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
  const tmp = new ArrayBuffer(uint8xArrayCtor.BYTES_PER_ELEMENT);
  const tmpView = new DataView(tmp);

  let index = 0;
  for await (const i of value) {
    assertElement(i, `value[${index}]`);
    viewSetter(tmpView, i, isLittleEndian);
    gb.putRange(tmpView);
    index++;
  }
  return gb.slice().buffer;
}

type _Getter<T extends xint> = (
  dataView: DataView,
  pos: int,
  isLittleEndian: boolean,
) => T;

function _toUint8xIterable<T extends xint>(
  value: ArrayBuffer,
  uint8xArrayCtor: _Uint8xArrayCtor,
  viewGetter: _Getter<T>,
  byteOrder: ByteOrder,
): Iterable<T> {
  assertArrayBuffer(value, "value");

  const bytesPerElement = uint8xArrayCtor.BYTES_PER_ELEMENT;
  if ((value.byteLength % bytesPerElement) !== 0) {
    throw new RangeError(
      `The byte length of \`value\` must be divisible by ${bytesPerElement}.`,
    );
  }

  if (byteOrder !== env.BYTE_ORDER) {
    const clone = value.slice(0);
    const reader = new DataView(clone);
    const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;

    return (function* () {
      for (let i = 0; i < (clone.byteLength / bytesPerElement); i++) {
        yield viewGetter(reader, i * bytesPerElement, isLittleEndian);
      }
    })() as Iterable<T>;
  } else {
    // 実行環境のバイトオーダー

    return (new uint8xArrayCtor(value))[Symbol.iterator]() as Iterable<T>;
  }
}

export type FromUint8xIterableOptions = {
  byteOrder?: ByteOrder;
  // maxByteLength?: int;
};

export function fromUint16Iterable(
  value: Iterable<uint16>,
  options?: FromUint8xIterableOptions,
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

export async function fromUint16AsyncIterable(
  value: AsyncIterable<uint16>,
  options?: FromUint8xIterableOptions,
): Promise<ArrayBuffer> {
  assertAsyncIterableObject(value, "value");

  const byteOrder = _resolveByteOrder(options?.byteOrder);

  if (byteOrder !== env.BYTE_ORDER) {
    return _fromUint8xAsyncIterable<uint16>(
      value,
      Uint16Array,
      (t, l) => Uint16.assert(t, l),
      (v, i, e) => v.setUint16(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    //XXX resizable ArrayBufferが広く実装されたらそちらに変更する
    const gb = new GrowableBuffer();
    const tmpView = new Uint16Array(1);
    let index = 0;
    for await (const i of value) {
      Uint16.assert(i, `value[${index}]`);
      tmpView[0] = i;
      gb.putRange(tmpView);
      index++;
    }
    return gb.slice().buffer;
  }
}

export type ToUint8xIterableOptions = {
  byteOrder?: ByteOrder;
};

export function toUint16Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<uint16> {
  const byteOrder = _resolveByteOrder(options?.byteOrder);
  return _toUint8xIterable<uint16>(value, Uint16Array, (v, o, e) => {
    return v.getUint16(o, e);
  }, byteOrder);
}

export function fromUint32Iterable(
  value: Iterable<uint32>,
  options?: FromUint8xIterableOptions,
): ArrayBuffer {
  assertIterableObject(value, "value");

  const byteOrder = _resolveByteOrder(options?.byteOrder);

  if (byteOrder !== env.BYTE_ORDER) {
    return _fromUint8xIterable<uint32>(
      value,
      Uint32Array,
      (t, l) => Uint32.assert(t, l),
      (v, i, e) => v.setUint32(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    return Uint32Array.from(value, (i, index) => {
      Uint32.assert(i, `value[${index}]`);
      return i;
    }).buffer;
  }
}

export async function fromUint32AsyncIterable(
  value: AsyncIterable<uint32>,
  options?: FromUint8xIterableOptions,
): Promise<ArrayBuffer> {
  assertAsyncIterableObject(value, "value");

  const byteOrder = _resolveByteOrder(options?.byteOrder);

  if (byteOrder !== env.BYTE_ORDER) {
    return _fromUint8xAsyncIterable<uint32>(
      value,
      Uint32Array,
      (t, l) => Uint32.assert(t, l),
      (v, i, e) => v.setUint32(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    const gb = new GrowableBuffer();
    const tmpView = new Uint32Array(1);
    let index = 0;
    for await (const i of value) {
      Uint32.assert(i, `value[${index}]`);
      tmpView[0] = i;
      gb.putRange(tmpView);
      index++;
    }
    return gb.slice().buffer;
  }
}

export function toUint32Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<uint32> {
  const byteOrder = _resolveByteOrder(options?.byteOrder);
  return _toUint8xIterable<uint32>(value, Uint32Array, (v, o, e) => {
    return v.getUint32(o, e);
  }, byteOrder);
}

export function fromBigUint64Iterable(
  value: Iterable<biguint64>,
  options?: FromUint8xIterableOptions,
): ArrayBuffer {
  assertIterableObject(value, "value");

  const byteOrder = _resolveByteOrder(options?.byteOrder);

  if (byteOrder !== env.BYTE_ORDER) {
    return _fromUint8xIterable<biguint64>(
      value,
      BigUint64Array,
      (t, l) => BigUint64.assert(t, l),
      (v, i, e) => v.setBigUint64(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    //XXX ArrayLikeでないとビルドできない、仕様はIterableでは？？
    return BigUint64Array.from(
      value as unknown as ArrayLike<bigint>,
      (i, index) => {
        BigUint64.assert(i, `value[${index}]`);
        return i;
      },
    ).buffer;
  }
}

export async function fromBigUint64AsyncIterable(
  value: AsyncIterable<biguint64>,
  options?: FromUint8xIterableOptions,
): Promise<ArrayBuffer> {
  assertAsyncIterableObject(value, "value");

  const byteOrder = _resolveByteOrder(options?.byteOrder);

  if (byteOrder !== env.BYTE_ORDER) {
    return _fromUint8xAsyncIterable<biguint64>(
      value,
      BigUint64Array,
      (t, l) => BigUint64.assert(t, l),
      (v, i, e) => v.setBigUint64(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    const gb = new GrowableBuffer();
    const tmpView = new BigUint64Array(1);
    let index = 0;
    for await (const i of value) {
      BigUint64.assert(i, `value[${index}]`);
      tmpView[0] = i;
      gb.putRange(tmpView);
      index++;
    }
    return gb.slice().buffer;
  }
}

export function toBigUint64Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<biguint64> {
  const byteOrder = _resolveByteOrder(options?.byteOrder);
  return _toUint8xIterable<biguint64>(value, BigUint64Array, (v, o, e) => {
    return v.getBigUint64(o, e);
  }, byteOrder);
}

/*XXX
fromInt8Iterable
fromAsyncInt8Iterable
toInt8Iterable
fromInt16Iterable
fromAsyncInt16Iterable
toInt16Iterable
fromInt32Iterable
fromAsyncInt32Iterable
toInt32Iterable
fromBigInt64Iterable
fromAsyncBigInt64Iterable
toBigInt64Iterable
fromFloat32Iterable
fromAsyncFloat32Iterable
toFloat32Iterable
fromFloat64Iterable
fromAsyncFloat64Iterable
toFloat64Iterable
*/
