const { test, expect } = require("@playwright/test");
const common = require("./common");
const { locators, data } = require("../resources/locators");
const { LoginPage, HomePage, FormPage } = require('../pages/pages');

// const users = ["ADMIN", "USER", "NOUSER"];
// const users = ['ADMIN', 'USER']


test.beforeEach(async ({ page }, testInfo) => {
  await common.RunBefore({ page }, testInfo);
});

test.afterEach(async ({ page }, testInfo) => {
  await common.RunAfter({ page }, testInfo);
});


const user1 = 'ADMIN'
const user2 = 'USER'
const user3 = 'NOUSER'

test.describe('Login Tests - VERSION 05 - Full Reusable Tests', () => {

  test(`Login as : ${user1}`, async ({ page }) => {

    await common.ValidUserLogin_Steps(page, user1);

  });

  test(`Login as : ${user2}`, async ({ page }) => {

    await common.ValidUserLogin_Steps(page, user2);

  });

  test(`Login as : ${user3}`, async ({ page }) => {

    await common.InvalidUserLogin_Steps(page, user3);

  });
});

test.describe('Login Tests - VERSION 04 - Basic Reusability', () => {

  test(`Login as : USER`, async ({ page }) => {

    await common.LoadData('USER', 1);
    await common.LaunchApp(page, 2);
    await common.NavigateToLoginPage(page, 3);
    await common.LoginAs(page, 4);
    await common.ValidateValidLogin(page, 5)
    await common.Logout(page, 6)

  });


});

test.describe('Login Tests - VERSION 03 - Page Object Model + Data Parameters', () => {

  test(`Login as: ADMIN`, async ({ page }) => {

    await test.step(`Step 1 - Load Site Data for user: ADMIN`, async () => {
      // ---------------------------- LOAD DATA  ----------------------------------

      const fs = require('fs');
      const path = require('path');
      const { parse } = require('csv-parse/sync');

      const records = parse(fs.readFileSync(path.join(__dirname, '_input.csv')), { columns: true, skip_empty_lines: true });

      let user_record = function (user1) {
        let index = records.findIndex(function (item) {
          return item.UserType === user1;
        });
        return records[index]
      }

      const record = user_record(user1);

      console.log(`User Data:`)
      console.log(record)

      // update data parameters based on user data

      data.UserType = record.UserType
      data.UserName = record.UserName
      data.Password = record.Password

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

  test(`Login as : USER`, async ({ page }) => {
    await common.LoadData('USER', 1);
    await common.LaunchApp(page, 2);
    await common.NavigateToLoginPage(page, 3);
    await common.LoginAs(page, 4);
    await common.ValidateValidLogin(page, 5)
    await common.Logout(page, 6)

  });

  test(`Login as : ${user3}`, async ({ page }) => {
    await common.InvalidUserLogin_Steps(page, user3);

  });

});

test.describe('Login Tests - VERSION 02 - Basic Test with external locators + steps', () => {

  test(`Login as : USER`, async ({ page }) => {

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
      await page.fill(locators.PasswordInput, 'root');
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

});

test.describe('Login Tests - VERSION 01 - Basic Test with inline locators', () => {

  test(`Login as : USER`, async ({ page }) => {

    await page.goto('https://testautomationpro.com/aut/');
    await expect(page).toHaveTitle('Home - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/');
    await expect(page.locator('id=main-header')).toContainText('Guestbook Demo');
    await page.locator('id=LoginMenuItem').click();
    await expect(page).toHaveTitle('Login - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/login.php');
    await expect(page.locator('id=login-page-main-header')).toContainText('Login');
    await page.fill('id=txt_username', 'admin@');
    await page.fill('id=txt_password', 'root');
    await page.locator('id=btn_submit').click();
    await expect(page.locator('id=current_user_name')).toContainText('admin@');
    await expect(page.locator(locators.LogoutMenuItem)).toContainText(`Logout admin@`);
    await expect(page).toHaveTitle('Sign the Guestbook - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/form.php');
    await expect(page.locator('id=sign-form-main-header')).toContainText('Sign The Guestbook');
    await page.locator('id=LogoutMenuItem').click();
    await expect(page.locator('id=LoginMenuItem')).toHaveText('Login');

  });

});