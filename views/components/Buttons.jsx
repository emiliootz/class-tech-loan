const React = require("react");

/**
 * Generic Button Component
 *
 * - This component renders either a `<button>` or an `<a>` tag.
 * - Supports links, form submissions, and disabled states.
 * - Customizable via props.
 */
function Button({
  text,
  link,
  onClick,
  type = "button",
  method = "GET",
  disabled = false,
  className = "",
}) {
  return (
    <>
      {/* Link the external stylesheet for button styles */}
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>

      {/* Render an anchor tag if a link is provided */}
      {link ? (
        <a href={link} className={`button ${className}`}>
          {text}
        </a>
      ) : (
        /* Render a form-based button for actions like Add/Remove from cart */
        <form action={onClick} method={method}>
          <button
            type={type}
            className={`button ${className}`}
            disabled={disabled}
          >
            {text}
          </button>
        </form>
      )}
    </>
  );
}

/** Specific Buttons Using the Generic Button Component **/

// Home Button (Default to `/`)
function HomeButton({ text = "Home", link = "/" }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>
      <Button text={text} link={link} className="home" />
    </>
  );
}

// Checkout Button
function CheckoutButton() {
  return (
    <Button
      text="Checkout"
      onClick="/checkout-cart"
      method="POST"
      className="checkout"
    />
  );
}

// Remove from Cart Button
function RemoveButton({ itemId }) {
  return (
    <Button
      text="Remove"
      onClick={`/remove-from-cart/${itemId}?_method=DELETE`}
      method="POST"
      className="remove"
    />
  );
}

// Authentication Button (Sign In / Sign Out)
function AuthButton({ isLoggedIn }) {
  return isLoggedIn ? (
    <Button text="Log Out" link="/logout" className="signout" />
  ) : (
    <Button text="Sign In" link="/auth/google" className="signin" />
  );
}

function AddToCartButton({ itemId, isAvailable }) {
  return isAvailable ? (
    <form action={`/add-to-cart/${itemId}`} method="POST">
      <button type="submit" className="button add-to-cart">
        Add To Cart
      </button>
    </form>
  ) : (
    <button className="button unavailable" disabled>
      Unavailable
    </button>
  );
}

module.exports = {
  Button,
  HomeButton,
  CheckoutButton,
  RemoveButton,
  AuthButton,
  AddToCartButton,
};
