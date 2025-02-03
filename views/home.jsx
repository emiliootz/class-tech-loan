const React = require("react");
const Navbar = require("./components/Navbar");
const ItemGrid = require("./components/itemGrid");

/**
 * Home Component
 *
 * - Displays the homepage for both logged-in and guest users.
 * - Includes Navbar, Hero, Categories, and Available Items sections.
 *
 * Props:
 * - `items` (array): List of available items.
 * - `cartCount` (number): Number of items in the user's cart (if logged in).
 * - `isLoggedIn` (boolean): Determines whether the user is logged in.
 *
 * Usage:
 * - `<Home items={items} cartCount={cartCount} isLoggedIn={isLoggedIn} />`
 */
function Home({ items, cartCount = 0, isLoggedIn, isAdmin = false }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/home.css" />
      </head>
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <section className="hero">
        <div className="dark-overlay"></div>
        <h1>
          Borrow
          <br />
          &nbsp; &nbsp; &nbsp;Equipment at
          <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Umass Boston
        </h1>
      </section>
      <section className="category">
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
      <section className="available-items">
        <h1>Available Items</h1>
        <ItemGrid items={items} />
      </section>
    </>
  );
}

module.exports = Home;
