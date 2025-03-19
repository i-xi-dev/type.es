import * as Type from "../../type/mod.ts";
import { Number as ExNumber, Uint8 } from "../../numerics/mod.ts";
import { InvalidStateError, QuotaExceededError } from "../../basics/mod.ts";
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
    : Math.min(capacityMax, _DEFAULT_CAPACITY);
  Type.assertSafeIntInRange(capacity, "init.capacity", [0, capacityMax]);

  return { capacity, capacityMax };
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
      return this.#appendBytes(byteOrBytes, "byteOrBytes");
    } else if (Type.isUint8(byteOrBytes)) {
      return this.#appendByte(byteOrBytes, "byteOrBytes");
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

  #appendByte(byte: uint8, assertionLabel: string): this {
    Type.assertUint8(byte, assertionLabel);

    this.#growIfNeeded(Uint8.BYTE_LENGTH);
    this.#buffer![this.#length] = byte;
    this.#length = this.#length + Uint8.BYTE_LENGTH;
    return this;
  }

  #appendBytes(bytes: BufferSource, assertionLabel: string): this {
    Type.assertBufferSource(bytes, assertionLabel);

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
      loaded.#appendByte(uint8Expected as uint8, "value[*]");
      // uint8ではなかった場合、#appendByteで例外になる
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
      loaded.#appendByte(uint8Expected as uint8, "value[*]");
      // uint8ではなかった場合、#appendByteで例外になる
    }
    this.append(loaded.takeAsArrayBuffer());
  }
}
