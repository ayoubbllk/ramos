"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SiteButton } from "@/components/site-button";

const MOBILE_DOT_CENTER = 25;

export type StepsFlowStep = {
  number: string;
  title: string;
  text: string;
  image?: string;
  href?: string;
  linkLabel?: string;
};

export type StepsFlowProps = {
  steps: StepsFlowStep[];
  accentColor?: string;
  lineColor?: string;
  cornerMaskColor?: string;
  numberColor?: string;
  titleColor?: string;
  textColor?: string;
  numberTitleGap?: number;
  titleTextGap?: number;
  gridGap?: number;
  imageRadius?: number;
  mobileBreakpoint?: number;
  imageAnimation?: "none" | "fade" | "slideUp";
  mobileImageGap?: number;
  lineWidth?: number;
  dotSize?: number;
  showDots?: boolean;
  cornerRadius?: number;
  className?: string;
};

type FontStyle = {
  fontSize?: number | string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: string;
  fontFamily?: string;
};

function useIsMobile(bp: number, containerRef: React.RefObject<HTMLDivElement | null>) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = (width: number) => setIsMobile(width < bp);
    check(el.offsetWidth);
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (typeof width === "number") check(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [bp, containerRef]);
  return isMobile;
}

function parseFontSize(font?: FontStyle) {
  if (!font?.fontSize) return 16;
  return parseFloat(String(font.fontSize)) || 16;
}

function getImageAnimation(type: StepsFlowProps["imageAnimation"]) {
  if (type === "none") {
    return { initial: { opacity: 1, y: 0 }, whileInView: undefined, transition: { duration: 0 } };
  }
  if (type === "slideUp") {
    return {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as const },
    };
  }
  return {
    initial: { opacity: 0, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as const },
  };
}

const defaultNumberFont: FontStyle = {
  fontSize: 96,
  fontWeight: 300,
  lineHeight: "1.1",
  letterSpacing: "-0.02em",
  fontFamily: "var(--font-display)",
};
const defaultTitleFont: FontStyle = {
  fontSize: 24,
  fontWeight: 600,
  lineHeight: "1.3",
  letterSpacing: "-0.01em",
  fontFamily: "var(--font-display)",
};
const defaultTextFont: FontStyle = {
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "1.65em",
  fontFamily: "var(--font-body)",
};

export function StepsFlow({
  steps = [],
  accentColor = "#F8A040",
  lineColor = "rgba(248, 160, 64, 0.18)",
  cornerMaskColor = "#05040A",
  numberColor = "#F8A040",
  titleColor = "#F4EEFF",
  textColor = "#A89BB5",
  numberTitleGap = 28,
  titleTextGap = 12,
  gridGap = 80,
  imageRadius = 16,
  mobileBreakpoint = 809,
  imageAnimation = "fade",
  mobileImageGap = 16,
  lineWidth = 8,
  dotSize = 24,
  showDots = true,
  cornerRadius = 50,
  className = "",
}: StepsFlowProps) {
  const lastIndex = steps.length - 1;
  const lastReversed = lastIndex % 2 !== 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(mobileBreakpoint, containerRef);
  const mobileDotLeft = MOBILE_DOT_CENTER - dotSize / 2;
  const mobileLineLeft = MOBILE_DOT_CENTER - lineWidth / 2;
  const dotOffset = dotSize / 2 - lineWidth / 2;

  return (
    <div ref={containerRef} className={`steps-flow ${className}`.trim()} style={{ width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: isMobile ? "100%" : "calc(100% - 60px)",
          margin: "0 auto",
          paddingLeft: isMobile ? 30 : 0,
          paddingRight: isMobile ? 15 : 0,
        }}
      >
        {steps.map((step, index) => (
          <StepRow
            key={`${index}-${lineWidth}-${cornerRadius}`}
            step={step}
            index={index}
            isFirst={index === 0}
            isLast={index === lastIndex}
            accentColor={accentColor}
            lineColor={lineColor}
            cornerMaskColor={cornerMaskColor}
            numberFont={defaultNumberFont}
            numberColor={numberColor}
            titleFont={defaultTitleFont}
            titleColor={titleColor}
            textFont={defaultTextFont}
            textColor={textColor}
            numberTitleGap={numberTitleGap}
            titleTextGap={titleTextGap}
            gridGap={gridGap}
            imageRadius={imageRadius}
            isMobile={isMobile}
            imageAnimation={imageAnimation}
            mobileImageGap={mobileImageGap}
            lineWidth={lineWidth}
            dotSize={dotSize}
            showDots={showDots}
            cornerRadius={cornerRadius}
          />
        ))}

        {showDots && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: isMobile ? mobileDotLeft : -dotOffset,
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: accentColor,
              zIndex: 3,
            }}
          />
        )}
        {showDots && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: isMobile
                ? mobileDotLeft
                : lastReversed
                  ? `calc(50% - ${dotOffset}px)`
                  : -dotOffset,
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: accentColor,
              zIndex: 3,
            }}
          />
        )}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: mobileLineLeft,
              width: lineWidth,
              height: "100%",
              backgroundColor: lineColor,
              borderRadius: showDots ? 0 : lineWidth / 2,
              zIndex: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}

type StepRowProps = {
  step: StepsFlowStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  accentColor: string;
  lineColor: string;
  cornerMaskColor: string;
  numberFont: FontStyle;
  numberColor: string;
  titleFont: FontStyle;
  titleColor: string;
  textFont: FontStyle;
  textColor: string;
  numberTitleGap: number;
  titleTextGap: number;
  gridGap: number;
  imageRadius: number;
  isMobile: boolean;
  imageAnimation: StepsFlowProps["imageAnimation"];
  mobileImageGap: number;
  lineWidth: number;
  dotSize: number;
  showDots: boolean;
  cornerRadius: number;
};

function StepRow(props: StepRowProps) {
  return <AnimatedStepRow {...props} />;
}

function StepCopy({
  step,
  numberFont,
  numberColor,
  titleFont,
  titleColor,
  textFont,
  textColor,
  numberTitleGap,
  titleTextGap,
  isNumberTriggered,
  setIsNumberTriggered,
  numberValue,
  numFontSize,
  numLH,
}: {
  step: StepsFlowStep;
  numberFont: FontStyle;
  numberColor: string;
  titleFont: FontStyle;
  titleColor: string;
  textFont: FontStyle;
  textColor: string;
  numberTitleGap: number;
  titleTextGap: number;
  isNumberTriggered: boolean;
  setIsNumberTriggered: (v: boolean) => void;
  numberValue: number;
  numFontSize: number;
  numLH: number;
}) {
  return (
    <>
      <motion.div
        onViewportEnter={() => setIsNumberTriggered(true)}
        viewport={{ once: true, amount: 0.1 }}
        style={{
          position: "relative",
          maxHeight: numLH,
          overflow: "hidden",
          ...numberFont,
          fontSize: numFontSize,
          lineHeight: `${numLH}px`,
          color: numberColor,
          opacity: isNumberTriggered ? 1 : 0,
        }}
      >
        0
        <motion.span
          initial={{ y: "0%" }}
          animate={{ y: isNumberTriggered ? `-${10 * (numberValue % 10)}%` : "0%" }}
          transition={{ type: "spring", damping: 30, stiffness: 100 + 20 * (numberValue % 10) }}
          style={{
            position: "absolute",
            top: 0,
            width: Math.round(numFontSize * 0.68),
            wordBreak: "break-all",
          }}
        >
          0123456789
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.42, 0, 0.58, 1] }}
        viewport={{ once: true, amount: 0.1 }}
        style={{ marginTop: numberTitleGap, ...titleFont, color: titleColor }}
      >
        {step.href ? (
          <Link href={step.href} className="steps-flow-title-link">
            {step.title}
          </Link>
        ) : (
          step.title
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.42, 0, 0.58, 1] }}
        viewport={{ once: true, amount: 0.1 }}
        style={{ marginTop: titleTextGap, ...textFont, color: textColor }}
      >
        {step.text}
      </motion.div>
      {step.href && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: [0.42, 0, 0.58, 1] }}
          viewport={{ once: true, amount: 0.1 }}
          style={{ marginTop: 20 }}
        >
          <SiteButton href={step.href} variant="origin" size="sm" className="steps-flow-cta">
            {step.linkLabel ?? "Découvrir"}
          </SiteButton>
        </motion.div>
      )}
    </>
  );
}

function AnimatedStepRow({
  step,
  index,
  isFirst,
  isLast,
  accentColor,
  lineColor,
  cornerMaskColor,
  numberFont,
  numberColor,
  titleFont,
  titleColor,
  textFont,
  textColor,
  numberTitleGap,
  titleTextGap,
  gridGap,
  imageRadius,
  isMobile,
  imageAnimation,
  mobileImageGap,
  lineWidth,
  dotSize,
  showDots,
  cornerRadius,
}: StepRowProps) {
  const reversed = !isMobile && index % 2 !== 0;
  const stepRef = useRef<HTMLDivElement>(null);
  const [isNumberTriggered, setIsNumberTriggered] = useState(false);
  const { scrollYProgress } = useScroll({ target: stepRef, offset: ["end end", "start start"] });
  const height = useTransform(scrollYProgress, [0, 0.02, 0.3], ["0%", "0%", "100%"]);
  const width = useTransform(scrollYProgress, [0, 0.3, 0.4], ["0%", "0%", "50%"]);
  const opacityTop = useTransform(scrollYProgress, [0, 0.01], ["0%", "100%"]);
  const opacityBottom = useTransform(scrollYProgress, [0, 0.29, 0.3], ["0%", "0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.15) setIsNumberTriggered(true);
  });

  useEffect(() => {
    if (scrollYProgress.get() >= 0.15) setIsNumberTriggered(true);
  }, [scrollYProgress]);

  const numberValue = parseInt(step.number, 10) || 0;
  const numFontSize = parseFontSize(numberFont);
  const numLH = Math.round(numFontSize * 0.93);
  const mobileNumSize = numFontSize * 0.7;
  const mobileNumLH = Math.round(mobileNumSize * 0.93);
  const mobileTitleSize = parseFontSize(titleFont) * 0.85;
  const imgAnim = getImageAnimation(imageAnimation);
  const rowLineOffset = MOBILE_DOT_CENTER - lineWidth / 2 - 30;
  const safeCornerRadius = Math.max(cornerRadius, lineWidth);
  const curveSize = safeCornerRadius * 2;
  const maskSize = safeCornerRadius;
  const curveLeftReversed = `calc(50% - ${curveSize - lineWidth}px)`;
  const maskLeftReversed = `calc(50% - ${maskSize - lineWidth}px)`;

  const radius = `${isFirst && !showDots ? lineWidth / 2 : 0}px ${isFirst && !showDots ? lineWidth / 2 : 0}px ${
    isLast && !showDots ? lineWidth / 2 : 0
  }px ${isLast && !showDots ? lineWidth / 2 : 0}px`;

  if (isMobile) {
    return (
      <motion.div ref={stepRef} style={{ position: "relative", padding: "24px 0 24px 20px", zIndex: 1 }}>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: rowLineOffset,
            width: lineWidth,
            backgroundColor: accentColor,
            height,
            borderRadius: radius,
          }}
        />
        <div>
          {step.image ? (
            <motion.img
              src={step.image}
              alt=""
              initial={imgAnim.initial}
              whileInView={imgAnim.whileInView}
              transition={imgAnim.transition}
              viewport={{ once: true, amount: 0.1 }}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 10",
                objectFit: "cover",
                borderRadius: imageRadius,
                display: "block",
                marginBottom: mobileImageGap,
              }}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                borderRadius: imageRadius,
                background: lineColor,
                marginBottom: mobileImageGap,
              }}
            />
          )}
          <StepCopy
            step={step}
            numberFont={{ ...numberFont, fontSize: mobileNumSize }}
            numberColor={numberColor}
            titleFont={{ ...titleFont, fontSize: mobileTitleSize }}
            titleColor={titleColor}
            textFont={textFont}
            textColor={textColor}
            numberTitleGap={numberTitleGap}
            titleTextGap={titleTextGap}
            isNumberTriggered={isNumberTriggered}
            setIsNumberTriggered={setIsNumberTriggered}
            numberValue={numberValue}
            numFontSize={mobileNumSize}
            numLH={mobileNumLH}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={stepRef}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        paddingTop: 50,
        paddingBottom: isLast ? 50 : 50 + lineWidth,
        gap: gridGap,
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isFirst ? (showDots ? dotSize / 2 : 0) : 0,
          bottom: isLast ? (showDots ? dotSize / 2 : 0) : 0,
          left: reversed ? "50%" : 0,
          width: lineWidth,
          backgroundColor: lineColor,
          borderRadius: radius,
        }}
      />
      {!isLast && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: reversed ? "auto" : 0,
            right: reversed ? "50%" : "auto",
            width: "50%",
            height: lineWidth,
            backgroundColor: lineColor,
          }}
        />
      )}
      {!isFirst && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            left: reversed ? maskLeftReversed : 0,
            top: -lineWidth,
            width: maskSize,
            height: maskSize,
            backgroundColor: cornerMaskColor,
          }}
        />
      )}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            left: reversed ? maskLeftReversed : 0,
            bottom: 0,
            width: maskSize,
            height: maskSize,
            backgroundColor: cornerMaskColor,
          }}
        />
      )}
      {!isFirst && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            top: -lineWidth,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: lineColor,
            transform: reversed ? "rotate(45deg)" : "rotate(-45deg)",
          }}
        />
      )}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            bottom: 0,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: lineColor,
            transform: reversed ? "rotate(135deg)" : "rotate(225deg)",
          }}
        />
      )}
      {!isFirst && (
        <motion.div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            top: -lineWidth,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: accentColor,
            transform: reversed ? "rotate(45deg)" : "rotate(-45deg)",
            opacity: opacityTop as unknown as number,
          }}
        />
      )}
      {!isLast && (
        <motion.div
          style={{
            position: "absolute",
            zIndex: 2,
            left: reversed ? curveLeftReversed : 0,
            bottom: 0,
            width: curveSize,
            height: curveSize,
            borderRadius: curveSize / 2,
            border: `${lineWidth}px solid transparent`,
            borderTopColor: accentColor,
            transform: reversed ? "rotate(135deg)" : "rotate(225deg)",
            opacity: opacityBottom as unknown as number,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: isFirst ? (showDots ? dotSize / 2 : 0) : 0,
          bottom: isLast ? (showDots ? dotSize / 2 : 0) : 0,
          left: reversed ? "50%" : 0,
          width: lineWidth,
          overflow: "hidden",
          borderRadius: radius,
        }}
      >
        <motion.div style={{ width: "100%", height, backgroundColor: accentColor }} />
      </div>
      {!isLast && (
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: reversed ? "auto" : 0,
            right: reversed ? "50%" : "auto",
            height: lineWidth,
            backgroundColor: accentColor,
            width,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: reversed ? "0 50px 0 0" : "0 0 0 50px",
          gridColumnStart: reversed ? 2 : "auto",
          gridRowStart: reversed ? 1 : "auto",
        }}
      >
        <StepCopy
          step={step}
          numberFont={numberFont}
          numberColor={numberColor}
          titleFont={titleFont}
          titleColor={titleColor}
          textFont={textFont}
          textColor={textColor}
          numberTitleGap={numberTitleGap}
          titleTextGap={titleTextGap}
          isNumberTriggered={isNumberTriggered}
          setIsNumberTriggered={setIsNumberTriggered}
          numberValue={numberValue}
          numFontSize={numFontSize}
          numLH={numLH}
        />
      </div>

      <div
        style={
          {
            position: "relative",
            zIndex: 3,
            gridColumnStart: reversed ? 1 : "auto",
            gridRowStart: reversed ? 1 : "auto",
          } as CSSProperties
        }
      >
        {step.image ? (
          step.href ? (
            <Link href={step.href} className="steps-flow-image-link" aria-label={step.title}>
              <motion.img
                src={step.image}
                alt=""
                initial={imgAnim.initial}
                whileInView={imgAnim.whileInView}
                transition={imgAnim.transition}
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16 / 10",
                  objectFit: "cover",
                  borderRadius: imageRadius,
                  display: "block",
                }}
                loading="lazy"
              />
            </Link>
          ) : (
            <motion.img
              src={step.image}
              alt=""
              initial={imgAnim.initial}
              whileInView={imgAnim.whileInView}
              transition={imgAnim.transition}
              viewport={{ once: true, amount: 0.2 }}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 10",
                objectFit: "cover",
                borderRadius: imageRadius,
                display: "block",
              }}
              loading="lazy"
            />
          )
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              borderRadius: imageRadius,
              background: lineColor,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
