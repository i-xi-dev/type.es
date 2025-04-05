import * as Type from "../../type/mod.ts";
import { _utfPercentDecode } from "../_utils.ts";
import { UriScheme } from "../scheme/mod.ts";

export interface UriPath {
  isOpaque: boolean;

  segment(): Iterable<string>;

  // opaqueなパスで構文解析する場合など用
  toString(): string;
}

class _Path implements UriPath {
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

export namespace UriPath {
  export function of(url: URL): UriPath {
    const scheme = UriScheme.of(url);
    return new _Path(url.pathname, UriScheme.isSpecial(scheme));
  }
}
