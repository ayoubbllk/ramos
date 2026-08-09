import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/animations";
import { blogPosts, getBlogPost } from "@/lib/blog";
import type { Locale } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.flatMap((post) => [
    { locale: "fr", slug: post.slug },
    { locale: "en", slug: post.slug },
  ]);
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
  const body = post.body[locale];
  const gallery = post.images.slice(1);

  return (
    <article className="blog-article">
      <div className="blog-article-hero">
        <img src={post.images[0]} alt="" className="blog-article-cover" />
        <div className="blog-article-hero-shade" aria-hidden="true" />
        <div className="blog-article-hero-copy">
          <Reveal>
            <Link href={`/${locale}/actualites`} className="blog-article-back">
              <ArrowLeft size={16} />
              {fr ? "Actualités" : "News"}
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <p className="blog-article-meta">
              <span>{post.tag[locale]}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.dateIso}>{post.dateFull[locale]}</time>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1>{post.title[locale]}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="blog-article-excerpt">{post.excerpt[locale]}</p>
          </Reveal>
        </div>
      </div>

      <div className="blog-article-body">
        {body.map((paragraph, index) => (
          <Reveal key={index} delay={Math.min(index * 60, 240)}>
            <p>{paragraph}</p>
          </Reveal>
        ))}

        {post.footnotes && (
          <Reveal delay={100}>
            <p className="blog-article-footnotes">{post.footnotes[locale]}</p>
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
