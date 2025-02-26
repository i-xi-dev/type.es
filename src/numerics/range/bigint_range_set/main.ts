import * as BigIntRange from "../bigint_range/mod.ts";
import * as Type from "../../../type/mod.ts";
import { type bigintrange } from "../../../_typedef/mod.ts";

function _sorterMinAsc(a: bigintrange, b: bigintrange): -1 | 0 | 1 {
  const [aMin] = a;
  const [bMin] = b;
  if (aMin < bMin) {
    return -1;
  } else if (aMin > bMin) {
    return 1;
  }
  return 0;
}

export class BigIntRangeSet {
  // implements ReadonlySetLike<bigintrange> hasとかに意味があると思えない（Setのhasの仕様はオブジェクトの場合参照先が等しいかだし、has(コンストラクターに渡したrangeの参照)がtrueにならない場合がある（コンストラクターで結合や破棄する場合があるので））

  readonly #set: Set<bigintrange>;

  constructor(iterable: Iterable<bigintrange>) {
    Type.assertIterable(iterable, "iterable");
    this.#set = new Set();

    for (const range of iterable) {
      Type.assertBigIntRange(range, "iterable[*]");
      this.#add(range);
    }
  }

  //XXX 命名 includesか？
  includesValue(test: bigint): boolean {
    // Type.assertBigInt(test); BigIntRange.includesでisBigIntしている
    return [...this.#set].some((range) => BigIntRange.includes(range, test));
  }

  unionWith(other: Iterable<bigintrange>): this {
    Type.assertIterable(other, "other");

    const cloned = Reflect.construct(this.constructor, [this]);
    for (const range of other) {
      Type.assertBigIntRange(range, "other[*]");
      cloned.#add(range);
    }
    return cloned;
  }

  //XXX exceptWith, intersectWith, ...
  //XXX equals(range or rangeset)
  //XXX overlaps(range or rangeset)
  //XXX isDisjoint(range or rangeset)

  [Symbol.iterator](): SetIterator<bigintrange> {
    return this.toSet()[Symbol.iterator]();
  }

  toArray(): Array<bigintrange> {
    return [...this.toSet()];
  }

  toSet(): Set<bigintrange> {
    return globalThis.structuredClone(this.#set);
  }

  #add(rangeToAdd: bigintrange): void {
    const newArray = [];
    let unionedRangeToAdd: bigintrange = rangeToAdd;
    let u: bigintrange | null = null;
    for (const range of this.#set) {
      u = BigIntRange.union(range, unionedRangeToAdd);
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
