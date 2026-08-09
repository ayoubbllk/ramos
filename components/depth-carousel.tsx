"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
  type CSSProperties,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SiteButton } from "@/components/site-button";

export type DepthCarouselSlide = {
  image: string;
  alt?: string;
  caption?: string;
  href?: string;
  buttonLabel?: string;
  /** Card fill behind logos / transparent PNGs */
  background?: string;
  /** Invert dark logos on dark cards */
  invert?: boolean;
};

export type DepthCarouselProps = {
  slides: DepthCarouselSlide[];
  height?: number;
  cardWidth?: number;
  cardHeight?: number;
  sideScale?: number;
  spacing?: number;
  depth?: number;
  curve?: number;
  perspective?: number;
  stiffness?: number;
  damping?: number;
  radius?: number;
  maxBlur?: number;
  reflection?: boolean;
  reflectionStrength?: number;
  vignette?: number;
  edgeSpread?: number;
  edgeStrength?: number;
  background?: string;
  labelColor?: string;
  showCounter?: boolean;
  hint?: string;
  imageFit?: "cover" | "contain";
  imagePadding?: number;
  /** Show CTA button under each card when slide has href + buttonLabel */
  showCardButton?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Start on this slide index */
  initialIndex?: number;
};

type CarouselCfg = {
  cardWidth: number;
  cardHeight: number;
  sideScale: number;
  spacing: number;
  depth: number;
  curve: number;
  radius: number;
  maxBlur: number;
  reflection: boolean;
  reflectionStrength: number;
  imageFit: "cover" | "contain";
  imagePadding: number;
  showCardButton: boolean;
};

function xFor(o: number, c: CarouselCfg) {
  const s = Math.sign(o);
  const a = Math.abs(o);
  const first = c.cardWidth * 0.46 + c.spacing;
  const step = c.cardWidth * c.sideScale * 0.62;
  return a <= 1 ? o * first : s * (first + (a - 1) * step);
}

function zFor(o: number, c: CarouselCfg) {
  return -Math.min(Math.abs(o), 4) * c.depth;
}

function rotFor(o: number, c: CarouselCfg) {
  return -Math.max(-1, Math.min(1, o)) * c.curve;
}

function scaleFor(o: number, c: CarouselCfg) {
  return 1 - (1 - c.sideScale) * Math.min(Math.abs(o), 1);
}

function opacityFor(o: number) {
  const a = Math.abs(o);
  return 1 - Math.min(Math.max(a - 3, 0) / 1.3, 1);
}

function blurFor(o: number, c: CarouselCfg) {
  return Math.min(Math.max(Math.abs(o) - 0.35, 0) * 2.6, c.maxBlur);
}

function Card({
  slide,
  index,
  progress,
  cfg,
}: {
  slide: DepthCarouselSlide;
  index: number;
  progress: MotionValue<number>;
  cfg: CarouselCfg;
}) {
  const offset = useTransform(progress, (p) => index - p);
  const x = useTransform(offset, (o) => xFor(o, cfg));
  const z = useTransform(offset, (o) => zFor(o, cfg));
  const rotateY = useTransform(offset, (o) => rotFor(o, cfg));
  const scale = useTransform(offset, (o) => scaleFor(o, cfg));
  const opacity = useTransform(offset, opacityFor);
  const filter = useTransform(offset, (o) => `blur(${blurFor(o, cfg)}px)`);
  const zIndex = useTransform(offset, (o) => Math.round(1000 - Math.abs(o) * 10));

  const alt = slide.alt || slide.caption || `Slide ${index + 1}`;
  const buttonLabel = slide.buttonLabel;
  const showButton = cfg.showCardButton && Boolean(slide.href && buttonLabel);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={slide.image}
      alt={alt}
      draggable={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: cfg.imageFit,
        objectPosition: "center",
        display: "block",
        pointerEvents: "none",
        userSelect: "none",
        padding: cfg.imageFit === "contain" ? cfg.imagePadding : 0,
        boxSizing: "border-box",
        filter: slide.invert ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );

  const frameInner: CSSProperties = {
    width: cfg.cardWidth,
    height: cfg.cardHeight,
    borderRadius: cfg.radius,
    overflow: "hidden",
    boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7)",
    background: slide.background || "rgba(120,120,120,0.12)",
    border: "1px solid rgba(248, 160, 64, 0.18)",
  };

  const reflectionEl =
    cfg.reflection && !showButton ? (
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          marginTop: 10,
          width: cfg.cardWidth,
          height: cfg.cardHeight * 0.5,
          borderRadius: cfg.radius,
          overflow: "hidden",
          transform: "scaleY(-1)",
          transformOrigin: "top center",
          opacity: cfg.reflectionStrength,
          pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 62%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 62%)",
        }}
      >
        <div style={{ width: cfg.cardWidth, height: cfg.cardHeight, ...frameInner, border: "none" }}>
          {img}
        </div>
      </div>
    ) : null;

  return (
    <motion.div
      className="depth-carousel-card"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: cfg.cardWidth,
        height: showButton ? cfg.cardHeight + 88 : cfg.cardHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        transformStyle: "preserve-3d",
        x,
        z,
        rotateY,
        scale,
        opacity,
        filter,
        zIndex,
      }}
    >
      <div style={{ ...frameInner, flex: "0 0 auto" }}>{img}</div>
      {showButton && slide.href ? (
        <SiteButton
          href={slide.href}
          variant="nova"
          fullWidth
          className="depth-carousel-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {buttonLabel}
        </SiteButton>
      ) : null}
      {reflectionEl}
    </motion.div>
  );
}

/** Canvas recreation of Framer DepthCarousel (7GyVY9). */
export function DepthCarousel({
  slides: rawSlides,
  height = 560,
  cardWidth = 460,
  cardHeight = 300,
  sideScale = 0.66,
  spacing = 40,
  depth = 150,
  curve = 42,
  perspective = 1300,
  stiffness = 170,
  damping = 34,
  radius = 14,
  maxBlur = 5,
  reflection = true,
  reflectionStrength = 0.28,
  vignette = 45,
  edgeSpread = 22,
  edgeStrength = 14,
  background = "transparent",
  labelColor = "rgba(244, 238, 255, 0.72)",
  showCounter = true,
  hint = "Scroll / Drag",
  imageFit = "cover",
  imagePadding = 36,
  showCardButton = false,
  className,
  style,
  initialIndex = 0,
}: DepthCarouselProps) {
  const slides = useMemo(
    () => rawSlides.filter((s) => s?.image),
    [rawSlides],
  );
  const n = slides.length;
  const reduce = useReducedMotion();
  const start = Math.max(0, Math.min(n - 1, initialIndex));
  const target = useMotionValue(start);
  const progress = useSpring(target, { stiffness, damping, mass: 1, restDelta: 0.001 });
  const [active, setActive] = useState(start);
  const [dragging, setDragging] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 640) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("desktop");
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  const layout = useMemo(() => {
    const buttonExtra = showCardButton ? 140 : 0;
    if (viewport === "mobile") {
      return {
        height: Math.min(height, 460) + buttonExtra,
        cardWidth: Math.min(cardWidth, 280),
        cardHeight: Math.min(cardHeight, 200),
        spacing: Math.min(spacing, 20),
        imagePadding: Math.min(imagePadding, 28),
      };
    }
    if (viewport === "tablet") {
      return {
        height: Math.min(height, 520) + buttonExtra,
        cardWidth: Math.min(cardWidth, 360),
        cardHeight: Math.min(cardHeight, 240),
        spacing: Math.min(spacing, 28),
        imagePadding: Math.min(imagePadding, 36),
      };
    }
    return {
      height: height + buttonExtra,
      cardWidth,
      cardHeight,
      spacing,
      imagePadding,
    };
  }, [viewport, height, cardWidth, cardHeight, spacing, imagePadding, showCardButton]);

  const cfg = useMemo<CarouselCfg>(
    () => ({
      cardWidth: layout.cardWidth,
      cardHeight: layout.cardHeight,
      sideScale,
      spacing: layout.spacing,
      depth,
      curve,
      radius,
      maxBlur,
      reflection: showCardButton ? false : reflection,
      reflectionStrength,
      imageFit,
      imagePadding: layout.imagePadding,
      showCardButton,
    }),
    [
      layout.cardWidth,
      layout.cardHeight,
      layout.spacing,
      layout.imagePadding,
      sideScale,
      depth,
      curve,
      radius,
      maxBlur,
      reflection,
      reflectionStrength,
      imageFit,
      showCardButton,
    ],
  );

  useEffect(() => {
    target.set(start);
    setActive(start);
  }, [start, target]);

  useEffect(() => {
    if (typeof window === "undefined" || n < 1) return;
    const el = outerRef.current;
    if (!el) return;

    const clampT = (v: number) => Math.max(0, Math.min(n - 1, v));
    let snapTimer: ReturnType<typeof setTimeout> | undefined;

    const commit = (v: number) => {
      const t = clampT(Math.round(v));
      target.set(t);
      startTransition(() => setActive(t));
    };

    const scheduleSnap = () => {
      if (snapTimer) window.clearTimeout(snapTimer);
      snapTimer = setTimeout(() => commit(target.get()), 160);
    };

    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 0.5) return;
      e.preventDefault();
      target.set(clampT(target.get() + d * 0.0055));
      scheduleSnap();
    };

    let down = false;
    let startX = 0;
    let startVal = 0;
    let lastX = 0;
    let lastT = 0;
    let vel = 0;
    const perCard = Math.max(120, layout.cardWidth * 0.55);

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("a, button")) return;
      down = true;
      startX = lastX = e.clientX;
      startVal = target.get();
      lastT = performance.now();
      vel = 0;
      setDragging(true);
      el.setPointerCapture?.(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const now = performance.now();
      const dx = e.clientX - startX;
      target.set(clampT(startVal - dx / perCard));
      const dt = now - lastT;
      if (dt > 0) vel = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      setDragging(false);
      el.releasePointerCapture?.(e.pointerId);
      const projected = target.get() - (vel * 150) / perCard;
      commit(projected);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      if (snapTimer) window.clearTimeout(snapTimer);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [n, layout.cardWidth, target]);

  if (n === 0) return null;

  const labelStyle: CSSProperties = {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: labelColor,
  };

  const edge = (side: "left" | "right"): CSSProperties => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    [side]: 0,
    width: `${edgeSpread}%`,
    pointerEvents: "none",
    zIndex: 1200,
    backdropFilter: `blur(${edgeStrength}px)`,
    WebkitBackdropFilter: `blur(${edgeStrength}px)`,
    WebkitMaskImage: `linear-gradient(to ${side === "left" ? "right" : "left"}, #000, transparent)`,
    maskImage: `linear-gradient(to ${side === "left" ? "right" : "left"}, #000, transparent)`,
  });

  const activeCaption = slides[Math.max(0, Math.min(n - 1, active))]?.caption;
  const stageHeight = showCardButton ? layout.cardHeight + 88 : layout.cardHeight;
  const showBottomMeta = !showCardButton && (Boolean(activeCaption) || showCounter);

  return (
    <div
      ref={outerRef}
      className={["depth-carousel", showCardButton ? "depth-carousel--with-buttons" : "", className]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-roledescription="carousel"
      aria-label={activeCaption || "Carousel"}
      style={{
        position: "relative",
        width: "100%",
        height: layout.height,
        background,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: showCardButton ? 40 : 0,
        paddingBottom: showCardButton ? 64 : 0,
        boxSizing: "border-box",
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "pan-y",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: layout.cardWidth,
          height: stageHeight,
          transformStyle: "preserve-3d",
          perspective,
          perspectiveOrigin: "center",
        }}
      >
        {slides.map((slide, i) => (
          <Card
            key={`${slide.image}-${i}`}
            slide={slide}
            index={i}
            progress={reduce ? target : progress}
            cfg={cfg}
          />
        ))}
      </div>

      {vignette > 0 && (
        <div
          aria-hidden="true"
          className="depth-carousel-vignette"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            background: showCardButton
              ? `radial-gradient(120% 65% at 50% 36%, transparent 46%, rgba(0,0,0,${vignette / 100}) 100%)`
              : `radial-gradient(125% 85% at 50% 44%, transparent 38%, rgba(0,0,0,${vignette / 100}) 100%)`,
          }}
        />
      )}

      {edgeStrength > 0 && edgeSpread > 0 && (
        <>
          <div aria-hidden="true" style={{ ...edge("left"), zIndex: 2 }} />
          <div aria-hidden="true" style={{ ...edge("right"), zIndex: 2 }} />
        </>
      )}

      {showBottomMeta && (
        <div
          className="depth-carousel-meta"
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 16,
            zIndex: 5,
            pointerEvents: "none",
            ...labelStyle,
          }}
        >
          {activeCaption ? <span>{activeCaption}</span> : null}
          {showCounter ? (
            <span style={{ opacity: 0.55 }}>
              {String(active + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}
            </span>
          ) : null}
        </div>
      )}

      {(hint || (showCardButton && showCounter)) && (
        <div
          aria-hidden={!hint}
          className="depth-carousel-top-meta"
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            right: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 5,
            pointerEvents: "none",
            ...labelStyle,
          }}
        >
          {showCardButton && showCounter ? (
            <span style={{ opacity: 0.55 }}>
              {String(active + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}
            </span>
          ) : (
            <span />
          )}
          {hint ? <span style={{ opacity: 0.5 }}>{hint}</span> : null}
        </div>
      )}
    </div>
  );
}
