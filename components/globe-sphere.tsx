"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type GlobeSphereProps = {
  globeColor?: string;
  radius?: number;
  particleCount?: number;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  /** Scale radius relative to the shorter canvas side (0–0.5). Overrides fixed radius when set. */
  radiusRatio?: number;
};

/** Canvas recreation of Framer Globe Sphere (bYygXy). */
export function GlobeSphere({
  globeColor = "#F8A040",
  radius = 140,
  particleCount = 320,
  speed = 1,
  radiusRatio = 0.38,
  className,
  style,
}: GlobeSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const points = Array.from({ length: particleCount }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });

    let animationFrameId = 0;
    let startTime = performance.now();
    let isIntersecting = true;

    const renderFrame = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - startTime) * 5e-4 * (reduced ? 0 : speed);
      const angleY = elapsed * 1.2;
      const angleX = 0.3;
      const cx = width / 2;
      const cy = height / 2;
      const fov = 350;
      const effectiveRadius =
        radiusRatio != null
          ? Math.min(width, height) * radiusRatio
          : radius;

      ctx.fillStyle = globeColor;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      for (const p of points) {
        let x = p.x * cosY + p.z * sinY;
        let z = -p.x * sinY + p.z * cosY;
        let y = p.y;
        const yRot = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = yRot;

        const scale = fov / (fov + z * effectiveRadius);
        const px = cx + x * effectiveRadius * scale;
        const py = cy + y * effectiveRadius * scale;
        const alpha = Math.max(0.05, (z + 1) / 2);
        const pointSize = Math.max(0.8, (z + 1.2) * 1.8);

        ctx.globalAlpha = alpha * 0.85;
        ctx.beginPath();
        ctx.arc(px, py, pointSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const handleResize = () => renderFrame(performance.now());
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    if (reduced) {
      renderFrame(performance.now());
      return () => resizeObserver.disconnect();
    }

    const draw = (now: number) => {
      renderFrame(now);
      if (isIntersecting) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersecting;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !wasIntersecting) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas);

    // Sticky section may start partially visible
    isIntersecting = true;
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [globeColor, radius, particleCount, speed, radiusRatio]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        backgroundColor: "transparent",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
