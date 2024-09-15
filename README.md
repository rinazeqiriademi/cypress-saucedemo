# Cypress Automated Tests for SauceDemo App of Sauce Labs

This project contains tests written using [Cypress](https://www.cypress.io/) designed to test the functionality of the [Sample Web App](https://github.com/saucelabs/sample-app-web) ([SauceDemo](https://www.saucedemo.com/)) running in a Docker container.

## Project Overview

This project automates the testing of the Sample Web App. The Sample Web App must be running before executing the tests. I have forked the Sample Web App and created a branch on my copy at https://github.com/rinazeqiriademi/saucedemo/tree/adjust-dockerfile-for-automated-tests, where I have adjusted the Dockerfile in order to run the application locally and then the tests against it. Cypress is used for testing interactions with the web app’s user interface and checking the core functionalities.

## Prerequisites

To run these tests, you will need the following:
- [Node.js](https://nodejs.org/) installed.
- [Docker](https://docs.docker.com/get-docker/) installed (if you will run the Sample Web App in a Docker container).
- [Cypress](https://www.cypress.io/)
- The [Sample Web App](https://github.com/saucelabs/sample-app-web) running.

## Setting Up the Sample Web App

Before running Cypress tests, you need to have the Sample Web App running locally in a Docker container.

### Start the Docker Container

1. Clone my forked copy of Sample Web App from https://github.com/rinazeqiriademi/saucedemo/tree/adjust-dockerfile-for-automated-tests
2. Navigate to the cloned directory 
    ```bash
    cd saucedemo
   ```
3. Checkout branch 
   ```bash 
   git checkout adjust-dockerfile-for-automated-tests
   ```
   
4. Build the Docker Image by running the following command in the root directory of the project, where the Dockerfile is located:
   ```bash
   docker build -t saucedemo .
   ```
5. Run the Docker Container:
   ```bash
   docker run -p 3000:3000 saucedemo
   ```
   The application will start inside the Docker container and can be accessed at http://localhost:3000.

## Setting Up the Cypress Tests

### Install dependencies
In the root directory where you have cloned this repository, run:

```bash
   npm install
 ```
### Run Cypress tests: 
You can run Cypress tests in either interactive or headless mode:

- To run Cypress in the interactive mode:

```bash
   npx cypress open
```
- To run Cypress tests in headless mode:
```bash
   npx cypress run
 ```

### Project Structure
- **cypress/e2e/**: This is where the test files are located.
- **cypress/fixtures/**: Contains test data files used by the tests.
- **cypress/support/**: Contains utility functions or commands that support the tests.