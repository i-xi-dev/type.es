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

Deno.test("StringType.truncateEnd()", () => {
  assertStrictEquals(StringType.truncateEnd("", TOS), "");
  assertStrictEquals(
    StringType.truncateEnd("\u0008", TOS),
    "\u0008",
  );
  assertStrictEquals(StringType.truncateEnd("\t", TOS), "");
  assertStrictEquals(
    StringType.truncateEnd("\u000A", TOS),
    "\u000A",
  );
  assertStrictEquals(
    StringType.truncateEnd("\u001F", TOS),
    "\u001F",
  );
  assertStrictEquals(StringType.truncateEnd(" ", TOS), "");
  assertStrictEquals(
    StringType.truncateEnd("\u0021", TOS),
    "\u0021",
  );
  assertStrictEquals(StringType.truncateEnd("a", TOS), "a");
  assertStrictEquals(
    StringType.truncateEnd("\t      \t    ", TOS),
    "",
  );
  assertStrictEquals(StringType.truncateEnd("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(StringType.truncateEnd("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(StringType.truncateEnd("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(StringType.truncateEnd("x x", TOS), "x x");
  assertStrictEquals(StringType.truncateEnd(" x", TOS), " x");
  assertStrictEquals(StringType.truncateEnd("x ", TOS), "x");

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.truncateEnd(
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
      [...StringType.truncateEnd("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(StringType.truncateEnd("", ""), "");
  assertStrictEquals(StringType.truncateEnd("0", ""), "0");
});

Deno.test("StringType.truncateBoth()", () => {
  assertStrictEquals(StringType.truncateBoth("", TOS), "");
  assertStrictEquals(StringType.truncateBoth("\u0008", TOS), "\u0008");
  assertStrictEquals(StringType.truncateBoth("\t", TOS), "");
  assertStrictEquals(StringType.truncateBoth("\u000A", TOS), "\u000A");
  assertStrictEquals(StringType.truncateBoth("\u001F", TOS), "\u001F");
  assertStrictEquals(StringType.truncateBoth(" ", TOS), "");
  assertStrictEquals(StringType.truncateBoth("\u0021", TOS), "\u0021");
  assertStrictEquals(StringType.truncateBoth("a", TOS), "a");
  assertStrictEquals(
    StringType.truncateBoth("\t      \t    ", TOS),
    "",
  );
  assertStrictEquals(StringType.truncateBoth("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(StringType.truncateBoth("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    StringType.truncateBoth("azAZ", "[\\u{41}\\u{5A}]+"),
    "az",
  );

  assertStrictEquals(StringType.truncateBoth("x x", TOS), "x x");
  assertStrictEquals(StringType.truncateBoth(" x", TOS), "x");
  assertStrictEquals(StringType.truncateBoth("x ", TOS), "x");

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.truncateBoth(
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
      [...StringType.truncateBoth("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(StringType.truncateBoth("", ""), "");
  assertStrictEquals(StringType.truncateBoth("0", ""), "0");
});

Deno.test("StringType.collectStart()", () => {
  assertStrictEquals(StringType.collectStart("", TOS), "");
  assertStrictEquals(
    StringType.collectStart("\u0008", TOS),
    "",
  );
  assertStrictEquals(StringType.collectStart("\t", TOS), "\t");
  assertStrictEquals(
    StringType.collectStart("\u000A", TOS),
    "",
  );
  assertStrictEquals(
    StringType.collectStart("\u001F", TOS),
    "",
  );
  assertStrictEquals(StringType.collectStart(" ", TOS), " ");
  assertStrictEquals(
    StringType.collectStart("\u0021", TOS),
    "",
  );
  assertStrictEquals(StringType.collectStart("a", TOS), "");
  assertStrictEquals(
    StringType.collectStart("\t      \t    ", TOS),
    "\t      \t    ",
  );
  assertStrictEquals(StringType.collectStart("az", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    StringType.collectStart("AZ", "[\\u{41}\\u{5A}]+"),
    "AZ",
  );
  assertStrictEquals(
    StringType.collectStart("azAZ", "[\\u{41}\\u{5A}]+"),
    "",
  );

  assertStrictEquals(StringType.collectStart("x x", TOS), "");
  assertStrictEquals(StringType.collectStart(" x", TOS), " ");
  assertStrictEquals(StringType.collectStart("x ", TOS), "");

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.collectStart(
        undefined as unknown as string,
        TOS,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`collectPattern` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.collectStart("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(StringType.collectStart("", ""), "");
  assertStrictEquals(StringType.collectStart("0", ""), "");
});

Deno.test("StringType.collectEnd()", () => {
  assertStrictEquals(StringType.collectEnd("", TOS), "");
  assertStrictEquals(
    StringType.collectEnd("\u0008", TOS),
    "",
  );
  assertStrictEquals(StringType.collectEnd("\t", TOS), "\t");
  assertStrictEquals(
    StringType.collectEnd("\u000A", TOS),
    "",
  );
  assertStrictEquals(
    StringType.collectEnd("\u001F", TOS),
    "",
  );
  assertStrictEquals(StringType.collectEnd(" ", TOS), " ");
  assertStrictEquals(
    StringType.collectEnd("\u0021", TOS),
    "",
  );
  assertStrictEquals(StringType.collectEnd("a", TOS), "");
  assertStrictEquals(
    StringType.collectEnd("\t      \t    ", TOS),
    "\t      \t    ",
  );
  assertStrictEquals(StringType.collectEnd("az", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    StringType.collectEnd("AZ", "[\\u{41}\\u{5A}]+"),
    "AZ",
  );
  assertStrictEquals(
    StringType.collectEnd("azAZ", "[\\u{41}\\u{5A}]+"),
    "AZ",
  );

  assertStrictEquals(StringType.collectEnd("x x", TOS), "");
  assertStrictEquals(StringType.collectEnd(" x", TOS), "");
  assertStrictEquals(StringType.collectEnd("x ", TOS), " ");

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.collectEnd(
        undefined as unknown as string,
        TOS,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`collectPattern` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.collectEnd("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(StringType.collectEnd("", ""), "");
  assertStrictEquals(StringType.collectEnd("0", ""), "");
});
