export function isEventTarget(test: unknown): test is EventTarget {
  return (test instanceof EventTarget);
}

export function assertEventTarget(test: unknown, label: string): void {
  if (isEventTarget(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`EventTarget\`.`);
  }
}
