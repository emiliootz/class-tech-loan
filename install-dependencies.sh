#!/bin/bash

echo "Starting installation of dependencies for the project..."

# Install essential dependencies
echo "Installing essential dependencies..."
npm i express ejs passport passport-google-oauth20 express-session connect-mongo mongoose save

# Optional: Install dotenv for environment variable management
echo "Installing dotenv for environment variables..."
npm install dotenv

echo "All dependencies have been installed successfully!"

# Instructions for running the application
echo "To start your application, run:"
echo "node app.js"

echo "Installation complete. Happy coding!"
