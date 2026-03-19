const React = require("react");

/**
 * Generic Button Component
 *
 * - This component renders either a `<button>` or an `<a>` tag.
 * - Includes a `<head>` in each function to ensure styles are loaded.
 * - Supports links, form submissions, and disabled states.
 */
function Button({
  text,
  link,
  onClick,
  method = "GET",
  disabled = false,
  className = "",
}) {
  return (
    <>
      {/* ✅ Ensure button styles are loaded */}
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>

      {link ? (
        <a href={link} className={`button ${className}`}>
          {text}
        </a>
      ) : (
        <form action={onClick} method={method}>
          <button className={`button ${className}`} disabled={disabled}>
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
    <>
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>
      <Button
        text="Checkout"
        onClick="/checkout-cart"
        method="POST"
        className="checkout"
      />
    </>
  );
}

// Remove from Cart Button
function RemoveButton({ itemId }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>
      <Button
        text="X"
        onClick={`/remove-from-cart/${itemId}?_method=DELETE`}
        method="POST"
        className="remove"
      />
    </>
  );
}

// Add to Cart Button
function AddToCartButton({ itemId, isAvailable }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>
      <form action={`/add-to-cart/${itemId}`} method="POST">
        <button
          className="button checkout"
          disabled={!isAvailable}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          {isAvailable ? "Add to Cart" : "Unavailable"}
        </button>
      </form>
    </>
  );
}

// Authentication Button (Sign In / Sign Out)
function AuthButton({ isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/button.css" />
      </head>
      {isLoggedIn ? (
        <Button text="Log Out" link="/logout" className="signout" />
      ) : (
        <Button text="Sign In" link="/auth/google" className="signin" />
      )}
    </>
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
