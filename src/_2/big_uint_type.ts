import {
  assert as assertBigInt,
  fromNumber as bigIntFromNumber,
  fromString as bigIntFromString,
  isInRange as isBigIntInRange,
  toString as bigIntToString,
} from "../_0/bigint_type.ts";
import { assert as assertSafeInteger } from "../_0/safe_integer_type.ts";
import { BigIntRange } from "../_1/bigint_range.ts";
import { biguint64, int } from "../_.ts";
import {
  BITS_PER_BYTE,
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "../ranged_integer.ts";
import { OverflowMode } from "../numerics.ts";

class _UinNOperations<T extends bigint> implements UintNOperations<T> {
  readonly #bitLength: int;
  readonly #range: BigIntRange<T>;

  constructor(bitLength: int) {
    if (bitLength !== 64) {
      throw new Error("not implemented"); //XXX 対応するとしても1～128まで？
    }

    this.#bitLength = bitLength;
    this.#range = BigIntRange.of<T>(
      0n as T,
      (2n ** BigInt(bitLength) - 1n) as T,
    );
  }

  get bitLength(): int {
    return this.#bitLength;
  }

  is(value: bigint): value is T {
    return this.#range.includes(value);
  }

  protected _assertInRange(test: T, label: string): void {
    if (this.is(test) !== true) {
      throw new TypeError(
        `The type of \`${label}\` does not match the type of \`uint${this.#bitLength}\`.`,
      ); // 型が期待値でない場合も含むのでRangeErrorでなくTypeErrorとした
    }
  }

  bitwiseAnd(self: T, other: T): T {
    this._assertInRange(self, "self");
    this._assertInRange(other, "other");

    const aAndB = (self as bigint) & (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aAndB & this.#range.max) as T;
  }

  bitwiseOr(self: T, other: T): T {
    this._assertInRange(self, "self");
    this._assertInRange(other, "other");

    const aOrB = (self as bigint) | (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aOrB & this.#range.max) as T;
  }

  bitwiseXOr(self: T, other: T): T {
    this._assertInRange(self, "self");
    this._assertInRange(other, "other");

    const aXOrB = (self as bigint) ^ (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aXOrB & this.#range.max) as T;
  }

  rotateLeft(self: T, offset: int): T {
    this._assertInRange(self, "self");
    assertSafeInteger(offset, "offset");

    let normalizedOffset = offset % this.#bitLength;
    if (normalizedOffset < 0) {
      normalizedOffset = normalizedOffset + this.#bitLength;
    }
    if (normalizedOffset === 0) {
      return self;
    }

    const bigIntOffset = BigInt(normalizedOffset);
    return (((self << bigIntOffset) |
      (self >> (BigInt(this.#bitLength) - bigIntOffset))) &
      this.#range.max) as T;
  }

  fromNumber(value: number, options?: FromNumberOptions): T {
    const valueAsBigInt = bigIntFromNumber(value, options);

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
        return this.#range.clamp(valueAsBigInt);
    }
  }

  #truncateFromInteger(value: bigint): T {
    if (value === 0n) {
      return 0n as T;
    }

    const sizeAsBigInt = BigInt(this.#range.size);
    if (value > 0n) {
      return (value % sizeAsBigInt) as T;
    } else {
      return (sizeAsBigInt + (value % sizeAsBigInt)) as T;
    }
  }

  toNumber(self: T): int {
    this._assertInRange(self, "self");

    if (
      isBigIntInRange(
        self,
        BigInt(Number.MIN_SAFE_INTEGER),
        BigInt(Number.MAX_SAFE_INTEGER),
      ) !== true
    ) {
      throw new RangeError("`self` must be within the range of safe integer.");
    }
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
        return this.#range.clamp(value);
    }
  }

  toBigInt(self: T): bigint {
    this._assertInRange(self, "self");
    return self;
  }

  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = bigIntFromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }

  toString(self: T, options?: ToStringOptions): string {
    this._assertInRange(self, "self");
    return bigIntToString(self, options);
  }
}

const _BITS = [/* 56, */ 64, /* 72, 80, 88, 96, 104, 112, 120, */ 128] as const;
type _BITS = typeof _BITS[int];

class _Uint8xOperations<T extends bigint> extends _UinNOperations<T>
  implements Uint8xOperations<T> {
  readonly #buffer: ArrayBuffer;
  readonly #bufferView: DataView;
  readonly #bufferUint8View: Uint8Array;

  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== 0) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("Unsupprted bit length.");
    }

    this.#buffer = new ArrayBuffer(bitLength / BITS_PER_BYTE);
    this.#bufferView = new DataView(this.#buffer);
    this.#bufferUint8View = new Uint8Array(this.#buffer);
  }

  get byteLength(): int {
    return this.bitLength / BITS_PER_BYTE;
  }

  toBytes(self: T, littleEndian: boolean = false): Uint8Array {
    this._assertInRange(self, "self");

    this.#bufferView.setBigUint64(0, self, littleEndian);
    return Uint8Array.from(this.#bufferUint8View);
  }
}

export const BigUint64 = new _Uint8xOperations<biguint64>(64);
// export const BigUint128 = new _Uint8xOperations<bigint>(128);
