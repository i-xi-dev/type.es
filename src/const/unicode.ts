export const Plane = {
  BMP: 0,
  SMP: 1,
  SIP: 2,
  TIP: 3,
  SSP: 14,
  SPUA_A: 15,
  SPUA_B: 16,
};

export const GeneralCategory = {
  UPPERCASE_LETTER: "Lu",
  LOWERCASE_LETTER: "Ll",
  TITLECASE_LETTER: "Lt",
  CASED_LETTER: "LC", // Lu | Ll | Lt
  MODIFIER_LETTER: "Lm",
  OTHER_LETTER: "Lo",
  LETTER: "L", // Lu | Ll | Lt | Lm | Lo
  NONSPACING_MARK: "Mn",
  SPACING_MARK: "Mc",
  ENCLOSING_MARK: "Me",
  MARK: "M", // Mn | Mc | Me
  DECIMAL_NUMBER: "Nd",
  LETTER_NUMBER: "Nl",
  OTHER_NUMBER: "No",
  NUMBER: "N", // Nd | Nl | No
  CONNECTOR_PUNCTUATION: "Pc",
  DASH_PUNCTUATION: "Pd",
  OPEN_PUNCTUATION: "Ps",
  CLOSE_PUNCTUATION: "Pe",
  INITIAL_PUNCTUATION: "Pi",
  FINAL_PUNCTUATION: "Pf",
  OTHER_PUNCTUATION: "Po",
  PUNCTUATION: "P", // Pc | Pd | Ps | Pe | Pi | Pf | Po
  MATH_SYMBOL: "Sm",
  CURRENCY_SYMBOL: "Sc",
  MODIFIER_SYMBOL: "Sk",
  OTHER_SYMBOL: "So",
  SYMBOL: "S", // Sm | Sc | Sk | So
  SPACE_SEPARATOR: "Zs",
  LINE_SEPARATOR: "Zl",
  PARAGRAPH_SEPARATOR: "Zp",
  SEPARATOR: "Z", // Zs | Zl | Zp
  CONTROL: "Cc",
  FORMAT: "Cf",
  SURROGATE: "Cs",
  PRIVATE_USE: "Co",
  UNASSIGNED: "Cn",
  OTHER: "C", // Cc | Cf | Cs | Co | Cn
} as const;

export type GeneralCategory =
  typeof GeneralCategory[keyof typeof GeneralCategory];
