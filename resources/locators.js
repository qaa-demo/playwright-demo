// Load Chance
var chance = require("chance").Chance();

const locators = {
  HomePageHeading: "id=main-header",
  LoginPageHeading: "id=login-page-main-header",
  FormPageHeading: "id=sign-form-main-header",
  GuestbookHeading: "id=guestbook-main-header",
  //--------------------------------
  LoginMenuItem: "id=LoginMenuItem",
  LogoutMenuItem: "id=LogoutMenuItem",
  SignGuestBookMenuItem: "id=SignTheGuestbookMenuItem",
  ViewGuestBookMenuItem: "id=GuestbookMenuItem",
  CurrentUserName: "id=current_user_name",
  //---------------------------------
  UserNameInput: "id=txt_username",
  PasswordInput: "id=txt_password",
  SubmitButton: "id=btn_submit",
  ErrorMessage: "id=errormsg",
  //--------------------------------
  FullNameInput: "id=txt_name",
  EmailInput: "id=txt_email",
  NewsletterCheckbox: "id=chk_subscribe",
  GenderMaleOption: "id=rdb_genderMale",
  GenderFemaleOption: "id=rdb_genderFemale",
  FavtoolList: "id=cmb_favtool",
  CommentTextInput: "id=txt_comment",
  SubmitCommentButton: "id=btn_submit",
  //---------------------------------
  TitleName: "id=titlename",
  EntryUniqueID: "id=uniqueid",
  FullNameValue: "id=name",
  EmailValue: "id=email",
  NewsletterSelection: "id=subscribe",
  GenderSelection: "id=gender",
  FavtoolSelection: "id=favtool",
  CommentValue: "id=comment",
  //----------------------------------
  GuestbookName: '',
  GuestbookPostedOn: '',
  GuestbookFavtool: '',
  GuestbookComment: '',
};

const data = {
  //---------------
  UserType: "",
  UserName: "",
  Password: "",
  //----------- randomly assigned, see below -----
  FullName: "",
  Email: "",
  Newsletter: "",
  Gender: "",
  Favtool: "",
  CommentText: "",
  //----------------
  EntryUniqueID: '',
  //----------------
  AppName: "Guestbook Demo",
  BaseUrl: global.BASE_URL,
  //----------------
  HomePageUrl: global.BASE_URL,
  HomePageTitle: "Home - Guestbook Demo",
  HomePageHeading: "Guestbook Demo",
  //----------------
  LoginPageUrl: global.BASE_URL + "login.php",
  LoginPageTitle: "Login - Guestbook Demo",
  LoginPageHeading: "Login",
  LoggedInMenuText: "Logout",
  LoggedOutMenuText: "Login",
  //-----------------
  FormPageUrl: global.BASE_URL + "form.php",
  FormPageTitle: "Sign the Guestbook - Guestbook Demo",
  FormPageHeading: "Sign The Guestbook",
  //------------------
  GuestbookHeading: "Guestbook",
  //------------------
  LoginErrorMsg: "Login unsuccessful, check the user name and password!",
  //------------------
};

module.exports = { locators, data};

// ------------------------- generate random data
// var gndr = chance.gender();
var gndr = chance.pickone(['Male', 'Female']);
var fullName = chance.name({ gender: gndr });
var fName = fullName.split(" ").shift();
var lName = fullName.split(" ").pop();
var userName = ( fullName.substring(0, 13) + chance.integer({ min: 11, max: 99 })).toLowerCase().replace(" ", "");
var freeDomain = chance.pickone(["alpha.com", "bravo.net", "charlie.org", "delta.biz", "echo.ca", "favicon.dev", "gmail.com", "hotmail.com", "yahoo.com",]);
var userEmail = `${userName}@${freeDomain}`;
var favTool = chance.pickone(["Microfocus UFT One", "Selenium WebDriver", "Katalon Studio", "Microsoft Playwright",]);
var commentText = chance.paragraph({
  sentences: chance.integer({ min: 2, max: 5 }),
});
var NewsLetter = chance.pickone(["Yes", "No"]);

console.log(
  `${fullName}\n${userEmail}\n${NewsLetter}\n${gndr}\n${favTool}\n${commentText}`
);

data.FullName = fullName;
data.Email = userEmail;
data.Newsletter = NewsLetter;
data.Gender = gndr;
data.Favtool = favTool;
data.CommentText = commentText;
