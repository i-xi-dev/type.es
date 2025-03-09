import * as Type from "../../type/mod.ts";
import { type safeint } from "../../_typedef/mod.ts";
import { Unit } from "../unit/mod.ts";

const _BYTES: Record<Unit, safeint> = {
  [Unit.B]: 1,
  [Unit.KB]: 1_000, // 10 ** 3
  [Unit.MB]: 1_000_000, // 10 ** 6
  [Unit.GB]: 1_000_000_000, // 10 ** 9
  [Unit.TB]: 1_000_000_000_000, // 10 ** 12
  [Unit.PB]: 1_000_000_000_000_000, // 10 ** 15
  [Unit.KIB]: 1_024, // 2 ** 10
  [Unit.MIB]: 1_048_576, // 2 ** 20
  [Unit.GIB]: 1_073_741_824, // 2 ** 30
  [Unit.TIB]: 1_099_511_627_776, // 2 ** 40
  [Unit.PIB]: 1_125_899_906_842_624, // 2 ** 50
} as const;

/**
 * @example
 * ```javascript
 * const size = new Size(2_048);
 * const unit = Unit.KIB;
 * const kib = size.to(unit);
 * // kib
 * //   → 2
 *
 * const format = new Intl.NumberFormat("en", { style: "unit", unit });
 * const kibStr = format.format(kib);
 * // kibStr
 * //   → "2 kB"
 * ```
 */
export class Size {
  #byteCount: safeint;

  constructor(byteCount: safeint | bigint) {
    if (typeof byteCount === "bigint") {
      Type.assertNonNegativeBigIntInSafeIntRange(byteCount, "byteCount");
      this.#byteCount = Number(byteCount);
    } else if (typeof byteCount === "number") {
      Type.assertNonNegativeSafeInt(byteCount, "byteCount");
      this.#byteCount = byteCount;
    } else {
      throw new TypeError("`byteCount` must be an integer.");
    }
  }

  // static of(value: number, unit: string = Unit.B): Size {
  //   return new Size(Math.ceil(value * _BYTES[unit]));
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
  to(unit: Unit): number {
    if (Object.values(Unit).includes(unit) !== true) {
      throw new TypeError("`unit` is unsupported.");
    }

    const lowerUnit = unit.toLowerCase();
    const found = Object.values(Unit).find((u) =>
      u.toLowerCase() === lowerUnit
    );
    if (found) {
      return this.#byteCount / _BYTES[found];
    }
    return undefined as never;
  }

  valueOf(): number {
    return this.#byteCount;
  }
}
