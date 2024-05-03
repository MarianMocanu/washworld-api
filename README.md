<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# WashWorld API

Welcome to the WashWorld API repository! This API is designed to provide seamless integration between WashWorld's internal systems and external applications. It offers a comprehensive set of endpoints for managing WashWorld's operations efficiently.

## Features

- **Integration**: Connect WashWorld's internal systems with external applications seamlessly.
- **Efficiency**: Streamline operations and automate tasks to enhance productivity.
- **Scalability**: Built on the NestJS framework, ensuring scalability and maintainability.
- **Security**: Implement secure authentication and access control measures to protect sensitive data.

## Setup

To set up this project locally, please follow these steps:

1. **Clone the repository to your local machine:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd <project_directory>
   ```

3. **Create a .env file in the root directory of the project with the following content:**

   ```env
   JWT_SECRET=<your-secret>
   DB_HOST=localhost
   DB_PORT=5432
   POSTGRES_USER=<your_postgres_username>
   POSTGRES_PASSWORD=<your_postgres_password>
   POSTGRES_DB=<your_database_name>
   ```

   Replace `<your_postgres_username>`, `<your_postgres_password>`, `<your_database_name>` with your actual PostgreSQL credentials and `<your-secret>` with a secure secret.

   You can generate a secret by running the following command in your terminal:

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Start the PostgreSQL Docker container:**

   Ensure you have Docker and Docker Compose installed on your machine. Then, run the following command to start the PostgreSQL Docker container:

   ```bash
   docker-compose -p cbs-postgresql up -d
   ```

   This command will start a Docker container with PostgreSQL using the settings defined in your `docker-compose.yml` file.

## Running Migrations & Seeds

To run migrations and set up your database schema, follow these steps:

1. **Install dependencies by running:**

   ```bash
   npm install
   ```

2. **Run the migrations:**

   ```bash
   npm run db:migrate
   ```

   This command will execute all pending migrations and apply changes to your database schema.

3. **Run the seeds:**

   ```bash
   npm run db:seed
   ```

   This command will insert the initial data needed for testing purposes as well as an admin user.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Nest is [MIT licensed](LICENSE).

```

```
