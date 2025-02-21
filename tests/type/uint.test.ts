import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isUint6()", () => {
  assertStrictEquals(Type.isUint6(-1), false);
  assertStrictEquals(Type.isUint6(-0), true);
  assertStrictEquals(Type.isUint6(0), true);
  assertStrictEquals(Type.isUint6(63), true);
  assertStrictEquals(Type.isUint6(64), false);
  assertStrictEquals(Type.isUint6(127), false);
  assertStrictEquals(Type.isUint6(128), false);
  assertStrictEquals(Type.isUint6(255), false);
  assertStrictEquals(Type.isUint6(256), false);
  assertStrictEquals(Type.isUint6(65535), false);
  assertStrictEquals(Type.isUint6(65536), false);
  assertStrictEquals(Type.isUint6(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint6(0x100000000), false);

  assertStrictEquals(Type.isUint6(0.1), false);
  assertStrictEquals(Type.isUint6(0.5), false);
  assertStrictEquals(Type.isUint6("0" as unknown as number), false);
  assertStrictEquals(Type.isUint6(false as unknown as number), false);
  assertStrictEquals(Type.isUint6({} as unknown as number), false);
  assertStrictEquals(Type.isUint6([] as unknown as number), false);
  assertStrictEquals(Type.isUint6([0] as unknown as number), false);
  assertStrictEquals(Type.isUint6(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint6(null as unknown as number), false);
});

Deno.test("Type.assertUint6()", () => {
  try {
    Type.assertUint6(0, "test-1");
    Type.assertUint6(0x3F, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint6(0x40, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint7()", () => {
  assertStrictEquals(Type.isUint7(-1), false);
  assertStrictEquals(Type.isUint7(-0), true);
  assertStrictEquals(Type.isUint7(0), true);
  assertStrictEquals(Type.isUint7(63), true);
  assertStrictEquals(Type.isUint7(64), true);
  assertStrictEquals(Type.isUint7(127), true);
  assertStrictEquals(Type.isUint7(128), false);
  assertStrictEquals(Type.isUint7(255), false);
  assertStrictEquals(Type.isUint7(256), false);
  assertStrictEquals(Type.isUint7(65535), false);
  assertStrictEquals(Type.isUint7(65536), false);
  assertStrictEquals(Type.isUint7(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint7(0x100000000), false);

  assertStrictEquals(Type.isUint7(0.1), false);
  assertStrictEquals(Type.isUint7(0.5), false);
  assertStrictEquals(Type.isUint7("0" as unknown as number), false);
  assertStrictEquals(Type.isUint7(false as unknown as number), false);
  assertStrictEquals(Type.isUint7({} as unknown as number), false);
  assertStrictEquals(Type.isUint7([] as unknown as number), false);
  assertStrictEquals(Type.isUint7([0] as unknown as number), false);
  assertStrictEquals(Type.isUint7(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint7(null as unknown as number), false);
});

Deno.test("Type.assertUint7()", () => {
  try {
    Type.assertUint7(0, "test-1");
    Type.assertUint7(0x7F, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint7(0x80, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint8()", () => {
  assertStrictEquals(Type.isUint8(-1), false);
  assertStrictEquals(Type.isUint8(-0), true);
  assertStrictEquals(Type.isUint8(0), true);
  assertStrictEquals(Type.isUint8(63), true);
  assertStrictEquals(Type.isUint8(64), true);
  assertStrictEquals(Type.isUint8(127), true);
  assertStrictEquals(Type.isUint8(128), true);
  assertStrictEquals(Type.isUint8(255), true);
  assertStrictEquals(Type.isUint8(256), false);
  assertStrictEquals(Type.isUint8(65535), false);
  assertStrictEquals(Type.isUint8(65536), false);
  assertStrictEquals(Type.isUint8(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint8(0x100000000), false);

  assertStrictEquals(Type.isUint8(0.1), false);
  assertStrictEquals(Type.isUint8(0.5), false);
  assertStrictEquals(Type.isUint8("0" as unknown as number), false);
  assertStrictEquals(Type.isUint8(false as unknown as number), false);
  assertStrictEquals(Type.isUint8({} as unknown as number), false);
  assertStrictEquals(Type.isUint8([] as unknown as number), false);
  assertStrictEquals(Type.isUint8([0] as unknown as number), false);
  assertStrictEquals(Type.isUint8(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint8(null as unknown as number), false);
});

Deno.test("Type.assertUint8()", () => {
  try {
    Type.assertUint8(0, "test-1");
    Type.assertUint8(0xFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint8(0x100, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint16()", () => {
  assertStrictEquals(Type.isUint16(-1), false);
  assertStrictEquals(Type.isUint16(-0), true);
  assertStrictEquals(Type.isUint16(0), true);
  assertStrictEquals(Type.isUint16(63), true);
  assertStrictEquals(Type.isUint16(64), true);
  assertStrictEquals(Type.isUint16(127), true);
  assertStrictEquals(Type.isUint16(128), true);
  assertStrictEquals(Type.isUint16(255), true);
  assertStrictEquals(Type.isUint16(256), true);
  assertStrictEquals(Type.isUint16(65535), true);
  assertStrictEquals(Type.isUint16(65536), false);
  assertStrictEquals(Type.isUint16(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint16(0x100000000), false);

  assertStrictEquals(Type.isUint16(0.1), false);
  assertStrictEquals(Type.isUint16(0.5), false);
  assertStrictEquals(Type.isUint16("0" as unknown as number), false);
  assertStrictEquals(Type.isUint16(false as unknown as number), false);
  assertStrictEquals(Type.isUint16({} as unknown as number), false);
  assertStrictEquals(Type.isUint16([] as unknown as number), false);
  assertStrictEquals(Type.isUint16([0] as unknown as number), false);
  assertStrictEquals(Type.isUint16(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint16(null as unknown as number), false);
});

Deno.test("Type.assertUint16()", () => {
  try {
    Type.assertUint16(0, "test-1");
    Type.assertUint16(0xFFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint16(0x10000, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint24()", () => {
  assertStrictEquals(Type.isUint24(-1), false);
  assertStrictEquals(Type.isUint24(-0), true);
  assertStrictEquals(Type.isUint24(0), true);
  assertStrictEquals(Type.isUint24(63), true);
  assertStrictEquals(Type.isUint24(64), true);
  assertStrictEquals(Type.isUint24(127), true);
  assertStrictEquals(Type.isUint24(128), true);
  assertStrictEquals(Type.isUint24(255), true);
  assertStrictEquals(Type.isUint24(256), true);
  assertStrictEquals(Type.isUint24(65535), true);
  assertStrictEquals(Type.isUint24(65536), true);
  assertStrictEquals(Type.isUint24(0xFFFFFF), true);
  assertStrictEquals(Type.isUint24(0x1000000), false);
  assertStrictEquals(Type.isUint24(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint24(0x100000000), false);

  assertStrictEquals(Type.isUint24(0.1), false);
  assertStrictEquals(Type.isUint24(0.5), false);
  assertStrictEquals(Type.isUint24("0" as unknown as number), false);
  assertStrictEquals(Type.isUint24(false as unknown as number), false);
  assertStrictEquals(Type.isUint24({} as unknown as number), false);
  assertStrictEquals(Type.isUint24([] as unknown as number), false);
  assertStrictEquals(Type.isUint24([0] as unknown as number), false);
  assertStrictEquals(Type.isUint24(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint24(null as unknown as number), false);
});

Deno.test("Type.assertUint24()", () => {
  try {
    Type.assertUint24(0, "test-1");
    Type.assertUint24(0xFFFFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint24(0x1000000, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint32()", () => {
  assertStrictEquals(Type.isUint32(-1), false);
  assertStrictEquals(Type.isUint32(-0), true);
  assertStrictEquals(Type.isUint32(0), true);
  assertStrictEquals(Type.isUint32(63), true);
  assertStrictEquals(Type.isUint32(64), true);
  assertStrictEquals(Type.isUint32(127), true);
  assertStrictEquals(Type.isUint32(128), true);
  assertStrictEquals(Type.isUint32(255), true);
  assertStrictEquals(Type.isUint32(256), true);
  assertStrictEquals(Type.isUint32(65535), true);
  assertStrictEquals(Type.isUint32(65536), true);
  assertStrictEquals(Type.isUint32(0xFFFFFF), true);
  assertStrictEquals(Type.isUint32(0x1000000), true);
  assertStrictEquals(Type.isUint32(0xFFFFFFFF), true);
  assertStrictEquals(Type.isUint32(0x100000000), false);

  assertStrictEquals(Type.isUint32(0.1), false);
  assertStrictEquals(Type.isUint32(0.5), false);
  assertStrictEquals(Type.isUint32("0" as unknown as number), false);
  assertStrictEquals(Type.isUint32(false as unknown as number), false);
  assertStrictEquals(Type.isUint32({} as unknown as number), false);
  assertStrictEquals(Type.isUint32([] as unknown as number), false);
  assertStrictEquals(Type.isUint32([0] as unknown as number), false);
  assertStrictEquals(Type.isUint32(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint32(null as unknown as number), false);
});

Deno.test("Type.assertUint32()", () => {
  try {
    Type.assertUint32(0, "test-1");
    Type.assertUint32(0xFFFFFFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint32(0x100000000, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isBigUint64()", () => {
  assertStrictEquals(Type.isBigUint64(-1n), false);
  assertStrictEquals(Type.isBigUint64(-0n), true);
  assertStrictEquals(Type.isBigUint64(0n), true);
  assertStrictEquals(Type.isBigUint64(63n), true);
  assertStrictEquals(Type.isBigUint64(64n), true);
  assertStrictEquals(Type.isBigUint64(127n), true);
  assertStrictEquals(Type.isBigUint64(128n), true);
  assertStrictEquals(Type.isBigUint64(255n), true);
  assertStrictEquals(Type.isBigUint64(256n), true);
  assertStrictEquals(Type.isBigUint64(65535n), true);
  assertStrictEquals(Type.isBigUint64(65536n), true);
  assertStrictEquals(Type.isBigUint64(0xFFFFFFn), true);
  assertStrictEquals(Type.isBigUint64(0x1000000n), true);
  assertStrictEquals(Type.isBigUint64(0xFFFFFFFFn), true);
  assertStrictEquals(Type.isBigUint64(0x100000000n), true);
  assertStrictEquals(Type.isBigUint64(0xFFFFFFFFFFFFFFFFn), true);
  assertStrictEquals(Type.isBigUint64(0x10000000000000000n), false);

  assertStrictEquals(Type.isBigUint64(0.1 as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64(0.5 as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64("0" as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64(false as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64({} as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64([] as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64([0] as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64(undefined as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint64(null as unknown as bigint), false);
});

Deno.test("Type.assertBigUint64()", () => {
  try {
    Type.assertBigUint64(0n, "test-1");
    Type.assertBigUint64(0xFFFFFFFFFFFFFFFFn, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBigUint64(0x10000000000000000n, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isBigUint128()", () => {
  assertStrictEquals(Type.isBigUint128(-1n), false);
  assertStrictEquals(Type.isBigUint128(-0n), true);
  assertStrictEquals(Type.isBigUint128(0n), true);
  assertStrictEquals(Type.isBigUint128(63n), true);
  assertStrictEquals(Type.isBigUint128(64n), true);
  assertStrictEquals(Type.isBigUint128(127n), true);
  assertStrictEquals(Type.isBigUint128(128n), true);
  assertStrictEquals(Type.isBigUint128(255n), true);
  assertStrictEquals(Type.isBigUint128(256n), true);
  assertStrictEquals(Type.isBigUint128(65535n), true);
  assertStrictEquals(Type.isBigUint128(65536n), true);
  assertStrictEquals(Type.isBigUint128(0xFFFFFFn), true);
  assertStrictEquals(Type.isBigUint128(0x1000000n), true);
  assertStrictEquals(Type.isBigUint128(0xFFFFFFFFn), true);
  assertStrictEquals(Type.isBigUint128(0x100000000n), true);
  assertStrictEquals(Type.isBigUint128(0xFFFFFFFFFFFFFFFFn), true);
  assertStrictEquals(Type.isBigUint128(0x10000000000000000n), true);

  assertStrictEquals(
    Type.isBigUint128(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn),
    true,
  );
  assertStrictEquals(
    Type.isBigUint128(0x100000000000000000000000000000000n),
    false,
  );

  assertStrictEquals(Type.isBigUint128(0.1 as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128(0.5 as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128("0" as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128(false as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128({} as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128([] as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128([0] as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128(undefined as unknown as bigint), false);
  assertStrictEquals(Type.isBigUint128(null as unknown as bigint), false);
});

Deno.test("Type.assertBigUint128()", () => {
  try {
    Type.assertBigUint128(0n, "test-1");
    Type.assertBigUint128(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBigUint128(0x100000000000000000000000000000000n, "test-1");
    unreachable();
  } catch {
    //
  }
});
