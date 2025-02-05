import * as SafeInteger from "../../sp/safe_integer.ts";
import {
  clampToNonNegative as clampToNonNegativeSafeInteger,
} from "../../sp/safe_integer.ts";
import { RoundingMode } from "../../sp/rounding_mode.ts";
import { type safeint } from "../../type.ts";
import { ZERO as NUMBER_ZERO } from "../../const/number.ts";

function _initAmount(value?: number): safeint {
  let adjustedValue = Number.isFinite(value) ? value as number : NUMBER_ZERO;
  adjustedValue = SafeInteger.round(
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
  #loaded: safeint;
  #total: safeint;

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
  get loaded(): safeint {
    return this.#loaded;
  }

  /**
   * @see [ProgressEvent.total](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/total)
   */
  get total(): safeint {
    return this.#total;
  }
}
