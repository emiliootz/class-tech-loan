/*
 * Purpose:
 * The `AddToCartButton` component renders a button that allows users to add an item to their cart.
 * If the item is unavailable, it displays a disabled button labeled "Unavailable."
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/addToCartButton.css`,
 *
 * Features:
 * - Renders a functional "Add To Cart" button when the item is available.
 * - Submits a POST request to the `/add-to-cart/:itemId` endpoint when the button is clicked.
 * - Displays a disabled "Unavailable" button when the item is not available.
 * - Applies a consistent class `button` for styling both button states.
 *
 * Props:
 * - `itemId` (string): The unique identifier for the item to be added to the cart. This is used to construct the POST request URL.
 * - `isAvailable` (boolean): Indicates whether the item is available.
 *   - `true`: The "Add To Cart" button is active and functional.
 *   - `false`: The button is disabled and displays "Unavailable."
 *
 * Usage:
 * - To use this component, include:
 *   `<AddToCartButton itemId={itemId} isAvailable={isAvailable} />`
 *   Replace `itemId` with the item's unique identifier and `isAvailable` with a boolean value.
 * - Ensure the `addToCartButton.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `action` attribute in the form dynamically constructs the URL for the `/add-to-cart` endpoint using the `itemId`.
 * - The `button` class should be styled in the `addToCartButton.css` file for consistent presentation.
 */

const React = require("react");

function AddToCartButton({ itemId, isAvailable }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/addToCartButton.css" />
      </head>
      {isAvailable ? (
        <form action={`/add-to-cart/${itemId}`} method="POST">
          <button type="submit" className="button">
            Add To Cart
          </button>
        </form>
      ) : (
        <button className="button" disabled>
          Unavailable
        </button>
      )}
    </>
  );
}

module.exports = AddToCartButton;
