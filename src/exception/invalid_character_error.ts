export class InvalidCharacterError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidCharacterError";
  }
}
