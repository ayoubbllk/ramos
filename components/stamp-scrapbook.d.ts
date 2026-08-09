import type { CSSProperties } from "react";

export type StampImage = {
  src: string;
  srcSet?: string;
  alt?: string;
};

export type StampItem = {
  image?: StampImage;
  title?: string;
  caption?: string;
  description?: string;
};

export type StampFontStyle = {
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string;
  textAlign?: CSSProperties["textAlign"];
};

export type StampScrapbookProps = {
  stamps?: StampItem[];
  stampHeight?: number;
  spread?: number;
  tilt?: number;
  autoRotate?: boolean;
  speed?: number;
  cursorSteer?: boolean;
  hoverSpeed?: number;
  scrollTilt?: boolean;
  scrollTiltStrength?: number;
  stampShadow?: boolean;
  panelColor?: string;
  backdropColor?: string;
  titleColor?: string;
  textColor?: string;
  accentColor?: string;
  sealUrl?: string;
  sealMonogram?: string;
  titleFont?: StampFontStyle;
  captionFont?: StampFontStyle;
  bodyFont?: StampFontStyle;
  messageFont?: StampFontStyle;
  style?: CSSProperties;
};

declare function StampScrapbook(props: StampScrapbookProps): JSX.Element;
export default StampScrapbook;
