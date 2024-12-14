const React = require("react");

const CartJSX = ({ cartItems }) => {
  return (
    <html>
      <head>
        <title>Cart</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
      </head>
      <body className="container mt-4">
        <h1>Your Cart</h1>

        {cartItems.length > 0 ? (
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="list-group-item">
                <p>
                  <strong>Asset Type:</strong> {item.assetType} <br />
                  <strong>Asset ID:</strong> {item.assetId} <br />
                  <strong>Make:</strong> {item.make} <br />
                  <strong>Model:</strong> {item.model}
                </p>
                <form
                  action={`/remove-from-cart/${item._id}?_method=DELETE`}
                  method="POST"
                  className="d-inline"
                >
                  <button type="submit" className="btn btn-danger btn-sm">
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty!</p>
        )}

        {cartItems.length > 0 && (
          <div className="d-flex justify-content-between">
            <a href="/protected" className="btn btn-secondary">
              Continue Shopping
            </a>
            <form action="/checkout-cart" method="POST">
              <button type="submit" className="btn btn-success">
                Checkout
              </button>
            </form>
          </div>
        )}
      </body>
    </html>
  );
};

module.exports = CartJSX;
