const React = require("react");
const Navbar = require("./components/Navbar");
const Hero = require("./components/Hero");
const Category = require("./components/Category");
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
      <Hero />
      <Category />
      <section className="available-items">
        <h1>Available Items</h1>
        <ItemGrid items={items} />
      </section>
    </>
  );
}

module.exports = Home;
