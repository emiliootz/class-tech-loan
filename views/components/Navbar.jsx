const React = require("react");

function Navbar({ cartCount = 0 }) {
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

        {/* Right-hand side of the navbar: Cart + Logout */}
        <div className="navbar-right">
          {/* Cart icon link */}
          <a href="/cart" className="cart-link">
            {/* Adjust the src to point to your actual cart icon image */}
            <img src="/images/cart.png" alt="Cart" width="50" height="50" />
            {/* If cartCount > 0, show a badge */}
            {<span className="cart-count-badge">{cartCount}</span>}
          </a>

          {/* Log Out button */}
          <a className="signin" href="/logout">
            <button>Log Out</button>
          </a>
        </div>
      </header>
    </>
  );
}

module.exports = Navbar;
