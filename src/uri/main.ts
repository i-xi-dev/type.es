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

  export type QueryParameter = [name: string, value: string];

  export interface Object extends Uri {
    toString(): string;
  }

  export function fromString(value: string): Uri.Object {
    Type.assertNonEmptyString(value, "value");

    const parsed = URL.parse(value);
    if (parsed) {
      const scheme = parsed.protocol.replace(/:$/, EMPTY);
      const rawHost = parsed.hostname;
      const portString = parsed.port;
      //const pathString = parsed.pathname;
      const rawQuery = parsed.search.replace(/^\?/, EMPTY);
      const rawFragment = parsed.hash.replace(/^#/, EMPTY);

      return new _UriObject({
        scheme,
        // userName: utf8Decode(percentDecode(parsed.username),
        // password: utf8Decode(percentDecode(parsed.password),
        host: _decodeHost(scheme, rawHost),
        port: _portOf(scheme, portString),
        path: ["TODO"],
        query: [...new URLSearchParams(rawQuery).entries()],
        fragment: utf8Decode(percentDecode(rawFragment)),
      });
    }

    throw new TypeError("`value` must be text representation of URL.");
  }
}

interface Uri {
  scheme: string;
  // userName: string;
  // password: string;
  host: string;
  port: uint16 | null;
  path: Array<string>;
  query: Array<Uri.QueryParameter>;
  fragment: string;
}

class _UriObject implements Uri.Object {
  readonly #scheme: string;
  // readonly #userName: string;
  // readonly #password: string;
  readonly #host: string;
  readonly #port: uint16 | null;
  readonly #path: Array<string>;
  readonly #query: Array<Uri.QueryParameter>;
  readonly #fragment: string;

  constructor(record: Uri) {
    this.#scheme = record.scheme;
    // this.#userName = record.userName;
    // this.#password = record.password;
    this.#host = record.host;
    this.#port = record.port;
    this.#path = record.path;
    this.#query = record.query;
    this.#fragment = record.fragment;
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

  get path(): Array<string> {
    return globalThis.structuredClone(this.#path);
  }

  get query(): Array<Uri.QueryParameter> {
    return globalThis.structuredClone(this.#query);
  }

  get fragment(): string {
    return this.#fragment;
  }

  //TODO toString()
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

  // rawHostはURL#hostnameの前提なので_isSpecialSchemeであれば空文字列はありえない
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
