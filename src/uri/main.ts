import * as Type from "../type/mod.ts";
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

  export function fromString(value: string): Uri {
    Type.assertNonEmptyString(value, "value");

    const parsed = URL.parse(value);
    if (parsed) {
      const scheme = parsed.protocol.replace(/:$/, EMPTY);
      const portString = parsed.port;
      //const pathString = parsed.pathname;
      const rawQuery = parsed.search.replace(/^\?/, EMPTY);
      const rawFragment = parsed.hash.replace(/^#/, EMPTY);

      return new _Uri({
        scheme,
        userName: "TODO", // parsed.username,
        password: "TODO", // parsed.password,
        host: "TODO", // parsed.hostname,
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
  userName: string;
  password: string;
  host: string;
  port: uint16 | null;
  path: Array<string>;
  query: Array<Uri.QueryParameter>;
  fragment: string;
}

class _Uri implements Uri {
  readonly #scheme: string;
  readonly #userName: string;
  readonly #password: string;
  readonly #host: string;
  readonly #port: uint16 | null;
  readonly #path: Array<string>;
  readonly #query: Array<Uri.QueryParameter>;
  readonly #fragment: string;

  constructor(record: Uri) {
    this.#scheme = record.scheme;
    this.#userName = record.userName;
    this.#password = record.password;
    this.#host = record.host;
    this.#port = record.port;
    this.#path = record.path;
    this.#query = record.query;
    this.#fragment = record.fragment;
  }

  get scheme(): string {
    return this.#scheme;
  }

  get userName(): string {
    return this.#userName;
  }

  get password(): string {
    return this.#password;
  }

  get host(): string {
    return this.#host;
  }

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
