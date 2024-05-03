<p align="center">
  <a href="http://washworld.dk/" target="blank"><img src="./washworld-logo.svg" alt="WashWorld Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

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
   NODE_ENV=development
   ```

   Replace `<your_postgres_username>`, `<your_postgres_password>`, `<your_database_name>` with your actual PostgreSQL credentials and `<your-secret>` with a secure secret.

   You can generate a secret by running the following command in your terminal:

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Start the PostgreSQL Docker container:**

   Ensure you have Docker and Docker Compose installed on your machine. Then, run the following command to start the PostgreSQL Docker container:

   ```bash
   docker-compose -p washworld-postgres up -d
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

WashWorld API is [MIT licensed](./LICENSE).
