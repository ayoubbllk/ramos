import { Reveal } from "@/components/animations";
import { PageHeroTunnel } from "@/components/page-hero-tunnel";
import { DepthCarousel } from "@/components/depth-carousel";
import { subsidiaries, type Locale } from "@/lib/data";
import { getTunnelImages } from "@/lib/tunnel-images";

export default async function Subsidiaries({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const fr = locale === "fr";

  return (
    <>
      <PageHeroTunnel className="atlas-hero" images={getTunnelImages()} startText={fr ? "Démarrer" : "Start"}>
        <Reveal>
          <p className="eyebrow">{fr ? "L'écosystème Ramos" : "The Ramos ecosystem"}</p>
        </Reveal>
        <Reveal delay={150}>
          <h1>
            {locale === "de"
              ? "Ein Ökosystem. Eine Richtung."
              : locale === "it"
                ? "Un ecosistema. Una sola direzione."
                : fr
                  ? "Un écosystème. Une seule direction."
                  : "One ecosystem. One direction."}
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p>
            {fr
              ? "Des expertises autonomes, réunies par une culture commune de l'excellence, de l'innovation et du temps long."
              : "Independent expertise, united by a shared culture of excellence, innovation and long-term thinking."}
          </p>
        </Reveal>
      </PageHeroTunnel>

      <section className="filiales-depth-section" aria-label={fr ? "Nos filiales" : "Our subsidiaries"}>
        <div className="filiales-depth-intro">
          <Reveal>
            <p className="section-label">{fr ? "Parcours du Groupe" : "Group journey"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>{fr ? "Explorez chaque expertise" : "Explore each expertise"}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="filiales-depth-lead">
              {fr
                ? "Glissez pour parcourir les logos, puis ouvrez la page de chaque filiale."
                : "Drag to browse the logos, then open each subsidiary page."}
            </p>
          </Reveal>
        </div>

        <DepthCarousel
          slides={subsidiaries.map((item) => ({
            image: item.logo || "/logo/LOGO RAMOS GROUP HD.png",
            alt: item.name,
            caption: item.name,
            href: `/${locale}/filiales/${item.slug}`,
            buttonLabel:
              locale === "de" ? "Entdecken" : locale === "it" ? "Scopri" : fr ? "Découvrir" : "Learn more",
            background: item.logoBg || "#140F1F",
            invert: item.logoInvert,
          }))}
          height={520}
          cardWidth={400}
          cardHeight={260}
          sideScale={0.68}
          spacing={36}
          depth={140}
          curve={38}
          perspective={1280}
          radius={16}
          maxBlur={4}
          reflection={false}
          vignette={48}
          edgeSpread={18}
          edgeStrength={14}
          background="transparent"
          labelColor="rgba(244, 238, 255, 0.78)"
          showCounter={false}
          showCardButton
          hint={fr ? "Scroll / Glisser" : "Scroll / Drag"}
          imageFit="contain"
          imagePadding={36}
        />
      </section>
    </>
  );
}
