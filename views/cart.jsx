/**
 * @file CartPage.jsx
 * @description Displays the shopping cart page, allowing users to review and remove items,
 *              and select arrival and return times for borrowed equipment.
 * @module CartPage
 */

const React = require("react");
const Navbar = require("./components/Navbar"); // Importing the navigation bar component
const TimePicker = require("./components/TimePicker"); // Importing the time selection component
const { HomeButton } = require("./components/Buttons"); // Importing buttons for cart actions

/**
 * CartPage Component
 *
 * This component renders the cart page where users can:
 *  - View a list of items added to their cart
 *  - Remove items from the cart
 *  - Select an arrival and return time for borrowed equipment
 *  - Proceed to checkout
 *
 * @param {Object} props - Component props
 * @param {Array} props.cartItems - List of items currently in the user's cart
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in
 * @param {number} props.cartCount - Number of items in the cart (used in navbar)
 * @param {boolean} [props.isAdmin=false] - Determines if the user has admin privileges
 * @param {boolean} [props.isStaff=false] - Determines if the user is a staff member
 * @returns {JSX.Element} The Cart Page UI
 */
function CartPage({
  cartItems,
  isLoggedIn,
  cartCount,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      {/* Head section for page-specific styles */}
      <head>
        <link rel="stylesheet" href="/css/cart.css" />
      </head>

      {/* Navbar for site-wide navigation */}
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />

      {/* Main cart container */}
      <section className="container">
        {/* Left container: Displays cart items and actions */}
        <div className="left-container">
          <h1>Your Cart</h1>

          {/* Display items in cart or show empty message */}
          {cartItems.length > 0 ? (
            <ul className="items">
              {cartItems.map((item) => (
                <li key={item._id} className="single-item">
                  <img src={item.picture} alt={`${item.make} ${item.model}`} />
                  <h1>
                    {item.make} {item.model}
                  </h1>
                  <form
                    action={`/remove-from-cart/${item._id}?_method=DELETE`}
                    method="POST"
                  >
                    <button className="close"></button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty!</p>
          )}

          {/* Continue shopping button */}
          {cartItems.length > 0 && (
            <div className="cart-actions">
              <HomeButton text="Continue Shopping" link="/" />
            </div>
          )}
        </div>

        {/* Right container: Time selection and checkout */}
        <div className="right-container">
          {cartItems.length > 0 ? (
            <form action="/checkout-cart" method="POST" className="times">
              <TimePicker label="Arrival Time" id="arrivalDate" />
              <TimePicker label="Return Time" id="returnDate" />
              <button type="submit" className="button checkout" style={{ width: "100%", marginTop: "1rem" }}>
                Checkout
              </button>
            </form>
          ) : (
            <div className="times">
              <TimePicker label="Arrival Time" id="arrivalDate" />
              <TimePicker label="Return Time" id="returnDate" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

module.exports = CartPage; // Exporting the CartPage component for use in routing.
