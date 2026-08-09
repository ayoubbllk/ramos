import type { CSSProperties } from "react";

export type TunnelImage = string | { src?: string; srcSet?: string; alt?: string };

export type InfiniteImageTunnelProps = {
  images?: TunnelImage[];
  startText?: string;
  showStartButton?: boolean;
  autoStart?: boolean;
  animationSpeed?: number;
  pauseOnHover?: boolean;
  clickToToggle?: boolean;
  mouseParallax?: boolean;
  reducedMotion?: boolean;
  perspective?: number;
  tunnelDepth?: number;
  backgroundColor?: string;
  showGrid?: boolean;
  gridColor?: string;
  gridOpacity?: number;
  gridThickness?: number;
  tileGap?: number;
  imageTileScale?: number;
  style?: CSSProperties;
};

declare function InfiniteImageTunnel(props: InfiniteImageTunnelProps): JSX.Element;
export default InfiniteImageTunnel;
