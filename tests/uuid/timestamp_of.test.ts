import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.timestampOf()", () => {
  const t1 = Math.trunc(performance.timeOrigin + performance.now());
  console.log(new Date(t1).toISOString());

  const u1 = Uuid.generateUnixTimeBased();
  const t2 = Uuid.timestampOf(u1);
  console.log(new Date(t2).toISOString());

  const t3 = Math.trunc(performance.timeOrigin + performance.now());
  console.log(new Date(t3).toISOString());

  assertStrictEquals(Number.isSafeInteger(t2), true);
  assertStrictEquals(t1 <= t2, true);
  assertStrictEquals(t2 <= t3, true);

  assertThrows(
    () => {
      Uuid.timestampOf("");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.timestampOf(Uuid.generateRandom());
    },
    TypeError,
    "`value` must be text representation of UUIDv7.",
  );
});
