"use client";

import { useMemo, useRef, type WheelEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";

type DepthBlurCarouselProps = {
  images: string[];
  itemWidth?: number;
  itemHeight?: number;
  sideItemWidth?: number;
  sideItemHeight?: number;
  gap?: number;
  maxRotation?: number;
  perspective?: number;
  borderRadius?: number;
  scrollDamping?: number;
  blurSpread?: number;
  blurStrength?: number;
  className?: string;
  ariaLabel?: string;
};

function isMediaSrc(src: string) {
  return (
    src.startsWith("http") ||
    src.startsWith("data:") ||
    src.startsWith("/") ||
    src.startsWith("./")
  );
}

function PremiumSmearCard({
  src,
  index,
  total,
  smoothScroll,
  itemWidth,
  itemHeight,
  sideItemWidth,
  sideItemHeight,
  gap,
  maxRotation,
  borderRadius,
}: {
  src: string;
  index: number;
  total: number;
  smoothScroll: MotionValue<number>;
  itemWidth: number;
  itemHeight: number;
  sideItemWidth: number;
  sideItemHeight: number;
  gap: number;
  maxRotation: number;
  borderRadius: number;
}) {
  const localOffset = useTransform(smoothScroll, (v) => {
    const linearBase = index - v;
    let mapped = ((linearBase % total) + total) % total;
    if (mapped > total / 2) mapped -= total;
    return mapped;
  });
  const absOffset = useTransform(localOffset, Math.abs);
  const cardWidth = useTransform(absOffset, [0, 1], [itemWidth, sideItemWidth], { clamp: true });
  const cardHeight = useTransform(absOffset, [0, 1], [itemHeight, sideItemHeight], { clamp: true });
  const marginLeft = useTransform(cardWidth, (w) => -w / 2);
  const marginTop = useTransform(cardHeight, (h) => -h / 2);
  const x = useTransform(localOffset, (o) => {
    const a = Math.abs(o);
    const s = Math.sign(o);
    const centerToNext = itemWidth / 2 + gap + sideItemWidth / 2;
    const sideToSide = sideItemWidth + gap;
    if (a === 0) return 0;
    if (a <= 1) return s * centerToNext * a;
    return s * (centerToNext + (a - 1) * sideToSide * 0.85);
  });
  const z = useTransform(absOffset, (a) => -a * 200);
  const rotateY = useTransform(localOffset, (o) => Math.sign(o) * Math.min(Math.abs(o) * 35, maxRotation));
  const zIndex = useTransform(absOffset, (a) => 1000 - Math.round(a * 10));
  const visibilityOpacity = useTransform(absOffset, [0, 5, 7], [1, 1, 0]);
  const media = isMediaSrc(src);
  const styleData = media
    ? { backgroundImage: `url("${src}")`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: src };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        marginLeft,
        marginTop,
        width: cardWidth,
        height: cardHeight,
        rotateY,
        x,
        z,
        zIndex,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          ...styleData,
          borderRadius,
          opacity: visibilityOpacity,
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        }}
      />
    </motion.div>
  );
}

export function DepthBlurCarousel({
  images,
  itemWidth = 500,
  itemHeight = 285,
  sideItemWidth = 320,
  sideItemHeight = 280,
  gap = 64,
  maxRotation = 90,
  perspective = 400,
  borderRadius = 10,
  scrollDamping = 100,
  blurSpread = 25,
  blurStrength = 24,
  className = "",
  ariaLabel,
}: DepthBlurCarouselProps) {
  const defaultColors = [
    "linear-gradient(135deg, #1E3A8A, #3B82F6)",
    "linear-gradient(135deg, #064E3B, #10B981)",
    "linear-gradient(135deg, #b91c1c, #ef4444)",
    "linear-gradient(135deg, #c2410c, #f97316)",
    "linear-gradient(135deg, #4C1D95, #8B5CF6)",
    "linear-gradient(135deg, #164e63, #06b6d4)",
  ];

  const renderItems = useMemo(() => {
    const pool = images.length > 0 ? images : defaultColors;
    const items: string[] = [];
    while (items.length < 18) items.push(...pool);
    return items;
  }, [images]);

  const totalItems = renderItems.length;
  const scrollTarget = useRef(0);
  const rawScroll = useMotionValue(0);
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smoothScroll = useSpring(rawScroll, {
    stiffness: 180,
    damping: scrollDamping,
    mass: 1,
    restDelta: 0.001,
  });

  const handleWheel = (e: WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.8;
    scrollTarget.current += delta * 0.004;
    rawScroll.set(scrollTarget.current);
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(() => {
      scrollTarget.current = Math.round(scrollTarget.current);
      rawScroll.set(scrollTarget.current);
    }, 150);
  };

  const handlePan = (_: PointerEvent, info: PanInfo) => {
    scrollTarget.current += -info.delta.x * 0.005;
    rawScroll.set(scrollTarget.current);
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  };

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    scrollTarget.current += -info.velocity.x * 0.0015;
    scrollTarget.current = Math.round(scrollTarget.current);
    rawScroll.set(scrollTarget.current);
  };

  return (
    <div
      className={`depth-blur-carousel ${className}`.trim()}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: Math.max(perspective, 1),
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        onWheel={handleWheel}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 9999,
          cursor: "grab",
          touchAction: "pan-y",
        }}
      />
      <div style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
        {renderItems.map((src, i) => (
          <PremiumSmearCard
            key={`card-${i}`}
            src={src}
            index={i}
            total={totalItems}
            smoothScroll={smoothScroll}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            sideItemWidth={sideItemWidth}
            sideItemHeight={sideItemHeight}
            gap={gap}
            maxRotation={maxRotation}
            borderRadius={borderRadius}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${blurSpread}%`,
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`,
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10000,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: `${blurSpread}%`,
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`,
          maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10000,
        }}
      />
    </div>
  );
}
