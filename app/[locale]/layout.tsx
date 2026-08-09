import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { body, display } from "../fonts";
import { Footer, Header } from "@/components/site-chrome";
import { ScrollProgress } from "@/components/animations";
import type { Locale } from "@/lib/data";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === "en";
  return {
    title: { default: "Ramos Group", template: "%s — Ramos Group" },
    description: english
      ? "Ramos Group — an Algerian multidisciplinary group, from industry to innovation."
      : "Ramos Group — un groupe algérien multidisciplinaire, de l'industrie à l'innovation.",
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") notFound();
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <ScrollProgress />
        <Header locale={locale as Locale} />
        <main>{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
