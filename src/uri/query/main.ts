import * as Type from "../../type/mod.ts";
import { String as ExString } from "../../basics/mod.ts";

const { EMPTY } = ExString;

export interface UriQuery {
  // parse as "application/x-www-form-urlencoded"
  entries(): Iterable<UriQuery.Parameter>;

  // "application/x-www-form-urlencoded"以外で構文解析する場合など用
  toString(): string;
}

class _Query implements UriQuery {
  readonly #raw: string;
  readonly #parameters: Array<UriQuery.Parameter>;

  constructor(raw: string) {
    this.#raw = raw;
    this.#parameters = [...new URLSearchParams(this.#raw).entries()];
  }

  entries(): Iterable<UriQuery.Parameter> {
    return globalThis.structuredClone(this.#parameters);
  }

  toString(): string {
    return this.#raw;
  }
}

export namespace UriQuery {
  /**
   * A query parameter represented as name-value pair.
   */
  export type Parameter = [name: string, value: string];

  export function of(url: URL): UriQuery | null {
    const rawQuery = url.search.replace(/^\?/, EMPTY);

    if (Type.isNonEmptyString(rawQuery)) {
      return new _Query(rawQuery);
    } else {
      const urlWithoutFragment = new URL(url);
      urlWithoutFragment.hash = EMPTY;
      if (urlWithoutFragment.toString().endsWith("?")) {
        // searchは""でクエリがnullではない場合（クエリが""(フラグメントを除いたURL末尾"?")の場合）
        return new _Query(EMPTY);
      }
    }
    return null;
  }
}
