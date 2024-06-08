Express.js App with SQLite and Additional Helper Functions

This Node.js project is a boilerplate for building web applications using Express.js and SQLite, equipped with additional helper functions to accelerate your prototyping process. Whether you're a seasoned developer or just getting started, this project provides a solid foundation for creating web applications with minimal setup.
Getting Started


Project Structure

The project structure:

    /db-viewer: A simple web-based SQLite database viewer.

    /helpers: Helper functions and utility modules to streamline development.
      /helpers/automaticRouting.js: Automatically loads all routes from the /routes folder.
      /helpers/cleanup.js: Cleans up the database connection and closes the app.
      /helpers/crud-generator.js: Generates CRUD routes for a given model.
      /helpers/db-seeder.js: Seeds the database with sample data.
      /helpers/object-mapper.js: Maps an model object to a database table.

    /objects: Model objects for your web application. //TODO: rename to models
      /objects/Example.js: An example model object.

    /routes: Define your application's routes here.

    app.js: The main application file where you configure middleware and set up the Express app.

Additional Helper Functions

This boilerplate project includes a set of helper functions designed to make your development process smoother:

    Database Setup: Easily configure and initialize SQLite for your project.

    Middleware: Commonly used middleware functions are pre-configured, such as body parsing and error handling.

    Routing: Basic routing setup with sample routes to get you started quickly.

    Error Handling: Standardized error handling to ensure graceful failure.

    Logging: Integrated logging functionality for better debugging.

Usage

You can extend this project to build your web application by adding more routes, controllers, and models as needed. The additional helper functions and pre-configured setup should save you valuable time during the development process.
Contributing

Feel free to contribute to this project by submitting issues or pull requests. I welcome any enhancements, bug fixes, or feature additions that can benefit the community.
License

This project is licensed under the MIT License


--Author: Jakub Szatybelko