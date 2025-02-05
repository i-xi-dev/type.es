import { ByteOrder } from "./basics/byte_order.ts";
import { ZERO as NUMBER_ZERO } from "./const/number.ts";

export const BYTE_ORDER = (() => {
  return ((new Uint8Array(Uint16Array.of(0xFEFF).buffer))[NUMBER_ZERO] === 0xFE)
    ? ByteOrder.BIG_ENDIAN
    : ByteOrder.LITTLE_ENDIAN;
})();
