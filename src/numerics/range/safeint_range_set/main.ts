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
  return 0;
}

export class SafeIntRangeSet {
  // implements ReadonlySetLike<safeintrange> hasとかに意味があると思えない（Setのhasの仕様はオブジェクトの場合参照先が等しいかだし、has(コンストラクターに渡したrangeの参照)がtrueにならない場合がある（コンストラクターで結合や破棄する場合があるので））

  readonly #set: Set<safeintrange>;

  constructor(iterable: Iterable<safeintrange>) {
    Type.assertIterable(iterable, "iterable");
    this.#set = new Set();

    for (const range of iterable) {
      Type.assertSafeIntRange(range, "iterable[*]");
      this.#add(range);
    }
  }

  //XXX 命名 includesか？
  includesValue(test: safeint): boolean {
    // Type.assertSafeInt(test); SafeIntRange.includesでisSafeIntしている
    return [...this.#set].some((range) => SafeIntRange.includes(range, test));
  }

  unionWith(other: Iterable<safeintrange>): this {
    Type.assertIterable(other, "other");

    const cloned = Reflect.construct(this.constructor, [this]);
    for (const range of other) {
      Type.assertSafeIntRange(range, "other[*]");
      cloned.#add(range);
    }
    return cloned;
  }

  //XXX exceptWith, intersectWith, ...
  //XXX equals(range or rangeset)
  //XXX overlaps(range or rangeset)
  //XXX isDisjoint(range or rangeset)

  [Symbol.iterator](): SetIterator<safeintrange> {
    return this.toSet()[Symbol.iterator]();
  }

  toArray(): Array<safeintrange> {
    return [...this.toSet()];
  }

  toSet(): Set<safeintrange> {
    return globalThis.structuredClone(this.#set);
  }

  #add(rangeToAdd: safeintrange): void {
    const newArray = [];
    let unionedRangeToAdd: safeintrange = rangeToAdd;
    let u: safeintrange | null = null;
    for (const range of this.#set) {
      u = SafeIntRange.union(range, unionedRangeToAdd);
      if (u) {
        unionedRangeToAdd = u;
      } else {
        newArray.push(range);
      }
    }
    newArray.push(unionedRangeToAdd);

    newArray.sort(_sorterMinAsc);
    this.#set.clear();
    newArray.forEach((r) => this.#set.add(r));
  }
}
