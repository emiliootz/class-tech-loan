/*

This is rending a checkout button to be mainly used within the cart
page 

The stylesheet for this is under public/css/checkoutButton.css

This can be called by using: "<CheckoutButton />"

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
