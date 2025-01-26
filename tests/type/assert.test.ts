import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.assertObject()", () => {
  try {
    Type.assertObject({}, "test-1");
    Type.assertObject(null, "test-1");
    Type.assertObject([], "test-1");
    Type.assertObject(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertObject(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNonNullObject()", () => {
  try {
    Type.assertNonNullObject({}, "test-1");
    Type.assertNonNullObject([], "test-1");
    Type.assertNonNullObject(new Error(), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNullObject(null, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNonNullObject(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNull()", () => {
  try {
    Type.assertNull(null, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNull(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNull({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNull(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNullOrUndefined()", () => {
  try {
    Type.assertNullOrUndefined(null, "test-1");
    Type.assertNullOrUndefined(undefined, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNullOrUndefined({}, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertNullOrUndefined(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertBoolean()", () => {
  try {
    Type.assertBoolean(true, "test-1");
    Type.assertBoolean(false, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBoolean(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBoolean(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBoolean(new Boolean(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertTrue()", () => {
  try {
    Type.assertTrue(true, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertTrue(false, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertTrue(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertTrue(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertTrue(new Boolean(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertFalse()", () => {
  try {
    Type.assertFalse(false, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertFalse(true, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFalse(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFalse(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertFalse(new Boolean(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertBigInt()", () => {
  try {
    Type.assertBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertPositiveBigInt()", () => {
  try {
    Type.assertPositiveBigInt(1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNonNegativeBigInt()", () => {
  try {
    Type.assertNonNegativeBigInt(1n, "test-1");
    Type.assertNonNegativeBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeBigInt(-1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNonPositiveBigInt()", () => {
  try {
    Type.assertNonPositiveBigInt(-1n, "test-1");
    Type.assertNonPositiveBigInt(0n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveBigInt(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNegativeBigInt()", () => {
  try {
    Type.assertNegativeBigInt(-1n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeBigInt(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeBigInt(0, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertOddBigInt()", () => {
  try {
    Type.assertOddBigInt(1n, "test-1");
    Type.assertOddBigInt(-1n, "test-1");
    Type.assertOddBigInt(3n, "test-1");
    Type.assertOddBigInt(-3n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertOddBigInt(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertOddBigInt(2n, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertEvenBigInt()", () => {
  try {
    Type.assertEvenBigInt(0n, "test-1");
    Type.assertEvenBigInt(-0n, "test-1");
    Type.assertEvenBigInt(2n, "test-1");
    Type.assertEvenBigInt(-2n, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertEvenBigInt(1n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEvenBigInt(-1n, "test-1");
    unreachable();
  } catch {
    //
  }
});
