const React = require("react");

function Navbar() {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Navbar</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
      <body>
        <header>
          <img
            className="logo"
            src="/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.png"
            alt="logo"
          />
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
          <a className="login__button" href="/auth/google">
            <button>Login</button>
          </a>
        </header>
      </body>
    </>
  );
}

module.exports = Navbar;
