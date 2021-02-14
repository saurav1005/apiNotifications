# Notifications API

This project repo is used as Notification API in order to send emails initiated by front-end channel or any other backend channels.The backend API connects to Primary Service provider. If the primary service provider throws any 5xx errors and failure threshhold is crossed then the service is switched to secondary service provider for sending out the email notifications.
Assumptions: Design is rigid with the first iteration to expect Email inputs in Arrays only. Single fields with String type will be supported in later iterations

**Table of Contents**

- [Install](#install)
- [Env Configuration](#envconfig)
- [Run](#run)
- [Tests](#tests)
- [Deployment](#deployment)
- [Test URL](#test-url)

# Development

## Install

Install node dependencies with:

```sh
npm install
```

## Env Configuration

A .sample-env file has been checked in. Create .env to inject environment variables with required values as per your configuration settings specifically for prod environment.
For local testing - modify the /config/index.js file to provide the alternate values for environment variables

## Run

Script below to run for local testing with hard-coded environment properties in config/index.js.

Run in watch mode

```sh
npm run start:dev
```

Run in normal mode

```sh
npm start
```

For prod create .env file with required config as in .sample-env

```sh
npm run start:prod
```
CURL for local testing. The providers use sandbox environment thus only author's email id works in this environment.
```sh
curl --location --request POST 'http://localhost:8000/api/v1/notifications/email' \
--header 'Content-Type: application/json' \
--data-raw '{
"to": ["saurav1005@gmail.com"],
"cc": [ "saurav1005@gmail.com"],
"subject": "This is test",
"text": "This is amazing"
}'
```

## Tests

Script below to run for local testing.

```sh
npm run test
```

For coverage run the script below

```sh
npm run coverage
```

## Deployment

This sample app uses Dockerfile for container based hosting of the microservice. Use below commands for running the app locally on Docker in Linux or Docker Desktop for Windows

#### Build Docker Image

```sh
docker build -t <App-NAME> .
```

#### Run Docker Image. Create .env file with required variables and pass to the docker run command

```sh
docker run -p <Exposed-port>:<App-Port> --env-file .env <App-NAME>
```

### Hosting on Azure (or any other cloud)

Azure App Service web app docker container has been used to host this application. Push the docker image to Azure Container Registry or DockerHub. Create the Azure Web App with Docker container (single for development purpose) and provide reference to the image.
Configure the WEBSITES_PORT if not 80 to expose the same in App Service.

## Test URL

Use below curl command to test the application.

```sh
curl --location --request POST 'https://notificationspocapi.azurewebsites.net/api/v1/notifications/email' \
--header 'Content-Type: application/json' \
--data-raw '{
"to": ["saurav1005@gmail.com"],
"cc": [ "saurav1005@gmail.com"],
"subject": "This is test",
"text": "This is a test email"
}'
```

## TODO

- SendGrid Service Integration and Testing - Account Validation Pending
- Tests to complete code coverage to minimum 80% for other services, logger files
- Service Abstraction with HealthCheck API (need to revalidate with service provider)
- Move code for sendGridService and mailGunService to monorepos for creating separate adaptor libraries as reusable assets for other apps
- Use of moment library for custom date logging for the framework. Configure file based logging
- Other scripts for pre-commit hooks configuration like eslint config and prettier
- Deploy code to Azure/other cloud with multi-container hosting for HA and performance. Pipeline creation for build and release.
