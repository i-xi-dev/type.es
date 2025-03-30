import * as Type from "../../type/mod.ts";
import { SafeInt } from "../../numerics/mod.ts";
import { type uint16 } from "../../_typedef/mod.ts";
import { UriScheme } from "../scheme/mod.ts";

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

export class UriPort {
  readonly #raw: string;
  readonly #number: uint16;

  private constructor(rawPort: string, number: uint16) {
    this.#raw = rawPort;
    // rawPortは URL#port の前提なので範囲チェック等はしない
    this.#number = number;
  }

  static of(url: URL): UriPort | null {
    const scheme = UriScheme.of(url);
    const rawPort = url.port;

    if (Type.isNonEmptyString(rawPort)) {
      // #rawPortは URL#port の前提なので範囲チェック等はしない
      return new UriPort(rawPort, SafeInt.fromString(rawPort));
    }

    if (Object.keys(_DefaultPortMap).includes(scheme)) {
      return new UriPort(rawPort, _DefaultPortMap[scheme]);
    }

    return null;
  }

  get number(): uint16 {
    return this.#number;
  }

  toString(): string {
    return this.#raw;
  }
}
