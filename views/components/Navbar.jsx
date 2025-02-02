const React = require("react");
const CartIcon = require("./CartIcon");
const UserDropdown = require("./UserDropdown"); // Import UserDropdown component
const Logo = require("./Logo");
const NavLinks = require("./NavLinks");
const { AuthButton } = require("./Buttons");

function Navbar({ cartCount = 0, isLoggedIn = false, isAdmin = false }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
      <header>
        {/* Auth and Cart Section */}
        <div className="navbar-top">
          <CartIcon cartCount={cartCount} />
          {/* Show Dropdown if Logged In, Otherwise Show AuthButton */}
          {isLoggedIn ? (
            <UserDropdown isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
          ) : (
            <AuthButton isLoggedIn={isLoggedIn} />
          )}
        </div>

        {/* Main Navigation Section */}
        <div className="navbar-bottom">
          <Logo isLoggedIn={isLoggedIn} />
          <NavLinks />
        </div>
      </header>
    </>
  );
}

module.exports = Navbar;
