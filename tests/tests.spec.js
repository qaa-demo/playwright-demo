const { test, expect } = require("@playwright/test");
const common = require("./common");
const { locators, data } = require("../resources/locators");
const { LoginPage, HomePage, FormPage } = require('../pages/pages');


test.beforeEach(async ({ page }, testInfo) => {
  await common.RunBefore({ page }, testInfo);
});

test.afterEach(async ({ page }, testInfo) => {
  await common.RunAfter({ page }, testInfo);
});


const user1 = 'ADMIN'
const user2 = 'USER'
const user3 = 'NOUSER'

// test.describe('Login Tests - VERSION 05 - Full Reusable Tests', () => {

//   test(`Login as : ${user1}`, async ({ page }) => {

//     await common.ValidUserLogin_Steps(page, user1);

//   });

  // test(`Login as : ${user2}`, async ({ page }) => {

  //   await common.ValidUserLogin_Steps(page, user2);

  // });

  // test(`Login as : ${user3}`, async ({ page }) => {

  //   await common.InvalidUserLogin_Steps(page, user3);

  // });
// });

test.describe('Login Tests - VERSION 04 - Basic Reusability', () => {

  test(`Login as : USER`, async ({ page }) => {

    await common.LoadData('USER', 1);
    await common.LaunchApp(page, 2);
    await common.NavigateToLoginPage(page, 3);
    await common.LoginAs(page, 4);
    await common.ValidateValidLogin(page, 5)
    await common.AddGuestbookEntry(page, 6);
    await common.ValidateGuestBookEntry(page, 7);
    await common.Logout(page, 8)

  });


});

// test.describe('Login Tests - VERSION 03 - Page Object Model + Data Parameters', () => {

//   test(`Login as: ADMIN`, async ({ page }) => {

//     await test.step(`Step 1 - Load Site Data for user: ADMIN`, async () => {
//       // ---------------------------- LOAD DATA  ----------------------------------

//       const fs = require('fs');
//       const path = require('path');
//       const { parse } = require('csv-parse/sync');

//       const records = parse(fs.readFileSync(path.join(__dirname, '_input.csv')), { columns: true, skip_empty_lines: true });

//       let user_record = function (user1) {
//         let index = records.findIndex(function (item) {
//           return item.UserType === user1;
//         });
//         return records[index]
//       }

//       const record = user_record(user1);

//       console.log(`User Data:`)
//       console.log(record)

//       // update data parameters based on user data

//       data.UserType = record.UserType
//       data.UserName = record.UserName
//       data.Password = record.Password

//     });

//     await test.step(`Step 2 - Launch Application`, async () => {
//       const homePage = new HomePage(page);
//       await homePage.navigateToHomePage()
//       await homePage.validateHomePage()
//     });

//     await test.step(`Step 3 - Navigate to Login Page`, async () => {
//       const loginPage = new LoginPage(page);
//       await loginPage.navigateToLoginPage();
//       await loginPage.validateLoginPage();
//     });

//     await test.step(`Step 4 - Login as ADMIN`, async () => {
//       const loginPage = new LoginPage(page);
//       await loginPage.loginAs();

//     });

//     await test.step(`Step 5 - Validate Login`, async () => {
//       const loginPage = new LoginPage(page);
//       await loginPage.validateValidUserLogin();
//     });


//     await test.step(`Step 6 - Submit New Guestbook entry`, async () => {
//       const newGuestBookPage = new FormPage(page);
//       await newGuestBookPage.submitGuestBookEntry();
//     });
  
//     await test.step(`Step 7 - Validate Gestbook Entry`, async () => {
//       const newGuestBookPage = new FormPage(page);
//       await newGuestBookPage.validateInputData();
//       await newGuestBookPage.validateGuestbookData();
//     });

//     await test.step(`Step 7 - Logout`, async () => {
//       const loginPage = new LoginPage(page);
//       await loginPage.Logout()
//       await loginPage.ValidateLogout();
//     });
//   });

//   test(`Login as : USER`, async ({ page }) => {
//     await common.LoadData('USER', 1);
//     await common.LaunchApp(page, 2);
//     await common.NavigateToLoginPage(page, 3);
//     await common.LoginAs(page, 4);
//     await common.ValidateValidLogin(page, 5)
//     await common.Logout(page, 6)

//   });

//   test(`Login as : ${user3}`, async ({ page }) => {
//     await common.InvalidUserLogin_Steps(page, user3);

//   });

// });

// test.describe('Login Tests - VERSION 02 - Basic Test with external locators + steps', () => {

//   test(`Login as : USER`, async ({ page }) => {

//     await test.step(`Step 1 - Load Site Data for user: ADMIN`, async () => {
//       data.UserType = 'ADMIN'
//       data.UserName = 'admin@'
//       data.Password = 'root'
//     });

//     await test.step(`Step 2 - Launch Application`, async () => {
//       await page.goto(data.BaseUrl);
//       await expect(page).toHaveTitle(data.HomePageTitle);
//       await expect(page).toHaveURL(data.HomePageUrl);
//       await expect(page.locator(locators.HomePageHeading)).toContainText(data.HomePageHeading);
//     });

//     await test.step(`Step 3 - Navigate to Login Page`, async () => {
//       await page.locator(locators.LoginMenuItem).click();
//       await expect(page).toHaveTitle(data.LoginPageTitle);
//       await expect(page).toHaveURL(data.LoginPageUrl);
//       await expect(page.locator(locators.LoginPageHeading)).toContainText(data.LoginPageHeading);
//     });

//     await test.step(`Step 4 - Login as ADMIN`, async () => {
//       await page.fill(locators.UserNameInput, data.UserName);
//       await page.fill(locators.PasswordInput, 'root');
//       await page.click(locators.SubmitButton);
//     });

//     await test.step(`Step 5 - Validate Login`, async () => {
//       await expect(page.locator(locators.CurrentUserName)).toContainText(data.UserName);
//       await expect(page.locator(locators.LogoutMenuItem)).toContainText(`${data.LoggedInMenuText} ${data.UserName}`);
//       await expect(page).toHaveTitle(data.FormPageTitle);
//       await expect(page).toHaveURL(data.FormPageUrl);
//       await expect(page.locator(locators.FormPageHeading)).toContainText(data.FormPageHeading);
//     });

//     await test.step(`Step 6 - Submit New Guestbook entry`, async () => {
//       await page.fill(locators.FullNameInput, data.FullName);
//       await page.fill(locators.EmailInput, data.Email);
//       if (data.Newsletter == "Yes") {
//         await page.click(locators.NewsletterCheckbox);
//       }
//       if (data.Gender == "Female") {
//         await page.locator(locators.GenderFemaleOption).check();
//       }
//       await page.selectOption(locators.FavtoolList, data.Favtool);
//       await page.fill(locators.CommentTextInput, data.CommentText);
//       await page.click(locators.SubmitButton);
//     });

//     await test.step(`Step 7 - Validate Gestbook Entry`, async () => {
//       await expect(page.locator(locators.TitleName)).toContainText(data.FullName);
//       const uniquID = await page.locator(locators.EntryUniqueID).innerText();
//       console.log(uniquID);
//       data.EntryUniqueID = uniquID;
//       await expect(page.locator(locators.FullNameValue)).toContainText(data.FullName)
//       await expect(page.locator(locators.EmailValue)).toContainText(data.Email);
//       await expect(page.locator(locators.NewsletterSelection)).toContainText(data.Newsletter);
//       await expect(page.locator(locators.GenderSelection)).toContainText(data.Gender.toLowerCase());
//       await expect(page.locator(locators.FavtoolSelection)).toContainText(data.Favtool);
//       await expect(page.locator(locators.CommentValue)).toContainText(data.CommentText.substring(0, 250));
      
//       await page.locator(locators.ViewGuestBookMenuItem).click();
//       await expect(page.locator("id=" + data.EntryUniqueID)).toBeVisible();
//     });


//     await test.step(`Step 8 - Logout`, async () => {
//       await page.click(locators.LogoutMenuItem);
//       await expect(page.locator(locators.LoginMenuItem)).toHaveText(data.LoggedOutMenuText);
//     });
//   });

// });

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
    await page.fill('id=txt_username', 'Demouser');
    await page.fill('id=txt_password', 'Demopass');
    await page.locator('id=btn_submit').click();
    await expect(page.locator('id=current_user_name')).toContainText('Demouser');
    await expect(page.locator("id=LogoutMenuItem")).toContainText(`Logout Demouser`);
    await expect(page).toHaveTitle('Sign the Guestbook - Guestbook Demo');
    await expect(page).toHaveURL('https://testautomationpro.com/aut/form.php');
    await expect(page.locator('id=sign-form-main-header')).toContainText('Sign The Guestbook');

    //---------------------
    await page.fill("id=txt_name", "Jane Doe");
    await page.fill("id=txt_email", "jane.d03@yahoo.com");
    await page.locator("id=chk_subscribe").click(); 
    await page.locator("id=rdb_genderFemale").check();
    await page.selectOption("id=cmb_favtool", "Microsoft Playwright");
    await page.fill("id=txt_comment", "Test Automation is awesome!");
    await page.locator("id=btn_submit").click();

    //------------------------
    await expect(page.locator("id=titlename")).toContainText("Jane Doe");
    const uniqueID = await page.locator("id=uniqueid").innerText();
    const postedOn = await page.locator("id=date").innerText();
    console.log(uniqueID)
    console.log(postedOn);
    await expect(page.locator("id=name")).toContainText("Jane Doe");
    await expect(page.locator("id=email")).toContainText("jane.d03@yahoo.com");
    await expect(page.locator("id=subscribe")).toContainText("Yes");
    await expect(page.locator("id=gender")).toContainText("female");
    await expect(page.locator("id=favtool")).toContainText("Microsoft Playwright");
    await expect(page.locator("id=comment")).toContainText("Test Automation is awesome!");
    //---------------------------
    await page.locator("id=GuestbookMenuItem").click();
    await expect(page.locator("id=" + uniqueID)).toBeVisible();
    await expect(page.locator('//div[@id="' + uniqueID + '"]//span[@id="name"]')).toContainText("Jane Doe");
    await expect(page.locator('//div[@id="' + uniqueID + '"]//span[@id="postedon"]')).toContainText(postedOn);
    await expect(page.locator('//div[@id="' + uniqueID + '"]//span[@id="favtool"]')).toContainText("Microsoft Playwright");
    await expect(page.locator('//div[@id="' + uniqueID + '"]//div[@id="comment"]')).toContainText("Test Automation is awesome!");

    //---------------------

    await page.locator('id=LogoutMenuItem').click();
    await expect(page.locator('id=LoginMenuItem')).toHaveText('Login');

  });

});
