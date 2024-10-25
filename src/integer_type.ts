import { isString } from "./string_type.ts";
import { Radix, radixPropertiesOf } from "./numeric_type.ts";

export function isStringified(
  test: unknown,
  radix?: Radix,
): test is string {
  const integralRegex = radixPropertiesOf(radix).digitsRegex;
  return isString(test) && integralRegex.test(test);
}

export function assertStringified(
  test: unknown,
  label: string,
  radix?: Radix,
): void {
  if (isStringified(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be ${
        radixPropertiesOf(radix).label
      } representation of an integer.`,
    );
  }
}
