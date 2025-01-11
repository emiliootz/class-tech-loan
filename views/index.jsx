const React = require("react");

function Navbar() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Navbar</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
      <body>
        <header>
          <img
            className="logo"
            href="/"
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
          <a className="signin" href="/auth/google">
            <button>Sign In</button>
          </a>
        </header>
      </body>
    </>
  );
}

function Index() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <Navbar />
        <div className="main-image-container">
          <img
            className="main__image"
            src="/images/mainimage.png"
            alt="Main Visual"
          />
        </div>
        <section className="instructions">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step">
              <img src="/images/step1.png" alt="Step 1" />
            </div>
            <div className="step">
              <img src="/images/step2.png" alt="Step 2" />
            </div>
            <div className="step">
              <img src="/images/step3.png" alt="Step 3" />
            </div>
          </div>
        </section>
      </body>
    </>
  );
}

module.exports = Index;
