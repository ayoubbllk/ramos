"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Locale } from "@/lib/data";

const labels = {
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

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const l = labels[locale];
  const other = locale === "fr" ? "en" : "fr";
  const switchPath = pathname.replace(/^\/(fr|en)/, `/${other}`);

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
          <img src="/logo/LOGO RAMOS GROUP HD.png" alt="" />
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
          <Link
            className="bouncy-nav-lang"
            href={switchPath}
            aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
          >
            <Globe size={14} />
            {other.toUpperCase()}
          </Link>

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

export function Footer({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const pathname = usePathname();
  const localeFreePath = pathname.replace(/^\/(fr|en)/, "");

  return (
    <footer className="footer">
      <div className="footer-intro">
        <img src="/logo/ramos-bc-mark.png" alt="Ramos Group" />
        <h2>
          {fr
            ? "Construire des ponts entre héritage et progrès."
            : "Building bridges between heritage and progress."}
        </h2>
      </div>

      <div className="footer-grid">
        <div>
          <span>Navigation</span>
          <Link href={`/${locale}/a-propos`}>{fr ? "Le Groupe" : "The Group"}</Link>
          <Link href={`/${locale}/filiales`}>{fr ? "Nos filiales" : "Subsidiaries"}</Link>
          <Link href={`/${locale}/actualites`}>{fr ? "Actualités" : "News"}</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
        </div>
        <div>
          <span>{fr ? "Filiales" : "Subsidiaries"}</span>
          <Link href={`/${locale}/filiales/stone`}>Ramos Stone</Link>
          <Link href={`/${locale}/filiales/construction`}>Ramos Construction</Link>
          <Link href={`/${locale}/filiales/cargo`}>Ramos Cargo Logistics</Link>
          <Link href={`/${locale}/filiales/cyber-control`}>Cyber-Control</Link>
          <Link href={`/${locale}/filiales/icosium`}>Icosium Global</Link>
          <Link href={`/${locale}/filiales/business-center`}>Business Center</Link>
        </div>
        <div>
          <span>Contact</span>
          <a href="mailto:contact@ramos-group.com">contact@ramos-group.com</a>
          <p>Alger, Algérie</p>
        </div>
        <div>
          <span>{fr ? "Langue" : "Language"}</span>
          <Link href={`/fr${localeFreePath}`}>Français</Link>
          <Link href={`/en${localeFreePath}`}>English</Link>
        </div>
      </div>

      <div className="footer-base">
        <p>© {new Date().getFullYear()} Ramos Group</p>
        <p>
          {fr
            ? "Une ambition algérienne, une portée mondiale."
            : "Algerian ambition, global reach."}
        </p>
      </div>
    </footer>
  );
}
