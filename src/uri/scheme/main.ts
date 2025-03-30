import { String as ExString } from "../../basics/mod.ts";

const { EMPTY } = ExString;

export namespace UriScheme {
  export const BLOB = "blob";
  export const FILE = "file";
  export const FTP = "ftp";
  export const HTTP = "http";
  export const HTTPS = "https";
  export const WS = "ws";
  export const WSS = "wss";

  /**
   * The [special schemes](https://url.spec.whatwg.org/#special-scheme).
   */
  const _SpecialSchemes: Array<string> = [
    FILE,
    FTP,
    HTTP,
    HTTPS,
    WS,
    WSS,
  ];

  export function of(url: URL): string {
    return url.protocol.replace(/:$/, EMPTY);
  }

  export function isSpecial(scheme: string): boolean {
    return _SpecialSchemes.includes(scheme);
  }
}
