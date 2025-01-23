import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.assertString()", () => {
  try {
    Type.assertString("", "test-1");
    Type.assertString(" ", "test-1");
    Type.assertString("0", "test-1");
    Type.assertString("\u0000", "test-1");
    Type.assertString("\uFFFF", "test-1");
    Type.assertString("\u{10FFFF}", "test-1");
    Type.assertString(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    Type.assertString("\uD800\uDC00", "test-1");
    Type.assertString("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertEmptyString()", () => {
  try {
    Type.assertEmptyString("", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertEmptyString("0", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNonEmptyString()", () => {
  try {
    Type.assertNonEmptyString("0", "test-1");
    Type.assertNonEmptyString("00", "test-1");

    Type.assertNonEmptyString("\uD800\uDC00", "test-1");
    Type.assertNonEmptyString("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonEmptyString("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertChar()", () => {
  try {
    Type.assertChar(" ", "test-1");
    Type.assertChar("0", "test-1");
    Type.assertChar("\u0000", "test-1");
    Type.assertChar("\uFFFF", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertChar("\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNumber()", () => {
  try {
    Type.assertNumber(0, "test-1");
    Type.assertNumber(0.5, "test-1");
    Type.assertNumber(Number.NaN, "test-1");
    Type.assertNumber(Number.POSITIVE_INFINITY, "test-1");
    Type.assertNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertPositiveNumber()", () => {
  try {
    Type.assertPositiveNumber(1, "test-1");
    Type.assertPositiveNumber(0.5, "test-1");
    Type.assertPositiveNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPositiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPositiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNonNegativeNumber()", () => {
  try {
    Type.assertNonNegativeNumber(1, "test-1");
    Type.assertNonNegativeNumber(0.5, "test-1");
    Type.assertNonNegativeNumber(0, "test-1");
    Type.assertNonNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonNegativeNumber(-0.1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonNegativeNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNonPositiveNumber()", () => {
  try {
    Type.assertNonPositiveNumber(-1, "test-1");
    Type.assertNonPositiveNumber(-0.5, "test-1");
    Type.assertNonPositiveNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonPositiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonPositiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertNegativeNumber()", () => {
  try {
    Type.assertNegativeNumber(-1, "test-1");
    Type.assertNegativeNumber(-0.5, "test-1");
    Type.assertNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNegativeNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNegativeNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

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
