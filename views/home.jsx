const React = require("react");
const Navbar = require("./components/Navbar");
const Hero = require("./components/Hero");
const Category = require("./components/Category");
const AvailableItems = require("./components/AvailableItems");

function Home({ items, isLoggedIn }) {
  return (
    <>
      {/* Navbar (with login status) */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Category />

      {/* Available Items Section */}
      <AvailableItems items={items} />
    </>
  );
}

module.exports = Home;
