const React = require("react");

const checkoutSuccessJSX = ({ name, message }) => {
  return (
    <html>
      <head>
        <title>Checkout Success</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
      </head>
      <body className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="text-success">Checkout Successful!</h1>
          <p>
            Thank you, <strong>{name}</strong>! Your items have been
            successfully processed.
          </p>
          <p>{message}</p>
          <a href="/cart" className="btn btn-primary">
            Return to Cart
          </a>
        </div>
      </body>
    </html>
  );
};

module.exports = checkoutSuccessJSX;
