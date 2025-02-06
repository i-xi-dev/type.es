export const OverflowMode = {
  EXCEPTION: "exception",
  TRUNCATE: "truncate",
  SATURATE: "saturate",
} as const;

export type OverflowMode = typeof OverflowMode[keyof typeof OverflowMode];
