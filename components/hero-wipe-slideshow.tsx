"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroWipeSlideshowProps = {
  images: string[];
  altPrefix?: string;
  interval?: number;
  autoplay?: boolean;
};

export function HeroWipeSlideshow({
  images,
  altPrefix = "Photo",
  interval = 4.5,
  autoplay = true,
}: HeroWipeSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovering, setHovering] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  const count = images.length;

  const goTo = useCallback((next: number, dir: number) => {
    setPrevIndex(index);
    setDirection(dir);
    setIndex((next + count) % count);
  }, [count, index]);

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || count <= 1 || hovering || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(goNext, Math.max(2000, interval * 1000));
    return () => window.clearInterval(id);
  }, [autoplay, count, goNext, hovering, inView, interval]);

  if (!count) return null;

  const current = images[index];
  const previous = images[prevIndex];

  return (
    <div
      ref={rootRef}
      className="hws-root"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="hws-stage">
        <img className="hws-base" src={previous} alt="" aria-hidden="true" />
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current}
            className="hws-wipe"
            initial={{
              clipPath: direction >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
              scale: 1.04,
            }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
          >
            <img src={current} alt={`${altPrefix} ${index + 1}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="hws-controls">
          <button type="button" className="hws-btn" onClick={goPrev} aria-label="Précédent">
            <ChevronLeft size={18} />
          </button>
          <span className="hws-count">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button type="button" className="hws-btn" onClick={goNext} aria-label="Suivant">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
