# Playwright Demo Project

Playwright Automated Testing Tool Demo Project
* Testing Login functionality on [Guestbook Demo App](https://testautomationpro.com/aut/) => tests/guestbook.spec.js

## Purpose: Playwright Functionality Demo
* Page Object Model (POM)
* Reusability with common steps
* Data Parameterization with external .csv file

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Visual Studio Code](https://code.visualstudio.com/)


## Installation
```
git clone https://github.com/kiseta/pw-demo.git
```
```
cd pw-demo
```
```
npm install
```

### Verify installation (should show version if installed i.e. v16.16.0 )
```
node -v
```
```
npm -v
```
```
code -v
```
### Example (Command Prompt):
```
Microsoft Windows [Version 10.0.22000.856]
(c) Microsoft Corporation. All rights reserved.

C:\Users\[user.name]>node -v
v16.16.0

C:\Users\[user.name]>npm -v
8.11.0

C:\Users\[user.name]>code -v
1.70.2
e4503b30fc78200f846c62cf8091b76ff5547662
x64

```

# Run the tests
### Run all tests:
  ```
  npm test 
  ```
### Run individual site tests:
  ```
  npm test test.spec.js
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
To always capture and execution video, update **playwight.config.js** file:
```
video: 'on'
``` 

### 

# Create new tests
## resources/locators.js
Add locators & Data

## pages/pages.js
Add New Page Class (if required or use existing)
Add Methods

## tests/common.js
Add Common Steps
Add Reusable Step Components

## tests/tests.spec.js
Add New Tests if required