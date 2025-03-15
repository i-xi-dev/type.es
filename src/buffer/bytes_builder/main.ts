import * as Type from "../../type/mod.ts";
import { Number as ExNumber, Uint8 } from "../../numerics/mod.ts";
import { type safeint, type uint8 } from "../../_typedef/mod.ts";

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
    : _DEFAULT_CAPACITY;
  Type.assertSafeIntInRange(capacity, "init.capacity", [0, capacityMax]);

  return { capacity, capacityMax };
}

export class BytesBuilder {
  #length: safeint;
  readonly #buffer: Uint8Array<ArrayBuffer>;

  constructor(init?: Init) {
    const { capacity, capacityMax } = _computeSize(init);

    this.#length = ExNumber.ZERO;
    this.#buffer = new Uint8Array(
      new ArrayBuffer(capacity, { maxByteLength: capacityMax }),
    );
  }

  get capacity(): safeint {
    return this.#buffer.byteLength;
  }

  get length(): safeint {
    return this.#length;
  }

  //XXX Iterable<uint8>も受け付ける
  append(byteOrBytes: uint8 | BufferSource): this {
    if (Type.isBufferSource(byteOrBytes)) {
      return this.#appendBytes(byteOrBytes);
    } else if (Type.isUint8(byteOrBytes)) {
      return this.#appendByte(byteOrBytes);
    }

    throw new TypeError(
      "`byteOrBytes` must be a `BufferSource` or an 8-bit unsigned integer.",
    );
  }

  #appendByte(byte: uint8): this {
    Type.assertUint8(byte, "byte");

    this.#growIfNeeded(Uint8.BYTE_LENGTH);
    this.#buffer[this.#length] = byte;
    this.#length = this.#length + Uint8.BYTE_LENGTH;
    return this;
  }

  #appendBytes(bytes: BufferSource): this {
    Type.assertBufferSource(bytes, "bytes");

    this.#growIfNeeded(bytes.byteLength);
    this.#buffer.set(
      new Uint8Array(("buffer" in bytes) ? bytes.buffer : bytes),
      this.#length,
    );
    this.#length = this.#length + bytes.byteLength;
    return this;
  }

  #growIfNeeded(byteLength: safeint): void {
    if (this.length >= this.#buffer.buffer.maxByteLength) {
      throw new Error("Max byte length exceeded.");
    }

    if ((this.#length + byteLength) > this.#buffer.byteLength) {
      const extent = Math.max(byteLength, _DEFAULT_CAPACITY); //XXX どのくらいが適正？
      this.#grow(this.#length + extent);
    }
  }

  #grow(newCapacity: safeint): void {
    // if (_RESIZABLE === true) {
    const buffer = this.#buffer.buffer;
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

  // subarray(
  //   begin = ExNumber.ZERO,
  //   end: safeint = this.#length,
  // ): Uint8Array<ArrayBuffer> {
  //   return this.#buffer.subarray(begin, end);
  // }

  toArrayBuffer(): ArrayBuffer {
    return this.#buffer.buffer.slice(ExNumber.ZERO, this.#length);
  }

  toUint8Array(): Uint8Array<ArrayBuffer> {
    return this.#buffer.slice(ExNumber.ZERO, this.#length);
  }
}
