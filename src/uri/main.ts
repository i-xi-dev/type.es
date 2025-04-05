import * as Type from "../type/mod.ts";
import { SafeInt } from "../numerics/mod.ts";
import { String as ExString } from "../basics/mod.ts";
import { type uint16 } from "../_typedef/mod.ts";
import { UriHost } from "./host/main.ts";
import { UriPath } from "./path/mod.ts";
import { UriScheme } from "./scheme/mod.ts";

const { EMPTY } = ExString;

export interface Components {
  scheme: string;
  // userName: string;
  // password: string;
  host: UriHost | null;
  port: uint16 | null;
  path: UriPath;
  query: string | null;
  fragment: string | null;
  // userInfo: ;
  // authority: ;
  // origin: ;
  toString(): string;
  // withoutUserInfo(): Components;
  // withPath(): Components;
  // hasQuery(): boolean;
  // withQuery(query: Array<Uri.QueryParameter>): Components;
  // withoutQuery(): Components;
  // hasFragment(): boolean;
  withoutFragment(): Components;
  // withFragment(fragment: string): Components;
}

export function fromString(value: string): Components {
  Type.assertNonEmptyString(value, "value");

  const parsed = URL.parse(value);
  if (parsed) {
    return new _UriComponents(parsed);
  }

  throw new TypeError("`value` must be text representation of URL.");
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

function _queryOf(url: URL): string | null {
  const rawQuery = url.search.replace(/^\?/, EMPTY);

  if (Type.isNonEmptyString(rawQuery)) {
    return rawQuery;
  } else {
    const urlWithoutFragment = new URL(url);
    urlWithoutFragment.hash = EMPTY;
    if (urlWithoutFragment.toString().endsWith("?")) {
      // searchは""でクエリがnullではない場合（クエリが""(フラグメントを除いたURL末尾"?")の場合）
      return EMPTY;
    }
  }
  return null;
}

function _fragmentOf(url: URL): string | null {
  const rawFragment = url.hash.replace(/^#/, EMPTY);

  if (Type.isNonEmptyString(rawFragment)) {
    return rawFragment;
  } else if (url.toString().endsWith("#")) {
    // hashは""でフラグメントがnullではない場合（フラグメントが""(URL末尾が"#")の場合）
    return EMPTY;
  }
  return null;
}

class _UriComponents implements Components {
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

  get query(): string | null {
    return _queryOf(this.#url);
  }

  get fragment(): string | null {
    return _fragmentOf(this.#url);
  }

  toString(): string {
    return this.#url.toString();
  }

  withoutFragment(): Components {
    const url = new URL(this.#url);
    url.hash = EMPTY;
    return new _UriComponents(url);
  }
}
