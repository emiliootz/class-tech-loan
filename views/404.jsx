/*
 * Purpose:
 * The `NotFoundPage` component renders a user-friendly 404 error page when a requested
 * page is not found. It provides navigation options for users to return to the home page.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - `Navbar`: A navigation bar component that maintains consistency across the website.
 * - `ContinueShoppingButton`: A reusable button component, repurposed here to redirect users home.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/404.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Displays a `404` error message with a user-friendly explanation.
 * - Uses the `ContinueShoppingButton` component, with text modified to "Go Back Home."
 * - Incorporates the `Navbar` component, ensuring navigation remains accessible.
 * - Passes authentication (`isLoggedIn`) and cart status (`cartCount`) to the `Navbar`.
 *
 * Props:
 * - `isLoggedIn` (boolean): Indicates whether the user is logged in.
 * - `cartCount` (number): Represents the number of items in the user's cart.
 *
 * Usage:
 * - To use this component, include:
 *   `<NotFoundPage isLoggedIn={isLoggedIn} cartCount={cartCount} />`
 *   Replace `isLoggedIn` and `cartCount` with the appropriate values.
 * - Ensure the `404.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `<title>` tag dynamically sets the page title to "404 Not Found."
 * - The `not-found-container` class must be styled in `404.css` to match the website’s design.
 * - The `Navbar` component ensures that users can still navigate even when encountering a 404 page.
 */

const React = require("react");
const Navbar = require("./components/Navbar");
const { HomeButton } = require("./components/Buttons");

function NotFoundPage({
  isLoggedIn,
  cartCount,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      <head>
        <title>404 Not Found</title>
        <link rel="stylesheet" href="/css/404.css" />
      </head>

      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />

      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <HomeButton text="Go Back Home" link="/" />
      </div>
    </>
  );
}

module.exports = NotFoundPage;
