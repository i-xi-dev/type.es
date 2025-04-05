import * as Type from "../../type/mod.ts";
import { _utfPercentDecode } from "../_utils.ts";
import { String as ExString } from "../../basics/mod.ts";

const { EMPTY } = ExString;

export interface UriFragment {
  // フラグメントを更に構文解析する場合など用（ex. ":~:text=%3D"）
  toString(): string;

  // 場合によっては構文解析できなくなるのでtoStringと使い分けること
  toDecoded(): string;
}

class _Fragment implements UriFragment {
  readonly #raw: string;
  readonly #decoded: string;

  constructor(raw: string) {
    this.#raw = raw;
    this.#decoded = _utfPercentDecode(raw);
  }

  toString(): string {
    return this.#raw;
  }

  toDecoded(): string {
    return this.#decoded;
  }
}

export namespace UriFragment {
  export function of(url: URL): UriFragment | null {
    const rawFragment = url.hash.replace(/^#/, EMPTY);

    if (Type.isNonEmptyString(rawFragment)) {
      return new _Fragment(rawFragment);
    } else if (url.toString().endsWith("#")) {
      // hashは""でフラグメントがnullではない場合（フラグメントが""(URL末尾が"#")の場合）
      return new _Fragment(EMPTY);
    }
    return null;
  }
}
