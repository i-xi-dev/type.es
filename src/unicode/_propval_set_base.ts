import {
  type ArrayOrSet,
  type codepoint,
  type rune,
  type safeint,
  type usvstring,
} from "../type.ts";
import { assertUSVString } from "../type/string.ts";

export abstract class _PropertyValueSetBase<T> implements ReadonlySetLike<T> {
  readonly #set: Set<T>;

  constructor(iterable: Iterable<T>) {
    this.#set = new Set(iterable);
  }

  get size(): safeint {
    return this.#set.size;
  }

  abstract includesRune(rune: rune): boolean;

  abstract includesCodePoint(codePoint: codepoint): boolean;

  findMatches(text: usvstring): Map<rune, Array<safeint>> {
    assertUSVString(text, "text");

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

  abstract unionWith(other: this | ArrayOrSet<T>): this;

  has(value: T): boolean {
    return this.#set.has(value);
  }

  keys(): SetIterator<T> {
    return this.#set[Symbol.iterator]();
  }

  values(): SetIterator<T> {
    return this.#set[Symbol.iterator]();
  }

  [Symbol.iterator](): SetIterator<T> {
    return this.#set[Symbol.iterator]();
  }

  toArray(): Array<T> {
    return [...this.#set];
  }

  toSet(): Set<T> {
    return new Set(this.#set);
  }
}
