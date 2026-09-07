"use client";

import Link from "next/link";
import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { GlobeSphere } from "@/components/globe-sphere";
import { ChromaLogo } from "@/components/chroma-logo";

type ResponsiveImage = {
  src?: string;
  srcSet?: string;
  alt?: string;
};

export type KineticProject = {
  title?: string;
  category?: string;
  year?: string;
  description?: string;
  image?: ResponsiveImage | string;
  link?: string;
  cardBackground?: string;
  globeColor?: string;
  /** Invert near-black logos so marks stay readable on dark cards */
  logoInvert?: boolean;
  /** Extra / reduced padding around logo marks (percent of frame) */
  logoPadPct?: number;
};

type FontStyle = React.CSSProperties;

export type KineticWorkIndexProps = {
  projects: KineticProject[];
  eyebrow?: string;
  scrollLabel?: string;
  viewLabel?: string;
  background?: string;
  textColor?: string;
  mutedColor?: string;
  accentColor?: string;
  lineColor?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageFit?: "cover" | "contain";
  /** e.g. "666 / 375" — when set, height follows width */
  imageAspectRatio?: string;
  radius?: string;
  scrollStep?: number;
  displaySize?: number;
  titleOpacity?: number;
  outlineRows?: boolean;
  blurAmount?: number;
  distortion?: number;
  duration?: number;
  enableHover?: boolean;
  tiltAmount?: number;
  hoverScale?: number;
  hoverFloat?: number;
  hoverPerspective?: number;
  hoverShine?: boolean;
  shineOpacity?: number;
  showTopBar?: boolean;
  showMeta?: boolean;
  showDescription?: boolean;
  showProgress?: boolean;
  displayFont?: FontStyle;
  bodyFont?: FontStyle;
  style?: React.CSSProperties;
  className?: string;
};

const FALLBACK_IMAGE = "/logo/LOGO RAMOS GROUP HD.png";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function normalizeProjects(projects?: KineticProject[]) {
  return (projects || []).filter(Boolean);
}

function getImage(image?: ResponsiveImage | string) {
  if (typeof image === "string") {
    return { src: image || FALLBACK_IMAGE, srcSet: undefined, alt: "" };
  }
  return {
    src: image?.src || FALLBACK_IMAGE,
    srcSet: image?.srcSet,
    alt: image?.alt || "",
  };
}

function ProjectImage({
  project,
  imageFit,
}: {
  project: KineticProject;
  imageFit: "cover" | "contain";
}) {
  const image = getImage(project.image);
  const isLogo = imageFit === "contain";
  const invert = Boolean(project.logoInvert);
  const pad = project.logoPadPct ?? (isLogo ? 10 : 0);

  return (
    <div
      className={isLogo ? "kwi-logo-frame" : undefined}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isLogo ? `${pad}%` : 0,
        background: "transparent",
      }}
    >
      {isLogo ? (
        invert ? (
          <img
            src={image.src}
            alt={image.alt || project.title || "Project image"}
            className="kwi-logo-img"
            draggable={false}
            loading="eager"
            style={{
              position: "relative",
              zIndex: 1,
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "0 auto",
              objectFit: imageFit,
              objectPosition: "center center",
              userSelect: "none",
              pointerEvents: "none",
              /* Black-on-black assets → clean white mark, no chroma artifacts */
              filter: "brightness(0) invert(1)",
            }}
          />
        ) : (
          <ChromaLogo
            src={image.src}
            alt={image.alt || project.title || "Project image"}
            className="kwi-logo-img"
            tolerance={14}
            liftDarkInk
            inkStrength={0.95}
            style={{
              position: "relative",
              zIndex: 1,
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "0 auto",
              objectFit: imageFit,
              objectPosition: "center center",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        )
      ) : (
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt || project.title || "Project image"}
          draggable={false}
          loading="eager"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            margin: "0 auto",
            objectFit: imageFit,
            objectPosition: "center center",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

function ProjectLink({
  href,
  children,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  style?: React.CSSProperties;
} & Record<string, unknown>) {
  if (!href) {
    return (
      <div aria-label={rest["aria-label"] as string | undefined} style={rest.style as React.CSSProperties}>
        {children}
      </div>
    );
  }

  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} aria-label={rest["aria-label"] as string | undefined} style={rest.style as React.CSSProperties}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} aria-label={rest["aria-label"] as string | undefined} style={rest.style as React.CSSProperties} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function InteractiveProjectCard({
  project,
  projectIndex,
  imageFit,
  direction,
  isScrolling,
  reducedMotion,
  blurAmount,
  distortion,
  duration,
  radius,
  lineColor,
  enableHover,
  tiltAmount,
  hoverScale,
  hoverFloat,
  hoverPerspective,
  hoverShine,
  shineOpacity,
}: {
  project: KineticProject;
  projectIndex: number;
  imageFit: "cover" | "contain";
  direction: 1 | -1;
  isScrolling: boolean;
  reducedMotion: boolean;
  blurAmount: number;
  distortion: number;
  duration: number;
  radius: string;
  lineColor: string;
  enableHover: boolean;
  tiltAmount: number;
  hoverScale: number;
  hoverFloat: number;
  hoverPerspective: number;
  hoverShine: boolean;
  shineOpacity: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const cardBackground =
    project.cardBackground || (imageFit === "contain" ? "#0A0614" : lineColor);
  const globeColor = project.globeColor || "#F8A040";
  const isLogoCard = imageFit === "contain";
  const lightCard = (() => {
    const hex = cardBackground.replace("#", "");
    if (hex.length < 6) return false;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 180;
  })();

  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const xTarget = useMotionValue(0);
  const yTarget = useMotionValue(0);
  const scaleTarget = useMotionValue(1);

  const rotateX = useSpring(rotateXTarget, { stiffness: 150, damping: 18, mass: 0.75 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 150, damping: 18, mass: 0.75 });
  const x = useSpring(xTarget, { stiffness: 170, damping: 21, mass: 0.7 });
  const y = useSpring(yTarget, { stiffness: 170, damping: 21, mass: 0.7 });
  const scale = useSpring(scaleTarget, { stiffness: 170, damping: 20, mass: 0.7 });

  const hoverEnabled = enableHover && !reducedMotion;

  const resetHover = React.useCallback(() => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
    xTarget.set(0);
    yTarget.set(0);
    scaleTarget.set(1);
    setIsHovered(false);

    const node = cardRef.current;
    if (node) {
      node.style.setProperty("--kwi-shine-x", "50%");
      node.style.setProperty("--kwi-shine-y", "50%");
      node.style.setProperty("--kwi-holo-x", "50%");
      node.style.setProperty("--kwi-holo-y", "50%");
    }
  }, [rotateXTarget, rotateYTarget, xTarget, yTarget, scaleTarget]);

  React.useEffect(() => {
    resetHover();
  }, [projectIndex, resetHover]);

  React.useEffect(() => {
    const node = cardRef.current;
    if (!node || !hoverEnabled) {
      resetHover();
      return;
    }

    const updateFromPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = node.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const localX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const localY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const normalizedX = (localX - 0.5) * 2;
      const normalizedY = (localY - 0.5) * 2;

      rotateYTarget.set(normalizedX * tiltAmount);
      rotateXTarget.set(normalizedY * -tiltAmount);
      xTarget.set(normalizedX * hoverFloat * 0.28);
      yTarget.set(-hoverFloat + normalizedY * hoverFloat * 0.22);
      scaleTarget.set(Math.max(1, hoverScale));

      node.style.setProperty("--kwi-shine-x", `${localX * 100}%`);
      node.style.setProperty("--kwi-shine-y", `${localY * 100}%`);
      node.style.setProperty("--kwi-holo-x", `${35 + localX * 30}%`);
      node.style.setProperty("--kwi-holo-y", `${35 + localY * 30}%`);
    };

    const handleEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      setIsHovered(true);
      scaleTarget.set(Math.max(1, hoverScale));
      yTarget.set(-hoverFloat);
      updateFromPointer(event);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      setIsHovered(true);
      updateFromPointer(event);
    };

    const handleLeave = () => resetHover();

    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    node.addEventListener("pointercancel", handleLeave);

    return () => {
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      node.removeEventListener("pointercancel", handleLeave);
    };
  }, [
    hoverEnabled,
    hoverFloat,
    hoverScale,
    resetHover,
    rotateXTarget,
    rotateYTarget,
    scaleTarget,
    tiltAmount,
    xTarget,
    yTarget,
  ]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "auto",
        perspective: `${clamp(hoverPerspective, 400, 3000)}px`,
        perspectiveOrigin: "50% 50%",
      }}
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: isScrolling ? 0.982 : 1,
                skewY: isScrolling ? direction * distortion : 0,
              }
        }
        transition={{
          duration: isScrolling ? 0.16 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          pointerEvents: "auto",
        }}
      >
        <motion.div
          ref={cardRef}
          data-kwi-card="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            x,
            y,
            scale,
            rotateX,
            rotateY,
            transformPerspective: clamp(hoverPerspective, 400, 3000),
            overflow: "hidden",
            borderRadius: radius,
            background: cardBackground,
            boxShadow: isHovered
              ? "0 52px 120px rgba(0,0,0,0.45), 0 18px 42px rgba(248,160,64,0.18)"
              : "0 30px 90px rgba(0,0,0,0.28)",
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
            cursor: project.link ? "pointer" : "default",
            pointerEvents: "auto",
            touchAction: "pan-y",
            transition: "box-shadow 320ms cubic-bezier(.22,1,.36,1), background 360ms cubic-bezier(.22,1,.36,1)",
            ["--kwi-shine-x" as string]: "50%",
            ["--kwi-shine-y" as string]: "50%",
            ["--kwi-holo-x" as string]: "50%",
            ["--kwi-holo-y" as string]: "50%",
          }}
        >
          {imageFit === "contain" && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                borderRadius: "inherit",
                overflow: "hidden",
                background: cardBackground,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: lightCard ? 0.28 : 1,
                }}
              >
                <GlobeSphere
                  globeColor={globeColor}
                  particleCount={360}
                  speed={0.85}
                  radiusRatio={0.4}
                />
              </div>
            </div>
          )}
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={`${projectIndex}-${project.title}`}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: direction * 72,
                      scale: 1.055,
                      filter: `blur(${blurAmount}px)`,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                // Keep brand colors intact on logo cards (no saturate/contrast shift)
                filter: isLogoCard
                  ? "none"
                  : isHovered
                    ? "saturate(1.08) contrast(1.025)"
                    : "saturate(1) contrast(1)",
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: direction * -72,
                      scale: 0.98,
                      filter: isLogoCard ? "none" : `blur(${Math.max(2, blurAmount * 0.65)}px)`,
                    }
              }
              transition={{
                duration: reducedMotion ? 0.01 : Math.max(0.2, duration),
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                display: "block",
                overflow: "hidden",
                borderRadius: "inherit",
                color: "inherit",
                textDecoration: "none",
                pointerEvents: "auto",
                willChange: "transform, opacity, filter",
              }}
            >
              <ProjectLink
                href={project.link}
                aria-label={`View ${project.title || "project"}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ProjectImage project={project} imageFit={imageFit} />
              </ProjectLink>
            </motion.div>
          </AnimatePresence>

          {hoverShine && hoverEnabled && !isLogoCard && (
            <>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-15%",
                  zIndex: 3,
                  pointerEvents: "none",
                  borderRadius: "inherit",
                  opacity: isHovered ? clamp(shineOpacity, 0, 0.7) : 0,
                  background:
                    "radial-gradient(circle at var(--kwi-shine-x, 50%) var(--kwi-shine-y, 50%), rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.36) 13%, rgba(255,255,255,0.08) 30%, transparent 56%)",
                  mixBlendMode: "screen",
                  transform: "translateZ(32px)",
                  transition: "opacity 220ms cubic-bezier(.22,1,.36,1)",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-28%",
                  zIndex: 2,
                  pointerEvents: "none",
                  borderRadius: "inherit",
                  opacity: isHovered ? clamp(shineOpacity * 0.9, 0, 0.56) : 0,
                  background:
                    "conic-gradient(from 205deg at var(--kwi-holo-x, 50%) var(--kwi-holo-y, 50%), rgba(248,160,64,0.58), rgba(103,191,255,0.4), rgba(117,255,218,0.35), rgba(255,238,120,0.4), rgba(190,118,255,0.42), rgba(248,160,64,0.58))",
                  mixBlendMode: "color-dodge",
                  filter: "blur(18px) saturate(1.25)",
                  transform: "translateZ(22px) scale(1.05)",
                  transition: "opacity 260ms cubic-bezier(.22,1,.36,1)",
                }}
              />
            </>
          )}
          {hoverShine && hoverEnabled && isLogoCard && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 3,
                pointerEvents: "none",
                borderRadius: "inherit",
                opacity: isHovered ? 0.14 : 0,
                background:
                  "radial-gradient(circle at var(--kwi-shine-x, 50%) var(--kwi-shine-y, 50%), rgba(255,255,255,0.55) 0%, transparent 55%)",
                transition: "opacity 220ms cubic-bezier(.22,1,.36,1)",
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function RepeatingTitle({
  project,
  direction,
  displayFont,
  displaySize,
  textColor,
  titleOpacity,
  outlineRows,
  duration,
  staticMode,
}: {
  project: KineticProject;
  direction: 1 | -1;
  displayFont: FontStyle;
  displaySize: number;
  textColor: string;
  titleOpacity: number;
  outlineRows: boolean;
  duration: number;
  staticMode: boolean;
}) {
  const rows = [0, 1, 2];
  const content = rows.map((row) => {
    const outlined = outlineRows && row === 1;
    return (
      <div
        key={row}
        style={{
          ...displayFont,
          fontSize: `clamp(48px, 9vw, ${displaySize}px)`,
          fontWeight: displayFont?.fontWeight || 600,
          lineHeight: 0.84,
          letterSpacing: "-0.065em",
          whiteSpace: "nowrap",
          textAlign: "center",
          color: outlined ? "transparent" : textColor,
          opacity: outlined ? 0.75 : titleOpacity,
          WebkitTextStroke: outlined ? `1.25px ${textColor}` : undefined,
        }}
      >
        {project.title || "Untitled"}
      </div>
    );
  });

  if (staticMode) {
    return <div style={titleRailStyle}>{content}</div>;
  }

  return (
    <div style={titleRailStyle}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`${project.title}-${project.category}-${project.year}`}
          initial={{ opacity: 0, y: direction * 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction * -48 }}
          transition={{
            duration: Math.max(0.2, duration * 0.82),
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: "100%" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SharedChrome({
  project,
  index,
  total,
  eyebrow,
  scrollLabel,
  viewLabel,
  mutedColor,
  accentColor,
  lineColor,
  bodyFont,
  showTopBar,
  showMeta,
  showDescription,
  showProgress,
}: {
  project: KineticProject;
  index: number;
  total: number;
  eyebrow: string;
  scrollLabel: string;
  viewLabel: string;
  mutedColor: string;
  accentColor: string;
  lineColor: string;
  bodyFont: FontStyle;
  showTopBar: boolean;
  showMeta: boolean;
  showDescription: boolean;
  showProgress: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <>
      {showTopBar && (
        <div className="kwi-topbar" style={topBarStyle}>
          <span
            style={{
              ...bodyFont,
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              ...bodyFont,
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: mutedColor,
            }}
          >
            {scrollLabel}
          </span>
        </div>
      )}

      {showMeta && (
        <div className="kwi-left-meta" style={leftMetaStyle}>
          <span
            style={{
              ...bodyFont,
              fontSize: 12,
              lineHeight: 1.2,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: mutedColor,
            }}
          >
            {project.category || "Filiale"}
          </span>
          <span style={{ ...bodyFont, marginTop: 9, fontSize: 14, lineHeight: 1.3 }}>
            {project.year || ""}
          </span>
        </div>
      )}

      <div className="kwi-bottom" style={bottomBarStyle}>
        <div
          className="kwi-description"
          aria-live="polite"
          style={{
            ...bodyFont,
            maxWidth: 360,
            fontSize: 14,
            lineHeight: 1.45,
            color: mutedColor,
            display: showDescription ? "block" : "none",
          }}
        >
          {project.description || ""}
        </div>

        <div
          style={{
            ...bodyFont,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 13,
            lineHeight: 1,
            color: accentColor,
          }}
        >
          <span>{viewLabel}</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>

      {showProgress && (
        <div className="kwi-progress" style={progressWrapStyle}>
          <div
            style={{
              ...bodyFont,
              display: "flex",
              alignItems: "baseline",
              gap: 5,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span style={{ fontSize: 16 }}>{number}</span>
            <span style={{ fontSize: 11, color: mutedColor }}>/ {count}</span>
          </div>
          <div
            style={{
              position: "relative",
              width: 72,
              height: 1,
              overflow: "hidden",
              background: lineColor,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${((index + 1) / total) * 100}%`,
                background: accentColor,
                transition: "width 420ms cubic-bezier(.22,1,.36,1)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export function KineticWorkIndex({
  projects: projectsProp,
  eyebrow = "Nos métiers",
  scrollLabel = "Scroll to Explore",
  viewLabel = "Découvrir",
  background = "#05040A",
  textColor = "#F4EEFF",
  mutedColor = "rgba(244,238,255,0.56)",
  accentColor = "#F8A040",
  lineColor = "rgba(248,160,64,0.22)",
  imageWidth = 38,
  imageHeight = 58,
  imageFit = "contain",
  imageAspectRatio,
  radius = "14px",
  scrollStep = 82,
  displaySize = 160,
  titleOpacity = 0.14,
  outlineRows = true,
  blurAmount = 12,
  distortion = 1.2,
  duration = 0.72,
  enableHover = true,
  tiltAmount = 9,
  hoverScale = 1.025,
  hoverFloat = 8,
  hoverPerspective = 1100,
  hoverShine = true,
  shineOpacity = 0.22,
  showTopBar = true,
  showMeta = true,
  showDescription = true,
  showProgress = true,
  displayFont = {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
  },
  bodyFont = {
    fontFamily: "var(--font-body)",
    fontWeight: 500,
  },
  style,
  className = "",
}: KineticWorkIndexProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const projects = React.useMemo(() => normalizeProjects(projectsProp), [projectsProp]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    setActiveIndex((current) => clamp(current, 0, Math.max(projects.length - 1, 0)));
  }, [projects.length]);

  React.useEffect(() => {
    if (projects.length <= 1) return;

    let animationFrame = 0;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;
    let lastScrollY = window.scrollY;

    const update = () => {
      animationFrame = 0;
      const element = rootRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollableDistance = Math.max(element.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollableDistance, 0, 1);
      const nextIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
      const delta = window.scrollY - lastScrollY;

      if (Math.abs(delta) > 1) {
        setDirection(delta > 0 ? 1 : -1);
      }

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      setIsScrolling((current) => (current ? current : true));

      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = setTimeout(() => setIsScrolling(false), 110);
      lastScrollY = window.scrollY;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, [projects.length]);

  if (projects.length === 0) return null;

  const safeIndex = clamp(activeIndex, 0, projects.length - 1);
  const activeProject = projects[safeIndex];
  const reducedMotion = Boolean(prefersReducedMotion);
  const scrollHeight = Math.max(220, projects.length * clamp(scrollStep, 45, 140));

  return (
    <div
      ref={rootRef}
      className={`kwi-root ${className}`.trim()}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: `${scrollHeight}vh`,
        background,
      }}
    >
      <ComponentStyles />

      <div
        className="kwi-viewport"
        style={{
          ...viewportStyle,
          position: "sticky",
          top: 0,
          height: "100svh",
          minHeight: 620,
          background,
          color: textColor,
        }}
      >
        <SharedChrome
          project={activeProject}
          index={safeIndex}
          total={projects.length}
          eyebrow={eyebrow}
          scrollLabel={scrollLabel}
          viewLabel={viewLabel}
          mutedColor={mutedColor}
          accentColor={accentColor}
          lineColor={lineColor}
          bodyFont={bodyFont}
          showTopBar={showTopBar}
          showMeta={showMeta}
          showDescription={showDescription}
          showProgress={showProgress}
        />

        <RepeatingTitle
          project={activeProject}
          direction={direction}
          displayFont={displayFont}
          displaySize={displaySize}
          textColor={textColor}
          titleOpacity={titleOpacity}
          outlineRows={outlineRows}
          duration={reducedMotion ? 0.01 : duration}
          staticMode={reducedMotion}
        />

        <div
          style={{
            ...imageFrameStyle,
            width: `min(${imageWidth}vw, calc(100% - 48px), 666px)`,
            ...(imageAspectRatio
              ? {
                  aspectRatio: imageAspectRatio,
                  height: "auto",
                  maxHeight: "min(70vh, 420px)",
                }
              : {
                  height: `min(${imageHeight}vh, 680px)`,
                }),
            borderRadius: radius,
            overflow: "visible",
            boxShadow: "none",
            background: "transparent",
          }}
        >
          <InteractiveProjectCard
            project={activeProject}
            projectIndex={safeIndex}
            imageFit={imageFit}
            direction={direction}
            isScrolling={isScrolling}
            reducedMotion={reducedMotion}
            blurAmount={blurAmount}
            distortion={distortion}
            duration={duration}
            radius={radius}
            lineColor={lineColor}
            enableHover={enableHover}
            tiltAmount={tiltAmount}
            hoverScale={hoverScale}
            hoverFloat={hoverFloat}
            hoverPerspective={hoverPerspective}
            hoverShine={hoverShine}
            shineOpacity={shineOpacity}
          />
        </div>
      </div>
    </div>
  );
}

function ComponentStyles() {
  return (
    <style>{`
      .kwi-viewport { isolation: isolate; }
      .kwi-viewport * { box-sizing: border-box; }
      .kwi-logo-frame {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center;
      }
      .kwi-logo-img {
        width: auto !important;
        height: auto !important;
        max-width: 100% !important;
        max-height: 100% !important;
        margin: 0 auto !important;
        object-fit: contain !important;
        object-position: center center !important;
      }

      @media (max-width: 767px) {
        .kwi-topbar { padding: 22px 20px !important; }
        .kwi-left-meta {
          left: 20px !important;
          top: 92px !important;
          transform: none !important;
        }
        .kwi-bottom {
          left: 20px !important;
          right: 20px !important;
          bottom: 22px !important;
        }
        .kwi-description { display: none !important; }
        .kwi-progress {
          right: 20px !important;
          top: 92px !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

const viewportStyle: React.CSSProperties = {
  width: "100%",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
};

const titleRailStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 1,
  left: "50%",
  top: "50%",
  width: "140%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
};

const imageFrameStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 3,
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  display: "block",
  overflow: "hidden",
  boxShadow: "0 32px 100px rgba(0,0,0,0.16)",
  transformOrigin: "center center",
};

const topBarStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "32px 40px",
  pointerEvents: "none",
};

const leftMetaStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 10,
  left: 40,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  maxWidth: 180,
  pointerEvents: "none",
};

const bottomBarStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 10,
  left: 40,
  right: 40,
  bottom: 30,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 24,
  pointerEvents: "none",
};

const progressWrapStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 10,
  right: 40,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 10,
  pointerEvents: "none",
};
