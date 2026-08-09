import { Reveal } from "@/components/animations";
import { BlogCard } from "@/components/blog-card";
import { SiteButton } from "@/components/site-button";
import { blogPosts } from "@/lib/blog";
import type { Locale } from "@/lib/data";

export function HomeBlog({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const newsHref = `/${locale}/actualites`;

  return (
    <section className="home-blog" aria-labelledby="home-blog-title">
      <div className="home-blog-header">
        <div className="home-blog-intro">
          <Reveal>
            <p className="section-label">{fr ? "Actualités" : "News"}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="home-blog-title">
              {fr ? "Perspectives depuis l'écosystème Ramos." : "Perspectives from the Ramos ecosystem."}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <SiteButton href={newsHref} variant="origin" size="sm" className="home-blog-all">
            {fr ? "Toutes les actualités" : "All news"}
          </SiteButton>
        </Reveal>
      </div>

      <div className="home-blog-grid">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 90}>
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
      </div>
    </section>
  );
}
