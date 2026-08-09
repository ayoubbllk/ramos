import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { HeroVideo } from "@/components/hero-video";
import { HeroTechFrame } from "@/components/hero-tech-frame";
import { Reveal } from "@/components/animations";
import { SiteButton } from "@/components/site-button";
import { InteractiveStatsTicker } from "@/components/interactive-stats-ticker";
import { MotionGallery } from "@/components/motion-gallery";
import { HeroWipeSlideshow } from "@/components/hero-wipe-slideshow";
import { BentoGallery } from "@/components/bento-gallery";
import { QuantumMorphingMatrix } from "@/components/quantum-morphing-matrix";
import { SubsidiaryDocumentView } from "@/components/subsidiary-document";
import { SubsidiaryOrbit } from "@/components/subsidiary-orbit";
import { getSubsidiaryDocument } from "@/lib/content";
import { getSubsidiary, subsidiaries, t, type Locale } from "@/lib/data";

export function generateStaticParams() {
  return subsidiaries.flatMap((item) => ["fr", "en"].map((locale) => ({ locale, slug: item.slug })));
}

function splitImages(images: string[]) {
  if (images.length <= 2) {
    return { motion: images, wipe: images, bento: images };
  }
  if (images.length <= 5) {
    const mid = Math.ceil(images.length / 2);
    return {
      motion: images.slice(0, mid),
      wipe: images.slice(Math.max(0, mid - 1)),
      bento: images.slice(0, Math.min(6, images.length)),
    };
  }
  const third = Math.ceil(images.length / 3);
  return {
    motion: images.slice(0, third + 1),
    wipe: images.slice(third, third * 2 + 1),
    bento: images.slice(Math.max(0, images.length - 6)),
  };
}

export default async function SubsidiaryPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const item = getSubsidiary(slug);
  if (!item) notFound();
  const fr = locale === "fr";
  const next = subsidiaries[(subsidiaries.indexOf(item) + 1) % subsidiaries.length];
  const galleries = splitImages(item.images);
  const hasPhotos = item.images.length > 0;
  const document = getSubsidiaryDocument(slug);
  const accentStyle = { "--accent": item.accent } as React.CSSProperties;
  const identityPhoto = item.images[0];

  return (
    <div className="subsidiary-page" style={accentStyle}>
      <section className="subsidiary-hero">
        <HeroVideo src={item.video} locale={locale} />
        <div className="subsidiary-hero-shade" aria-hidden="true" />
        <HeroTechFrame />
      </section>

      <section className="subsidiary-identity" id="overview">
        <div className="subsidiary-identity-visual" aria-hidden="true">
          <QuantumMorphingMatrix
            className="subsidiary-identity-matrix"
            enablePreview
            bgColor="#05040A"
            colorCloud={item.accent}
            colorSphere="#E8D5FF"
            colorHelix="#FF6B2C"
          />
          <div className="subsidiary-identity-shade" />
        </div>
        <div className="subsidiary-identity-inner">
          <div className="subsidiary-identity-copy">
            <Reveal>
              <h1>{item.name}</h1>
            </Reveal>
            <Reveal delay={120}>
              <SiteButton href={`/${locale}/contact`} variant="action">
                {fr ? "Démarrer un projet" : "Start a project"}
              </SiteButton>
            </Reveal>
          </div>
        </div>
      </section>

      <SubsidiaryOrbit item={item} locale={locale} />

      <nav className="subsidiary-toc" aria-label={fr ? "Sommaire" : "Table of contents"}>
        <div className="subsidiary-toc-inner">
          {document?.sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {locale === "fr" && section.title.fr ? section.title.fr : section.title.en}
            </a>
          ))}
          <a href="#expertise">
            <span>{String((document?.sections.length ?? 0) + 1).padStart(2, "0")}</span>
            {fr ? "Expertise" : "Expertise"}
          </a>
          {hasPhotos && (
            <a href="#gallery">
              <span>{String((document?.sections.length ?? 0) + 2).padStart(2, "0")}</span>
              {fr ? "Galerie" : "Gallery"}
            </a>
          )}
        </div>
      </nav>

      {document && (
        <SubsidiaryDocumentView document={document} locale={locale} images={item.images} name={item.name} />
      )}

      {!document && (
        <section className="subsidiary-overview subsidiary-overview--visual">
          <Reveal direction="scale" className="subsidiary-overview-media">
            {identityPhoto && <img src={identityPhoto} alt="" />}
          </Reveal>
          <div>
            <Reveal>
              <p className="section-label">{fr ? "Notre expertise" : "Our expertise"}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2>{t(item.tagline, locale)}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p>{t(item.intro, locale)}</p>
            </Reveal>
          </div>
        </section>
      )}

      <InteractiveStatsTicker
        items={item.facts.map((fact, i) => ({
          id: `${item.slug}-fact-${i}`,
          title: fact.value,
          label: t(fact.label, locale),
          image: item.images[i % Math.max(item.images.length, 1)] || "/PHOTO SIEGE RAMOS GROUP 1.png",
          href: `#expertise`,
        }))}
        ariaLabel={fr ? `Chiffres clés ${item.name}` : `${item.name} key figures`}
      />

      <section className="expertise-section expertise-section--visual" id="expertise">
        <Reveal>
          <div className="section-heading">
            <p className="section-label">{fr ? "Champs d'action" : "What we do"}</p>
            <h2>{fr ? "Une maîtrise de bout en bout." : "End-to-end command."}</h2>
          </div>
        </Reveal>
        <div className="services-visual-grid">
          {item.services.map((service, index) => {
            const img = item.images[index % Math.max(item.images.length, 1)];
            return (
              <Reveal key={service.en} delay={index * 90}>
                <article className="service-visual-card">
                  {img && (
                    <div className="service-visual-media">
                      <img src={img} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className="service-visual-body">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{t(service, locale)}</h3>
                    <Check />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {hasPhotos && (
        <div id="gallery">
          <section className="subsidiary-gallery-section subsidiary-gallery-motion">
            <div className="subsidiary-gallery-header">
              <Reveal>
                <p className="section-label">{fr ? "Sur le terrain" : "On the ground"}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2>{fr ? "Une lecture en mouvement." : "A moving perspective."}</h2>
              </Reveal>
            </div>
            <MotionGallery images={galleries.motion} altPrefix={item.name} />
          </section>

          <section className="subsidiary-gallery-section subsidiary-gallery-wipe">
            <div className="subsidiary-gallery-header subsidiary-gallery-header-narrow">
              <Reveal>
                <p className="section-label">{fr ? "Moments clés" : "Key moments"}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2>{fr ? "Le savoir-faire, image après image." : "Craft, frame by frame."}</h2>
              </Reveal>
            </div>
            <div className="subsidiary-wipe-wrap">
              <HeroWipeSlideshow images={galleries.wipe} altPrefix={item.name} />
            </div>
          </section>

          <section className="subsidiary-gallery-section subsidiary-gallery-bento">
            <div className="subsidiary-gallery-header">
              <Reveal>
                <p className="section-label">{fr ? "Archive visuelle" : "Visual archive"}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2>{fr ? "Composition du terrain." : "Field composition."}</h2>
              </Reveal>
            </div>
            <div className="subsidiary-bento-wrap">
              <BentoGallery images={galleries.bento} altPrefix={item.name} />
            </div>
          </section>
        </div>
      )}

      <Link className="next-subsidiary" href={`/${locale}/filiales/${next.slug}`}>
        <p>{fr ? "Filiale suivante" : "Next subsidiary"}</p>
        <h2>{next.name}</h2>
        <ArrowUpRight />
      </Link>
    </div>
  );
}
