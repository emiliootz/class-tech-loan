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
