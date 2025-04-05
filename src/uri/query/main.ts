// // URLSearchParamsを使えばいい
// export interface Query {// QueryというよりWwwFormUrlEncoded
//   entries(): Iterable<Query.Parameter>;

//   // "application/x-www-form-urlencoded"以外で構文解析する場合など用
//   toString(): string;
// }

// class _Query implements Uri.Query {
//   readonly #raw: string;
//   readonly #parameters: Array<Uri.Query.Parameter>;

//   constructor(raw: string) {
//     this.#raw = raw;
//     this.#parameters = [...new URLSearchParams(this.#raw).entries()];
//   }

//   entries(): Iterable<Uri.Query.Parameter> {
//     return globalThis.structuredClone(this.#parameters);
//   }

//   toString(): string {
//     return this.#raw;
//   }
// }
