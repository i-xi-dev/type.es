import * as Type from "../../type/mod.ts";
import {
  ByteOrder,
  InvalidStateError,
  QuotaExceededError,
  Radix,
  String as ExString,
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
  SafeInt,
  Uint16,
  Uint32,
  Uint8,
} from "../../numerics/mod.ts";
import { digitCountOf } from "../operations/mod.ts";

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
  export type LoadFromIterableOptions = {
    byteOrder?: byteorder; // uint8の場合は無視
    //XXX 範囲外はエラーにするかsaturateにするかtruncateにするか
    //XXX 見込サイズ,
    //XXX 超えたらabortするサイズ,
    //XXX 逐次追加するか、すべてエラーなしの場合のみ追加するか
  };
}

// type _Uint8xArray =
//   | Uint16Array<ArrayBuffer>
//   | Uint32Array<ArrayBuffer>
//   | BigUint64Array<ArrayBuffer>;

type _LoadConfig<
  T extends int,
  U extends /* _Uint8xArray */ ArrayBufferView<ArrayBuffer>,
> = {
  typedArrayCtor:
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | BigUint64ArrayConstructor;
  byteLength: safeint;
  resetView1: (view: U, uint8xExpected: T) => void;
  resetView2: (
    view: DataView,
    uint8xExpected: T,
    littleEndian: boolean,
  ) => void;
};

const _U16Conf: _LoadConfig<safeint, Uint16Array<ArrayBuffer>> = {
  typedArrayCtor: Uint16Array,
  byteLength: Uint16.BYTE_LENGTH,
  resetView1(view: Uint16Array<ArrayBuffer>, uint16Expected: safeint) {
    Type.assertUint16(uint16Expected, "value[*]");
    view[0] = uint16Expected;
  },
  resetView2(
    view: DataView,
    uint16Expected: safeint,
    littleEndian: boolean,
  ) {
    Type.assertUint16(uint16Expected, "value[*]");
    view.setUint16(0, uint16Expected, littleEndian);
  },
} as const;

const _U32Conf: _LoadConfig<safeint, Uint32Array<ArrayBuffer>> = {
  typedArrayCtor: Uint32Array,
  byteLength: Uint32.BYTE_LENGTH,
  resetView1(view: Uint32Array<ArrayBuffer>, uint32Expected: safeint) {
    Type.assertUint32(uint32Expected, "value[*]");
    view[0] = uint32Expected;
  },
  resetView2(
    view: DataView,
    uint32Expected: safeint,
    littleEndian: boolean,
  ) {
    Type.assertUint32(uint32Expected, "value[*]");
    view.setUint32(0, uint32Expected, littleEndian);
  },
} as const;

const _U64Conf: _LoadConfig<bigint, BigUint64Array<ArrayBuffer>> = {
  typedArrayCtor: BigUint64Array,
  byteLength: BigUint64.BYTE_LENGTH,
  resetView1(view: BigUint64Array<ArrayBuffer>, uint64Expected: bigint) {
    Type.assertBigUint64(uint64Expected, "value[*]");
    view[0] = uint64Expected;
  },
  resetView2(
    view: DataView,
    uint64Expected: bigint,
    littleEndian: boolean,
  ) {
    Type.assertBigUint64(uint64Expected, "value[*]");
    view.setBigUint64(0, uint64Expected, littleEndian);
  },
} as const;

export class BytesBuilder {
  #length: safeint;
  #bytes: Uint8Array<ArrayBuffer> | null;
  //XXX order持つべき？

  private constructor(buffer: ArrayBuffer, offset: safeint) {
    this.#length = offset;
    this.#bytes = new Uint8Array(buffer);
  }

  get capacity(): safeint {
    return this.#isValidState() ? this.#bytes!.byteLength : -1;
  }

  get byteLength(): safeint {
    return this.#isValidState() ? this.#length : -1;
  }

  get growable(): boolean {
    return this.#isValidState()
      ? (this.#bytes!.buffer.resizable === true)
      : false;
  }

  get [Symbol.toStringTag](): string {
    return "BytesBuilder";
  }

  static create(init?: Init): BytesBuilder {
    const { capacity, capacityMax } = _computeSize(init);

    let buffer: ArrayBuffer;
    if (capacity === capacityMax) {
      buffer = new ArrayBuffer(capacity);
    } else {
      buffer = new ArrayBuffer(capacity, { maxByteLength: capacityMax });
    }

    return new BytesBuilder(buffer, 0);
  }

  //XXX オプションでfill(repeat)
  //XXX オプションで範囲外はエラーにするかsaturateにするかtruncateにするか
  appendByte(byte: /* uint8 */ safeint): this {
    Type.assertUint8(byte, "byte");
    this.#appendByte(byte as uint8);
    return this;
  }

  #appendByte(byte: uint8): void {
    this.#assertValidState();

    this.#growIfNeeded(Uint8.BYTE_LENGTH);
    this.#bytes![this.#length] = byte;
    this.#length = this.#length + Uint8.BYTE_LENGTH;
  }

  loadRandomBytes(byteLength: safeint): void {
    Type.assertSafeIntInRange(byteLength, "byteLength", [0, 65536]); // 65536(Uint16.SIZE)はgetRandomValuesの制約
    this.#assertValidState();

    this.#growIfNeeded(byteLength);
    const view = new Uint8Array(this.#bytes!.buffer, this.#length, byteLength);
    globalThis.crypto.getRandomValues(view);
    this.#length = this.#length + byteLength;
  }

  // TypedArrayであるかに関係なくArrayBufferのbyte順通りにuint8で読み取る
  // - BufferSourceの部分範囲だけ追加したければsubarray()などしてから渡せば良い
  // - SharedArrayBufferはBufferSourceに含まれない（がjsから実行した場合は弾かれない）
  loadFromBufferSource(bytes: BufferSource): void {
    Type.assertBufferSource(bytes, "bytes");
    this.#assertValidState();

    this.#growIfNeeded(bytes.byteLength);
    this.#bytes!.set(
      new Uint8Array(("buffer" in bytes) ? bytes.buffer : bytes),
      this.#length,
    );
    this.#length = this.#length + bytes.byteLength;
  }

  #isValidState(): boolean {
    return (this.#bytes !== null);
  }

  #assertValidState(): void {
    if (this.#isValidState() !== true) {
      throw new InvalidStateError("This BytesBuilder is no longer available.");
    }
  }

  #growIfNeeded(byteLength: safeint): void {
    if (this.#length >= this.#bytes!.buffer.maxByteLength) {
      throw new QuotaExceededError("Max byte length exceeded.");
    }

    if ((this.#length + byteLength) > this.#bytes!.byteLength) {
      const extent = Math.max(byteLength, _DEFAULT_CAPACITY); //XXX どのくらいが適正？
      this.#grow(this.#length + extent);
    }
  }

  #grow(newCapacity: safeint): void {
    // if (_RESIZABLE === true) {
    const buffer = this.#bytes!.buffer;
    buffer.resize(
      (newCapacity > buffer.maxByteLength) ? buffer.maxByteLength : newCapacity,
    );
    // }
    // else {
    //   const newBuffer = new Uint8Array(～);
    //   newBuffer.set(this.#bytes, 0);
    //   this.#bytes = newBuffer;
    // }
  }

  //XXX optionsで
  // - radix
  // - separatorなし固定長、separatorあり固定長、separatorあり可変長、
  // 000afff0 → [ 0x0, 0xA, 0xFF, 0xF0 ]
  loadFromString(bytesAsString: string): void {
    Type.assertString(bytesAsString, "bytesAsString");

    if (bytesAsString.length <= 0) {
      return;
    }

    const radix = Radix.HEXADECIMAL;
    if ((bytesAsString.length % digitCountOf(radix)!) !== 0) {
      throw new RangeError(
        "`bytesAsString` must be text representation of byte sequence.",
      );
    }
    const pattern = Radix.integerPatternOf(radix);
    if (new RegExp(pattern).test(bytesAsString) !== true) {
      throw new RangeError(
        "`bytesAsString` must be text representation of byte sequence.",
      );
    }

    const bytes = (function* (chars, length) {
      for (let i = 0; i < length; i += 2) {
        yield SafeInt.fromString(chars.next().value! + chars.next().value!, {
          radix,
        });
      }
    })(ExString.toChars(bytesAsString), bytesAsString.length);

    this.loadFromUint8Iterable(bytes);
  }

  // // \u0000\u000A\u00FF\u00F0 → [ 0x0, 0xA, 0xFF, 0xF0 ]
  // /** @deprecated */
  // loadFromBinaryString(): void {
  // }

  toArrayBuffer(): ArrayBuffer {
    this.#assertValidState();

    const buffer = this.#bytes!.buffer;
    this.#bytes = null; //XXX transferはNode.jsが未実装

    if (buffer.resizable === true) {
      buffer.resize(this.#length);
    }
    return buffer;
  }

  toUint8Array(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.toArrayBuffer());
  }

  duplicateAsArrayBuffer(): ArrayBuffer {
    this.#assertValidState();
    return this.#bytes!.buffer.slice(0, this.#length);
  }

  duplicateAsUint8Array(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.duplicateAsArrayBuffer());
  }

  // - SharedArrayBufferはBufferSourceに含まれない（がjsから実行した場合は弾かれない）
  copyTo(destination: BufferSource, offset: safeint = 0): void {
    Type.assertBufferSource(destination, "destination");
    Type.assertNonNegativeSafeInt(offset, "offset");

    const dstBytes = new Uint8Array(
      ("buffer" in destination) ? destination.buffer : destination,
      offset, // offsetがdestinationの範囲外なら、new Uint8Array()でRangeErrorになる
    );
    this.#assertValidState();
    if (dstBytes.byteLength < this.#length) {
      // Uint8Array#setでRangeErrorになるが、メッセージが割と意味不明なので
      throw new RangeError(
        "The byteLength of the `destination` is not long enough.",
      );
    }
    dstBytes.set(this.#bytes!.subarray(0, this.#length));
  }

  loadFromUint8Iterable(value: Iterable<safeint /* uint8 */>): void {
    Type.assertIterable(value, "value");

    const loadedBytes = BytesBuilder.create();
    for (const uint8Expected of value) {
      Type.assertUint8(uint8Expected, "value[*]");
      loadedBytes.#appendByte(uint8Expected as uint8);
    }
    this.loadFromBufferSource(loadedBytes.toArrayBuffer());
  }

  async loadFromUint8AsyncIterable(
    value: AsyncIterable<safeint /* uint8 */>,
  ): Promise<void> {
    Type.assertAsyncIterable(value, "value");

    const loadedBytes = BytesBuilder.create();
    for await (const uint8Expected of value) {
      Type.assertUint8(uint8Expected, "value[*]");
      loadedBytes.#appendByte(uint8Expected as uint8);
    }
    this.loadFromBufferSource(loadedBytes.toArrayBuffer());
  }

  loadFromUint16Iterable(
    value: Iterable<uint16>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): void {
    this.#loadFromUint8xIterable<uint16, Uint16Array<ArrayBuffer>>(
      value,
      _U16Conf,
      options,
    );
  }

  async loadFromUint16AsyncIterable(
    value: AsyncIterable<uint16>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): Promise<void> {
    await this.#loadFromUint8xAsyncIterable<uint16, Uint16Array<ArrayBuffer>>(
      value,
      _U16Conf,
      options,
    );
  }

  loadFromUint32Iterable(
    value: Iterable<uint32>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): void {
    this.#loadFromUint8xIterable<uint32, Uint32Array<ArrayBuffer>>(
      value,
      _U32Conf,
      options,
    );
  }

  async loadFromUint32AsyncIterable(
    value: AsyncIterable<uint32>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): Promise<void> {
    await this.#loadFromUint8xAsyncIterable<uint32, Uint32Array<ArrayBuffer>>(
      value,
      _U32Conf,
      options,
    );
  }

  loadFromBigUint64Iterable(
    value: Iterable<biguint64>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): void {
    this.#loadFromUint8xIterable<biguint64, BigUint64Array<ArrayBuffer>>(
      value,
      _U64Conf,
      options,
    );
  }

  async loadFromBigUint64AsyncIterable(
    value: AsyncIterable<biguint64>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): Promise<void> {
    await this.#loadFromUint8xAsyncIterable<
      biguint64,
      BigUint64Array<ArrayBuffer>
    >(value, _U64Conf, options);
  }

  #loadFromUint8xIterable<
    T extends int,
    U extends ArrayBufferView<ArrayBuffer>,
  >(
    value: Iterable<T>,
    init: _LoadConfig<T, U>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): void {
    Type.assertIterable(value, "value");

    const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
    const loadedBytes = BytesBuilder.create();
    if (byteOrder === ByteOrder.nativeOrder) {
      const v = new init.typedArrayCtor(1);
      for (const uint8xExpected of value) {
        init.resetView1(v as unknown as U, uint8xExpected);
        loadedBytes.loadFromBufferSource(v);
      }
    } else {
      const v = new DataView(new ArrayBuffer(init.byteLength));
      const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
      for (const uint8xExpected of value) {
        // this.#appendBytes(Uint16.toBytes(uint16Expected, byteOrder)); だとArrayBufferがloop毎に生成されるので遅い
        init.resetView2(v, uint8xExpected, isLittleEndian);
        loadedBytes.loadFromBufferSource(v);
      }
    }

    this.loadFromBufferSource(loadedBytes.toArrayBuffer());
  }

  async #loadFromUint8xAsyncIterable<
    T extends int,
    U extends ArrayBufferView<ArrayBuffer>,
  >(
    value: AsyncIterable<T>,
    init: _LoadConfig<T, U>,
    options?: BytesBuilder.LoadFromIterableOptions,
  ): Promise<void> {
    Type.assertAsyncIterable(value, "value");

    const byteOrder = options?.byteOrder ?? ByteOrder.nativeOrder;
    const loadedBytes = BytesBuilder.create();
    if (byteOrder === ByteOrder.nativeOrder) {
      const v = new init.typedArrayCtor(1);
      for await (const uint8xExpected of value) {
        init.resetView1(v as unknown as U, uint8xExpected);
        loadedBytes.loadFromBufferSource(v);
      }
    } else {
      const v = new DataView(new ArrayBuffer(init.byteLength));
      const isLittleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
      for await (const uint8xExpected of value) {
        init.resetView2(v, uint8xExpected, isLittleEndian);
        loadedBytes.loadFromBufferSource(v);
      }
    }

    this.loadFromBufferSource(loadedBytes.toArrayBuffer());
  }
}
