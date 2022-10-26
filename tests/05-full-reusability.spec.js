const { test } = require("@playwright/test");
const common = require("./common");

const user1 = 'ADMIN'
const user2 = 'USER'
const user3 = 'NOUSER'

test.describe('TEST SUITE 05 - Login Tests - VERSION 05 - Full Reusable Tests', () => {

    // ADMIN
    test(`Login as : ${user1}`, async ({ page }) => {
        await common.ValidUserLogin_Steps(page, user1);
    });

    // Valid USER
    test(`Login as : ${user2}`, async ({ page }) => {
        await common.ValidUserLogin_Steps(page, user2);
    });

    // Invalid USER
    test(`Login as : ${user3}`, async ({ page }) => {
        await common.InvalidUserLogin_Steps(page, user3);
    });
});