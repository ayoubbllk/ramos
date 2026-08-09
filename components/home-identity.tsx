"use client";

import { Reveal } from "@/components/animations";
import { InfiniteScrollTunnel } from "@/components/infinite-scroll-tunnel";
import { SiteButton } from "@/components/site-button";
import type { Locale } from "@/lib/data";

type HomeIdentityProps = {
  locale: Locale;
  images: string[];
};

export function HomeIdentity({ locale, images }: HomeIdentityProps) {
  const fr = locale === "fr";

  return (
    <section className="home-identity" id="overview" aria-labelledby="home-identity-title">
      <div className="home-identity-visual">
        <InfiniteScrollTunnel images={images} isDarkMode />
        <div className="home-identity-shade" />
      </div>

      <div className="home-identity-inner home-identity-inner--centered">
        <div className="home-identity-copy home-identity-copy--centered">
          <Reveal>
            <p className="section-label">{fr ? "Groupe industriel · Depuis 1971" : "Industrial group · Since 1971"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="home-identity-title">
              {fr ? (
                <>
                  Ramos Group —
                  <em> six expertises, une trajectoire.</em>
                </>
              ) : (
                <>
                  Ramos Group —
                  <em> six disciplines, one trajectory.</em>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="home-identity-actions home-identity-actions--centered">
              <SiteButton href={`/${locale}/filiales`} variant="action">
                {fr ? "Découvrir nos filiales" : "Explore our subsidiaries"}
              </SiteButton>
              <SiteButton href={`/${locale}/a-propos`} variant="nova" size="sm">
                {fr ? "Notre histoire" : "Our story"}
              </SiteButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
