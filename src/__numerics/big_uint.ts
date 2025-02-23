import * as BigIntRange from "../numerics/range/bigint_range/mod.ts";
import * as ExBigInt from "../numerics/bigint/mod.ts";
import {
  type bigintrange,
  type biguint64,
  type safeint,
} from "../_typedef/mod.ts";
import { FromNumberOptions, UintNOperations } from "./ranged_integer.ts";
import { OverflowMode } from "./overflow_mode.ts";

class _UinNOperations<T extends bigint> implements UintNOperations<T> {
  readonly #bitLength: safeint;
  readonly #min: T;
  readonly #max: T;
  readonly #range: bigintrange<T>;

  constructor(bitLength: safeint) {
    if (bitLength !== 64) {
      throw new Error("not implemented"); //XXX 対応するとしても1～128まで？
    }

    this.#bitLength = bitLength;
    this.#min = ExBigInt.ZERO as T;
    this.#max = (2n ** BigInt(bitLength) - 1n) as T;
    this.#range = [this.#min, this.#max];
  }

  is(value: unknown): value is T {
    return BigIntRange.includes(this.#range, value as T);
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

      default: // case OverflowMode.SATURATE:
        return ExBigInt.clampToRange(valueAsBigInt, this.#range);
    }
  }
}

export const BigUint64 = new _UinNOperations<biguint64>(64);
// export const BigUint128 = new _Uint8xOperations<bigint>(128);
