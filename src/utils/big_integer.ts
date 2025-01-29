import {
  assertBigInt,
  assertBigIntInSafeIntegerRange,
} from "../type/bigint.ts";
import { type safeint } from "../type/number.ts";

export function min<T extends bigint>(value0: T, ...values: T[]): T {
  assertBigInt(value0, `value0`);

  let provMin = value0;
  let value: T;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    assertBigInt(value, `values[${i}]`);

    if (value < provMin) {
      provMin = value;
    }
  }
  return provMin;
}

export function max<T extends bigint>(value0: T, ...values: T[]): T {
  assertBigInt(value0, `value0`);

  let provMax = value0;
  let value: T;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    assertBigInt(value, `values[${i}]`);

    if (value > provMax) {
      provMax = value;
    }
  }
  return provMax;
}

const _min = min;
const _max = max;

export function clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  assertBigInt(value, "value");
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return _min(_max(value, min), max) as T;
}

//XXX fromNumber

export function toNumber(value: bigint): safeint {
  assertBigIntInSafeIntegerRange(value, "value");
  return Number(value);
}
