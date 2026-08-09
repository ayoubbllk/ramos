import { describe, expect, it } from "vitest";
import { getSubsidiary, subsidiaries, t } from "./data";

describe("subsidiary content", () => {
  it("provides the complete group portfolio", () => {
    expect(subsidiaries).toHaveLength(6);
    expect(new Set(subsidiaries.map((item) => item.slug)).size).toBe(6);
  });

  it("provides bilingual content and a hero video for every subsidiary", () => {
    for (const subsidiary of subsidiaries) {
      expect(t(subsidiary.tagline, "fr")).not.toBe("");
      expect(t(subsidiary.tagline, "en")).not.toBe("");
      expect(subsidiary.video).toMatch(/\.mp4$/);
      expect(subsidiary.services.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("uses every available gallery asset set", () => {
    expect(getSubsidiary("business-center")?.images).toHaveLength(34);
    expect(getSubsidiary("cyber-control")?.images).toHaveLength(4);
    expect(getSubsidiary("icosium")?.images).toHaveLength(13);
    expect(getSubsidiary("stone")?.images).toHaveLength(32);
    expect(getSubsidiary("cargo")?.images).toHaveLength(6);
  });

  it("returns undefined for an unknown subsidiary", () => {
    expect(getSubsidiary("unknown")).toBeUndefined();
  });
});
