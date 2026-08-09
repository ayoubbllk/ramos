"use client";

import { useEffect, useState, type CSSProperties } from "react";
import OrbitProjects from "@/components/orbit-project";
import type { Locale, Subsidiary } from "@/lib/data";
import { t } from "@/lib/data";

type SubsidiaryOrbitProps = {
  item: Subsidiary;
  locale: Locale;
};

function splitTitle(name: string): { left: string; right: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { left: parts[0].toUpperCase(), right: "GROUP" };
  if (parts.length === 2) {
    return { left: parts[0].toUpperCase(), right: parts[1].toUpperCase() };
  }
  return {
    left: parts[0].toUpperCase(),
    right: parts.slice(1).join(" ").toUpperCase(),
  };
}

function buildItems(item: Subsidiary, locale: Locale) {
  const images = item.images.slice(0, 8);
  const services = item.services.map((s) => t(s, locale));

  return images.map((image, index) => ({
    image,
    label: services[index] || `${item.name} ${String(index + 1).padStart(2, "0")}`,
    link: `#expertise`,
  }));
}

function useViewportMode() {
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 640) setMode("mobile");
      else if (w < 1024) setMode("tablet");
      else setMode("desktop");
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return mode;
}

const centerFont = {
  fontFamily: '"Outfit", system-ui, sans-serif',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1.35,
  letterSpacing: "0.02em",
  textAlign: "center" as const,
};

const labelFont = {
  fontFamily: '"Outfit", system-ui, sans-serif',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: "0.04em",
  textAlign: "center" as const,
};

export function SubsidiaryOrbit({ item, locale }: SubsidiaryOrbitProps) {
  const fr = locale === "fr";
  const mode = useViewportMode();
  const items = buildItems(item, locale);
  if (items.length < 2) return null;

  const { left, right } = splitTitle(item.name);
  const accent = item.accent || "#F8A040";
  const isMobile = mode === "mobile";
  const isTablet = mode === "tablet";

  const titleFont = {
    fontFamily: '"Exo 2", system-ui, sans-serif',
    fontSize: isMobile ? 42 : isTablet ? 72 : 120,
    fontWeight: 700,
    lineHeight: 0.88,
    letterSpacing: "-0.04em",
    textAlign: "left" as const,
  };

  return (
    <section
      className="subsidiary-orbit"
      aria-label={fr ? "Projets en orbite" : "Orbit projects"}
      style={{ "--orbit-accent": accent } as CSSProperties}
    >
      <OrbitProjects
        items={items}
        background="#0A0614"
        content={{
          showCopy: true,
          textColor: "#F4EEFF",
          leftTitle: left,
          rightTitle: right,
          desktopTitleFont: titleFont,
          compactTitleFont: titleFont,
          titleCenterGap: isMobile ? 16 : 40,
          centerText: t(item.tagline, locale),
          centerTextWidth: isMobile ? 180 : 260,
          compactTextGap: 24,
          desktopCenterFont: {
            ...centerFont,
            fontSize: isMobile ? 12 : 13,
          },
          tabletCenterFont: { ...centerFont, textAlign: "left" },
          mobileCenterFont: { ...centerFont, textAlign: "left" },
          compactTextColor: "rgba(244, 238, 255, 0.72)",
        }}
        cards={{
          background: "#14101F",
          radius: 6,
          aspect: 1.45,
          imageFit: "cover",
          depthOpacity: 18,
          depthScale: isMobile ? 72 : 78,
          renderQuality: isMobile ? 1.5 : 2,
          labelColor: "rgba(248, 160, 64, 0.85)",
          labelFont,
        }}
        motion={{
          scrollLength: isMobile ? 280 : isTablet ? 320 : 380,
          startOffset: isMobile ? 40 : 50,
          smoothness: isMobile ? 10 : 8,
          perspective: isMobile ? 1100 : 1400,
          curveWidth: isMobile ? 220 : isTablet ? 380 : 560,
          curveHeight: isMobile ? 140 : 200,
          depth: isMobile ? 280 : 500,
          rotation: 300,
          cardWidth: isMobile ? 200 : isTablet ? 280 : 380,
          offsetY: isMobile ? -20 : -36,
        }}
        grid={{
          columns: isMobile ? 1 : isTablet ? 2 : 3,
          gap: isMobile ? 12 : 18,
          maxWidth: 1120,
          positionY: isMobile ? 50 : 54,
        }}
        responsive={{
          // Keep orbit animation on all breakpoints (compact grid disabled in orbit-project).
          desktopBreakpoint: 0,
          mobileBreakpoint: 640,
          tabletColumns: 2,
          mobileColumns: 1,
          tabletPadding: "88px 24px",
          mobilePadding: "72px 20px",
          gap: 14,
          headerGap: 48,
        }}
      />
    </section>
  );
}
