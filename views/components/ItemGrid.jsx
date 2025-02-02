const React = require("react");
const ItemCard = require("./ItemCard");
const shuffle = require("../../middleware/shuffle");

function ItemGrid({ items = [] }) {
  const displayItems = shuffle(items);

  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/itemGrid.css" />
      </head>
      <section className="item-grid">
        {displayItems.length > 0 ? (
          <div className="grid">
            {displayItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p>No items available at the moment.</p>
        )}
      </section>
    </>
  );
}

module.exports = ItemGrid;
