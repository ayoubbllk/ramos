"use client";

import { motion, useReducedMotion } from "framer-motion";

type AmbientBackgroundProps = {
  baseColor?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  blurAmount?: number;
  speedMultiplier?: number;
  overlayOpacity?: number;
  colorDuration?: number;
  /** Light field for dark logos, dark field for white logos. */
  tone?: "light" | "dark";
};

/**
 * Port of the Framer Ambient Background (moving gradient blobs).
 * The blur and wash stay behind sibling content so logos remain readable.
 */
export function AmbientBackground({
  tone = "light",
  baseColor = tone === "dark" ? "#0B0A12" : "#ffffff",
  color1 = tone === "dark" ? "rgba(248, 160, 64, 0.28)" : "rgba(0, 122, 255, 0.4)",
  color2 = tone === "dark" ? "rgba(120, 70, 190, 0.34)" : "rgba(175, 82, 222, 0.3)",
  color3 = tone === "dark" ? "rgba(40, 90, 170, 0.26)" : "rgba(50, 173, 230, 0.3)",
  blurAmount = 60,
  speedMultiplier = 1,
  overlayOpacity = tone === "dark" ? 0 : 0.12,
  colorDuration = 10,
}: AmbientBackgroundProps) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: baseColor,
        isolation: "isolate",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          borderRadius: "50%",
          opacity: 0.55,
          backgroundColor: color1,
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [-30, 30],
                y: [-30, 30],
                scale: [1, 1.1],
                backgroundColor: [color1, color2, color3],
              }
        }
        transition={{
          default: {
            duration: 7 * speedMultiplier,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
          backgroundColor: {
            duration: colorDuration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          borderRadius: "50%",
          opacity: 0.5,
          backgroundColor: color2,
          width: "70%",
          height: "70%",
          top: "15%",
          right: "15%",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [50, -50],
                y: [100, -20],
                backgroundColor: [color2, color3, color1],
              }
        }
        transition={{
          default: {
            duration: 5 * speedMultiplier,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
          backgroundColor: {
            duration: colorDuration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          borderRadius: "50%",
          opacity: 0.45,
          backgroundColor: color3,
          width: "60%",
          height: "60%",
          bottom: "10%",
          left: "20%",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [-20, 80],
                y: [100, 50],
                backgroundColor: [color3, color1, color2],
              }
        }
        transition={{
          default: {
            duration: 6 * speedMultiplier,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
          backgroundColor: {
            duration: colorDuration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.55)",
          opacity: overlayOpacity,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
