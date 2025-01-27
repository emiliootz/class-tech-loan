/*
  
  This function is rendering the available items list. This list
  shows a max of 8 items in two rows of four. All items are shuffled
  before they are rendered and then it shows the first 8 items.
  the stylesheet for this is under public/css/availableItems.css

  to call this within a page you will use: "<AvailableItems />"
  
  */

const React = require("react");
const AddToCartButton = require("./AddToCartButton");
const ProductImage = require("./ProductImage");

/* 

Function to get all items and shuffling the items. 

This is used to render 8 random items on the main page
of the webpage, (index,protected)

*/

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function AvailableItems({ items = [] }) {
  const displayedItems = shuffleArray(items).slice(0, 8);

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
