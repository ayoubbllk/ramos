import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/animations";
import { blogPosts, getBlogPost, blogBody, blogDateFull, blogExcerpt, blogFootnotes, blogTag, blogTitle } from "@/lib/blog";
import { staticLocales, type Locale } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    staticLocales.map((locale) => ({ locale, slug: post.slug })),
  );
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const fr = locale === "fr";
  const body = blogBody(post, locale);
  const gallery = post.images.slice(1);
  const backLabel =
    locale === "de" ? "Aktuelles" : locale === "it" ? "Notizie" : fr ? "Actualités" : "News";

  return (
    <article className="blog-article">
      <div className="blog-article-hero">
        <img src={post.images[0]} alt="" className="blog-article-cover" />
        <div className="blog-article-hero-shade" aria-hidden="true" />
        <div className="blog-article-hero-copy">
          <Reveal>
            <Link href={`/${locale}/actualites`} className="blog-article-back">
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <p className="blog-article-meta">
              <span>{blogTag(post, locale)}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.dateIso}>{blogDateFull(post, locale)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1>{blogTitle(post, locale)}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="blog-article-excerpt">{blogExcerpt(post, locale)}</p>
          </Reveal>
        </div>
      </div>

      <div className="blog-article-body">
        {body.map((paragraph: string, index: number) => (
          <Reveal key={index} delay={Math.min(index * 60, 240)}>
            <p>{paragraph}</p>
          </Reveal>
        ))}

        {post.footnotes && (
          <Reveal delay={100}>
            <p className="blog-article-footnotes">{blogFootnotes(post, locale)}</p>
          </Reveal>
        )}
      </div>

      {gallery.length > 0 && (
        <section className="blog-article-gallery" aria-label={fr ? "Galerie" : "Gallery"}>
          {gallery.map((src) => (
            <figure key={src} className="blog-article-gallery-item">
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </section>
      )}
    </article>
  );
}
