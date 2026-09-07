"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { localeMeta, localePath, type Locale } from "@/lib/data";
import { subsidiaries } from "@/lib/data";

const labels: Record<
  Locale,
  {
    home: string;
    group: string;
    subsidiaries: string;
    news: string;
    contact: string;
    explore: string;
    menu: string;
    close: string;
    mainNav: string;
    brand: string;
    language: string;
  }
> = {
  fr: {
    home: "Accueil",
    group: "Le Groupe",
    subsidiaries: "Filiales",
    news: "Actualités",
    contact: "Contact",
    explore: "Explorer",
    menu: "Ouvrir le menu",
    close: "Fermer le menu",
    mainNav: "Navigation principale",
    brand: "Ramos Group — accueil",
    language: "Langue",
  },
  en: {
    home: "Home",
    group: "The Group",
    subsidiaries: "Subsidiaries",
    news: "News",
    contact: "Contact",
    explore: "Explore",
    menu: "Open menu",
    close: "Close menu",
    mainNav: "Main navigation",
    brand: "Ramos Group — home",
    language: "Language",
  },
  de: {
    home: "Startseite",
    group: "Die Gruppe",
    subsidiaries: "Tochtergesellschaften",
    news: "Aktuelles",
    contact: "Kontakt",
    explore: "Entdecken",
    menu: "Menü öffnen",
    close: "Menü schließen",
    mainNav: "Hauptnavigation",
    brand: "Ramos Group — Startseite",
    language: "Sprache",
  },
  it: {
    home: "Home",
    group: "Il Gruppo",
    subsidiaries: "Filiali",
    news: "Notizie",
    contact: "Contatto",
    explore: "Esplora",
    menu: "Apri il menu",
    close: "Chiudi il menu",
    mainNav: "Navigazione principale",
    brand: "Ramos Group — home",
    language: "Lingua",
  },
};

const BOUNCE = { type: "spring" as const, stiffness: 500, damping: 24 };
const MOBILE_BP = 900;

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = localeMeta.find((l) => l.code === locale) || localeMeta[0];
  const l = labels[locale];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="bouncy-nav-lang-wrap" ref={rootRef}>
      <button
        type="button"
        className="bouncy-nav-lang"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={l.language}
        onClick={() => startTransition(() => setOpen((v) => !v))}
      >
        <Globe size={14} />
        {current.short}
        <ChevronDown size={12} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="bouncy-nav-lang-menu"
            role="listbox"
            aria-label={l.language}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={BOUNCE}
          >
            {localeMeta.map((item) => (
              <li key={item.code} role="option" aria-selected={item.code === locale}>
                <Link
                  href={localePath(pathname, item.code)}
                  className={item.code === locale ? "is-active" : undefined}
                  hrefLang={item.code}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const l = labels[locale];

  const links: { label: string; href: string }[] = [
    { label: l.home, href: `/${locale}` },
    { label: l.group, href: `/${locale}/a-propos` },
    { label: l.subsidiaries, href: `/${locale}/filiales` },
    { label: l.news, href: `/${locale}/actualites` },
    { label: l.contact, href: `/${locale}/contact` },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updatePill = useCallback((index: number | null) => {
    if (index === null) {
      startTransition(() => setPill((s) => ({ ...s, opacity: 0 })));
      return;
    }
    const el = linkRefs.current[index];
    if (!el) return;
    startTransition(() =>
      setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 }),
    );
  }, []);

  useEffect(() => {
    updatePill(hoveredIndex);
  }, [hoveredIndex, updatePill, isMobile]);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < MOBILE_BP;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeIndex = links.findIndex((item) => item.href === pathname);

  return (
    <header className={["bouncy-nav", scrolled ? "is-scrolled" : ""].filter(Boolean).join(" ")}>
      <nav className="bouncy-nav-bar" aria-label={l.mainNav}>
        <Link href={`/${locale}`} className="bouncy-nav-logo" aria-label={l.brand}>
          <img src="/logo/LOGO RAMOS GROUP HD.png" alt="Ramos Group" />
        </Link>

        {!isMobile && (
          <div
            className="bouncy-nav-links"
            onMouseLeave={() => startTransition(() => setHoveredIndex(null))}
          >
            <motion.div
              className="bouncy-nav-pill"
              animate={{
                left: pill.left,
                width: pill.width,
                opacity: pill.opacity,
              }}
              transition={BOUNCE}
              aria-hidden
            />
            {links.map((item, i) => {
              const active = i === activeIndex;
              const hovered = hoveredIndex === i;
              return (
                <div
                  key={item.href}
                  className="bouncy-nav-item"
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  onMouseEnter={() => startTransition(() => setHoveredIndex(i))}
                >
                  <Link
                    href={item.href}
                    className={[
                      "bouncy-nav-link",
                      active || hovered ? "is-hot" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="bouncy-nav-right">
          <LanguageSwitcher locale={locale} />

          {!isMobile && (
            <motion.div whileTap={{ scale: 0.95 }} transition={BOUNCE}>
              <Link href={`/${locale}/filiales`} className="bouncy-nav-cta">
                {l.explore}
              </Link>
            </motion.div>
          )}

          {isMobile && (
            <motion.button
              type="button"
              className="bouncy-nav-toggle"
              onClick={() => startTransition(() => setMobileOpen((v) => !v))}
              whileTap={{ scale: 0.9 }}
              transition={BOUNCE}
              aria-label={mobileOpen ? l.close : l.menu}
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </motion.button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            className="bouncy-nav-drawer"
            key="drawer"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={BOUNCE}
          >
            {links.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...BOUNCE, delay: i * 0.04 }}
              >
                <Link
                  href={item.href}
                  className={[
                    "bouncy-nav-drawer-link",
                    item.href === pathname ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="bouncy-nav-drawer-sep" />
            <div className="bouncy-nav-drawer-langs" role="list" aria-label={l.language}>
              {localeMeta.map((item) => (
                <Link
                  key={item.code}
                  role="listitem"
                  href={localePath(pathname, item.code)}
                  className={["bouncy-nav-drawer-lang", item.code === locale ? "is-active" : ""]
                    .filter(Boolean)
                    .join(" ")}
                  hrefLang={item.code}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...BOUNCE, delay: links.length * 0.04 + 0.05 }}
            >
              <Link href={`/${locale}/filiales`} className="bouncy-nav-cta bouncy-nav-cta--block">
                {l.explore}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const footerCopy: Record<
  Locale,
  { tagline: string; nav: string; subsidiaries: string; ourSubsidiaries: string; language: string; motto: string }
> = {
  fr: {
    tagline: "Construire des ponts entre héritage et progrès.",
    nav: "Navigation",
    subsidiaries: "Filiales",
    ourSubsidiaries: "Nos filiales",
    language: "Langue",
    motto: "Une ambition algérienne, une portée mondiale.",
  },
  en: {
    tagline: "Building bridges between heritage and progress.",
    nav: "Navigation",
    subsidiaries: "Subsidiaries",
    ourSubsidiaries: "Subsidiaries",
    language: "Language",
    motto: "Algerian ambition, global reach.",
  },
  de: {
    tagline: "Brücken zwischen Erbe und Fortschritt bauen.",
    nav: "Navigation",
    subsidiaries: "Tochtergesellschaften",
    ourSubsidiaries: "Unsere Gesellschaften",
    language: "Sprache",
    motto: "Algerischer Anspruch, globale Reichweite.",
  },
  it: {
    tagline: "Costruire ponti tra eredità e progresso.",
    nav: "Navigazione",
    subsidiaries: "Filiali",
    ourSubsidiaries: "Le nostre filiali",
    language: "Lingua",
    motto: "Ambizione algerina, portata globale.",
  },
};

export function Footer({ locale }: { locale: Locale }) {
  const copy = footerCopy[locale];
  const pathname = usePathname();
  const groupLabel = locale === "de" ? "Die Gruppe" : locale === "it" ? "Il Gruppo" : locale === "en" ? "The Group" : "Le Groupe";
  const newsLabel = locale === "de" ? "Aktuelles" : locale === "it" ? "Notizie" : locale === "en" ? "News" : "Actualités";

  return (
    <footer className="footer">
      <div className="footer-intro">
        <img src="/logo/LOGO RAMOS GROUP HD.png" alt="Ramos Group" />
        <h2>{copy.tagline}</h2>
      </div>

      <div className="footer-grid">
        <div>
          <span>{copy.nav}</span>
          <Link href={`/${locale}/a-propos`}>{groupLabel}</Link>
          <Link href={`/${locale}/filiales`}>{copy.ourSubsidiaries}</Link>
          <Link href={`/${locale}/actualites`}>{newsLabel}</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
        </div>
        <div>
          <span>{copy.subsidiaries}</span>
          {subsidiaries.map((item) => (
            <Link key={item.slug} href={`/${locale}/filiales/${item.slug}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <span>Contact</span>
          <a href="mailto:contact@ramos-group.com">contact@ramos-group.com</a>
          <p>Alger, Algérie</p>
        </div>
        <div>
          <span>{copy.language}</span>
          {localeMeta.map((item) => (
            <Link key={item.code} href={localePath(pathname, item.code)} hrefLang={item.code}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-base">
        <p>© {new Date().getFullYear()} Ramos Group</p>
        <p>{copy.motto}</p>
      </div>
    </footer>
  );
}
