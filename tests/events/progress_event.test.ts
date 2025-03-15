import { assertStrictEquals, assertThrows } from "@std/assert";
import { Events } from "../../mod.ts";

const { EventFactory, EventType } = Events;

Deno.test("Events.EventFactory.createProgressEvent()", () => {
  const event1 = EventFactory.create(EventType.PROGRESS, "progress-x");
  assertStrictEquals(event1.lengthComputable, false);
  assertStrictEquals(event1.loaded, 0);
  assertStrictEquals(event1.total, 0);
  assertStrictEquals(event1.type, "progress-x");

  const event2 = EventFactory.create(EventType.PROGRESS, "progress-x", {});
  assertStrictEquals(event2.lengthComputable, false);
  assertStrictEquals(event2.loaded, 0);
  assertStrictEquals(event2.total, 0);
  assertStrictEquals(event2.type, "progress-x");

  assertThrows(
    () => {
      EventFactory.create("x" as Events.EventType, "progress-x", {});
    },
    TypeError,
    "`eventType` unknown.",
  );
});

Deno.test("Events.EventFactory.createProgressEvent() - lengthComputable", () => {
  const event3 = EventFactory.create(EventType.PROGRESS, "progress-x", {
    lengthComputable: true,
  });
  assertStrictEquals(event3.lengthComputable, true);
  assertStrictEquals(event3.loaded, 0);
  assertStrictEquals(event3.total, 0);
  assertStrictEquals(event3.type, "progress-x");
});

Deno.test("Events.EventFactory.createProgressEvent() - loaded", () => {
  const event4 = EventFactory.create(EventType.PROGRESS, "progress-x", {
    loaded: 11,
  });
  assertStrictEquals(event4.lengthComputable, false);
  assertStrictEquals(event4.loaded, 11);
  assertStrictEquals(event4.total, 0);
  assertStrictEquals(event4.type, "progress-x");
});

Deno.test("Events.EventFactory.createProgressEvent() - total", () => {
  const event5 = EventFactory.create(EventType.PROGRESS, "progress-x", {
    total: 22,
  });
  assertStrictEquals(event5.lengthComputable, false);
  assertStrictEquals(event5.loaded, 0);
  assertStrictEquals(event5.total, 22);
  assertStrictEquals(event5.type, "progress-x");
});
