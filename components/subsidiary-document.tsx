"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/animations";
import { docT, type DocBlock, type DocSection, type SubsidiaryDocument } from "@/lib/content";
import type { Locale } from "@/lib/data";

const LAYOUTS = [
  "media-left",
  "media-right",
  "bleed",
  "sticky",
  "mosaic",
  "spotlight",
  "diagonal",
  "magazine",
  "orbit",
  "panel",
] as const;

type Layout = (typeof LAYOUTS)[number];

function pickImage(images: string[], index: number, offset = 0) {
  if (!images.length) return undefined;
  return images[(index + offset) % images.length];
}

function MediaFrame({
  src,
  alt,
  className = "",
  interactive = true,
}: {
  src?: string;
  alt: string;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      el.style.setProperty("--tilt-x", `${-y}deg`);
      el.style.setProperty("--tilt-y", `${x}deg`);
      el.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [interactive]);

  if (!src) return null;

  return (
    <div ref={ref} className={`sub-media ${className}`.trim()}>
      <div className="sub-media-inner">
        <img src={src} alt={alt} loading="lazy" />
        <span className="sub-media-glow" aria-hidden="true" />
        <span className="sub-media-frame" aria-hidden="true" />
      </div>
    </div>
  );
}

function Blocks({
  blocks,
  locale,
  images,
  sectionIndex,
}: {
  blocks: DocBlock[];
  locale: Locale;
  images: string[];
  sectionIndex: number;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className="sub-doc-p">
                {docT(block.text, locale)}
              </p>
            );
          case "lead":
            return (
              <p key={key} className="sub-doc-lead">
                {docT(block.text, locale)}
              </p>
            );
          case "h3":
            return (
              <h3 key={key} className="sub-doc-h3">
                {docT(block.text, locale)}
              </h3>
            );
          case "h4":
            return (
              <h4 key={key} className="sub-doc-h4">
                {docT(block.text, locale)}
              </h4>
            );
          case "ul":
            return (
              <ul key={key} className="sub-doc-list">
                {block.items.map((item, i) => (
                  <li key={i}>{docT(item, locale)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="sub-doc-list sub-doc-list-ol">
                {block.items.map((item, i) => (
                  <li key={i}>{docT(item, locale)}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={key} className="sub-doc-quote">
                {docT(block.text, locale)}
              </blockquote>
            );
          case "grid":
            return (
              <InteractiveGrid
                key={key}
                items={block.items}
                locale={locale}
                images={images}
                seed={sectionIndex + index}
              />
            );
          case "pillars":
            return (
              <InteractivePillars
                key={key}
                items={block.items}
                locale={locale}
                images={images}
                seed={sectionIndex}
              />
            );
          case "table":
            return (
              <div key={key} className="sub-doc-table-wrap">
                <table className="sub-doc-table">
                  <thead>
                    <tr>
                      {block.headers.map((h, i) => (
                        <th key={i}>{docT(h, locale)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{docT(cell, locale)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "steps":
            return (
              <InteractiveSteps
                key={key}
                items={block.items}
                locale={locale}
                images={images}
                seed={sectionIndex}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

function InteractiveGrid({
  items,
  locale,
  images,
  seed,
}: {
  items: { title: { en: string; fr?: string }; body: { en: string; fr?: string } }[];
  locale: Locale;
  images: string[];
  seed: number;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="sub-igrid">
      <div className="sub-igrid-tabs" role="tablist">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={active === i ? "is-active" : ""}
            onClick={() => setActive(i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {docT(item.title, locale)}
          </button>
        ))}
      </div>
      <div className="sub-igrid-panel" role="tabpanel">
        <MediaFrame src={pickImage(images, seed + active, 2)} alt="" className="sub-igrid-media" />
        <div>
          <h4>{docT(items[active].title, locale)}</h4>
          <p>{docT(items[active].body, locale)}</p>
        </div>
      </div>
    </div>
  );
}

function InteractivePillars({
  items,
  locale,
  images,
  seed,
}: {
  items: { title: { en: string; fr?: string }; body: { en: string; fr?: string } }[];
  locale: Locale;
  images: string[];
  seed: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="sub-ipillars">
      {items.map((item, i) => {
        const img = pickImage(images, seed + i, 3);
        return (
          <article
            key={i}
            className={hover === i ? "is-hot" : hover !== null ? "is-dim" : ""}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            tabIndex={0}
          >
            {img && (
              <div className="sub-ipillar-photo">
                <img src={img} alt="" loading="lazy" />
              </div>
            )}
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h4>{docT(item.title, locale)}</h4>
            <p>{docT(item.body, locale)}</p>
          </article>
        );
      })}
    </div>
  );
}

function InteractiveSteps({
  items,
  locale,
  images,
  seed,
}: {
  items: {
    number: string;
    title: { en: string; fr?: string };
    subtitle?: { en: string; fr?: string };
    blocks: DocBlock[];
  }[];
  locale: Locale;
  images: string[];
  seed: number;
}) {
  const [active, setActive] = useState(0);
  const step = items[active];
  const go = (dir: -1 | 1) => setActive((v) => (v + dir + items.length) % items.length);

  return (
    <div className="sub-isteps">
      <div className="sub-isteps-nav">
        {items.map((item, i) => (
          <button
            key={item.number}
            type="button"
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
            aria-current={i === active ? "step" : undefined}
          >
            <strong>{item.number}</strong>
            <span>{docT(item.title, locale)}</span>
          </button>
        ))}
      </div>
      <div className="sub-isteps-stage">
        <MediaFrame
          src={pickImage(images, seed + active, 1)}
          alt={docT(step.title, locale)}
          className="sub-isteps-media"
        />
        <div className="sub-isteps-copy">
          <div className="sub-isteps-controls">
            <button type="button" onClick={() => go(-1)} aria-label={locale === "fr" ? "Étape précédente" : "Previous step"}>
              <ChevronLeft size={18} />
            </button>
            <span>
              {active + 1} / {items.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label={locale === "fr" ? "Étape suivante" : "Next step"}>
              <ChevronRight size={18} />
            </button>
          </div>
          <h3>{docT(step.title, locale)}</h3>
          {step.subtitle && <p className="sub-doc-step-sub">{docT(step.subtitle, locale)}</p>}
          <Blocks blocks={step.blocks} locale={locale} images={images} sectionIndex={seed + active} />
        </div>
      </div>
    </div>
  );
}

function AccordionBody({
  children,
  openLabel,
  closeLabel,
}: {
  children: ReactNode;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`sub-acc ${open ? "is-open" : ""}`}>
      <div className="sub-acc-preview">{children}</div>
      <button type="button" className="sub-acc-toggle" onClick={() => setOpen((v) => !v)}>
        {open ? closeLabel : openLabel}
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

function SectionLayout({
  section,
  locale,
  index,
  images,
}: {
  section: DocSection;
  locale: Locale;
  index: number;
  images: string[];
}) {
  const layout: Layout = LAYOUTS[index % LAYOUTS.length];
  const title = docT(section.title, locale);
  const photo = pickImage(images, index, 0);
  const photo2 = pickImage(images, index, 2);
  const photo3 = pickImage(images, index, 4);
  const fr = locale === "fr";
  const body = (
    <Blocks blocks={section.blocks} locale={locale} images={images} sectionIndex={index} />
  );

  const head = (
    <div className="sub-sec-head">
      <span className="sub-sec-num">{String(index + 1).padStart(2, "0")}</span>
      <h2>{title}</h2>
    </div>
  );

  if (layout === "bleed") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--bleed" id={section.id}>
          <div className="sub-sec-bleed-bg">
            {photo && <img src={photo} alt="" />}
            <div className="sub-sec-bleed-shade" />
          </div>
          <div className="sub-sec-bleed-inner">
            {head}
            <AccordionBody openLabel={fr ? "Lire la section" : "Read section"} closeLabel={fr ? "Réduire" : "Collapse"}>
              {body}
            </AccordionBody>
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "sticky") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--sticky" id={section.id}>
          <div className="sub-sec-sticky-media">
            <MediaFrame src={photo} alt={title} />
          </div>
          <div className="sub-sec-sticky-copy">
            {head}
            {body}
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "mosaic") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--mosaic" id={section.id}>
          {head}
          <div className="sub-sec-mosaic-grid">
            <MediaFrame src={photo} alt="" className="m1" />
            <MediaFrame src={photo2} alt="" className="m2" />
            <MediaFrame src={photo3} alt="" className="m3" />
            <div className="sub-sec-mosaic-copy">{body}</div>
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "spotlight") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--spotlight" id={section.id}>
          <div className="sub-sec-spotlight-rail">
            <MediaFrame src={photo} alt={title} />
          </div>
          <div className="sub-sec-spotlight-copy">
            {head}
            {body}
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "diagonal") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--diagonal" id={section.id}>
          <div className="sub-sec-diag-media">
            {photo && <img src={photo} alt="" loading="lazy" />}
          </div>
          <div className="sub-sec-diag-copy">
            {head}
            {body}
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "magazine") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--magazine" id={section.id}>
          <div className="sub-sec-mag-top">
            {head}
            <MediaFrame src={photo} alt={title} className="sub-sec-mag-hero" />
          </div>
          <div className="sub-sec-mag-body">
            <div className="sub-sec-mag-side">
              <MediaFrame src={photo2} alt="" />
              <MediaFrame src={photo3} alt="" />
            </div>
            <div>{body}</div>
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "orbit") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--orbit" id={section.id}>
          <div className="sub-sec-orbit-visual" aria-hidden="true">
            <div className="sub-sec-orbit-ring">
              {photo && <img src={photo} alt="" className="o1" />}
              {photo2 && <img src={photo2} alt="" className="o2" />}
              {photo3 && <img src={photo3} alt="" className="o3" />}
            </div>
          </div>
          <div className="sub-sec-orbit-copy">
            {head}
            {body}
          </div>
        </section>
      </Reveal>
    );
  }

  if (layout === "panel") {
    return (
      <Reveal>
        <section className="sub-sec sub-sec--panel" id={section.id}>
          <div
            className="sub-sec-panel-bar"
            style={photo ? ({ backgroundImage: `linear-gradient(90deg, rgba(5,4,10,0.92), rgba(5,4,10,0.55)), url(${photo})` } as CSSProperties) : undefined}
          >
            {head}
          </div>
          <div className="sub-sec-panel-body">
            <MediaFrame src={photo2 || photo} alt={title} />
            <div>{body}</div>
          </div>
        </section>
      </Reveal>
    );
  }

  // media-left / media-right
  return (
    <Reveal direction={layout === "media-right" ? "left" : "right"}>
      <section className={`sub-sec sub-sec--split sub-sec--${layout}`} id={section.id}>
        <MediaFrame src={photo} alt={title} className="sub-sec-split-media" />
        <div className="sub-sec-split-copy">
          {head}
          {body}
        </div>
      </section>
    </Reveal>
  );
}

export function SubsidiaryDocumentView({
  document,
  locale,
  images,
  name,
}: {
  document: SubsidiaryDocument;
  locale: Locale;
  images: string[];
  name: string;
}) {
  const cover = pickImage(images, 0, 0);
  const closeImg = pickImage(images, images.length - 1, 0) || cover;

  return (
    <div className="sub-doc">
      <section className="sub-doc-overview sub-doc-overview--visual">
        <Reveal className="sub-doc-overview-copy">
          <Blocks blocks={document.overview} locale={locale} images={images} sectionIndex={0} />
          {document.mission && <p className="sub-doc-mission">{docT(document.mission, locale)}</p>}
        </Reveal>
        <Reveal delay={120} direction="scale" className="sub-doc-overview-media">
          <MediaFrame src={cover} alt={name} />
        </Reveal>
      </section>

      <div className="sub-doc-sections">
        {document.sections.map((section, index) => (
          <SectionLayout key={section.id} section={section} locale={locale} index={index} images={images} />
        ))}
      </div>

      {document.closing && document.closing.length > 0 && (
        <section className="sub-doc-closing sub-doc-closing--visual">
          <MediaFrame src={closeImg} alt="" className="sub-doc-closing-media" />
          <Reveal className="sub-doc-closing-copy">
            <Blocks blocks={document.closing} locale={locale} images={images} sectionIndex={99} />
          </Reveal>
        </section>
      )}
    </div>
  );
}
