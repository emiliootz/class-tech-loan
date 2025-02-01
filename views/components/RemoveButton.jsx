/*
 * Purpose:
 * The `RemoveButton` component renders a button that allows users to remove an
 * item from their cart. When clicked, it submits a DELETE request to the server.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/removeButton.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Sends a DELETE request to the `/remove-from-cart/:itemId` endpoint using a form.
 * - Uses the `_method=DELETE` query parameter to indicate an HTTP DELETE request (useful for servers that require method override).
 * - Includes a `btn-remove` class for styling the button.
 *
 * Props:
 * - `itemId` (string): The unique identifier of the item to be removed. This is used in the request URL.
 *
 * Usage:
 * - To use this component, include:
 *   `<RemoveButton itemId={itemId} />`
 *   Replace `itemId` with the actual item's ID.
 * - Ensure the `removeButton.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `_method=DELETE` parameter is often required for servers that handle RESTful operations via form submissions.
 * - The `btn-remove` class must be styled in `removeButton.css` for proper presentation.
 */

const React = require("react");

function RemoveButton({ itemId }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/removeButton.css" />
      </head>
      <form action={`/remove-from-cart/${itemId}?_method=DELETE`} method="POST">
        <button type="submit" className="btn-remove">
          Remove
        </button>
      </form>
    </>
  );
}

module.exports = RemoveButton;
