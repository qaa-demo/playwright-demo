const { test } = require("@playwright/test");
const common = require("./common");

const user1 = 'ADMIN'
const user2 = 'USER'
const user3 = 'NOUSER'

test.describe('TEST SUITE 04 - Login Tests - VERSION 04 - Common Steps + Data', () => {

    test(`Test 1 - Login as : ADMIN`, async ({ page }) => {
        await common.LoadData(user1, 1);
        await common.LaunchApp(page, 2);
        await common.NavigateToLoginPage(page, 3);
        await common.LoginAs(page, 4);
        await common.ValidateValidLogin(page, 5)
        await common.Logout(page, 6)

    });

    test(`Test 2 - Login as : USER`, async ({ page }) => {
        await common.LoadData(user2, 1);
        await common.LaunchApp(page, 2);
        await common.NavigateToLoginPage(page, 3);
        await common.LoginAs(page, 4);
        await common.ValidateValidLogin(page, 5)
        await common.Logout(page, 6)

    });

    test(`Test 3 Login as : INVALID USER`, async ({ page }) => {
        await common.LoadData(user3, 1);
        await common.LaunchApp(page, 2);
        await common.NavigateToLoginPage(page, 3);
        await common.LoginAs(page, 4);
        await common.ValidateInvalidLogin(page, 5)
    });

});