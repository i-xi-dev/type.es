import * as Type from "../../type/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import { Radix, String as ExString } from "../../basics/mod.ts";
import { ToStringOptions, Unit } from "./_common.ts";

const _SECOND = 1_000;

const _MINUTE = 60_000;

const _HOUR = 3_600_000;

const _DAY = 86_400_000;

export function ofSeconds(seconds: number): number {
  Type.assertFiniteNumber(seconds, "seconds");
  return ExNumber.normalize(seconds * _SECOND);
}

export function toSeconds(millis: number): number {
  Type.assertFiniteNumber(millis, "millis");
  return ExNumber.normalize(millis / _SECOND);
}

export function ofMinutes(minutes: number): number {
  Type.assertFiniteNumber(minutes, "minutes");
  return ExNumber.normalize(minutes * _MINUTE);
}

export function toMinutes(millis: number): number {
  Type.assertFiniteNumber(millis, "millis");
  return ExNumber.normalize(millis / _MINUTE);
}

export function ofHours(hours: number): number {
  Type.assertFiniteNumber(hours, "hours");
  return ExNumber.normalize(hours * _HOUR);
}

export function toHours(millis: number): number {
  Type.assertFiniteNumber(millis, "millis");
  return ExNumber.normalize(millis / _HOUR);
}

export function ofDays(days: number): number {
  Type.assertFiniteNumber(days, "days");
  return ExNumber.normalize(days * _DAY);
}

export function toDays(millis: number): number {
  Type.assertFiniteNumber(millis, "millis");
  return ExNumber.normalize(millis / _DAY);
}

// Temporal.Durationと同形式のシリアライズ/デシリアライズを供するが、
// 当モジュールの「時間」はTemporal.Durationとは異なり絶対長を表しているので注意

// Y(年),M(月),W(週)には対応しない。Dを最大単位とする
//XXX 秒の小数部は一旦3桁までとする
export function fromString(value: string): number {
  Type.assertNonEmptyString(value, "value");

  const parts =
    /^(?<sign>[\-+]?)P(?<day>[0-9]+D)?(?:T(?<hr>[0-9]+H)?(?<min>[0-9]+M)?(?<sec>[0-9]+(?:[\.,]?[0-9]+)?S)?)?$/
      .exec(value);

  if (parts?.groups) {
    const { sign, day, hr, min, sec } = parts.groups;
    // d,h,m,sいずれも無ければフォーマット不正
    if (day || hr || min || sec) {
      const negative = sign === "-";
      const days = _p(day);
      const hours = _p(hr);
      const minutes = _p(min);
      const { seconds, millis } = _pS(sec);
      const total = ofDays(days) + ofHours(hours) + ofMinutes(minutes) +
        ofSeconds(seconds) + millis;
      return (negative === true) ? -total : total;
    }
  }

  throw new RangeError("`value` is invalid format.");
}

function _p(str?: string): number {
  // 接尾辞はparseIntが無視するので付けたまま
  return Type.isNonEmptyString(str)
    ? Number.parseInt(str, Radix.DECIMAL)
    : ExNumber.ZERO;
}

function _pS(str?: string): { seconds: number; millis: number } {
  if (Type.isNonEmptyString(str)) {
    const [sec, msec] = str.replace(",", ".").split(".");
    const seconds = _p(sec);
    const millis = Type.isNonEmptyString(msec)
      ? Number.parseInt(msec.substring(0, 3).padEnd(3, "0"), Radix.DECIMAL)
      : ExNumber.ZERO;

    return {
      seconds,
      millis,
    };
  }

  return {
    seconds: ExNumber.ZERO,
    millis: ExNumber.ZERO,
  };
}

// Y(年),M(月),W(週)には対応しない。Dを最大単位とする
export function toString(millis: number, options?: ToStringOptions): string {
  Type.assertFiniteNumber(millis, "millis");

  const absMillis = Math.abs(Math.trunc(millis)); //XXX 一旦秒の小数部3桁固定(ミリ秒)とするのでmillisの小数部は切り捨てる
  const largestUnit = _resolveLargestUnit(absMillis, options);
  const sign = (millis < 0) ? "-" : ExString.EMPTY;

  let result = sign + "P";
  let work = absMillis;
  let tPut = false;
  switch (largestUnit) {
    case Unit.DAY:
      result += _fD(toDays(work)) + "D";
      work %= _DAY;
      /* falls through */

    case Unit.HOUR:
      result += "T";
      tPut = true;

      result += _fT(toHours(work)) + "H";
      work %= _HOUR;
      /* falls through */

    case Unit.MINUTE:
      if (tPut !== true) {
        result += "T";
        tPut = true;
      }

      result += _fT(toMinutes(work)) + "M";
      work %= _MINUTE;
      /* falls through */

    case Unit.SECOND:
    default:
      if (tPut !== true) {
        result += "T";
      }

      result += _fT(toSeconds(work));
      work %= _SECOND;

      //XXX 一旦小数部3桁固定とする
      result += ".";
      result += work.toString(10).padStart(3, "0");
      result += "S";

      break;
  }

  return result;
}

function _resolveLargestUnit(
  absMillis: number,
  options?: ToStringOptions,
): Unit {
  const unit = Object.values(Unit).includes(options?.largestUnit as Unit)
    ? (options?.largestUnit as Unit)
    : Unit.AUTO;
  const isAuto = unit === Unit.AUTO;
  if ((options?.largestUnit === Unit.DAY) || (isAuto && (absMillis >= _DAY))) {
    return Unit.DAY;
  } else if (
    (options?.largestUnit === Unit.HOUR) || (isAuto && (absMillis >= _HOUR))
  ) {
    return Unit.HOUR;
  } else if (
    (options?.largestUnit === Unit.MINUTE) || (isAuto && (absMillis >= _MINUTE))
  ) {
    return Unit.MINUTE;
  }

  return Unit.SECOND;
}

function _fD(num: number): string {
  return Math.trunc(num).toString(10);
}

function _fT(num: number): string {
  return Math.trunc(num).toString(10).padStart(2, "0");
}
