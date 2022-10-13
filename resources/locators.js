
  
  const locators = {
    HomePageHeading: 'id=main-header',
    LoginPageHeading: 'id=login-page-main-header',
    FormPageHeading: 'id=sign-form-main-header',
    GuestbookHeading: 'id=guestbook-main-header',
    //--------------------------------
    LoginMenuItem: 'id=LoginMenuItem',
    LogoutMenuItem: 'id=LogoutMenuItem',
    SignGuestBookMenuItem: 'id=SignTheGuestbookMenuItem',
    CurrentUserName: 'id=current_user_name',
    //---------------------------------
    UserNameInput: 'id=txt_username',
    PasswordInput: 'id=txt_password',
    SubmitButton: 'id=btn_submit',
    ErrorMessage: 'id=errormsg',
    //--------------------------------
    FullNameInput:'id=txt_name',
    EmailInput:'id=txt_email',
    SubscribeCheckbox:'id=chk_subscribe',
    GenderMaleRadio:'id=rdb_genderMale',
    GenderFemaleRadio:'id=rdb_genderFemale',
    FavtoolList:'id=cmb_favtool',
    OptionKS:'id=optn_favtool_ks',
    OptionPW:'id=optn_favtool_pw',
    OptionSWD:'id=optn_favtool_swd',
    OptionUFT:'id=optn_favtool_uft',
    CommentTextInput:'id=txt_comment',
    SubmitCommentButton:'id=btn_submit',
  };
  
  const data = {
    //---------------
    UserType: '',
    UserName: '',
    Password: '',
    //----------------
    FullName:'',
    Email:'',
    Subscribe:'',
    Gender:'',
    Favtool:'',
    CommentText:'',
    //----------------
    AppName: "Guestbook Demo",
    BaseUrl: global.BASE_URL,
    //----------------
    HomePageUrl: global.BASE_URL,
    HomePageTitle: "Home - Guestbook Demo",
    HomePageHeading: 'Guestbook Demo',
    //----------------
    LoginPageUrl: global.BASE_URL + "login.php",
    LoginPageTitle: "Login - Guestbook Demo",
    LoginPageHeading: 'Login',
    LoggedInMenuText: 'Logout',
    LoggedOutMenuText: 'Login',
    //-----------------
    FormPageUrl: global.BASE_URL + "form.php",
    FormPageTitle: "Sign the Guestbook - Guestbook Demo",
    FormPageHeading: 'Sign The Guestbook',
    //------------------
    GuestbookHeading: 'Guestbook',
    //------------------
    LoginErrorMsg: "Login unsuccessful, check the user name and password!",
    //------------------
  
  };

  module.exports = { locators, data };