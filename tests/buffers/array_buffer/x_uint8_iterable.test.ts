// import { assertStrictEquals, assertThrows } from "@std/assert";
// import { Buffers } from "../../../mod.ts";

// const { ArrayBuffer: ExArrayBuffer } = Buffers;

// Deno.test("Buffers.ArrayBuffer.toUint8Iterable(Uint8Array)", () => {
//   assertThrows(
//     () => {
//       ExArrayBuffer.toUint8Iterable(0 as unknown as ArrayBuffer);
//     },
//     TypeError,
//     "`value` must be an `ArrayBuffer`.",
//   );

//   assertThrows(
//     () => {
//       ExArrayBuffer.toUint8Iterable(1 as unknown as ArrayBuffer);
//     },
//     TypeError,
//     "`value` must be an `ArrayBuffer`.",
//   );

//   assertStrictEquals(
//     JSON.stringify([
//       ...ExArrayBuffer.toUint8Iterable(Uint8Array.of().buffer),
//     ]),
//     "[]",
//   );
//   assertStrictEquals(
//     JSON.stringify([
//       ...ExArrayBuffer.toUint8Iterable(Uint8Array.of(1, 0, 3, 2).buffer),
//     ]),
//     "[1,0,3,2]",
//   );
//   const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 1, 1, 1, 1);
//   const b2b = new Uint8Array(b2.buffer, 4, 4);
//   assertStrictEquals(
//     JSON.stringify([
//       ...ExArrayBuffer.toUint8Iterable(b2b.buffer),
//     ]),
//     "[0,0,0,0,1,0,3,2,1,1,1,1]",
//   );
// });
