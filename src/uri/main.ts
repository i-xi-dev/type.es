import * as Type from "../type/mod.ts";
import { _decode as _punycodeDecode } from "./_punycode.ts";
import { _utfPercentDecode } from "./_utils.ts";
import { SafeInt } from "../numerics/mod.ts";
import { String as ExString } from "../basics/mod.ts";
import { type uint16 } from "../_typedef/mod.ts";
import { Scheme } from "./scheme/mod.ts";

const { EMPTY } = ExString;

//XXX 外に出す？
const IpAddressFamily = {
  IPV4: "IPv4",
  IPV6: "IPv6",
} as const;
type IpAddressFamily = typeof IpAddressFamily[keyof typeof IpAddressFamily];

/**
 * The [special schemes](https://url.spec.whatwg.org/#special-scheme).
 */
const _SpecialSchemes: Array<string> = [
  Scheme.FILE,
  Scheme.FTP,
  Scheme.HTTP,
  Scheme.HTTPS,
  Scheme.WS,
  Scheme.WSS,
];

function _schemeOf(url: URL): string {
  return url.protocol.replace(/:$/, EMPTY);
}

//XXX 外に出す？
type IpAddress = {
  address: string;
  family: IpAddressFamily;
};

export interface Host {
  isIpAddress: boolean;
  ipAddress: IpAddress | null;
  isDomain: boolean;
  domain: string | null;
  isOpaque: boolean;
  toString(): string;
}

export interface Path {
  isOpaque: boolean;

  segment(): Iterable<string>;

  // opaqueなパスで構文解析する場合など用
  toString(): string;
}

export interface Components {
  scheme: string;
  // userName: string;
  // password: string;
  host: Host | null;
  port: uint16 | null;
  path: Path;
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

function _decodeDomain(rawHost: string): string {
  const parts = rawHost.split(".");

  const decodedParts = parts.map((part) => {
    if (part.startsWith("xn--")) { // 小文字の"xn--"で判定しているのは、rawHostはURL#hostnameの前提だから。
      return _punycodeDecode(part.substring(4));
    } else {
      return part;
    }
  });
  // const decoded = decodedParts.join(".");
  return decodedParts.join(".");

  // // デコード出来ているかチェック //XXX テストして消す
  // const test = new URL(scheme + "://example.com/");
  // test.hostname = decoded;
  // if (test.hostname === rawHost) {
  //   return decoded;
  // }
  // throw new Error("failed: punicode decode");
}

class _Host implements Host {
  readonly #raw: string;
  readonly #ipAddressFamily: IpAddressFamily | null;
  readonly #isOpaque: boolean;
  readonly #decodedDomain: string;

  constructor(raw: string, specialScheme: boolean) {
    this.#raw = raw;
    this.#ipAddressFamily = null;
    this.#isOpaque = false;
    this.#decodedDomain = EMPTY;

    if (raw.startsWith("[")) {
      this.#ipAddressFamily = IpAddressFamily.IPV6;
    } else if (specialScheme !== true) {
      this.#isOpaque = true;
    } else if (/^[0-9]+.[0-9]+.[0-9]+.[0-9]+$/.test(raw)) { // URLがパースした結果なのでこれ以上チェックする必要はない
      this.#ipAddressFamily = IpAddressFamily.IPV4;
    } else {
      this.#decodedDomain = _decodeDomain(raw);
    }
  }

  get isIpAddress(): boolean {
    return Type.isNonEmptyString(this.#ipAddressFamily);
  }

  get ipAddress(): IpAddress | null {
    if (this.isIpAddress === true) {
      const address = (this.#ipAddressFamily === IpAddressFamily.IPV4)
        ? this.#raw
        : this.#raw.slice(1, -1);
      return {
        address,
        family: this.#ipAddressFamily!,
      };
    }
    return null;
  }

  get isDomain(): boolean {
    return Type.isNonEmptyString(this.#decodedDomain);
  }

  get domain(): string | null {
    return this.#decodedDomain;
  }

  get isOpaque(): boolean {
    return this.#isOpaque;
  }

  toString(): string {
    return this.#raw;
  }
}

function _hostOf(url: URL): Host | null {
  const scheme = _schemeOf(url);
  return new _Host(url.hostname, _SpecialSchemes.includes(scheme));
  //XXX nullホストと空ホストは区別できるのか（URLオブジェクトの内部処理では区別してると思われるが、外から区別できるか）
}

/**
 * The default port numbers.
 */
const _DefaultPortMap: Record<string, uint16> = {
  [Scheme.FTP]: 21,
  [Scheme.HTTP]: 80,
  [Scheme.HTTPS]: 443,
  [Scheme.WS]: 80,
  [Scheme.WSS]: 443,
} as const;

class _Path implements Path {
  readonly #raw: string;
  readonly #separator: string | null; // (今のところ?)これがnullである、すなわち、パスはopaque
  readonly #isOpaque: boolean;
  readonly #segments: Array<string>;

  constructor(raw: string, specialScheme: boolean) {
    this.#raw = raw;
    this.#separator = (specialScheme === true) ? "/" : null;
    this.#isOpaque = Type.isNonEmptyString(this.#separator) !== true;
    if (this.#isOpaque === true) {
      this.#segments = [];
    } else {
      const joined = this.#raw.startsWith(this.#separator!)
        ? this.#raw.substring(1)
        : this.#raw;
      this.#segments = joined.split(this.#separator!)
        .map((segement) => _utfPercentDecode(segement));
    }
  }

  get isOpaque(): boolean {
    return this.#isOpaque;
  }

  segment(): Iterable<string> {
    return globalThis.structuredClone(this.#segments);
  }

  toString(): string {
    return this.#raw;
  }
}

function _pathOf(url: URL): Path {
  const scheme = _schemeOf(url);
  return new _Path(url.pathname, _SpecialSchemes.includes(scheme));
}

function _portOf(url: URL): uint16 | null {
  const scheme = _schemeOf(url);
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
    return _schemeOf(this.#url);
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
  get host(): Host | null {
    return _hostOf(this.#url);
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
  get path(): Path {
    return _pathOf(this.#url);
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
