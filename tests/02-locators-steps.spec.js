const { test, expect } = require("@playwright/test");
const { locators, data } = require("../resources/locators");

    test(`Login Tests - VERSION 02 - Basic Test with external locators + steps`, async ({ page }) => {
        await test.step(`Step 1 - Load Site Data for user: ADMIN`, async () => {
            data.UserType = 'ADMIN'
            data.UserName = 'admin@'
            data.Password = 'root'
        });

        await test.step(`Step 2 - Launch Application`, async () => {
            await page.goto(data.BaseUrl);
            await expect(page).toHaveTitle(data.HomePageTitle);
            await expect(page).toHaveURL(data.HomePageUrl);
            await expect(page.locator(locators.HomePageHeading)).toContainText(data.HomePageHeading);
        });

        await test.step(`Step 3 - Navigate to Login Page`, async () => {
            await page.locator(locators.LoginMenuItem).click();
            await expect(page).toHaveTitle(data.LoginPageTitle);
            await expect(page).toHaveURL(data.LoginPageUrl);
            await expect(page.locator(locators.LoginPageHeading)).toContainText(data.LoginPageHeading);
        });

        await test.step(`Step 4 - Login as ADMIN`, async () => {
            await page.fill(locators.UserNameInput, data.UserName);
            await page.fill(locators.PasswordInput, data.Password);
            await page.click(locators.SubmitButton);
        });

        await test.step(`Step 5 - Validate Login`, async () => {
            await expect(page.locator(locators.CurrentUserName)).toContainText(data.UserName);
            await expect(page.locator(locators.LogoutMenuItem)).toContainText(`${data.LoggedInMenuText} ${data.UserName}`);
            await expect(page).toHaveTitle(data.FormPageTitle);
            await expect(page).toHaveURL(data.FormPageUrl);
            await expect(page.locator(locators.FormPageHeading)).toContainText(data.FormPageHeading);
        });

        await test.step(`Step 6 - Logout`, async () => {
            await page.click(locators.LogoutMenuItem);
            await expect(page.locator(locators.LoginMenuItem)).toHaveText(data.LoggedOutMenuText);
        });
    });

