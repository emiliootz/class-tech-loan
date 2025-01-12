const React = require("react");

function Navbar() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navbar.css" />
      </head>
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
    </>
  );
}

function Hero() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/hero.css" />
      </head>
      <main>
        <div className="dark-overlay"></div>
        <div className="main-intro">
          <h1>
            Borrow
            <br />
            &nbsp; &nbsp; &nbsp;Equipment at
            <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Umass Boston
          </h1>
        </div>
      </main>
    </>
  );
}

function Category() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/category.css" />
      </head>
      <section className="category">
        <p>CATEGORIES</p>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Video</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Audio</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Photo</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Dongle</h3>
        </a>
      </section>
    </>
  );
}

function Index() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <Navbar />
      <div className="seperator"></div>
      <Hero />
      <Category />
    </>
  );
}

module.exports = Index;
