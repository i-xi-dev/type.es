import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

Deno.test("Text.fromBytes()", () => {
  const t0 = Text.fromBytes(Uint8Array.of());
  assertStrictEquals(t0, "");

  const t1 = Text.fromBytes(Uint8Array.of(49, 227, 129, 130, 51, 194, 169));
  assertStrictEquals(t1, "1あ3\u{A9}");

  const t1b = Text.fromBytes(
    Uint8Array.of(0xEF, 0xBB, 0xBF, 49, 227, 129, 130, 51, 194, 169),
  );
  assertStrictEquals(t1b, "\uFEFF1あ3\u{A9}");

  const t1x = Text.fromBytes(
    Uint8Array.of(49, 0xEF, 0xBB, 0xBF, 227, 129, 130, 51, 194, 169),
  );
  assertStrictEquals(t1x, "1\uFEFFあ3\u{A9}");

  assertThrows(
    () => {
      Text.fromBytes([] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "`bytes` must be an `Uint8Array<ArrayBuffer>`.",
  );

  // non-UTF-8 bytes
  assertThrows(
    () => {
      Text.fromBytes(Uint8Array.of(239));
    },
    TypeError,
    "", // TextDecoderがスローする "The encoded data is not valid"
  );

  // lone surrogate
  assertThrows(
    () => {
      Text.fromBytes(Uint8Array.of(237, 160, 0));
    },
    TypeError,
    "", // TextDecoderがスローする "The encoded data is not valid"
  );

  const op = { removeBOM: true };

  const bt1b = Text.fromBytes(
    Uint8Array.of(0xEF, 0xBB, 0xBF, 49, 227, 129, 130, 51, 194, 169),
    op,
  );
  assertStrictEquals(bt1b, "1あ3\u{A9}");

  const bt1x = Text.fromBytes(
    Uint8Array.of(49, 0xEF, 0xBB, 0xBF, 227, 129, 130, 51, 194, 169),
    op,
  );
  assertStrictEquals(bt1x, "1\uFEFFあ3\u{A9}");
});
