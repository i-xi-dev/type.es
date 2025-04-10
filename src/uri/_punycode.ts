import { type safeint } from "../_typedef/mod.ts";
import { String as ExString } from "../basics/mod.ts";

const { EMPTY } = ExString;

// RFC 3492のデコーダーのみ実装
// 正しくエンコードされた文字列のデコードのみ対応（オーバーフロー検出などは省いている）なので、URL.hostnameをデコードする以外の用途は想定していない

// https://datatracker.ietf.org/doc/html/rfc3492#section-5
const _BASE = 36;
const _TMIN = 1;
const _TMAX = 26;
const _SKEW = 38;
const _DAMP = 700;
const _INITIAL_BIAS = 72;
const _INITIAL_N = 128;

const _BASE_MINUS_TMIN = _BASE - _TMIN;

/**
 * Implements https://datatracker.ietf.org/doc/html/rfc3492#section-6.1
 */
function _adaptBias(
  delta: safeint,
  numpoints: safeint,
  firsttime: boolean,
): safeint {
  delta = Math.trunc(delta / ((firsttime === true) ? _DAMP : 2));
  delta = delta + Math.trunc(delta / numpoints);
  let k: safeint;
  for (
    k = 0;
    delta > Math.trunc(_BASE_MINUS_TMIN * _TMAX / 2);
    k = k + _BASE
  ) {
    delta = Math.trunc(delta / _BASE_MINUS_TMIN);
  }
  return k + Math.trunc(((_BASE_MINUS_TMIN + 1) * delta) / (delta + _SKEW));
}

function _splitInput(
  input: string,
): { basicString: string; extendedString: string } {
  // URL#hostnameをinputにする前提なので、エラーはありえない
  // if (/^[\u0000-\u007F]*$/.test(input) !== true) {
  //   throw new RangeError("input");
  // }

  const delimIndex = input.lastIndexOf("-");
  let basicString: string;
  let extendedString: string;
  if (delimIndex < 0) {
    basicString = EMPTY;
    extendedString = input;
  } else {
    basicString = input.substring(0, delimIndex);
    extendedString = input.substring(delimIndex + 1);
  }

  // URL#hostnameをinputにする前提なので、エラーはありえない
  // if (/^[0-9a-z]+$/.test(extendedString) !== true) { // 正規表現は、_BASE===36として固定値。大文字もあり得ない物とする
  //   throw new RangeError("input (2)");
  // }

  return {
    basicString,
    extendedString,
  };
}

type _DigitIteratorResult = {
  digit: safeint;
  isLast: boolean;
};

function* _digitIteratorOf(
  extendedString: string,
): Generator<_DigitIteratorResult, void, void> {
  const codepoints = [...extendedString].map((char) => char.charCodeAt(0));

  let i: safeint;
  for (i = 0; i < codepoints.length; i++) {
    yield {
      digit: _digitValueOf(codepoints[i]),
      isLast: (i === (codepoints.length - 1)),
    };
  }
}

function _digitValueOf(codepoint: safeint): safeint {
  // a-z
  if (codepoint >= 0x61 && codepoint <= 0x7A) {
    return codepoint - 0x61;
  }

  // a-z以外は0-9であることは事前にチェック済の前提
  return codepoint - 0x16;
}

function _computeThreshold(k: safeint, bias: safeint): safeint {
  if (k <= bias) {
    return _TMIN;
  } else if (k >= (bias + _TMAX)) {
    return _TMAX;
  }
  return k - bias;
}

/**
 * Implements https://datatracker.ietf.org/doc/html/rfc3492#section-6.2
 */
export function _decode(input: string): string {
  // URL#hostnameをinputにする前提なので、エラーはありえない
  // if (typeof input !== "string") {
  //   throw new TypeError("input");
  // }

  const { basicString, extendedString } = _splitInput(input);
  const output = [...basicString];

  let n = _INITIAL_N;
  let i = 0;
  let bias = _INITIAL_BIAS;

  let doLoopEnd = false;
  const digitIterator = _digitIteratorOf(extendedString);
  do {
    const oldi = i;
    let w = 1;

    for (let k = _BASE; k < Number.MAX_SAFE_INTEGER; k = k + _BASE) {
      const { value, done } = digitIterator.next();
      let digit: safeint;
      if (value && (done !== true)) {
        digit = value.digit;
        doLoopEnd = value.isLast === true;
      } else {
        // URL#hostnameをinputにする前提なので、エラーはありえないはず
        throw new Error("#1");
      }

      i = i + digit * w; // 省略: overflow検出
      const t = _computeThreshold(k, bias);

      if (digit < t) {
        break;
      }
      w = w * (_BASE - t); // 省略: overflow検出
    }

    const currPos = output.length + 1;
    bias = _adaptBias(i - oldi, currPos, oldi === 0);
    n = n + Math.trunc(i / currPos); // 省略: overflow検出
    i = i % currPos;

    // 不要: {if n is a basic code point then fail}

    output.splice(i, 0, String.fromCodePoint(n));

    i = i + 1;
  } while (doLoopEnd !== true);

  return output.join(EMPTY);
}
