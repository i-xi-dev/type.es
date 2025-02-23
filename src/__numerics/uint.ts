import * as ExBigInt from "../numerics/bigint/mod.ts";
import * as SafeInt from "../numerics/safeint/mod.ts";
import * as SafeIntRange from "../numerics/range/safeint_range/mod.ts";
import { isNonPositiveSafeInt } from "../type/number.ts";
import {
  FromBigIntOptions,
  FromStringOptions,
  UintNOperations,
} from "./ranged_integer.ts";
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

  constructor(bitLength: safeint) {
    if (isNonPositiveSafeInt(bitLength) || (bitLength > 32)) {
      throw new Error("not implemented"); //XXX 対応するとしても48まで
    }

    this.#bitLength = bitLength;
    this.#min = ExNumber.ZERO as T;
    this.#max = (2 ** bitLength - 1) as T;
    this.#range = [this.#min, this.#max];
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

      default: // case OverflowMode.SATURATE:
        return SafeInt.clampToRange(valueAsNumber, this.#range);
    }
  }

  //XXX 小数も受け付ける？
  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = ExBigInt.fromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }
}

export const Uint6 = new _UinNOperations<uint6>(6);
export const Uint7 = new _UinNOperations<uint7>(7);
export const Uint8 = new _UinNOperations<uint8>(8);
export const Uint16 = new _UinNOperations<uint16>(16);
export const Uint24 = new _UinNOperations<uint24>(24);
export const Uint32 = new _UinNOperations<uint32>(32);
