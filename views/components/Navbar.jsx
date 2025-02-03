const React = require("react");
const { AuthButton } = require("./Buttons");

function Navbar({ cartCount = 0, isLoggedIn = false, isAdmin = false }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
      <header>
        <section className="navbar-top">
          <a href="/cart" className="cart-link">
            <img src="/images/cart.png" alt="Cart" className="cart-image" />
            <span className="cart-count-badge">{cartCount}</span>
          </a>

          {/* Show Dropdown if Logged In, Otherwise Show AuthButton */}
          {isLoggedIn ? (
            <div className="dropdown">
              <button className="dropdown-toggle">Account</button>
              <div className="dropdown-menu">
                {isAdmin && (
                  <a href="/admin" className="admin">
                    Admin
                  </a>
                )}
                {isAdmin && (
                  <a href="/dashboard" className="staff">
                    Dashboard
                  </a>
                )}
                {
                  <a href="/logout" className="logout">
                    Logout
                  </a>
                }
              </div>
            </div>
          ) : (
            <AuthButton isLoggedIn={isLoggedIn} />
          )}
        </section>

        <section className="navbar-bottom">
          <a href="/">
            <img
              className="logo"
              src="/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.png"
              alt="UMass Boston Logo"
            />
          </a>
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
        </section>
      </header>
    </>
  );
}

module.exports = Navbar;
