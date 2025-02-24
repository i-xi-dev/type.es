import * as SafeIntRange from "../safeint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { type safeint, type safeintrange } from "../../../_typedef/mod.ts";

function _sorterMinAsc(a: safeintrange, b: safeintrange): -1 | 0 | 1 {
  const [aMin] = a;
  const [bMin] = b;
  if (aMin < bMin) {
    return -1;
  } else if (aMin > bMin) {
    return 1;
  }
  return 0 as never;
}

export class SafeIntRangeSet<T extends safeint>
  implements ReadonlySetLike<safeintrange<T>> {
  readonly #set: Set<safeintrange<T>>;

  constructor(iterable: Iterable<safeintrange<T>>) {
    this.#set = new Set();

    for (const range of iterable) {
      Type.assertSafeIntRange(range, "iterable[*]");
      this.#add(range);
    }
  }

  get size(): safeint {
    return this.#set.size;
  }

  includesValue(test: T): boolean {
    // Type.assertSafeInt(test); SafeIntRange.includesでisSafeIntしている
    return [...this.#set].some((range) => SafeIntRange.includes(range, test));
  }

  //XXX unionWith, exceptWith, intersectWith, ...

  //XXX equals(range or rangeset)
  //XXX overlaps(range or rangeset)
  //XXX isDisjoint(range or rangeset)

  has(value: safeintrange<T>): boolean {
    return this.#set.has(value); // Setの仕様に合わせる（参照先が異なる場合false）
  }

  keys(): SetIterator<safeintrange<T>> {
    return this.toSet()[Symbol.iterator]();
  }

  values(): SetIterator<safeintrange<T>> {
    return this.toSet()[Symbol.iterator]();
  }

  [Symbol.iterator](): SetIterator<safeintrange<T>> {
    return this.toSet()[Symbol.iterator]();
  }

  toArray(): Array<safeintrange<T>> {
    return [...this.toSet()];
  }

  toSet(): Set<safeintrange<T>> {
    return globalThis.structuredClone(this.#set);
  }

  #add(rangeToAdd: safeintrange<T>): void {
    const newArray = [];
    let unionedRangeToAdd: safeintrange<T> = rangeToAdd;
    let u: safeintrange<T> | null = null;
    for (const range of this.#set) {
      u = null;
      if (SafeIntRange.overlaps(range, unionedRangeToAdd)) {
        u = SafeIntRange.union(range, unionedRangeToAdd);
        if (u) {
          unionedRangeToAdd = u;
        } else {
          newArray.push(range);
        }
      }
    }
    newArray.push(unionedRangeToAdd);

    newArray.sort(_sorterMinAsc);
    this.#set.clear();
    newArray.forEach((r) => this.#set.add(r));
  }
}
