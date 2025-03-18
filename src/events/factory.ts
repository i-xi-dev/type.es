import { _ProgressEvent } from "./compat/_progress_event.ts";
import { EventType } from "./type.ts";

export function create<
  TEvent extends (ProgressEvent<TTarget> | Event),
  TTarget extends EventTarget = EventTarget,
>(
  eventType: EventType,
  type: string,
  eventInit?: EventInit | ProgressEventInit,
): TEvent {
  switch (eventType) {
    case EventType.PROGRESS:
      return _createProgressEvent(type, eventInit) as TEvent;
    default:
      throw new TypeError("`eventType` unknown.");
  }
}

function _createProgressEvent<TTarget extends EventTarget = EventTarget>(
  type: string,
  eventInitDict?: ProgressEventInit,
): ProgressEvent<TTarget> {
  if ("ProgressEvent" in globalThis) {
    return new ProgressEvent(type, eventInitDict) as ProgressEvent<TTarget>;
  } else {
    return new _ProgressEvent(type, eventInitDict) as ProgressEvent<TTarget>;
  }
}
