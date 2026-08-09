"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteButton } from "@/components/site-button";

interface CarouselCard {
  image: string;
  headline: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  accent?: string;
  logo?: string;
}

interface VelocityCarouselProps {
  cards: CarouselCard[];
  backgroundColor?: string;
}

export function VelocityCarousel({ cards, backgroundColor = "#0a1628" }: VelocityCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = containerWidth < 640;
  const cardSize = isMobile
    ? Math.min(containerWidth * 0.75, 320)
    : Math.min(containerWidth * 0.3, 380);
  const gap = isMobile ? cardSize * 0.85 : cardSize + 40;

  const goTo = useCallback((i: number) => {
    setActiveIndex(Math.max(0, Math.min(i, cards.length - 1)));
  }, [cards.length]);

  const prev = useCallback(() => {
    setActiveIndex(c => (c === 0 ? cards.length - 1 : c - 1));
  }, [cards.length]);

  const next = useCallback(() => {
    setActiveIndex(c => (c === cards.length - 1 ? 0 : c + 1));
  }, [cards.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <div
      ref={containerRef}
      className="vc-container"
      style={{
        background: backgroundColor,
        ["--card-size" as string]: `${cardSize}px`,
      }}
    >
      <motion.div
        className="vc-track"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        dragDirectionLock
        onDragStart={(_, info) => setDragStart(info.point.x)}
        onDragEnd={(_, info) => {
          const diff = info.point.x - dragStart;
          if (Math.abs(diff) > 40) {
            diff > 0 ? prev() : next();
          }
        }}
      >
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const distance = index - activeIndex;
          const x = distance * gap;
          const scale = isActive ? 1 : 0.82;

          return (
            <motion.div
              key={index}
              className={`vc-card ${isActive ? "vc-card-active" : ""}`}
              animate={{ x, scale, opacity: Math.abs(distance) > 2 ? 0.4 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => !isActive && goTo(index)}
              style={{
                width: cardSize,
                height: cardSize,
                zIndex: isActive ? 50 : 50 - Math.abs(distance),
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <img src={card.image} alt={card.headline} className="vc-card-img" draggable={false} />
              <div className="vc-card-overlay" style={{ opacity: isActive ? 0.45 : 0.6 }} />
              {card.logo && (
                <div className="vc-card-logo">
                  <img src={card.logo} alt="" />
                </div>
              )}
              {isActive && (
                <motion.div
                  className="vc-card-content"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3>{card.headline}</h3>
                  <p>{card.text}</p>
                  <SiteButton href={card.buttonLink} variant="nova" size="sm" className="vc-card-btn">
                    {card.buttonText}
                  </SiteButton>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="vc-indicators">
        {cards.map((_, i) => (
          <button
            key={i}
            className={`vc-dot ${i === activeIndex ? "vc-dot-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
