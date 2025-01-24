const React = require("react");
const Navbar = require("./components/Navbar");
const Hero = require("./components/Hero");
const Category = require("./components/Category");
const AvailableItems = require("./components/AvailableItems");

function ProtectedPage({ name, items, cartCount, isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} />
      <div className="seperator"></div>
      <Hero />
      <Category />
      <AvailableItems items={items} />
    </>
  );
}

module.exports = ProtectedPage;
