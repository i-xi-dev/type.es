export const Unit = {
  /**
   * B (byte)
   */
  B: "byte",

  /**
   * kB (kilobyte)
   */
  KB: "kilobyte",

  /**
   * KiB (kibibyte)
   */
  KIB: "kibibyte",

  /**
   * MB (megabyte)
   */
  MB: "megabyte",

  /**
   * MiB (mebibyte)
   */
  MIB: "mebibyte",

  /**
   * GB (gigabyte)
   */
  GB: "gigabyte",

  /**
   * GiB (gibibyte)
   */
  GIB: "gibibyte",

  /**
   * TB (terabyte)
   */
  TB: "terabyte",

  /**
   * TiB (tebibyte)
   */
  TIB: "tebibyte",

  /**
   * PB (petabyte)
   */
  PB: "petabyte",

  /**
   * PiB (pebibyte)
   */
  PIB: "pebibyte",
} as const;

export type Unit = typeof Unit[keyof typeof Unit];
