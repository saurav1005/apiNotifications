# Notifications API

This project repo is used as Notification API in order to send emails initiated by front-end channel or any other backend channels.The backend API connects to Primary Service provider. If the primary service provider throws any 5xx errors and failure threshhold is crossed then the service is switched to secondary service provider for sending out the email notifications.

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

A .sample-env file has been checked in. Create .env to inject environment variables with correct values as per your configuration settings specifically for prod environment.
For local testing - modify the /config/index.js file to provide the alternate values for environment variables

## Run

Script below to run for local testing with changes in /config/index.js

```sh
npm start
```

For prod create .env file with required config as in .sample-env

```sh
npm start:prod
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

## Test URL

## TODO

- SendGrid Service Integration and Testing
- Use of moment library for proper custom logging for the framework. Configure file based logging
- Tests to complete code coverage to minimum 80% for other services, logger files
- Service Abstraction with HealthCheck API (need to revalidate with service provider)
- Deploy code to Azure/other cloud
