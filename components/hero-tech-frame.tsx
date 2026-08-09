type HeroTechFrameProps = {
  /** Extra class on the root overlay stack */
  className?: string;
  /** Softer overlays for text-heavy page heroes */
  variant?: "immersive" | "page";
};

/**
 * Decorative HUD / tech atmosphere for heroes.
 * Pure visual layer — no copy, pointer-events none.
 */
export function HeroTechFrame({ className = "", variant = "immersive" }: HeroTechFrameProps) {
  return (
    <div
      className={`hero-tech ${variant === "page" ? "hero-tech--page" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="hero-tech-grid" />
      <div className="hero-tech-beams" />
      <div className="hero-tech-vignette" />
      <div className="hero-tech-scan" />
      <div className="hero-tech-noise" />
      <span className="hero-tech-corner hero-tech-corner--tl" />
      <span className="hero-tech-corner hero-tech-corner--tr" />
      <span className="hero-tech-corner hero-tech-corner--bl" />
      <span className="hero-tech-corner hero-tech-corner--br" />
      <div className="hero-tech-edge" />
      <div className="hero-tech-ticks">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="hero-tech-ring" />
    </div>
  );
}
