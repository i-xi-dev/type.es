import * as Type from "../../type/mod.ts";
import {
  type biguint64,
  type byteorder,
  type int,
  type radix,
  type safeint,
  type uint16,
  type uint32,
  type uint8,
} from "../../_typedef/mod.ts";
import { ByteOrder, Radix, String as ExString } from "../../basics/mod.ts";
import { SafeInt } from "../../numerics/mod.ts";

const { EMPTY } = ExString;

// Uint8Arrayにすれば良いだけなので不要
// export function toUint8Iterable(value: ArrayBuffer): Iterable<uint8> {
//   Type.assertArrayBuffer(value, "value");
//   return (new Uint8Array(value))[Symbol.iterator]() as Iterable<uint8>;
// }

export function toArray(value: ArrayBuffer): Array<uint8> {
  Type.assertArrayBuffer(value, "value");
  return [...new Uint8Array(value)] as Array<uint8>;
}

const _ByteStringLength = {
  [Radix.HEXADECIMAL]: 2,
  [Radix.BINARY]: 8,
  [Radix.DECIMAL]: 3,
  [Radix.OCTAL]: 3,
};

export type ToStringIterableOptions = {
  radix?: radix;
  lowerCase?: boolean;
  //XXX prefix,suffix,...
};

export function toStringIterable(
  value: ArrayBuffer,
  options?: ToStringIterableOptions,
): Iterable<string> {
  Type.assertArrayBuffer(value, "value");

  const radix = options?.radix ?? Radix.HEXADECIMAL;
  const resolvedOptions = {
    radix,
    lowerCase: options?.lowerCase === true,
    minIntegerDigits: _ByteStringLength[radix],
  };

  return (function* (bytes: Uint8Array<ArrayBuffer>) {
    for (const byte of bytes) {
      yield SafeInt.toString(byte, resolvedOptions);
    }
  })(new Uint8Array(value));
}

export type ToStringOptions = {
  radix?: radix;
  lowerCase?: boolean;
  //XXX prefix,suffix,...
  separator?: string;
};

export function toString(
  value: ArrayBuffer,
  options?: ToStringOptions,
): string {
  const strings = [...toStringIterable(value, options)];
  const separator = options?.separator ?? EMPTY;
  return strings.join(separator);
}

type _Uint8xArrayCtor =
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | BigUint64ArrayConstructor;

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
  if ((value.byteLength % bytesPerElement) !== 0) {
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

export function toBigUint64Iterable(
  value: ArrayBuffer,
  options?: ToUint8xIterableOptions,
): Iterable<biguint64> {
  return _toUint8xIterable<biguint64>(value, BigUint64Array, (v, o, e) => {
    return v.getBigUint64(o, e);
  }, options?.byteOrder);
}
