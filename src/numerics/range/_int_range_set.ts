import * as Type from "../../type/mod.ts";
import { type int, type intrange, type safeint } from "../../_typedef/mod.ts";

export abstract class _IntRangeSet<T extends int> { //XXX implements Set<T>
  protected readonly _set: Set<intrange<T>>;
  readonly #size: safeint;

  protected constructor(subranges: Iterable<intrange<T>>) {
    Type.assertIterable(subranges, "subranges");
    this._set = new Set();

    for (const subrange of subranges) {
      this._add(subrange);
    }
    this.#size = this._getSize();
  }

  get size(): safeint {
    return this.#size;
  }

  has(value: unknown): boolean {
    this._assertValue(value as int);
    for (const subrange of this._set) {
      if (((value as int) >= subrange[0]) && ((value as int) <= subrange[1])) {
        return true;
      }
    }
    return false;
  }

  keys(): Iterable<T> {
    return this[Symbol.iterator]();
  }

  [Symbol.iterator](): Iterable<T> {
    return (function* (subranges) {
      for (const subrange of subranges) {
        for (let i = subrange[0]; i <= subrange[1]; i++) {
          yield i as T;
        }
      }
    })(this.toRanges());
  }

  //XXX with(intrange<T>),
  //XXX union(Iterable<intrange<T>>), ...
  //XXX equals()
  //XXX overlaps()isSubrange,isSuperrange
  //XXX isDisjoint()

  toRanges(): Iterable<intrange<T>> {
    return globalThis.structuredClone(this._set)[Symbol.iterator](); // 要素が配列の参照なのでstructuredClone
  }

  protected _add(subrange: intrange<T>): void {
    this._assertSubrange(subrange);

    const subrangeArray: Array<intrange<T>> = [];
    let newSubrange: intrange<T> = subrange;
    let mergedRange: intrange<T> | null = null;
    for (const thisSubrange of this._set) {
      mergedRange = this._mergeSubrangesIfPossible(thisSubrange, newSubrange);
      if (mergedRange) {
        newSubrange = mergedRange;
      } else {
        subrangeArray.push(thisSubrange);
      }
    }
    subrangeArray.push(newSubrange);
    subrangeArray.sort(this._sorter);

    this._set.clear();
    subrangeArray.forEach((r) => this._set.add(r));
  }

  protected abstract _getSize(): safeint;

  protected abstract _assertValue(value: int): void;

  protected abstract _assertSubrange(subrange: intrange): void;

  protected abstract _mergeSubrangesIfPossible(
    a: intrange<T>,
    b: intrange<T>,
  ): intrange<T> | null;

  protected _sorter(a: intrange<T>, b: intrange<T>): -1 | 0 | 1 {
    const [aMin] = a;
    const [bMin] = b;
    if (aMin < bMin) {
      return -1;
    } else if (aMin > bMin) {
      return 1;
    }
    return 0;
  }
}
