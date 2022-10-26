// tests/common.js
const { test } = require("@playwright/test");
const { LoginPage, HomePage, FormPage } = require('../pages/pages');
const { data } = require('../resources/locators')
var chance = require("chance").Chance();
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

module.exports = {

  // common steps ----------------------------------------------

  LoadLoginData: async function (usertype, stepnum) {
    
    await test.step(`Step ${stepnum} - Load Data for user: ${usertype}`, async () => {

      const records = parse(
        fs.readFileSync(path.join(__dirname, "_input.csv")),
        { columns: true, skip_empty_lines: true }
      );

      let user_record = function (usertype) {
        let index = records.findIndex(function (item) {
          return item.UserType === usertype;
        });
        return records[index];
      };

      const record = user_record(usertype);

      // update data parameters based on user data
      data.UserType = record.UserType;
      data.UserName = record.UserName;
      data.Password = record.Password;

    });
  },

  GenerateRandomData: async function (stepnum) {

    await test.step(`Step ${stepnum} - Generate Random Data`, async () => {

      var userGender = chance.pickone(['Male', 'Female']);
      var userFullname = chance.name({ gender: userGender });
      var userEmail = chance.email();
      var userFavtool = chance.pickone(["Microfocus UFT One", "Selenium WebDriver", "Katalon Studio", "Microsoft Playwright",]);
      var userComment = chance.paragraph({ sentences: chance.integer({ min: 2, max: 5 }), });
      var userNewsletter = chance.pickone(["Yes", "No"]);

      data.UserFullname = userFullname;
      data.UserEmail = userEmail;
      data.UserNewsletter = userNewsletter;
      data.UserGender = userGender;
      data.UserFavtool = userFavtool;
      data.UserComment = userComment;

      console.log(`${userFullname}\n${userEmail}\n${userNewsletter}\n${userGender}\n${userFavtool}\n${userComment}`);
    });
  },

  LoadData: async function (usertype, stepnum) {
    await this.LoadLoginData(usertype, stepnum);
    await this.GenerateRandomData(stepnum);
  },

  LaunchApp: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Navigate to application`, async () => {
      const homePage = new HomePage(page);
      await homePage.navigateToHomePage();
      await homePage.validateHomePage();
    });
  },

  NavigateToLoginPage: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Navigate to Login Page`, async () => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateToLoginPage();
      await loginPage.validateLoginPage();
    });
  },

  LoginAs: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Login as ${data.UserType}`, async () => {
      const loginPage = new LoginPage(page);
      await loginPage.loginAs();
    });
  },

  ValidateValidLogin: async function (page, stepnum) {

    await test.step(`Step ${stepnum} - Validate Login, User: ${data.UserType}`, async () => {
      const loginPage = new LoginPage(page);
      await loginPage.validateValidUserLogin();
    });
  },

  ValidateInvalidLogin: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Validate Login, User: ${data.UserType}`, async () => {
      const loginPage = new LoginPage(page);
      await loginPage.validateInvalidUserLogin();
    });
  },

  Logout: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Logout`, async () => {
      const loginPage = new LoginPage(page);
      await loginPage.Logout();
      await loginPage.ValidateLogout();
    });

  },

  AddGuestbookEntry: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Submit New Guestbook entry`, async () => {
      const newGuestBookPage = new FormPage(page);
      await newGuestBookPage.submitGuestBookEntry();
    });

  },

  ValidateGuestBookEntry: async function (page, stepnum, section) {
    await test.step(`Step ${stepnum} - Validate Gestbook Entry`, async () => {
      const newGuestBookPage = new FormPage(page);
      await newGuestBookPage.validateInputData();
      await newGuestBookPage.validateGuestbookData();
    });

  },

  // reusable Tests --------------------------------------------------

  ValidUserLogin_Steps: async function (page, user) {
    await this.LoadData(user, 1);
    await this.LaunchApp(page, 2);
    await this.NavigateToLoginPage(page, 3);
    await this.LoginAs(page, 4);
    await this.ValidateValidLogin(page, 5)
    await this.AddGuestbookEntry(page, 6);
    await this.ValidateGuestBookEntry(page, 7)
    await this.Logout(page, 8)
  },

  InvalidUserLogin_Steps: async function (page, user) {
    await this.LoadData(user, 1);
    await this.LaunchApp(page, 2);
    await this.NavigateToLoginPage(page, 3);
    await this.LoginAs(page, 4);
    await this.ValidateInvalidLogin(page, 5)
  },

  // hooks ------------------------------------------

  RunBefore: async function ({ page }, testInfo) {
    console.log(` ------------ Running ${testInfo.title}\nStart Time: ${new Date()}`);

  },

  RunAfter: async function ({ page }, testInfo) {

    const tt = testInfo.title
    const ts = testInfo.status
    const td = (testInfo.duration * 0.001).toFixed(2)
    console.log(`----\nFinished ${tt} with status **${ts}** and ${td} seconds duration`);
    console.log(`End Time: ${new Date()}`)

  },

  //---------------------------------------------------------------------
  // templates ----------------------------------------------
  ReusableTemplate: async function (page, stepnum) {
    await test.step(`Step ${stepnum} - Step Description`, async () => {

    });

  },

}
