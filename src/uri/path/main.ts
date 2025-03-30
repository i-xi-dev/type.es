import * as Type from "../../type/mod.ts";
import { _utfPercentDecode } from "../_utils.ts";
import { UriScheme } from "../scheme/mod.ts";

export class UriPath {
  readonly #raw: string;
  readonly #separator: string | null; // (今のところ?)これがnullである、すなわち、パスはopaque

  private constructor(rawPath: string, separator: string | null) {
    this.#raw = rawPath;
    this.#separator = separator;
  }

  static of(url: URL): UriPath {
    const scheme = UriScheme.of(url);
    const separator = UriScheme.isSpecial(scheme) ? "/" : null;
    return new UriPath(url.pathname, separator);
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
    return rawSegments.map((segement) => _utfPercentDecode(segement));
  }

  // opaqueなパスで構文解析する場合など用
  toString(): string {
    return this.#raw;
  }
}
