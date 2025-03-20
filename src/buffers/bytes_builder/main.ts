import * as Type from "../../type/mod.ts";
import {
  ByteOrder,
  InvalidStateError,
  QuotaExceededError,
} from "../../basics/mod.ts";
import {
  type byteorder,
  type safeint,
  type uint16,
  type uint8,
} from "../../_typedef/mod.ts";
import { Number as ExNumber, Uint16, Uint8 } from "../../numerics/mod.ts";

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

export namespace BytesBuilder {
  export type LoadOptions = {
    byteOrder?: byteorder; // uint8の場合は無視
  };
}

export class BytesBuilder {
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
    return "BytesBuilder";
  }

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
      throw new InvalidStateError("This BytesBuilder is no longer available.");
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

  takeAsArrayBuffer(): ArrayBuffer {
    this.#assertValidState();

    const buffer = this.#buffer!.buffer;
    this.#buffer = null;

    buffer.resize(this.#length);
    return buffer;
  }

  takeAsUint8Array(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.takeAsArrayBuffer());
  }

  copyToArrayBuffer(): ArrayBuffer {
    this.#assertValidState();
    return this.#buffer!.buffer.slice(ExNumber.ZERO, this.#length);
  }

  copyToUint8Array(): Uint8Array<ArrayBuffer> {
    this.#assertValidState();
    return new Uint8Array(this.copyToArrayBuffer());
  }

  //XXX optionsで最大サイズ
  loadFromUint8Iterable(value: Iterable<safeint /* uint8 */>): void {
    Type.assertIterable(value, "value");

    const loaded = new BytesBuilder();
    for (const uint8Expected of value) {
      Type.assertUint8(uint8Expected, "value[*]");
      loaded.#appendByte(uint8Expected as uint8);
    }
    this.append(loaded.takeAsArrayBuffer());
  }

  //XXX optionsで最大サイズ
  async loadFromUint8AsyncIterable(
    value: AsyncIterable<safeint /* uint8 */>,
  ): Promise<void> {
    Type.assertAsyncIterable(value, "value");

    const loaded = new BytesBuilder();
    for await (const uint8Expected of value) {
      Type.assertUint8(uint8Expected, "value[*]");
      loaded.#appendByte(uint8Expected as uint8);
    }
    this.append(loaded.takeAsArrayBuffer());
  }

  //XXX optionsで最大サイズ
  loadFromUint16Iterable(
    value: Iterable<uint16>,
    options?: BytesBuilder.LoadOptions,
  ): void {
    // Type.assertIterable(value, "value");
    // const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
    // const loaded = new BytesBuilder();
    // if (byteOrder === ByteOrder.nativeOrder) {
    //   const v = new Uint16Array(1);
    //   for (const uint16Expected of value) {
    //     Type.assertUint16(uint16Expected, "value[*]");
    //     v[0] = uint16Expected;
    //     loaded.#appendBytes(v);
    //   }
    // } else {
    //   const v = new DataView(new ArrayBuffer(Uint16.BYTE_LENGTH));
    //   for (const uint16Expected of value) {
    //     Type.assertUint16(uint16Expected, "value[*]");
    //     v.setUint16(0, uint16Expected, byteOrder === ByteOrder.LITTLE_ENDIAN);
    //     loaded.#appendBytes(v);
    //   }
    // }
    // this.append(loaded.takeAsArrayBuffer());

    this.#loadFromUint8xIterable<uint16>(value, {
      typedArrayCtor: Uint16Array,
      assertElement: Type.assertUint16,
      setterName: "setUint16",
      byteLength: Uint16.BYTE_LENGTH,
    }, options);
  }

  #loadFromUint8xIterable<T extends number>(
    value: Iterable<T>,
    init: {
      typedArrayCtor: Uint16ArrayConstructor | Uint32ArrayConstructor;
      assertElement: (test: unknown, label: string) => void;
      setterName: "setUint16" | "setUint32";
      byteLength: safeint;
    },
    options?: BytesBuilder.LoadOptions,
  ) {
    Type.assertIterable(value, "value");

    const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
    const loaded = new BytesBuilder();
    if (byteOrder === ByteOrder.nativeOrder) {
      const v = new init.typedArrayCtor(1);
      for (const uint8xExpected of value) {
        init.assertElement(uint8xExpected, "value[*]");
        v[0] = uint8xExpected;
        loaded.#appendBytes(v);
      }
    } else {
      const v = new DataView(new ArrayBuffer(init.byteLength));
      for (const uint8xExpected of value) {
        init.assertElement(uint8xExpected, "value[*]");
        v[init.setterName](
          0,
          uint8xExpected,
          byteOrder === ByteOrder.LITTLE_ENDIAN,
        );
        loaded.#appendBytes(v);
      }
    }

    this.append(loaded.takeAsArrayBuffer());
  }

  // 遅い
  // loadFromUint16Iterable_2(
  //   value: Iterable<uint16>,
  //   options?: BytesBuilder.LoadOptions,
  // ): void {
  //   Type.assertIterable(value, "value");
  //   const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
  //   for (const uint16Expected of value) {
  //     Type.assertUint16(uint16Expected, "value[*]");
  //     this.#appendBytes(Uint16.toBytes(uint16Expected, byteOrder));
  //   }
  // }
}
