/*
 * Purpose:
 * The `Logo` component renders the UMass Boston logo as a clickable link.
 * The link's destination changes based on the `isLoggedIn` prop passed to the component.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The logo's styles are defined in `/public/css/logo.css` and are linked dynamically within this component.
 *
 * Usage:
 * - This component can be used in any part of the application by including:
 *   `<Logo isLoggedIn={isLoggedIn} />`
 *   Here, `isLoggedIn` is a boolean prop that determines where the logo links to.
 *
 * Features:
 * - If the user is logged in (`isLoggedIn` is true), the logo will link to the `/protected` route.
 * - If the user is not logged in (`isLoggedIn` is false), the logo will link to the `/` route.
 * - The logo is styled using the class `logo` defined in `logo.css`.
 */

const React = require("react");

function Logo({ isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/logo.css" />
      </head>
      <a href={isLoggedIn ? "/protected" : "/"}>
        <img
          className="logo"
          src="/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.png"
          alt="UMass Boston Logo"
        />
      </a>
    </>
  );
}

module.exports = Logo;
