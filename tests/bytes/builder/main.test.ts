import {
  assertNotStrictEquals,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";
import { Bytes } from "../../../mod.ts";

const { Builder } = Bytes;

Deno.test("new Bytes.Builder()/capacity/length/append() - number", () => {
  const b = new Builder({ capacity: 2 });
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 0);

  b.append(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 1);
  assertStrictEquals(b.duplicateAsArrayBuffer().byteLength, 1);

  b.append(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.length, 2);
  assertStrictEquals(b.duplicateAsArrayBuffer().byteLength, 2);

  b.append(255);
  assertStrictEquals(b.capacity, 1048576 + 2);
  assertStrictEquals(b.length, 3);
  assertStrictEquals(b.duplicateAsArrayBuffer().byteLength, 3);
});

Deno.test("new Bytes.Builder()/capacity/length/append() - BufferSource", () => {
  const b = new Builder();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 0);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 12);

  b.append(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.length, 24);

  const b2 = b.duplicateAsUint8Array();
  assertStrictEquals(
    JSON.stringify(Array.from(b2)),
    "[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]",
  );
});

Deno.test("new Bytes.Builder()/capacity/length/append() - 2", () => {
  const b = new Builder();

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

Deno.test("new Bytes.Builder()/capacity/length/append()", () => {
  const b = new Builder({ capacity: 10 });

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

Deno.test("new Bytes.Builder() - capacityMax", () => {
  const b = new Builder({ capacity: 4, capacityMax: 8 });
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

Deno.test("new Bytes.Builder() - err", () => {
  assertThrows(
    () => {
      new Builder({ capacityMax: 536_870_913 });
    },
    Error,
    "`init.capacityMax` must be a safe integer in the range 0-536870912.",
  );

  const b2 = new Builder({ capacityMax: 1n as unknown as number });
  assertStrictEquals(b2.capacity, 1_048_576);

  assertThrows(
    () => {
      new Builder({ capacity: 536_870_913 });
    },
    Error,
    "`init.capacity` must be a safe integer in the range 0-536870912.",
  );

  const b3 = new Builder({ capacity: 1n as unknown as number });
  assertStrictEquals(b3.capacity, 1_048_576);
});

Deno.test("Bytes.Builder.prototype.growable", () => {
  const b1 = new Builder();
  assertStrictEquals(b1.growable, true);
  assertStrictEquals(b1.capacity, 1_048_576);

  const b2 = new Builder({ capacity: 100 });
  assertStrictEquals(b2.growable, true);
  assertStrictEquals(b2.capacity, 100);

  const b3 = new Builder({ /* capacity:100 */ capacityMax: 100 });
  assertStrictEquals(b3.growable, false);
  assertStrictEquals(b3.capacity, 100);

  const b4 = new Builder({ capacity: 100, capacityMax: 100 });
  assertStrictEquals(b4.growable, false);
  assertStrictEquals(b4.capacity, 100);

  const b5 = new Builder({ capacity: 100, capacityMax: 200 });
  assertStrictEquals(b5.growable, true);
  assertStrictEquals(b5.capacity, 100);

  assertThrows(
    () => {
      new Builder({ capacity: 200, capacityMax: 100 });
    },
    Error,
    "`init.capacity` must be a safe integer in the range 0-100.",
  );

  const b6 = new Builder({ capacityMax: 536_870_912 });
  assertStrictEquals(b6.growable, true);
  assertStrictEquals(b6.capacity, 1_048_576);

  const b7 = new Builder({ capacity: 536_870_912 });
  assertStrictEquals(b7.growable, false);
  assertStrictEquals(b7.capacity, 536_870_912);
});

Deno.test("Bytes.Builder.prototype[Symbol.toStringTag]", () => {
  const b1 = new Builder();
  assertStrictEquals(b1[Symbol.toStringTag], "Builder");
});

Deno.test("Bytes.Builder.prototype.append()", () => {
  const b = new Builder();
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

Deno.test("Bytes.Builder.prototype.duplicateAsArrayBuffer()", () => {
  const b = new Builder();
  const bc1 = b.duplicateAsArrayBuffer();
  assertStrictEquals(bc1.byteLength, 0);

  b.append(255);
  assertStrictEquals(bc1.byteLength, 0);
  const bc2 = b.duplicateAsArrayBuffer();
  assertStrictEquals(bc2.byteLength, 1);
});

Deno.test("Bytes.Builder.prototype.duplicateAsUint8Array()", () => {
  const b = new Builder();
  const bc1 = b.duplicateAsUint8Array();
  assertStrictEquals(bc1.byteLength, 0);

  b.append(255);
  assertStrictEquals(bc1.byteLength, 0);
  const bc2 = b.duplicateAsUint8Array();
  assertStrictEquals(bc2.byteLength, 1);
  assertStrictEquals(bc2[0], 255);
});

Deno.test("Bytes.Builder.prototype.copyTo()", () => {
});

Deno.test("Bytes.Builder.prototype.toArrayBuffer()", () => {
  const b = new Builder();
  const bc1 = b.toArrayBuffer();
  assertStrictEquals(bc1.byteLength, 0);

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "This Builder is no longer available.",
  );

  assertThrows(
    () => {
      b.append(255);
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

  const b2 = new Builder();
  b2.append(255);
  const b2c2 = b2.toArrayBuffer();
  assertStrictEquals(b2c2.byteLength, 1);
  assertStrictEquals(new Uint8Array(b2c2)[0], 255);
});

Deno.test("Bytes.Builder.prototype.toUint8Array()", () => {
  const b = new Builder();
  const bc1 = b.toUint8Array();
  assertStrictEquals(bc1.byteLength, 0);

  assertThrows(
    () => {
      b.append(255);
    },
    Error,
    "This Builder is no longer available.",
  );

  assertThrows(
    () => {
      b.append(255);
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

  const b2 = new Builder();
  b2.append(255);
  const b2c2 = b2.toUint8Array();
  assertStrictEquals(b2c2.byteLength, 1);
  assertStrictEquals(b2c2[0], 255);
});
