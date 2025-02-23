import { type byteorder } from "../_typedef/basics.ts";
import * as ByteOrder from "../_const/byte_order.ts";

export function isByteOrder(test: unknown): test is byteorder {
  return Object.values(ByteOrder).includes(test as byteorder);
}

export function assertByteOrder(test: unknown, label: string): void {
  if (isByteOrder(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be \`"big-endian"\` or \`"little-endian"\`.`,
    );
  }
}
