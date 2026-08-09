"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteButton } from "@/components/site-button";

export type ImmersiveCard = {
  image: string;
  video?: string;
  title: string;
  subtitle?: string;
  logo?: string;
  buttonText: string;
  link: string;
  accent?: string;
};

type Breakpoint = "mobile" | "tablet" | "desktop";

const OFFSET: Record<Breakpoint, number> = { mobile: 80, tablet: 140, desktop: 180 };

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return bp;
}

function cardTransform(distanceFromActive: number, direction: number, bp: Breakpoint, blur: number) {
  const offset = OFFSET[bp] * direction;
  const mobile = bp === "mobile";
  const tablet = bp === "tablet";

  if (distanceFromActive === 0) return { scale: 1, blur: 0, zIndex: 10, x: 0, y: 0 };
  if (distanceFromActive === 1)
    return { scale: mobile ? 0.92 : tablet ? 0.8 : 0.85, blur: mobile ? 0 : blur * 0.5, zIndex: 5, x: offset, y: mobile ? 5 : tablet ? 15 : 20 };
  if (distanceFromActive === 2)
    return { scale: mobile ? 0.88 : tablet ? 0.65 : 0.7, blur: mobile ? 1 : blur, zIndex: 3, x: offset, y: mobile ? 8 : tablet ? 30 : 40 };
  return { scale: mobile ? 0.85 : tablet ? 0.55 : 0.6, blur: mobile ? 2 : blur * 1.33, zIndex: 1, x: offset, y: mobile ? 10 : tablet ? 45 : 60 };
}

export function ImmersiveCarousel({
  cards,
  backgroundBlur = 6,
  ariaLabel,
  previousLabel = "Précédent",
  nextLabel = "Suivant",
}: {
  cards: ImmersiveCard[];
  backgroundBlur?: number;
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
}) {
  const bp = useBreakpoint();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(cards.length / 2));

  const goTo = useCallback(
    (index: number) => setActiveIndex(Math.max(0, Math.min(cards.length - 1, index))),
    [cards.length],
  );
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Horizontal wheel / trackpad swipe navigates the stack.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (event.deltaX > 20) next();
      else if (event.deltaX < -20) previous();
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [next, previous]);

  return (
    <div className="ic-root" ref={containerRef} role="group" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="ic-stage">
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const { scale, blur, zIndex, x, y } = cardTransform(
            Math.abs(index - activeIndex),
            Math.sign(index - activeIndex),
            bp,
            backgroundBlur,
          );

          return (
            <motion.div
              key={card.link}
              className={`ic-card ${isActive ? "ic-card-active" : ""}`}
              style={{ zIndex, "--ic-accent": card.accent } as React.CSSProperties}
              animate={{ scale, x, y, filter: `blur(${blur}px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              whileHover={isActive ? { scale: scale * 1.02 } : undefined}
              onClick={() => !isActive && goTo(index)}
              onKeyDown={(event) => {
                if (isActive) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  goTo(index);
                }
              }}
              role={isActive ? undefined : "button"}
              tabIndex={isActive ? -1 : 0}
              aria-hidden={!isActive}
              aria-label={isActive ? undefined : card.title}
            >
              <div className="ic-card-inner">
                <div className="ic-card-head">
                  {card.logo && <img className="ic-card-logo" src={card.logo} alt="" />}
                  <p className="ic-card-title">{card.title}</p>
                  {card.subtitle && <p className="ic-card-subtitle">{card.subtitle}</p>}
                </div>
                <div className="ic-card-media">
                  {card.image ? (
                    <img src={card.image} alt={card.title} />
                  ) : (
                    <video muted loop playsInline autoPlay preload="metadata">
                      <source src={card.video} type="video/mp4" />
                    </video>
                  )}
                  <SiteButton
                    className="ic-card-button"
                    href={card.link}
                    variant="nova"
                    size="sm"
                    onClick={(event) => !isActive && event.preventDefault()}
                  >
                    {card.buttonText}
                  </SiteButton>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="ic-arrow ic-arrow-prev" type="button" onClick={previous} disabled={activeIndex === 0} aria-label={previousLabel}>
        <ChevronLeft size={20} />
      </button>
      <button
        className="ic-arrow ic-arrow-next"
        type="button"
        onClick={next}
        disabled={activeIndex === cards.length - 1}
        aria-label={nextLabel}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
