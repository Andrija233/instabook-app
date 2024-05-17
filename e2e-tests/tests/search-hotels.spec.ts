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

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Belgrade");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Air Serbia").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost: $357.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/29");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("21000");

  await page.getByRole("button", { name: "Confirm & Pay" }).click();
  await expect(page.getByText("Booking successful")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Air Serbia")).toBeVisible();
});