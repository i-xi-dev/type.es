export const EventType = {
  // CUSTOM: "CustomEvent", Node.jsにもDENOにもある
  PROGRESS: "ProgressEvent", // Node.jsに無い
} as const;

export type EventType = typeof EventType[keyof typeof EventType];
