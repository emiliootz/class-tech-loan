/*

This function is rendering the cart icon 

The stylesheet for this is under public/css/cart.css

Passes in cartCount to keep track of the number of items 
within a users cart

the icon is saved under public/images/cart.png

This can be usd by calling: "<Cart />"

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
