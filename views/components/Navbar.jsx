const React = require("react");
const Cart = require("./Cart");
const AuthButton = require("./AuthButton");
const Logo = require("./Logo");
const NavLinks = require("./NavLinks");

function Navbar({ cartCount = 0, isLoggedIn = false }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
      <header>
        {/* Auth and Cart Section */}
        <div className="navbar-top">
          <Cart cartCount={cartCount} />
          <AuthButton isLoggedIn={isLoggedIn} />
        </div>

        {/* Main Navigation Section */}
        <div className="navbar-main">
          <Logo isLoggedIn={isLoggedIn} />
          <NavLinks />
        </div>
      </header>
    </>
  );
}

module.exports = Navbar;
