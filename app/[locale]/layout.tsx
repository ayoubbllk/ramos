import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { body, display } from "../fonts";
import { Footer, Header } from "@/components/site-chrome";
import { ScrollProgress } from "@/components/animations";
import { isLocale, type Locale } from "@/lib/data";
import { locales } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const descriptions: Record<Locale, string> = {
  fr: "Ramos Group — un groupe algérien multidisciplinaire, de l'industrie à l'innovation.",
  en: "Ramos Group — an Algerian multidisciplinary group, from industry to innovation.",
  de: "Ramos Group — eine algerische multidisziplinäre Gruppe, von der Industrie bis zur Innovation.",
  it: "Ramos Group — un gruppo algerino multidisciplinare, dall'industria all'innovazione.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const code = (isLocale(locale) ? locale : "fr") as Locale;
  return {
    title: { default: "Ramos Group", template: "%s — Ramos Group" },
    description: descriptions[code],
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <ScrollProgress />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
