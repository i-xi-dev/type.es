import * as BigIntRange from "../bigint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { type bigintrange, type safeint } from "../../../_typedef/mod.ts";

function _sorterMinAsc(a: bigintrange, b: bigintrange): -1 | 0 | 1 {
  const [aMin] = a;
  const [bMin] = b;
  if (aMin < bMin) {
    return -1;
  } else if (aMin > bMin) {
    return 1;
  }
  return 0 as never;
}

export class BigIntRangeSet<T extends bigint>
  implements ReadonlySetLike<bigintrange<T>> {
  readonly #set: Set<bigintrange<T>>;

  constructor(iterable: Iterable<bigintrange<T>>) {
    this.#set = new Set();

    for (const range of iterable) {
      Type.assertBigIntRange(range, "iterable[*]");
      this.#add(range);
    }
  }

  get size(): safeint {
    return this.#set.size;
  }

  includesValue(test: T): boolean {
    // Type.assertBigInt(test); BigIntRange.includesでisBigIntしている
    return [...this.#set].some((range) => BigIntRange.includes(range, test));
  }

  //XXX unionWith, exceptWith, intersectWith, ...

  //XXX equals(range or rangeset)
  //XXX overlaps(range or rangeset)
  //XXX isDisjoint(range or rangeset)

  has(value: bigintrange<T>): boolean {
    return this.#set.has(value); // Setの仕様に合わせる（参照先が異なる場合false）
  }

  keys(): SetIterator<bigintrange<T>> {
    return this.toSet()[Symbol.iterator]();
  }

  values(): SetIterator<bigintrange<T>> {
    return this.toSet()[Symbol.iterator]();
  }

  [Symbol.iterator](): SetIterator<bigintrange<T>> {
    return this.toSet()[Symbol.iterator]();
  }

  toArray(): Array<bigintrange<T>> {
    return [...this.toSet()];
  }

  toSet(): Set<bigintrange<T>> {
    return globalThis.structuredClone(this.#set);
  }

  #add(rangeToAdd: bigintrange<T>): void {
    const newArray = [];
    let unionedRangeToAdd: bigintrange<T> = rangeToAdd;
    let u: bigintrange<T> | null = null;
    for (const range of this.#set) {
      u = null;
      if (BigIntRange.overlaps(range, unionedRangeToAdd)) {
        u = BigIntRange.union(range, unionedRangeToAdd);
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
