# Playwright Demo Project

Playwright Automated Testing Tool Demo Project
* Testing Login functionality on [Guestbook Demo App](https://testautomationpro.com/aut/) => tests/tests.spec.js

## Purpose: Playwright Functionality Demo
* Page Object Model (POM)
* Reusability with common steps
* Data Parameterization with external .csv file and mock data

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Visual Studio Code](https://code.visualstudio.com/)

### Verify installation
```
node -v
```
```
npm -v
```
```
code -v
```
#### Verification Examples (Command Prompt):
```
Microsoft Windows [Version 10.0.22000.856]
(c) Microsoft Corporation. All rights reserved.

C:\Users\[user]>node -v
v16.16.0

C:\Users\[user]>npm -v
8.11.0

C:\Users\[user]>code -v
1.70.2
e4503b30fc78200f846c62cf8091b76ff5547662
x64

```


## Project and dependancies Installation
```
git clone https://github.com/qaa-demo/playwright-demo.git
```
```
cd playwright-demo
```
```
npm install
```

# Run the tests
### Run all tests:
  ```
  npm test 
  ```
### Run individual test files:
  ```
  npm test tests.spec.js
  ```

By default test runs in **headless mode** . To see the browser during execution change to headed mode - update **playwight.config.js** file:
```
headless: false
```
By default execution trace is set to **retain on failure only** (trace is captured but deleted if the test passes):
```
trace: 'retain-on-failure'
```
To always capture and keep the last trace, update **playwight.config.js** file:
```
trace: 'on'
``` 
To always capture and keep execution video, update **playwight.config.js** file:
```
video: 'on'
``` 

### 

# Create new tests
## resources/locators.js
Add locators & Data
```
const locators = {
  HomePageHeading: "id=main-header",
  LoginPageHeading: "id=login-page-main-header",
  FormPageHeading: "id=sign-form-main-header",
}
```
```
const data = {
  HomePageHeading: "Home Page",
  LoginPageHeading: "Login",
  FormPageHeading: "Sign The Guestbook",
}
```


## pages/pages.js
Add New Page Class (if required or use existing)

```
class HomePage {

    constructor(page) {
      this.page = page;
    }

    async navigateToHomePage() {
      await this.page.goto(data.BaseUrl);
    }
  }
```
Add Methods
```

```

## tests/common.js
Add Common Steps
Add Reusable Step Components

## tests/tests.spec.js
Add New Tests 