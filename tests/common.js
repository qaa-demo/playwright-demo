// tests/common.js
const { test } = require("@playwright/test");
const { LoginPage, HomePage, FormPage } = require('../pages/pages');
const { data  } = require('../resources/locators')

module.exports = {

    // reusable components

    LoadData: async function (usertype, stepnum) {
          await test.step(`Step ${stepnum} - Load Site Data for user: ${usertype}`, async () => {
            // console.log(`**Step ${stepnum}`)

            // ---------------------------- LOAD DATA  ----------------------------------

            const fs = require("fs");
            const path = require("path");
            const { parse } = require("csv-parse/sync");

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

            console.log(`User Data:`);
            console.log(record);

            // update data parameters based on user data
            data.UserType = record.UserType;
            data.UserName = record.UserName;
            data.Password = record.Password;
          });
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

    ValidUserLogin_Steps: async function (page, user){
      await this.LoadData(user, 1);
      await this.LaunchApp(page, 2);
      await this.NavigateToLoginPage(page, 3);
      await this.LoginAs(page, 4);
      await this.ValidateValidLogin(page, 5)
      await this.AddGuestbookEntry(page, 6);
      await this.ValidateGuestBookEntry(page, 7)
      await this.Logout(page, 8)
    },

    InvalidUserLogin_Steps: async function (page, user){
      await this.LoadData(user, 1);
      await this.LaunchApp(page, 2);
      await this.NavigateToLoginPage(page, 3);
      await this.LoginAs(page, 4);
      await this.ValidateInvalidLogin(page, 5)

    },

    // ----------------------------------------------------------

    RunBefore: async function ({page}, testInfo) {
        console.log(` ------------ Running ${testInfo.title}\nStart Time: ${new Date()}`);
          
    },

    RunAfter: async function ({page}, testInfo) {

        const tt = testInfo.title
        const ts = testInfo.status
        const td = (testInfo.duration * 0.001).toFixed(2)
        console.log(`----\nFinished ${tt} with status **${ts}** and ${td} seconds duration`);
        console.log(`End Time: ${new Date()}`)

    },

    ReusableTemplate: async function (page, stepnum) {
        await test.step(`Step ${stepnum} - Step Desctiption`, async () => {

        });

    },

}
