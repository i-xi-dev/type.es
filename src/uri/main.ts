import * as Type from "../type/mod.ts";
import { SafeInt } from "../numerics/mod.ts";
import { String as ExString } from "../basics/mod.ts";
import { type uint16 } from "../_typedef/mod.ts";
import { UriFragment } from "./fragment/mod.ts";
import { UriHost } from "./host/main.ts";
import { UriPath } from "./path/mod.ts";
import { UriScheme } from "./scheme/mod.ts";

const { EMPTY } = ExString;

export namespace Uri {
  // export namespace Query {
  //   /**
  //    * A query parameter represented as name-value pair.
  //    */
  //   export type Parameter = [name: string, value: string];
  // }

  export interface Query {
    // URLSearchParamsを使えばいい
    // entries(): Iterable<Query.Parameter>;

    // "application/x-www-form-urlencoded"以外で構文解析する場合など用
    toString(): string;
  }

  export function fromString(value: string): Uri {
    Type.assertNonEmptyString(value, "value");

    const parsed = URL.parse(value);
    if (parsed) {
      return new _UriObject(parsed);
    }

    throw new TypeError("`value` must be text representation of URL.");
  }
}

interface UriComponents {
  scheme: string;
  // userName: string;
  // password: string;
  host: UriHost | null;
  port: uint16 | null;
  path: UriPath;
  query: Uri.Query | null; //string | nullにする、WwwFormUrlEncodedとして独立させる
  fragment: UriFragment | null; //string|nullにし、Fragmentは独立させる
}

export interface Uri extends UriComponents {
  // userInfo: ;
  // authority: ;
  // origin: ;
  toString(): string;
  // withoutUserInfo(): Uri;
  // withPath(): Uri;
  // hasQuery(): boolean;
  // withQuery(query: Array<Uri.QueryParameter>): Uri;
  // withoutQuery(): Uri;
  // hasFragment(): boolean;
  withoutFragment(): Uri;
  // withFragment(fragment: string): Uri;
}

/**
 * The default port numbers.
 */
const _DefaultPortMap: Record<string, uint16> = {
  [UriScheme.FTP]: 21,
  [UriScheme.HTTP]: 80,
  [UriScheme.HTTPS]: 443,
  [UriScheme.WS]: 80,
  [UriScheme.WSS]: 443,
} as const;

function _portOf(url: URL): uint16 | null {
  const scheme = UriScheme.of(url);
  const rawPort = url.port;

  if (Type.isNonEmptyString(rawPort)) {
    // #rawPortは URL#port の前提なので範囲チェック等はしない
    return SafeInt.fromString(rawPort);
  }

  if (Object.keys(_DefaultPortMap).includes(scheme)) {
    return _DefaultPortMap[scheme];
  }

  return null;
}

function _queryOf(url: URL): Uri.Query | null {
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

class _Query implements Uri.Query {
  readonly #raw: string;
  // readonly #parameters: Array<Uri.Query.Parameter>;

  constructor(raw: string) {
    this.#raw = raw;
    // this.#parameters = [...new URLSearchParams(this.#raw).entries()];
  }

  // entries(): Iterable<Uri.Query.Parameter> {
  //   return globalThis.structuredClone(this.#parameters);
  // }

  toString(): string {
    return this.#raw;
  }
}

class _UriObject implements Uri {
  readonly #url: URL;

  constructor(url: URL) {
    this.#url = url;
  }

  /**
   * Gets the scheme name for this instance.
   *
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://example.com/foo");
   * const scheme = uri.scheme;
   * // scheme
   * //   → "http"
   * ```
   */
  get scheme(): string {
    return UriScheme.of(this.#url);
  }

  // get userName(): string {
  //   return this.#userName;
  // }

  // get password(): string {
  //   return this.#password;
  // }

  /**
   * Gets the host for this instance.
   *
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://xn--eckwd4c7cu47r2wf.jp/foo");
   * const punycodeDecodedHost = uri.host;
   * // punycodeDecodedHost
   * //   → "ドメイン名例.jp"
   * ```
   */
  get host(): UriHost | null {
    return UriHost.of(this.#url);
  }

  /**
   * Gets the port number for this instance.
   *
   * If the port number is omitted, returns the number in below table.
   * | `scheme` | number |
   * | :--- | ---: |
   * | `"ftp"` | `21` |
   * | `"http"` | `80` |
   * | `"https"` | `443` |
   * | `"ws"` | `80` |
   * | `"wss"` | `443` |
   * | others | `null` |
   *
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://example.com/foo");
   * const port = uri.port;
   * // port
   * //   → 80
   * ```
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://example.com:8080/foo");
   * const port = uri.port;
   * // port
   * //   → 8080
   * ```
   */
  get port(): uint16 | null {
    return _portOf(this.#url);
  }

  /**
   * Gets the path segments for this instance.
   */
  get path(): UriPath {
    return UriPath.of(this.#url);
  }

  /**
   * Gets the result of parsing the query for this instance in the `application/x-www-form-urlencoded` format.
   *
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://example.com/foo?p1=%E5%80%A41&p2=123");
   * const queryEntries = uri.query;
   * // queryEntries
   * //   → [ [ "p1", "値1" ], [ "p2", "123" ] ]
   * ```
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://example.com/foo?textformat");
   * const queryEntries = uri.query;
   * // queryEntries
   * //   → [ [ "textformat", "" ] ]
   * ```
   */
  get query(): Uri.Query | null {
    return _queryOf(this.#url);
  }

  /**
   * Gets the fragment for this instance.
   *
   * @example
   * ```javascript
   * const uri = Uri.fromString("http://example.com/foo#%E7%B4%A0%E7%89%87");
   * const { fragment } = uri;
   * // fragment.percentDecode()
   * //   → "素片"
   * // fragment.toString()
   * //   → "%E7%B4%A0%E7%89%87"
   * ```
   */
  get fragment(): UriFragment | null {
    return UriFragment.of(this.#url);
  }

  toString(): string {
    return this.#url.toString();
  }

  withoutFragment(): Uri {
    const url = new URL(this.#url);
    url.hash = EMPTY;
    return new _UriObject(url);
  }
}
