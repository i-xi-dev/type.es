// import { type safeint } from "../../_typedef/mod.ts";

export const Unit = {
  AUTO: "auto",
  // year, month, week 対応予定なし
  DAY: "day",
  HOUR: "hour",
  MINUTE: "minute",
  SECOND: "second",
  // millisecond, microsecond, nanosecond 対応予定なし
} as const;

export type Unit = typeof Unit[keyof typeof Unit];

export type ToStringOptions = {
  //XXX fractionalSecondDigits?: safeint; 一旦3固定
  largestUnit?: Unit;
  // smallestUnit 対応予定なし
  // roundingMode: truncで固定
  //XXX 各要素の前方ゼロ埋め
};
