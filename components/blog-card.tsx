"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BlogCardProps {
  href: string;
  mainImage: string;
  hoverImage: string;
  author: string;
  title: string;
  tag: string;
  date: string;
  imageAlt?: string;
}

/** Recreation of Framer Blog Card (qc73) — hover avatar notch + arrow. */
export function BlogCard({
  href,
  mainImage,
  hoverImage,
  author,
  title,
  tag,
  date,
  imageAlt = "",
}: BlogCardProps) {
  return (
    <Link href={href} className="bc-card" aria-label={title}>
      <div className="bc-media">
        <img className="bc-main-image" src={mainImage} alt={imageAlt} loading="lazy" />
        <div className="bc-hover-panel" aria-hidden="true">
          <div className="bc-corner bc-corner-top">
            <svg viewBox="0 0 12 12" overflow="visible" aria-hidden="true">
              <path d="M 0 12 L 12 12 C 5.373 12 0 6.627 0 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="bc-hover-row">
            <div className="bc-avatar-shell">
              <img className="bc-avatar" src={hoverImage} alt="" loading="lazy" />
            </div>
            <div className="bc-corner bc-corner-side">
              <svg viewBox="0 0 12 12" overflow="visible" aria-hidden="true">
                <path d="M 0 12 L 12 12 C 5.373 12 0 6.627 0 0 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bc-body">
        <div className="bc-body-top">
          <p className="bc-author">{author}</p>
          <h3 className="bc-title">{title}</h3>
        </div>
        <div className="bc-body-bottom">
          <span className="bc-tag">{tag}</span>
          <span className="bc-date">{date}</span>
          <span className="bc-arrow" aria-hidden="true">
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
