"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type MotionGalleryProps = {
  images: string[];
  altPrefix?: string;
};

export function MotionGallery({ images, altPrefix = "Photo" }: MotionGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-ps-card]"));
      if (!cards.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const mid = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, [images.length]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-ps-card]")[index];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  if (!images.length) return null;

  return (
    <div className="mg-root">
      <div className="mg-track" ref={trackRef}>
        {images.map((src, i) => (
          <motion.figure
            key={`${src}-${i}`}
            data-ps-card
            className={`mg-card${i === active ? " mg-card-active" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.35) }}
          >
            <img src={src} alt={`${altPrefix} ${i + 1}`} loading="lazy" />
          </motion.figure>
        ))}
      </div>
      {images.length > 1 && (
        <div className="mg-dots" role="tablist" aria-label="Galerie">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`mg-dot${i === active ? " mg-dot-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
