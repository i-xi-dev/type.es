export function isArrayBuffer(test: unknown): test is ArrayBuffer {
  return (test instanceof ArrayBuffer);
}

export function assertArrayBuffer(test: unknown, label: string): void {
  if (isArrayBuffer(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`ArrayBuffer\`.`);
  }
}

export function isSharedArrayBuffer(test: unknown): test is SharedArrayBuffer {
  // (globalThis.SharedArrayBuffer)は、ブラウザー向け
  return globalThis.SharedArrayBuffer && (test instanceof SharedArrayBuffer);
}

export function assertSharedArrayBuffer(test: unknown, label: string): void {
  if (isSharedArrayBuffer(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`SharedArrayBuffer\`.`);
  }
}

export function isArrayBufferLike(test: unknown): test is ArrayBufferLike {
  return isArrayBuffer(test) || isSharedArrayBuffer(test);
}

export function assertArrayBufferLike(test: unknown, label: string): void {
  if (isArrayBufferLike(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`ArrayBufferLike\`.`);
  }
}

export function isUint8Array(test: unknown): test is Uint8Array<ArrayBuffer> {
  return (test instanceof Uint8Array) && isArrayBuffer(test.buffer);
}

export function assertUint8Array(test: unknown, label: string): void {
  if (isUint8Array(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Uint8Array<ArrayBuffer>\`.`);
  }
}

//XXX isSharedUint8Array, assertSharedUint8Array

export function isAllowSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBufferLike> {
  return (test instanceof Uint8Array);
}

export function assertAllowSharedUint8Array(
  test: unknown,
  label: string,
): void {
  if (isAllowSharedUint8Array(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Uint8Array\`.`);
  }
}

export function isArrayBufferView(
  test: unknown,
): test is ArrayBufferView<ArrayBuffer> {
  return ArrayBuffer.isView(test) && (test.buffer instanceof ArrayBuffer);
}

export function assertArrayBufferView(test: unknown, label: string): void {
  if (isArrayBufferView(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be an \`ArrayBufferView<ArrayBuffer>\`.`,
    );
  }
}

//XXX isAllowSharedArrayBufferView, assertAllowSharedArrayBufferView

export function isBufferSource(test: unknown): test is BufferSource {
  return isArrayBuffer(test) || isArrayBufferView(test);
}

export function assertBufferSource(test: unknown, label: string): void {
  if (isBufferSource(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`BufferSource\`.`);
  }
}

//XXX isAllowSharedBufferSource, assertAllowSharedBufferSource

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
 * @param test - The value to be tested
 * @returns Whether the passed value is a [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) constructor.
 */
export function isTypedArrayConstructor(
  test: unknown,
): test is TypedArrayConstructor {
  return ((test === Uint8Array) || (test === Uint8ClampedArray) ||
    (test === Int8Array) || (test === Uint16Array) ||
    (test === Int16Array) || (test === Uint32Array) ||
    (test === Int32Array) || (test === Float32Array) ||
    (test === Float64Array) || (test === BigUint64Array) ||
    (test === BigInt64Array));
}

/**
 * @param test - The value to be tested
 * @returns Whether the passed value is a [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) constructor.
 */
export function isDataViewConstructor(
  test: unknown,
): test is DataViewConstructor {
  return test === DataView;
}

/**
 * @param test - The value to be tested
 * @returns Whether the passed value is an [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
 */
export function isArrayBufferViewConstructor(
  test: unknown,
): test is TypedArrayConstructor | DataViewConstructor {
  return isTypedArrayConstructor(test) ? true : isDataViewConstructor(test);
}
