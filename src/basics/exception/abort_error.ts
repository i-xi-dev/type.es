/**
 * The `AbortError` represents an error when an operation was aborted.
 */
export class AbortError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AbortError";
  }
}
