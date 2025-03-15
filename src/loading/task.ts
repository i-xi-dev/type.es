import * as Type from "../type/mod.ts";
import { EventFactory, EventType } from "../events/mod.ts";
import { Options } from "./options.ts";
import { type safeint } from "../_typedef/mod.ts";
import { Status } from "./status.ts";

const _ProgressName = {
  ABORT: "abort",
  ERROR: "error",
  LOAD: "load",
  LOAD_END: "loadend",
  LOAD_START: "loadstart",
  PROGRESS: "progress",
  TIMEOUT: "timeout",
} as const;

type _ProgressName = typeof _ProgressName[keyof typeof _ProgressName];

/**
 * The loading task.
 */
export abstract class Task<T> extends EventTarget {
  /** The total length of loading. */
  readonly #total?: safeint;

  /** The `AbortSignal` to abort loading. */
  protected readonly _signal?: AbortSignal;

  /** The loading status. */
  protected _status: Status;

  /** The read length. */
  protected _loaded: safeint;

  /** The timestamp of when the `ProgressEvent` with name `"progress"` was last dispatched. */
  #lastProgressNotifiedAt: number;

  /**
   * @param options - The loading options.
   */
  protected constructor(options?: Options) {
    super();

    const total: safeint | undefined = options?.total;
    if (typeof total === "number") {
      Type.assertNonNegativeSafeInt(total, "options.total");
    } else if (total === undefined) {
      // ok
    } else {
      throw new TypeError("options.total");
    }

    this.#total = total;
    this._signal = options?.signal;
    this._status = Status.READY;
    this._loaded = 0;
    this.#lastProgressNotifiedAt = -1;

    // Object.seal(this);
  }

  /** The total length of loading. */
  get total(): safeint {
    return this.#total ?? 0;
  }

  /** Whether the loading has no computable length. */
  get indeterminate(): boolean {
    return (Type.isNonNegativeSafeInt(this.#total) !== true);
  }

  /** The loading status. */
  get status(): Status {
    return this._status;
  }

  /** The read length. */
  get loaded(): safeint {
    return this._loaded;
  }

  /**
   * Dispatch the `ProgressEvent` to notify progress.
   * @param name - The name of `ProgressEvent`.
   */
  protected _notifyProgress(name: _ProgressName): void {
    if (name === _ProgressName.PROGRESS) {
      const now = globalThis.performance.now();
      if ((this.#lastProgressNotifiedAt + 50) > now) {
        return;
      }
      this.#lastProgressNotifiedAt = now;
    }

    const event = EventFactory.create(EventType.PROGRESS, name, {
      total: this.#total,
      lengthComputable: (this.indeterminate !== true),
      loaded: this._loaded,
    });
    this.dispatchEvent(event);
  }

  /**
   * Run this loading task.
   * @returns The `Promise` that fulfills with a read value.
   */
  abstract run(): Promise<T>;
}
