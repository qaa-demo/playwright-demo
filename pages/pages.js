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
    await expect(this.page.locator(locators.FormPageHeading)).toContainText(
      data.FormPageHeading
    );
  }

  async validateFormPage() {
    await this.validateSiteTitle();
    await this.validatePageURL();
    await this.validateFormPageTitle();
  }

  async enterFullName() {
    await this.page.fill(locators.FullNameInput, data.FullName);
  }

  async enterEmail() {
    await this.page.fill(locators.EmailInput, data.Email);
  }

  async selectNewsletterCheckbox() {
    if (data.Newsletter == "Yes") {
      await this.page.click(locators.NewsletterCheckbox);
    }
  }

  async selectGenderOption() {
    if (data.Gender == "Female") {
      await this.page.locator(locators.GenderFemaleOption).check();
    }
  }

  async selectFavoriteToolList() {
    await this.page.selectOption(locators.FavtoolList, data.Favtool);
  }

  async enterComment() {
    await this.page.fill(locators.CommentTextInput, data.CommentText);
  }

  async clickSubmitButton() {
    await this.page.click(locators.SubmitButton);
  }

  async captureNewEntryID(){
    const uniqueID = await this.page.locator(locators.EntryUniqueID).innerText();
    console.log(uniqueID);
    data.EntryUniqueID = uniqueID;

    //dynamically populate locators based on unique ID

    locators.GuestbookName = `//div[@id="${uniqueID}"]//span[@id="name"]`;
    locators.GuestbookPostedOn = `//div[@id="${uniqueID}"]//span[@id="postedon"]`;
    locators.GuestbookFavtool = `//div[@id="${uniqueID}"]//span[@id="favtool"]`;
    locators.GuestbookComment =`//div[@id="${uniqueID}"]//div[@id="comment"]`;

  }

  async submitGuestBookEntry() {
    await this.enterFullName();
    await this.enterEmail();
    await this.selectNewsletterCheckbox();
    await this.selectGenderOption();
    await this.selectFavoriteToolList();
    await this.enterComment();
    await this.clickSubmitButton();
    await this.captureNewEntryID();
  }

  async validateTitleName() {
    await expect(this.page.locator(locators.TitleName)).toContainText(data.FullName);
  }

  async validateFullName() {
    await expect(this.page.locator(locators.FullNameValue)).toContainText(data.FullName);
  }

  async validateEmail() {
    await expect(this.page.locator(locators.EmailValue)).toContainText(data.Email);
  }

  async validateNewsletter() {
    await expect(this.page.locator(locators.NewsletterSelection)).toContainText(data.Newsletter);
  }

  async validateGender() {
    await expect(this.page.locator(locators.GenderSelection)).toContainText(data.Gender.toLowerCase()
    );
  }

  async validateFavoriteTool() {
    await expect(this.page.locator(locators.FavtoolSelection)).toContainText(data.Favtool);
  }

  async validateComment() {
    await expect(this.page.locator(locators.CommentValue)).toContainText(data.CommentText.substring(0, 250));
  }

  async navigateViewGuestBook(){
    await this.page.locator(locators.ViewGuestBookMenuItem).click();
  }

  async validateGuestbookName() {
    await expect(this.page.locator(locators.GuestbookName)).toContainText(data.FullName);
  }

  async validateGuestbookEmail() {
    
  }

  async validateGuestbookFavoriteTool() {
    await expect(this.page.locator(locators.GuestbookFavtool)).toContainText(data.Favtool);
  }

  async validateGuestbookComment() {
    await expect(this.page.locator(locators.GuestbookComment)).toContainText(data.CommentText.substring(0, 250));
  }

  async validateInputData() {
    await this.validateTitleName();
    await this.validateFullName();
    await this.validateEmail();
    await this.validateNewsletter();
    await this.validateGender();
    await this.validateFavoriteTool();
    await this.validateComment();
  }

  async validateGuestbookData(){
    await this.navigateViewGuestBook();
    await this.validateGuestbookName();
    await this.validateGuestbookFavoriteTool();
    await this.validateGuestbookComment();
  }
}


module.exports = { HomePage, LoginPage, FormPage };
