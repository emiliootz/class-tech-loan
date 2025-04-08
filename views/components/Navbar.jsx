/**
 * @file Navbar.jsx
 * @description Responsive Bootstrap-based navigation bar with logo, navigation links,
 *              cart icon with item count badge, and conditional user account controls.
 */
const React = require("react");
const { AuthButton } = require("./Buttons");

/**
 * Navbar Component
 *
 * Renders a responsive navigation bar using Bootstrap.
 * - Displays the UMass Boston logo
 * - Includes links for Services, Projects, About
 * - Shows a cart icon with dynamic item count badge
 * - Displays sign-in or account options depending on login status
 *
 * @param {Object} props - Component props
 * @param {number} props.cartCount - Number of items in the cart
 * @param {boolean} props.isLoggedIn - Whether the user is logged in
 * @param {boolean} [props.isAdmin=false] - Whether the user has admin privileges
 * @param {boolean} [props.isStaff=false] - Whether the user is a staff member
 * @returns {JSX.Element} The rendered navigation bar
 */

function Navbar({
  cartCount = 0,
  isLoggedIn = false,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      {/* Bootstrap CSS/JS and custom styles */}
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-umb-blue px-4">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src="/images/UMassBoston-Logo/white-logo-lockup/White-UMB-logo-lockup.png"
            alt="UMass Boston Logo"
            className="logo"
            style={{ maxWidth: "125px" }}
          />
        </a>

        {/* Hamburger menu (mobile toggle) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Links & Icons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left nav links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                About
              </a>
            </li>
          </ul>

          {/* Right section: cart + account */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart Icon with Item Count */}
            <a href="/cart" className="position-relative text-white me-2">
              <img
                src="/images/cart.png"
                alt="Cart"
                style={{ width: "32px" }}
              />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.75rem" }}
                >
                  {cartCount}
                </span>
              )}
            </a>

            {/* Conditional account dropdown or sign-in button */}
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                >
                  Account
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="accountDropdown"
                >
                  {isAdmin && (
                    <li>
                      <a className="dropdown-item" href="/admin">
                        Admin
                      </a>
                    </li>
                  )}
                  {(isAdmin || isStaff) && (
                    <li>
                      <a className="dropdown-item" href="/dashboard">
                        Dashboard
                      </a>
                    </li>
                  )}
                  <li>
                    <a className="dropdown-item" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <AuthButton isLoggedIn={false} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

module.exports = Navbar;
