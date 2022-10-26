const { test } = require("@playwright/test");
const { LoginPage, HomePage } = require('../pages/pages');
const { data } = require("../resources/locators");

    test(`Test 1 - Login as: ADMIN`, async ({ page }) => {
  
      await test.step(`Step 1 - Load Site Data for user: ADMIN`, async () => {
        data.UserType = 'ADMIN'
        data.UserName = 'admin@'
        data.Password = 'root'
      });

      await test.step(`Step 2 - Launch Application`, async () => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage()
        await homePage.validateHomePage()
      });

      await test.step(`Step 3 - Navigate to Login Page`, async () => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.validateLoginPage();
      });

      await test.step(`Step 4 - Login as ADMIN`, async () => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAs();
      });

      await test.step(`Step 5 - Validate Login`, async () => {
        const loginPage = new LoginPage(page);
        await loginPage.validateValidUserLogin();
      });

      await test.step(`Step 6 - Logout`, async () => {
        const loginPage = new LoginPage(page);
        await loginPage.Logout()
        await loginPage.ValidateLogout();
      });
    });
