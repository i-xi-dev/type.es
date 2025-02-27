import * as Type from "../../type/mod.ts";
import {
  type codepoint,
  type rune,
  type safeint,
  type usvstring,
} from "../../_typedef/mod.ts";

export abstract class _PropertyValueSetBase<T> {
  protected readonly _set: Set<T>;

  constructor(iterable: Iterable<T>) {
    this._set = new Set(iterable);
  }

  //TODO 命名 includesか？
  abstract includesRune(rune: rune): boolean;

  //TODO 命名 includesか？
  abstract includesCodePoint(codePoint: codepoint): boolean;

  findMatches(text: usvstring): Map<rune, Array<safeint>> {
    Type.assertUSVString(text, "text");

    const result = new Map<rune, Array<safeint>>();
    let i = 0;
    for (const rune of [...text]) {
      if (this.includesRune(rune)) { //XXX assertUSVStringしているので、includesRune内のassertRuneは無駄
        if (result.has(rune)) {
          result.get(rune)!.push(i);
        } else {
          result.set(rune, [i]);
        }
      }
      i++;
    }

    return result; //XXX-2 readonlyにしたい
  }

  //TODO 否定のfindMatches

  abstract unionWith(other: Iterable<T>): this;

  [Symbol.iterator](): SetIterator<T> {
    return this._set[Symbol.iterator]();
  }

  toArray(): Array<T> {
    return [...this._set];
  }

  toSet(): Set<T> {
    return new Set(this._set);
  }
}
