const React = require("react");

function Navbar({ cartCount = 0, isLoggedIn = false }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
      <header>
        <img
          className="logo"
          href="/"
          src="/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.png"
          alt="logo"
        />
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

        <div className="navbar-right">
          {/* Cart icon link */}
          <a href="/cart" className="cart-link">
            <img src="/images/cart.png" alt="Cart" width="50" height="50" />
            <span className="cart-count-badge">{cartCount}</span>
          </a>

          {/* Conditionally render Sign In or Log Out based on `isLoggedIn` */}
          {isLoggedIn ? (
            <a className="signout" href="/logout">
              <button>Log Out</button>
            </a>
          ) : (
            <a className="signin" href="/auth/google">
              <button>Sign In</button>
            </a>
          )}
        </div>
      </header>
    </>
  );
}

module.exports = Navbar;
