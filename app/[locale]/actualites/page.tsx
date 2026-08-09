import Link from "next/link";
import { Reveal } from "@/components/animations";
import { BlogCard } from "@/components/blog-card";
import { PageHeroTunnel } from "@/components/page-hero-tunnel";
import { blogPosts } from "@/lib/blog";
import type { Locale } from "@/lib/data";
import { getTunnelImages } from "@/lib/tunnel-images";

export default async function News({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const fr = locale === "fr";

  return (
    <>
      <PageHeroTunnel className="news-hero" images={getTunnelImages()} startText={fr ? "Démarrer" : "Start"}>
        <Reveal>
          <p className="eyebrow">{fr ? "Actualités & perspectives" : "News & perspectives"}</p>
        </Reveal>
        <Reveal delay={150}>
          <h1>{fr ? "Ce qui nous fait avancer." : "What moves us forward."}</h1>
        </Reveal>
        <Reveal delay={300}>
          <p>
            {fr
              ? "Événements, partenariats et regards croisés depuis l'écosystème Ramos."
              : "Events, partnerships and shared perspectives from across the Ramos ecosystem."}
          </p>
        </Reveal>
      </PageHeroTunnel>

      <section className="news-blog-grid" aria-label={fr ? "Articles" : "Articles"}>
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 80}>
            <BlogCard
              href={`/${locale}/actualites/${post.slug}`}
              mainImage={post.images[0]}
              hoverImage={post.images[1] || post.images[0]}
              author={post.author}
              title={post.title[locale]}
              tag={post.tag[locale]}
              date={post.dateCard[locale]}
            />
          </Reveal>
        ))}
      </section>

      <div className="news-blog-back">
        <Link href={`/${locale}`}>{fr ? "Retour à l'accueil" : "Back to home"}</Link>
      </div>
    </>
  );
}
