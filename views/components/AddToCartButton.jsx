{
  /*
  
  A button that adds an item to the users cart
  the stylesheet for this is under public/css/addToCartButton.css

  to call this within a page you will use: "<AddToCartButton />"

  the itemId and isAvailable is passed into this function. 
  
  */
}

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
