import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*.mp4", (route) => route.abort());
});

test("homepage presents the group and its subsidiaries", async ({ page }) => {
  await page.goto("/fr", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ramos Group");
  await expect(page.getByRole("button", { name: "Langue" })).toBeVisible();
});

test("language switch preserves the current route", async ({ page }) => {
  await page.goto("/fr/a-propos", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Langue" }).click();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/a-propos$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("german and italian locales resolve", async ({ page }) => {
  await page.goto("/de", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.goto("/it/filiales", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
});

test("subsidiary page uses video and gallery assets", async ({ page }) => {
  await page.goto("/fr/filiales/stone", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".subsidiary-hero video")).toBeVisible();
  await expect(page.getByRole("button", { name: "Lire la vidéo" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ramos Stone");
});

test("cargo subsidiary shows the full name", async ({ page }) => {
  await page.goto("/fr/filiales/cargo", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ramos Cargo Logistique");
});

test("mobile menu exposes the primary navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only interaction");
  await page.goto("/fr", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await expect(page.locator(".bouncy-nav-drawer")).toBeVisible();
  await expect(page.locator(".bouncy-nav-drawer").getByText("Filiales")).toBeVisible();
});
