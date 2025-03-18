import {
  assertNotStrictEquals,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";
import { Buffers } from "../../../mod.ts";

const { BytesBuilder } = Buffers;

Deno.test("new Buffers.BytesBuilder()/capacity/length/append() - number", () => {
  const b = new BytesBuilder({ capacity: 2 });
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 0);

  b.append(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 1);
  assertStrictEquals(b.copyToArrayBuffer().byteLength, 1);

  b.append(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 2);
  assertStrictEquals(b.copyToArrayBuffer().byteLength, 2);

  b.append(255);
  assertStrictEquals(b.capacity, 1048576 + 2);
  assertStrictEquals(b.length, 3);
  assertStrictEquals(b.copyToArrayBuffer().byteLength, 3);
});

Deno.test("new Buffers.BytesBuilder()/capacity/length/append() - BufferSource", () => {
  const b = new BytesBuilder();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 0);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 12);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 24);

  const b2 = b.copyToUint8Array();
  assertStrictEquals(
    JSON.stringify(Array.from(b2)),
    "[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]",
  );
});

Deno.test("new Buffers.BytesBuilder()/capacity/length/append() - 2", () => {
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

Deno.test("new Buffers.BytesBuilder()/capacity/length/append()", () => {
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

  const copy2 = b.copyToUint8Array();
  assertNotStrictEquals(copy2, b.copyToUint8Array());
  assertNotStrictEquals(copy2.buffer, b.copyToUint8Array().buffer);
  assertStrictEquals(copy2.byteLength, 24);
  assertStrictEquals(copy2.buffer.byteLength, 24);
  assertStrictEquals(
    [...copy2].map((b) => b.toString(10)).join(","),
    "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12",
  );
});

Deno.test("new Buffers.BytesBuilder() - capacityMax", () => {
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

Deno.test("new Buffers.BytesBuilder() - err", () => {
  assertThrows(
    () => {
      new BytesBuilder({ capacityMax: 536_870_913 });
    },
    Error,
    "`init.capacityMax` must be a safe integer in the range 0-536870912.",
  );

  const b2 = new BytesBuilder({ capacityMax: 1n as unknown as number });
  assertStrictEquals(b2.capacity, 1_048_576);

  assertThrows(
    () => {
      new BytesBuilder({ capacity: 536_870_913 });
    },
    Error,
    "`init.capacity` must be a safe integer in the range 0-536870912.",
  );

  const b3 = new BytesBuilder({ capacity: 1n as unknown as number });
  assertStrictEquals(b3.capacity, 1_048_576);
});

Deno.test("Buffers.BytesBuilder.prototype.growable", () => {
  const b1 = new BytesBuilder();
  assertStrictEquals(b1.growable, true);
  assertStrictEquals(b1.capacity, 1_048_576);

  const b2 = new BytesBuilder({ capacity: 100 });
  assertStrictEquals(b2.growable, true);
  assertStrictEquals(b2.capacity, 100);

  const b3 = new BytesBuilder({ /* capacity:100 */ capacityMax: 100 });
  assertStrictEquals(b3.growable, false);
  assertStrictEquals(b3.capacity, 100);

  const b4 = new BytesBuilder({ capacity: 100, capacityMax: 100 });
  assertStrictEquals(b4.growable, false);
  assertStrictEquals(b4.capacity, 100);

  const b5 = new BytesBuilder({ capacity: 100, capacityMax: 200 });
  assertStrictEquals(b5.growable, true);
  assertStrictEquals(b5.capacity, 100);

  assertThrows(
    () => {
      new BytesBuilder({ capacity: 200, capacityMax: 100 });
    },
    Error,
    "`init.capacity` must be a safe integer in the range 0-100.",
  );

  const b6 = new BytesBuilder({ capacityMax: 536_870_912 });
  assertStrictEquals(b6.growable, true);
  assertStrictEquals(b6.capacity, 1_048_576);

  const b7 = new BytesBuilder({ capacity: 536_870_912 });
  assertStrictEquals(b7.growable, false);
  assertStrictEquals(b7.capacity, 536_870_912);
});

Deno.test("Buffers.BytesBuilder.prototype[Symbol.toStringTag]", () => {
  const b1 = new BytesBuilder();
  assertStrictEquals(b1[Symbol.toStringTag], "BytesBuilder");
});

Deno.test("Buffers.BytesBuilder.prototype.append()", () => {
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

Deno.test("Buffers.BytesBuilder.prototype.copyToArrayBuffer()", () => {
  const b = new BytesBuilder();
  const bc1 = b.copyToArrayBuffer();
  assertStrictEquals(bc1.byteLength, 0);

  b.append(255);
  assertStrictEquals(bc1.byteLength, 0);
  const bc2 = b.copyToArrayBuffer();
  assertStrictEquals(bc2.byteLength, 1);
});

Deno.test("Buffers.BytesBuilder.prototype.copyToUint8Array()", () => {
  const b = new BytesBuilder();
  const bc1 = b.copyToUint8Array();
  assertStrictEquals(bc1.byteLength, 0);

  b.append(255);
  assertStrictEquals(bc1.byteLength, 0);
  const bc2 = b.copyToUint8Array();
  assertStrictEquals(bc2.byteLength, 1);
  assertStrictEquals(bc2[0], 255);
});

Deno.test("Buffers.BytesBuilder.prototype.takeAsArrayBuffer()", () => {
  const b = new BytesBuilder();
  const bc1 = b.takeAsArrayBuffer();
  assertStrictEquals(bc1.byteLength, 0);

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "This BytesBuilder is no longer available.",
  );

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.copyToArrayBuffer();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.copyToUint8Array();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.takeAsArrayBuffer();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.takeAsUint8Array();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );

  const b2 = new BytesBuilder();
  b2.append(255);
  const b2c2 = b2.takeAsArrayBuffer();
  assertStrictEquals(b2c2.byteLength, 1);
});

Deno.test("Buffers.BytesBuilder.prototype.takeAsUint8Array()", () => {
  const b = new BytesBuilder();
  const bc1 = b.takeAsUint8Array();
  assertStrictEquals(bc1.byteLength, 0);

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "This BytesBuilder is no longer available.",
  );

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.copyToArrayBuffer();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.copyToUint8Array();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.takeAsArrayBuffer();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );
  assertThrows(
    () => {
      b.takeAsUint8Array();
    },
    Error,
    "This BytesBuilder is no longer available.",
  );

  const b2 = new BytesBuilder();
  b2.append(255);
  const b2c2 = b2.takeAsUint8Array();
  assertStrictEquals(b2c2.byteLength, 1);
  assertStrictEquals(b2c2[0], 255);
});
