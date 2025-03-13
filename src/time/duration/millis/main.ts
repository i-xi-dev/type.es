import * as Type from "../../../type/mod.ts";
import { Number as ExNumber } from "../../../numerics/mod.ts";

const _SECOND = 1_000;

const _MINUTE = 60_000;

const _HOUR = 3_600_000;

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
