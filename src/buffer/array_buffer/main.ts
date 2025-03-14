import * as ByteOrder from "../../basics/byte_order/mod.ts";
import * as Type from "../../type/mod.ts";
import {
  type biguint64,
  type byteorder,
  type int,
  type safeint,
  type uint16,
  type uint32,
  type uint8,
} from "../../_typedef/mod.ts";
import { BytesBuilder } from "../bytes_builder/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";

// const _DEFAULT_BYTE_LENGTH = 1_024;
// const _DEFAULT_MAX_BYTE_LENGTH = 1_048_576;

//XXX
// export type FromUint8IterableOptions = {
//   maxByteLength?: safeint;
// };

export function fromUint8Iterable(
  value: Iterable<safeint /* uint8 */>,
  // options?: FromUint8IterableOptions,
): ArrayBuffer {
  Type.assertIterable(value, "value");

  return Uint8Array.from(value, (byte, index) => {
    Type.assertUint8(byte, `value[${index}]`);
    return byte;
  }).buffer;
}

export async function fromUint8AsyncIterable(
  value: AsyncIterable<safeint /* uint8 */>,
  // options?: FromUint8IterableOptions,
): Promise<ArrayBuffer> {
  Type.assertAsyncIterable(value, "value");

  const builder = new BytesBuilder();
  let index = 0;
  for await (const byte of value) {
    Type.assertUint8(byte, `value[${index}]`);
    builder.append(byte as uint8);
    index++;
  }
  return builder.toArrayBuffer();
}

export function toUint8Iterable(value: ArrayBuffer): Iterable<uint8> {
  Type.assertArrayBuffer(value, "value");
  return (new Uint8Array(value))[Symbol.iterator]() as Iterable<uint8>;
}

type _Uint8xArrayCtor =
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | BigUint64ArrayConstructor;

type _Setter<T extends int> = (
  dataView: DataView,
  value: T,
  isLittleEndian: boolean,
) => void;

function _fromUint8xIterable<T extends int>(
  value: Iterable<T>,
  uint8xArrayCtor: _Uint8xArrayCtor,
  assertElement: (i: unknown, label: string) => void,
  viewSetter: _Setter<T>,
  byteOrder: byteorder = ByteOrder.nativeOrder,
): ArrayBuffer {
  Type.assertByteOrder(byteOrder, "byteOrder");

  const builder = new BytesBuilder();
  const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
  const tmp = new ArrayBuffer(uint8xArrayCtor.BYTES_PER_ELEMENT);
  const tmpView = new DataView(tmp);

  let index = 0;
  for (const i of value) {
    assertElement(i, `value[${index}]`);
    viewSetter(tmpView, i, isLittleEndian);
    builder.append(tmpView);
    index++;
  }
  return builder.toArrayBuffer();
}

async function _fromUint8xAsyncIterable<T extends int>(
  value: AsyncIterable<T>,
  uint8xArrayCtor: _Uint8xArrayCtor,
  assertElement: (i: unknown, label: string) => void,
  viewSetter: _Setter<T>,
  byteOrder: byteorder = ByteOrder.nativeOrder,
): Promise<ArrayBuffer> {
  Type.assertByteOrder(byteOrder, "byteOrder");

  const builder = new BytesBuilder();
  const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
  const tmp = new ArrayBuffer(uint8xArrayCtor.BYTES_PER_ELEMENT);
  const tmpView = new DataView(tmp);

  let index = 0;
  for await (const i of value) {
    assertElement(i, `value[${index}]`);
    viewSetter(tmpView, i, isLittleEndian);
    builder.append(tmpView);
    index++;
  }
  return builder.toArrayBuffer();
}

type _Getter<T extends int> = (
  dataView: DataView,
  pos: safeint,
  isLittleEndian: boolean,
) => T;

function _toUint8xIterable<T extends int>(
  value: ArrayBuffer,
  uint8xArrayCtor: _Uint8xArrayCtor,
  viewGetter: _Getter<T>,
  byteOrder: byteorder = ByteOrder.nativeOrder,
): Iterable<T> {
  Type.assertArrayBuffer(value, "value");
  Type.assertByteOrder(byteOrder, "byteOrder");

  const bytesPerElement = uint8xArrayCtor.BYTES_PER_ELEMENT;
  if ((value.byteLength % bytesPerElement) !== ExNumber.ZERO) {
    throw new RangeError(
      `The byte length of \`value\` must be divisible by ${bytesPerElement}.`,
    );
  }

  if (byteOrder !== ByteOrder.nativeOrder) {
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
  byteOrder?: byteorder;
  // maxByteLength?: safeint;
};

export function fromUint16Iterable(
  value: Iterable<uint16>,
  options?: FromUint8xIterableOptions,
): ArrayBuffer {
  Type.assertIterable(value, "value");

  const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  if (byteOrder !== ByteOrder.nativeOrder) {
    return _fromUint8xIterable<uint16>(
      value,
      Uint16Array,
      (t, l) => Type.assertUint16(t, l),
      (v, i, e) => v.setUint16(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    return Uint16Array.from(value, (i, index) => {
      Type.assertUint16(i, `value[${index}]`);
      return i;
    }).buffer;
  }
}

export async function fromUint16AsyncIterable(
  value: AsyncIterable<uint16>,
  options?: FromUint8xIterableOptions,
): Promise<ArrayBuffer> {
  Type.assertAsyncIterable(value, "value");

  const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  if (byteOrder !== ByteOrder.nativeOrder) {
    return _fromUint8xAsyncIterable<uint16>(
      value,
      Uint16Array,
      (t, l) => Type.assertUint16(t, l),
      (v, i, e) => v.setUint16(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    const builder = new BytesBuilder();
    const tmpView = new Uint16Array(1);
    let index = 0;
    for await (const i of value) {
      Type.assertUint16(i, `value[${index}]`);
      tmpView[0] = i;
      builder.append(tmpView);
      index++;
    }
    return builder.toArrayBuffer();
  }
}

export type ToUint8xIterableOptions = {
  byteOrder?: byteorder;
};

export function toUint16Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<uint16> {
  return _toUint8xIterable<uint16>(value, Uint16Array, (v, o, e) => {
    return v.getUint16(o, e);
  }, options?.byteOrder);
}

export function fromUint32Iterable(
  value: Iterable<uint32>,
  options?: FromUint8xIterableOptions,
): ArrayBuffer {
  Type.assertIterable(value, "value");

  const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  if (byteOrder !== ByteOrder.nativeOrder) {
    return _fromUint8xIterable<uint32>(
      value,
      Uint32Array,
      (t, l) => Type.assertUint32(t, l),
      (v, i, e) => v.setUint32(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    return Uint32Array.from(value, (i, index) => {
      Type.assertUint32(i, `value[${index}]`);
      return i;
    }).buffer;
  }
}

export async function fromUint32AsyncIterable(
  value: AsyncIterable<uint32>,
  options?: FromUint8xIterableOptions,
): Promise<ArrayBuffer> {
  Type.assertAsyncIterable(value, "value");

  const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  if (byteOrder !== ByteOrder.nativeOrder) {
    return _fromUint8xAsyncIterable<uint32>(
      value,
      Uint32Array,
      (t, l) => Type.assertUint32(t, l),
      (v, i, e) => v.setUint32(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    const builder = new BytesBuilder();
    const tmpView = new Uint32Array(1);
    let index = 0;
    for await (const i of value) {
      Type.assertUint32(i, `value[${index}]`);
      tmpView[0] = i;
      builder.append(tmpView);
      index++;
    }
    return builder.toArrayBuffer();
  }
}

export function toUint32Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<uint32> {
  return _toUint8xIterable<uint32>(value, Uint32Array, (v, o, e) => {
    return v.getUint32(o, e);
  }, options?.byteOrder);
}

export function fromBigUint64Iterable(
  value: Iterable<biguint64>,
  options?: FromUint8xIterableOptions,
): ArrayBuffer {
  Type.assertIterable(value, "value");

  const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  if (byteOrder !== ByteOrder.nativeOrder) {
    return _fromUint8xIterable<biguint64>(
      value,
      BigUint64Array,
      (t, l) => Type.assertBigUint64(t, l),
      (v, i, e) => v.setBigUint64(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    //XXX ArrayLikeでないとビルドできない、仕様はIterableでは？？
    return BigUint64Array.from(
      value as unknown as ArrayLike<bigint>,
      (i, index) => {
        Type.assertBigUint64(i, `value[${index}]`);
        return i;
      },
    ).buffer as ArrayBuffer; //XXX ArrayBufferLikeになりえないのでは？？
  }
}

export async function fromBigUint64AsyncIterable(
  value: AsyncIterable<biguint64>,
  options?: FromUint8xIterableOptions,
): Promise<ArrayBuffer> {
  Type.assertAsyncIterable(value, "value");

  const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  if (byteOrder !== ByteOrder.nativeOrder) {
    return _fromUint8xAsyncIterable<biguint64>(
      value,
      BigUint64Array,
      (t, l) => Type.assertBigUint64(t, l),
      (v, i, e) => v.setBigUint64(0, i, e),
      byteOrder,
    );
  } else {
    // 実行環境のバイトオーダー

    const builder = new BytesBuilder();
    const tmpView = new BigUint64Array(1);
    let index = 0;
    for await (const i of value) {
      Type.assertBigUint64(i, `value[${index}]`);
      tmpView[0] = i;
      builder.append(tmpView);
      index++;
    }
    return builder.toArrayBuffer();
  }
}

export function toBigUint64Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<biguint64> {
  return _toUint8xIterable<biguint64>(value, BigUint64Array, (v, o, e) => {
    return v.getBigUint64(o, e);
  }, options?.byteOrder);
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
