import * as SafeInt from "../safeint/mod.ts";
import * as Type from "../../type/mod.ts";
import { type _AFunc, _normalizeOffset } from "./_utils.ts";
import { BITS_PER_BYTE, ByteOrder } from "../../basics/mod.ts";
import {
  type byteorder,
  type safeint,
  type uint16,
  type uint24,
  type uint32,
  type uint6,
  type uint7,
  type uint8,
} from "../../_typedef/mod.ts";
import {
  Uint16 as Uint16Info,
  Uint24 as Uint24Info,
  Uint32 as Uint32Info,
  Uint6 as Uint6Info,
  Uint7 as Uint7Info,
  Uint8 as Uint8Info,
} from "../../_const/uint.ts";

type _Info<T extends safeint> = {
  BIT_LENGTH: safeint;
  MIN_VALUE: T;
  MAX_VALUE: T;
};

interface RangedInt<T extends safeint> {
  MIN_VALUE: T;
  MAX_VALUE: T;
  BIT_LENGTH: safeint;
  BYTE_LENGTH: safeint;
  fromBytes(bytes: Uint8Array<ArrayBuffer>, byteOrder?: byteorder): T;
  toBytes(value: T, byteOrder?: byteorder): Uint8Array<ArrayBuffer>;
  bitwiseAnd(a: T, b: T): T;
  bitwiseOr(a: T, b: T): T;
  bitwiseXOr(a: T, b: T): T;
  //XXX bitwiseNot()
  rotateLeft(value: T, offset: safeint): T;
  //XXX rotateRight()
  truncate(value: safeint): T;
  saturate(value: safeint): T;
  // fromNumber() → truncate(),saturate(),範囲外はエラーにしたければisUintXかassertUintX（,整数にしたければround等してから）
  // toNumber() → もともとnumberなので不要
  // fromBigInt() → bigint.tsのtoNumber()してから、truncate(),saturate(),…
  // toBigInt() → bigint.tsのfromNumber()
  // fromString() → safeint.tsのfromString()してから、truncate(),saturate(),…
  // toString() → safeint.tsのtoString()
}

function _getByteByPosition(value: safeint, pos: safeint): uint8 {
  const x1 = 0x100 ** pos;
  const x2 = (value >= x1) ? (value % x1) : value;
  return Math.trunc(x2 / (0x100 ** (pos - 1))) as uint8;
}

const _BitOperation = {
  AND: Symbol(),
  OR: Symbol(),
  XOR: Symbol(),
};

type _BitOperation = typeof _BitOperation[keyof typeof _BitOperation];

class _Uint<T extends safeint> implements RangedInt<T> {
  readonly MIN_VALUE: T;
  readonly MAX_VALUE: T;
  readonly BIT_LENGTH: safeint;
  readonly BYTE_LENGTH: safeint; // (1 | 2 | 3 | 4 | 5 | 6)
  readonly #assert: _AFunc;
  readonly #size: safeint;

  readonly #bwoBuffer: ArrayBuffer;
  readonly #bwoView32: Uint32Array<ArrayBuffer>;
  readonly #bwoView8: Uint8Array<ArrayBuffer>;

  // readonly #tbBuffer: ArrayBuffer;
  // readonly #tbView32: Uint32Array<ArrayBuffer>;
  // readonly #tbView: DataView<ArrayBuffer>;

  constructor(info: _Info<T>, assert: _AFunc) {
    this.MIN_VALUE = info.MIN_VALUE;
    this.MAX_VALUE = info.MAX_VALUE;
    this.BIT_LENGTH = info.BIT_LENGTH;
    this.BYTE_LENGTH = Math.ceil(info.BIT_LENGTH / BITS_PER_BYTE);
    if (this.BYTE_LENGTH > 48) {
      throw new RangeError("byte length overflowed.");
    }
    this.#assert = assert;
    this.#size = info.MAX_VALUE + 1; // Uintの場合、最小は0なので最大+1で固定（= 2 ** bitLength）

    this.#bwoBuffer = new ArrayBuffer(4 * 3); // 一旦Uint32 3つ分
    this.#bwoView32 = new Uint32Array(this.#bwoBuffer);
    this.#bwoView8 = new Uint8Array(this.#bwoBuffer);

    // this.#tbBuffer = new ArrayBuffer(4); // Uint32 1つ分
    // this.#tbView32 = new Uint32Array(this.#tbBuffer);
    // this.#tbView = new DataView(this.#tbBuffer);
  }

  get [Symbol.toStringTag](): string {
    return `Uint${this.BIT_LENGTH}`;
  }

  #bitOperateUint32(a: uint32, b: uint32, op: _BitOperation): uint32 {
    // #bwoBuffer の 1～4バイトをa, 5～8をb, 9～12を結果 として使用
    this.#bwoView32[0] = a;
    this.#bwoView32[1] = b;
    this.#bwoView32[2] = 0;
    for (let i = 0; i < 4; i++) {
      if (op === _BitOperation.AND) {
        this.#bwoView8[i + 8] = this.#bwoView8[i] & this.#bwoView8[i + 4];
      } else if (op === _BitOperation.OR) {
        this.#bwoView8[i + 8] = this.#bwoView8[i] | this.#bwoView8[i + 4];
      } else if (op === _BitOperation.XOR) {
        this.#bwoView8[i + 8] = this.#bwoView8[i] ^ this.#bwoView8[i + 4];
      }
    }

    return this.#bwoView32[2];
  }

  fromBytes(
    bytes: Uint8Array<ArrayBuffer>,
    byteOrder: byteorder = ByteOrder.nativeOrder,
  ): T {
    Type.assertUint8Array(bytes, "bytes");
    Type.assertByteOrder(byteOrder, "byteOrder");
    if (bytes.length !== this.BYTE_LENGTH) {
      throw new RangeError("byte length unmatched.");
    }

    if (this.BYTE_LENGTH === 1) {
      const byte = bytes[0];
      if (byte > this.MAX_VALUE) {
        throw new RangeError("parse result is overflowed.");
      }
      return byte as T;
    }

    //XXX 32以下はUint32Arrayにした方が多分速い

    const x = (byteOrder === ByteOrder.LITTLE_ENDIAN)
      ? [...bytes]
      : [...bytes].reverse();

    let result = x[0];
    for (let i = 1; i < x.length; i++) {
      result += x[i] * (0x100 ** i);
    }

    if (result > this.MAX_VALUE) { // BIT_LENGTH % 8 === 0のときは発生しない
      throw new RangeError("parse result is overflowed.");
    }
    return result as T;
  }

  toBytes(
    value: T,
    byteOrder: byteorder = ByteOrder.nativeOrder,
  ): Uint8Array<ArrayBuffer> {
    this.#assert(value, "value");
    Type.assertByteOrder(byteOrder, "byteOrder");

    if (this.BYTE_LENGTH === 1) {
      return Uint8Array.of(value);
    }

    const bytes: Array<uint8> = [];
    bytes.push((value % 0x100) as uint8);
    for (let i = 2; i <= 6; i++) { // 16-48
      if (this.BIT_LENGTH >= (BITS_PER_BYTE * i)) {
        bytes.push(_getByteByPosition(value, i));
      }
    }
    return Uint8Array.from(
      (byteOrder === ByteOrder.LITTLE_ENDIAN) ? bytes : bytes.reverse(),
    );

    // 遅い
    // if (byteOrder === ByteOrder.nativeOrder) {
    //   this.#tbView32[0] = value;
    // } else {
    //   this.#tbView.setUint32(0, value, byteOrder === ByteOrder.LITTLE_ENDIAN);
    // }
    // const sliced = (byteOrder === ByteOrder.LITTLE_ENDIAN)
    //   ? this.#tbBuffer.slice(0, this.BYTE_LENGTH)
    //   : this.#tbBuffer.slice(
    //     Uint32.BYTE_LENGTH - this.BYTE_LENGTH,
    //     Uint32.BYTE_LENGTH,
    //   );
    // return new Uint8Array(sliced);
  }

  bitwiseAnd(a: T, b: T): T {
    this.#assert(a, "a");
    this.#assert(b, "b");

    if (this.BIT_LENGTH < 32) {
      return ((a & b) & this.MAX_VALUE) as T; //XXX 何故「& MAX_VALUE」を付けたんだっけ？
    } else if (this.BIT_LENGTH === 32) {
      return this.#bitOperateUint32(a, b, _BitOperation.AND) as T;
    }

    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const aBytes = this.toBytes(a);
    const bBytes = this.toBytes(b);
    const r = new Uint8Array(this.BYTE_LENGTH);
    for (let i = 0; i < r.length; i++) {
      r[i] = aBytes[i] & bBytes[i];
    }
    return this.fromBytes(r);
  }

  bitwiseOr(a: T, b: T): T {
    this.#assert(a, "a");
    this.#assert(b, "b");

    if (this.BIT_LENGTH < 32) {
      return ((a | b) & this.MAX_VALUE) as T;
    } else if (this.BIT_LENGTH === 32) {
      return this.#bitOperateUint32(a, b, _BitOperation.OR) as T;
    }

    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const aBytes = this.toBytes(a);
    const bBytes = this.toBytes(b);
    const r = new Uint8Array(this.BYTE_LENGTH);
    for (let i = 0; i < r.length; i++) {
      r[i] = aBytes[i] | bBytes[i];
    }
    return this.fromBytes(r);
  }

  bitwiseXOr(a: T, b: T): T {
    this.#assert(a, "a");
    this.#assert(b, "b");

    if (this.BIT_LENGTH < 32) {
      return ((a ^ b) & this.MAX_VALUE) as T;
    } else if (this.BIT_LENGTH === 32) {
      return this.#bitOperateUint32(a, b, _BitOperation.XOR) as T;
    }

    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const aBytes = this.toBytes(a);
    const bBytes = this.toBytes(b);
    const r = new Uint8Array(this.BYTE_LENGTH);
    for (let i = 0; i < r.length; i++) {
      r[i] = aBytes[i] ^ bBytes[i];
    }
    return this.fromBytes(r);
  }

  rotateLeft(value: T, offset: safeint): T {
    this.#assert(value, "value");
    Type.assertSafeInt(offset, "offset");

    const normalizedOffset = _normalizeOffset(offset, this.BIT_LENGTH);
    if (normalizedOffset === 0) {
      return value;
    }

    if (this.BIT_LENGTH < 32) {
      return (((value << normalizedOffset) |
        (value >> (this.BIT_LENGTH - normalizedOffset))) & this.MAX_VALUE) as T;
    }

    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const bs = BigInt(value);
    return Number(
      ((bs << BigInt(normalizedOffset)) |
        (bs >> BigInt(this.BIT_LENGTH - normalizedOffset))) &
        BigInt(this.MAX_VALUE),
    ) as T;
    //XXX 多分bigint使うと遅い
  }

  truncate(value: safeint): T {
    Type.assertSafeInt(value, "value");

    if ((value >= 0) && (value <= this.MAX_VALUE)) {
      return value as T;
    }

    if (value > 0) {
      return (value % this.#size) as T;
    } else {
      return (this.#size + (value % this.#size)) as T;
    }
  }

  saturate(value: safeint): T {
    Type.assertSafeInt(value, "value");
    return SafeInt.clampToRange(value, [this.MIN_VALUE, this.MAX_VALUE]) as T;
  }
}

const Uint6: RangedInt<uint6> = new _Uint(Uint6Info, Type.assertUint6);
Object.freeze(Uint6);
// defineProperty(s)だとIntelliSense上で反映されないので、インスタンス生成後にfreezeする
// //（コンストラクター内でfreezeするとextendsできなくなる）

const Uint7: RangedInt<uint7> = new _Uint(Uint7Info, Type.assertUint7);
Object.freeze(Uint7);

const Uint8: RangedInt<uint8> = new _Uint(Uint8Info, Type.assertUint8);
Object.freeze(Uint8);

const Uint16: RangedInt<uint16> = new _Uint(Uint16Info, Type.assertUint16);
Object.freeze(Uint16);

const Uint24: RangedInt<uint24> = new _Uint(Uint24Info, Type.assertUint24);
Object.freeze(Uint24);

const Uint32: RangedInt<uint32> = new _Uint(Uint32Info, Type.assertUint32);
Object.freeze(Uint32);

export { Uint16, Uint24, Uint32, Uint6, Uint7, Uint8 };
