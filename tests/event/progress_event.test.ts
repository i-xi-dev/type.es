import { assertStrictEquals } from "@std/assert";
import { EventFactory } from "../../mod.ts";

Deno.test("EventFactory.createProgressEvent(string)", () => {
  const event1 = EventFactory.createProgressEvent("progress-x");
  assertStrictEquals(event1.lengthComputable, false);
  assertStrictEquals(event1.loaded, 0);
  assertStrictEquals(event1.total, 0);
  assertStrictEquals(event1.type, "progress-x");
});

Deno.test("EventFactory.createProgressEvent(string, {})", () => {
  const event2 = EventFactory.createProgressEvent("progress-x", {});
  assertStrictEquals(event2.lengthComputable, false);
  assertStrictEquals(event2.loaded, 0);
  assertStrictEquals(event2.total, 0);
  assertStrictEquals(event2.type, "progress-x");
});

Deno.test("EventFactory.createProgressEvent(string, { lengthComputable: boolean })", () => {
  const event3 = EventFactory.createProgressEvent("progress-x", {
    lengthComputable: true,
  });
  assertStrictEquals(event3.lengthComputable, true);
  assertStrictEquals(event3.loaded, 0);
  assertStrictEquals(event3.total, 0);
  assertStrictEquals(event3.type, "progress-x");
});

Deno.test("EventFactory.createProgressEvent(string, { loaded: number })", () => {
  const event4 = EventFactory.createProgressEvent("progress-x", { loaded: 11 });
  assertStrictEquals(event4.lengthComputable, false);
  assertStrictEquals(event4.loaded, 11);
  assertStrictEquals(event4.total, 0);
  assertStrictEquals(event4.type, "progress-x");
});

Deno.test("EventFactory.createProgressEvent(string, { total: number })", () => {
  const event5 = EventFactory.createProgressEvent("progress-x", { total: 22 });
  assertStrictEquals(event5.lengthComputable, false);
  assertStrictEquals(event5.loaded, 0);
  assertStrictEquals(event5.total, 22);
  assertStrictEquals(event5.type, "progress-x");
});
