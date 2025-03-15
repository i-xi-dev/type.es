import { _ProgressEvent } from "./compat/_progress_event.ts";
import { EventType } from "./type.ts";

let _ProgressEventCtor: {
  new (type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
};
if ("ProgressEvent" in globalThis) {
  _ProgressEventCtor = ProgressEvent;
} else {
  // const { _ProgressEvent } = await import("./compat/_progress_event.ts");
  _ProgressEventCtor = _ProgressEvent;
}

export function create(
  eventType: EventType,
  type: string,
  eventInit?: EventInit | ProgressEventInit,
) {
  switch (eventType) {
    case EventType.PROGRESS:
      return _createProgressEvent(type, eventInit);
    default:
      throw new TypeError("`eventType` unknown.");
  }
}

function _createProgressEvent(
  type: string,
  eventInitDict?: ProgressEventInit,
) {
  return new _ProgressEventCtor(type, eventInitDict);
}
