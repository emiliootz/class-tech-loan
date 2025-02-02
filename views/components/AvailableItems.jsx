const React = require("react");
const { AddToCartButton } = require("./Buttons");
const ProductImage = require("./ProductImage");

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function ItemCard({ item }) {
  return (
    <div className="card">
      <a href={item._id ? `/item/${item._id}` : "#"}>
        <ProductImage
          picture={item.picture}
          label={item.label}
          className="card-img-top"
        />
      </a>
      <div className="card-body">
        <h5 className="card-title">
          {item.make} {item.model}
        </h5>
        <div className="card-button">
          <AddToCartButton
            itemId={item._id}
            isAvailable={!!item._id}
            className="btn btn-primary"
          />
        </div>
      </div>
    </div>
  );
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
