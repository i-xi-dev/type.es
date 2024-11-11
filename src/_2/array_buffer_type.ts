import { assertIterable as assertIterableObject } from "../_0/object_type.ts";
import { Uint8 } from "./uint_type.ts";

export function fromUint8Iterable(
  value: Iterable<number /* Uint8 */>,
): ArrayBuffer {
  assertIterableObject(value, "value");

  return Uint8Array.from(value, (i) => {
    if (Uint8.is(i)) {
      return i;
    }
    throw new RangeError("value[*]");
  }).buffer;
}
