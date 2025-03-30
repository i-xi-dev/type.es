import * as Type from "../type/mod.ts";
import { _decode } from "./_punycode.ts";
import { String as ExString } from "../basics/mod.ts";
import { UriFragment } from "./fragment/mod.ts";
import { UriPath } from "./path/mod.ts";
import { UriPort } from "./port/mod.ts";
import { UriQuery, type UriQueryParameter } from "./query/mod.ts";
import { UriScheme } from "./scheme/mod.ts";

const { EMPTY } = ExString;

export namespace Uri {
  export const Scheme = {} as const;

  // export type Host = {
  //   isOpaque: boolean;
  //   decode(): string;
  //   toString(): string;
  // };

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
  host: string; // URL Standardではhostもnullと""で意味が違う
  port: UriPort | null;
  path: UriPath;
  query: UriQuery | null;
  fragment: UriFragment | null;
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

class _UriObject implements Uri {
  readonly #url: URL;
  readonly #scheme: string;
  // readonly #userName: string;
  // readonly #password: string;
  readonly #host: string;
  readonly #port: UriPort | null;
  readonly #path: UriPath;
  readonly #query: UriQuery | null;
  readonly #fragment: UriFragment | null;

  constructor(url: URL) {
    this.#url = url;
    const scheme = UriScheme.of(url);

    this.#scheme = scheme;
    this.#host = _decodeHost(scheme, url.hostname); //TODO
    this.#port = UriPort.of(url);
    this.#path = UriPath.of(url);
    this.#query = UriQuery.of(url);
    this.#fragment = UriFragment.of(url);
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
    return this.#scheme;
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
  get host(): string {
    return this.#host;
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
  get port(): UriPort | null {
    return this.#port;
  }

  /**
   * Gets the path segments for this instance.
   */
  get path(): UriPath {
    return this.#path;
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
  get query(): UriQuery | null {
    return this.#query;
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
    return this.#fragment;
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

function _decodeHost(scheme: string, rawHost: string) {
  if (UriScheme.isSpecial(scheme) !== true) {
    return rawHost;
  }
  if (Type.isNonEmptyString(rawHost) !== true) {
    return rawHost;
  }

  // IPv4やIPv6は"xn--"が出てこないので区別せずに処理して問題ない
  const parts = rawHost.split(".");

  const decodedParts = parts.map((part) => {
    if (part.startsWith("xn--")) { // 小文字の"xn--"で判定しているのは、rawHostはURL#hostnameの前提だから。
      return _decode(part.substring(4));
    } else {
      return part;
    }
  });
  const decoded = decodedParts.join(".");

  // デコード出来ているかチェック //XXX テストして消す
  const test = new URL("http://example.com/");
  test.hostname = decoded;
  if (test.hostname === rawHost) {
    return decoded;
  }
  throw new Error("failed: punicode decode");
}
