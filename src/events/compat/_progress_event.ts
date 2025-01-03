import { clampToNonNegative as clampToNonNegativeSafeInteger } from "../../numerics/safe_integer.ts";
import { int } from "../../_.ts";
import { round as roundNumber } from "../../numerics/number_type.ts";
import { RoundingMode } from "../../numerics/rounding_mode.ts";

function _initAmount(value?: number): int {
  let adjustedValue = Number.isFinite(value) ? value as number : 0;
  adjustedValue = roundNumber(
    adjustedValue,
    RoundingMode.TRUNCATE,
  );
  return clampToNonNegativeSafeInteger(adjustedValue);
}

/**
 * The `ProgressEvent` for Node.js
 *
 * Implements the [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent) interface.
 */
export class _ProgressEvent extends Event
  implements ProgressEvent<EventTarget> {
  #lengthComputable: boolean;
  #loaded: int;
  #total: int;

  /**
   * Creates a new `_ProgressEvent`.
   *
   * @param type - The name of the event.
   * @param init - The `ProgressEventInit` object.
   */
  constructor(type: string, init?: ProgressEventInit) {
    super(type, init);

    this.#lengthComputable = (typeof init?.lengthComputable === "boolean")
      ? init.lengthComputable
      : false;
    this.#loaded = _initAmount(init?.loaded);
    this.#total = _initAmount(init?.total);
  }

  /**
   * @see [ProgressEvent.lengthComputable](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/lengthComputable)
   */
  get lengthComputable(): boolean {
    return this.#lengthComputable;
  }

  /**
   * @see [ProgressEvent.loaded](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/loaded)
   */
  get loaded(): int {
    return this.#loaded;
  }

  /**
   * @see [ProgressEvent.total](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/total)
   */
  get total(): int {
    return this.#total;
  }
}
