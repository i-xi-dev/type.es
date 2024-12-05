// export type ArrayBufferViewConstructor =
//   | TypedArrayConstructor
//   | DataViewConstructor;
/**
 * The type of the [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
 */
export type ArrayBufferViewConstructor<T extends ArrayBufferView> = {
  new (a: ArrayBuffer, b?: number, c?: number): T;
};

/**
 * The type of the [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) constructor.
 */
export type TypedArrayConstructor =
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Int8ArrayConstructor
  | Uint16ArrayConstructor
  | Int16ArrayConstructor
  | Uint32ArrayConstructor
  | Int32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | BigUint64ArrayConstructor
  | BigInt64ArrayConstructor;

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is a [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) constructor.
 */
export function isTypedArrayConstructor(
  value: unknown,
): value is TypedArrayConstructor {
  return ((value === Uint8Array) || (value === Uint8ClampedArray) ||
    (value === Int8Array) || (value === Uint16Array) ||
    (value === Int16Array) || (value === Uint32Array) ||
    (value === Int32Array) || (value === Float32Array) ||
    (value === Float64Array) || (value === BigUint64Array) ||
    (value === BigInt64Array));
}

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is a [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) constructor.
 */
export function isDataViewConstructor(
  value: unknown,
): value is DataViewConstructor {
  return value === DataView;
}

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is an [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
 */
export function isArrayBufferViewConstructor(
  value: unknown,
): value is TypedArrayConstructor | DataViewConstructor {
  return isTypedArrayConstructor(value) ? true : isDataViewConstructor(value);
}
