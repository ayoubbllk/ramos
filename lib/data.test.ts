import { describe, expect, it } from "vitest";
import { getSubsidiary, subsidiaries, t } from "./data";

describe("subsidiary content", () => {
  it("provides the complete group portfolio in the client order", () => {
    expect(subsidiaries.map((item) => item.slug)).toEqual([
      "ramos-group",
      "business-center",
      "stone",
      "construction",
      "icosium",
      "cargo",
      "cyber-control",
    ]);
    expect(new Set(subsidiaries.map((item) => item.slug)).size).toBe(subsidiaries.length);
  });

  it("uses the validated display names", () => {
    expect(getSubsidiary("icosium")?.name).toBe("Ecosium Global Network");
    expect(getSubsidiary("cargo")?.name).toBe("Ramos Cargo Logistique");
    expect(getSubsidiary("cyber-control")?.name).toBe("Cyber Control");
    expect(getSubsidiary("ramos-group")?.name).toBe("Ramos Group");
    expect(subsidiaries.filter((item) => item.name === "Ramos Construction")).toHaveLength(1);
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
    expect(getSubsidiary("stone")?.images).toHaveLength(37);
    expect(getSubsidiary("cargo")?.images).toHaveLength(6);
  });

  it("keeps the marble lion fully featured for Ramos Stone", () => {
    const images = getSubsidiary("stone")?.images ?? [];
    const lion = images.find((src) => src.includes("DECOUPE ET SCULTURE/RAMOS STONE IMAGE 4"));
    expect(lion).toBeTruthy();
    expect(getSubsidiary("stone")?.imageFitHints?.[lion!]).toBe("contain");
    expect(images[0]).toContain("PHOTO USINE RAMOS STONE");
  });

  it("returns undefined for an unknown subsidiary", () => {
    expect(getSubsidiary("unknown")).toBeUndefined();
  });
});
