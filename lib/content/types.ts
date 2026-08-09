import type { Locale } from "../data";

/** Text from Word docs — use `en` as source of truth; `fr` when provided. */
export type DocText = { en: string; fr?: string };

export type DocBlock =
  | { type: "p"; text: DocText }
  | { type: "lead"; text: DocText }
  | { type: "h3"; text: DocText }
  | { type: "h4"; text: DocText }
  | { type: "ul"; items: DocText[] }
  | { type: "ol"; items: DocText[] }
  | { type: "quote"; text: DocText }
  | { type: "grid"; items: { title: DocText; body: DocText }[] }
  | { type: "table"; headers: DocText[]; rows: DocText[][] }
  | { type: "pillars"; items: { title: DocText; body: DocText }[] }
  | { type: "steps"; items: { number: string; title: DocText; subtitle?: DocText; blocks: DocBlock[] }[] };

export type DocSection = {
  id: string;
  title: DocText;
  blocks: DocBlock[];
};

export type SubsidiaryDocument = {
  /** Full Word-derived overview (kept in addition to short intro) */
  overview: DocBlock[];
  mission?: DocText;
  sections: DocSection[];
  closing?: DocBlock[];
};

export function docT(value: DocText, locale: Locale): string {
  if (locale === "fr" && value.fr) return value.fr;
  return value.en;
}

export function en(text: string): DocText {
  return { en: text };
}
