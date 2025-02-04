/** `/^[a-z]{2,3}$/` */
export type language = string;

/** `/^[A-Z][a-z]{3}$/` */
export type script = string;

/** `/^[A-Z]{2}$/` */
export type region = string;

/** Unicode plane */
export type plane =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;
