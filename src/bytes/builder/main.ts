import * as Type from "../../type/mod.ts";
import {
  ByteOrder,
  InvalidStateError,
  QuotaExceededError,
} from "../../basics/mod.ts";
import {
  type biguint64,
  type byteorder,
  type int,
  type safeint,
  type uint16,
  type uint32,
  type uint8,
} from "../../_typedef/mod.ts";
import {
  BigUint64,
  Number as ExNumber,
  Uint16,
  Uint32,
  Uint8,
} from "../../numerics/mod.ts";

const _DEFAULT_CAPACITY = 1_048_576;

const _MAX_CAPACITY = 536_870_912;

// const _RESIZABLE = ("resizable" in ArrayBuffer.prototype);

type Init = {
  capacity?: safeint;
  capacityMax?: safeint;
  //XXX 増加量かその算出式
};

function _computeSize(
  init?: Init,
): { capacity: safeint; capacityMax: safeint } {
  const capacityMax = Type.isSafeInt(init?.capacityMax)
    ? init.capacityMax
    : _MAX_CAPACITY;
  Type.assertSafeIntInRange(capacityMax, "init.capacityMax", [
    0,
    _MAX_CAPACITY,
  ]);

  const capacity = Type.isSafeInt(init?.capacity)
    ? init.capacity
    : Math.min(capacityMax, _DEFAULT_CAPACITY);
  Type.assertSafeIntInRange(capacity, "init.capacity", [0, capacityMax]);

  return { capacity, capacityMax };
}

export namespace Builder {
  export type LoadOptions = {
    byteOrder?: byteorder; // uint8の場合は無視
    //XXX 見込サイズ,
    //    超えたらabortするサイズ,
  };
}

type _LoadFromUint8xIterableConfig = {
  typedArrayCtor: Uint16ArrayConstructor | Uint32ArrayConstructor;
  assertElement: (test: unknown, label: string) => void;
  setterName: "setUint16" | "setUint32";
  byteLength: safeint;
};

type _LoadFromBigUint8xIterableConfig = {
  typedArrayCtor: BigUint64ArrayConstructor;
  assertElement: (test: unknown, label: string) => void;
  setterName: "setBigUint64";
  byteLength: safeint;
};

type _LoadConfig =
  | _LoadFromUint8xIterableConfig
  | _LoadFromBigUint8xIterableConfig;

export class Builder {
  #length: safeint;
  #buffer: Uint8Array<ArrayBuffer> | null;

  constructor(init?: Init) {
    const { capacity, capacityMax } = _computeSize(init);

    this.#length = ExNumber.ZERO;
    let buffer: ArrayBuffer;
    if (capacity === capacityMax) {
      buffer = new ArrayBuffer(capacity);
    } else {
      buffer = new ArrayBuffer(capacity, { maxByteLength: capacityMax });
    }
    this.#buffer = new Uint8Array(buffer);
  }

  get capacity(): safeint {
    return this.#isValidState() ? this.#buffer!.byteLength : -1;
  }

  get length(): safeint {
    return this.#isValidState() ? this.#length : -1;
  }

  get growable(): boolean {
    return this.#isValidState()
      ? (this.#buffer!.buffer.resizable === true)
      : false;
  }

  get [Symbol.toStringTag](): string {
    return "Builder";
  }

  // static create(init?: Init): Builder {

  // }

  // static wrap(buffer: ArrayBuffer): Builder {

  // }

  // dispose(): void {

  // }

  append(byteOrBytes: /* uint8 */ safeint | BufferSource): this {
    this.#assertValidState();

    if (Type.isBufferSource(byteOrBytes)) {
      return this.#appendBytes(byteOrBytes);
    } else if (Type.isUint8(byteOrBytes)) {
      Type.assertUint8(byteOrBytes, "byteOrBytes");
      return this.#appendByte(byteOrBytes);
    }

    throw new TypeError(
      "`byteOrBytes` must be a `BufferSource` or an 8-bit unsigned integer.",
    );
  }

  #isValidState(): boolean {
    return (this.#buffer !== null);
  }

  #assertValidState(): void {
    if (this.#isValidState() !== true) {
      throw new InvalidStateError("This Builder is no longer available.");
    }
  }

  #appendByte(byte: uint8): this {
    this.#growIfNeeded(Uint8.BYTE_LENGTH);
    this.#buffer![this.#length] = byte;
    this.#length = this.#length + Uint8.BYTE_LENGTH;
    return this;
  }

  #appendBytes(bytes: BufferSource): this {
    // Type.assertBufferSource(bytes, assertionLabel);

    this.#growIfNeeded(bytes.byteLength);
    this.#buffer!.set(
      new Uint8Array(("buffer" in bytes) ? bytes.buffer : bytes),
      this.#length,
    );
    this.#length = this.#length + bytes.byteLength;
    return this;
  }

  #growIfNeeded(byteLength: safeint): void {
    if (this.length >= this.#buffer!.buffer.maxByteLength) {
      throw new QuotaExceededError("Max byte length exceeded.");
    }

    if ((this.#length + byteLength) > this.#buffer!.byteLength) {
      const extent = Math.max(byteLength, _DEFAULT_CAPACITY); //XXX どのくらいが適正？
      this.#grow(this.#length + extent);
    }
  }

  #grow(newCapacity: safeint): void {
    // if (_RESIZABLE === true) {
    const buffer = this.#buffer!.buffer;
    buffer.resize(
      (newCapacity > buffer.maxByteLength) ? buffer.maxByteLength : newCapacity,
    );
    // }
    // else {
    //   const newBuffer = new Uint8Array(～);
    //   newBuffer.set(this.#buffer, ExNumber.ZERO);
    //   this.#buffer = newBuffer;
    // }
  }

  toArrayBuffer(): ArrayBuffer {
    this.#assertValidState();

    const buffer = this.#buffer!.buffer;
    this.#buffer = null; //XXX transferはNode.jsが未実装

    buffer.resize(this.#length);
    return buffer;
  }

  cloneAsArrayBuffer(): ArrayBuffer {
    this.#assertValidState();
    return this.#buffer!.buffer.slice(ExNumber.ZERO, this.#length);
  }

  cloneAsUint8Array(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.cloneAsArrayBuffer());
  }

  /*
  copyToArrayBuffer(ArrayBuffer)
  */

  loadFromUint8Iterable(value: Iterable<safeint /* uint8 */>): void {
    Type.assertIterable(value, "value");

    const loaded = new Builder();
    for (const uint8Expected of value) {
      Type.assertUint8(uint8Expected, "value[*]");
      loaded.#appendByte(uint8Expected as uint8);
    }
    this.append(loaded.toArrayBuffer());
  }

  async loadFromUint8AsyncIterable(
    value: AsyncIterable<safeint /* uint8 */>,
  ): Promise<void> {
    Type.assertAsyncIterable(value, "value");

    const loaded = new Builder();
    for await (const uint8Expected of value) {
      Type.assertUint8(uint8Expected, "value[*]");
      loaded.#appendByte(uint8Expected as uint8);
    }
    this.append(loaded.toArrayBuffer());
  }

  loadFromUint16Iterable(
    value: Iterable<uint16>,
    options?: Builder.LoadOptions,
  ): void {
    this.#loadFromUint8xIterable<uint16>(value, {
      typedArrayCtor: Uint16Array,
      assertElement: Type.assertUint16,
      setterName: "setUint16",
      byteLength: Uint16.BYTE_LENGTH,
    }, options);
  }

  async loadFromUint16AsyncIterable(
    value: AsyncIterable<uint16>,
    options?: Builder.LoadOptions,
  ): Promise<void> {
    await this.#loadFromUint8xAsyncIterable<uint16>(value, {
      typedArrayCtor: Uint16Array,
      assertElement: Type.assertUint16,
      setterName: "setUint16",
      byteLength: Uint16.BYTE_LENGTH,
    }, options);
  }

  loadFromUint32Iterable(
    value: Iterable<uint32>,
    options?: Builder.LoadOptions,
  ): void {
    this.#loadFromUint8xIterable<uint32>(value, {
      typedArrayCtor: Uint32Array,
      assertElement: Type.assertUint32,
      setterName: "setUint32",
      byteLength: Uint32.BYTE_LENGTH,
    }, options);
  }

  async loadFromUint32AsyncIterable(
    value: AsyncIterable<uint32>,
    options?: Builder.LoadOptions,
  ): Promise<void> {
    await this.#loadFromUint8xAsyncIterable<uint32>(value, {
      typedArrayCtor: Uint32Array,
      assertElement: Type.assertUint32,
      setterName: "setUint32",
      byteLength: Uint32.BYTE_LENGTH,
    }, options);
  }

  loadFromBigUint64Iterable(
    value: Iterable<biguint64>,
    options?: Builder.LoadOptions,
  ): void {
    this.#loadFromUint8xIterable<biguint64>(value, {
      typedArrayCtor: BigUint64Array,
      assertElement: Type.assertBigUint64,
      setterName: "setBigUint64",
      byteLength: BigUint64.BYTE_LENGTH,
    }, options);
  }

  async loadFromBigUint64AsyncIterable(
    value: AsyncIterable<biguint64>,
    options?: Builder.LoadOptions,
  ): Promise<void> {
    await this.#loadFromUint8xAsyncIterable<biguint64>(value, {
      typedArrayCtor: BigUint64Array,
      assertElement: Type.assertBigUint64,
      setterName: "setBigUint64",
      byteLength: BigUint64.BYTE_LENGTH,
    }, options);
  }

  #loadFromUint8xIterable<T extends int>(
    value: Iterable<T>,
    init: _LoadConfig,
    options?: Builder.LoadOptions,
  ): void {
    Type.assertIterable(value, "value");

    const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
    const loaded = new Builder();
    if (byteOrder === ByteOrder.nativeOrder) {
      const v = new init.typedArrayCtor(1);
      for (const uint8xExpected of value) {
        init.assertElement(uint8xExpected, "value[*]");
        v[0] = uint8xExpected;
        loaded.#appendBytes(v);
      }
    } else {
      const v = new DataView(new ArrayBuffer(init.byteLength));
      const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
      for (const uint8xExpected of value) {
        init.assertElement(uint8xExpected, "value[*]");

        v[init.setterName as "setUint16"](
          0,
          uint8xExpected as number,
          isLittleEndian,
        );
        // as "setUint16"とas numberは、uint8xExpectedがneverになるのでトランスパイル出来ないのの回避（neverにしない為に分岐する方が無駄なので）

        loaded.#appendBytes(v);
      }
    }

    this.append(loaded.toArrayBuffer());
  }

  async #loadFromUint8xAsyncIterable<T extends int>(
    value: AsyncIterable<T>,
    init: _LoadConfig,
    options?: Builder.LoadOptions,
  ): Promise<void> {
    Type.assertAsyncIterable(value, "value");

    const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
    const loaded = new Builder();
    if (byteOrder === ByteOrder.nativeOrder) {
      const v = new init.typedArrayCtor(1);
      for await (const uint8xExpected of value) {
        init.assertElement(uint8xExpected, "value[*]");
        v[0] = uint8xExpected;
        loaded.#appendBytes(v);
      }
    } else {
      const v = new DataView(new ArrayBuffer(init.byteLength));
      for await (const uint8xExpected of value) {
        init.assertElement(uint8xExpected, "value[*]");

        v[init.setterName as "setUint16"](
          0,
          uint8xExpected as number,
          byteOrder === ByteOrder.LITTLE_ENDIAN,
        );
        // as "setUint16"とas numberは、uint8xExpectedがneverになるのでトランスパイル出来ないのの回避（neverにしない為に分岐する方が無駄なので）

        loaded.#appendBytes(v);
      }
    }

    this.append(loaded.toArrayBuffer());
  }

  // 遅い
  // loadFromUint16Iterable_2(
  //   value: Iterable<uint16>,
  //   options?: Builder.LoadOptions,
  // ): void {
  //   Type.assertIterable(value, "value");
  //   const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  //   for (const uint16Expected of value) {
  //     Type.assertUint16(uint16Expected, "value[*]");
  //     this.#appendBytes(Uint16.toBytes(uint16Expected, byteOrder));
  //   }
  // }
}
