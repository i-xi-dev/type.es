import _langs from "../../dat/i18n/lang_map.json" with { type: "json" };
import _regions from "../../dat/i18n/region_map.json" with { type: "json" };
import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };

/**
 * A BCP47 language code.
 * (ISO 639 language alpha-2 code if alpha-2 code is exist, or alpha-3(T) code if alpha-2 code is not exist)
 */
export type lang = keyof typeof _langs;

/**
 * A BCP47 region code.
 * (ISO 3166-1 country alpha-2 code)
 */
export type region = keyof typeof _regions;

/**
 * A BCP47 script code.
 * (ISO 15924 script alpha-4 code)
 */
export type script = keyof typeof _scripts;
