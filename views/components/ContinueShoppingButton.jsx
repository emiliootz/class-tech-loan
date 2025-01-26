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
