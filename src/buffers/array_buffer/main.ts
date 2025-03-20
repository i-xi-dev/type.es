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

//XXX Uint8Arrayにすれば良いだけなので不要では
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
  return builder.takeAsArrayBuffer();
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

export function toUint32Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<uint32> {
  return _toUint8xIterable<uint32>(value, Uint32Array, (v, o, e) => {
    return v.getUint32(o, e);
  }, options?.byteOrder);
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
    return builder.takeAsArrayBuffer();
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
