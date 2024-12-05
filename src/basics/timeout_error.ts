/**
 * The `TimeoutError` represents an error when an operation timed out.
 */
export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TimeoutError";
  }
}
