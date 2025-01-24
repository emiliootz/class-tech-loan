const React = require("react");
const Navbar = require("./components/Navbar");

function CartPage({
  cartItems,
  handleDelete,
  handleCheckout,
  isLoggedIn,
  cartCount,
}) {
  return (
    <>
      {/* Head tags (like your protected page) */}
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
      </head>

      {/* Reuse the Navbar */}
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} />

      {/* Main content - Centering the cart */}
      <div className="container d-flex justify-content-center align-items-start pt-4">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Your Cart</h1>
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

                  {/* Center the "Remove" button using flexbox */}
                  <form
                    action={`/remove-from-cart/${item._id}?_method=DELETE`}
                    method="POST"
                    className="d-flex justify-content-center"
                  >
                    <button type="submit" className="btn btn-danger btn-sm">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty!</p>
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
        </div>
      </div>
    </>
  );
}

module.exports = CartPage;
