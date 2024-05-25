# Multi-Tenanted Role-Based Access Control System

This project is a multi-tenanted role-based access control system built with TypeScript, PostgreSQL, Fastify, and Drizzle ORM, utilizing pnpm for package management. This system includes features for creating applications, user registration and login, role creation, role assignment, and permission checks.

## Features

- **Create an Application**
- **Register a User for an Application**
- **Login**
- **Create a Role**
- **Assign a Role to a User**
- **Check User Permissions with a Guard**

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/biswojit65/LDP-Project-1.git
    cd LDP-Project-1
    ```

2. **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```

3. **Set up the database:**
    Ensure PostgreSQL is installed and running. Create a database for the application.

4. **Run database migrations:**
    ```bash
    pnpm migrate
    ```

## Configuration

1. **Environment Variables:**
    Create a `.env` file in the root directory and set the following variables:
    ```env
    DATABASE_CONNECTION=your_postgresql_database_url
    ```

2. **Configuring Drizzle ORM:**
    Adjust the Drizzle ORM configuration in the `drizzle.config.ts` file if needed.

## Usage

1. **Start the server:**
    ```bash
    pnpm start
    ```

2. **API Documentation:**
    You can use tools like Postman or VS Code Thunder Client to interact with the API endpoints listed below.

## Endpoints

### Applications

- **Create an Application**
    - **Method:** POST
    - **URL:** `http://{{host}}:{{port}}/userapi/applications`

    <br>
- **Get List of Created Applications**
    - **Method:** GET
    - **URL:** `http://{{host}}:{{port}}/userapi/applications`

### Users

- **Create a User for an Application**
    - **Method:** POST
    - **URL:** `http://{{host}}:{{port}}/userapi/users`

    <br>
- **Login a User for an Application**
    - **Method:** POST
    - **URL:** `http://{{host}}:{{port}}/userapi/users/login`

### Roles

- **Create a New Role for an Application**
    - **Method:** POST
    - **URL:** `http://{{host}}:{{port}}/userapi/roles`

    <br>
- **Assign a Role to a User**
    - **Method:** POST
    - **URL:** `http://{{host}}:{{port}}/userapi/users/roles`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


Happy coding!


 

