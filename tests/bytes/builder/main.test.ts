import {
  assertNotStrictEquals,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";
import { ByteOrder, Bytes } from "../../../mod.ts";

const { Builder } = Bytes;

Deno.test("Bytes.Builder.create()/capacity/length/appendByte()", () => {
  const b = Builder.create({ capacity: 2 });
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 0);

  b.appendByte(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 1);
  assertStrictEquals(b.duplicateAsArrayBuffer().byteLength, 1);

  b.appendByte(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 2);
  assertStrictEquals(b.duplicateAsArrayBuffer().byteLength, 2);

  b.appendByte(255);
  assertStrictEquals(b.capacity, 1048576 + 2);
  assertStrictEquals(b.length, 3);
  assertStrictEquals(b.duplicateAsArrayBuffer().byteLength, 3);

  assertThrows(
    () => {
      b.appendByte(-1);
    },
    Error,
    "`byte` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b.appendByte(256);
    },
    Error,
    "`byte` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b.appendByte(1.5);
    },
    Error,
    "`byte` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b.appendByte("" as unknown as number);
    },
    Error,
    "`byte` must be an 8-bit unsigned integer.",
  );
});

Deno.test("Bytes.Builder.create()/capacity/length/loadFromBufferSource()", () => {
  const b = Builder.create();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 0);

  b.loadFromBufferSource(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 12);

  b.loadFromBufferSource(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 24);

  const b2 = b.duplicateAsUint8Array();
  assertStrictEquals(
    JSON.stringify(Array.from(b2)),
    "[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]",
  );
});

Deno.test("Bytes.Builder.create()/capacity/length/loadFromBufferSource() - 2", () => {
  const b = Builder.create();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 0);

  b.loadFromBufferSource(Uint16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 24);

  b.loadFromBufferSource(Uint16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 48);

  const b2 = b.toUint8Array();
  if (ByteOrder.nativeOrder === ByteOrder.BIG_ENDIAN) {
    assertStrictEquals(
      JSON.stringify(Array.from(b2)),
      "[0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify(Array.from(b2)),
      "[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0]",
    );
  }
});

Deno.test("Bytes.Builder.create()/capacity/length/loadFromBufferSource()", () => {
  const b = Builder.create({ capacity: 10 });

  assertStrictEquals(b.capacity, 10);
  assertStrictEquals(b.length, 0);

  b.loadFromBufferSource(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1048576);
  assertStrictEquals(b.length, 12);

  b.loadFromBufferSource(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
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

  const copy2 = b.duplicateAsUint8Array();
  assertNotStrictEquals(copy2, b.duplicateAsUint8Array());
  assertNotStrictEquals(copy2.buffer, b.duplicateAsUint8Array().buffer);
  assertStrictEquals(copy2.byteLength, 24);
  assertStrictEquals(copy2.buffer.byteLength, 24);
  assertStrictEquals(
    [...copy2].map((b) => b.toString(10)).join(","),
    "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12",
  );
});

Deno.test("Bytes.Builder.create() - capacityMax", () => {
  const b = Builder.create({ capacity: 4, capacityMax: 8 });
  b.appendByte(255);
  assertStrictEquals(b.length, 1);
  assertStrictEquals(b.capacity, 4);
  b.appendByte(255);
  b.appendByte(255);
  b.appendByte(255);
  assertStrictEquals(b.length, 4);
  assertStrictEquals(b.capacity, 4);
  b.appendByte(255);
  assertStrictEquals(b.length, 5);
  assertStrictEquals(b.capacity, 8);
  b.appendByte(255);
  b.appendByte(255);
  b.appendByte(255);
  assertStrictEquals(b.length, 8);
  assertStrictEquals(b.capacity, 8);

  assertThrows(
    () => {
      b.appendByte(255);
    },
    Error,
    "Max byte length exceeded.",
  );
});

Deno.test("Bytes.Builder.create() - err", () => {
  assertThrows(
    () => {
      Builder.create({ capacityMax: 536_870_913 });
    },
    Error,
    "`init.capacityMax` must be a safe integer in the range 0-536870912.",
  );

  const b2 = Builder.create({ capacityMax: 1n as unknown as number });
  assertStrictEquals(b2.capacity, 1_048_576);

  assertThrows(
    () => {
      Builder.create({ capacity: 536_870_913 });
    },
    Error,
    "`init.capacity` must be a safe integer in the range 0-536870912.",
  );

  const b3 = Builder.create({ capacity: 1n as unknown as number });
  assertStrictEquals(b3.capacity, 1_048_576);
});

Deno.test("Bytes.Builder.prototype.growable", () => {
  const b1 = Builder.create();
  assertStrictEquals(b1.growable, true);
  assertStrictEquals(b1.capacity, 1_048_576);

  const b2 = Builder.create({ capacity: 100 });
  assertStrictEquals(b2.growable, true);
  assertStrictEquals(b2.capacity, 100);

  const b3 = Builder.create({ /* capacity:100 */ capacityMax: 100 });
  assertStrictEquals(b3.growable, false);
  assertStrictEquals(b3.capacity, 100);

  const b4 = Builder.create({ capacity: 100, capacityMax: 100 });
  assertStrictEquals(b4.growable, false);
  assertStrictEquals(b4.capacity, 100);

  const b5 = Builder.create({ capacity: 100, capacityMax: 200 });
  assertStrictEquals(b5.growable, true);
  assertStrictEquals(b5.capacity, 100);

  assertThrows(
    () => {
      Builder.create({ capacity: 200, capacityMax: 100 });
    },
    Error,
    "`init.capacity` must be a safe integer in the range 0-100.",
  );

  const b6 = Builder.create({ capacityMax: 536_870_912 });
  assertStrictEquals(b6.growable, true);
  assertStrictEquals(b6.capacity, 1_048_576);

  const b7 = Builder.create({ capacity: 536_870_912 });
  assertStrictEquals(b7.growable, false);
  assertStrictEquals(b7.capacity, 536_870_912);
});

Deno.test("Bytes.Builder.prototype[Symbol.toStringTag]", () => {
  const b1 = Builder.create();
  assertStrictEquals(b1[Symbol.toStringTag], "Builder");
});

Deno.test("Bytes.Builder.prototype.loadFromBufferSource()", () => {
  const b = Builder.create();
  b.loadFromBufferSource(Uint8Array.of(255));

  assertThrows(
    () => {
      b.loadFromBufferSource([255] as unknown as Uint8Array);
    },
    Error,
    "`bytes` must be a `BufferSource`.",
  );
});

Deno.test("Bytes.Builder.prototype.duplicateAsArrayBuffer()", () => {
  const b = Builder.create();
  const bc1 = b.duplicateAsArrayBuffer();
  assertStrictEquals(bc1.byteLength, 0);

  b.appendByte(255);
  assertStrictEquals(bc1.byteLength, 0);
  const bc2 = b.duplicateAsArrayBuffer();
  assertStrictEquals(bc2.byteLength, 1);
});

Deno.test("Bytes.Builder.prototype.duplicateAsUint8Array()", () => {
  const b = Builder.create();
  const bc1 = b.duplicateAsUint8Array();
  assertStrictEquals(bc1.byteLength, 0);

  b.appendByte(255);
  assertStrictEquals(bc1.byteLength, 0);
  const bc2 = b.duplicateAsUint8Array();
  assertStrictEquals(bc2.byteLength, 1);
  assertStrictEquals(bc2[0], 255);
});

Deno.test("Bytes.Builder.prototype.copyTo()", () => {
  const b = Builder.create();
  b.loadFromUint8Iterable([1, 2, 3, 4]);
  const c1 = new Uint8Array(6);
  b.copyTo(c1);
  assertStrictEquals(c1[0], 1);
  assertStrictEquals(c1[1], 2);
  assertStrictEquals(c1[2], 3);
  assertStrictEquals(c1[3], 4);
  assertStrictEquals(c1[4], 0);
  assertStrictEquals(c1[5], 0);

  b.copyTo(c1, 2);
  assertStrictEquals(c1[0], 1);
  assertStrictEquals(c1[1], 2);
  assertStrictEquals(c1[2], 1);
  assertStrictEquals(c1[3], 2);
  assertStrictEquals(c1[4], 3);
  assertStrictEquals(c1[5], 4);

  assertThrows(
    () => {
      b.copyTo(c1, 3);
    },
    RangeError,
    "The length of the `destination` is not long enough.",
  );

  const c2 = new Uint8Array(4);
  b.copyTo(c2);
  assertStrictEquals(c2[0], 1);
  assertStrictEquals(c2[1], 2);
  assertStrictEquals(c2[2], 3);
  assertStrictEquals(c2[3], 4);

  assertThrows(
    () => {
      const c3 = new Uint8Array(3);
      b.copyTo(c3);
    },
    RangeError,
    "The length of the `destination` is not long enough.",
  );

  assertThrows(
    () => {
      const c4 = new Uint8Array(3);
      b.copyTo(c4, 4);
    },
    RangeError,
    "", // Uint8Arrayがスローする "Start offset 4 is outside the bounds of the buffer"
  );
});

Deno.test("Bytes.Builder.prototype.toArrayBuffer()", () => {
  const b = Builder.create();
  const bc1 = b.toArrayBuffer();
  assertStrictEquals(bc1.byteLength, 0);

  assertThrows(
    () => {
      b.appendByte(255);
    },
    Error,
    "This Builder is no longer available.",
  );

  assertThrows(
    () => {
      b.appendByte(255);
    },
    Error,
    "This Builder is no longer available.",
  );
  assertThrows(
    () => {
      b.duplicateAsArrayBuffer();
    },
    Error,
    "This Builder is no longer available.",
  );
  assertThrows(
    () => {
      b.duplicateAsUint8Array();
    },
    Error,
    "This Builder is no longer available.",
  );
  assertThrows(
    () => {
      b.toArrayBuffer();
    },
    Error,
    "This Builder is no longer available.",
  );

  const b2 = Builder.create();
  b2.appendByte(255);
  const b2c2 = b2.toArrayBuffer();
  assertStrictEquals(b2c2.byteLength, 1);
  assertStrictEquals(new Uint8Array(b2c2)[0], 255);
});

Deno.test("Bytes.Builder.prototype.toUint8Array()", () => {
  const b = Builder.create();
  const bc1 = b.toUint8Array();
  assertStrictEquals(bc1.byteLength, 0);

  assertThrows(
    () => {
      b.appendByte(255);
    },
    Error,
    "This Builder is no longer available.",
  );

  assertThrows(
    () => {
      b.appendByte(255);
    },
    Error,
    "This Builder is no longer available.",
  );
  assertThrows(
    () => {
      b.duplicateAsArrayBuffer();
    },
    Error,
    "This Builder is no longer available.",
  );
  assertThrows(
    () => {
      b.duplicateAsUint8Array();
    },
    Error,
    "This Builder is no longer available.",
  );
  assertThrows(
    () => {
      b.toUint8Array();
    },
    Error,
    "This Builder is no longer available.",
  );

  const b2 = Builder.create();
  b2.appendByte(255);
  const b2c2 = b2.toUint8Array();
  assertStrictEquals(b2c2.byteLength, 1);
  assertStrictEquals(b2c2[0], 255);
});
