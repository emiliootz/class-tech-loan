const React = require("react");

function Cart({ cartCount }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/cart.css" />
      </head>

      <a href="/cart" className="cart-link">
        <img src="/images/cart.png" alt="Cart" width="50" height="50" />
        <span className="cart-count-badge">{cartCount}</span>
      </a>
    </>
  );
}

module.exports = Cart;
