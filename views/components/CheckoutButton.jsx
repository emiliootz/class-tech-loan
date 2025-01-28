/*
 * Purpose:
 * The `CheckoutButton` component is designed to render a checkout button, primarily
 * for use on the cart page. It allows users to submit a form to initiate the checkout process.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/checkoutButton.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Renders a styled button with the text "Checkout".
 * - The button is wrapped in a form that submits a POST request to the `/checkout-cart` endpoint.
 * - The button has a CSS class `btn-checkout` for consistent styling.
 *
 * Usage:
 * - This component can be used in any part of the application by including:
 *   `<CheckoutButton />`
 *
 * Notes:
 * - The form's action points to `/checkout-cart` and uses the POST method for secure data submission.
 * - The `btn-checkout` class is defined in the CSS file to style the button.
 */
const React = require("react");

function CheckoutButton() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/checkoutButton.css" />
      </head>
      <form action="/checkout-cart" method="POST">
        <button type="submit" className="btn-checkout">
          Checkout
        </button>
      </form>
    </>
  );
}

module.exports = CheckoutButton;
