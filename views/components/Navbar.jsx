const React = require("react");
const Cart = require("./Cart");
const AuthButton = require("./AuthButton");
const Logo = require("./Logo");

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
          <nav>
            <ul className="nav__links">
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

module.exports = Navbar;
