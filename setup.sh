#!/bin/bash

# Move 'public' directory one level up
mv frontend/public/ ./

# Move 'src' directory one level up
mv frontend/src/ ./

# Remove package-lock.json, package.json, old README.md, and node_modules folder
rm frontend/package-lock.json
rm frontend/package.json
rm frontend/README.old.md
rm -r frontend/node_modules/

# Create a new React app in the current directory
npx create-react-app frontend

# Remove newly created public and src folders in 'frontend'
rm -r frontend/public
rm -r frontend/src

# Move 'public' directory back into the project
mv public/ frontend/

# Move 'src' directory back into the project
mv src/ frontend/

# Remove newly created README.md file and replace it with the old one
rm frontend/README.md
mv frontend/README.old.md frontend/README.md

# Enter the frontend directory
cd frontend

# Install needed packages 
npm install bootstrap 
npm install react-bootstrap 
npm install react-router-dom
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

# Start the React application
npm start