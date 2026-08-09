"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type StatsTickerItem = {
  id: string;
  title: string;
  label: string;
  image: string;
  href: string;
};

type InteractiveStatsTickerProps = {
  items: StatsTickerItem[];
  ariaLabel: string;
};

export function InteractiveStatsTicker({ items, ariaLabel }: InteractiveStatsTickerProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const active = items.find((item) => item.id === activeId) ?? null;
  // Build one visual unit wide enough, then duplicate once for a seamless -50% loop.
  let unit = [...items];
  while (unit.length > 0 && unit.length < 4) unit = [...unit, ...items];
  const track = [...unit, ...unit];

  return (
    <section
      className={`ist ${active ? "ist--hover" : ""} ${reducedMotion ? "ist--reduced" : ""}`}
      aria-label={ariaLabel}
      onMouseLeave={() => setActiveId(null)}
    >
      <div className="ist-mask">
        <div className="ist-track" aria-hidden={!!active}>
          {track.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={item.href}
              className="ist-item"
              tabIndex={index >= unit.length ? -1 : undefined}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
            >
              <span className="ist-thumb">
                <img src={item.image} alt="" loading="lazy" />
              </span>
              <span className="ist-copy">
                <span className="ist-title">{item.title}</span>
                <span className="ist-label">{item.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            className="ist-hover"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          >
            <Link href={active.href} className="ist-hover-link" aria-label={`${active.title} — ${active.label}`}>
              <img className="ist-hover-image" src={active.image} alt="" />
              <span className="ist-hover-veil" aria-hidden="true" />
              <span className="ist-hover-track-wrap" aria-hidden="true">
                <span className="ist-hover-track">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="ist-hover-chip">
                      <span>{active.title}</span>
                      <span className="ist-hover-arrow">↗</span>
                    </span>
                  ))}
                </span>
              </span>
              <span className="ist-hover-caption">{active.label}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
