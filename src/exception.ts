/**
 * The `AbortError` represents an error when an operation was aborted.
 */
export class AbortError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AbortError";
  }
}

/**
 * The `TimeoutError` represents an error when an operation timed out.
 */
export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export class InvalidCharacterError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidCharacterError";
  }
}

/**
 * The `InvalidStateError` represents an error when an object is in an invalid state.
 */
export class InvalidStateError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidStateError";
  }
}
