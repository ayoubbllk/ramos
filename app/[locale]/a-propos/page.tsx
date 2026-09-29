import { Reveal } from "@/components/animations";
import { PageHeroTunnel } from "@/components/page-hero-tunnel";
import { SiteButton } from "@/components/site-button";
import { getAboutCopy } from "@/lib/content/about";
import type { Locale } from "@/lib/data";
import { getTunnelImages } from "@/lib/tunnel-images";

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getAboutCopy(locale);

  return (
    <>
      <PageHeroTunnel className="about-hero" images={getTunnelImages()} startText={locale === "fr" ? "Démarrer" : "Start"}>
        <Reveal>
          <p className="eyebrow">{t.heroEyebrow}</p>
        </Reveal>
        <Reveal delay={150}>
          <h1>{t.heroTitle}</h1>
        </Reveal>
      </PageHeroTunnel>

      <section className="about-siege" aria-label={locale === "fr" ? "Siège Ramos Group" : "Ramos Group headquarters"}>
        <img src="/PHOTO SIEGE RAMOS GROUP 0004.png" alt={locale === "fr" ? "Siège social Ramos Group" : "Ramos Group headquarters"} />
      </section>

      {/* Section 1 — DG portrait studio */}
      <section className="about-dg about-dg--portrait" aria-labelledby="about-management-title">
        <Reveal direction="left" className="about-dg-media">
          <img src="/about/dg-portrait.jpeg" alt={t.imgPortraitAlt} width={720} height={900} />
        </Reveal>
        <div className="about-dg-copy">
          <Reveal>
            <p className="section-label">{t.managementLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-management-title">{t.managementTitle}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="about-dg-role">{t.managementRole}</p>
          </Reveal>
          <Reveal delay={180}>
            <p>{t.managementBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Histoire — year + text */}
      <section className="about-history" aria-labelledby="about-history-title">
        <Reveal direction="scale">
          <div className="about-history-year" aria-hidden="true">
            1971
          </div>
        </Reveal>
        <div className="about-history-copy">
          <Reveal>
            <p className="section-label">{t.historyLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-history-title">{t.historyTitle}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p>{t.historyBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Héritage — group photo band */}
      <section className="about-legacy" aria-labelledby="about-legacy-title">
        <div className="about-legacy-media">
          <img src="/about/leadership-groupe.jpeg" alt={t.imgGroupAlt} width={1600} height={900} />
          <div className="about-legacy-shade" />
        </div>
        <div className="about-legacy-inner">
          <Reveal>
            <p className="section-label">{t.legacyLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-legacy-title">{t.legacyTitle}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p>{t.legacyBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Transformation stratégique */}
      <section className="about-transform" aria-labelledby="about-transform-title">
        <Reveal>
          <div className="about-transform-mark">
            <span>{t.transformLabel}</span>
          </div>
        </Reveal>
        <div className="about-transform-copy">
          <Reveal delay={60}>
            <h2 id="about-transform-title">{t.transformTitle}</h2>
          </Reveal>
          {t.transformBody.map((paragraph, i) => (
            <Reveal key={i} delay={120 + i * 80}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="about-impact" aria-labelledby="about-impact-title">
        <Reveal>
          <p className="section-label">{t.impactLabel}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="about-impact-title">{t.impactTitle}</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="about-impact-body">{t.impactBody}</p>
        </Reveal>
      </section>

      {/* Section 2 — DG bureau (séparée) + engagement institutionnel */}
      <section className="about-dg about-dg--bureau" aria-labelledby="about-institutional-title">
        <div className="about-dg-copy">
          <Reveal>
            <p className="section-label">{t.institutionalLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-institutional-title">{t.institutionalTitle}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>{t.institutionalIntro}</p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="about-role-list">
              {t.institutionalRoles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <p>{t.institutionalOutro}</p>
          </Reveal>
        </div>
        <Reveal direction="right" className="about-dg-media">
          <img src="/about/dg-bureau.jpeg" alt={t.imgBureauAlt} width={1200} height={800} />
        </Reveal>
      </section>

      {/* Formation */}
      <section className="about-education" aria-labelledby="about-education-title">
        <div className="about-education-intro">
          <Reveal>
            <p className="section-label">{t.educationLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-education-title">{t.educationTitle}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p>{t.educationIntro}</p>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <ul className="about-diploma-list">
            {t.educationItems.map((item, i) => (
              <li key={item}>
                <span className="about-diploma-index">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={160}>
          <p className="about-education-outro">{t.educationOutro}</p>
        </Reveal>
      </section>

      {/* Vision */}
      <section className="about-vision" aria-labelledby="about-vision-title">
        <Reveal>
          <p className="section-label">{t.visionLabel}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="about-vision-title">{t.visionTitle}</h2>
        </Reveal>
        <Reveal delay={140}>
          <p>{t.visionBody}</p>
        </Reveal>
        <Reveal delay={200}>
          <SiteButton href={`/${locale}/filiales`} variant="action">
            {t.ctaFiliales}
          </SiteButton>
        </Reveal>
      </section>
    </>
  );
}
