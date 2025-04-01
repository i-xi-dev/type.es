import * as Type from "../../type/mod.ts";
import { _utfPercentDecode } from "../_utils.ts";
import { String as ExString } from "../../basics/mod.ts";

const { EMPTY } = ExString;

export class UriFragment {
  readonly #raw: string;

  private constructor(rawFragment: string) {
    this.#raw = rawFragment;
  }

  static of(url: URL): UriFragment | null {
    const rawFragment = url.hash.replace(/^#/, EMPTY);

    if (Type.isNonEmptyString(rawFragment)) {
      return new UriFragment(rawFragment);
    } else if (url.toString().endsWith("#")) {
      // hashは""でフラグメントがnullではない場合（フラグメントが""(URL末尾が"#")の場合）
      return new UriFragment(EMPTY);
    } else {
      return null;
    }
  }

  // 場合によっては構文解析できなくなるのでtoStringと使い分けること
  toPercentDecoded(): string {
    return _utfPercentDecode(this.#raw);
  }

  // フラグメントを更に構文解析する場合など用（ex. ":~:text=%3D"）
  toString(): string {
    return this.#raw;
  }
}
