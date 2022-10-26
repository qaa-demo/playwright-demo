const { test, expect } = require("@playwright/test");

  test(`Login Test - VERSION 01 - Basic, Hardcoded data`, async ({ page }) => {
    // Navigate to Home Page
    await page.goto('https://testautomationpro.com/aut/');
    await expect(page).toHaveTitle('Home - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/');
    await expect(page.locator('id=main-header')).toContainText('Guestbook Demo');

    // Navigate Login Page
    await page.locator('id=LoginMenuItem').click();
    await expect(page).toHaveTitle('Login - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/login.php');
    await expect(page.locator('id=login-page-main-header')).toContainText('Login');

    // Login
    await page.fill('id=txt_username', 'Demouser');
    await page.fill('id=txt_password', 'Demopass');
    await page.locator('id=btn_submit').click();

    // Validate Login
    await expect(page.locator('id=current_user_name')).toContainText('Demouser');
    await expect(page.locator("id=LogoutMenuItem")).toContainText(`Logout Demouser`);
    await expect(page).toHaveTitle('Sign the Guestbook - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/form.php');
    await expect(page.locator('id=sign-form-main-header')).toContainText('Sign The Guestbook');

    // Logout
    await page.locator('id=LogoutMenuItem').click();

    // Validate Logout
    await expect(page.locator('id=LoginMenuItem')).toHaveText('Login');
    await expect(page.locator('id=LogoutMenuItem')).not.toBeVisible();
    await expect(page.locator('id=current_user_name')).not.toBeVisible();
  });
