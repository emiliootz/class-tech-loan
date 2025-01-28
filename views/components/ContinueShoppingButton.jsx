/*
 * Purpose:
 * The `ContinueShoppingButton` component renders a button that redirects users back to
 * the shopping section of the website, allowing them to continue browsing for items.
 * It is primarily intended for use on the cart page.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/continueShoppingButton.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Displays a styled "Continue Shopping" button as a clickable link.
 * - Redirects users to the `/protected` route, which is the shopping page.
 * - Styled with the class `btn-continue-shopping` for consistent presentation.
 *
 * Usage:
 * - To use this component, include:
 *   `<ContinueShoppingButton />`
 * - Ensure the `continueShoppingButton.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `href` attribute points to `/protected`, which should be configured to display the shopping page.
 * - The `btn-continue-shopping` class must be styled in the `continueShoppingButton.css`
 */

const React = require("react");

function ContinueShoppingButton() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/continueShoppingButton.css" />
      </head>
      <a href="/protected" className="btn-continue-shopping">
        Continue Shopping
      </a>
    </>
  );
}

module.exports = ContinueShoppingButton;
