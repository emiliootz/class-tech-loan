const React = require("react");
const Navbar = require("./components/Navbar");
const ItemDetails = require("./components/ItemDetails");

function CartPage({
  cartItems,
  handleDelete,
  handleCheckout,
  isLoggedIn,
  cartCount,
}) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/cartPage.css" />
      </head>
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} />
      <div className="cart-container">
        <div className="cart-content">
          <h1 className="cart-title">Your Cart</h1>
          {cartItems.length > 0 ? (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <ItemDetails
                    item={item}
                    fields={["Asset Type", "Asset ID", "Make", "Model"]}
                  />

                  <form
                    action={`/remove-from-cart/${item._id}?_method=DELETE`}
                    method="POST"
                  >
                    <button type="submit" className="btn-remove">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cart-empty">Your cart is empty!</p>
          )}

          {cartItems.length > 0 && (
            <div className="cart-actions">
              <a href="/protected" className="btn-secondary">
                Continue Shopping
              </a>
              <form action="/checkout-cart" method="POST">
                <button type="submit" className="btn-success">
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
