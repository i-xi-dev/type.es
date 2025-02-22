import * as ExBigInt from "../numerics/bigint/mod.ts";
import * as SafeInt from "../numerics/safeint/mod.ts";
import * as SafeIntRange from "../numerics/range/safeint_range/mod.ts";
import {
  assertNumber,
  assertSafeInt,
  isNonPositiveSafeInt,
  isSafeInt,
} from "../type/number.ts";
import {
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "./ranged_integer.ts";
import { BITS_PER_BYTE } from "../_const/byte.ts";
import { Number as ExNumber } from "../numerics/mod.ts";
import { OverflowMode } from "./overflow_mode.ts";
import {
  type safeint,
  type safeintrange,
  type uint16,
  type uint24,
  type uint32,
  type uint6,
  type uint7,
  type uint8,
} from "../_typedef/mod.ts";

class _UinNOperations<T extends safeint> implements UintNOperations<T> {
  readonly #bitLength: safeint;
  readonly #min: T;
  readonly #max: T;
  readonly #range: safeintrange<T>;
  readonly #size: safeint;

  readonly #buffer: ArrayBuffer;
  readonly #bufferUint32View: Uint32Array;
  readonly #bufferUint16View: Uint16Array;

  constructor(bitLength: safeint) {
    if (isNonPositiveSafeInt(bitLength) || (bitLength > 32)) {
      throw new Error("not implemented"); //XXX 対応するとしても48まで
    }

    this.#bitLength = bitLength;
    this.#min = ExNumber.ZERO as T;
    this.#max = (2 ** bitLength - 1) as T;
    this.#range = [this.#min, this.#max];
    this.#size = SafeIntRange.sizeOf(this.#range);

    this.#buffer = new ArrayBuffer(96);
    this.#bufferUint32View = new Uint32Array(this.#buffer);
    this.#bufferUint16View = new Uint16Array(this.#buffer);
  }

  get bitLength(): safeint {
    return this.#bitLength;
  }

  //
  is(value: unknown): value is T {
    return SafeIntRange.includes(this.#range, value as T);
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
      this.#bufferUint32View[ExNumber.ZERO] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = ExNumber.ZERO;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 & b1;
      this.#bufferUint16View[5] = a2 & b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self & other) & this.#max) as T;
    }
  }

  bitwiseOr(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[ExNumber.ZERO] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = ExNumber.ZERO;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 | b1;
      this.#bufferUint16View[5] = a2 | b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self | other) & this.#max) as T;
    }
  }

  bitwiseXOr(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[ExNumber.ZERO] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = ExNumber.ZERO;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 ^ b1;
      this.#bufferUint16View[5] = a2 ^ b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self ^ other) & this.#max) as T;
    }
  }

  rotateLeft(self: T, offset: safeint): T {
    this.assert(self, "self");
    assertSafeInt(offset, "offset");

    let normalizedOffset = offset % this.#bitLength;
    if (normalizedOffset < ExNumber.ZERO) {
      normalizedOffset = normalizedOffset + this.#bitLength;
    }
    if (normalizedOffset === ExNumber.ZERO) {
      return self;
    }

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      const bs = BigInt(self);
      return Number(
        ((bs << BigInt(normalizedOffset)) |
          (bs >> BigInt(this.#bitLength - normalizedOffset))) &
          BigInt(this.#max),
      ) as T;
    } else {
      return (((self << normalizedOffset) |
        (self >> (this.#bitLength - normalizedOffset))) & this.#max) as T;
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

    let valueAsInt: safeint;
    if (isSafeInt(adjustedValue)) {
      valueAsInt = adjustedValue;
    } else {
      valueAsInt = SafeInt.round(adjustedValue, options?.roundingMode);
    }

    if (this.is(valueAsInt)) {
      return ExNumber.normalize(valueAsInt);
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
        return SafeInt.clampToRange(valueAsInt, this.#range);
    }
  }

  // #saturateFromInteger(value: safeint): T {
  //   // assertSafeInt(value, "value");

  //   if (value > this.#max) {
  //     return this.#max;
  //   } else if (value < this.#min) {
  //     return this.#min;
  //   }

  //   return ExNumber.normalize(value as T);
  // }

  #truncateFromInteger(value: safeint): T {
    // assertSafeInt(value, "value");

    if (value === ExNumber.ZERO) {
      return ExNumber.ZERO as T;
    } else if (value > ExNumber.ZERO) {
      return (value % this.#size) as T;
    } else {
      return (this.#size + (value % this.#size)) as T;
    }
  }

  fromBigInt(value: bigint, options?: FromBigIntOptions): T {
    const valueAsNumber = SafeInt.fromBigInt(value);

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
        return SafeInt.clampToRange(valueAsNumber, this.#range);
    }
  }

  toBigInt(self: T): bigint {
    this.assert(self, "self");
    return BigInt(self);
  }

  //XXX 小数も受け付ける？
  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = ExBigInt.fromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }

  toString(self: T, options?: ToStringOptions): string {
    this.assert(self, "self");
    return SafeInt.toString(self, options);
  }
}

const _BITS = [8, 16, 24, 32 /* , 40, 48 */] as const;
type _BITS = typeof _BITS[safeint];

class _Uint8xOperations<T extends safeint> extends _UinNOperations<T>
  implements Uint8xOperations<T> {
  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== ExNumber.ZERO) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("Unsupprted bit length.");
    }
  }

  get byteLength(): safeint {
    return this.bitLength / BITS_PER_BYTE;
  }

  toBytes(self: T, littleEndian: boolean = false): Uint8Array {
    this.assert(self, "self");

    // bitLengthは 8 | 16 | 24 | 32 | 40 | 48 のいずれか

    if (this.bitLength === 8) {
      return Uint8Array.of(self);
    }

    const bytes: Array<uint8> = [];
    bytes.push((self % 0x100) as uint8);
    if (this.bitLength >= 16) {
      const o2 = (self >= 0x10000) ? (self % 0x10000) : self;
      bytes.push(Math.trunc(o2 / 0x100) as uint8);

      if (this.bitLength >= 24) {
        const o3 = (self >= 0x1000000) ? (self % 0x1000000) : self;
        bytes.push(Math.trunc(o3 / 0x10000) as uint8);

        if (this.bitLength >= 32) {
          const o4 = (self >= 0x100000000) ? (self % 0x100000000) : self;
          bytes.push(Math.trunc(o4 / 0x1000000) as uint8);

          if (this.bitLength >= 40) {
            const o5 = (self >= 0x10000000000) ? (self % 0x10000000000) : self;
            bytes.push(Math.trunc(o5 / 0x100000000) as uint8);

            if (this.bitLength >= 48) {
              const o6 = (self >= 0x1000000000000)
                ? (self % 0x1000000000000)
                : self;
              bytes.push(Math.trunc(o6 / 0x10000000000) as uint8);
            }
          }
        }
      }
    }

    return Uint8Array.from(
      (littleEndian === true) ? bytes : bytes.reverse(),
    );
  }
}

export const Uint6 = new _UinNOperations<uint6>(6);
export const Uint7 = new _UinNOperations<uint7>(7);
export const Uint8 = new _Uint8xOperations<uint8>(8);
export const Uint16 = new _Uint8xOperations<uint16>(16);
export const Uint24 = new _Uint8xOperations<uint24>(24);
export const Uint32 = new _Uint8xOperations<uint32>(32);
