/*
 * Purpose:
 * The `Cart` component renders a cart icon with a badge showing the current number
 * of items in the user's cart.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/cart.css`,
 *   and the stylesheet is dynamically linked within this component.
 * - Icon Image: The cart icon is located at `/public/images/cart.png`.
 *
 * Features:
 * - Displays a cart icon as a clickable link that redirects to the `/cart` page.
 * - Shows a badge (`cartCount`) to indicate the number of items in the cart.
 * - Dynamically updates the badge count based on the `cartCount` prop.
 *
 * Props:
 * - `cartCount` (number): Represents the total number of items in the user's cart.
 *   If `cartCount` is not passed or is `0`, the badge will display `0` to indicate an empty cart.
 *
 * Usage:
 * - To use this component, include:
 *   `<Cart cartCount={cartCount} />`
 *   Replace `cartCount` with the actual count of items in the cart.
 *
 * Notes:
 * - The `cartCount` badge should be styled in the `cart.css` file for proper visibility.
 * - If no items are in the cart, the badge will still display but show `0`.
 */

const React = require("react");

function Cart({ cartCount }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/cart.css" />
      </head>

      <a href="/cart" className="cart-link">
        <img src="/images/cart.png" alt="Cart" className="cart-image" />
        <span className="cart-count-badge">{cartCount}</span>
      </a>
    </>
  );
}

module.exports = Cart;
