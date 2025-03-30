import * as Type from "../../type/mod.ts";
import { String as ExString } from "../../basics/mod.ts";

const { EMPTY } = ExString;

/**
 * A query parameter represented as name-value pair.
 */
export type UriQueryParameter = [name: string, value: string];

export class UriQuery {
  readonly #raw: string;

  private constructor(rawQuery: string) {
    this.#raw = rawQuery;
  }

  static of(url: URL): UriQuery | null {
    const rawQuery = url.search.replace(/^\?/, EMPTY);

    if (Type.isNonEmptyString(rawQuery)) {
      return new UriQuery(rawQuery);
    } else {
      const urlWithoutFragment = new URL(url);
      urlWithoutFragment.hash = EMPTY;
      if (urlWithoutFragment.toString().endsWith("?")) {
        // searchは""でクエリがnullではない場合（クエリが""(フラグメントを除いたURL末尾"?")の場合）
        return new UriQuery(rawQuery);
      } else {
        return null;
      }
    }
  }

  // parse as "application/x-www-form-urlencoded"
  parameters(): Array<UriQueryParameter> {
    return [...new URLSearchParams(this.#raw).entries()];
  }

  // "application/x-www-form-urlencoded"以外で構文解析する場合など用
  toString(): string {
    return this.#raw;
  }
}
