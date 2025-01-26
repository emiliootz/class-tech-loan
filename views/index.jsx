const React = require("react");
const Navbar = require("./components/Navbar");
const Hero = require("./components/Hero");
const Category = require("./components/Category");
const AvailableItems = require("./components/AvailableItems");

function Index({ items, isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <Category />
      <AvailableItems items={items} />
    </>
  );
}

module.exports = Index;
