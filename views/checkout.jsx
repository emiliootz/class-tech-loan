// views/CheckoutSuccessPage.jsx
const React = require("react");
const Navbar = require("./components/Navbar");

function CheckoutSuccessPage({ name, message, isLoggedIn, cartCount }) {
  return (
    <>
      <head>
        <title>Checkout Success</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/css/styles.css" />
      </head>

      <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />

      <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{ flexDirection: "column" }}
      >
        <h1 className="text-success">Checkout Successful!</h1>
        <p>
          Thank you, <strong>{name}</strong>! Your items have been successfully
          processed.
        </p>
        <p>{message}</p>
        <a href="/cart" className="btn btn-primary">
          Return to Cart
        </a>
      </div>
    </>
  );
}

module.exports = CheckoutSuccessPage;
