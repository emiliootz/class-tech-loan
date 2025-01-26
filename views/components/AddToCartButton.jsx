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
