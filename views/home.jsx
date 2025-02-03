/**
 * @file home.jsx
 * @description Home page component for the UMass Boston Equipment Borrowing System.
 *              This page serves as the main entry point for users, displaying:
 *              - A hero section with a welcoming message
 *              - Category-based equipment filtering
 *              - A grid of available items for borrowing
 * @module Home
 */

const React = require("react");
const Navbar = require("./components/Navbar"); // Importing the navbar component.
const ItemGrid = require("./components/itemGrid"); // Importing the item grid component to display available items.

/**
 * Home Component
 *
 * This functional component serves as the landing page for the application.
 * It includes:
 *  - A navbar
 *  - A hero section
 *  - Category links for browsing specific types of equipment
 *  - A grid layout showcasing available items
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - List of available items to be displayed in the ItemGrid component
 * @param {number} [props.cartCount=0] - The number of items currently in the user's cart
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in
 * @param {boolean} [props.isAdmin=false] - Determines if the user has admin privileges
 * @param {boolean} [props.isStaff=false] - Determines if the user is a staff member
 * @returns {JSX.Element} The Home page UI
 */
function Home({
  items,
  cartCount = 0,
  isLoggedIn,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      {/* Head section for page-specific styles */}
      <head>
        <link rel="stylesheet" href="/css/home.css" />
      </head>

      {/* Navbar component */}
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />

      {/* Hero section with a welcome message */}
      <section className="hero">
        <div className="dark-overlay"></div>
        <h1>
          Borrow
          <br />
          &nbsp; &nbsp; &nbsp;Equipment at
          <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Umass Boston
        </h1>
      </section>

      {/* Category section */}
      <section className="category">
        <h1>Categories</h1>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Video</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Audio</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Photo</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Dongle</h3>
        </a>
      </section>

      {/* Available items section */}
      <section className="available-items">
        <h1>Available Items</h1>
        <ItemGrid items={items} />
      </section>
    </>
  );
}

module.exports = Home; // Exporting the Home component for use in routing.
