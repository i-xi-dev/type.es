/**
 * The loading status.
 */
export const Status = {
  READY: "ready",
  RUNNING: "running",
  COMPLETED: "completed",
  ABORTED: "aborted",
  ERROR: "error",
} as const;

export type Status = typeof Status[keyof typeof Status];
