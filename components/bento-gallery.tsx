"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type BentoGalleryProps = {
  images: string[];
  altPrefix?: string;
};

const SPAN_PATTERN = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
];

export function BentoGallery({ images, altPrefix = "Photo" }: BentoGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const cells = useMemo(
    () =>
      images.slice(0, 6).map((src, i) => ({
        src,
        ...SPAN_PATTERN[i % SPAN_PATTERN.length],
      })),
    [images],
  );

  if (!cells.length) return null;

  return (
    <>
      <div className="bg-grid">
        {cells.map((cell, i) => (
          <motion.button
            key={`${cell.src}-${i}`}
            type="button"
            className="bg-cell"
            style={{ gridColumn: `span ${cell.col}`, gridRow: `span ${cell.row}` }}
            onClick={() => setLightbox(i)}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.3) }}
            whileHover={{ scale: 1.01 }}
            aria-label={`${altPrefix} ${i + 1}`}
          >
            <img src={cell.src} alt={`${altPrefix} ${i + 1}`} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="bg-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button type="button" className="bg-lightbox-close" aria-label="Fermer" onClick={() => setLightbox(null)}>
              <X size={20} />
            </button>
            <motion.img
              key={cells[lightbox].src}
              src={cells[lightbox].src}
              alt={`${altPrefix} ${lightbox + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
