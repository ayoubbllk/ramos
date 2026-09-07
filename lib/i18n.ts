/**
 * Extensible locale registry — add a locale here, then extend UI labels / Localized fields.
 * Content falls back to English, then French, when a translation is missing.
 */
export const locales = ["fr", "en", "de", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export type LocaleMeta = {
  code: Locale;
  /** Native endonym shown in the language switcher */
  label: string;
  /** Short code in the compact nav control */
  short: string;
};

export const localeMeta: LocaleMeta[] = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "it", label: "Italiano", short: "IT" },
];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(pathname: string, next: Locale): string {
  const stripped = pathname.replace(/^\/(fr|en|de|it)(?=\/|$)/, "") || "";
  return `/${next}${stripped}`;
}

/** Prefer requested locale, then EN, then FR, then first available string. */
export function pickLocalized(
  value: Partial<Record<Locale, string>> | null | undefined,
  locale: Locale,
): string {
  if (!value) return "";
  return value[locale] || value.en || value.fr || value.de || value.it || "";
}
