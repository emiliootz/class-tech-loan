const React = require("react");
const ItemGrid = require("./ItemGrid");

function AvailableItems() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/availableItems.css" />
      </head>
      <div className="available-items">
        <section>
          <div className="title">Available Items</div>
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
      </div>
    </>
  );
}

module.exports = AvailableItems;
