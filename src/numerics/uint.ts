import * as NumberUtils from "../utils/number.ts";
import {
  assertNumber,
  assertSafeInteger,
  isNonPositiveSafeInteger,
  isSafeInteger,
} from "../type/number.ts";
import {
  BITS_PER_BYTE,
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "./ranged_integer.ts";
import {
  fromBigInt as safeIntegerFromBigInt,
  round as roundNumber,
  toString as safeIntegerToString,
} from "./safe_integer.ts";
import { fromString as bigIntFromString } from "./bigint_type.ts";
import { int, uint16, uint24, uint32, uint6, uint7, uint8 } from "../_.ts";
import { OverflowMode } from "./overflow_mode.ts";
import { SafeIntegerRange } from "./safe_integer_range.ts";

class _UinNOperations<T extends int> implements UintNOperations<T> {
  readonly #bitLength: int;
  readonly #range: SafeIntegerRange<T>;

  readonly #buffer: ArrayBuffer;
  readonly #bufferUint32View: Uint32Array;
  readonly #bufferUint16View: Uint16Array;

  constructor(bitLength: int) {
    if (isNonPositiveSafeInteger(bitLength) || (bitLength > 32)) {
      throw new Error("not implemented"); //XXX 対応するとしても48まで
    }

    this.#bitLength = bitLength;
    this.#range = SafeIntegerRange.of<T>(0 as T, (2 ** bitLength - 1) as T);

    this.#buffer = new ArrayBuffer(96);
    this.#bufferUint32View = new Uint32Array(this.#buffer);
    this.#bufferUint16View = new Uint16Array(this.#buffer);
  }

  get bitLength(): int {
    return this.#bitLength;
  }

  is(value: unknown): value is T {
    return this.#range.includes(value as int);
  }

  assert(test: unknown, label: string): void {
    if (this.is(test) !== true) {
      throw new TypeError(
        `The type of \`${label}\` does not match the type of \`uint${this.#bitLength}\`.`,
      ); // 型が期待値でない場合も含むのでRangeErrorでなくTypeErrorとした
    }
  }

  bitwiseAnd(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[0] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = 0;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 & b1;
      this.#bufferUint16View[5] = a2 & b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self & other) & this.#range.max) as T;
    }
  }

  bitwiseOr(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[0] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = 0;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 | b1;
      this.#bufferUint16View[5] = a2 | b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self | other) & this.#range.max) as T;
    }
  }

  bitwiseXOr(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[0] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = 0;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 ^ b1;
      this.#bufferUint16View[5] = a2 ^ b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self ^ other) & this.#range.max) as T;
    }
  }

  rotateLeft(self: T, offset: int): T {
    this.assert(self, "self");
    assertSafeInteger(offset, "offset");

    let normalizedOffset = offset % this.#bitLength;
    if (normalizedOffset < 0) {
      normalizedOffset = normalizedOffset + this.#bitLength;
    }
    if (normalizedOffset === 0) {
      return self;
    }

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      const bs = BigInt(self);
      return Number(
        ((bs << BigInt(normalizedOffset)) |
          (bs >> BigInt(this.#bitLength - normalizedOffset))) &
          BigInt(this.#range.max),
      ) as T;
    } else {
      return (((self << normalizedOffset) |
        (self >> (this.#bitLength - normalizedOffset))) & this.#range.max) as T;
    }
  }

  fromNumber(value: number, options?: FromNumberOptions): T {
    assertNumber(value, "value");

    if (Number.isNaN(value)) {
      throw new TypeError("`value` must not be `NaN`.");
    }

    let adjustedValue: number;
    if (value > Number.MAX_SAFE_INTEGER) {
      adjustedValue = Number.MAX_SAFE_INTEGER;
    } else if (value < Number.MIN_SAFE_INTEGER) {
      adjustedValue = Number.MIN_SAFE_INTEGER;
    } else {
      //XXX もっと狭めるか？
      adjustedValue = value;
    }

    let valueAsInt: int;
    if (isSafeInteger(adjustedValue)) {
      valueAsInt = adjustedValue;
    } else {
      valueAsInt = roundNumber(adjustedValue, options?.roundingMode);
    }

    if (this.is(valueAsInt)) {
      return NumberUtils.normalize(valueAsInt);
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsInt);

      default: // case OverflowMode.SATURATE:
        return this.#range.clamp(valueAsInt);
    }
  }

  // #saturateFromInteger(value: int): T {
  //   // assertSafeInteger(value, "value");

  //   if (value > this.#range.max) {
  //     return this.#range.max;
  //   } else if (value < this.#range.min) {
  //     return this.#range.min;
  //   }

  //   return NumberUtils.normalize(value as T);
  // }

  #truncateFromInteger(value: int): T {
    // assertSafeInteger(value, "value");

    if (value === 0) {
      return 0 as T;
    } else if (value > 0) {
      return (value % this.#range.size) as T;
    } else {
      return (this.#range.size + (value % this.#range.size)) as T;
    }
  }

  toNumber(self: T): int {
    this.assert(self, "self");

    return NumberUtils.normalize(self);
  }

  fromBigInt(value: bigint, options?: FromBigIntOptions): T {
    const valueAsNumber = safeIntegerFromBigInt(value);

    if (this.is(valueAsNumber)) {
      return valueAsNumber;
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsNumber);

      default: // case OverflowMode.SATURATE:
        return this.#range.clamp(valueAsNumber);
    }
  }

  toBigInt(self: T): bigint {
    this.assert(self, "self");
    return BigInt(self);
  }

  //XXX 小数も受け付ける？
  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = bigIntFromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }

  toString(self: T, options?: ToStringOptions): string {
    this.assert(self, "self");
    return safeIntegerToString(self, options);
  }
}

const _BITS = [8, 16, 24, 32 /* , 40, 48 */] as const;
type _BITS = typeof _BITS[int];

class _Uint8xOperations<T extends int> extends _UinNOperations<T>
  implements Uint8xOperations<T> {
  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== 0) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("Unsupprted bit length.");
    }
  }

  get byteLength(): int {
    return this.bitLength / BITS_PER_BYTE;
  }

  toBytes(self: T, littleEndian: boolean = false): Uint8Array {
    this.assert(self, "self");

    if (this.bitLength === 8) {
      return Uint8Array.of(self);
    }

    const bytes: Array<uint8> = [];
    if (this.bitLength === 32) {
      bytes.push(Math.trunc(self / 0x1000000) as uint8);
    }
    if (this.bitLength >= 24) {
      const o3 = (self >= 0x1000000) ? (self % 0x1000000) : self;
      bytes.push(Math.trunc(o3 / 0x10000) as uint8);
    }
    if (this.bitLength >= 16) {
      const o2 = (self >= 0x10000) ? (self % 0x10000) : self;
      bytes.push(Math.trunc(o2 / 0x100) as uint8);
      bytes.push((self % 0x100) as uint8);
    }

    return Uint8Array.from(
      (littleEndian === true) ? bytes.reverse() : bytes,
    );
  }
}

export const Uint6 = new _UinNOperations<uint6>(6);
export const Uint7 = new _UinNOperations<uint7>(7);
export const Uint8 = new _Uint8xOperations<uint8>(8);
export const Uint16 = new _Uint8xOperations<uint16>(16);
export const Uint24 = new _Uint8xOperations<uint24>(24);
export const Uint32 = new _Uint8xOperations<uint32>(32);
