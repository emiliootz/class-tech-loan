const React = require("react");
const Navbar = require("./components/Navbar");
const Hero = require("./components/Hero");
const Category = require("./components/Category");
const AvailableItems = require("./components/AvailableItems");

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
function Home({ items, cartCount = 0, isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} />
      <Hero />
      <Category />
      <AvailableItems items={items} />
    </>
  );
}

module.exports = Home;
