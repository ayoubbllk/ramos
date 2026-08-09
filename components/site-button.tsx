"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export type SiteButtonVariant = "action" | "nova" | "origin";
export type SiteButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  variant?: SiteButtonVariant;
  size?: SiteButtonSize;
  className?: string;
  fullWidth?: boolean;
  "aria-label"?: string;
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
};

type LinkButtonProps = SharedProps & {
  href: string;
  type?: never;
  disabled?: never;
};

type NativeButtonProps = SharedProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export type SiteButtonProps = LinkButtonProps | NativeButtonProps;

const ARROW =
  "M10.653 7.875H0V6.125h10.653L5.753 1.225 7 0l7 7-7 7-1.247-1.225L10.653 7.875Z";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function ActionInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="sb-action-label">{children}</span>
      <span className="sb-action-icon" aria-hidden>
        <svg viewBox="0 0 14 14">
          <path d={ARROW} fill="currentColor" />
        </svg>
      </span>
    </>
  );
}

function NovaInner({
  children,
  rootRef,
}: {
  children: ReactNode;
  rootRef: React.RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let frame = 0;
    let rotation = 0;
    let last = performance.now();
    const tick = (time: number) => {
      const delta = (time - last) / 1000;
      last = time;
      rotation = (rotation + delta * 120) % 360;
      el.style.setProperty("--nova-glow-rotation", `${rotation}deg`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rootRef]);

  return (
    <>
      <span aria-hidden className="sb-nova-edge" />
      <span aria-hidden className="sb-nova-glow" />
      <span aria-hidden className="sb-nova-shine" />
      <span className="sb-nova-label">{children}</span>
    </>
  );
}

function OriginInner({
  children,
  cursor,
  scale,
}: {
  children: ReactNode;
  cursor: { x: number; y: number };
  scale: ReturnType<typeof useSpring>;
}) {
  const eased = useTransform(scale, [0, 1], [0, 1], { ease: (t) => t * t });

  return (
    <>
      <motion.span
        aria-hidden
        className="sb-origin-circle"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: 520,
          height: 520,
          scale: eased,
        }}
      />
      <span className="sb-origin-label">{children}</span>
    </>
  );
}

export function SiteButton(props: SiteButtonProps) {
  const {
    children,
    variant = "action",
    size = "md",
    className,
    fullWidth,
    onClick,
    onPointerDown,
    "aria-label": ariaLabel,
  } = props;

  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const rootRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const scale = useMotionValue(0);
  const smoothScale = useSpring(scale, {
    stiffness: 85,
    damping: 18,
    restDelta: 0.001,
  });

  const onEnter = (e: ReactMouseEvent<HTMLElement>) => {
    setHovered(true);
    if (variant !== "origin" || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    startTransition(() => {
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    });
    scale.set(1);
  };

  const onLeave = (e: ReactMouseEvent<HTMLElement>) => {
    if (variant === "origin" && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      startTransition(() => {
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      });
      scale.set(0);
    }
    startTransition(() => setHovered(false));
  };

  const classes = cx(
    "site-btn",
    `site-btn--${variant}`,
    `site-btn--${size}`,
    fullWidth && "site-btn--full",
    hovered && "is-hovered",
    className,
  );

  const style: CSSProperties | undefined =
    variant === "nova" ? { ["--nova-glow-rotation" as string]: "42deg" } : undefined;

  const content =
    variant === "action" ? (
      <ActionInner>{children}</ActionInner>
    ) : variant === "nova" ? (
      <NovaInner rootRef={rootRef}>{children}</NovaInner>
    ) : (
      <OriginInner cursor={cursor} scale={smoothScale}>
        {children}
      </OriginInner>
    );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        onPointerDown={onPointerDown}
        ref={rootRef as React.RefObject<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      className={classes}
      style={style}
      aria-label={ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      onPointerDown={onPointerDown}
      ref={rootRef as React.RefObject<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
