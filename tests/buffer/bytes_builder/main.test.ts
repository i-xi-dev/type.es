import {
  assertNotStrictEquals,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";
import { Buffer } from "../../../mod.ts";

const { BytesBuilder } = Buffer;

Deno.test("new Buffer.BytesBuilder()/capacity/length/append() - number", () => {
  const b = new BytesBuilder({ capacity: 2 });
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 0);

  b.append(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 1);
  assertStrictEquals(b.toArrayBuffer().byteLength, 1);

  b.append(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 2);
  assertStrictEquals(b.toArrayBuffer().byteLength, 2);

  b.append(255);
  assertStrictEquals(b.capacity, 1048576 + 2);
  assertStrictEquals(b.length, 3);
  assertStrictEquals(b.toArrayBuffer().byteLength, 3);
});

Deno.test("new Buffer.BytesBuilder()/capacity/length/append() - BufferSource", () => {
  const b = new BytesBuilder();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 0);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 12);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 24);

  const b2 = b.toUint8Array();
  assertStrictEquals(
    JSON.stringify(Array.from(b2)),
    "[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]",
  );
});

Deno.test("new Buffer.BytesBuilder()/capacity/length/append() - 2", () => {
  const b = new BytesBuilder();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 0);

  b.append(Uint16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 24);

  b.append(Uint16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 48);

  // const b2 = b.slice();
  // if (BufferUtils.isBigEndian()) {
  //   assertStrictEquals(
  //     JSON.stringify(Array.from(b2)),
  //     "[0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12]",
  //   );
  // } else {
  //   assertStrictEquals(
  //     JSON.stringify(Array.from(b2)),
  //     "[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0]",
  //   );
  // }
});

Deno.test("new Buffer.BytesBuilder()/capacity/length/append()", () => {
  const b = new BytesBuilder({ capacity: 10 });

  assertStrictEquals(b.capacity, 10);
  assertStrictEquals(b.length, 0);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1048576);
  assertStrictEquals(b.length, 12);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1048576);
  assertStrictEquals(b.length, 24);

  // const copy1 = b.subarray();
  // assertStrictEquals(copy1.buffer, b.subarray().buffer);
  // assertStrictEquals(copy1.byteLength, 24);
  // assertStrictEquals(copy1.buffer.byteLength, 10485760);
  // assertStrictEquals(
  //   [...copy1].map((b) => b.toString(10)).join(","),
  //   "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12",
  // );

  const copy2 = b.toUint8Array();
  assertNotStrictEquals(copy2, b.toUint8Array());
  assertNotStrictEquals(copy2.buffer, b.toUint8Array().buffer);
  assertStrictEquals(copy2.byteLength, 24);
  assertStrictEquals(copy2.buffer.byteLength, 24);
  assertStrictEquals(
    [...copy2].map((b) => b.toString(10)).join(","),
    "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12",
  );
});

Deno.test("new Buffer.BytesBuilder() - capacityMax", () => {
  const b = new BytesBuilder({ capacity: 4, capacityMax: 8 });
  b.append(255);
  assertStrictEquals(b.length, 1);
  assertStrictEquals(b.capacity, 4);
  b.append(255);
  b.append(255);
  b.append(255);
  assertStrictEquals(b.length, 4);
  assertStrictEquals(b.capacity, 4);
  b.append(255);
  assertStrictEquals(b.length, 5);
  assertStrictEquals(b.capacity, 8);
  b.append(255);
  b.append(255);
  b.append(255);
  assertStrictEquals(b.length, 8);
  assertStrictEquals(b.capacity, 8);

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "Max byte length exceeded.",
  );
});

Deno.test("Buffer.BytesBuilder.prototype.append()", () => {
  const b = new BytesBuilder();
  b.append(255);
  b.append(Uint8Array.of(255));

  assertThrows(
    () => {
      b.append([255] as unknown as Uint8Array);
    },
    Error,
    "`byteOrBytes` must be a `BufferSource` or an 8-bit unsigned integer.",
  );
});
