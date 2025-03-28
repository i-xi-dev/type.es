import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

Deno.test("Text.fromBytes()", () => {
  const t0 = Text.fromBytes(Uint8Array.of());
  assertStrictEquals(t0, "");

  const t1 = Text.fromBytes(Uint8Array.of(49, 227, 129, 130, 51, 194, 169));
  assertStrictEquals(t1, "1あ3\u{A9}");

  assertThrows(
    () => {
      Text.fromBytes([] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "`bytes` must be an `Uint8Array<ArrayBuffer>`.",
  );
});
