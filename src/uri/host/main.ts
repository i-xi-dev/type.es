import * as Type from "../../type/mod.ts";
import { _decode } from "./_punycode.ts";
import { String as ExString } from "../../basics/mod.ts";
import { UriScheme } from "../scheme/mod.ts";

const { EMPTY } = ExString;

function _decodeDomain(rawHost: string): string {
  const parts = rawHost.split(".");

  const decodedParts = parts.map((part) => {
    if (part.startsWith("xn--")) { // 小文字の"xn--"で判定しているのは、rawHostはURL#hostnameの前提だから。
      return _decode(part.substring(4));
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

export interface UriHost {
  isIpAddress: boolean;
  ipAddress: UriHost.IpAddress | null;
  isDomain: boolean;
  domain: string | null;
  isOpaque: boolean;
  toString(): string;
}

class _Host implements UriHost {
  readonly #raw: string;
  readonly #ipAddressFamily: UriHost.IpAddressFamily | null;
  readonly #isOpaque: boolean;
  readonly #decodedDomain: string;

  constructor(raw: string, specialScheme: boolean) {
    this.#raw = raw;
    this.#ipAddressFamily = null;
    this.#isOpaque = false;
    this.#decodedDomain = EMPTY;

    if (raw.startsWith("[")) {
      this.#ipAddressFamily = UriHost.IpAddressFamily.IPV6;
    } else if (specialScheme !== true) {
      this.#isOpaque = true;
    } else if (/^[0-9]+.[0-9]+.[0-9]+.[0-9]+$/.test(raw)) { // URLがパースした結果なのでこれ以上チェックする必要はない
      this.#ipAddressFamily = UriHost.IpAddressFamily.IPV4;
    } else {
      this.#decodedDomain = _decodeDomain(raw);
    }
  }

  get isIpAddress(): boolean {
    return Type.isNonEmptyString(this.#ipAddressFamily);
  }

  get ipAddress(): UriHost.IpAddress | null {
    if (this.isIpAddress === true) {
      const address = (this.#ipAddressFamily === UriHost.IpAddressFamily.IPV4)
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

export namespace UriHost {
  export const IpAddressFamily = {
    IPV4: "IPv4",
    IPV6: "IPv6",
  } as const;
  export type IpAddressFamily =
    typeof IpAddressFamily[keyof typeof IpAddressFamily];

  export type IpAddress = {
    address: string;
    family: IpAddressFamily;
  };

  export function of(url: URL): UriHost | null {
    const scheme = UriScheme.of(url);
    return new _Host(url.hostname, UriScheme.isSpecial(scheme));
    //XXX nullホストと空ホストは区別できるのか（URLオブジェクトの内部処理では区別してると思われるが、外から区別できるか）
  }
}
