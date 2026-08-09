"use client";

import { useEffect, useState, type CSSProperties } from "react";

type ChromaLogoProps = {
  src: string;
  alt: string;
  className?: string;
  /**
   * Max RGB distance from sampled corner background to treat as transparent.
   * Only applied to near-pure black plate pixels (never brand colors or lettering).
   */
  tolerance?: number;
  /**
   * Densify charcoal lettering into solid dark ink for light cards.
   * Never touches saturated brand colors (gold, purple, green, etc.).
   */
  liftDarkInk?: boolean;
  /** How strongly to push charcoal text toward solid near-black (0–1). */
  inkStrength?: number;
  style?: CSSProperties;
};

function sampleBackground(data: Uint8ClampedArray, w: number, h: number) {
  const points = [
    [2, 2],
    [w - 3, 2],
    [2, h - 3],
    [w - 3, h - 3],
    [Math.floor(w / 2), 2],
    [Math.floor(w / 2), h - 3],
  ];
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (const [x, y] of points) {
    const i = (Math.max(0, Math.min(h - 1, y)) * w + Math.max(0, Math.min(w - 1, x))) * 4;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n += 1;
  }
  return { r: r / n, g: g / n, b: b / n };
}

/**
 * Removes flat black backgrounds while keeping:
 * - saturated brand colors (no hue deformation)
 * - near-black / charcoal lettering densified for light cards (Cyber, Icosium)
 */
export function ChromaLogo({
  src,
  alt,
  className,
  tolerance = 18,
  liftDarkInk = true,
  inkStrength = 0.92,
  style,
}: ChromaLogoProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const strength = Math.max(0, Math.min(1, inkStrength));

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      if (canvas.width < 4 || canvas.height < 4) {
        setUrl(src);
        return;
      }
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setUrl(src);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const bg = sampleBackground(data, canvas.width, canvas.height);
      const tol = Math.max(6, tolerance);
      const soft = tol + 10;
      const inkTarget = 14; // solid near-black for light card contrast

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a === 0) continue;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const isNeutral = sat < 0.16;

        const dr = r - bg.r;
        const dg = g - bg.g;
        const db = b - bg.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);

        // Only punch the true black plate — keep charcoal lettering
        const isPlate = isNeutral && lum <= 5;
        if (isPlate && dist <= tol) {
          data[i + 3] = 0;
          continue;
        }
        if (isPlate && dist < soft) {
          data[i + 3] = Math.round(a * ((dist - tol) / (soft - tol)));
          continue;
        }

        // Densify neutral charcoal / gray lettering → solid dark ink on light cards
        // (Cyber "CYBER CONTROLS", Icosium "Icosium Global Network")
        if (liftDarkInk && isNeutral && lum > 5 && lum < 95) {
          const core = lum < 55 ? 1 : 1 - (lum - 55) / 40; // full on body, softer on AA
          const mix = strength * Math.max(0, Math.min(1, core));
          data[i] = Math.round(r * (1 - mix) + inkTarget * mix);
          data[i + 1] = Math.round(g * (1 - mix) + inkTarget * mix);
          data[i + 2] = Math.round(b * (1 - mix) + inkTarget * mix);

          // Restore washed / semi-transparent glyph edges
          if (a < 245) {
            const alphaBoost = mix * (lum < 60 ? 0.9 : 0.55);
            data[i + 3] = Math.min(255, Math.round(a + (255 - a) * alphaBoost));
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      if (!cancelled) setUrl(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      if (!cancelled) setUrl(src);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, tolerance, liftDarkInk, inkStrength]);

  return (
    <img
      src={url || src}
      alt={alt}
      className={className}
      draggable={false}
      loading="eager"
      style={{
        ...style,
        opacity: url ? 1 : 0.01,
        transition: "opacity 180ms ease",
      }}
    />
  );
}
