import { type uint16 } from "../_typedef/mod.ts";

type _Record = {
  scheme: string;
  userName: string;
  password: string;
  host: string;
  port: uint16 | null;
  path: Array<string>;
  query: string | null;
  fragment: string | null;
};
