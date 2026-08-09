import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*.mp4", (route) => route.abort());
});

test("homepage presents the group and its six subsidiaries", async ({ page }) => {
  await page.goto("/fr", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("héritage");
  await expect(page.locator(".subsidiary-row")).toHaveCount(6);
  await expect(page.getByRole("link", { name: "Switch to English" })).toBeVisible();
});

test("language switch preserves the current route", async ({ page }) => {
  await page.goto("/fr/a-propos", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/a-propos$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("story");
});

test("subsidiary page uses video and every matching image", async ({ page }) => {
  await page.goto("/fr/filiales/stone", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".subsidiary-hero video")).toBeVisible();
  await expect(page.getByRole("button", { name: "Lire la vidéo" })).toBeVisible();
  await expect(page.locator(".gallery-item")).toHaveCount(32);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ramos Stone");
});

test("mobile menu exposes the primary navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only interaction");
  await page.goto("/fr", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await expect(page.locator(".mobile-nav")).toBeVisible();
  await expect(page.locator(".mobile-nav").getByText("Filiales")).toBeVisible();
});
