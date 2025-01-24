// protectedJSX.jsx
const React = require("react");

// === Duplicate or import these components from your existing code ===
function Navbar({ cartCount = 0 }) {
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

        {/* Right-hand side of the navbar: Cart + Logout */}
        <div className="navbar-right">
          {/* Cart icon link */}
          <a href="/cart" className="cart-link">
            {/* Adjust the src to point to your actual cart icon image */}
            <img src="/images/cart.png" alt="Cart" width="50" height="50" />
            {/* If cartCount > 0, show a badge */}
            {<span className="cart-count-badge">{cartCount}</span>}
          </a>

          {/* Log Out button */}
          <a className="signin" href="/logout">
            <button>Log Out</button>
          </a>
        </div>
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
      _id: null,
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
                {/*
                  If _id is null for placeholders, you could disable the link or handle it.
                */}
                <a href={item._id ? `/item/${item._id}` : "#"}>
                  <div className="product-img">
                    <img src={item.picture} alt={item.label} />
                  </div>
                  <div className="product-headline">
                    <div className="name">
                      {item.make} {item.model}
                    </div>
                  </div>
                  <div className="add-to-cart">
                    {item._id ? (
                      <form action={`/add-to-cart/${item._id}`} method="POST">
                        <button
                          type="submit"
                          className="highlighted add_to_cart"
                        >
                          Add To Cart
                        </button>
                      </form>
                    ) : (
                      <button className="highlighted add_to_cart" disabled>
                        Unavailable
                      </button>
                    )}
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

// === This is the main protected page component ===
function ProtectedPage({ name, items, cartCount }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <Navbar cartCount={cartCount} />
      <div className="seperator"></div>
      <Hero />
      <Category />
      <AvailableItems items={items} />
    </>
  );
}

module.exports = ProtectedPage;
