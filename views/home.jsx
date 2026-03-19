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
  activeCategory = null,
  currentPage = 1,
  totalPages = 1,
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
        <a href="/" className={`category-box${!activeCategory ? " active" : ""}`}>
          <div className="dark-overlay"></div>
          <h3>All</h3>
        </a>
        {["Video", "Audio", "Photo", "Dongle"].map((cat) => (
          <a
            key={cat}
            href={`/?category=${cat}`}
            className={`category-box${activeCategory && activeCategory.toLowerCase() === cat.toLowerCase() ? " active" : ""}`}
          >
            <div className="dark-overlay"></div>
            <h3>{cat}</h3>
          </a>
        ))}
      </section>

      {/* Available items section */}
      <section className="available-items">
        <h1>Available Items</h1>
        <ItemGrid items={items} />

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="pagination">
            {currentPage > 1 && (
              <a
                href={`/?${activeCategory ? `category=${activeCategory}&` : ""}page=${currentPage - 1}`}
                className="page-btn"
              >
                &laquo; Prev
              </a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/?${activeCategory ? `category=${activeCategory}&` : ""}page=${p}`}
                className={`page-btn${p === currentPage ? " active" : ""}`}
              >
                {p}
              </a>
            ))}
            {currentPage < totalPages && (
              <a
                href={`/?${activeCategory ? `category=${activeCategory}&` : ""}page=${currentPage + 1}`}
                className="page-btn"
              >
                Next &raquo;
              </a>
            )}
          </div>
        )}
      </section>
    </>
  );
}

module.exports = Home; // Exporting the Home component for use in routing.
