import { showcase, subsidiaries } from "@/lib/data";

/** Curated image pool for InfiniteImageTunnel heroes (max 12 unique). */
export function getTunnelImages(): string[] {
  const fromShowcase = showcase.map((item) => item.image);
  const fromSubsidiaries = subsidiaries.flatMap((item) => item.images.slice(0, 2));
  const unique = Array.from(new Set([...fromShowcase, ...fromSubsidiaries]));
  return unique.slice(0, 12);
}
