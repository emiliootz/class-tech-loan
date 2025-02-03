/**
 * @file CheckoutSuccessPage.jsx
 * @description Displays a success message when a user completes checkout.
 *              Informs the user that their items have been successfully processed
 *              and provides an option to continue shopping.
 * @module CheckoutSuccessPage
 */

const React = require("react");
const Navbar = require("./components/Navbar"); // Importing the navigation bar component
const { HomeButton } = require("./components/Buttons"); // Importing the home button component

/**
 * CheckoutSuccessPage Component
 *
 * This functional component renders the checkout success message.
 * It includes:
 *  - A navbar for site-wide interaction
 *  - A success message with dynamic user name and custom message
 *  - A button to return to the home page
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the user who completed the checkout
 * @param {string} props.message - Custom message related to the checkout
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in
 * @param {number} props.cartCount - Number of items in the cart (used in navbar)
 * @param {boolean} [props.isAdmin=false] - Determines if the user has admin privileges
 * @param {boolean} [props.isStaff=false] - Determines if the user is a staff member
 * @returns {JSX.Element} The Checkout Success Page UI
 */
function CheckoutSuccessPage({
  name,
  message,
  isLoggedIn,
  cartCount,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      {/* Head section for page-specific styles */}
      <head>
        <link rel="stylesheet" href="/css/checkout.css" />
      </head>

      {/* Navbar for site-wide navigation */}
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />

      {/* Checkout success message section */}
      <section className="checkout-page">
        <h1>Checkout Successful!</h1>
        <p>
          Thank you, <strong>{name}</strong>! Your items have been successfully
          processed.
        </p>
        <p>{message}</p>

        {/* Button to return to the home page */}
        <HomeButton text="Continue Shopping" link="/" />
      </section>
    </>
  );
}

module.exports = CheckoutSuccessPage; // Exporting the CheckoutSuccessPage component for use in routing.
