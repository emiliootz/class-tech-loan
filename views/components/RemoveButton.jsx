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
