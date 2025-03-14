import * as Type from "../../type/mod.ts";
import { type safeint } from "../../_typedef/mod.ts";

export class SizedMap<K, V> extends Map<K, V> {
  #maxSize: safeint;

  constructor(maxSize: safeint) {
    Type.assertNonNegativeSafeInt(maxSize, "maxSize");

    super();
    this.#maxSize = maxSize;
  }

  override set(key: K, value: V): this {
    super.set(key, value);
    if (this.size > this.#maxSize) {
      this.delete([...this.keys()][0]);
    }
    return this;
  }
}
