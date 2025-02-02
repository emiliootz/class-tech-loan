const React = require("react");
const { AddToCartButton } = require("./Buttons");
const ProductImage = require("./ProductImage");
const ItemCard = require("./ItemCard");

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
      <div className="available-items">
        <section>
          <div className="title">Available Items</div>
          {displayedItems.length > 0 ? (
            <div className="grid">
              {displayedItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p>No items available at the moment.</p>
          )}
        </section>
      </div>
    </>
  );
}

module.exports = AvailableItems;
