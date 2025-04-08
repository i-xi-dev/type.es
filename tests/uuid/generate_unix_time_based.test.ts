import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.generateUnixTimeBased()", () => {
  const uuid = Uuid.generateUnixTimeBased();
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(uuid)), true);
  assertStrictEquals(Uuid.versionOf(uuid), 7);
  assertStrictEquals(
    /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      .test(uuid),
    true,
  );

  let prev = Uuid.nil();
  let curr = "";
  for (let i = 0; i <= 100; i++) {
    curr = Uuid.generateUnixTimeBased();
    // console.log(curr);
    assertStrictEquals(curr > prev, true);
    prev = curr;
  }
});
