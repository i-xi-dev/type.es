import * as Type from "../../type/mod.ts";
import { Radix } from "../../basics/mod.ts";

type _degs = number;
type _rads = number;

const _ZERO_TURN_DEGS = 0;
const _ONE_TURN_DEGS = 360;

//XXX 開始角度指定いる？ -180から180までとか
function _normalizeDegrees(degrees: _degs): _degs {
  const t = degrees % _ONE_TURN_DEGS;
  return (t < _ZERO_TURN_DEGS) ? (t + _ONE_TURN_DEGS) : t;
}

function _radiansToDegrees(radians: _rads): _degs {
  const degrees = radians * (180 / Math.PI);
  return _normalizeDegrees(degrees);
}

function _degreesToRadians(degrees: _degs): _rads {
  return _normalizeDegrees(degrees) * (Math.PI / 180);
}

/*XXX クラス分ける？
  RadiansFormat
    小数部桁数min,max
  DegreesFormat
    0.0° | 0°0′0.0″
    小数部桁数min,max

  */

export class Angle {
  #degrees: _degs;
  //XXX とりあえず無加工で整数部が一番大きいdegreeで持ったが
  // turn (× 10X)とかで持つ？ (turn × 2piでradian)

  private constructor(degrees: _degs) {
    this.#degrees = _normalizeDegrees(degrees);
  }

  static ofDegrees(degrees: _degs): Angle {
    Type.assertFiniteNumber(degrees, "degrees");
    return new Angle(degrees);
  }

  static ofRadians(radians: _rads): Angle {
    Type.assertFiniteNumber(radians, "radians");
    return new Angle(_radiansToDegrees(radians));
  }

  toDegrees(): _degs {
    return this.#degrees;
  }

  toRadians(): _rads {
    return _degreesToRadians(this.#degrees);
  }

  // 小数部桁数は Number.prototype.toStringに依存
  toString(): string {
    return `${this.toRadians().toString(Radix.DECIMAL)} rad`;
  }

  valueOf(): _degs {
    return _degreesToRadians(this.#degrees);
  }

  plusDegrees(degrees: _degs): Angle {
    Type.assertFiniteNumber(degrees, "degrees");
    return new Angle(this.#degrees + degrees);
  }

  plusRadians(radians: _rads): Angle {
    Type.assertFiniteNumber(radians, "radians");
    return new Angle(this.#degrees + _radiansToDegrees(radians));
  }
}
