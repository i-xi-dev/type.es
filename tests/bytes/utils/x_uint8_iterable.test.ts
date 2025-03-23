// import { assertStrictEquals, assertThrows } from "@std/assert";
// import { Bytes } from "../../../mod.ts";

// const { BytesUtils } = Bytes;

// Deno.test("Bytes.BytesUtils.toUint8Iterable(Uint8Array)", () => {
//   assertThrows(
//     () => {
//       BytesUtils.toUint8Iterable(0 as unknown as ArrayBuffer);
//     },
//     TypeError,
//     "`value` must be an `ArrayBuffer`.",
//   );

//   assertThrows(
//     () => {
//       BytesUtils.toUint8Iterable(1 as unknown as ArrayBuffer);
//     },
//     TypeError,
//     "`value` must be an `ArrayBuffer`.",
//   );

//   assertStrictEquals(
//     JSON.stringify([
//       ...BytesUtils.toUint8Iterable(Uint8Array.of().buffer),
//     ]),
//     "[]",
//   );
//   assertStrictEquals(
//     JSON.stringify([
//       ...BytesUtils.toUint8Iterable(Uint8Array.of(1, 0, 3, 2).buffer),
//     ]),
//     "[1,0,3,2]",
//   );
//   const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 1, 1, 1, 1);
//   const b2b = new Uint8Array(b2.buffer, 4, 4);
//   assertStrictEquals(
//     JSON.stringify([
//       ...BytesUtils.toUint8Iterable(b2b.buffer),
//     ]),
//     "[0,0,0,0,1,0,3,2,1,1,1,1]",
//   );
// });
