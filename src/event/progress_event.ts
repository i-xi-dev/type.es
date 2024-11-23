import { clampToNonNegative as clampToNonNegativeSafeInteger } from "../_0/safe_integer_type.ts";
import { round as roundNumber } from "../_0/number_type.ts";
import { RoundingMode } from "../numerics.ts";

type int = number;

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
class _ProgressEventFN extends Event implements ProgressEvent<EventTarget> {
  #lengthComputable: boolean;
  #loaded: int;
  #total: int;

  /**
   * Creates a new `_ProgressEventFN`.
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

/**
 * If the `globalThis` has a [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent), then the `ProgressEvent` constructor.
 * Otherwise the polyfill of `ProgressEvent` constructor.
 *
 * - Browser
 * References the `globalThis.ProgressEvent`
 *
 * - Deno
 * References the `globalThis.ProgressEvent`
 *
 * - Node.js
 * References the polyfill
 */
const _ProgressEvent = (globalThis as unknown as {
  ProgressEvent: new (
    type: string,
    eventInitDict?: ProgressEventInit,
  ) => ProgressEvent;
}).ProgressEvent ??
  _ProgressEventFN;

export { _ProgressEvent };
