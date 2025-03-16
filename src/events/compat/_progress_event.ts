import {
  Number as ExNumber,
  RoundingMode,
  SafeInt,
} from "../../numerics/mod.ts";
import { type safeint } from "../../_typedef/mod.ts";

function _initAmount(value?: number): safeint {
  let adjustedValue = Number.isFinite(value) ? value as number : ExNumber.ZERO;
  adjustedValue = SafeInt.round(
    adjustedValue,
    RoundingMode.TRUNCATE,
  );
  return SafeInt.clampToNonNegative(adjustedValue);
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

  get [Symbol.toStringTag](): string {
    return "ProgressEvent";
  }
}
