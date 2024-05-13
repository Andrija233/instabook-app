import { test, expect } from '@playwright/test';
import path from 'path';

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

test("should allow user to add a hotel", async ({ page }) => {
    // go to add hotel page
    await page.goto(`${UI_URL}add-hotel`);

    // fill the name field
    await page.locator('[name=name]').fill("test_hotel");
    // fill the city field
    await page.locator('[name=city]').fill("test_city");
    // fill the country field
    await page.locator('[name=country]').fill("test_country");
    // fill the description field 
    await page.locator('[name=description]').fill("This is a description for test_hotel");
    // fill the price per night
    await page.locator('[name=pricePerNight]').fill("100");
    // fill the select fields named starRating
    await page.selectOption('select[name=starRating]', "5");
    // select the hotel type
    await page.getByText("Budget").click();
    // select the facilities
    await page.getByLabel("Spa").check();
    await page.getByLabel("Non-Smoking Rooms").check();
    await page.getByLabel("Parking").check();
    // fill the adultCount
    await page.locator('[name=adultCount]').fill("2");
    //fill the childCount
    await page.locator('[name=childCount]').fill("1");

    // add images to the hotel
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg")
    ]);

    // click on the save button
    await page.getByRole('button', { name: 'Save' }).click();

    // expect Hotel saved successfully
    await expect(page.getByText('Hotel saved successfully')).toBeVisible();
})

test("shoudl display hotels" , async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    // Expect a title "to contain" a substring Sign In.
    await expect(page.getByRole('heading', { name: 'My Hotels' })).toBeVisible();

    //expect a hotel name to be visible
    await expect(page.getByText('Air Serbia')).toBeVisible();

    // expect a hotel description to be visible
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();

    // expect a hotel city and country to be visible
    await expect(page.getByText('Belgrade, Serbia')).toBeVisible();
    
    //expect a hotel type to be visible
    await expect(page.getByText('All Inclusive')).toBeVisible();

    //expect a hotel price to be visible
    await expect(page.getByText('119$ per night')).toBeVisible();

    // expect a adults and children count to be visible
    await expect(page.getByText('2 adults, 3 children')).toBeVisible();

    // expect a star rating to be visible
    await expect(page.getByText('2 Star Rating')).toBeVisible();

    //expect view details button to be visible
    await expect(page.getByRole('link', { name: 'View Details' }).first()).toBeVisible();

    //expect a add hotel buttton to be visible
    await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
})