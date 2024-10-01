# Cards Server

## Description
Cards Server is a REST API for managing card data. It provides endpoints for creating, retrieving, updating, and deleting card and user information.

## Installation

1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
   cd cards-server

3. Install the dependencies:
   npm install

## Environment Variables
Create a `.env` file in the root of your project and include the following variables:

ATLAS_CONNECTION_STRING=<your_mongodb_connection_string>  
JWT_SECRET=<your_jwt_secret>  
PORT=<optional_port_number>  # Defaults to 8181 if not specified

## API Documentation
- User API Documentation: [Postman Documentation for Users](https://documenter.getpostman.com/view/37787169/2sAXxJha9E)
- Card API Documentation: [Postman Documentation for Cards](https://documenter.getpostman.com/view/37787169/2sAXxJha9E)

## Usage

To start the server in development mode, run:  
npm run dev

For production mode, use:  
npm start

## Scripts

- **start**: Runs the application in production mode.
- **dev**: Runs the application in development mode with `nodemon`.
- **test**: Placeholder for running tests.

## Dependencies

The project uses the following dependencies:
- `bcryptjs`: For hashing passwords.
- `chalk`: For terminal string styling.
- `config`: For configuration management.
- `cors`: For enabling Cross-Origin Resource Sharing.
- `cross-env`: For setting environment variables across platforms.
- `dotenv`: For loading environment variables from a `.env` file.
- `express`: For building the RESTful API.
- `joi`: For validating request data.
- `jsonwebtoken`: For JWT-based authentication.
- `lodash`: For utility functions.
- `mongoose`: For MongoDB object modeling.
- `morgan`: For logging HTTP requests.
