import type { SubsidiaryDocument } from "./types";
import { businessCenterDocument } from "./business-center";
import { constructionDocument } from "./construction";
import { cyberControlDocument } from "./cyber-control";
import { icosiumDocument } from "./icosium";
import { stoneDocument } from "./stone";

const documents: Record<string, SubsidiaryDocument> = {
  "business-center": businessCenterDocument,
  construction: constructionDocument,
  "cyber-control": cyberControlDocument,
  icosium: icosiumDocument,
  stone: stoneDocument,
};

export function getSubsidiaryDocument(slug: string): SubsidiaryDocument | undefined {
  return documents[slug];
}

export type { SubsidiaryDocument, DocBlock, DocSection, DocText } from "./types";
export { docT, en } from "./types";
