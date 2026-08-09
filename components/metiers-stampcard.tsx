"use client";

import { useEffect, useState } from "react";
import StampScrapbook from "@/components/stamp-scrapbook";
import type { Locale } from "@/lib/data";
import { subsidiaries, t } from "@/lib/data";

const GROUP_LOGO = "/logo/LOGO RAMOS GROUP HD.png";

type MetiersStampcardProps = {
  locale: Locale;
};

export function MetiersStampcard({ locale }: MetiersStampcardProps) {
  const fr = locale === "fr";
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stamps = subsidiaries.map((item) => ({
    image: {
      src: item.logo || GROUP_LOGO,
      alt: `${item.name} logo`,
    },
    title: item.name,
    caption: `${t(item.sector, locale)} · Ramos`,
    description: t(item.tagline, locale),
  }));

  const stampHeight = narrow ? 200 : 280;
  const titleSize = narrow ? "20px" : "26px";
  const bodySize = narrow ? "14px" : "15px";
  const messageSize = narrow ? "16px" : "18px";

  return (
    <div className="metiers-stampcard">
      <StampScrapbook
        stamps={stamps}
        stampHeight={stampHeight}
        spread={narrow ? 0.92 : 1.05}
        tilt={-5}
        autoRotate
        speed={8}
        cursorSteer={!narrow}
        hoverSpeed={22}
        scrollTilt={!narrow}
        scrollTiltStrength={12}
        stampShadow
        panelColor="#14101F"
        backdropColor="rgba(5, 4, 10, 0.92)"
        titleColor="#F4EEFF"
        textColor="#F8A040"
        accentColor="#F8A040"
        sealUrl={`/${locale}/filiales`}
        sealMonogram="RG"
        titleFont={{
          fontFamily: '"Exo 2", system-ui, sans-serif',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: "1.1em",
          letterSpacing: "-0.02em",
        }}
        captionFont={{
          fontFamily: '"Outfit", system-ui, sans-serif',
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          lineHeight: "1.4em",
        }}
        bodyFont={{
          fontFamily: '"Outfit", system-ui, sans-serif',
          fontSize: bodySize,
          fontWeight: 400,
          lineHeight: "1.55em",
        }}
        messageFont={{
          fontFamily: '"Outfit", system-ui, sans-serif',
          fontSize: messageSize,
          fontWeight: 400,
          lineHeight: "1.5em",
        }}
        style={{
          width: "100%",
          height: narrow ? "min(58vh, 420px)" : "min(72vh, 640px)",
          minHeight: narrow ? 300 : 420,
        }}
      />
      <p className="metiers-stampcard-hint">
        {fr
          ? "Fais tourner le carrousel · clique un logo pour découvrir la filiale"
          : "Spin the carousel · click a logo to discover the subsidiary"}
      </p>
    </div>
  );
}
