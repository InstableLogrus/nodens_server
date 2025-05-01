
# Nodens

Gestion de demande d'emploi

stocke les demandes dans une DB MondoDB (pour changer facilement le schema)


# incorporé dans l'API

fausses données: https://github.com/faker-js/faker
doc: swagger https://swagger.io/ (a compléter)
logger: morgan
cli: commander



# TODO

## incorporer dotenvx 
https://github.com/dotenvx/dotenvx -> dotenv mais chiffré

## liaison linkeding 
utilisant leur API our un web scraper






-------------------------------------------------------------------------------------------

# Node.js MongoDB Boilerplate 
origine --> https://github.com/saniaali224/node-mongo-swagger-awss3-boilerplate

This is a boilerplate for building a Node.js API with MongoDB, using modern ES modules and a clean architecture. It includes basic setup for environment variables, database connection, API routing, and Swagger documentation.

## Features

- **Express.js**: Fast and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database integration using Mongoose.
- **ES Modules**: Modern JavaScript features using ES6+ syntax.
- **Environment Variables**: Configuration with `.env` files.
- **Swagger UI**: API documentation with Swagger.
- **Nodemon**: Automatic server restarting for development.
- **Prettier & ESLint**: Code formatting and linting using Airbnb's style guide.

## Folder Structure

.
├── config
│ └── swaggerConfig.js # Swagger configuration
├── connection
│ └── connect.js # MongoDB connection setup
├── controller # Controllers for handling business logic
├── Models # Mongoose models
├── node_modules
├── Routes # API routes
├── .env # Environment variables (gitignored)
├── .env-sample # Sample environment file
├── .eslintrc.json # ESLint configuration
├── .gitignore # Files and directories to ignore in Git
├── .prettierrc # Prettier configuration
├── api.http # HTTP requests for testing
├── app.js # Main application entry point
├── index.js # Index file to start the server
├── package.json # Project dependencies and scripts
├── swagger.yml # Swagger documentation in YAML
└── vercel.json # Vercel deployment configuration

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 18.x or later) and MongoDB running on your local machine or accessible via a cloud service like MongoDB Atlas.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/node-mongo-boilerplate.git
   cd node-mongo-boilerplate

   Install dependencies:
   ```

bash

npm install

Set up environment variables:

Copy the .env-sample to .env and fill in the necessary environment variables.

bash

cp .env-sample .env

Update the .env file with your MongoDB URI and any other required variables:

plaintext

    DB_URI=mongodb://localhost:27017/your-db-name
    PORT=5000
    JWT_SECRET=your_jwt_secret

Running the Application
nodemon
