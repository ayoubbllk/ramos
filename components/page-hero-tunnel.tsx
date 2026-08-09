"use client";

import { useEffect, useState, type ReactNode } from "react";
import InfiniteImageTunnel from "@/components/infinite-image-tunnel";

type PageHeroTunnelProps = {
  images: string[];
  className?: string;
  children: ReactNode;
  startText?: string;
};

export function PageHeroTunnel({
  images,
  className = "",
  children,
  startText = "Start",
}: PageHeroTunnelProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section className={`page-hero page-hero--tunnel ${className}`.trim()}>
      <div className="page-hero-tunnel" aria-hidden="true">
        <InfiniteImageTunnel
          images={images}
          autoStart={!reducedMotion}
          showStartButton={false}
          startText={startText}
          animationSpeed={0.85}
          pauseOnHover={false}
          clickToToggle={false}
          mouseParallax={!reducedMotion}
          reducedMotion={reducedMotion}
          perspective={1800}
          tunnelDepth={5200}
          backgroundColor="#0A0614"
          showGrid
          gridColor="#F8A040"
          gridOpacity={0.18}
          gridThickness={1}
          tileGap={14}
          imageTileScale={1}
        />
      </div>
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="page-hero-inner">{children}</div>
    </section>
  );
}
