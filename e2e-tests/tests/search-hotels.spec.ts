import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    // go to page
  await page.goto(UI_URL);

  //get the sign in and click on it
  await page.getByRole('link', { name: 'Sign In' }).click();

  // Expect a title "to contain" a substring Sign In.
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  //locate the email and fill it
  await page.locator('[name=email]').fill('1@1.com');

  //locate the password and fill it
  await page.locator('[name=password]').fill('password123');

  //click on the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect a title "to contain" a substring Sign in Successful.
  await expect(page.getByText('Sign in Successful')).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Belgrade");
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText("Hotels found in Belgrade")).toBeVisible();
  await expect(page.getByText("Air Serbia")).toBeVisible();

})

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Belgrade");
  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByText("Air Serbia").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole('button', { name: 'Book Now' })).toBeVisible();
})