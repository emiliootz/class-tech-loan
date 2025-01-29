/*
 * Purpose:
 * The `Navbar` component renders the navigation bar for the website, including:
 * - A cart icon with the current item count.
 * - An authentication button for signing in or out.
 * - The website's logo, which dynamically links based on the user's login status.
 * - Navigation links for easy access to different pages.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - Other Components:
 *   - `Cart`: Displays the cart icon and the number of items in the cart.
 *   - `AuthButton`: Displays a sign-in or sign-out button based on the user's login status.
 *   - `Logo`: Displays the website's logo with a dynamic link.
 *   - `NavLinks`: Renders the main navigation links for the website.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/navbar.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - A top section (`navbar-top`) containing:
 *   - The cart icon with a badge showing the cart item count.
 *   - The authentication button for signing in or signing out.
 * - A bottom section (`navbar-bottom`) containing:
 *   - The website logo, which links to the home or protected page based on `isLoggedIn`.
 *   - Navigation links for easy navigation.
 *
 * Props:
 * - `cartCount` (number): The number of items in the user's cart. Defaults to `0` if not provided.
 * - `isLoggedIn` (boolean): Indicates whether the user is logged in. Defaults to `false`.
 *
 * Usage:
 * - To use this component, include:
 *   `<Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} />`
 *
 * Notes:
 * - The `Cart`, `AuthButton`, `Logo`, and `NavLinks` components must be properly implemented and imported for this component to function correctly.
 * - The `navbar.css` file should define styles for `.navbar-top`, `.navbar-bottom`, and their child elements for consistent presentation.
 */

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
        <div className="navbar-bottom">
          <Logo isLoggedIn={isLoggedIn} />
          <NavLinks />
        </div>
      </header>
    </>
  );
}

module.exports = Navbar;
