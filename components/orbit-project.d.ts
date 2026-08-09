import type { CSSProperties } from "react";

export type OrbitProjectItem = {
  image?: string;
  label?: string;
  link?: string | { url?: string; href?: string; link?: string; path?: string };
};

export type OrbitFontStyle = {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: string;
  textAlign?: CSSProperties["textAlign"];
};

export type OrbitProjectProps = {
  items?: OrbitProjectItem[];
  background?: string;
  content?: {
    showCopy?: boolean;
    textColor?: string;
    leftTitle?: string;
    rightTitle?: string;
    desktopTitleFont?: OrbitFontStyle;
    compactTitleFont?: OrbitFontStyle;
    titleCenterGap?: number;
    centerText?: string;
    centerTextWidth?: number;
    compactTextGap?: number;
    desktopCenterFont?: OrbitFontStyle;
    tabletCenterFont?: OrbitFontStyle;
    mobileCenterFont?: OrbitFontStyle;
    compactTextColor?: string;
  };
  cards?: {
    background?: string;
    radius?: number;
    aspect?: number;
    imageFit?: "cover" | "contain";
    depthOpacity?: number;
    depthScale?: number;
    renderQuality?: number;
    labelColor?: string;
    labelFont?: OrbitFontStyle;
  };
  motion?: {
    scrollLength?: number;
    startOffset?: number;
    smoothness?: number;
    perspective?: number;
    curveWidth?: number;
    curveHeight?: number;
    depth?: number;
    rotation?: number;
    cardWidth?: number;
    offsetY?: number;
  };
  grid?: {
    columns?: number;
    gap?: number;
    maxWidth?: number;
    positionY?: number;
  };
  responsive?: {
    desktopBreakpoint?: number;
    mobileBreakpoint?: number;
    tabletColumns?: number;
    mobileColumns?: number;
    tabletPadding?: string;
    mobilePadding?: string;
    gap?: number;
    headerGap?: number;
  };
  canvas?: {
    layout?: "desktop" | "tablet" | "mobile";
    progress?: number;
  };
  style?: CSSProperties;
};

declare function OrbitProjects(props: OrbitProjectProps): JSX.Element;
export default OrbitProjects;
