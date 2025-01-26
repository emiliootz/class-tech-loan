const React = require("react");
const AddToCartButton = require("./AddToCartButton");
const ProductImage = require("./ProductImage");

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
                <a href={item._id ? `/item/${item._id}` : "#"}>
                  <ProductImage picture={item.picture} label={item.label} />
                  <div className="product-headline">
                    <div className="name">
                      {item.make} {item.model}
                    </div>
                  </div>
                </a>
                <div className="add-to-cart">
                  <AddToCartButton itemId={item._id} isAvailable={!!item._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

module.exports = AvailableItems;
