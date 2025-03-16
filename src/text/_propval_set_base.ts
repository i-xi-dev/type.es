import { type safeint } from "../_typedef/mod.ts";

export abstract class _PropertyValueSetBase<T> implements ReadonlySetLike<T> {
  protected readonly _set: Set<T>;

  protected constructor(values: Iterable<T>) {
    this._set = new Set(values);
  }

  get size(): safeint {
    return this._set.size;
  }

  abstract get [Symbol.toStringTag](): string;

  abstract union(other: Iterable<T>): _PropertyValueSetBase<T>;

  has(value: unknown): boolean {
    return this._set.has(value as T);
  }

  keys(): SetIterator<T> {
    return this._set[Symbol.iterator]();
  }

  values(): SetIterator<T> {
    return this._set[Symbol.iterator]();
  }

  [Symbol.iterator](): SetIterator<T> {
    return this._set[Symbol.iterator]();
  }

  protected abstract _assertValue(value: T): void;
}
