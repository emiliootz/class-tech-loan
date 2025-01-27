/*

This is rending a continue shopping button to be mainly used within the cart
page 

The stylesheet for this is under public/css/continueShoppingButton.css

This can be called by using: "<ContinueShoppingButton />"

*/

const React = require("react");

function ContinueShoppingButton() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/continueShoppingButton.css" />
      </head>
      <a href="/protected" className="btn-continue-shopping">
        Continue Shopping
      </a>
    </>
  );
}

module.exports = ContinueShoppingButton;
