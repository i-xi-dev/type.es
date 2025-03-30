import { fromBytes as utf8Decode } from "../text/mod.ts";
import { percentDecode } from "../bytes/mod.ts";

export function _utfPercentDecode(encoded: string): string {
  return utf8Decode(percentDecode(encoded));
}
