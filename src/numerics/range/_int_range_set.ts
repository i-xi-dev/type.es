import * as Type from "../../type/mod.ts";
import { type int, type intrange, type safeint } from "../../_typedef/mod.ts";

// implements ReadonlySetLike<T>にしようとしたが・・・ keysの定義おかしくない？
export abstract class _IntRangeSet<T extends int, U extends intrange> {
  protected readonly _set: Set<U>;
  readonly #size: safeint;

  protected constructor(subranges: Iterable<U>) {
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

  has(value: T): boolean {
    this._assertValue(value);
    for (const subrange of this._set) {
      if ((value >= subrange[0]) && (value <= subrange[1])) {
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

  //XXX with(U),
  //XXX union(Iterable<U>), ...
  //XXX equals()
  //XXX overlaps()isSubrange,isSuperrange
  //XXX isDisjoint()

  toRanges(): Iterable<U> {
    return globalThis.structuredClone(this._set)[Symbol.iterator](); // 要素が配列の参照なのでstructuredClone
  }

  protected _add(subrange: U): void {
    this._assertSubrange(subrange);

    const subrangeArray: Array<U> = [];
    let newSubrange: U = subrange;
    let mergedRange: U | null = null;
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

  protected abstract _assertValue(value: T): void;

  protected abstract _assertSubrange(subrange: U): void;

  protected abstract _mergeSubrangesIfPossible(a: U, b: U): U | null;

  protected _sorter(a: U, b: U): -1 | 0 | 1 {
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
