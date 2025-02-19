import * as BigIntRange from "../bigint_range/mod.ts";
import * as ExBigInt from "../numerics/bigint/mod.ts";
import { Number as ExNumber } from "../numerics/mod.ts";
import { assertBigInt, assertBigIntInSafeIntRange } from "../type/bigint.ts";
import { assertSafeInt } from "../type/number.ts";
import { type bigintrange, type biguint64, type safeint } from "../type.ts";
import {
  BITS_PER_BYTE,
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "./ranged_integer.ts";
import { OverflowMode } from "./overflow_mode.ts";

class _UinNOperations<T extends bigint> implements UintNOperations<T> {
  readonly #bitLength: safeint;
  readonly #min: T;
  readonly #max: T;
  readonly #range: bigintrange<T>;
  readonly #size: bigint;

  constructor(bitLength: safeint) {
    if (bitLength !== 64) {
      throw new Error("not implemented"); //XXX 対応するとしても1～128まで？
    }

    this.#bitLength = bitLength;
    this.#min = ExBigInt.ZERO as T;
    this.#max = (2n ** BigInt(bitLength) - 1n) as T;
    this.#range = [this.#min, this.#max];
    this.#size = BigIntRange.sizeOf(this.#range);
  }

  get bitLength(): safeint {
    return this.#bitLength;
  }

  is(value: unknown): value is T {
    return BigIntRange.includes(this.#range, value as T);
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

    const aAndB = (self as bigint) & (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aAndB & this.#max) as T;
  }

  bitwiseOr(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    const aOrB = (self as bigint) | (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aOrB & this.#max) as T;
  }

  bitwiseXOr(self: T, other: T): T {
    this.assert(self, "self");
    this.assert(other, "other");

    const aXOrB = (self as bigint) ^ (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aXOrB & this.#max) as T;
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

    const bigIntOffset = BigInt(normalizedOffset);
    return (((self << bigIntOffset) |
      (self >> (BigInt(this.#bitLength) - bigIntOffset))) &
      this.#max) as T;
  }

  fromNumber(value: number, options?: FromNumberOptions): T {
    const valueAsBigInt = ExBigInt.fromNumber(value, options);

    if (this.is(valueAsBigInt)) {
      return valueAsBigInt;
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsBigInt);

      default: // case OverflowMode.SATURATE:
        return ExBigInt.clampToRange(valueAsBigInt, this.#range);
    }
  }

  #truncateFromInteger(value: bigint): T {
    if (value === ExBigInt.ZERO) {
      return ExBigInt.ZERO as T;
    }

    if (value > ExBigInt.ZERO) {
      return (value % this.#size) as T;
    } else {
      return (this.#size + (value % this.#size)) as T;
    }
  }

  toNumber(self: T): safeint {
    this.assert(self, "self");
    assertBigIntInSafeIntRange(self, "self");

    return Number(self);
  }

  fromBigInt(value: bigint, options?: FromBigIntOptions): T {
    assertBigInt(value, "value");

    if (this.is(value)) {
      return value;
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(value);

      default: // case OverflowMode.SATURATE:
        return ExBigInt.clampToRange(value, this.#range);
    }
  }

  toBigInt(self: T): bigint {
    this.assert(self, "self");
    return self;
  }

  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = ExBigInt.fromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }

  toString(self: T, options?: ToStringOptions): string {
    this.assert(self, "self");
    return ExBigInt.toString(self, options);
  }
}

const _BITS = [/* 56, */ 64, /* 72, 80, 88, 96, 104, 112, 120, */ 128] as const;
type _BITS = typeof _BITS[safeint];

class _Uint8xOperations<T extends bigint> extends _UinNOperations<T>
  implements Uint8xOperations<T> {
  readonly #buffer: ArrayBuffer;
  readonly #bufferView: DataView;
  readonly #bufferUint8View: Uint8Array;

  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== ExNumber.ZERO) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("Unsupprted bit length.");
    }

    this.#buffer = new ArrayBuffer(bitLength / BITS_PER_BYTE);
    this.#bufferView = new DataView(this.#buffer);
    this.#bufferUint8View = new Uint8Array(this.#buffer);
  }

  get byteLength(): safeint {
    return this.bitLength / BITS_PER_BYTE;
  }

  toBytes(self: T, littleEndian: boolean = false): Uint8Array {
    this.assert(self, "self");

    this.#bufferView.setBigUint64(ExNumber.ZERO, self, littleEndian);
    return Uint8Array.from(this.#bufferUint8View);
  }
}

export const BigUint64 = new _Uint8xOperations<biguint64>(64);
// export const BigUint128 = new _Uint8xOperations<bigint>(128);
