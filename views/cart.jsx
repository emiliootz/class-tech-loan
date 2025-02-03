const React = require("react");
const Navbar = require("./components/Navbar");
const ItemDetails = require("./components/ItemDetails");
const {
  RemoveButton,
  CheckoutButton,
  HomeButton,
} = require("./components/Buttons");

function CartPage({
  cartItems,
  handleDelete,
  handleCheckout,
  isLoggedIn,
  cartCount,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/cart.css" />
      </head>
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />
      <section className="container">
        <div className="left-container">
          <h1>Your Cart</h1>
          {cartItems.length > 0 ? (
            <ul className="items">
              {cartItems.map((item) => (
                <li key={item._id} className="single-item">
                  <ItemDetails item={item} fields={["Make", "Model"]} />
                  <div className="remove-button">
                    <RemoveButton itemId={item._id} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cart-empty">Your cart is empty!</p>
          )}

          {cartItems.length > 0 && (
            <div className="cart-actions">
              <HomeButton text="Continue Shopping" link="/" />
              <CheckoutButton />
            </div>
          )}
        </div>

        {/* Right side - Time Display */}
        <div className="right-container">
          <div className="time-message">Time goes here</div>
        </div>
      </section>
    </>
  );
}

module.exports = CartPage;
