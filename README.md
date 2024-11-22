# Class Tech Loan System
A web application designed to help faculty members track and lend out tech equipment for UMass Boston

## Overview
This project is a web application designed to help faculty members track and lend out tech equipment such as laptops, adapters, and other items.

## Technologies Used
- Node.js: Backend server
- Express.js: Web framework
- MongoDB: Database for storing user, item, and loan information
- Mongoose: ODM (Object Data Modeling) library for MongoDB
- Passport.js: User authentication
- Google OAuth 2.0: Used for login

## Sprints Overview
**Sprint 1: Setting Up the Project and Database**
- Set up the project structure: Created the basic project structure, installed necessary dependencies, and configured the Express server.
- Configured MongoDB: Connected the application to MongoDB using Mongoose.
- User Schema: Set up the UserModel to store user information, including name, Google ID, and cart.
- Item Schema: Set up the ItemModel to store items available for lending, including properties such as assetId, assetType, make, model, status, and more.

**Sprint 2: Google Authentication and Lending Functionality**
- Google Authentication: Implemented Google OAuth 2.0 using Passport.js to allow faculty members to log in.
- Session Handling: Set up session handling using express-session and connect-mongo to persist login sessions.

- Item CRUD Operations:
  - Add Item (POST /add-item): Add new items to the inventory.
  - Get All Items (GET /items): View all items available.
  - Update Item (PUT /update-item/:assetId): Update item details by assetId.
  - Delete Item (DELETE /delete-item/:assetId): Delete an item from the inventory.

- Loan Functionality:
  - Add Loan (POST /add-loan/): Loan an item to a user by adding it to the loan records.
  - View All Loans (GET /loaned-items/): View all loaned items.
  - Update Loan (PUT /update-loan/:itemId): Update loan details by itemId.
  - Delete Loan (DELETE /delete-loan/:itemId): Delete a loan record.

- Cart Functionality:
  - Add to Cart (POST /add-to-cart/:itemId): Add an item to the logged-in user's cart.
  - View Cart (GET /view-cart): View items in the logged-in user's cart.
  - Remove from Cart (DELETE /remove-from-cart/:itemId): Remove an item from the user's cart.
  - Checkout Cart (POST /checkout-cart): Checkout all items in the user's cart, create loan records, and update the item status to 'Assigned to Location'.
- Role-Based Access Control:
  - Middleware for Role Verification: Created middleware (requireRole and requireRoles) to restrict access based on user roles.
  - **Admin Role Only:**
    - Add Item (POST /add-item): Only users with the 'admin' role can add new items.
    - Update Item (PUT /update-item/:assetId) and Delete Item (DELETE /delete-item/:assetId : Only 'admin' users can modify or delete items.
    -**Staff and Admin Roles:**
      - View Loaned Items (GET /loaned-items/): Both 'staff' and 'admin' users can view all loaned items.
      - Add, Update, or Delete Loans: Staff or admin users can manage loan records.

## How to Run the Project

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud instance)
- Postman (optional, for testing API endpoints)

### Installation

Clone the repository:
```bash
git clone https://github.com/emiliootz/class-tech-loan.git
cd class-tech-loan
```
Install dependencies:
```bash
npm i express ejs passport passport-google-oauth20 bcrypt express-session connect-mongo mongoose save
npm install dotenv
```

### Environment Setup:
-Create a .env file in the root directory.
-Add the following environment variables:
```bash
GOOGLE_CLIENT_ID=<Your-Google-Client-ID>
GOOGLE_CLIENT_SECRET=<Your-Google-Client-Secret>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/callback
```
To start your application:
```bash
node app
```
## API Endpoints
### Authentication Endpoints
- GET /login: Render login page.
- GET /auth/google: Initiate Google authentication.
- GET /auth/callback: Handle Google callback and establish session.
- GET /logout: Log out the user and destroy session.

### Item Management Endpoints
- POST /add-item: Add a new item to the inventory.
- GET /items: Get all items in the inventory.
- PUT /update-item/: Update an item by assetId.
- DELETE /delete-item/: Delete an item by assetId.

### Loan Management Endpoints
- POST /add-loan/: Add a loan record for an item.
- GET /loaned-items/: View all loaned items.
- PUT /update-loan/: Update a loan record by itemId.
- DELETE /delete-loan/: Delete a loan record by itemId.

### Cart Functionality Endpoints
- POST /add-to-cart/: Add an item to the user's cart.
- GET /view-cart: View items in the user's cart.
- DELETE /remove-from-cart/: Remove an item from the user's cart.
- POST /checkout-cart: Checkout the user's cart and create loan records.

## Testing
### Using Postman
- Login via /login to create a session.
- Use the session cookie from your browser and add it to Postman to authenticate requests.
- Test each endpoint using the provided routes above.

## Example Requests
- Add Item (POST /add-item):
```bash
{
  "assetId": "12345",
  "assetType": "Laptop",
  "make": "Dell",
  "model": "XPS 13",
  "status": "Available"
}
```
- Add to Cart (POST /add-to-cart/:itemId): Ensure you are logged in and authenticated.

## Contributing
- Branch naming convention:
  - Backend: `backend-feature-name`
  - Frontend: `frontend-feature-name`
- Make a new branch when adding new features.
- Review code with teamates before requesting a Merge Request

