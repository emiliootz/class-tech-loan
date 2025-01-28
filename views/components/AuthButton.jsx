/*
 * Purpose:
 * The `AuthButton` component renders a button for signing in or signing out,
 * depending on the user's authentication status. It dynamically adjusts the
 * button's text and link based on the `isLoggedIn` prop.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/authButton.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Displays a "Log Out" button when the user is logged in, linking to the `/logout` endpoint.
 * - Displays a "Sign In" button when the user is not logged in, linking to the `/auth/google` endpoint.
 * - Dynamically applies appropriate CSS classes (`signin` or `signout`) for styling.
 *
 * Props:
 * - `isLoggedIn` (boolean): A boolean value that determines the authentication status of the user.
 *   - `true`: User is logged in, and the "Log Out" button is displayed.
 *   - `false`: User is not logged in, and the "Sign In" button is displayed.
 *
 * Usage:
 * - To use this component, include:
 *   `<AuthButton isLoggedIn={isLoggedIn} />`
 *   Replace `isLoggedIn` with the actual boolean value representing the user's authentication status.
 * - Ensure the `authButton.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `href` attributes for the links are set to `/logout` and `/auth/google`, which should be
 *   handled by the server to manage authentication.
 * - The `authButton.css` file should define styles for `.signin` and `.signout` classes for proper presentation.
 */

const React = require("react");

function AuthButton({ isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/authButton.css" />
      </head>
      {isLoggedIn ? (
        <a className="signout" href="/logout">
          <button>Log Out</button>
        </a>
      ) : (
        <a className="signin" href="/auth/google">
          <button>Sign In</button>
        </a>
      )}
    </>
  );
}

module.exports = AuthButton;
