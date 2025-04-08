import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.versionOf()", () => {
  assertStrictEquals(Uuid.versionOf("00000000-0000-0000-0000-000000000000"), 0);
  assertStrictEquals(
    Uuid.versionOf("00000000-0000-F000-0000-000000000000"),
    15,
  );
  assertStrictEquals(
    Uuid.versionOf("urn:uuid:00000000-0000-F000-0000-000000000000"),
    15,
  );
  assertStrictEquals(
    Uuid.versionOf("00000000-0000-f000-0000-000000000000"),
    15,
  );

  assertThrows(
    () => {
      Uuid.versionOf(0 as unknown as string);
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );

  assertThrows(
    () => {
      Uuid.versionOf("");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.versionOf("00000000000000000000000000000000");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.versionOf("00000000-0000-0000-0000-00000000000");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.versionOf("00000000-0000-0000-G000-000000000000");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
});
