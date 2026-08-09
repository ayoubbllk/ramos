import { Reveal } from "@/components/animations";
import { SiteButton } from "@/components/site-button";
import { HomeIdentity } from "@/components/home-identity";
import { ScrollZoomReveal } from "@/components/scroll-zoom-reveal";
import { VelocityCarousel } from "@/components/velocity-carousel";
import { TabsCard } from "@/components/tabs-card";
import { DepthBlurCarousel } from "@/components/depth-blur-carousel";
import { HeroVideo } from "@/components/hero-video";
import { HeroTechFrame } from "@/components/hero-tech-frame";
import { KineticWorkIndex } from "@/components/kinetic-work-index";
import { HomeBlog } from "@/components/home-blog";
import { GlobeSphere } from "@/components/globe-sphere";
import { showcase, subsidiaries, sectorPanels, type Locale, t } from "@/lib/data";
import { getTunnelImages } from "@/lib/tunnel-images";

const HERO_SHOWREEL = "/hero/VIDEO PAGE D'ACCEUIL RAMOS GROUP.mp4";
const FALLBACK_LOGO = "/logo/LOGO RAMOS GROUP HD.png";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const fr = locale === "fr";
  const tunnelImages = getTunnelImages();

  return (
    <>
      {/* ── HERO ── */}
      <section className="home-hero" aria-label={fr ? "Ramos Group" : "Ramos Group"}>
        <h1 className="sr-only">Ramos Group</h1>
        <HeroVideo src={HERO_SHOWREEL} locale={locale} />
        <div className="hero-shade" aria-hidden="true" />
        <HeroTechFrame />
      </section>

      {/* ── IDENTITY — same footprint as subsidiary-identity ── */}
      <HomeIdentity locale={locale} images={tunnelImages} />

      {/* ── SUBSIDIARIES — Kinetic Work Index (logos) ── */}
      <section className="home-subsidiaries home-subsidiaries--kinetic" aria-label={fr ? "Nos filiales" : "Our subsidiaries"}>
        <div className="home-subsidiaries-header home-subsidiaries-header--kinetic">
          <Reveal>
            <p className="section-label">{fr ? "Nos métiers" : "Our businesses"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>{fr ? "Six filiales, une ambition commune." : "Six subsidiaries, one shared ambition."}</h2>
          </Reveal>
        </div>

        <KineticWorkIndex
          eyebrow={fr ? "Nos métiers" : "Our businesses"}
          scrollLabel={fr ? "Scroller pour explorer" : "Scroll to explore"}
          viewLabel={fr ? "Découvrir" : "View subsidiary"}
          background="#05040A"
          textColor="#F4EEFF"
          mutedColor="rgba(244,238,255,0.56)"
          accentColor="#F8A040"
          lineColor="rgba(248,160,64,0.22)"
          imageFit="contain"
          imageAspectRatio="666 / 375"
          imageWidth={52}
          imageHeight={30}
          radius="14px"
          scrollStep={78}
          displaySize={150}
          titleOpacity={0.12}
          outlineRows
          enableHover
          hoverShine={false}
          projects={subsidiaries.map((item) => ({
            title: item.name,
            category: t(item.sector, locale),
            year: "Ramos Group",
            description: t(item.tagline, locale),
            image: {
              src: item.logo || FALLBACK_LOGO,
              alt: item.name,
            },
            link: `/${locale}/filiales/${item.slug}`,
            cardBackground: item.logoBg,
            globeColor: item.logoGlow || item.accent,
            logoInvert: item.logoInvert,
          }))}
        />
      </section>

      {/* ── SECTEURS — Depth blur carousel ── */}
      <section className="home-panels">
        <div className="home-panels-header">
          <Reveal>
            <p className="section-label">{fr ? "Nos secteurs" : "Our sectors"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>{fr ? "Les industries que nous accompagnons." : "The industries we serve."}</h2>
          </Reveal>
        </div>
        <div className="home-panels-carousel">
          <DepthBlurCarousel
            images={sectorPanels.map((panel) => panel.image)}
            ariaLabel={fr ? "Industries accompagnées" : "Industries we serve"}
            itemWidth={520}
            itemHeight={300}
            sideItemWidth={340}
            sideItemHeight={290}
            gap={56}
            borderRadius={14}
          />
        </div>
      </section>

      {/* ── SCROLL ZOOM REVEAL — Showreel ── */}
      <ScrollZoomReveal
        imageSrc={HERO_SHOWREEL}
        videoSrc={HERO_SHOWREEL}
        leftText={fr ? "©2026" : "©2026"}
        rightText={fr ? "Showreel" : "Showreel"}
        buttonText={fr ? "Voir le showreel" : "Play showreel"}
      />

      {/* ── BLOG ── */}
      <HomeBlog locale={locale} />

      {/* ── VELOCITY CAROUSEL — Réalisations ── */}
      <section className="home-carousel-section">
        <div className="home-carousel-globe" aria-hidden="true">
          <GlobeSphere
            globeColor="#F8A040"
            particleCount={420}
            speed={0.55}
            radiusRatio={0.42}
          />
        </div>
        <div className="home-carousel-header">
          <Reveal>
            <p className="section-label">{fr ? "Sur le terrain" : "On the ground"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>{fr ? "Nos réalisations en images." : "Our work in pictures."}</h2>
          </Reveal>
        </div>
        <VelocityCarousel
          cards={showcase.map((item) => ({
            image: item.image,
            headline: t(item.title, locale),
            text: t(item.caption, locale),
            buttonText: fr ? "Voir la filiale" : "View subsidiary",
            buttonLink: `/${locale}/filiales/${item.slug}`,
          }))}
          backgroundColor="transparent"
        />
      </section>

      {/* ── TABS CARD — Expertise ── */}
      <section className="home-tabs-section">
        <div className="home-tabs-header">
          <Reveal>
            <p className="section-label">{fr ? "Notre expertise" : "Our expertise"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>{fr ? "Des compétences clés au service de votre projet." : "Key capabilities serving your project."}</h2>
          </Reveal>
        </div>
        <Reveal>
          <TabsCard
            tabs={subsidiaries.slice(0, 4).map((item) => ({
              title: item.name,
              description: t(item.intro, locale),
              image: item.images[0] || "/stone/stockage/RAMOS CARRIERE STONE 3 (1).png",
            }))}
          />
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <Reveal>
            <p className="home-cta-label">{fr ? "Prêt à collaborer ?" : "Ready to collaborate?"}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2>{fr ? "Parlons de votre prochain projet." : "Let's discuss your next project."}</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="home-cta-desc">{fr ? "Que vous cherchiez un partenaire industriel, logistique ou stratégique, notre équipe est à votre écoute." : "Whether you need an industrial, logistics or strategic partner, our team is ready to listen."}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="home-cta-actions">
              <SiteButton href={`/${locale}/contact`} variant="action" size="lg">
                {fr ? "Nous contacter" : "Contact us"}
              </SiteButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
