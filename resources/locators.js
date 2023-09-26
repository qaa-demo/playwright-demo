// resources/locators.js

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
  //---------------- captured during the run ------------------
  GuestbookName: '',
  GuestbookPostedOn: '',
  GuestbookFavtool: '',
  GuestbookComment: '',
};

const data = {

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
  //--------------------------------------------------------------------

  //----------- loaded from csv file -------------
  UserType: "",
  UserName: "",
  Password: "",
  //----------- randomly generated -----
  UserFullname: "",
  UserEmail: "",
  UserNewsletter: "",
  UserGender: "",
  UserFavtool: "",
  UserComment: "",
  //----------------
  EntryUniqueID: '',
  //----------------

};

module.exports = { locators, data };