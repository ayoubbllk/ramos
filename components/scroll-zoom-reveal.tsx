"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SiteButton } from "@/components/site-button";

interface ScrollZoomRevealProps {
  imageSrc: string;
  videoSrc?: string;
  leftText?: string;
  rightText?: string;
  buttonText?: string;
  autoPlay?: boolean;
}

export function ScrollZoomReveal({
  imageSrc,
  videoSrc,
  leftText = "©2026",
  rightText = "Showreel",
  buttonText = "Play showreel",
  autoPlay = false,
}: ScrollZoomRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["58vw", "100vw"] : ["20vw", "100vw"],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["32vh", "100vh"] : ["20vh", "100vh"],
  );
  const rawRadius = useTransform(scrollYProgress, [0, 1], [isMobile ? 24 : 40, 0]);
  const borderRadius = useSpring(rawRadius, { stiffness: 80, damping: 25, mass: 0.6 });
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.55], [24, 0]);

  const handlePlay = () => {
    if (videoSrc && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play();
    }
  };

  return (
    <section ref={ref} className="szr-wrapper">
      <div className="szr-sticky">
        {!isMobile && <div className="szr-side-text szr-left">{leftText}</div>}
        <motion.div
          className="szr-media"
          style={{ width, height, borderRadius }}
        >
          {!videoSrc && (
            <motion.img
              src={imageSrc}
              alt=""
              className="szr-bg"
            />
          )}
          {videoSrc && (
            <video
              ref={videoRef}
              autoPlay={autoPlay}
              loop
              muted
              playsInline
              preload="metadata"
              poster={imageSrc.endsWith(".mp4") ? undefined : imageSrc}
              className="szr-video"
              style={{ opacity: 1 }}
            >
              <source src={encodeURI(videoSrc)} type="video/mp4" />
            </video>
          )}
          {!isPlaying && videoSrc && (
            <motion.div style={{ opacity: textOpacity, y: textY }} className="szr-play-btn">
              <SiteButton variant="nova" onClick={handlePlay} aria-label={buttonText}>
                {buttonText}
              </SiteButton>
            </motion.div>
          )}
        </motion.div>
        {!isMobile && <div className="szr-side-text szr-right">{rightText}</div>}
      </div>
    </section>
  );
}
