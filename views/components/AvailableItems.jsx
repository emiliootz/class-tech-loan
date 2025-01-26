const React = require("react");
const AddToCartButton = require("./AddToCartButton");
const ProductImage = require("./ProductImage");

function AvailableItems({ items = [] }) {
  const displayedItems = items.slice(0, 8);

  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/availableItems.css" />
      </head>
      <section className="available-items">
        <h2 className="section-title">AVAILABLE ITEMS</h2>
        {displayedItems.length > 0 ? (
          <div className="grid-container">
            {displayedItems.map((item, index) => (
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
                    <AddToCartButton
                      itemId={item._id}
                      isAvailable={!!item._id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items">No items available at the moment.</p>
        )}
      </section>
    </>
  );
}

module.exports = AvailableItems;
