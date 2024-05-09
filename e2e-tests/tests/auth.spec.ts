import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow the user to sign in', async ({ page }) => {
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

  // expect a titles MyBookings, My Hotels, and Sign out to be visible
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test("should allow user to register" , async ({ page }) => {

  // create a test email
  const testEmail = `test_register${Math.floor(Math.random() * 90000) + 10000}@test.com`;

  // go to page
  await page.goto(UI_URL);

  //get the sign in and click on it
  await page.getByRole('link', { name: 'Sign In' }).click();

  //get the create an account and click on it
  await page.getByRole('link', { name: 'Create an account here' }).click();

  // Expect a title "to contain" a substring Create an account.
  await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();

  // locate the first name and fill it
  await page.locator('[name=firstName]').fill('test_firstName');

  // locate the last name and fill it
  await page.locator('[name=lastName]').fill('test_lastName');

  // locate the email and fill it
  await page.locator('[name=email]').fill(testEmail);

  // locate the password and fill it
  await page.locator('[name=password]').fill('password123');

  // locate the confirm password and fill it
  await page.locator('[name=confirmPassword]').fill('password123');

  // click on the Create Account button
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Expect a title "to contain" a substring Account created successfully.
  await expect(page.getByText('Account created successfully')).toBeVisible();

  // expect a titles MyBookings, My Hotels, and Sign out to be visible
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();

});

