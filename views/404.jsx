const React = require("react");
const Navbar = require("./components/Navbar");

function NotFoundPage({ isLoggedIn, cartCount }) {
  return (
    <>
      <head>
        <title>404 Not Found</title>
        <link rel="stylesheet" href="/css/404.css" />
      </head>

      <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />

      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className="not-found-btn">
          Go Back Home
        </a>
      </div>
    </>
  );
}

module.exports = NotFoundPage;
