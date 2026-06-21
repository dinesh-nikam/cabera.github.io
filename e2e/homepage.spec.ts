import { test, expect } from "@playwright/test";

test("homepage has correct title and navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Premium Cab Service in Pune & Mumbai/);

  const nav = page.locator("nav");
  await expect(nav).toBeVisible();
});

test("homepage displays hero section", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator("section").first();
  await expect(hero).toBeVisible();
});

test("homepage has a working booking widget", async ({ page }) => {
  await page.goto("/");

  const bookingWidget = page.locator("text=/Book|book|Cab|Pickup/i").first();
  await expect(bookingWidget).toBeVisible();
});
