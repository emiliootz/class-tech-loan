const React = require("react");

function NavLinks() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navLinks.css" />
      </head>
      <nav>
        <ul className="nav__links">
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

module.exports = NavLinks;
