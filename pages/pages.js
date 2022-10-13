const { test, expect } = require("@playwright/test");
const { locators, data } = require("../resources/locators");

class HomePage {

  constructor(page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto(data.BaseUrl);
  }

  async validateSiteTitle() {
    await expect(this.page).toHaveTitle(data.HomePageTitle);
  }

  async validateHomePageURL() {
    await expect(this.page).toHaveURL(data.HomePageUrl);
  }

  async validateHomePageTitle() {
    await expect(this.page.locator(locators.HomePageHeading)).toContainText(data.HomePageHeading);
  }

  async validateHomePage() {
    await this.validateSiteTitle()
    await this.validateHomePageURL()
    await this.validateHomePageTitle()
  }
}

class LoginPage {

  constructor(page) {
    this.page = page;
    this.formPage = new FormPage(page);
  }


  async navigateToLoginPage() {
    await this.page.locator(locators.LoginMenuItem).click();
  }

  async validateSiteTitle() {
    await expect(this.page).toHaveTitle(data.LoginPageTitle);
  }

  async validatePageURL() {
    await expect(this.page).toHaveURL(data.LoginPageUrl);
  }

  async validateLoginPageTitle() {
    await expect(this.page.locator(locators.LoginPageHeading)).toContainText(data.LoginPageHeading);
  }

  async validateLoginPage() {
    await this.validateSiteTitle()
    await this.validatePageURL()
    await this.validateLoginPageTitle()
  }

  async enterUserName() {
    await this.page.fill(locators.UserNameInput, data.UserName);
  }

  async enterPassword() {
    await this.page.fill(locators.PasswordInput, data.Password);
  }

  async clickSubmitButton() {
    await this.page.click(locators.SubmitButton);
  }

  async loginAs() {
    await this.enterUserName();
    await this.enterPassword();
    await this.clickSubmitButton();
  }

  async validateValidUserLogin() {
    await expect(this.page.locator(locators.CurrentUserName)).toContainText(data.UserName);
    await expect(this.page.locator(locators.LogoutMenuItem)).toContainText(`${data.LoggedInMenuText} ${data.UserName}`);
    await this.formPage.validateFormPage()

  }

  async validateInvalidUserLogin() {
    await expect(this.page.locator(locators.ErrorMessage)).toContainText(data.LoginErrorMsg);
    await this.validateLoginPageTitle()
    await this.formPage.validatePageURL()
    await this.validateSiteTitle()

  }

  async ClickLogoutMenuItem() {
    await this.page.click(locators.LogoutMenuItem);
  }

  async ValidateLogout() {
    await expect(this.page.locator(locators.LoginMenuItem)).toHaveText(data.LoggedOutMenuText);
  }

  async Logout() {

    await this.ClickLogoutMenuItem()
    await this.ValidateLogout()

  }
}

class FormPage {

  constructor(page) {
    this.page = page;
  }

  async navigateToFormPage() {
    await this.page.locator(locators.SignGuestBookMenuItem).click();
  }

  async validateSiteTitle() {
    await expect(this.page).toHaveTitle(data.FormPageTitle);
  }

  async validatePageURL() {
    await expect(this.page).toHaveURL(data.FormPageUrl);
  }

  async validateFormPageTitle() {
    await expect(this.page.locator(locators.FormPageHeading)).toContainText(data.FormPageHeading);
  }

  async validateFormPage() {
    await this.validateSiteTitle()
    await this.validatePageURL()
    await this.validateFormPageTitle()
  }

  
}


module.exports = { HomePage, LoginPage, FormPage };
