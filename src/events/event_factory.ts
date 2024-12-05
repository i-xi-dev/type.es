import { _ProgressEvent } from "./compat/_progress_event.ts";

let _ProgressEventCtor: {
  new (type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
};
if ("ProgressEvent" in globalThis) {
  _ProgressEventCtor = ProgressEvent;
} else {
  // const { _ProgressEvent } = await import("./compat/_progress_event.ts");
  _ProgressEventCtor = _ProgressEvent;
}

export function createProgressEvent(
  type: string,
  eventInitDict?: ProgressEventInit,
) {
  return new _ProgressEventCtor(type, eventInitDict);
}
