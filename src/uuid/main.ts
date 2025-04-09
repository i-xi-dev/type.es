import * as Bytes from "../bytes/mod.ts";
import * as Text from "../text/mod.ts";
import * as Type from "../type/mod.ts";
import { type safeint, type uint8 } from "../_typedef/mod.ts";
import { Radix, String as ExString } from "../basics/mod.ts";
import { SafeInt, Uint8 } from "../numerics/mod.ts";

const { EMPTY } = ExString;

const _BYTES = 16;

export type FormatOptions = {
  upperCase?: boolean;
  asURN?: boolean;
};

function _stringify(
  bytes: Uint8Array<ArrayBuffer>,
  options?: FormatOptions,
): string {
  const resolvedOptions = {
    lowerCase: options?.upperCase !== true,
  };

  // [0..4]-[4..6]-[6..8]-[8..9]-[9..10]-[10..]
  const str = [
    Bytes.toString(bytes.slice(0, 4).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(4, 6).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(6, 8).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(8, 10).buffer, resolvedOptions),
    Bytes.toString(bytes.slice(10).buffer, resolvedOptions),
  ].join("-");

  return (options?.asURN === true) ? ("urn:uuid:" + str) : str;
}

function _isUuidString(test: string): boolean {
  if (Type.isNonEmptyString(test) !== true) {
    return false;
  }

  return /^(?:(?:urn:uuid:)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i
    .test(test);
}

function _toBytesString(value: string): string {
  if (_isUuidString(value) !== true) {
    throw new TypeError("`value` must be text representation of UUID.");
  }

  return value.toLowerCase().replace(/^urn:uuid:/, EMPTY).replace(/-/g, EMPTY);
}

// 文字列表現からUint128にするなら"-"を除いて先頭に"0x"を付けてBigInt()すれば良い

function _fromString(value: string): Uint8Array<ArrayBuffer> {
  const bytesString = _toBytesString(value);

  const builder = Bytes.BytesBuilder.create({
    capacity: _BYTES,
    capacityMax: _BYTES,
  });
  builder.loadFromString(bytesString);
  return builder.toUint8Array();
}

/**
 * Creates a `string` that represents the UUIDv4.
 *
 * @deprecated Use `crypto.randomUUID()`.
 * @param options -
 * @returns A `string` that represents the UUIDv4.
 */
export function generateRandom(options?: FormatOptions): string {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(_BYTES));

  // 7バイト目の上位4ビットは0100₂固定（13桁目の文字列表現は"4"固定）
  bytes[6] = (bytes[6] as uint8) & 0x0F | 0x40;

  // 9バイト目の上位2ビットは10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
  bytes[8] = (bytes[8] as uint8) & 0x3F | 0x80;

  return _stringify(bytes, options);
}

async function _generateNameBased(
  namespaceUuid: string,
  name: string,
  version: 3 | 5,
  options?: FormatOptions,
): Promise<string> {
  Type.assertString(name, "name");
  const namespaceBytes = _fromString(namespaceUuid);
  const nameBytes = Text.toBytes(name);

  const bytes = new Uint8Array(namespaceBytes.length + nameBytes.length);
  bytes.set(namespaceBytes, 0);
  bytes.set(nameBytes, namespaceBytes.length);

  let digestBytes: Uint8Array<ArrayBuffer>;
  if (version === 5) {
    digestBytes = new Uint8Array(await Bytes.computeSha1(bytes));

    // 7バイト目の上位4ビットは0101₂固定（13桁目の文字列表現は"5"固定）
    digestBytes[6] = (digestBytes[6] as uint8) & 0x0F | 0x50;
  } else { // if (version === 3) {
    digestBytes = new Uint8Array(await Bytes.computeMd5(bytes));

    // 7バイト目の上位4ビットは0011₂固定（13桁目の文字列表現は"3"固定）
    digestBytes[6] = (digestBytes[6] as uint8) & 0x0F | 0x30;
  }

  // 9バイト目の上位2ビットは10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
  digestBytes[8] = (digestBytes[8] as uint8) & 0x3F | 0x80;

  // 17バイト目以降は破棄
  return _stringify(digestBytes.slice(0, 16), options);
}

export function generateMd5NameBased(
  namespaceUuid: string,
  name: string,
  options?: FormatOptions,
): Promise<string> {
  return _generateNameBased(namespaceUuid, name, 3, options);
}

export function generateSha1NameBased(
  namespaceUuid: string,
  name: string,
  options?: FormatOptions,
): Promise<string> {
  return _generateNameBased(namespaceUuid, name, 5, options);
}

const _v7m = Object.seal({
  last: globalThis.performance.now(),
});

function _timestamp(): safeint {
  return Math.trunc(
    globalThis.performance.timeOrigin + globalThis.performance.now(),
  );
}

const _v7Counter = (function* () {
  let last = Number.MIN_SAFE_INTEGER;
  let cnt = 0;
  while (true) {
    const curr = _timestamp();
    if (last < curr) {
      last = curr;
      cnt = 0;
    } else { // if (last === curr) { // last > currはありえない
      cnt++;
    }

    yield {
      timestamp: last,
      counter: cnt,
    };
  }
})();

/**
 * Creates a `string` that represents the UUIDv7.
 *
 * @param options -
 * @returns A `string` that represents the UUIDv7.
 */
export function generateUnixTimeBased(options?: FormatOptions): string {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(_BYTES));

  const { timestamp, counter } = _v7Counter.next().value;

  // 先頭48ビットにミリ秒精度の現在時刻をビッグエンディアンでセット
  const tsBuffer = new ArrayBuffer(8);
  const tsView = new DataView(tsBuffer);
  tsView.setBigUint64(0, BigInt(timestamp));
  bytes.set(new Uint8Array(tsBuffer, 2), 0);

  // 次の12ビットはミリ秒未満ナノ秒までをセットすることもできるが、
  // ミリ秒未満をブラウザで確実に取る方法が結局のところ無いので、
  // RFC9562の6.2のMethod 1で実装する
  tsView.setBigUint64(0, 0n);
  tsView.setUint16(0, counter);
  bytes.set(new Uint8Array(tsBuffer, 0, 2), 6);

  // 7バイト目の上位4ビットは0111₂固定（13桁目の文字列表現は"7"固定）
  bytes[6] = (bytes[6] as uint8) & 0x0F | 0x70;

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
  return SafeInt.fromString(_toBytesString(uuid).charAt(16), {
    radix: Radix.HEXADECIMAL,
  });
}

export function isVariant10xx(uuid: string): boolean {
  return [8, 9, 10, 11].includes(variantOf(uuid));
}

/**
 * Gets the [version](https://datatracker.ietf.org/doc/html/rfc9562#name-version-field) of this UUID.
 */
export function versionOf(uuid: string): safeint {
  return SafeInt.fromString(_toBytesString(uuid).charAt(12), {
    radix: Radix.HEXADECIMAL,
  });
}

export function timestampOf(value: string): safeint {
  if (isVariant10xx(value) && (versionOf(value) !== 7)) {
    throw new TypeError("`value` must be text representation of UUIDv7.");
  }

  const bytes = _fromString(value);
  let work = (new DataView(bytes.buffer)).getBigUint64(0);
  work = work >> 16n;
  return Number(work);
}

//XXX uuidEquals()

export const Namespace = {
  DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
} as const;
