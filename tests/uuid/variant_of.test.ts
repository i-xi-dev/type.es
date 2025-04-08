import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.variantOf()", () => {
  assertStrictEquals(Uuid.variantOf("00000000-0000-0000-0000-000000000000"), 0);
  assertStrictEquals(
    Uuid.variantOf("00000000-0000-0000-F000-000000000000"),
    15,
  );
  assertStrictEquals(
    Uuid.variantOf("urn:uuid:00000000-0000-0000-F000-000000000000"),
    15,
  );
  assertStrictEquals(
    Uuid.variantOf("00000000-0000-0000-f000-000000000000"),
    15,
  );

  assertThrows(
    () => {
      Uuid.variantOf(0 as unknown as string);
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );

  assertThrows(
    () => {
      Uuid.variantOf("");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.variantOf("00000000000000000000000000000000");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.variantOf("00000000-0000-0000-0000-00000000000");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
  assertThrows(
    () => {
      Uuid.variantOf("00000000-0000-0000-G000-000000000000");
    },
    TypeError,
    "`value` must be text representation of UUID.",
  );
});
