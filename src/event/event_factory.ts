import { _ProgressEvent } from "./compat/_progress_event.ts";

export function createProgressEvent(
  type: string,
  eventInitDict?: ProgressEventInit,
) {
  return ("ProgressEvent" in globalThis)
    ? new ProgressEvent(type, eventInitDict)
    : new _ProgressEvent(type, eventInitDict);
}
