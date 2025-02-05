import { type safeint, type uint8 } from "../type.ts";
import { Uint8 } from "../numerics/uint.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

const _DEFAULT_SIZE = 1_048_576;

//XXX そのうちresizable ArrayBufferがほぼすべての環境で使用可になるので不要になる
/** @deprecated */
export class GrowableBuffer {
  #position: safeint;
  #buffer: Uint8Array;

  constructor(size: safeint = _DEFAULT_SIZE) {
    this.#position = NUMBER_ZERO;
    this.#buffer = new Uint8Array(size);
    Object.seal(this);
  }

  get capacity(): safeint {
    return this.#buffer.byteLength;
  }

  get position(): safeint {
    return this.#position;
  }

  #growIfNeeded(byteLength: safeint): void {
    if ((this.#position + byteLength) > this.#buffer.byteLength) {
      const extent = Math.max(byteLength, _DEFAULT_SIZE);
      const extendedBuffer = new Uint8Array(this.#position + (extent * 10)); // XXX どのくらいが適正？
      extendedBuffer.set(this.#buffer, NUMBER_ZERO);
      this.#buffer = extendedBuffer;
    }
  }

  put(uint8: uint8): void {
    this.#growIfNeeded(Uint8.byteLength);
    this.#buffer[this.#position] = uint8;
    this.#position = this.#position + Uint8.byteLength;
  }

  // XXX 最後に連結すべき？
  putRange(bytes: BufferSource): void {
    this.#growIfNeeded(bytes.byteLength);
    this.#buffer.set(
      new Uint8Array(("buffer" in bytes) ? bytes.buffer : bytes),
      this.#position,
    );
    this.#position = this.#position + bytes.byteLength;
  }

  subarray(begin = NUMBER_ZERO, end: safeint = this.#position): Uint8Array {
    return this.#buffer.subarray(begin, end);
  }

  slice(begin = NUMBER_ZERO, end: safeint = this.#position): Uint8Array {
    return this.#buffer.slice(begin, end);
  }
}
