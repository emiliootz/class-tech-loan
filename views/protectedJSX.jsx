// protectedJSX.jsx
const React = require("react");
const Navbar = require("./components/Navbar");

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
