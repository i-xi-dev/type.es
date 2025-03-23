import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../../mod.ts";

Deno.test("Bytes.Base64Decoder.prototype.decode()", () => {
  const decoder = new Bytes.Base64Decoder();

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode(0 as unknown as string);
    },
    TypeError,
    "`encoded` must be a `string`.",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw=");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("=");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.Base64Decoder.prototype.decode() - noPadding:true", () => {
  const decoder = new Bytes.Base64Decoder({ noPadding: true });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12z = decoder.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12 = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw=");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("=");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.Base64Decoder.prototype.decode() - paddingChar:'!'", () => {
  const decoder = new Bytes.Base64Decoder({ paddingChar: "!" });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder.decode("AwIBAP/+/fw!");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw=");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  const decoded12z = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw!");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("!");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.Base64Decoder.prototype.decode() - Rfc4648Base64UrlOptions", () => {
  const decoder = new Bytes.Base64Decoder({
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
  });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw=");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  const decoded12 = decoder.decode("AwIBAP_-_fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = decoder.decode("AwIBAP_-_fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP_-_fw");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );

  assertThrows(
    () => {
      decoder.decode("=");
    },
    TypeError,
    "The length of `encoded` is invalid.",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw,");
    },
    TypeError,
    "`encoded` contains invalid character.",
  );
});

Deno.test("Bytes.Base64Decoder.prototype.decode() - Rfc4648Base64UrlOptions - deprecated-1", () => {
  const decoder = new Bytes.Base64Decoder({
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
  });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder.decode("AwIBAP_-_fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = decoder.decode("AwIBAP_-_fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );
});
