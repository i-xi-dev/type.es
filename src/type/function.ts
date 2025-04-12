// deno-lint-ignore ban-types
export function isFunction(test: unknown): test is Function {
  return (typeof test === "function");
}

export function assertFunction(test: unknown, label: string): void {
  if (isFunction(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`function\`.`);
  }
}

// isAsyncFunctionは提供しない（「`AsyncFunction`ではない＝戻り値は`Promise`ではない」は成立しないので）
