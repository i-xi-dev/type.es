import * as BigIntRange from "../numerics/range/bigint_range/mod.ts";
import * as ExBigInt from "../numerics/bigint/mod.ts";
import { assertBigInt } from "../type/bigint.ts";
import {
  type bigintrange,
  type biguint64,
  type safeint,
} from "../_typedef/mod.ts";
import {
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
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

  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = ExBigInt.fromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }
}

const _BITS = [/* 56, */ 64, /* 72, 80, 88, 96, 104, 112, 120, */ 128] as const;
type _BITS = typeof _BITS[safeint];

class _Uint8xOperations<T extends bigint> extends _UinNOperations<T> {
  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== ExNumber.ZERO) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("Unsupprted bit length.");
    }
  }
}

export const BigUint64 = new _Uint8xOperations<biguint64>(64);
// export const BigUint128 = new _Uint8xOperations<bigint>(128);
