import * as Type from "../../type/mod.ts";
import { type int, type safeint } from "../../_typedef/mod.ts";
import { SafeInt } from "../../numerics/mod.ts";
import { BytesUnit } from "../unit/mod.ts";

const _BYTES: Record<BytesUnit, safeint> = {
  [BytesUnit.B]: 1,
  [BytesUnit.KB]: 1_000, // 10 ** 3
  [BytesUnit.MB]: 1_000_000, // 10 ** 6
  [BytesUnit.GB]: 1_000_000_000, // 10 ** 9
  [BytesUnit.TB]: 1_000_000_000_000, // 10 ** 12
  [BytesUnit.PB]: 1_000_000_000_000_000, // 10 ** 15
  [BytesUnit.KIB]: 1_024, // 2 ** 10
  [BytesUnit.MIB]: 1_048_576, // 2 ** 20
  [BytesUnit.GIB]: 1_073_741_824, // 2 ** 30
  [BytesUnit.TIB]: 1_099_511_627_776, // 2 ** 40
  [BytesUnit.PIB]: 1_125_899_906_842_624, // 2 ** 50
} as const;

/**
 * @example
 * ```javascript
 * const size = new BytesSize(2_000);
 * const unit = BytesUnit.KB;
 * const kb = size.to(unit);
 * // kb
 * //   → 2
 *
 * const format = new Intl.NumberFormat("en", { style: "unit", unit });
 * const kbStr = format.format(kb);
 * // kbStr
 * //   → "2 kB"
 * ```
 *
 * @example
 * ```javascript
 * const size = new BytesSize(2_048);
 * const unit = BytesUnit.KIB;
 * const kib = size.to(unit);
 * // kib
 * //   → 2
 *
 * const format = new Intl.NumberFormat("en", { style: "unit", unit: "kilobyte" });// KiB not supported in Intl.NumberFormat
 * const kibStr = format.format(kib);
 * // kibStr
 * //   → "2 kB"
 * ```
 */
export class BytesSize {
  #byteCount: safeint;

  constructor(byteCount: int) {
    if (Type.isBigInt(byteCount)) {
      Type.assertNonNegativeBigIntInSafeIntRange(byteCount, "byteCount");
      this.#byteCount = Number(byteCount);
    } else if (Type.isNumber(byteCount)) {
      Type.assertNonNegativeSafeInt(byteCount, "byteCount");
      this.#byteCount = byteCount;
    } else {
      throw new TypeError("`byteCount` must be an integer.");
    }
  }

  // static of(value: number, unit: string = BytesUnit.B): BytesSize {
  //   return new BytesSize(Math.ceil(value * _BYTES[unit]));
  // }

  /**
   * @param unit The following units are supported. Units are case sensitive.
   * - `"byte"`
   * - `"kilobyte"`
   * - `"kibibyte"`
   * - `"megabyte"`
   * - `"mebibyte"`
   * - `"gigabyte"`
   * - `"gibibyte"`
   * - `"terabyte"`
   * - `"tebibyte"`
   * - `"petabyte"`
   * - `"pebibyte"`
   * @returns The byte count expressed in specified unit.
   */
  to(unit: BytesUnit): number {
    if (Object.values(BytesUnit).includes(unit) !== true) {
      throw new TypeError("`unit` is unsupported.");
    }

    const lowerUnit = unit.toLowerCase();
    const found = Object.values(BytesUnit).find((u) =>
      u.toLowerCase() === lowerUnit
    );
    if (found) {
      return this.#byteCount / _BYTES[found];
    }
    return undefined as never;
  }

  toString(): string {
    return SafeInt.toString(this.#byteCount);
  }

  toJSON(): number {
    return this.#byteCount;
  }

  valueOf(): number {
    return this.#byteCount;
  }
}
