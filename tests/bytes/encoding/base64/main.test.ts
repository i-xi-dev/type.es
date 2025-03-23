import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../../mod.ts";

function test(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  const binStr = [...bytes].map((byte) => String.fromCharCode(byte)).join("");
  return globalThis.btoa(binStr);
}

Deno.test("Bytes.base64Decode()", () => {
  const decoded11 = Bytes.base64Decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = Bytes.base64Decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = Bytes.base64Decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const dr1 = Bytes.base64Decode(test(r1.buffer));
  assertStrictEquals(JSON.stringify([...dr1]), JSON.stringify([...r1]));

  assertThrows(
    () => {
      Bytes.base64Decode(0 as unknown as string);
    },
    TypeError,
    "`encoded` must be a `string`.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("あ");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP_-_fw=");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=AwIBAP/+/fw");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP/+/fw,");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.base64Decode() - noPadding:true", () => {
  const decoded11 = Bytes.base64Decode("", { noPadding: true });
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12z = Bytes.base64Decode("AwIBAP/+/fw=", { noPadding: true });
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12 = Bytes.base64Decode("AwIBAP/+/fw", { noPadding: true });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("あ", { noPadding: true });
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP_-_fw=", { noPadding: true });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=AwIBAP/+/fw", { noPadding: true });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=", { noPadding: true });
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP/+/fw,", { noPadding: true });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.base64Decode() - noPadding:true", () => {
  const decoded12z = Bytes.base64Decode("AwIBAP/+/fw=", { noPadding: true });
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );
});

Deno.test("Bytes.base64Decode() - paddingChar:'!'", () => {
  const decoded11 = Bytes.base64Decode("", { paddingChar: "!" });
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = Bytes.base64Decode("AwIBAP/+/fw!", { paddingChar: "!" });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP/+/fw=", { paddingChar: "!" });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  const decoded12z = Bytes.base64Decode("AwIBAP/+/fw", { paddingChar: "!" });
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("あ", { paddingChar: "!" });
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP_-_fw!", { paddingChar: "!" });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=AwIBAP/+/fw", { paddingChar: "!" });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("!", { paddingChar: "!" });
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP/+/fw,", { paddingChar: "!" });
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.base64Decode() - paddingChar:'!'", () => {
  const decoded12 = Bytes.base64Decode("AwIBAP/+/fw!", { paddingChar: "!" });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );
});

Deno.test("Bytes.base64Decode() - tableLastChars:[string. string]", () => {
  const decoded12 = Bytes.base64Decode("AwIBAP_-_fw=", {
    tableLastChars: ["-", "_"],
  });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  //
  const decoded13 = Bytes.base64Decode("AwIBAP/+/fw=", {
    tableLastChars: ["", ""],
  });
  assertStrictEquals(
    JSON.stringify([...decoded13]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded14 = Bytes.base64Decode("AwIBAP/+/fw=", {
    tableLastChars: ["-"] as unknown as [string, string],
  });
  assertStrictEquals(
    JSON.stringify([...decoded14]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded15 = Bytes.base64Decode("AwIBAP/+/fw=", {
    tableLastChars: [] as unknown as [string, string],
  });
  assertStrictEquals(
    JSON.stringify([...decoded15]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded16 = Bytes.base64Decode("AwIBAP/+/fw=", {
    tableLastChars: ["-", "_", "+"] as unknown as [string, string],
  });
  assertStrictEquals(
    JSON.stringify([...decoded16]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded17 = Bytes.base64Decode("AwIBAP_-_fw=", {
    tableLastChars: ["-", "_"],
    rawTable: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "/",
    ],
  });
  assertStrictEquals(
    JSON.stringify([...decoded17]),
    "[3,2,1,0,255,254,253,252]",
  );
});

Deno.test("Bytes.base64Decode() - Rfc4648Base64UrlOptions", () => {
  const op = {
    rawTable: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  };

  const decoded11 = Bytes.base64Decode("", op);
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  assertThrows(
    () => {
      const opx = {
        rawTable: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "-",
          "_",
        ],
        noPadding: true,
        paddingChar: "A",
      };
      Bytes.base64Decode("AwIBAP/+/fw=", opx);
    },
    RangeError,
    "`Base64Options` error: character duplicated.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP/+/fw=", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP/+/fw", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("あ", op);
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  const decoded12 = Bytes.base64Decode("AwIBAP_-_fw=", op);
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = Bytes.base64Decode("AwIBAP_-_fw", op);
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=AwIBAP_-_fw", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=", op);
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP_-_fw,", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.base64Decode() - Rfc4648Base64UrlOptions - deprecated-1", () => {
  const op = {
    rawTable: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  };

  const decoded11 = Bytes.base64Decode("", op);
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = Bytes.base64Decode("AwIBAP_-_fw=", op);
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = Bytes.base64Decode("AwIBAP_-_fw", op);
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=AwIBAP_-_fw", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=", op);
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP_-_fw,", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.base64Decode() - Rfc4648Base64UrlOptions - deprecated-2", () => {
  const op = {
    rawTable: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "_",
    ],
    table: [
      "B",
      "A",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  };

  const decoded11 = Bytes.base64Decode("", op);
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = Bytes.base64Decode("AwIBAP_-_fw=", op);
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = Bytes.base64Decode("AwIBAP_-_fw", op);
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=AwIBAP_-_fw", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("=", op);
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      Bytes.base64Decode("AwIBAP_-_fw,", op);
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.base64Encode()", () => {
  assertStrictEquals(Bytes.base64Encode(Uint8Array.of()), "");
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252)),
    "AwIBAP/+/fw=",
  );
  assertStrictEquals(Bytes.base64Encode(Uint8Array.of(255)), "/w==");
  assertStrictEquals(Bytes.base64Encode(Uint8Array.of(251)), "+w==");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(Bytes.base64Encode(r1), test(r1.buffer));
  assertStrictEquals(Bytes.base64Encode(r2), test(r2.buffer));
  assertStrictEquals(Bytes.base64Encode(r3), test(r3.buffer));
  assertStrictEquals(Bytes.base64Encode(r4), test(r4.buffer));
  assertStrictEquals(Bytes.base64Encode(r5), test(r5.buffer));
  assertStrictEquals(Bytes.base64Encode(r6), test(r6.buffer));
  assertStrictEquals(Bytes.base64Encode(r7), test(r7.buffer));
  assertStrictEquals(Bytes.base64Encode(r8), test(r8.buffer));
  assertStrictEquals(Bytes.base64Encode(r9), test(r9.buffer));
});

Deno.test("Bytes.base64Encode() - noPadding:true", () => {
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(), { noPadding: true }),
    "",
  );
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      noPadding: true,
    }),
    "AwIBAP/+/fw",
  );
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(255), { noPadding: true }),
    "/w",
  );
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(251), { noPadding: true }),
    "+w",
  );

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    Bytes.base64Encode(r1, { noPadding: true }),
    test(r1.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r2, { noPadding: true }),
    test(r2.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r3, { noPadding: true }),
    test(r3.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r4, { noPadding: true }),
    test(r4.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r5, { noPadding: true }),
    test(r5.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r6, { noPadding: true }),
    test(r6.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r7, { noPadding: true }),
    test(r7.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r8, { noPadding: true }),
    test(r8.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Bytes.base64Encode(r9, { noPadding: true }),
    test(r9.buffer).replace(/=*$/, ""),
  );
});

Deno.test("Bytes.base64Encode() - noPadding:true", () => {
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      noPadding: true,
    }),
    "AwIBAP/+/fw",
  );
});

Deno.test("Bytes.base64Encode() - noPadding:1", () => {
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      noPadding: 1 as unknown as boolean,
    }),
    "AwIBAP/+/fw=",
  );
});

Deno.test("Bytes.base64Encode() - paddingChar:'!'", () => {
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(), { paddingChar: "!" }),
    "",
  );
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      paddingChar: "!",
    }),
    "AwIBAP/+/fw!",
  );
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(255), { paddingChar: "!" }),
    "/w!!",
  );
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(251), { paddingChar: "!" }),
    "+w!!",
  );

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    Bytes.base64Encode(r1, { paddingChar: "!" }),
    test(r1.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r2, { paddingChar: "!" }),
    test(r2.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r3, { paddingChar: "!" }),
    test(r3.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r4, { paddingChar: "!" }),
    test(r4.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r5, { paddingChar: "!" }),
    test(r5.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r6, { paddingChar: "!" }),
    test(r6.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r7, { paddingChar: "!" }),
    test(r7.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r8, { paddingChar: "!" }),
    test(r8.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r9, { paddingChar: "!" }),
    test(r9.buffer).replace(/=/g, "!"),
  );
});

Deno.test("Bytes.base64Encode() - paddingChar:'!'", () => {
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      paddingChar: "!",
    }),
    "AwIBAP/+/fw!",
  );
});

Deno.test("Bytes.base64Encode() - paddingChar:'!!'", () => {
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      paddingChar: "!!",
    }),
    "AwIBAP/+/fw=",
  );
});

Deno.test("Bytes.base64Encode() - Rfc4648Base64UrlOptions", () => {
  const op = {
    rawTable: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  };

  assertStrictEquals(Bytes.base64Encode(Uint8Array.of(), op), "");
  assertStrictEquals(
    Bytes.base64Encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), op),
    "AwIBAP_-_fw",
  );
  assertStrictEquals(Bytes.base64Encode(Uint8Array.of(255), op), "_w");
  assertStrictEquals(Bytes.base64Encode(Uint8Array.of(251), op), "-w");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    Bytes.base64Encode(r1, op),
    test(r1.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r2, op),
    test(r2.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r3, op),
    test(r3.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r4, op),
    test(r4.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r5, op),
    test(r5.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r6, op),
    test(r6.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r7, op),
    test(r7.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r8, op),
    test(r8.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Bytes.base64Encode(r9, op),
    test(r9.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
});

Deno.test("Bytes.Base64Options.*", () => {
  const op1 = Bytes.Base64Options.RFC4648;
  const decoded1 = Bytes.base64Decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded1]),
    "[3,2,1,0,255,254,253,252]",
  );
  const decoded1b = Bytes.base64Decode("AwIBAP/+/fw=", op1);
  assertStrictEquals(
    JSON.stringify([...decoded1b]),
    "[3,2,1,0,255,254,253,252]",
  );

  const op2 = Bytes.Base64Options.RFC4648_URL;
  const decoded2 = Bytes.base64Decode("AwIBAP_-_fw", op2);
  assertStrictEquals(
    JSON.stringify([...decoded2]),
    "[3,2,1,0,255,254,253,252]",
  );

  // assertThrows(() => {
  //   Base64.Options = {};
  // }, TypeError);

  // assertThrows(() => {
  //   Base64.Options["x"] = {};
  // }, TypeError);

  const opx = Bytes.Base64Options.RFC4648 as Bytes.Base64Options;
  assertThrows(() => {
    opx.rawTable = [];
  }, TypeError);
  // assertThrows(() => {
  //   opx.rawTable[0] = "1";
  // }, TypeError);
  assertThrows(() => {
    opx.noPadding = true;
  }, TypeError);
  assertThrows(() => {
    opx.paddingChar = "!";
  }, TypeError);
});
