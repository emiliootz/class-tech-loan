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

function AvailableItems({ items = [] }) {
  const paddedItems = items.slice(0, 9).concat(
    Array(Math.max(0, 9 - items.length)).fill({
      label: "No Label",
      picture: "placeholder-image.png",
    })
  );

  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/availableItems.css" />
      </head>
      <section className="available-items">
        <h2 className="section-title">AVAILABLE ITEMS</h2>
        <div className="grid-container">
          {paddedItems.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="product-box">
                <a href={`/item/${item._id}`}>
                  <div className="product-img">
                    <img src={item.picture} alt={item.label} />
                  </div>
                  <div className="product-headline">
                    <div className="name">{item.label}</div>
                  </div>
                  <div className="add-to-cart">
                    <button className="highlighted add_to_cart">
                      Add To Cart
                    </button>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Index({ items }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <Navbar />
      <div className="seperator"></div>
      <Hero />
      <Category />
      <AvailableItems items={items} />
    </>
  );
}

module.exports = Index;
