import * as Type from "../type/mod.ts";
import { _decode } from "./_punycode.ts";
import { fromBytes as utf8Decode } from "../text/mod.ts";
import { percentDecode } from "../bytes/mod.ts";
import { SafeInt } from "../numerics/mod.ts";
import { String as ExString } from "../basics/mod.ts";
import { type uint16 } from "../_typedef/mod.ts";

const { EMPTY } = ExString;

export namespace Uri {
  export const Scheme = {
    BLOB: "blob",
    FILE: "file",
    FTP: "ftp",
    HTTP: "http",
    HTTPS: "https",
    WS: "ws",
    WSS: "wss",
  } as const;

  // export type Host = {
  //   isOpaque: boolean;
  //   decode(): string;
  //   toString(): string;
  // };

  // export type Port = {
  //   number: number;
  //   toString(): string;
  // };

  export type Path = {
    isOpaque: boolean;
    segments(): Array<string>;
    toString(): string;
  };

  /**
   * A query parameter represented as name-value pair.
   */
  export type QueryParameter = [name: string, value: string];

  export type Query = {
    parameters(): Array<QueryParameter>; // parse as "application/x-www-form-urlencoded"
    toString(): string;
  };

  export type Fragment = {
    percentDecode(): string;
    toString(): string;
  };

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
  port: uint16 | null;
  path: Uri.Path;
  query: Uri.Query | null;
  fragment: Uri.Fragment | null;
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

class _Path implements Uri.Path {
  readonly #raw: string;
  readonly #separator: string | null; // (今のところ?)これがnullである、すなわち、パスはopaque

  constructor(rawPath: string, separator: string | null) {
    this.#raw = rawPath;
    this.#separator = separator;
  }

  get isOpaque(): boolean {
    return (Type.isNonEmptyString(this.#separator) !== true);
  }

  segments(): Array<string> {
    if (this.isOpaque === true) {
      return [this.#raw];
    }

    const rawSegments =
      (this.#raw.startsWith(this.#separator!)
        ? this.#raw.substring(1)
        : this.#raw).split(this.#separator!);
    return rawSegments.map((segement) => utf8Decode(percentDecode(segement)));
  }

  // opaqueなパスで構文解析する場合など用
  toString(): string {
    return this.#raw;
  }
}

class _Query implements Uri.Query {
  readonly #raw: string;

  constructor(rawQuery: string) {
    this.#raw = rawQuery;
  }

  parameters(): Array<Uri.QueryParameter> {
    return [...new URLSearchParams(this.#raw).entries()];
  }

  // "application/x-www-form-urlencoded"以外で構文解析する場合など用
  toString(): string {
    return this.#raw;
  }
}

class _Fragment implements Uri.Fragment {
  readonly #raw: string;

  constructor(rawFragment: string) {
    this.#raw = rawFragment;
  }

  percentDecode(): string {
    return utf8Decode(percentDecode(this.#raw));
  }

  // フラグメントを更に構文解析する場合など用（ex. ":~:text=%3D"）
  toString(): string {
    return this.#raw;
  }
}

class _UriObject implements Uri {
  readonly #url: URL;
  readonly #scheme: string;
  // readonly #userName: string;
  // readonly #password: string;
  readonly #host: string;
  readonly #port: uint16 | null;
  readonly #path: Uri.Path;
  readonly #query: Uri.Query | null;
  readonly #fragment: Uri.Fragment | null;

  constructor(url: URL) {
    this.#url = url;
    const scheme = url.protocol.replace(/:$/, EMPTY);

    this.#scheme = scheme;
    this.#host = _decodeHost(scheme, url.hostname); //TODO
    this.#port = _portOf(scheme, url.port); //TODO
    this.#path = _pathOf(scheme, url.pathname);

    const rawQuery = url.search.replace(/^\?/, EMPTY);
    if (Type.isNonEmptyString(rawQuery)) {
      this.#query = new _Query(rawQuery);
    } else {
      const urlWithoutFragment = new URL(url);
      urlWithoutFragment.hash = EMPTY;
      if (urlWithoutFragment.toString().endsWith("?")) {
        // searchは""でクエリがnullではない場合（クエリが""(フラグメントを除いたURL末尾"?")の場合）
        this.#query = new _Query(rawQuery);
      } else {
        this.#query = null;
      }
    }

    const rawFragment = url.hash.replace(/^#/, EMPTY);
    if (Type.isNonEmptyString(rawFragment)) {
      this.#fragment = new _Fragment(rawFragment);
    } else if (url.toString().endsWith("#")) {
      // hashは""でフラグメントがnullではない場合（フラグメントが""(URL末尾が"#")の場合）
      this.#fragment = new _Fragment(EMPTY);
    } else {
      this.#fragment = null;
    }
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
  get port(): uint16 | null {
    return this.#port;
  }

  /**
   * Gets the path segments for this instance.
   */
  get path(): Uri.Path {
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
  get query(): Uri.Query | null {
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
  get fragment(): Uri.Fragment | null {
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

/**
 * The default port numbers.
 */
const _DefaultPortMap: Record<string, uint16> = {
  [Uri.Scheme.FTP]: 21,
  [Uri.Scheme.HTTP]: 80,
  [Uri.Scheme.HTTPS]: 443,
  [Uri.Scheme.WS]: 80,
  [Uri.Scheme.WSS]: 443,
} as const;

/**
 * The [special schemes](https://url.spec.whatwg.org/#special-scheme).
 */
const _SpecialSchemes: Array<string> = [
  Uri.Scheme.FILE,
  Uri.Scheme.FTP,
  Uri.Scheme.HTTP,
  Uri.Scheme.HTTPS,
  Uri.Scheme.WS,
  Uri.Scheme.WSS,
];

function _isSpecialScheme(scheme: string): boolean {
  return _SpecialSchemes.includes(scheme);
}

function _decodeHost(scheme: string, rawHost: string) {
  if (_isSpecialScheme(scheme) !== true) {
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

function _portOf(scheme: string, portString: string): uint16 | null {
  if (Type.isNonEmptyString(portString)) {
    // #rawPortは URL#port の前提なので範囲チェック等はしない
    return SafeInt.fromString(portString);
  }

  if (Object.keys(_DefaultPortMap).includes(scheme)) {
    return _DefaultPortMap[scheme];
  }

  return null;
}

function _pathOf(scheme: string, rawPath: string): Uri.Path {
  if (_isSpecialScheme(scheme) !== true) {
    return new _Path(rawPath, null);
  }

  return new _Path(rawPath, "/");
}
