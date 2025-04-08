import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.generateRandom()", () => {
  const uuids = [];
  for (let i = 0; i < 100; i++) {
    const uuid = Uuid.generateRandom();
    console.log(uuid);
    assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(uuid)), true);
    assertStrictEquals(Uuid.versionOf(uuid), 4);
    assertStrictEquals(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        .test(uuid),
      true,
    );
    uuids.push(uuid);
  }
  assertStrictEquals(uuids.length, (new Set(uuids)).size);
});
