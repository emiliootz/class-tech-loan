/**
 * @file 404.jsx
 * @description Renders a custom 404 error page for handling non-existent routes in the application.
 *              Displays a message to inform users that the page does not exist and provides a button
 *              to navigate back to the home page.
 * @module NotFoundPage
 */

const React = require("react");
const Navbar = require("./components/Navbar"); // Importing the Navbar component.
const { HomeButton } = require("./components/Buttons"); // Importing the Home Button component.

/**
 * NotFoundPage Component
 *
 * This functional component renders a 404 error page when a user navigates to an invalid route.
 * It includes:
 *  - A Navbar
 *  - A large "404" error message
 *  - A message indicating the page does not exist
 *  - A button to return to the home page
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in (affects navbar rendering)
 * @param {number} props.cartCount - The number of items in the cart (used in navbar)
 * @param {boolean} [props.isAdmin=false] - Determines if the user has admin privileges
 * @param {boolean} [props.isStaff=false] - Determines if the user is a staff member
 * @returns {JSX.Element} The 404 error page UI
 */
function NotFoundPage({
  isLoggedIn,
  cartCount,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      {/* Head section for styling */}
      <head>
        <link rel="stylesheet" href="/css/404.css" />
      </head>

      {/* Navbar component */}
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />

      {/* Main content section for the 404 error message */}
      <section className="container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>

        {/* Button to redirect users back to the home page */}
        <HomeButton text="Go Back Home" link="/" />
      </section>
    </>
  );
}

module.exports = NotFoundPage; // Exporting the UI component
