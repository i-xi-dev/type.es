import * as Bytes from "../bytes/mod.ts";
import * as Type from "../type/mod.ts";
import { type safeint, type uint8 } from "../_typedef/mod.ts";
import { Radix, String as ExString } from "../basics/mod.ts";
import { SafeInt, Uint8 } from "../numerics/mod.ts";

const { EMPTY } = ExString;

const _BYTES = 16;

export type FormatOptions = {
  upperCase?: boolean; //
  noHyphens?: boolean;
};

function _stringify(
  bytes: Uint8Array<ArrayBuffer>,
  options?: FormatOptions,
): string {
  const resolvedOptions = {
    lowerCase: options?.upperCase !== true,
  };

  const joiner = (options?.noHyphens === true) ? EMPTY : "-";

  // [0..4]-[4..6]-[6..8]-[8..9]-[9..10]-[10..]
  return [
    Bytes.toString(bytes.slice(0, 4).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(4, 6).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(6, 8).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(8, 10).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(10).buffer, resolvedOptions),
  ].join(joiner);
}

function _isUuidString(test: string): boolean {
  if (Type.isNonEmptyString(test) !== true) {
    return false;
  }

  return /^(?:(?:urn:uuid:)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{32})$/i
    .test(test);
}

function _normalizeString(value: string): string {
  if (_isUuidString(value) !== true) {
    throw new RangeError("TODO");
  }

  return value.toLowerCase().replace(/^urn:uuid:/, EMPTY).replace(/-/g, EMPTY);
}

// publicにはしない（ビッグエンディアンにする必要がある）
function _fromString(value: string): Uint8Array<ArrayBuffer> {
  const normalized = _normalizeString(value);

  const builder = Bytes.BytesBuilder.create({
    capacity: _BYTES,
    capacityMax: _BYTES,
  });
  builder.loadFromString(normalized);
  return builder.toUint8Array();
}

/** @deprecated Use `crypto.randomUUID()`. */
export function generateRandom(options?: FormatOptions): string {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(_BYTES));

  // 7バイト目の上位4ビットは0100₂固定（13桁目の文字列表現は"4"固定）
  bytes[6] = (bytes[6] as uint8) & 0x0F | 0x40;

  // 9バイト目の上位2ビットは10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
  bytes[8] = (bytes[8] as uint8) & 0x3F | 0x80;

  return _stringify(bytes, options);
}

export function nil(options?: FormatOptions): string {
  const bytes = new Uint8Array(_BYTES);
  bytes.fill(Uint8.MIN_VALUE);
  return _stringify(bytes, options);
}

export function max(options?: FormatOptions): string {
  const bytes = new Uint8Array(_BYTES);
  bytes.fill(Uint8.MAX_VALUE);
  return _stringify(bytes, options);
}

/**
 * Gets the [variant](https://datatracker.ietf.org/doc/html/rfc9562#name-variant-field) of this UUID.
 */
export function variantOf(uuid: string): safeint {
  const normalized = _normalizeString(uuid);
  return SafeInt.fromString(normalized.charAt(16), {
    radix: Radix.HEXADECIMAL,
  });
}

/**
 * Gets the [version](https://datatracker.ietf.org/doc/html/rfc9562#name-version-field) of this UUID.
 */
export function versionOf(uuid: string): safeint {
  const normalized = _normalizeString(uuid);
  return SafeInt.fromString(normalized.charAt(12), {
    radix: Radix.HEXADECIMAL,
  });
}
