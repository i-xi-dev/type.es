import { assertStrictEquals, assertThrows } from "@std/assert";
import { Basics } from "../../mod.ts";

const { StringType } = Basics;

const TOS = "[\\u{9}\\u{20}]+";

Deno.test("StringType.truncateStart()", () => {
  assertStrictEquals(StringType.truncateStart("", TOS), "");
  assertStrictEquals(
    StringType.truncateStart("\u0008", TOS),
    "\u0008",
  );
  assertStrictEquals(StringType.truncateStart("\t", TOS), "");
  assertStrictEquals(
    StringType.truncateStart("\u000A", TOS),
    "\u000A",
  );
  assertStrictEquals(
    StringType.truncateStart("\u001F", TOS),
    "\u001F",
  );
  assertStrictEquals(StringType.truncateStart(" ", TOS), "");
  assertStrictEquals(
    StringType.truncateStart("\u0021", TOS),
    "\u0021",
  );
  assertStrictEquals(StringType.truncateStart("a", TOS), "a");
  assertStrictEquals(
    StringType.truncateStart("\t      \t    ", TOS),
    "",
  );
  assertStrictEquals(StringType.truncateStart("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(StringType.truncateStart("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    StringType.truncateStart("azAZ", "[\\u{41}\\u{5A}]+"),
    "azAZ",
  );

  assertStrictEquals(StringType.truncateStart("x x", TOS), "x x");
  assertStrictEquals(StringType.truncateStart(" x", TOS), "x");
  assertStrictEquals(StringType.truncateStart("x ", TOS), "x ");

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.truncateStart(
        undefined as unknown as string,
        TOS,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`truncatePattern` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.truncateStart("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(StringType.truncateStart("", ""), "");
  assertStrictEquals(StringType.truncateStart("0", ""), "0");
});