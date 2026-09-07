"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/data";

type HeroVideoProps = {
  src: string;
  /** Optional smaller/faster variant — preferred when present. */
  srcWeb?: string;
  poster?: string;
  locale: Locale;
  /** When true, start loading immediately (homepage hero). */
  priority?: boolean;
};

function playLabels(locale: Locale, playing: boolean) {
  const map = {
    fr: playing ? "Mettre la vidéo en pause" : "Lire la vidéo",
    en: playing ? "Pause video" : "Play video",
    de: playing ? "Video pausieren" : "Video abspielen",
    it: playing ? "Metti in pausa il video" : "Riproduci il video",
  } as const;
  return map[locale] || map.en;
}

/**
 * Smooth playback:
 * - prefers compressed `.web.mp4` via ordered <source> tags
 * - defers heavy load until near viewport (non-priority)
 * - uses faststart-friendly muted autoplay
 */
export function HeroVideo({ src, srcWeb, poster, locale, priority = false }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const sources = srcWeb && srcWeb !== src ? [srcWeb, src] : [src];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;

    const tryPlay = () => {
      if (reduced) return;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    const onCanPlay = () => tryPlay();
    video.addEventListener("canplay", onCanPlay);

    if (priority) {
      video.preload = "auto";
      video.load();
      tryPlay();
    } else {
      video.preload = "metadata";
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          if (!visible) {
            video.pause();
            setPlaying(false);
            return;
          }
          if (video.readyState < 2) {
            video.preload = "auto";
            video.load();
          }
          tryPlay();
        },
        { rootMargin: "240px 0px", threshold: 0.15 },
      );
      observer.observe(video);
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      observer?.disconnect();
    };
  }, [src, srcWeb, priority]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().then(() => setPlaying(true));
    else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={poster}
      >
        {sources.map((s) => (
          <source key={s} src={s} type="video/mp4" />
        ))}
      </video>
      <button
        className="video-control"
        type="button"
        onClick={toggle}
        aria-label={playLabels(locale, playing)}
      >
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
    </>
  );
}
