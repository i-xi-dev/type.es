import { _utfPercentDecode } from "../_utils.ts";

export function decode(urlFragment: string): string {
  return _utfPercentDecode(urlFragment);
}
