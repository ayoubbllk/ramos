"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  title: string;
  description: string;
  image: string;
  logo?: string;
  href?: string;
  linkLabel?: string;
}

interface TabsCardProps {
  tabs: Tab[];
  imageFit?: "cover" | "contain";
}

export function TabsCard({ tabs, imageFit = "cover" }: TabsCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorId = useId();
  const active = tabs[activeIndex];
  const panelLogo = active.logo || (imageFit === "contain" ? active.image : undefined);

  return (
    <div className={`tc-container${imageFit === "contain" ? " tc-container-logos" : ""}`}>
      <div className="tc-tabs" role="tablist">
        {tabs.map((tab, i) => {
          const tabLogo = tab.logo || (imageFit === "contain" ? tab.image : undefined);
          return (
            <button
              key={tab.title}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              className={`tc-tab ${i === activeIndex ? "tc-tab-active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="tc-tab-inner">
                <div className="tc-tab-heading">
                  {tabLogo && (
                    <span className="tc-tab-logo">
                      <img src={tabLogo} alt="" />
                    </span>
                  )}
                  <span className="tc-tab-title">{tab.title}</span>
                </div>
                <AnimatePresence mode="wait">
                  {i === activeIndex && (
                    <motion.p
                      className="tc-tab-desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tab.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              {i === activeIndex && (
                <motion.div
                  className="tc-tab-indicator"
                  layoutId={indicatorId}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className={`tc-image-wrapper${imageFit === "contain" ? " tc-image-wrapper-logo" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={`tc-panel${imageFit === "contain" ? " tc-panel-logo" : ""}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {imageFit === "contain" && panelLogo ? (
              <img src={panelLogo} alt={active.title} className="tc-image tc-image-logo" />
            ) : (
              <img src={active.image} alt={active.title} className="tc-image" />
            )}
            {active.href && (
              <Link href={active.href} className="tc-panel-link">
                {active.linkLabel || "Découvrir"}
                <ArrowUpRight size={18} />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
