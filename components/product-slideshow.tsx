"use client";

import { useEffect, useId, useRef, useState, startTransition } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteButton } from "@/components/site-button";

export type SlideshowItem = {
  image: string;
  title: string;
  description: string;
  meta?: string;
  href?: string;
  linkLabel?: string;
};

type ProductSlideshowProps = {
  items: SlideshowItem[];
  backdropText?: string;
  emptyLabel?: string;
};

export function ProductSlideshow({
  items,
  backdropText = "RAMOS",
  emptyLabel = "Découvrir",
}: ProductSlideshowProps) {
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollCooldown = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isZoomed = selectedIndex !== null;
  const active = selectedIndex !== null ? items[selectedIndex] : null;

  const open = (index: number) => {
    startTransition(() => setSelectedIndex(index));
  };

  const close = () => {
    startTransition(() => setSelectedIndex(null));
  };

  const goNext = () => {
    startTransition(() => {
      setSelectedIndex((current) => {
        if (current === null) return current;
        return current < items.length - 1 ? current + 1 : current;
      });
    });
  };

  const goPrev = () => {
    startTransition(() => {
      setSelectedIndex((current) => {
        if (current === null) return current;
        return current > 0 ? current - 1 : current;
      });
    });
  };

  useEffect(() => {
    if (!isZoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isZoomed, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isZoomed) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollCooldown.current) return;
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;
      scrollCooldown.current = true;
      if (delta > 0) goNext();
      else goPrev();
      setTimeout(() => {
        scrollCooldown.current = false;
      }, 450);
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [isZoomed, items.length]);

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className={`ps-root${isZoomed ? " ps-root-zoomed" : ""}`}
      tabIndex={0}
      role="region"
      aria-label="Filiales"
    >
      {!isZoomed && (
        <p className="ps-backdrop" aria-hidden="true">
          {backdropText}
        </p>
      )}

      <div className="ps-track">
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          const distance = selectedIndex === null ? 0 : Math.abs(selectedIndex - index);
          const dimmed = (!isZoomed && hoveredIndex !== null && hoveredIndex !== index)
            || (isZoomed && !isSelected);

          return (
            <motion.button
              key={`${item.title}-${index}`}
              type="button"
              layoutId={`ps-card-${instanceId}-${index}`}
              className={`ps-card${isSelected ? " ps-card-active" : ""}${dimmed ? " ps-card-dimmed" : ""}`}
              onClick={() => {
                if (isZoomed) {
                  if (isSelected) close();
                  else open(index);
                } else {
                  open(index);
                }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={
                isZoomed
                  ? {
                      scale: isSelected ? 2.05 : Math.max(0.55, 2.05 - distance * 0.35),
                      x: (index - (selectedIndex ?? 0)) * 280,
                      opacity: isSelected ? 1 : 0.22,
                    }
                  : { scale: 1, x: 0, opacity: dimmed ? 0.45 : 1 }
              }
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              whileHover={!isZoomed ? { scale: 1.04, y: -4 } : undefined}
              aria-label={item.title}
              aria-expanded={isSelected}
            >
              <span className="ps-card-media">
                <img src={item.image} alt="" />
              </span>
              {!isZoomed && (
                <span className="ps-card-label">{item.title}</span>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isZoomed && active && (
          <motion.div
            className="ps-info"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
          >
            <button type="button" className="ps-close" onClick={close} aria-label="Fermer">
              <X size={18} />
            </button>
            {active.meta && <p className="ps-meta">{active.meta}</p>}
            <h3>{active.title}</h3>
            <p className="ps-desc">{active.description}</p>
            {active.href && (
              <SiteButton href={active.href} variant="action" fullWidth onClick={(e) => e.stopPropagation()}>
                {active.linkLabel || emptyLabel}
              </SiteButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isZoomed && (
        <button type="button" className="ps-scrim" aria-label="Fermer" onClick={close} />
      )}
    </div>
  );
}
