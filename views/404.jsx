const React = require("react");
const Navbar = require("./components/Navbar");

function NotFoundPage({ isLoggedIn, cartCount }) {
  return (
    <>
      <head>
        <title>404 Not Found</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/css/styles.css" />
      </head>

      <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />

      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="display-1">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary mt-3">
          Go Back Home
        </a>
      </div>
    </>
  );
}

module.exports = NotFoundPage;
